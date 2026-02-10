# React Frontend for Weight Tracker API

This is a React frontend that connects to the Python FastAPI backend for tracking weight.

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## How it works

- Enter your weight in kilograms in the input field
- Click the "Save Weight" button
- The app will call the Python API (`http://localhost:8000/?weight=YOUR_WEIGHT`)
- The response message will be displayed
- Your weight history is shown in a table below with timestamps

## Features

- Weight input with validation (only accepts positive numbers)
- Real-time weight history table
- Clear all weights functionality
- Responsive design with modern UI

**Note:** Make sure the Python FastAPI server is running on port 8000 before using this frontend.
