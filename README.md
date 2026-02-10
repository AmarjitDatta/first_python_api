# First Python API

A full-stack application with Python FastAPI backend, React frontend, and MongoDB database - all containerized with Docker.

## Features

- **FastAPI Backend**: Python REST API with GET, POST, and DELETE endpoints
- **React Frontend**: Interactive UI with real-time data table
- **MongoDB Database**: Persistent storage for submitted names with timestamps
- **Docker Support**: Complete Docker setup for all three services
- **CORS Enabled**: Frontend and backend communicate seamlessly

## API Endpoints

- **GET /** - Submit a name and get a personalized greeting
  - Query Parameter: `name` (optional, defaults to "World")
  - Response: `{"message": "Hello, World! My name is {name}"}`
  - Also saves the name to MongoDB with timestamp

- **GET /names** - Retrieve all saved names from database
  - Response: `{"names": [{"name": "John", "timestamp": "2026-02-10T12:34:56"}]}`

- **DELETE /names** - Clear all names from database
  - Response: `{"message": "Deleted X names"}`

## Quick Start

### Using Docker (Recommended)

1. Make sure Docker Desktop is running
2. Run all services (MongoDB, FastAPI, React):
```bash
docker-compose up --build
```
3. Access the frontend at `http://localhost:3000`
4. API runs on `http://localhost:8000`
5. MongoDB runs on `http://localhost:27017`

To stop all containers:
```bash
docker-compose down
```

### Running Locally

#### MongoDB
```bash
# Install and start MongoDB locally
brew install mongodb-community
brew services start mongodb-community
```

#### Backend
```bash
pip install -r requirements.txt
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
├── practicing_fastAPI.py   # FastAPI application with MongoDB integration
├── requirements.txt         # Python dependencies (FastAPI, pymongo)
├── Dockerfile              # Backend Docker configuration
├── docker-compose.yml      # Multi-container orchestration (Backend, Frontend, MongoDB)
└── frontend/               # React application
    ├── src/
    │   ├── App.js         # Main React component with table display
    │   └── App.css        # Styling
    ├── package.json       # Node dependencies
    └── Dockerfile         # Frontend Docker configuration
```

## Technologies

- **Backend**: Python 3.12, FastAPI, Uvicorn, PyMongo
- **Frontend**: React 18, Node.js
- **Database**: MongoDB 7.0
- **Deployment**: Docker, Docker Compose

## Usage

1. Enter your name in the text field
2. Click "Submit"
3. The API saves your name to MongoDB and returns a greeting
4. View all submitted names in the table below
5. Click "Clear All" to delete all names from the database

## Database Schema

**Collection**: `names`

```json
{
  "name": "string",
  "timestamp": "ISO 8601 datetime string"
}
```

## License

MIT
