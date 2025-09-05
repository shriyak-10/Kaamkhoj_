import firebase_admin
from firebase_admin import credentials, firestore, storage
import os, json

# Get Firebase credentials from Railway variable
service_account_info = os.getenv("GOOGLE_CREDENTIALS")

if not service_account_info:
    raise ValueError("GOOGLE_CREDENTIALS environment variable not set on Railway")

# Parse the JSON string from the env variable
service_account_dict = json.loads(service_account_info)

if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_dict)
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'kaamkhoj-67bfe.appspot.com'
    })

# Firestore client
db = firestore.client()

# Storage bucket client
bucket = storage.bucket()
