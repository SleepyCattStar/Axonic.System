try:

    from pynvml import (

        nvmlInit,
        nvmlShutdown,

        nvmlDeviceGetCount,
        nvmlDeviceGetHandleByIndex,

        nvmlDeviceGetUtilizationRates,
        nvmlDeviceGetMemoryInfo,

        nvmlDeviceGetTemperature,
        nvmlDeviceGetName,

        NVML_TEMPERATURE_GPU
    )

    NVML_AVAILABLE = True

except Exception:

    NVML_AVAILABLE = False


def get_nvidia_gpu_stats():

    # SAFETY:
    # If NVML library itself is unavailable
    if not NVML_AVAILABLE:

        return {

            "available": False,
            "reason": "NVML not installed"
        }

    try:

        # INITIALIZE NVIDIA MANAGEMENT LIB
        nvmlInit()

        # SAFETY:
        # No GPU present
        device_count = nvmlDeviceGetCount()

        if device_count == 0:

            return {

                "available": False,
                "reason": "No NVIDIA GPU detected"
            }

        # USING PRIMARY GPU
        handle = nvmlDeviceGetHandleByIndex(0)

        # GPU UTILIZATION
        util =nvmlDeviceGetUtilizationRates(handle)

        # MEMORY INFO
        memory =nvmlDeviceGetMemoryInfo(handle)

        # TEMPERATURE
        temperature =nvmlDeviceGetTemperature(

                handle,
                NVML_TEMPERATURE_GPU
            )

        # GPU NAME
        name = nvmlDeviceGetName(handle)

        # HANDLE BYTES SAFELY
        if isinstance(name, bytes):

            name = name.decode()

        gpu_data = {

            "available": True,

            "name": name,

            "gpu_usage": util.gpu,

            "vram_usage": round(

                (memory.used / memory.total) * 100,
                2
            ),

            "temperature": temperature,

            "memory_used_mb": round(

                memory.used / (1024 ** 2),
                2
            ),

            "memory_total_mb": round(

                memory.total / (1024 ** 2),
                2
            )
        }

        return gpu_data

    except Exception as e:

        return {

            "available": False,

            "reason": str(e)
        }

    finally:

        # VERY IMPORTANT:
        # prevent NVML resource leaks
        try:

            nvmlShutdown()

        except Exception:

            pass