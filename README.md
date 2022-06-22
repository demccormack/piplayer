# Introduction

Pi Player is a media player web app with a cinema-style interface and movie selection panel populated by calls to a REST API.

### Running with Docker

You can use Docker to run the application from Linux, MacOS or Windows. 
You must have both Docker and Docker-Compose installed. 
In the case of Windows, this requires version 2 or higher of Windows Subsystem for Linux (WSL). 
You can then run the bash scripts in WSL.

Run the following command from the root of the repository, specifying your own directory containing media files for the application to read:

```bash
./run_dev.sh /path/to/media/dir
```

Then you can browse to http://localhost:8000/, view and play the video and music files in the directory tree.

### Structure

```bash
.
├── backend             # Codebase for the backend server.
│   ├── app.py          # Entry-point of the backend server.
│   └── ...
|  
├── frontend            # Codebase for the frontend.
│   ├── index.html      # Placeholder HTML file.
│   ├── piplayer.js     # Entry-point of the frontend.
│   └── ...
|
├── docker              # Files used to create Docker images.
│   └── ...
|
├── docker-compose.yaml  # Docker composition file, defining how the Docker containers are created.
|
└── run_dev.sh           # Bash script to create and run the containers, with media and source 
                         # code mounted as read-only volumes.
```
