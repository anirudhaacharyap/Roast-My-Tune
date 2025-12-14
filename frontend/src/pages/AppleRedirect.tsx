import { useNavigate } from "react-router-dom";
import { WavyBackground } from "@/components/WavyBackground";
import { Button } from "@/components/ui/button";
import { FloatingEmoji } from "@/components/FloatingEmoji";
import { Home } from "lucide-react";

const AppleRedirect = () => {
    const navigate = useNavigate();

    return (
        <WavyBackground className="min-h-screen bg-background flex items-center justify-center p-4">
            <FloatingEmoji emoji="💸" className="top-[15%] left-[10%]" delay={0} size="lg" />
            <FloatingEmoji emoji="🍎" className="bottom-[20%] right-[15%]" delay={500} size="md" />
            <FloatingEmoji emoji="💀" className="top-[30%] right-[20%]" delay={1000} size="lg" />

            <div className="max-w-md w-full bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-8 text-center shadow-neon">
                <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border-2 border-primary animate-bounce-slow">
                    📉
                </div>

                <h1 className="text-3xl font-black mb-4 text-gradient-neon">
                    Too Broke 💸
                </h1>

                <div className="space-y-4 text-muted-foreground text-lg mb-8">
                    <p>
                        We'd love to roast your Apple Music taste, but...
                    </p>
                    <p className="font-medium text-foreground">
                        Apple charges <span className="text-destructive font-bold">$99/year</span> for their API access.
                    </p>
                    <p className="text-sm italic">
                        And the developer is currently eating instant noodles. 🍜
                    </p>
                </div>

                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate("/")}
                    className="w-full gap-2 group"
                >
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Go Back & Use Spotify
                </Button>
            </div>
        </WavyBackground>
    );
};

export default AppleRedirect;
