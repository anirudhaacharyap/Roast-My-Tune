import { motion } from "framer-motion";

interface StaggeredTextProps {
    text: string;
    className?: string; // Class for the container / default text
    staggerDelay?: number;
    initialDelay?: number;
}

export const StaggeredText = ({
    text,
    className = "",
    staggerDelay = 0.05,
    initialDelay = 0
}: StaggeredTextProps) => {
    // Split text into characters
    const characters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren: initialDelay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index} className="inline-block whitespace-pre">
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};
