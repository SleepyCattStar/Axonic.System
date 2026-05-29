from fastapi import APIRouter

from app.services.temperature.temperature_service import (
    get_cpu_temperature,
    get_thermal_status
)

router = APIRouter()


@router.get("/temperature")
def temperature_stats():

    cpu_temp = get_cpu_temperature()

    return {

        "cpu_temp": cpu_temp,

        "thermal_status":
            get_thermal_status(cpu_temp)
    }