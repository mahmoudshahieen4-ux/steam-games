import { motion } from "motion/react";
import { User, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md bg-gradient-to-br from-red-950/30 to-black/60 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/40"
                    >
                        <Lock className="text-white size-8" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400 mt-2">Sign in to continue your adventure</p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Username or Email</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="player@example.com"
                                className="w-full bg-black/40 border border-red-900/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <a href="#" className="text-xs text-red-500 hover:text-red-400 transition-colors">Forgot Password?</a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-red-900/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgb(239, 68, 68)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 group transition-all"
                        >
                            Sign In
                            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-red-900/20" />
                    <span className="text-gray-500 text-sm font-medium">Coming soon</span>
                    <div className="flex-1 h-px bg-red-900/20" />
                </div>

                <div className="mt-8 text-center bg-black/20 p-4 rounded-xl border border-red-900/10">
                    <p className="text-gray-400 text-sm">
                        New user?{" "}
                        <Link to="/signup" className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
