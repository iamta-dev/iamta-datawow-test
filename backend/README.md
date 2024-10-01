# datawowtest-backend

## 1. Setup

### 1.1 System Requirements

#### 1.1.1 Setup Node.js 22 LTS with NVM

- [Node Version Manager (nvm) install](https://github.com/nvm-sh/nvm)
- macOS:

  ```sh
  brew install nvm
  nvm install 22
  nvm use 22
  ```

- Windows:
  ```sh
  winget install --id CoreyButler.NVMforWindows
  nvm install 22
  nvm use 22
  ```

#### 1.1.2 Setup Docker Desktop

- [Docker-Desktop install](https://www.docker.com/products/docker-desktop/)

### 1.2 Setup Dependencies && .env

```sh
npm i

# macOS
cp -R .env.example .env
# Windows
Copy-Item -Path .env.example -Destination .env -Recurse
```

### 1.3 Setup database

```sh
docker compose up -d

(docker container datawowtest_db is running)
╰─❯ docker ps
IMAGE                STATUS          PORTS                    NAMES
postgres:16-alpine   Up X seconds    0.0.0.0:5442->5432/tcp   datawowtest_db
```

### 1.4 Setup migrations and seeds database

```sh
npm run db:migrate
npm run db:seed
```

### 1.5 Database Client
- [dbdiagram prisma/dbml/schema.dbml](https://dbdiagram.io/d/66fc5cedfb079c7ebd02f8e8)
#### 1.5.1 prisma studio
```sh
npm run db:studio

(prisma studio in running)
╰─❯ npm run db:studio
> backend@0.0.1 db:studio
> prisma studio

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Prisma Studio is up on http://localhost:5555
```
- #### 1.5.2 dbeaver
  - [dbeaver install](https://dbeaver.io/download/)

### 1.6 Run API (Development Mode)

```sh
npm run dev

(backend is running)
╰─❯ npm run dev
> backend@0.0.1 dev
> nest start

[Nest] 32588  - 01/10/2024, 08:30:34 PM  LOG [NestFactory] Starting Nest application...
Application is running on: http://[::1]:8080
Swagger is running on: http://[::1]:8080/api-docs
Allowed origins: [ 'http://localhost:8000', 'http://localhost:8080' ]
```

## 2. Folder Structure

- [nestjs modules](https://docs.nestjs.com/modules)

```txt
.
├── .env                                 # Environment variables for project 
├── .env.example                         # Example file Environment variables 
├── config/*                             # Config Nest.js folder
│   ├── config.validation.ts             # Validation Config .env from Joi on start api
├── src/*                                # Main source code Nest.js folder
├── lib/*                                # Utilities code for project
├── interface/*                          # base interface
├── prisma/                              # Prisma related files
│   ├── schema.prisma                    # Prisma schema file
│   ├── migrations/*                     # Prisma migrations file
│   ├── seeds/*                          # Prisma seeds file
│   ├── dbml/*                           # generator file dbml and support dbdiagram.io
├── public/                              # api public folder
│   ├── swagger-custom.css               # open api swagger custom css
│   ├── swagger-custom.js                # open api swagger custom js
│   └── swagger.json                     # open api swagger.json
├── docker-compose.yml                   # Docker Compose database configuration
├── .eslintrc.cjs                        # lint code config
├── Dockerfile.backend                   # Docker deployment file
├── postgres_data/*                      # docker volumes database data

```

## 3. Base Dependency Details

- `@nestjs/config`: ใช้สำหรับการจัดการ configuration และ environment variables
- `@nestjs/jwt`: ใช้สำหรับการจัดการ JSON Web Tokens (JWT) เพื่อใช้ในระบบ authentication
- `passport-jwt`: ใช้ในการจัดการ JWT-based authentication ร่วมกับ `passport`
- `bcrypt`: ใช้ในการเข้ารหัสรหัสผ่าน
- `@nestjs/mapped-types`: Utility สำหรับการแปลงและจัดการ DTOs
- `class-transformer`: ใช้สำหรับการแปลงข้อมูลในคลาสต่าง ๆ
- `class-validator`: ใช้ในการ validate ข้อมูลในคลาสต่าง ๆ
- `@nestjs/passport`: ใช้ร่วมกับ `passport` ในการจัดการ authentication ใน Nest.js
- `@nestjs/platform-express`: เป็น platform adapter สำหรับ Express.js ใน Nest.js
- `@nestjs/swagger`: ใช้สำหรับการสร้าง Swagger Documentation สำหรับ API
- `swagger-ui-express`: ใช้ในการแสดง Swagger UI ผ่าน Express.js
- `prisma`: ORM สำหรับการจัดการฐานข้อมูลอย่างสะดวก
- `@prisma/client`: ใช้ร่วมกับ Prisma เพื่อเข้าถึงและจัดการข้อมูลในฐานข้อมูล
- `prisma-dbml-generator`: ใช้ในการสร้าง diagram ของฐานข้อมูลจาก Prisma
- `joi`: ใช้สำหรับการ validate schema ของ environment variables และข้อมูลอื่น ๆ
- `reflect-metadata`: เป็นเมตาดาต้าที่ใช้ร่วมกับ decorators ใน TypeScript
- `rxjs`: ใช้สำหรับการทำงานแบบ asynchronous ผ่าน Observables
- `jest`: ใช้สำหรับการทดสอบ Unit Testing ใน Node.js และ Nest.js
- `eslint`: ใช้สำหรับการตรวจสอบโค้ดให้สอดคล้องกับมาตรฐานโค้ดและหา potential errors ในโค้ด
- `prettier`: ใช้สำหรับจัดรูปแบบโค้ดให้อ่านง่ายและเป็นมาตรฐานเดียวกัน
- `run-script-os`: ใช้สำหรับการรันสคริปต์ที่รองรับการทำงานข้ามแพลตฟอร์ม (Windows, macOS, Linux)

## 4. Run Unit Test

```sh
npm run test:cov

╰─❯ npm run test:cov

> backend@0.0.1 test:cov
> jest --coverage

 PASS  src/post/post.controller.spec.ts
 PASS  src/comment/comment.controller.spec.ts
 PASS  src/auth/auth.controller.spec.ts
 PASS  src/community/community.controller.spec.ts
 PASS  src/auth/auth.service.spec.ts
 PASS  src/post/post.service.spec.ts
 PASS  src/community/community.service.spec.ts
 PASS  src/comment/comment.service.spec.ts
 PASS  src/app.controller.spec.ts

-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |   76.23 |    78.57 |    90.9 |   76.94 |                   
 src                     |    22.8 |        0 |      50 |   17.64 |                   
  app.controller.ts      |     100 |      100 |     100 |     100 |                   
  app.module.ts          |       0 |      100 |     100 |       0 | 1-27              
  app.service.ts         |     100 |      100 |     100 |     100 |                   
  ...unity.controller.ts |   88.23 |      100 |     100 |   86.66 | 27-28
  community.module.ts    |       0 |      100 |     100 |       0 | 1-9
  community.service.ts   |     100 |      100 |     100 |     100 | 
 src/community/dto       |   28.57 |      100 |     100 |   28.57 | 
  community.dto.ts       |       0 |      100 |     100 |       0 | 1-14
  community.swagger.ts   |     100 |      100 |     100 |     100 | 
 src/post                |   82.45 |    76.92 |   93.75 |   83.33 | 
  post.controller.ts     |   80.28 |     62.5 |   85.71 |   79.71 | ...10-136,163-164
  post.module.ts         |       0 |      100 |     100 |       0 | 1-9
  post.service.ts        |     100 |      100 |     100 |     100 | 
 src/post/dto            |     100 |      100 |     100 |     100 | 
  post.dto.ts            |     100 |      100 |     100 |     100 | 
  post.search.ts         |     100 |      100 |     100 |     100 | 
  post.swagger.ts        |     100 |      100 |     100 |     100 | 
-------------------------|---------|----------|---------|---------|-------------------
Test Suites: 9 passed, 9 total
Tests:       79 passed, 79 total
Snapshots:   0 total
Time:        29.649 s
Ran all test suites.
```
