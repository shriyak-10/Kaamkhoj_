import firebase_admin
from firebase_admin import credentials, firestore, storage
from dotenv import load_dotenv
import os

load_dotenv()

SERVICE_ACCOUNT_PATH = os.getenv("FIREBASE_CREDENTIALS", "serviceAccountKey.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'kaamkhoj-67bfe.appspot.com'  # Add your Firebase Storage bucket here
    })

db = firestore.client()
bucket = storage.bucket()  # For file uploads
