import { motion } from "motion/react";
import { Library, Gamepad2, Clock, Star } from "lucide-react";

export default function LibraryPage() {
    return (
        <div className="p-8 text-white space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30">
                    <Library className="size-8 text-red-500" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
                    <p className="text-gray-400 mt-1">Manage and play your collection of games</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-gradient-to-br from-red-950/20 to-black/40 border border-red-900/20 rounded-xl overflow-hidden group"
                    >
                        <div className="aspect-video bg-red-900/10 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Gamepad2 className="size-12 text-red-900/20" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-4 group-hover:text-red-500 transition-colors">Game Title {i}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Clock className="size-4" />
                                        <span>Time Played</span>
                                    </div>
                                    <span className="text-white font-medium">{i * 12}h 30m</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Star className="size-4" />
                                        <span>Achievements</span>
                                    </div>
                                    <span className="text-white font-medium">{i * 5}/50</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-900/20">
                                Play Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
