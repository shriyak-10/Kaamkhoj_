from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Import your modules as before
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

app = FastAPI(title="KaamKhoj Bot API", version="1.1")

DIST_DIR = os.path.join(os.path.dirname(__file__), "dist")
INDEX_FILE_PATH = os.path.join(DIST_DIR, "index.html")

# Serve React static assets
app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

# Serve vite.svg file directly
@app.get("/vite.svg")
async def vite_svg():
    return FileResponse(os.path.join(DIST_DIR, "vite.svg"))

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your API routers
app.include_router(admin_router)
app.include_router(worker_router)

@app.get("/api", tags=["Root"])
def root():
    return {"message": "Welcome to KaamKhoj Bot!"}

@app.post("/api/employer", tags=["Employer"])
def post_job(employer: Employer):
    try:
        result = save_employer(employer.dict())
        return {"success": True, "message": "Employer job posted successfully!", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/workers", tags=["Worker"])
def get_workers():
    try:
        result = get_all_workers()
        return {"success": True, "message": "List of registered workers", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/match", tags=["Matching"])
def match_workers(skill: str, location: str):
    try:
        result = find_workers(skill, location)
        return {"success": True, "message": "Matching workers found", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/worker/{worker_id}", tags=["Worker"])
def update_worker(worker_id: str, update_data: dict):
    try:
        result = update_worker_by_id(worker_id, update_data)
        return {"success": True, "message": "Worker updated successfully", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Catch-all route to serve React app for frontend routes, excluding API
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    return FileResponse(INDEX_FILE_PATH)
