#!/bin/bash
set -euo pipefail

export MEDIA="${1:-}"

docker build -t piplayer.backend -f ./docker/backend/Dockerfile . &
docker build -t piplayer.frontend -f ./docker/frontend/Dockerfile . &

wait

docker-compose up -d