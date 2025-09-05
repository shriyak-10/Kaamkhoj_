from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Import your models and business logic modules
from models.employer import Employer
from models.worker import Worker

from bot_logic.employer_flow import save_employer
from bot_logic.worker_flow import (
    router as worker_router,
    get_all_workers,
    find_workers,
    update_worker_by_id
)
from bot_logic.admin_flow import router as admin_router

# Create the FastAPI app! THIS MUST BE AT TOP LEVEL!
app = FastAPI(title="KaamKhoj Bot API", version="1.1")

# Set up CORS so React frontend can call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(admin_router)
app.include_router(worker_router)

@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to KaamKhoj Bot!"}

@app.post("/employer", tags=["Employer"])
def post_job(employer: Employer):
    try:
        result = save_employer(employer.dict())
        return {
            "success": True,
            "message": "Employer job posted successfully!",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/workers", tags=["Worker"])
def get_workers():
    try:
        result = get_all_workers()
        return {
            "success": True,
            "message": "List of registered workers",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/match", tags=["Matching"])
def match_workers(skill: str, location: str):
    try:
        result = find_workers(skill, location)
        return {
            "success": True,
            "message": "Matching workers found",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/worker/{worker_id}", tags=["Worker"])
def update_worker(worker_id: str, update_data: dict):
    try:
        result = update_worker_by_id(worker_id, update_data)
        return {
            "success": True,
            "message": "Worker updated successfully",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
