#!/bin/bash
# Run this once on your VPS to set up the project
set -e

APP_DIR="/opt/aplet"
REPO_URL="https://github.com/stablearm/aplet-v2.git"

echo "=== Aplet VPS Setup ==="

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker installed. You may need to log out and back in."
fi

# Install Docker Compose plugin if not present
if ! docker compose version &> /dev/null; then
    echo "Installing Docker Compose plugin..."
    sudo apt-get update && sudo apt-get install -y docker-compose-plugin
fi

# Clone or update the repo
if [ -d "$APP_DIR" ]; then
    echo "Updating existing deployment..."
    cd $APP_DIR
    git pull origin main
else
    echo "Cloning repository..."
    sudo mkdir -p $APP_DIR
    sudo chown $USER:$USER $APP_DIR
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# Create .env file if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
NEXT_PUBLIC_API_URL=https://didegan.com
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=apletbot
EOF
    echo "Created .env - edit it if needed."
fi

# Build and start
echo "Building and starting..."
docker compose up -d --build

echo ""
echo "=== Setup Complete ==="
echo "App is running at http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "To update later, run:"
echo "  cd $APP_DIR && git pull && docker compose up -d --build"
