import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Info, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./ImageWithFallback";

interface HeroGame {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    metacritic?: number;
    genres: { name: string }[];
}

interface HeroSliderProps {
    games: HeroGame[];
}

const styles = {
    container: "relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-12 group",
    slide: "absolute inset-0 size-full",
    overlay: "absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent",
    content: "relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-6 z-10",
    title: "text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl",
    tagRow: "flex flex-wrap gap-2",
    tag: "px-3 py-1 bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase rounded-full",
    stats: "flex items-center gap-6 text-gray-300 font-medium",
    buttonRow: "flex flex-wrap gap-4 pt-4",
    primaryBtn: "flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-red-900/40",
    secondaryBtn: "flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition-all",
    navBtn: "absolute top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-red-600/80 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-20",
    indicators: "absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20",
    indicator: (active: boolean) => `h-1.5 rounded-full transition-all ${active ? "w-8 bg-red-600" : "w-2 bg-white/30"}`
};

export function HeroSlider({ games }: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (games.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [games.length]);

    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % games.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);

    return (
        <div className={styles.container}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    className={styles.slide}
                >
                    <ImageWithFallback
                        src={currentGame.background_image}
                        alt={currentGame.name}
                        className="size-full object-cover"
                    />
                    <div className={styles.overlay} />

                    <div className={styles.content}>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={styles.tagRow}
                        >
                            {currentGame.genres.slice(0, 3).map((g) => (
                                <span key={g.name} className={styles.tag}>{g.name}</span>
                            ))}
                            <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-500 text-xs font-bold uppercase rounded-full">Best Choice</span>
                        </motion.div>

                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className={styles.title}
                        >
                            {currentGame.name}
                        </motion.h2>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={styles.stats}
                        >
                            <div className="flex items-center gap-2">
                                <Star className="size-5 text-yellow-500 fill-yellow-500" />
                                <span>{currentGame.rating} Rating</span>
                            </div>
                            {currentGame.metacritic && (
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-green-600 rounded text-white text-xs font-bold">
                                        {currentGame.metacritic}
                                    </span>
                                    <span>Metascore</span>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className={styles.buttonRow}
                        >
                            <Link to={`/game/${currentGame.id}`} className={styles.primaryBtn}>
                                <Play className="size-5 fill-current" />
                                Play Now
                            </Link>
                            <Link to={`/game/${currentGame.id}`} className={styles.secondaryBtn}>
                                <Info className="size-5" />
                                View Details
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <button onClick={prevSlide} className={`${styles.navBtn} left-8`}>
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className={`${styles.navBtn} right-8`}>
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className={styles.indicators}>
                {games.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={styles.indicator(i === currentIndex)}
                    />
                ))}
            </div>
        </div>
    );
}
