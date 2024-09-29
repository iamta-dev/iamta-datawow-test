
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

### 1.5 View Database Client

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

### 1.6 Run API (Development Mode)

```sh
npm run dev

(backend is running)
╰─❯ npm run dev
> backend@0.0.1 dev
> nest start

[Nest] 32588  - 09/29/2024, 09:00:34 PM  LOG [NestFactory] Starting Nest application...
Application is running on: http://[::1]:8080
Swagger is running on: http://[::1]:8080/api-docs
Allowed origins: [ 'http://localhost:8000', 'http://localhost:8080' ]
```

## 2. Folder Structure

- [nestjs modules](https://docs.nestjs.com/modules)
```txt
.                   
├── config/*                             # Config Nest.js folder
│   ├── config.validation.ts             # validation Config .env from Joi on start api
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
│   └── swagger.json                     # open api swagger.json ไฟล์
├── docker-compose.yml                   # Docker Compose database configuration
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
npm run test
```
