from app.services.gpu.nvidia_gpu import get_nvidia_gpu_stats

def get_gpu_stats():

    try:
        data= get_nvidia_gpu_stats()
        return data

    except Exception as e:
        return {
            "available": False,
            "type": "none",
            "reason":str(e)
        }