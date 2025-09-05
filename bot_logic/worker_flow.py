from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from firebase_admin import auth
from firebase_config import db
from bot_logic.storage_helpers import upload_document

router = APIRouter()

def get_all_workers():
    workers = db.collection("workers").stream()
    return [w.to_dict() for w in workers]

def find_workers(skill, location):
    workers = db.collection("workers")\
        .where("skills", "array_contains", skill)\
        .where("location", "==", location).stream()
    return [w.to_dict() for w in workers]

def update_worker_by_id(worker_id, update_data):
    worker_ref = db.collection("workers").document(worker_id)
    worker_ref.update(update_data)
    return worker_ref.get().to_dict()

@router.post("/pre-register-worker")
async def pre_register_worker(
    uid: str = Form(...),
    name: str = Form(...),
    location: str = Form(...),
    skills: str = Form(...),  # comma separated skills
    contact: str = Form(None),
    available: bool = Form(True),
    document: UploadFile = File(None)  # Optional document upload
):
    # Check if user already exists in Firebase Auth
    try:
        auth.get_user(uid)
        raise HTTPException(status_code=400, detail="User already exists in Firebase Auth.")
    except auth.UserNotFoundError:
        pass

    # Upload document if provided
    doc_url = None
    if document:
        doc_url = upload_document(document)
    
    # Prepare data dict
    data = {
        "uid": uid,
        "name": name,
        "location": location,
        "skills": [s.strip() for s in skills.split(",")],
        "contact": contact or "Not Provided",
        "available": available,
        "role": "worker",
        "status": "pending",
    }

    if doc_url:
        data["document_url"] = doc_url

    # Save to pending registrations collection
    db.collection("pending_registrations").document(uid).set(data)

    return {"message": "Pre-registration successful; pending admin approval."}
