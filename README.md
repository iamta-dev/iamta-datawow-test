# DataWow Full-stack Developer Assignment (Next.js + NestJS)

This repository contains two main parts for the assignment:
- Backend (NestJS)
- Frontend (Next.js)

Please refer to the documentation of each project for more detailed instructions.

## Backend Assignment
[Backend Documentation](./backend/README.md)

## Frontend Assignment
[Frontend Documentation](./frontend/README.md)

---

### System Requirements

Install Node.js 22 LTS by NVM
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
Install Docker Desktop
- [docker-desktop install](https://www.docker.com/products/docker-desktop/)

### Quick Start Run Unit Tets
Clone this repository:
```bash
git clone https://github.com/iamta-dev/iamta-datawow-test.git

(go to frontend)
cd iamta-datawow-test/frontend
npm i
npm run set:local
npm run test:cov

(go to backend)
cd iamta-datawow-test/backend
npm i
npm run set:local
npm run test:cov
```

### Vscode Required Extensions Setup
```sh
# tools
code --install-extension eamodio.gitlens
code --install-extension ms-azuretools.vscode-docker
# typescript
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension yoavbls.pretty-ts-errors
# frontend
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension naumovs.color-highlight
# backend && database
code --install-extension prisma.prisma
```