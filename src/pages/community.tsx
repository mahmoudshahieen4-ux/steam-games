import { motion } from "motion/react";
import { Globe, MessageSquare, TrendingUp, Users, Star, ArrowUpRight } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="p-8 text-white space-y-12 min-h-full">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30 text-red-500">
                    <Globe size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Community Hub</h1>
                    <p className="text-gray-400 mt-1">Discover what players are sharing world-wide</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Top Rated", icon: Star, color: "text-yellow-500" },
                    { title: "Trending", icon: TrendingUp, color: "text-red-500" },
                    { title: "Discussion", icon: MessageSquare, color: "text-blue-500" },
                    { title: "Groups", icon: Users, color: "text-purple-500" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
                    >
                        <item.icon className={`size-8 mb-4 ${item.color}`} />
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">Browse the latest {item.title.toLowerCase()} content.</p>
                    </motion.div>
                ))}
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Featured Artwork</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                                <div>
                                    <p className="font-bold text-sm">Amazing Sunset in Game</p>
                                    <p className="text-xs text-gray-400">By ArtistName_{i}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs">
                                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                    <span>2.4k</span>
                                </div>
                            </div>
                            <div className="size-full bg-red-900/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                <Globe className="text-red-900/20" size={64} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Latest Discussions</h2>
                    <button className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline">
                        View all <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="space-y-4">
                    {[
                        "How to defeat the final boss in Elden Ring?",
                        "New update 1.25 just released! Here are the patch notes.",
                        "Looking for teammates for Warzone tonight.",
                    ].map((topic, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-red-500/30 transition-all cursor-pointer flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500">
                                    <MessageSquare size={18} />
                                </div>
                                <p className="font-medium group-hover:text-red-500 transition-colors">{topic}</p>
                            </div>
                            <p className="text-xs text-gray-500">{Math.floor(Math.random() * 60)}m ago</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
