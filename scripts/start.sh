#!/bin/sh

sudo cp -r ~/frontend/build ~/backend

docker-compose -f ~/backend/docker-compose.yaml up -d --build
