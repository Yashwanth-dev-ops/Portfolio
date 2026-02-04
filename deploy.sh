#!/bin/bash

# Portfolio Deployment Script

echo "🚀 Starting Portfolio Deployment..."

# 1. Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker could not be found. Please install Docker and Docker Compose first."
    exit 1
fi

# 2. Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# 3. Create .env if not exists (User must populate this manually first time!)
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from example..."
    cp backend/.env.example .env
    echo "❗ Please edit '.env' with your real credentials before running this script again."
    exit 1
fi

# 4. Build and Run
echo "🏗️  Building and Starting Containers..."
# Use docker compose plugin if available, else older executable
if docker compose version &> /dev/null; then
  docker compose down
  docker compose up --build -d
else
  docker-compose down
  docker-compose up --build -d
fi

echo "✅ Deployment Complete! Check status with 'docker ps'."
