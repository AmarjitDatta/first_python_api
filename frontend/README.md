# React Frontend for Hello World API

This is a React frontend that connects to the Python FastAPI backend.

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

- Enter your name in the text input field
- Click the Submit button
- The app will call the Python API (`http://localhost:8000/?name=YOUR_NAME`)
- The response message will be displayed

**Note:** Make sure the Python FastAPI server is running on port 8000 before using this frontend.
