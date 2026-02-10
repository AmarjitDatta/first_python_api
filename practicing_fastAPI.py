from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
import os

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = MongoClient(MONGODB_URL)
db = client.namesdb
names_collection = db.names

@app.get("/")
def read_root(name: str = "World"):
    # Save name to database with timestamp
    name_entry = {
        "name": name,
        "timestamp": datetime.utcnow().isoformat()
    }
    names_collection.insert_one(name_entry)
    
    return {"message": f"Hello, World! My name is {name}"}

@app.get("/names")
def get_all_names():
    # Retrieve all names from database
    names = list(names_collection.find({}, {"_id": 0, "name": 1, "timestamp": 1}).sort("timestamp", -1))
    return {"names": names}

@app.delete("/names")
def clear_all_names():
    # Clear all names from database
    result = names_collection.delete_many({})
    return {"message": f"Deleted {result.deleted_count} names"}