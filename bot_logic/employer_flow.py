
from firebase_config import db
from bot_logic.storage_helpers import save_employer, create_worker_profile
from fastapi import APIRouter
from models.employer import Employer
from firebase_config import db  # assuming this initializes Firestore

router = APIRouter()

@router.post("/register-employer")
async def register_employer(employer_data: Employer):
    print("📥 Received employer data:", employer_data.dict())

    result = db.collection("employers").add(employer_data.dict())
    print("✅ Saved to Firestore:", result)

    return {"status": "success", "id": result[1].id}
def save_employer(data: dict):
    db.collection("employers").add(data)
    return "Job posted successfully!"