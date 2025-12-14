import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/WavyBackground";
import { Equalizer } from "@/components/Equalizer";
import { DancingEmojis } from "@/components/DancingEmojis";

const loadingMessages = [
  "Judging your questionable playlists…",
  "Analyzing your spotify wrapped embarrassment...",
  "Counting how many times you played that one song...",
  "Preparing to destroy your music ego...",
  "Finding all the guilty pleasures...",
  "Calculating your basic-ness level...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for errors in URL (from Supabase redirect)
    const errorDescription = searchParams.get("error_description");
    const errorMsg = searchParams.get("error");

    // Hash parsing for fragments (Supabase sometimes puts errors in hash)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hashError = hashParams.get("error_description") || hashParams.get("error");

    if (errorDescription || errorMsg || hashError) {
      setError(decodeURIComponent(errorDescription || hashError || errorMsg || "Unknown error"));
      return;
    }

    const handleAuthCheck = async () => {
      // Small delay to allow AuthContext to initialize
      await new Promise(r => setTimeout(r, 1000));

      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        navigate("/roast");
      } else {
        // Continue waiting...
      }
    };

    // Check auth immediately
    handleAuthCheck();

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    // Fallback/Demo mode
    const timeout = setTimeout(() => {
      // Check session one last time
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate("/roast");
        } else {
          console.log("No session found in Loading, redirecting to home");
          // Don't auto-redirect if we just missed the polling, stay a bit longer or redirect
          navigate("/");
        }
      });
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
      clearTimeout(timeout);
    };
  }, [navigate, searchParams]);

  if (error) {
    return (
      <WavyBackground className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-lg p-8 bg-card rounded-xl border-2 border-destructive shadow-brutal mx-4">
          <div className="text-6xl mb-4">👮‍♂️</div>
          <h2 className="text-2xl font-bold text-destructive mb-4">Hold Up</h2>
          <p className="text-muted-foreground mb-6 text-lg">{error}</p>
          <p className="text-sm text-muted-foreground mb-6">
            (This usually happens if you try to login too many times quickly. Give it a minute!)
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">Back Home</Button>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </WavyBackground>
    );
  }

  return (
    <WavyBackground className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4 relative z-10">
        {/* Dancing emojis */}
        <DancingEmojis className="mb-12" />

        {/* Equalizer */}
        <div className="flex justify-center mb-8">
          <Equalizer barCount={7} />
        </div>

        {/* Loading message */}
        <div className="min-h-[4rem]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold animate-fade-in-up">
            {loadingMessages[messageIndex]}
            <span className="inline-block w-8 text-left">{dots}</span>
          </h2>
        </div>

        {/* Fun subtext */}
        <p className="mt-6 text-muted-foreground text-lg">
          This might hurt a little 💀
        </p>

        {/* Progress indicator */}
        <div className="mt-12 w-64 mx-auto">
          <div className="h-3 bg-muted rounded-full overflow-hidden border-2 border-dark">
            <div
              className="h-full bg-gradient-lime rounded-full transition-all duration-[4000ms] ease-linear"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </WavyBackground>
  );
};

export default Loading;
