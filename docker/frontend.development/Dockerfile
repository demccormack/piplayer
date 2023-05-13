FROM node:lts-alpine

WORKDIR /app/

# Note: Working directory should be root of repo.
COPY frontend /app
COPY .env* ./

# Install dependencies.
RUN npm install

CMD npx vite --host 0.0.0.0
