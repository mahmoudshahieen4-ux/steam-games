import { motion } from "motion/react";
import { Download, Play, Pause, X } from "lucide-react";

export default function DownloadsPage() {
    return (
        <div className="p-8 text-white space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30">
                    <Download className="size-8 text-red-500" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Downloads</h1>
                    <p className="text-gray-400 mt-1">Manage your active and completed downloads</p>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { name: "Cyberpunk 2077", progress: 75, speed: "12.5 MB/s", size: "65.4 GB" },
                    { name: "The Witcher 3", progress: 30, speed: "8.2 MB/s", size: "42.1 GB" },
                ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-r from-red-950/20 to-black/40 border border-red-900/20 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-400">{item.speed} - {item.size}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                    <Pause className="size-5" />
                                </button>
                                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                    <X className="size-5" />
                                </button>
                            </div>
                        </div>
                        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                            <span>{item.progress}%</span>
                            <span>25 minutes remaining</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
