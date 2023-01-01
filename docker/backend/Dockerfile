FROM python:3.9-alpine

ARG BACKEND_USER

WORKDIR /app/

# Create non-root user.
RUN addgroup -S nopriv && adduser -S -G nopriv nopriv

RUN apk add --no-cache bash

# Create the directory the API searches.
RUN mkdir -pv /var/www/html/media/ && chmod -R 0755 /var/www/html/media/

COPY backend/ .

RUN python3 -m pip install -r requirements.txt

RUN mkdir -pv /app/bin
RUN ln -snvf /usr/local/bin/gunicorn /app/bin/gunicorn

# Set permissions to allow non-root user to run the Python code.
RUN chown -R $BACKEND_USER:$BACKEND_USER /app && chmod -R 700 /app

USER $BACKEND_USER

CMD python3 -u /app/bin/gunicorn -w 2 -b 0.0.0.0:8080 src.app:app
