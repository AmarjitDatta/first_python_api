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
db = client.weightsdb
weights_collection = db.weights

@app.get("/")
def save_weight(weight: float):
    # Save weight to database with timestamp
    weight_entry = {
        "weight": weight,
        "timestamp": datetime.utcnow().isoformat()
    }
    weights_collection.insert_one(weight_entry)
    
    return {"message": f"Weight {weight} kg saved successfully!"}

@app.get("/weights")
def get_all_weights():
    # Retrieve all weights from database
    weights = list(weights_collection.find({}, {"_id": 0, "weight": 1, "timestamp": 1}).sort("timestamp", -1))
    return {"weights": weights}

@app.delete("/weights")
def clear_all_weights():
    # Clear all weights from database
    result = weights_collection.delete_many({})
    return {"message": f"Deleted {result.deleted_count} weight entries"}