
import { useEffect, useRef } from 'react';

interface AudioAuraProps {
    energy: number; // 0-1
    valence: number; // 0-1
    className?: string;
}

export const AudioAura = ({ energy, valence, className = "" }: AudioAuraProps) => {
    // Determine colors based on valence (mood)
    // Low valence = Blue/Purple (Sad)
    // High valence = Orange/Pink (Happy)
    const getColors = () => {
        if (valence > 0.6) return ["#f9a8d4", "#fde047"]; // Pink/Yellow
        if (valence > 0.4) return ["#c084fc", "#f472b6"]; // Purple/Pink
        return ["#60a5fa", "#818cf8"]; // Blue/Indigo
    };

    const [color1, color2] = getColors();

    // Animation duration based on energy (High energy = fast)
    // Energy 1.0 = 2s, Energy 0.0 = 10s
    const speed = 10 - (energy * 8);

    return (
        <div className={`relative w-full h-64 overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Blob 1 */}
                <div
                    className="absolute col-span-1 w-48 h-48 rounded-full blur-3xl opacity-60 mix-blend-screen animate-blob"
                    style={{
                        backgroundColor: color1,
                        animationDuration: `${speed}s`
                    }}
                />
                {/* Blob 2 */}
                <div
                    className="absolute w-40 h-40 rounded-full blur-3xl opacity-60 mix-blend-screen animate-blob animation-delay-2000"
                    style={{
                        backgroundColor: color2,
                        animationDuration: `${speed * 1.2}s`,
                        left: '20%'
                    }}
                />
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">Your Audio Aura</h3>
                <div className="flex gap-4 text-xs font-mono text-white/80">
                    <span>MOOD: {Math.round(valence * 100)}%</span>
                    <span>ENERGY: {Math.round(energy * 100)}%</span>
                </div>
                <p className="mt-4 text-sm text-white/90 italic max-w-[200px]">
                    {valence < 0.3 ? "It's giving... existential dread." :
                        valence > 0.7 ? "Unbearably cheerful." : "Confused but spirited."}
                </p>
            </div>
        </div>
    );
};
