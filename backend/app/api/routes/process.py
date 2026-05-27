import os
import signal
from fastapi import HTTPException
from fastapi import APIRouter
from app.services.process_service import get_top_processes
from app.services.process_service import kill_process


router = APIRouter()

@router.get("/processes")
def processes():
    return get_top_processes()

@router.delete("/process/{pid}")
def delete_process(pid: int):
    return kill_process(pid)
