#!/bin/sh

sudo docker exec -it nginx rm -rf /usr/share/nginx/html/*
sudo cp -r ~/frontend/build ~/backend

docker-compose -f ~/backend/docker-compose.yaml up -d --build
