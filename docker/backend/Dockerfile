FROM python:3.9-alpine

WORKDIR /app/

# Create non-root user.
RUN addgroup -S nopriv && adduser -S -G nopriv nopriv

# Set permissions to allow non-root user to run the Python code.
RUN chown -R nopriv:nopriv /app && chmod -R 700 /app

RUN apk add --no-cache bash

# Create the directory the API searches.
RUN mkdir -pv /var/www/html/media/ && chmod -R 0755 /var/www/html/media/

# Switch to non-root user.
USER nopriv

# Copy the Python files into the container.
# Note: Working directory should be root of repo.
COPY backend/* ./

RUN python3 -m pip install -r requirements.txt

RUN mkdir -pv /app/bin
RUN [[ -f /app/bin/gunicorn ]] || ln -snv /home/nopriv/.local/bin/gunicorn /app/bin/gunicorn

CMD python3 -u /app/bin/gunicorn -w 2 -b 0.0.0.0:8080 app:app
