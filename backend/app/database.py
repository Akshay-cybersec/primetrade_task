import motor.motor_asyncio
import os
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))
MONGO_URL = os.getenv("MONGO_URI")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client["primetrade"]
users_collection = db["users"]
tasks_collection = db["tasks"]
