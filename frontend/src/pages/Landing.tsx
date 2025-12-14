import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/WavyBackground";
import { FloatingBubble } from "@/components/FloatingBubble";
import { Music, Headphones } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { signInWithSpotify } = useAuth();

  const handleSpotifyLogin = async () => {
    await signInWithSpotify();
  };

  const handleAppleImport = () => {
    navigate("/apple-music");
  };

  return (
    <WavyBackground className="min-h-screen bg-background">
      {/* Floating genre bubbles - More distributed "cloud" effect */}
      {/* Top Cluster */}
      <FloatingBubble text="Pop" className="top-[15%] left-[10%] scale-90 md:scale-110 opacity-60 md:opacity-80" delay={0} variant="primary" />
      <FloatingBubble text="K-Pop" className="top-[12%] right-[15%] scale-75 md:scale-100 opacity-50 md:opacity-70" delay={450} variant="pink" />
      <FloatingBubble text="Indie" className="top-[25%] left-[5%] scale-75 md:scale-95 opacity-50 md:opacity-70" delay={300} variant="blue" />
      <FloatingBubble text="Hip Hop" className="top-[22%] right-[5%] scale-90 md:scale-105 opacity-60 md:opacity-80" delay={200} variant="dark" />

      {/* Middle/Side Cluster (Avoid center text) */}
      <FloatingBubble text="Metal" className="top-[45%] left-[2%] scale-75 md:scale-90 opacity-40 md:opacity-60" delay={800} variant="dark" />
      <FloatingBubble text="Techno" className="top-[50%] right-[2%] scale-75 md:scale-90 opacity-40 md:opacity-60" delay={900} variant="primary" />

      {/* Bottom Cluster */}
      <FloatingBubble text="Rock" className="bottom-[25%] left-[8%] scale-90 md:scale-105 opacity-60 md:opacity-80" delay={400} variant="pink" />
      <FloatingBubble text="R&B" className="bottom-[30%] right-[10%] scale-90 md:scale-110 opacity-60 md:opacity-80" delay={600} variant="secondary" />
      <FloatingBubble text="EDM" className="bottom-[15%] left-[20%] scale-75 md:scale-95 opacity-50 md:opacity-70" delay={500} variant="primary" />
      <FloatingBubble text="Jazz" className="bottom-[18%] right-[25%] scale-75 md:scale-95 opacity-50 md:opacity-70" delay={700} variant="dark" />
      <FloatingBubble text="Classical" className="bottom-[8%] left-[45%] scale-60 md:scale-75 opacity-30 md:opacity-50" delay={1000} variant="blue" />
      <FloatingBubble text="Trap" className="top-[8%] right-[35%] scale-60 md:scale-75 opacity-30 md:opacity-50" delay={150} variant="secondary" />

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative z-10">
        {/* Logo / Brand */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-dark text-cream px-6 py-3 rounded-full border-3 border-dark shadow-brutal-sm">
            <span className="text-2xl">🎤</span>
            <span className="font-extrabold text-xl tracking-tight">RoastMyTune</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-in-up">
            Let AI{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient-neon pr-2">roast</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1" />
            </span>
            <br />
            your music taste.
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-8 mt-10 animate-fade-in-up delay-200">
            Think your playlists are fire? 🔥 <br className="sm:hidden" />
            Let's see what the AI has to say about that... 💀
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up delay-300">
          <Button
            variant="spotify"
            size="xl"
            onClick={handleSpotifyLogin}
            className="group"
          >
            <Music className="group-hover:animate-bounce" />
            Login with Spotify
          </Button>

          <Button
            variant="apple"
            size="xl"
            onClick={handleAppleImport}
            className="group"
          >
            <Headphones className="group-hover:animate-bounce" />
            Import Apple Music
          </Button>
        </div>

        {/* Fun disclaimer */}
        <p className="mt-12 text-sm text-muted-foreground text-center max-w-md animate-fade-in-up delay-500">
          ⚠️ Warning: Your ego may not survive this roast. <br />
          We are not responsible for any emotional damage caused by brutal honesty.
        </p>

        {/* Decorative bottom element */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
          <span className="w-8 h-0.5 bg-border" />
          <span className="text-xs font-medium uppercase tracking-widest">scroll for nothing lol</span>
          <span className="w-8 h-0.5 bg-border" />
        </div>
      </div>
    </WavyBackground>
  );
};

export default Landing;
