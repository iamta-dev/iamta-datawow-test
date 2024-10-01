#!/bin/bash

make db.down
sleep 5

make api.down
make web.down
sudo rm -rf ./postgres_data
sleep 1

make db.up
sleep 5

sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -a -q)

make api.up
make web.up

./scripts/migrateDb.sh
./scripts/seedDb.sh