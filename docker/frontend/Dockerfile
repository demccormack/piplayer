FROM node:lts-alpine as buildenv

WORKDIR /app/

# Note: Working directory should be root of repo.
COPY frontend /app

# Install dependencies.
RUN npm install

CMD ["npm", "start"]