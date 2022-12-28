### Build React app as static site ###
FROM node:lts-alpine as buildenv

WORKDIR /app/

# Note: Working directory should be root of repo.
COPY frontend .
COPY .env* ./

# Install dependencies.
RUN npm ci --only=production 

# Build the static site.
RUN npm run build 

### Setup Nginx to serve the files ###
FROM nginx:stable as deployenv

WORKDIR /app

# Sort out permissions for non-root user.
# Source: https://www.rockyourcode.com/run-docker-nginx-as-non-root-user/
RUN chown -R nginx:nginx /app && \
        chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

RUN rm -rfv /usr/share/nginx/html && ln -snvf /app/ /usr/share/nginx/html

# Switch to non-root user.
USER nginx

# Copy the built static site from the build container to the Nginx container.
COPY --from=buildenv /app/build /app/

CMD ["nginx", "-g", "daemon off;"]
