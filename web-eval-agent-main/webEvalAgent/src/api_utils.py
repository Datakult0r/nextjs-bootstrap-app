#!/usr/bin/env python3

import httpx
from .env_utils import get_backend_url

async def validate_api_key(api_key: str) -> bool:
    """
    Validate the API key against the Operative backend service.
    
    Args:
        api_key: The API key to validate
        
    Returns:
        bool: True if the API key is valid, False otherwise
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                get_backend_url("api/validate-key"),
                headers={
                    "x-operative-api-key": api_key
                }
            )
            result = response.json()
            return result.get("valid", False)
    except Exception:
        return False
