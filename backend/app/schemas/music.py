from pydantic import BaseModel
from typing import List, Optional

class Artist(BaseModel):
    id: str
    name: str
    genres: List[str]
    popularity: int
    image_url: Optional[str] = None

class Track(BaseModel):
    id: str
    name: str
    artist_names: List[str]
    album_name: str
    popularity: int
    image_url: Optional[str] = None
    # Audio features
    danceability: Optional[float] = None
    energy: Optional[float] = None
    valence: Optional[float] = None
    tempo: Optional[float] = None

class MusicData(BaseModel):
    top_artists: List[Artist]
    top_tracks: List[Track]
    recent_tracks: List[Track]
    
    # Aggregated stats for scoring
    average_popularity: float
    dominating_genres: List[str]
    musical_era: str # e.g., "2010s", "Modern"
    
    # The calculated score (added by ScoringService)
    taste_score: int
    roast_traits: List[str] # Keywords for the LLM (e.g., "Basic", "Depressing", "Boomer")
