#!/bin/bash
set -euo pipefail

if ! [[ "${1:-}" ]]
then
    echo "Usage: $0 /path/to/env/file"
    false
fi

docker build -t piplayer.backend -f ./docker/backend/Dockerfile . &
docker build -t piplayer.frontend -f ./docker/frontend/Dockerfile . &
docker build -t piplayer.proxy -f ./docker/proxy/Dockerfile . &

wait

[[ "$1" == "local.env" ]] || DETACHED='-d'

docker-compose --env-file="$1" up ${DETACHED:-}
