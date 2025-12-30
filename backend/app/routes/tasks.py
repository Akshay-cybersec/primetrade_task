from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.database import tasks_collection
from app.schemas import TaskSchema
from app.auth_utils import get_current_user

router = APIRouter()

def serialize_task(task):
    task["id"] = str(task["_id"])
    del task["_id"]
    return task


@router.get("/")
async def get_tasks(user=Depends(get_current_user)):
    tasks = await tasks_collection.find({"user_id": user["id"]}).to_list(100)
    return [serialize_task(task) for task in tasks]


@router.post("/")
async def create_task(task: TaskSchema, user=Depends(get_current_user)):
    task_data = {
        "title": task.title,
        "description": task.description,
        "user_id": user["id"]
    }
    result = await tasks_collection.insert_one(task_data)
    inserted_task = await tasks_collection.find_one({"_id": result.inserted_id})
    return serialize_task(inserted_task)


@router.put("/{task_id}")
async def update_task(task_id: str, task: TaskSchema, user=Depends(get_current_user)):
    existing = await tasks_collection.find_one({"_id": ObjectId(task_id)})

    if not existing or existing["user_id"] != user["id"]:
        raise HTTPException(status_code=404, detail="Task not found")

    await tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"title": task.title, "description": task.description}}
    )

    updated_task = await tasks_collection.find_one({"_id": ObjectId(task_id)})
    return serialize_task(updated_task)


@router.delete("/{task_id}")
async def delete_task(task_id: str, user=Depends(get_current_user)):
    task = await tasks_collection.find_one({"_id": ObjectId(task_id)})

    if not task or task["user_id"] != user["id"]:
        raise HTTPException(status_code=404, detail="Task not found")

    await tasks_collection.delete_one({"_id": ObjectId(task_id)})
    return {"message": "Task deleted"}
