#!/usr/bin/env sh

set -o errexit
set -o nounset

SCRIPT=$(readlink -f "$0")
DIR="$( cd "$( dirname "${SCRIPT}" )" && pwd )"

${DIR}/install-deps.sh
${DIR}/test.sh