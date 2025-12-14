import google.generativeai as genai
import os
from app.schemas.music import MusicData

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not set")
        genai.configure(api_key=api_key)
        # Use the latest stable model
        self.model = genai.GenerativeModel('models/gemini-2.5-flash-lite')

    async def generate_roast(self, music_data: MusicData) -> dict:
        """
        Generates a brutal roast and a persona based on the user's music data.
        Returns: {'roast': str, 'persona': str}
        """
        
        # Construct the prompt
        top_artists = ", ".join([a.name for a in music_data.top_artists[:5]])
        top_tracks = ", ".join([f"{t.name} by {t.artist_names[0]}" for t in music_data.top_tracks[:5]])
        genres = ", ".join(music_data.dominating_genres) if music_data.dominating_genres else "unknown"
        traits = ", ".join(music_data.roast_traits) if music_data.roast_traits else "mysterious"
        
        print(f"[Gemini] Generating roast for: Artists={top_artists}, Tracks={top_tracks}")
        
        prompt = f"""
        You are a mean, brutal, Gen-Z music critic. Your job is to ROAST the user's music taste and assign them a specific, funny archetypal PERSONA.
        
        USER DATA:
        - Top Artists: {top_artists}
        - Top Tracks: {top_tracks}
        - Top Genres: {genres}
        - Taste Score: {music_data.taste_score}/100 (Lower is more "basic")
        - Traits: {traits}
        
        INSTRUCTIONS:
        1. **ROAST**: Write a short, biting paragraph (3-4 sentences) directly addressing the user. Mention specific artists. Be ruthless.
        2. **PERSONA**: content of "persona" field. Give them a short, funny 3-5 word title describing their vibe (e.g., "Sad 2014 Indie Kid", "Gas Station Drake Fan", "Divorced Dad Rock Enthusiast").
        
        FORMAT:
        Return ONLY valid JSON with no markdown formatting.
        {{
            "roast": "Your roast text here...",
            "persona": "Your Persona Title"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Clean response if it contains markdown code blocks
            clean_text = response.text.replace('```json', '').replace('```', '').strip()
            import json
            data = json.loads(clean_text)
            
            print(f"[Gemini] Generated success: Persona='{data.get('persona')}'")
            return data
        except Exception as e:
            print(f"[Gemini] ERROR: {type(e).__name__}: {e}")
            # Fallback
            return {
                "roast": f"Your top artist is {music_data.top_artists[0].name if music_data.top_artists else 'unknown'}? That's rough. Even our AI couldn't handle the cringe. 💀",
                "persona": "Basic Music Consumer"
            }
