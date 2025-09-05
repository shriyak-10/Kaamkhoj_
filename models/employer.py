from pydantic import BaseModel

class Employer(BaseModel):
    uid: str
    name: str
    organization: str
    location: str
    contact: str
    active: bool