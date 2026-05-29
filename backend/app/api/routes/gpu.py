from fastapi import APIRouter

from app.services.gpu.gpu_service import (
    get_gpu_stats
)

router = APIRouter()


@router.get("/gpu")
def gpu_stats():

    return get_gpu_stats()