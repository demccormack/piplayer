FROM python:3.9-alpine

WORKDIR /app/

# Create non-root user.
RUN addgroup -S nopriv && adduser -S -G nopriv nopriv

# Set permissions to allow non-root user to run the Python code.
RUN chown -R nopriv:nopriv /app && chmod -R 700 /app

# Create the directory the API searches.
RUN mkdir -pv /var/www/html/media/ && chmod -R 0755 /var/www/html/media/

# Switch to non-root user.
USER nopriv

# Copy the Python files into the container.
# Note: Working directory should be root of repo.
COPY backend/* ./

# Install dependencies.
RUN python3 -m pip install -r requirements.txt

CMD ["python3", "app.py", "0.0.0.0"]
