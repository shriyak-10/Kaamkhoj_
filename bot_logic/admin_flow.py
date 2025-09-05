from fastapi import APIRouter, HTTPException
from firebase_admin import auth
from firebase_config import db

router = APIRouter()

@router.get("/admin/pending-registrations")
def get_pending_registrations():
    docs = db.collection("pending_registrations").where("status", "==", "pending").stream()
    return [doc.to_dict() for doc in docs]

@router.post("/admin/approve-registration/{uid}")
def approve_registration(uid: str):
    doc_ref = db.collection("pending_registrations").document(uid)
    snapshot = doc_ref.get()
    if not snapshot.exists:
        raise HTTPException(status_code=404, detail="Registration not found")

    data = snapshot.to_dict()

    # Create user in Firebase Auth
    new_user = auth.create_user(uid=data["uid"])

    # Make sure document_url field is preserved (adjust field name if needed)
    if "document_url" in data:
        data["DocumentURL"] = data.pop("document_url")  # Optional: rename if you want consistency

    # Move to workers or employers collection depending on role
    collection_name = "workers" if data.get("role") == "worker" else "employers"
    db.collection(collection_name).document(uid).set(data)

    # Update pending registration status
    doc_ref.update({"status": "approved"})

    return {"message": f"User {uid} approved and registered."}

@router.post("/admin/reject-registration/{uid}")
def reject_registration(uid: str, reason: str = None):
    doc_ref = db.collection("pending_registrations").document(uid)
    snapshot = doc_ref.get()
    if not snapshot.exists:
        raise HTTPException(status_code=404, detail="Registration not found")
    doc_ref.update({"status": "rejected", "rejection_reason": reason})
    return {"message": f"User {uid} rejected. Reason: {reason}"}
