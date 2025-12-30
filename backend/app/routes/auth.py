from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.schemas import SignupSchema, LoginSchema
from app.auth_utils import verify_password, hash_password, create_access_token

router = APIRouter()

@router.post("/signup")
async def signup(user: SignupSchema):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user.password = hash_password(user.password)
    await users_collection.insert_one(user.dict())
    return {"message": "User registered!"}

@router.post("/login")
async def login(user: LoginSchema):
    db_user = await users_collection.find_one({"email": user.email})
    if (not db_user) or (not verify_password(user.password, db_user["password"])):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": str(db_user["_id"])})
    return {"token": token}
