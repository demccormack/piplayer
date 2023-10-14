# Introduction

Pi Player is a media player web app with a cinema-style interface and movie selection panel populated by calls to a REST API.

### Running with Docker

You can use Docker to run the application from Linux, MacOS or Windows.
You must have both Docker and Docker-Compose installed.

1. Edit `.env.development`, setting the `MEDIA` environment variable to a directory containing media files for the application to read.
2. Run the following command from the root of the repository.

```bash
bash ./build_and_run.sh .env.development
```

Then you can browse to http://localhost:3000/, view and play the video and music files in the directory tree.

### Structure

```bash
.
├── backend             # Backend server written in Python with Flask
│   ├── src
│       └── app.py      # Entry-point
|
├── frontend            # Frontend written in TypeScript with React
│   ├── src
│   |   └── main.tsx    # Entry-point
│   ├── tests
│   └── ...
|
├── docker              # Files used to create Docker images.
│   └── ...
|
├── docker-compose.yaml # Docker composition file, defining how the Docker containers are created.
|
├── .env.development    # Environment variables for local development
├── .env.production     # Environment variables for production
├── post-receive        # Hook for production deployments
|
└── build_and_run.sh    # Bash script to create and run the containers
```
