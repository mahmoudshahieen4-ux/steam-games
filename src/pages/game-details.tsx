import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
    Download, Star, Clock, Globe, Shield, Trophy,
    MessageSquare, Users, ChevronRight, Share2,
    Heart, AlertCircle, Cpu, HardDrive, Monitor, Zap
} from "lucide-react";
import { fetchGameDetails, fetchGameScreenshots, fetchRelatedGames } from "../app/services/gameService";
import { ImageWithFallback } from "../app/components/ImageWithFallback";

const styles = {
    container: "min-h-screen bg-black text-white pb-20",
    hero: "relative h-[70vh] w-full overflow-hidden",
    heroImage: "absolute inset-0 size-full object-cover",
    heroOverlay: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent",
    heroContent: "absolute bottom-0 left-0 w-full p-8 md:p-16 z-10",
    mainGrid: "max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12",
    sidebar: "space-y-8",
    content: "lg:col-span-2 space-y-12",
    section: "space-y-6",
    sectionTitle: "text-2xl font-bold flex items-center gap-3 border-l-4 border-red-600 pl-4",
    card: "bg-red-950/10 border border-red-900/20 rounded-2xl p-6 backdrop-blur-sm",
    requirementCard: "bg-black/40 border border-red-900/10 rounded-xl p-4 flex gap-4 items-start",
    galleryGrid: "grid grid-cols-2 md:grid-cols-3 gap-4",
    screenshot: "aspect-video rounded-xl overflow-hidden border border-red-900/20 cursor-pointer group",
    commentCard: "bg-white/5 border border-white/10 rounded-xl p-4 space-y-3",
    relatedCard: "group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10"
};

export default function GameDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<any>(null);
    const [screenshots, setScreenshots] = useState<any[]>([]);
    const [related, setRelated] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const [details, screenData, relateData] = await Promise.all([
                    fetchGameDetails(id),
                    fetchGameScreenshots(id).catch(() => []),
                    fetchRelatedGames(id).catch(() => [])
                ]);
                setGame(details);
                setScreenshots(screenData);
                setRelated(relateData);
            } catch (err: any) {
                console.error("Game details fetch error:", err);
                setError(err.message || "Failed to load game details. Please check your connection or API key.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
                <div className="relative">
                    <div className="size-20 border-4 border-red-900/20 border-t-red-600 rounded-full animate-spin" />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 animate-pulse" />
                </div>
                <p className="text-gray-400 font-medium animate-pulse">Loading game data...</p>
            </div>
        );
    }

    if (error || !game) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white">
                <AlertCircle className="size-16 text-red-600 mb-4" />
                <h2 className="text-3xl font-bold mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-400 max-w-md mb-8">
                    {error || "We couldn't find the game you're looking for. It might have been removed or the ID is invalid."}
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors shadow-lg shadow-red-900/40"
                >
                    Return to Store
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    src={game.background_image}
                    className={styles.heroImage}
                />
                <div className={styles.heroOverlay} />

                <div className={styles.heroContent}>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            <div className="flex flex-wrap gap-2">
                                {game.genres?.map((g: any) => (
                                    <span key={g.id} className="px-3 py-1 bg-red-600 text-xs font-bold uppercase rounded-full tracking-wider">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                                {game.name}
                            </h1>
                            <div className="flex items-center gap-6 text-gray-300 font-medium">
                                <span className="flex items-center gap-2">
                                    <Star className="size-5 text-yellow-500 fill-yellow-500" />
                                    {game.rating} / 5
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="size-5 text-red-500" />
                                    {game.released}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Globe className="size-5 text-blue-400" />
                                    {game.publishers?.[0]?.name || "Global"}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 px-8 py-5 rounded-2xl text-white font-black text-xl shadow-2xl shadow-red-900/50 group"
                            >
                                <Download className="size-6 group-hover:animate-bounce" />
                                Download Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white"
                            >
                                <Heart className="size-6" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white"
                            >
                                <Share2 className="size-6" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Left Column: Details */}
                <div className={styles.content}>
                    {/* About */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>About the Game</h2>
                        <div className="relative">
                            <div
                                className={`text-gray-400 leading-relaxed text-lg prose prose-invert max-w-none transition-all duration-500 ${!isExpanded ? "max-h-[150px] overflow-hidden" : "max-h-full"}`}
                            >
                                {isExpanded ? (
                                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                                ) : (
                                    <p>
                                        {game.description.replace(/<[^>]*>?/gm, '').split(' ').slice(0, 30).join(' ')}
                                        {game.description.replace(/<[^>]*>?/gm, '').split(' ').length > 30 ? "..." : ""}
                                    </p>
                                )}
                            </div>

                            {game.description.replace(/<[^>]*>?/gm, '').split(' ').length > 30 && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="mt-4 text-red-500 font-bold hover:text-red-400 transition-colors flex items-center gap-1"
                                >
                                    {isExpanded ? "Show Less" : "Read More"}
                                    <ChevronRight className={`size-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                </button>
                            )}
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Gallery & Media</h2>
                        <div className={styles.galleryGrid}>
                            {screenshots.slice(0, 6).map((shot: any) => (
                                <motion.div
                                    key={shot.id}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setActiveImage(shot.image)}
                                    className={styles.screenshot}
                                >
                                    <img src={shot.image} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* System Requirements */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>System Requirements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <AlertCircle size={16} /> Minimum
                                </h3>
                                {game.platforms?.find((p: any) => p.platform.name === "PC")?.requirements?.minimum ? (
                                    <div className="text-sm text-gray-300 bg-red-950/20 p-4 rounded-xl border border-red-900/10">
                                        {game.platforms.find((p: any) => p.platform.name === "PC").requirements.minimum}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className={styles.requirementCard}>
                                            <Cpu className="text-red-500" />
                                            <div><p className="text-xs text-gray-500">OS</p><p className="text-sm">Windows 10 64-bit</p></div>
                                        </div>
                                        <div className={styles.requirementCard}>
                                            <Monitor className="text-indigo-500" />
                                            <div><p className="text-xs text-gray-500">GPU</p><p className="text-sm">NVIDIA GTX 1060 / RX 580</p></div>
                                        </div>
                                        <div className={styles.requirementCard}>
                                            <HardDrive className="text-green-500" />
                                            <div><p className="text-xs text-gray-500">Storage</p><p className="text-sm">50 GB available space</p></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Zap size={16} /> Recommended
                                </h3>
                                {game.platforms?.find((p: any) => p.platform.name === "PC")?.requirements?.recommended ? (
                                    <div className="text-sm text-gray-300 bg-red-950/20 p-4 rounded-xl border border-red-900/10">
                                        {game.platforms.find((p: any) => p.platform.name === "PC").requirements.recommended}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className={styles.requirementCard}>
                                            <Cpu className="text-red-500" />
                                            <div><p className="text-xs text-gray-500">OS</p><p className="text-sm">Windows 11 64-bit</p></div>
                                        </div>
                                        <div className={styles.requirementCard}>
                                            <Monitor className="text-indigo-500" />
                                            <div><p className="text-xs text-gray-500">GPU</p><p className="text-sm">RTX 3070 / RX 6800 XT</p></div>
                                        </div>
                                        <div className={styles.requirementCard}>
                                            <HardDrive className="text-green-500" />
                                            <div><p className="text-xs text-gray-500">Storage</p><p className="text-sm">100 GB SSD</p></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Comments */}
                    <section className={styles.section}>
                        <div className="flex items-center justify-between">
                            <h2 className={styles.sectionTitle}>User Reviews</h2>
                            <button className="text-red-500 font-bold hover:underline">Write a Review</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { user: "StormBreaker", rating: 5, text: "Absolutely stunning visuals and gameplay. A must-play for any fan of the genre!", date: "2 days ago" },
                                { user: "VortexGamer", rating: 4, text: "Great performance on PC, but some minor bugs that need fixing. Story is top tier.", date: "1 week ago" }
                            ].map((comment, i) => (
                                <div key={i} className={styles.commentCard}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold">
                                                {comment.user[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold">{comment.user}</p>
                                                <p className="text-xs text-gray-500">{comment.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} size={14} className={j < comment.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Meta & Related */}
                <aside className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Shield size={18} className="text-red-500" /> Game Details
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Publisher</span>
                                <span className="text-gray-300">{game.publishers?.[0]?.name || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Developer</span>
                                <span className="text-gray-300">{game.developers?.[0]?.name || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Release Date</span>
                                <span className="text-gray-300">{game.released}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Metacritic</span>
                                <span className="px-2 py-0.5 bg-green-600 rounded text-white font-bold">{game.metacritic || "N/A"}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-red-900/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <Trophy className="text-yellow-500" />
                                <span className="text-sm font-medium">Achievements Included</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="text-blue-500" />
                                <span className="text-sm font-medium">Full Controller Support</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold flex items-center gap-2">
                            <ChevronRight size={18} className="text-red-500" /> Related Games
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {related.slice(0, 4).map((item: any) => (
                                <Link to={`/game/${item.id}`} key={item.id}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex gap-4 p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-900/30 hover:bg-white/10 transition-all"
                                    >
                                        <ImageWithFallback
                                            src={item.background_image}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.released?.split("-")[0]}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-[10px]">{item.rating}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
                    >
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            src={activeImage}
                            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
