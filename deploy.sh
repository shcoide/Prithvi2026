#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Run this EVERY TIME you deploy/update the app on the Droplet
#
# Usage (run on your LOCAL Mac):
#   bash deploy.sh
#
# It will:
#   1. Build the app locally
#   2. Rsync the build to the Droplet
#   3. SSH in and restart PM2
# ─────────────────────────────────────────────────────────────────────────────

set -e

DROPLET_IP="206.189.140.159"
DROPLET_USER="root"
APP_DIR="/var/www/prithvi2026"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   Prithvi 2026 — Deploy to DigitalOcean             ║"
echo "╚══════════════════════════════════════════════════════╝"

# ── 1. Build locally ──────────────────────────────────────────────────────────
echo ""
echo "▶ 1/3  Building Next.js app…"
cd "$LOCAL_DIR"
npm run build
echo "✅ Build complete"

# ── 2. Sync to Droplet ────────────────────────────────────────────────────────
echo ""
echo "▶ 2/3  Uploading to Droplet…"
rsync -avz --progress \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env.local' \
    --exclude='data/db.json' \
    --exclude='data/uploads' \
    "$LOCAL_DIR/" \
    "${DROPLET_USER}@${DROPLET_IP}:${APP_DIR}/"

echo "✅ Files uploaded"

# ── 3. Install deps + restart PM2 ────────────────────────────────────────────
echo ""
echo "▶ 3/3  Installing dependencies and restarting PM2…"
ssh "${DROPLET_USER}@${DROPLET_IP}" << 'REMOTE'
    set -e
    cd /var/www/prithvi2026
    npm install --production
    pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
    pm2 save
    echo "✅ App restarted"
    pm2 status
REMOTE

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Deploy complete!                                     ║"
echo "║  🌐 https://prithvi2026.com                             ║"
echo "╚══════════════════════════════════════════════════════════╝"
