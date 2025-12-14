import React, { useState, useEffect } from "react";
import { useRoast } from "@/hooks/useRoast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WavyBackground } from "@/components/WavyBackground";
import { MoodChart } from "@/components/MoodChart";
import { FloatingEmoji } from "@/components/FloatingEmoji";
import { Share2, Download, RefreshCw, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const sampleRoast = `Oh, so you think you have good taste in music? Let me tell you, your top artist being Taylor Swift while simultaneously having Playboi Carti in your heavy rotation is giving major identity crisis vibes. 😭

You listened to the same song 847 times and still can't remember the lyrics? Classic. Your "chill vibes" playlist has three different versions of the same lo-fi beat, and honestly, that's just lazy.

Also, the fact that you discovered that one indie band before they went mainstream and won't shut up about it? We see you. We just don't care. 💀

At least your guilty pleasure playlist is honest — even if it's 90% early 2000s pop hits that belong in a time capsule.`;

const moodData = [
  { emoji: "😭", label: "Sad Boi Hours", percentage: 45, color: "bg-neon-blue" },
  { emoji: "🔥", label: "Main Character Energy", percentage: 30, color: "bg-neon-orange" },
  { emoji: "💀", label: "Cringe Worthy", percentage: 15, color: "bg-neon-pink" },
  { emoji: "✨", label: "Actually Good", percentage: 10, color: "bg-neon-green" },
];

const Roast = () => {
  const navigate = useNavigate();
  const { generateRoast, result, loading, error } = useRoast();

  useEffect(() => {
    // Generate roast on mount if not already present
    if (!result && !loading) {
      generateRoast();
    }
    // Disable ESLint dependency warning because we only want to run this once on mount/if no result. 
    // Including result in deps would cause infinite loop if generateRoast updates result immediately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShare = () => {
    navigate("/share", { state: { roast: result } });
  };

  const handleNewRoast = () => {
    generateRoast();
  };

  const handleCopyRoast = () => {
    navigator.clipboard.writeText(result?.roast_text || "");
    toast({
      title: "Roast copied! 📋",
      description: "Now go embarrass yourself by sharing it.",
    });
  };

  if (loading) {
    return (
      <WavyBackground className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold animate-pulse">Consulting the oracles of bad taste...</h2>
          <p className="text-muted-foreground mt-2">Connecting to Spotify...</p>
        </div>
      </WavyBackground>
    )
  }

  if (error) {
    return (
      <WavyBackground className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-card rounded-xl border-2 border-destructive">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error 💀</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </WavyBackground>
    )
  }

  // Use result or fallback
  const roastText = result?.roast_text || "Roast failed to load";
  const score = result?.taste_score || 50;

  return (
    <WavyBackground className="min-h-screen bg-background py-8">
      {/* Floating emojis - Hidden on mobile */}
      <FloatingEmoji emoji="💀" className="hidden md:block top-[5%] right-[10%]" delay={0} size="lg" />
      <FloatingEmoji emoji="🔥" className="hidden md:block top-[20%] left-[5%]" delay={300} size="md" />
      <FloatingEmoji emoji="😭" className="hidden md:block bottom-[30%] right-[5%]" delay={600} size="lg" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="w-4 h-4" />
            Home
          </Button>
          <div className="inline-flex items-center gap-2 bg-dark text-cream px-4 py-2 rounded-full">
            <span className="text-lg">🎤</span>
            <span className="font-bold">RoastMyTune</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            Your Roast is Ready
            <span className="inline-block ml-2 animate-bounce-slow">🔥</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Don't say we didn't warn you...
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Roast Card */}
          <Card variant="speech" className="animate-scale-in lg:row-span-2">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-3xl border-3 border-dark">
                  🤖
                </div>
                <div>
                  <h3 className="font-extrabold text-xl">AI Roast Master</h3>
                  <p className="text-sm text-muted-foreground">certified hater™</p>
                </div>
              </div>

              <p className="text-lg leading-relaxed whitespace-pre-line">
                {roastText}
              </p>
            </CardContent>
          </Card>

          {/* Taste Score & Mood - Replacing generic mood chart with Score for now */}
          <Card variant="neon" className="animate-fade-in-up delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span> Taste Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <span className="text-6xl font-black text-gradient-neon">{score}/100</span>
              <p className="text-muted-foreground mt-2">
                {score < 50 ? "Absolutely Tragic 📉" : "Surprisingly Decent 📈"}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card variant="default" className="animate-fade-in-up delay-300">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>⚡</span> What now?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="neon" onClick={handleShare} className="col-span-1 sm:col-span-2">
                  <Share2 className="w-5 h-5" />
                  Share Your Roast
                </Button>

                <Button variant="outline" onClick={handleCopyRoast}>
                  <Download className="w-4 h-4" />
                  Copy Text
                </Button>
                <Button variant="secondary" onClick={handleNewRoast}>
                  <RefreshCw className="w-4 h-4" />
                  New Roast
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fun footer */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          If you're crying right now, that's valid. We're not sorry though. 💅
        </p>
      </div>
    </WavyBackground>
  );
};

export default Roast;
