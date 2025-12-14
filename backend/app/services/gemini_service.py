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

    async def generate_roast(self, music_data: MusicData) -> str:
        """
        Generates a brutal roast based on the user's music data.
        """
        
        # Construct the prompt
        top_artists = ", ".join([a.name for a in music_data.top_artists[:5]])
        top_tracks = ", ".join([f"{t.name} by {t.artist_names[0]}" for t in music_data.top_tracks[:5]])
        genres = ", ".join(music_data.dominating_genres) if music_data.dominating_genres else "unknown"
        traits = ", ".join(music_data.roast_traits) if music_data.roast_traits else "mysterious"
        
        print(f"[Gemini] Generating roast for: Artists={top_artists}, Tracks={top_tracks}")
        
        prompt = f"""
        You are a mean, brutal, Gen-Z music critic. Your job is to ROAST the user's music taste based on their data.
        
        USER DATA:
        - Top Artists: {top_artists}
        - Top Tracks: {top_tracks}
        - Top Genres: {genres}
        - Taste Score: {music_data.taste_score}/100 (Lower is more "basic")
        - Traits: {traits}
        
        INSTRUCTIONS:
        1. Write a short, biting paragraph (3-4 sentences) directly addressing the user.
        2. BE SPECIFIC. You MUST mention at least 2 specific artists from their list by name and mock them.
        3. Use Gen-Z slang naturally (but don't overdo it to be cringe).
        4. Be ruthless. If they listen to pop, call them basic. If indie, call them pretentious.
        5. Do NOT start with "Oh," or "Wow,". Just dive into the insult.
        6. Return ONLY the roast text, no quotes around it.
        """
        
        try:
            response = self.model.generate_content(prompt)
            roast = response.text.replace('"', '').strip()
            print(f"[Gemini] Generated roast successfully: {roast[:50]}...")
            return roast
        except Exception as e:
            print(f"[Gemini] ERROR: {type(e).__name__}: {e}")
            # Return a personalized fallback using actual data
            return f"Your top artist is {music_data.top_artists[0].name if music_data.top_artists else 'unknown'}? That's rough. Even our AI couldn't handle the cringe. 💀"
