#!/bin/bash
# Run this once on your VPS to set up the project from scratch
set -euo pipefail

APP_DIR="/opt/aplet"
REPO_URL="https://github.com/stablearm/aplet-v2.git"

log() {
  echo -e "\033[1;32m==>\033[0m $1"
}

# --- System Dependencies ---
log "Checking Docker..."
if ! command -v docker &>/dev/null; then
  log "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker "$USER"
  log "Docker installed. You may need to log out and back in."
fi

if ! docker compose version &>/dev/null; then
  log "Installing Docker Compose plugin..."
  sudo apt-get update && sudo apt-get install -y docker-compose-plugin
fi

log "Checking Nginx..."
if ! command -v nginx &>/dev/null; then
  sudo apt-get update && sudo apt-get install -y nginx
fi

# --- App Directory ---
log "Setting up app directory..."
if [ -d "$APP_DIR/.git" ]; then
  log "Updating existing repo..."
  cd "$APP_DIR"
  git fetch origin main
  git reset --hard origin/main
else
  sudo mkdir -p "$APP_DIR"
  sudo chown "$USER:$USER" "$APP_DIR"
  log "Cloning repository..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# --- Environment ---
if [ ! -f .env ]; then
  log "Creating .env file..."
  cat > .env << 'EOF'
NEXT_PUBLIC_API_URL=https://didegan.com
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=apletbot
EOF
  log "Created .env — edit if needed."
fi

# --- SSL Certs ---
sudo mkdir -p /etc/nginx/ssl
if [ -f aplet_cert.pem ] && [ -f aplet_key.pem ]; then
  sudo cp aplet_cert.pem /etc/nginx/ssl/
  sudo cp aplet_key.pem /etc/nginx/ssl/
  log "SSL certs installed."
else
  log "WARNING: SSL cert files not found in $APP_DIR."
  log "  Place aplet_cert.pem and aplet_key.pem there before enabling HTTPS."
fi

# --- Nginx ---
log "Configuring Nginx..."
sudo cp scripts/nginx-aplet.conf /etc/nginx/sites-available/aplet
sudo ln -sf /etc/nginx/sites-available/aplet /etc/nginx/sites-enabled/aplet
sudo rm -f /etc/nginx/sites-enabled/default

if sudo nginx -t 2>&1; then
  sudo systemctl enable nginx
  sudo systemctl reload nginx
  log "Nginx configured and running."
else
  log "ERROR: Nginx config test failed. Check SSL certs and config."
fi

# --- Build & Run ---
log "Building and starting container..."
docker compose up -d --build

# --- Health Check ---
log "Running health check..."
HEALTHY=false
for i in $(seq 1 12); do
  if docker compose exec -T aplet wget --no-verbose --tries=1 --spider http://localhost:6090/ 2>/dev/null; then
    HEALTHY=true
    break
  fi
  sleep 5
done

if [ "$HEALTHY" = true ]; then
  log "App is healthy on port 6090!"
else
  log "WARNING: Health check failed. Container may still be starting."
  docker compose logs aplet --tail=20
fi

echo ""
log "=== Setup Complete ==="
log "App:     https://aplet.ir (port 6090 internal)"
log "Backend: https://didegan.com (unchanged)"
log "Deploy:  cd $APP_DIR && bash scripts/deploy.sh"
log "Rollback: cd $APP_DIR && bash scripts/deploy.sh --rollback"
