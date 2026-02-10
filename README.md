# First Python API

A full-stack weight tracking application with Python FastAPI backend, React frontend, and MongoDB database - all containerized with Docker.

## Features

- **FastAPI Backend**: Python REST API with GET and DELETE endpoints
- **React Frontend**: Interactive UI with real-time weight history table
- **MongoDB Database**: Persistent storage for weight entries with timestamps
- **Docker Support**: Complete Docker setup for all three services
- **CORS Enabled**: Frontend and backend communicate seamlessly
- **Input Validation**: Ensures only valid weight values are accepted

## API Endpoints

- **GET /** - Save weight and get confirmation
  - Query Parameter: `weight` (required, float in kg)
  - Response: `{"message": "Weight X kg saved successfully!"}`
  - Also saves the weight to MongoDB with timestamp

- **GET /weights** - Retrieve all saved weights from database
  - Response: `{"weights": [{"weight": 75.5, "timestamp": "2026-02-10T12:34:56"}]}`

- **DELETE /weights** - Clear all weight entries from database
  - Response: `{"message": "Deleted X weight entries"}`

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
    │   ├── App.js         # Main React component with weight tracker
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

1. Enter your weight in kilograms (supports decimals)
2. Click "Save Weight"
3. The API saves your weight to MongoDB with the current timestamp
4. View your weight history in the table below (sorted by most recent)
5. Click "Clear All" to delete all weight entries from the database

## Database Schema

**Collection**: `weights`

```json
{
  "weight": "float (kg)",
  "timestamp": "ISO 8601 datetime string"
}
```

## License

MIT
