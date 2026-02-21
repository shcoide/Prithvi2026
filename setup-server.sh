#!/bin/bash
# Full server setup — paste this INSIDE the Droplet after SSH
# ssh root@206.189.140.159

set -e
echo "=== STEP 1: Update system ==="
apt-get update -y && apt-get upgrade -y

echo "=== STEP 2: Install Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v
npm -v

echo "=== STEP 3: Install PM2, Nginx, Certbot ==="
npm install -g pm2
apt-get install -y nginx certbot python3-certbot-nginx git

echo "=== STEP 4: Firewall ==="
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
ufw status

echo "=== STEP 5: Create app folder ==="
mkdir -p /var/www/prithvi2026

echo "=== STEP 6: Configure Nginx ==="
cat > /etc/nginx/sites-available/prithvi2026 << 'EOF'
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
}
EOF

ln -sf /etc/nginx/sites-available/prithvi2026 /etc/nginx/sites-enabled/prithvi2026
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx
echo "Nginx running!"
curl -s -o /dev/null -w "Nginx check: HTTP %{http_code}\n" http://localhost

echo "=== ALL DONE — server is ready for app deployment ==="
echo "Now run: bash deploy.sh on your Mac to upload the app"
