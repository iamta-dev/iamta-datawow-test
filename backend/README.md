# datawow-test backend

## Install && Setup
```sh
nvm use 22
npm i

(windows)
Copy-Item -Path .env.example -Destination .env -Recurse
(macos)
cp -R .env.example .env

docker compose up -d
npm run db:migrate
```

## Run API (Development Mode)
```sh
npm run dev
```

# Database Client
```sh
npm run db:studio
```