from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.auth_service import verify_token
from app.services.spotify_service import SpotifyService
from app.services.scoring_service import ScoringService
from app.services.gemini_service import GeminiService


router = APIRouter()

class GenerateRoastRequest(BaseModel):
    spotify_access_token: str

class RoastResponse(BaseModel):
    id: int | None = None
    roast_text: str
    persona: str
    taste_score: int
    roast_traits: list[str]
    music_data: dict # simplified snapshot

@router.post("/generate", response_model=RoastResponse)
async def generate_roast_endpoint(
    request: GenerateRoastRequest,
    current_user: dict = Depends(verify_token)
):
    """
    Full pipeline: Fetch Spotify Data -> Calculate Score -> Generate Roast.
    Database saving is optional and will not block roast generation.
    """
    if not request.spotify_access_token:
        raise HTTPException(status_code=400, detail="Missing Spotify Token")

    # 1. Pipeline execution
    spotify = SpotifyService(request.spotify_access_token)
    scorer = ScoringService()
    gemini = GeminiService()
    
    try:
        # Fetch
        top_artists = await spotify.get_top_artists()
        top_tracks = await spotify.get_top_tracks()
        
        # Score
        music_data = scorer.calculate_score(top_artists, top_tracks)
        
        # Roast (Returns Dict with 'roast' and 'persona')
        ai_result = await gemini.generate_roast(music_data)
        
        # Build response snapshot
        snapshot = {
            "top_artists": [a.model_dump() for a in music_data.top_artists[:5]],
            "top_tracks": [t.model_dump() for t in music_data.top_tracks[:5]],
            "genres": music_data.dominating_genres
        }
        
        # No DB - just return response
        return RoastResponse(
            id=None,
            roast_text=ai_result.get("roast", "Roast failed"),
            persona=ai_result.get("persona", "Basic Music Consumer"),
            taste_score=music_data.taste_score,
            roast_traits=music_data.roast_traits,
            music_data=snapshot
        )

        
    except Exception as e:
        print(f"Roast generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await spotify.close()
