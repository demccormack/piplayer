#!/bin/bash
set -euo pipefail

export MEDIA="${1:-}"
if [[ -z "$MEDIA" ]]
then
    echo "Usage: $0 /path/to/media/dir"
    echo "As you have not defined the media directory, it will default to /var/www/html/media"
fi

docker build -t piplayer.backend -f ./docker/backend/Dockerfile . &
docker build -t piplayer.frontend -f ./docker/frontend/Dockerfile . &
docker build -t piplayer.proxy -f ./docker/proxy/Dockerfile . &

wait

docker-compose up

