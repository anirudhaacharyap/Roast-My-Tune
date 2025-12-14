import httpx
from typing import List, Dict, Any
from app.schemas.music import Track, Artist, MusicData
import os

class SpotifyService:
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.base_url = "https://api.spotify.com/v1"
        self.client = httpx.AsyncClient(headers={
            "Authorization": f"Bearer {access_token}"
        })

    async def close(self):
        await self.client.aclose()

    async def get_top_artists(self, limit: int = 20, time_range: str = "medium_term") -> List[Artist]:
        response = await self.client.get(
            f"{self.base_url}/me/top/artists",
            params={"limit": limit, "time_range": time_range}
        )
        response.raise_for_status()
        data = response.json()
        
        return [
            Artist(
                id=item["id"],
                name=item["name"],
                genres=item["genres"],
                popularity=item["popularity"],
                image_url=item["images"][0]["url"] if item["images"] else None
            ) for item in data["items"]
        ]

    async def get_top_tracks(self, limit: int = 20, time_range: str = "medium_term") -> List[Track]:
        response = await self.client.get(
            f"{self.base_url}/me/top/tracks",
            params={"limit": limit, "time_range": time_range}
        )
        response.raise_for_status()
        data = response.json()
        
        # We need to fetch audio features separately
        try:
            tracks_data = data["items"]
            track_ids = [t["id"] for t in tracks_data]
            audio_features = await self.get_audio_features(track_ids)
        except Exception as e:
            print(f"Warning: Failed to fetch audio features: {e}")
            audio_features = [] # Fallback to empty features
        
        tracks = []
        for i, item in enumerate(tracks_data):
            # Safe access to audio features
            feat = {}
            if audio_features and i < len(audio_features):
                feat = audio_features[i] or {}

            tracks.append(Track(
                id=item["id"],
                name=item["name"],
                artist_names=[a["name"] for a in item["artists"]],
                album_name=item["album"]["name"],
                popularity=item["popularity"],
                image_url=item["album"]["images"][0]["url"] if item["album"]["images"] else None,
                danceability=feat.get("danceability"),
                energy=feat.get("energy"),
                valence=feat.get("valence"),
                tempo=feat.get("tempo")
            ))
        return tracks

    async def get_recent_tracks(self, limit: int = 20) -> List[Track]:
        response = await self.client.get(
            f"{self.base_url}/me/player/recently-played",
            params={"limit": limit}
        )
        response.raise_for_status()
        data = response.json()
        
        # Recent tracks structure is slightly different (wrapped in 'track' object)
        tracks_data = [item["track"] for item in data["items"]]
        
        # Create minimal Track objects (we skip audio features for recent tracks to save calls for now)
        return [
            Track(
                id=item["id"],
                name=item["name"],
                artist_names=[a["name"] for a in item["artists"]],
                album_name=item["album"]["name"],
                popularity=item["popularity"],
                image_url=item["album"]["images"][0]["url"] if item["album"]["images"] else None
            ) for item in tracks_data
        ]

    async def get_audio_features(self, track_ids: List[str]) -> List[Dict[str, Any]]:
        if not track_ids:
            return []
        # Max 100 ids per call
        chunks = [track_ids[i:i + 100] for i in range(0, len(track_ids), 100)]
        all_features = []
        
        for chunk in chunks:
            ids_str = ",".join(chunk)
            response = await self.client.get(
                f"{self.base_url}/audio-features",
                params={"ids": ids_str}
            )
            response.raise_for_status()
            data = response.json()
            all_features.extend(data["audio_features"])
            
        return all_features
