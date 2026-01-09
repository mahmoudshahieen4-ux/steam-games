import { motion } from "motion/react";
import { Users, UserPlus, MessageSquare, Search, Circle } from "lucide-react";

export default function FriendsPage() {
    const friends = [
        { id: 1, name: "StormBreaker", status: "Online", game: "Cyberpunk 2077", avatar: "S" },
        { id: 2, name: "VortexGamer", status: "In-Game", game: "GTA V", avatar: "V" },
        { id: 3, name: "ShadowHunter", status: "Away", game: null, avatar: "S" },
        { id: 4, name: "PixelPrime", status: "Offline", game: null, avatar: "P" },
        { id: 5, name: "AlphaWolf", status: "Online", game: "Valorant", avatar: "A" },
    ];

    return (
        <div className="p-8 text-white space-y-12 min-h-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30 text-red-500">
                        <Users size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Friends</h1>
                        <p className="text-gray-400 mt-1">Connect and play with your community</p>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold transition-all">
                        <UserPlus size={18} />
                        Add Friend
                    </button>
                    <button className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all">
                        <MessageSquare size={18} />
                    </button>
                </div>
            </div>

            {/* Friends Grid */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h2 className="text-xl font-bold">Online Friends ({friends.filter(f => f.status !== "Offline").length})</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Find a friend..."
                            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {friends.map((friend) => (
                        <motion.div
                            key={friend.id}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-red-900/30 transition-all cursor-pointer group"
                        >
                            <div className="relative">
                                <div className="size-14 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg">
                                    {friend.avatar}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 size-4 border-4 border-black rounded-full ${friend.status === "Online" ? "bg-green-500" :
                                        friend.status === "In-Game" ? "bg-blue-400" :
                                            friend.status === "Away" ? "bg-yellow-500" : "bg-gray-500"
                                    }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold group-hover:text-red-500 transition-colors">{friend.name}</h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {friend.game ? `Playing: ${friend.game}` : friend.status}
                                </p>
                            </div>
                            <button className="size-10 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-red-600 transition-all">
                                <MessageSquare size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Additional Sections */}
            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-white/5 pb-4">Suggested Friends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-60">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border border-dashed border-white/10 rounded-2xl">
                            <div className="size-14 bg-white/5 rounded-2xl animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                                <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Empty space filler for more sections */}
            <section className="pt-20 border-t border-white/5 opacity-20 text-center">
                <p className="text-sm uppercase tracking-widest font-bold">End of List</p>
                <div className="h-40" />
            </section>
        </div>
    );
}
