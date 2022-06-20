### Setup Nginx to serve the files ###
FROM nginx:stable

WORKDIR /app

# Sort out permissions for non-root user.
# Source: https://www.rockyourcode.com/run-docker-nginx-as-non-root-user/
RUN chown -R nginx:nginx /usr/share/nginx/html && \
        chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

# Create the directory which will be mounted to serve the media.
RUN mkdir -p /app/media && chmod -R 0755 /app/media

# Switch to non-root user.
USER nginx

COPY frontend/* /app/

# Copy the Nginx config file.
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
