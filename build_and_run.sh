#!/bin/bash
set -exuo pipefail

if ! [[ "${1:-}" ]]
then
    echo "Usage: $0 /path/to/env/file"
    false
fi

ENV="$1"
# Source the env file
eval $(cat "$ENV" | sed -e '/^$/d' -e '/^#/d' -e 's/^/export /')

build() {
  NAME="$1"
  BUILD_ARGS="${@:2}"
  if ! docker build ${BUILD_ARGS:-} -t piplayer."$1" -f ./docker/"$1"/Dockerfile .
  then
    echo "Failed to build $1" 1>&2
    exit 1
  fi
}
image_of() {
  docker inspect $(docker ps | grep "$1" | awk '{print $1}') | grep Image | grep sha256
}

if [[ "$(docker ps | grep piplayer)" ]]
then
  PROXY_WAS=$(image_of proxy)
  BACKEND_WAS=$(image_of backend)
  FRONTEND_WAS=$(image_of $FRONTEND_IMAGE)
fi

build proxy
build backend --build-arg BACKEND_USER=$BACKEND_USER --build-arg MEDIA="$MEDIA"
build $FRONTEND_IMAGE

! [[ "$(docker ps | grep piplayer)" ]] || docker-compose --env-file $ENV down

docker-compose --env-file="$ENV" ${DOCKER_COMPOSE_FILES:-} up --force-recreate -d

# Clear out old containers and images
CONTAINERS=$(docker ps -a | grep -v 'piplayer.*latest' | tail +2 | awk '{print $1}') || true
if [[ "$CONTAINERS" ]]
then
  docker stop $CONTAINERS
  docker rm $CONTAINERS
fi
IMAGES=$(docker images | grep '<none>' | awk '{print $3}') || true
! [[ "$IMAGES" ]] || docker rmi $IMAGES

# Report results
[[ "${PROXY_WAS:-}" == "$(image_of proxy)" ]] && echo "Proxy unchanged" || echo "Proxy has new image"
[[ "${BACKEND_WAS:-}" == "$(image_of backend)" ]] && echo "Backend unchanged" || echo "Backend has new image"
[[ "${FRONTEND_WAS:-}" == "$(image_of $FRONTEND_IMAGE)" ]] && echo "Frontend unchanged" || echo "Frontend has new image"
docker ps
echo "Done"
