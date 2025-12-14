from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from app.services.auth_service import verify_token
from app.services.spotify_service import SpotifyService
from app.services.scoring_service import ScoringService
from app.schemas.music import MusicData

router = APIRouter()

class AnalyzeRequest(BaseModel):
    spotify_access_token: str

@router.post("/analyze", response_model=MusicData)
async def analyze_music(
    request: AnalyzeRequest,
    current_user: dict = Depends(verify_token)
):
    """
    Analyzes the user's Spotify history to generate a taste score and roast profile.
    Requires a valid Spotify Access Token passed from the frontend.
    """
    
    spotify_token = request.spotify_access_token
    if not spotify_token:
        raise HTTPException(status_code=400, detail="Missing Spotify Access Token")
        
    service = SpotifyService(spotify_token)
    scorer = ScoringService()
    
    try:
        # 1. Fetch Data concurrently (in a real app, gather these)
        top_artists = await service.get_top_artists(limit=20)
        top_tracks = await service.get_top_tracks(limit=20)
        recent_tracks = await service.get_recent_tracks(limit=20)
        
        # 2. Calculate Score
        music_data = scorer.calculate_score(top_artists, top_tracks)
        
        # 3. Add recent tracks (not used in score but needed for display)
        music_data.recent_tracks = recent_tracks
        
        # 4. Save to Database (TODO: Implement Database saving logic later)
        # We'll do this when we implement the "Roast" persistence layer
        
        return music_data
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await service.close()
