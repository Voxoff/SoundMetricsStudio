"""Temporary debug route — remove before production."""

from fastapi import APIRouter
from app.services import chartmetric

router = APIRouter()


@router.get("/debug/artist/{cm_id}")
async def debug_artist(cm_id: int):
    raw = await chartmetric.gather_artist_data(cm_id)
    # Return a sample of each field to inspect structure
    result = {}
    for key, val in raw.items():
        if val is None:
            result[key] = None
        elif isinstance(val, list):
            result[key] = {"type": "list", "len": len(val), "sample": val[:2] if val else []}
        elif isinstance(val, dict):
            result[key] = {"type": "dict", "keys": list(val.keys()), "sample": {k: v[:2] if isinstance(v, list) else v for k, v in list(val.items())[:3]}}
        else:
            result[key] = val
    return result
