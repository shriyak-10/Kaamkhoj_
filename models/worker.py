from typing import Optional
from pydantic import BaseModel

class Worker(BaseModel):
    uid: str
    name: str
    location: str
    skills: list[str]
    contact: Optional[str] = None
    available: Optional[bool] = True