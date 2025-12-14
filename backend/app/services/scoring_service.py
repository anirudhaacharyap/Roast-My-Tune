from typing import List, Dict
from app.schemas.music import MusicData, Track, Artist
from collections import Counter
import random

class ScoringService:
    def calculate_score(self, top_artists: List[Artist], top_tracks: List[Track]) -> MusicData:
        """
        Calculates the 'Taste Score' and aggregations.
        Score Logic (0-100):
        - High Popularity -> Lower Score (Basic)
        - Mainstream genres -> Lower Score
        - Variety in genres -> Higher Score
        - Having niche genres -> Higher Score
        *This is joke logic for roasting purposes*
        """
        
        if not top_tracks or not top_artists:
            return None

        # 1. Average Popularity (0-100 from Spotify)
        avg_pop_tracks = sum(t.popularity for t in top_tracks) / len(top_tracks)
        avg_pop_artists = sum(a.popularity for a in top_artists) / len(top_artists)
        overall_pop = (avg_pop_tracks + avg_pop_artists) / 2
        
        print(f"[Scoring] Avg Track Popularity: {avg_pop_tracks:.1f}, Avg Artist Popularity: {avg_pop_artists:.1f}")
        
        # 2. Dominating Genres
        all_genres = []
        for a in top_artists:
            all_genres.extend(a.genres)
        genre_counts = Counter(all_genres)
        top_genres = [g[0] for g in genre_counts.most_common(5)]
        
        print(f"[Scoring] Top Genres: {top_genres}")
        
        # 3. Calculate Score
        # Base score: inverse of popularity (more mainstream = lower score)
        # Popularity of 50 = 50 score base, Popularity of 80 = 20 score base
        score = 100 - overall_pop
        
        # Penalty for basic genres (max -15 pts)
        basic_genres = ["pop", "dance pop", "edm", "top 40", "mainstream"]
        for genre in top_genres:
            if any(bg in genre.lower() for bg in basic_genres):
                score -= 5
                
        # Bonus for "sophisticated" genres (max +15 pts)
        cool_genres = ["jazz", "classical", "indie", "alternative", "metal", "punk", "folk"]
        for genre in top_genres:
            if any(cg in genre.lower() for cg in cool_genres):
                score += 5
                
        # Variety bonus: more unique genres = higher score
        unique_genres = len(set(all_genres))
        if unique_genres > 15:
            score += 10
        elif unique_genres > 10:
            score += 5
            
        # Add slight randomness for fun (-5 to +5)
        score += random.randint(-5, 5)
        
        # Clamp to 0-100
        score = max(0, min(100, int(score)))
        
        print(f"[Scoring] Final Score: {score}")
        
        # Traits generation based on data
        traits = []
        
        # Popularity-based traits
        if overall_pop > 75:
            traits.extend(["Basic", "NPC", "Billboard Bot"])
        elif overall_pop > 60:
            traits.extend(["Mainstream-Adjacent", "Playlist Andy"])
        elif overall_pop > 40:
            traits.extend(["Average", "Mid"])
        elif overall_pop > 20:
            traits.extend(["Indie Kid", "Pretentious"])
        else:
            traits.extend(["Hipster", "Obscure AF", "Contrarian"])
            
        # Genre-based traits
        if any("k-pop" in g.lower() for g in top_genres):
            traits.append("Stan Account")
        if any("metal" in g.lower() for g in top_genres):
            traits.append("Edge Lord")
        if any("country" in g.lower() for g in top_genres):
            traits.append("Yeehaw")
        if any("rap" in g.lower() or "hip hop" in g.lower() for g in top_genres):
            traits.append("Bars Only")
        if any("r&b" in g.lower() for g in top_genres):
            traits.append("Smooth Operator")
        if any("rock" in g.lower() for g in top_genres):
            traits.append("Guitar Hero")
            
        # Musical Era
        era = "Modern"
        if any("80s" in g for g in top_genres): era = "80s Nostalgia"
        elif any("90s" in g for g in top_genres): era = "90s Kid"
        elif any("classic" in g.lower() for g in top_genres): era = "Boomer Energy"
        
        return MusicData(
            top_artists=top_artists,
            top_tracks=top_tracks,
            recent_tracks=[],
            average_popularity=overall_pop,
            dominating_genres=top_genres,
            musical_era=era,
            taste_score=score,
            roast_traits=traits[:4]  # Limit to 4 traits
        )
