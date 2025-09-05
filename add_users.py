import firebase_admin
from firebase_admin import credentials, auth

# Path to your Firebase service account key
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Users to add
users_to_create = [
    {
        "uid": "worker001",
        "email": "worker001@kaamkhoj.com",
        "email_verified": True,
        "password": "kaamkhoj123"
    },
    {
        "uid": "employer001",
        "email": "employer001@kaamkhoj.com",
        "email_verified": True,
        "password": "hireme456"
    }
]

# Add users one by one
for u in users_to_create:
    try:
        user = auth.create_user(
            uid=u["uid"],
            email=u["email"],
            email_verified=u["email_verified"],
            password=u["password"]
        )
        print(f"✅ Created {user.uid}")
    except Exception as e:
        print(f"❌ Error with {u['uid']}: {e}")