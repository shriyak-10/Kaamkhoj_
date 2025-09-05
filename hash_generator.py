import hmac, hashlib, base64

def generate_hash(password, key):
    hash = hmac.new(key.encode(), password.encode(), hashlib.sha256).digest()
    return base64.b64encode(hash).decode()

print(generate_hash("kaamkhoj123", "dummydummydummydummydummydummy"))
print(generate_hash("hireme456", "dummydummydummydummydummydummy"))