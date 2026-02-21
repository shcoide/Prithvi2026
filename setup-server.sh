#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# setup-server.sh  — ONE-TIME initial setup on a fresh Ubuntu 22.04 Droplet
#
# Run this after SSH-ing into the Droplet as root:
#   ssh root@206.189.140.159
#   bash setup-server.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e
echo "╔══════════════════════════════════════════════════════╗"
echo "║   Prithvi 2026 — Droplet Initial Setup              ║"
echo "╚══════════════════════════════════════════════════════╝"

DOMAIN="prithvi2026.com"
APP_DIR="/var/www/prithvi2026"
NODE_VERSION="20"

# ── 1. System update ──────────────────────────────────────────────────────────
echo ""
echo "▶ 1/9  Updating system packages…"
apt-get update -y && apt-get upgrade -y

# ── 2. Install Node.js 20 LTS ─────────────────────────────────────────────────
echo ""
echo "▶ 2/9  Installing Node.js ${NODE_VERSION} LTS…"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs
node -v && npm -v

# ── 3. Install PM2 globally ───────────────────────────────────────────────────
echo ""
echo "▶ 3/9  Installing PM2…"
npm install -g pm2

# ── 4. Install Nginx ──────────────────────────────────────────────────────────
echo ""
echo "▶ 4/9  Installing Nginx…"
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

# ── 5. Install Certbot (Let's Encrypt) ───────────────────────────────────────
echo ""
echo "▶ 5/9  Installing Certbot…"
apt-get install -y certbot python3-certbot-nginx

# ── 6. Configure firewall (UFW) ───────────────────────────────────────────────
echo ""
echo "▶ 6/9  Configuring firewall…"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

# ── 7. Create app directory ───────────────────────────────────────────────────
echo ""
echo "▶ 7/9  Creating app directory at ${APP_DIR}…"
mkdir -p $APP_DIR

# ── 8. Set up Nginx site config ───────────────────────────────────────────────
echo ""
echo "▶ 8/9  Configuring Nginx for ${DOMAIN}…"

cat > /etc/nginx/sites-available/prithvi2026 << 'NGINX_CONF'
server {
    listen 80;
    listen [::]:80;
    server_name www.prithvi2026.com;
    return 301 https://prithvi2026.com$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name prithvi2026.com;

    access_log /var/log/nginx/prithvi2026.access.log;
    error_log  /var/log/nginx/prithvi2026.error.log;

    client_max_body_size 20M;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        'upgrade';
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    location /_next/static/ {
        alias /var/www/prithvi2026/.next/static/;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    location /favicon.ico {
        alias /var/www/prithvi2026/public/favicon.ico;
        access_log off;
    }
}
NGINX_CONF

# Enable the site
ln -sf /etc/nginx/sites-available/prithvi2026 /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
echo "✅ Nginx configured!"

# ── 9. Get SSL certificate ────────────────────────────────────────────────────
echo ""
echo "▶ 9/9  Obtaining SSL certificate for ${DOMAIN}…"
echo "⚠️  Make sure DNS A records are pointing to this server BEFORE this step!"
echo "    prithvi2026.com     → 206.189.140.159"
echo "    www.prithvi2026.com → 206.189.140.159"
echo ""
read -p "DNS is already pointing to this server? (y/n): " dns_ready

if [ "$dns_ready" = "y" ] || [ "$dns_ready" = "Y" ]; then
    certbot --nginx \
        -d prithvi2026.com \
        -d www.prithvi2026.com \
        --non-interactive \
        --agree-tos \
        --email registration.prithvi.iitkgp@zohomail.in \
        --redirect
    echo "✅ SSL certificate installed!"

    # Auto-renew
    systemctl enable certbot.timer
    systemctl start certbot.timer
    echo "✅ Auto-renewal enabled (renews every 60 days)"
else
    echo "⏭️  Skipping SSL. Run this after DNS is set up:"
    echo "   certbot --nginx -d prithvi2026.com -d www.prithvi2026.com"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Server setup complete!                               ║"
echo "║                                                          ║"
echo "║  Next step: run ./deploy.sh to deploy the app           ║"
echo "╚══════════════════════════════════════════════════════════╝"
