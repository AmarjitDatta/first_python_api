# First Python API

A simple Hello World REST API built with Python FastAPI backend and React frontend, fully containerized with Docker.

## Features

- **FastAPI Backend**: Python REST API with a single GET endpoint
- **React Frontend**: Interactive UI to call the API
- **Docker Support**: Complete Docker setup for both services
- **CORS Enabled**: Frontend and backend communicate seamlessly

## API Endpoint

- **GET /** - Returns a personalized greeting message
  - Query Parameter: `name` (optional, defaults to "World")
  - Response: `{"message": "Hello, World! My name is {name}"}`

## Quick Start

### Using Docker (Recommended)

1. Make sure Docker Desktop is running
2. Run both services:
```bash
docker-compose up --build
```
3. Access the frontend at `http://localhost:3000`
4. API runs on `http://localhost:8000`

### Running Locally

#### Backend
```bash
source .venv/bin/activate
uvicorn practicing_fastAPI:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
├── practicing_fastAPI.py   # FastAPI application
├── requirements.txt         # Python dependencies
├── Dockerfile              # Backend Docker configuration
├── docker-compose.yml      # Multi-container orchestration
└── frontend/               # React application
    ├── src/
    │   ├── App.js         # Main React component
    │   └── App.css        # Styling
    ├── package.json       # Node dependencies
    └── Dockerfile         # Frontend Docker configuration
```

## Technologies

- **Backend**: Python 3.12, FastAPI, Uvicorn
- **Frontend**: React 18, Node.js
- **Deployment**: Docker, Docker Compose

## Usage

1. Enter your name in the text field
2. Click "Submit"
3. The API returns a personalized greeting message

## License

MIT
