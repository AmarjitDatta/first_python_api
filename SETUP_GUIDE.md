# Weight Tracker API - Full Setup Guide

This project contains a Python FastAPI backend and a React frontend for tracking weight.

## Option 1: Running with Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed

### Run with Docker Compose

From the project root directory, run:

```bash
docker-compose up --build
```

This will:
- Build and run the FastAPI backend on `http://localhost:8000`
- Build and run the React frontend on `http://localhost:3000`
- Start MongoDB database on `http://localhost:27017`

To stop the containers:
```bash
docker-compose down
```

To rebuild the images:
```bash
docker-compose up --build
```

## Option 2: Running Locally (Without Docker)

### Running the Backend (Python FastAPI)

1. Activate the virtual environment:
```bash
source .venv/bin/activate
```

2. Run the FastAPI server:
```bash
uvicorn practicing_fastAPI:app --reload
```

The API will run on `http://localhost:8000`

### Running the Frontend (React)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies (first time only):
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## How to use

1. Start all services (either via Docker or locally)
2. In the React app, enter your weight in kilograms
3. Click "Save Weight" to save it to the database
4. View your weight history in the table below
5. Click "Clear All" to delete all weight entries

## API Endpoints

- **URL:** `http://localhost:8000/`
- **Method:** GET
- **Parameters:** `weight` (required, float in kg)
- **Response:** `{"message": "Weight X kg saved successfully!"}`

Example: `http://localhost:8000/?weight=75.5`

- **URL:** `http://localhost:8000/weights`
- **Method:** GET
- **Response:** List of all saved weights with timestamps

- **URL:** `http://localhost:8000/weights`
- **Method:** DELETE
- **Response:** Confirmation of deleted entries
