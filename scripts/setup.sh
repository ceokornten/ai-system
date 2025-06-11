#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT_DIR"

# Copy .env if not exists
if [ ! -f .env ]; then
  cp config/.env.example .env
  echo "Created .env from example. Please review and update it before running."
fi

if command -v docker >/dev/null 2>&1 && command -v docker-compose >/dev/null 2>&1; then
  echo "Starting services with Docker Compose..."
  docker-compose up -d --build
  echo "Services are up."
else
  echo "Docker not found or docker-compose missing, falling back to local PM2 deployment."
  npm install
  if ! command -v pm2 >/dev/null 2>&1; then
    echo "Installing PM2 globally..."
    npm install -g pm2
  fi
  pm2 start index.js --name line-ai-agent-system
  # Schedule mainLearner using PM2 cron
  pm2 start cron/mainLearner.js --name main-learner --cron "$CRON_SCHEDULE"
  pm2 save
  echo "Deployment complete via PM2."
fi