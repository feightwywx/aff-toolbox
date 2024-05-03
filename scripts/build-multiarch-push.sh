#! /usr/bin/env sh

# Exit in case of error
set -e

export $(grep -v '^#' .env | xargs)

git_head=$(git rev-parse --short HEAD)

FRONTEND_ENV=${FRONTEND_ENV:-production} \
docker buildx build \
--platform linux/amd64,linux/arm64 \
--build-arg ATB_VERSION=${ATB_VERSION} \
--build-arg ATB_VERSION_COMMIT=${git_head} \
--build-arg ATB_TARGET=${ATB_TARGET} \
-t ${DOCKER_IMAGE_FRONTEND}:${ATB_VERSION} \
-t ${DOCKER_IMAGE_FRONTEND}:latest \
--push ./frontend

docker buildx build \
--platform linux/amd64,linux/arm64 \
--build-arg ATB_VERSION=${ATB_VERSION} \
--build-arg ATB_VERSION_COMMIT=${git_head} \
--build-arg ATB_TARGET=${ATB_TARGET} \
-t ${DOCKER_IMAGE_BACKEND}:${ATB_VERSION} \
-t ${DOCKER_IMAGE_BACKEND}:latest \
--push ./backend
