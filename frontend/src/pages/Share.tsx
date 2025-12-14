import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WavyBackground } from "@/components/WavyBackground";
import { FloatingEmoji } from "@/components/FloatingEmoji";
import { Download, ArrowLeft, Twitter, Instagram, Link2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";

// Background color options
const bgColors = [
  { name: "Dark", value: "bg-neutral-900", textColor: "text-white" },
  { name: "Light", value: "bg-neutral-100", textColor: "text-black" },
  { name: "Stone", value: "bg-stone-800", textColor: "text-white" },
  { name: "Slate", value: "bg-slate-700", textColor: "text-white" },
  { name: "Zinc", value: "bg-zinc-200", textColor: "text-black" },
  { name: "Neon", value: "bg-gradient-to-br from-purple-600 to-pink-500", textColor: "text-white" },
];

const Share = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Get roast data from navigation state (passed from Roast page)
  const roastData = location.state?.roast || {
    roast_text: "No roast found! Go back and generate one first. 💀",
    taste_score: 0
  };

  const [selectedBg, setSelectedBg] = useState(bgColors[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!shareCardRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(shareCardRef.current, {
        quality: 1,
        pixelRatio: 2, // Higher quality
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `roastmytune-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Downloaded! 📸",
        description: "Your roast card is saved!",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Try again or copy the text instead.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyRoast = () => {
    navigator.clipboard.writeText(roastData.roast_text);
    toast({
      title: "Roast copied! 📋",
      description: "Now paste it everywhere.",
    });
  };

  const handleSocialShare = async (platform: string) => {
    const shareText = `My music taste score: ${roastData.taste_score}/100\n\n"${roastData.roast_text}"\n\n🔥 Get roasted at roastmytune.app`;

    if (platform === "Twitter") {
      const text = encodeURIComponent(shareText);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    } else if (platform === "Instagram") {
      // Instagram doesn't have a web share API, use Web Share if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: "RoastMyTune",
            text: shareText,
          });
        } catch (err) {
          // User cancelled or error
          toast({
            title: "Share cancelled",
            description: "Download the image and share to Instagram manually!",
          });
        }
      } else {
        // Fallback: copy text
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied! 📋",
          description: "Text copied! Download the image and share to Instagram.",
        });
      }
    }
  };


  return (
    <WavyBackground className="min-h-screen bg-background py-8">
      {/* Floating emojis */}
      <FloatingEmoji emoji="📸" className="top-[10%] left-[10%]" delay={0} size="lg" />
      <FloatingEmoji emoji="✨" className="top-[15%] right-[15%]" delay={200} size="xl" />
      <FloatingEmoji emoji="🚀" className="bottom-[20%] left-[8%]" delay={400} size="md" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate("/roast")}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="inline-flex items-center gap-2 bg-dark text-cream px-4 py-2 rounded-full">
            <span className="text-lg">🎤</span>
            <span className="font-bold">RoastMyTune</span>
          </div>
          <div className="w-20" />
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Share Your L
            <span className="inline-block ml-2">📢</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Because your friends need to see this too
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Share Card Preview */}
          <div className="animate-scale-in">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>👀</span> Preview
            </h2>

            {/* Actual Share Card with dynamic background */}
            <div
              ref={shareCardRef}
              className={`relative p-8 rounded-3xl border-2 border-white/10 ${selectedBg.value} ${selectedBg.textColor}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl">RoastMyTune</h3>
                  <p className="text-sm opacity-70">Score: {roastData.taste_score}/100</p>
                </div>
              </div>

              {/* Roast text */}
              <p className="text-lg font-medium leading-relaxed mb-6">
                "{roastData.roast_text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-2xl">💀</span>
                  <span className="text-2xl">🎵</span>
                  <span className="text-2xl">😭</span>
                </div>
                <span className="text-xs opacity-50 font-mono">
                  roastmytune.app
                </span>
              </div>
            </div>

            {/* Background Color Picker */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Background Style:</p>
              <div className="flex gap-2 flex-wrap">
                {bgColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedBg(color)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedBg.name === color.name
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : ""
                      } ${color.value} ${color.textColor}`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            {/* Copy Roast */}
            <Card variant="neon">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span>📋</span> Copy Your Roast
                </h3>
                <Button
                  variant="neon"
                  size="lg"
                  className="w-full"
                  onClick={handleCopyRoast}
                >
                  <Copy className="w-5 h-5" />
                  Copy Text
                </Button>
              </CardContent>
            </Card>

            {/* Social Share */}
            <Card variant="default">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span>📱</span> Share to Socials
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col h-auto py-4"
                    onClick={() => handleSocialShare("Twitter")}
                  >
                    <Twitter className="w-6 h-6 mb-1" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col h-auto py-4"
                    onClick={() => handleSocialShare("Instagram")}
                  >
                    <Instagram className="w-6 h-6 mb-1" />
                    <span className="text-xs">Stories</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col h-auto py-4"
                    onClick={handleDownload}
                  >
                    <Download className="w-6 h-6 mb-1" />
                    <span className="text-xs">Save</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generate New */}
            <Card variant="gradient" className="text-dark">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span>🎯</span> Not Satisfied?
                </h3>
                <p className="text-sm opacity-80 mb-4">
                  Generate a fresh roast with updated data.
                </p>
                <Button
                  variant="apple"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/roast")}
                >
                  New Roast 🔥
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Remember: sharing is caring. Share the pain. 💀
        </p>
      </div>
    </WavyBackground>
  );
};

export default Share;

