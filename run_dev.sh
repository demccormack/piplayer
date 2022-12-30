#!/bin/bash
set -euo pipefail

ENV=.env.development

[[ "$(uname)" == Linux ]] && XARGS_ARGS="-d '\n'" || XARGS_ARGS="-0"
export "$(grep -v '^#' $ENV | xargs $XARGS_ARGS)"

docker build -t piplayer.proxy -f ./docker/proxy/Dockerfile .
docker build -t piplayer.backend -f ./docker/backend/Dockerfile .
docker build -t piplayer.frontend.development -f ./docker/frontend/development.Dockerfile .

docker-compose --env-file=$ENV -f ./docker-compose.yaml -f ./docker-compose.development.yaml up
