from bson import ObjectId
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: str | None = None
    username: str
    email: EmailStr
    password: str

class Task(BaseModel):
    id: str | None = None
    title: str
    description: str | None = None
    user_id: str
