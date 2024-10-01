#!/bin/bash
make api.down
make web.down
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -a -q)
./scripts/pullImage.sh

make api.up
make web.up

