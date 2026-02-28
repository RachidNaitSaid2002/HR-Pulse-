#!/bin/bash
set -e

echo "🚀 Running Quality Gates (Pytest)..."

# Check if container is running
if ! docker ps | grep -q "hr-pulse-backend-1"; then
    echo "📦 Starting temporary backend for tests..."
    docker compose up -d backend
fi

echo "🧪 Executing tests..."
docker exec hr-pulse-backend-1 pytest -v

if [ $? -eq 0 ]; then
    echo "✅ Quality Gates Passed! All 7 tests succeeded."
    echo "✨ Your code is safe to build and push."
else
    echo "❌ Quality Gates Failed! Please fix the errors above before proceeding."
    exit 1
fi
