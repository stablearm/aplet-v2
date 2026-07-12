#!/bin/bash
# Server-side deploy script
# Usage: bash deploy.sh [--rollback]
set -euo pipefail

APP_DIR="/opt/aplet"
DEPLOY_LOG="/opt/aplet-deploy.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

log() {
  echo "[$TIMESTAMP] $1" | tee -a "$DEPLOY_LOG"
}

# --- Rollback mode ---
if [ "${1:-}" = "--rollback" ]; then
  log "ROLLBACK: Reverting to previous version..."

  # Stop current container
  cd "$APP_DIR"
  docker compose down

  # Get the image from 2 deployments ago (the one before current)
  PREV_IMAGE=$(docker images aplet -q --no-trunc | head -2 | tail -1)
  if [ -n "$PREV_IMAGE" ]; then
    docker tag "$PREV_IMAGE" aplet:latest
    docker compose up -d

    sleep 10
    if docker compose exec -T aplet wget --no-verbose --tries=1 --spider http://localhost:6090/ 2>/dev/null; then
      log "ROLLBACK: Success — app is running again."
    else
      log "ROLLBACK: FAILED — app is still unhealthy. Manual intervention required."
      exit 1
    fi
  else
    log "ROLLBACK: No previous image found."
    exit 1
  fi
  exit 0
fi

# --- Deploy mode ---
log "Deploy started."

cd "$APP_DIR"

# Pull latest
git fetch origin main
git reset --hard origin/main

# Build
docker compose build --no-cache

# Stop
docker compose down

# Start
docker compose up -d

# Health check
log "Health check..."
HEALTHY=false
for i in $(seq 1 12); do
  if docker compose exec -T aplet wget --no-verbose --tries=1 --spider http://localhost:6090/ 2>/dev/null; then
    HEALTHY=true
    break
  fi
  sleep 5
done

if [ "$HEALTHY" = false ]; then
  log "HEALTH CHECK FAILED — auto-rollback triggered."
  docker compose down

  PREV_IMAGE=$(docker images aplet -q --no-trunc | head -2 | tail -1)
  if [ -n "$PREV_IMAGE" ]; then
    docker tag "$PREV_IMAGE" aplet:latest
    docker compose up -d
    log "Rollback complete."
  else
    log "No previous image. Manual fix required."
  fi
  exit 1
fi

# Cleanup
docker image prune -f --filter "until=168h"

log "Deploy successful!"
