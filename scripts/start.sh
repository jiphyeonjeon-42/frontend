#!/bin/sh

sudo cp -r ~/fronend/build ~/backend/build

docker-compose -f ~/backend/docker-compose.yaml up -d --build
