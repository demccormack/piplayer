FROM nginx:stable

USER nginx

COPY docker/media/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
