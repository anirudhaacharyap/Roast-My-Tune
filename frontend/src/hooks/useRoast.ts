
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? '' : 'http://localhost:8000');

export interface RoastResult {
    id?: number;
    roast_text: string;
    persona: string;
    era?: {
        title: string;
        description: string;
    };
    hogwarts_house?: {
        house: string;
        reason: string;
    };
    taste_score: number;
    roast_traits: string[];
    music_data: {
        top_artists: any[];
        top_tracks: any[];
        genres: string[];
    };
}

export const useRoast = () => {
    const { session } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RoastResult | null>(null);

    const generateRoast = async () => {
        if (!session) {
            setError("Not authenticated");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Get Spotify Provider Token
            // Supabase stores the provider token in the session object under 'provider_token'
            // Only available if we requested it during sign-in scopes, which we did.
            const spotifyToken = session.provider_token;

            if (!spotifyToken) {
                throw new Error("Spotify access token not found. Try logging out and back in.");
            }

            // 2. Call Backend
            const response = await fetch(`${API_URL}/api/roast/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`, // Supabase JWT
                },
                body: JSON.stringify({
                    spotify_access_token: spotifyToken,
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to generate roast');
            }

            const data = await response.json();
            setResult(data);

        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { generateRoast, loading, error, result };
};
