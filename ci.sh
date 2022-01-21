#!/usr/bin/env bash

set -e

npm run test

docker build -t marvel-search .

## E2E tests
docker run -d --rm --net host --name marvel-search-e2e marvel-search
docker run -it --rm --net host -v "$PWD/__e2e__":/app/features/ maxdecro/karate-standalone-docker:latest java -jar karate.jar features/
docker stop marvel-search-e2e