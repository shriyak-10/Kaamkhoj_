from firebase_config import db
from firebase_admin import firestore
from typing import List, Optional

from firebase_config import bucket

def upload_document(document):
    blob = bucket.blob(document.filename)
    blob.upload_from_file(document.file)
    blob.make_public()
    return blob.public_url

def save_employer(data: dict) -> str:
    try:
        db.collection("employers").add(data)
        return "✅ Job posted successfully!"
    except Exception as e:
        # You can log this error or send it to a monitoring service
        return f"❌ Failed to post job: {str(e)}"

def create_worker_profile(
    uid: str,
    name: str,
    location: str,
    skills: List[str],
    contact: Optional[str] = None,
    available: bool = True,
    document_url: Optional[str] = None
) -> str:
    profile = {
        "Name": name,
        "Location": location,
        "Skills": skills,
        "Contact": contact if contact else "Not Provided",
        "Available": available,
        "Role": "worker",
        "Timestamp": firestore.SERVER_TIMESTAMP
    }

    if document_url:
        profile["DocumentURL"] = document_url

    try:
        db.collection("workers").document(uid).set(profile)
        return "✅ Worker profile created successfully!"
    except Exception as e:
        return f"❌ Failed to create worker profile: {str(e)}"