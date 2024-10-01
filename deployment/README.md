# datawowtest deployment

-----

## Connection remote server for vscode 
> https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
- Example config ssh on My PC`.ssh/config`
```sh
Host github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/deploy_key

Host gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/deploy_key
```

- [Setup deploy ssh key](./setup_deploy_key.md)
- [Install Docker & Docker Compose on AWS EC2](./install_docker.md)

### Easy deployment for prod server

> How to start all service
```sh
cd prod

cp -R ./app/.env.example .env
cp -R ./app/.env.api.example .env.api
cp -R ./app/.env.web.example .env.web

chmod +x ./scripts/*


make db.up
make api.up
make web.up
```

> How to down all service
```sh
cd app

make db.down
make api.down
make web.down
```

> How to migrate and seed database
```sh
cd app

./scripts/migrateDb.sh
./scripts/seedDb.sh
```

> How to reset all database
```sh
cd app

make db.down
sudo rm -rf ./postgres_data
./scripts/migrateDb.sh
./scripts/seedDb.sh
```
