# datawowtest-frontend

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

### 1.2 Setup Dependencies && .env

```sh
npm i

# macOS
cp -R .env.example .env
# Windows
Copy-Item -Path .env.example -Destination .env -Recurse
```

### 1.3 Setup Backend Server

[Backend Documentation](../backend/README.md)

### 1.4 Run WebSite (Development Mode)

```sh
npm run dev

(frontend is running)
╰─❯ npm run dev

> frontend@0.1.0 dev
> next dev -p 8000

  ▲ Next.js 14.2.13
  - Local:        http://localhost:8000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 7.3s
```

## 2. Folder Structure

- **Folder Structure**: [T3 App/folder-structure-app](https://create.t3.gg/en/folder-structure-app?packages=tailwind#overview)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/docs/installation/next)
- **CSS Structure & Theming**: [shadcn/ui theming](https://ui.shadcn.com/docs/theming)

```txt
.
├── .env                                 # Environment variables for project
├── .env.example                         # Example file Environment variables
├── src/*                                # Main source code Next.js folder
├── src/env.js                           # Validation Config .env from zod on start web
├── src/styles/globals.css               # Css themes project
├── tailwind.config.ts                   # Tailwind css config base on globals.css
├── components.json                      # shadcn/ui config file
├── src/components/ui/*                  # shadcn/ui custom cumponents
├── src/lib/*                            # Utilities code for project
├── src/actions/*                        # Server Actions file (To validate input, prepare data and connect useCases.)
├── src/app/*                            # routes of the Next.js application
├── src/hooks/*                          # Hooks Context Provider
├── src/services/*                       # External Services (API, Service Provider)
├── src/interface/*                      # Base interface
├── src/use-cases/*                      # Business logic layer and unit tests
├── public/*                             # public folder
├── .eslintrc.cjs                        # lint code config
├── Dockerfile.frontend                  # Docker deployment file

```

## 3. Base Dependency Details

- `@hookform/resolvers`: ใช้สำหรับผสานรวมการ validate ฟอร์มกับ libraries อย่าง Zod และ Yup
- `@radix-ui/react-*`: Base Components สำหรับ `shadcn/ui` เพื่อสร้าง UI components เช่น avatar, dialog, label, select และอื่นๆ ที่เข้าถึงได้ง่ายและปรับแต่งได้
- `class-variance-authority`: จัดการการรวม class names ใน CSS แบบโครงสร้าง
- `clsx`: รวม class names ตามเงื่อนไขอย่างง่ายดาย
- `lucide-react`: ใช้ชุดไอคอน Lucide ในการออกแบบ UI
- `next`: โครงสร้างหลักของแอปพลิเคชัน Next.js สำหรับ SSR และ SSG
- `next-themes`: จัดการการสลับธีม (เช่น light/dark mode) ใน Next.js
- `react`: สร้าง UI components และจัดการ state ภายในแอป
- `react-dom`: จัดการการ render React components ลงใน DOM
- `react-hook-form`: จัดการฟอร์มและการ validate อย่างมีประสิทธิภาพ
- `sonner`: สร้างระบบการแจ้งเตือน (toast notification) ที่ปรับแต่งได้
- `tailwind-merge`: รวม class names ของ Tailwind CSS โดยไม่ให้เกิดการซ้ำซ้อน
- `tailwindcss-animate`: เพิ่ม animation ให้กับ UI components อย่างง่ายดาย
- `zod`: ใช้ในการ validate ข้อมูลด้วย schema ใน TypeScript
- `@t3-oss/env-nextjs`: ใช้สำหรับจัดการ environment variables ใน Next.js อย่างง่ายดาย
- `axios`: HTTP client สำหรับทำการเรียก API อย่างมีประสิทธิภาพ
- `jsonwebtoken`: ใช้สำหรับการเข้ารหัสและถอดรหัส JSON Web Tokens (JWT) สำหรับการ authentication และ authorization
- `dayjs`: ใช้สำหรับจัดการวันที่และเวลาใน JavaScript พร้อมการรองรับ timezones
- `eslint`: ใช้สำหรับการตรวจสอบโค้ดให้สอดคล้องกับมาตรฐานโค้ดและหา potential errors ในโค้ด
- `prettier`: ใช้สำหรับจัดรูปแบบโค้ดให้อ่านง่ายและเป็นมาตรฐานเดียวกัน
- `run-script-os`: ใช้สำหรับการรันสคริปต์ที่รองรับการทำงานข้ามแพลตฟอร์ม (Windows, macOS, Linux)

## 4. Run Unit Test

```sh
npm run test:cov

╰─❯ npm run test:cov

> frontend@0.1.0 test:cov
> jest --coverage

 PASS  src/use-cases/community/get-community.use-case.test.ts (6.996 s)
 PASS  src/use-cases/comment/delete-comment.use-case.test.ts (6.999 s)
 PASS  src/use-cases/comment/create-comment.use-case.test.ts (7 s)
 PASS  src/use-cases/post/get-post.use-case.test.ts (7.037 s)
 PASS  src/use-cases/post/create-post.use-case.test.ts (7 s)
 PASS  src/use-cases/auth/auth.use-case.test.ts (7.053 s)
 PASS  src/use-cases/post/update-post.use-case.test.ts (7.055 s)
 PASS  src/use-cases/post/delete-post.use-case.test.ts (7.065 s)
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |    96.7 |    77.41 |    92.3 |    96.7 |
 interfaces/errors           |     100 |      100 |     100 |     100 |
  base.error.interface.ts    |     100 |      100 |     100 |     100 |
 use-cases/auth              |   93.75 |      100 |     100 |   93.75 |
  auth.use-case.ts           |   93.75 |      100 |     100 |   93.75 | 39
 use-cases/base              |   77.77 |    53.33 |      50 |   77.77 |
  base.use-case.ts           |   77.77 |    53.33 |      50 |   77.77 | 34-35
 use-cases/comment           |     100 |      100 |     100 |     100 |
  create-comment.use-case.ts |     100 |      100 |     100 |     100 |
  delete-comment.use-case.ts |     100 |      100 |     100 |     100 |
 use-cases/community         |     100 |      100 |     100 |     100 |
  get-community.use-case.ts  |     100 |      100 |     100 |     100 |
 use-cases/post              |     100 |      100 |     100 |     100 |
  create-post.use-case.ts    |     100 |      100 |     100 |     100 |
  delete-post.use-case.ts    |     100 |      100 |     100 |     100 |
  get-post.use-case.ts       |     100 |      100 |     100 |     100 |
  update-post.use-case.ts    |     100 |      100 |     100 |     100 |
-----------------------------|---------|----------|---------|---------|-------------------

Test Suites: 8 passed, 8 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        8.276 s, estimated 14 s
Ran all test suites.
```
