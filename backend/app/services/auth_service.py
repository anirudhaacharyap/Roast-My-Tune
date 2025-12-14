import os
from supabase import create_client, Client
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create client only if keys are present (lazy init or handle error)
# For now, we assume they will be present at runtime
supabase: Client = None

def get_supabase_client() -> Client:
    global supabase
    if supabase is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Verifies the JWT token from the Authorization header using Supabase.
    Returns the user data if valid.
    """
    token = credentials.credentials
    client = get_supabase_client()
    
    try:
        # get_user verifies the JWT signature and expiration
        response = client.auth.get_user(token)
        if not response.user:
             raise HTTPException(status_code=401, detail="Invalid token")
        return response.user
    except Exception as e:
        # In a real app we might check specifically for expired token errors
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
