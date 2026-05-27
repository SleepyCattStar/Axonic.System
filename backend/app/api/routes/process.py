import os
import signal
from fastapi import HTTPException
from fastapi import APIRouter
from app.services.process_service import get_top_processes


router = APIRouter()

@router.get("/processes")
def processes():
    return get_top_processes()

@router.delete("/kill-process/{pid}")
def kill_process(pid: int):

    try: 
        os.kill(pid)
        return {
            "message": f"Process {pid} terminated"
        }
    except ProcessLookupError:

        raise HTTPException(
            status_code=404,
            detail="Process not found"
        )

    except PermissionError:

        raise HTTPException(
            status_code=403,
            detail="Permission denied"
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )