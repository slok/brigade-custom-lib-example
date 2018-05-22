#!/usr/bin/env sh

set -o errexit
set -o nounset

IMAGE_VERSION=${IMAGE_VERSION:-latest}

REPOSITORY=${REPOSITORY:-customregistry/}
IMAGE=${IMAGE:-/custom/brigade-custom-worker}

docker build -t ${REPOSITORY}${IMAGE}:${IMAGE_VERSION} -f ./docker/worker/Dockerfile .
docker tag ${REPOSITORY}${IMAGE}:${IMAGE_VERSION} ${REPOSITORY}${IMAGE}:latest