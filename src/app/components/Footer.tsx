import { motion } from "motion/react";
import { Github, Twitter, Youtube, Facebook, Mail, ShieldCheck, HelpCircle } from "lucide-react";
import logo from "../../assets/logo.png";

const footerStyles = {
    container: "bg-gradient-to-t from-black to-red-950/20 border-t border-red-900/20 py-12 px-6 relative overflow-hidden flex-shrink-0",
    grid: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10",
    column: "space-y-6",
    heading: "text-white font-bold text-lg flex items-center gap-2 mb-4",
    link: "text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 group cursor-pointer",
    socialIcon: "size-10 rounded-full bg-red-950/30 border border-red-900/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300",
    bottom: "max-w-7xl mx-auto mt-16 pt-4 border-t border-red-900/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm",
    badge: "px-3 py-1 rounded-full bg-red-950/30 border border-red-900/20 text-[10px] uppercase tracking-wider text-red-500 font-bold",
};

export function Footer() {
    return (
        <footer className={footerStyles.container}>
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className={footerStyles.grid}>
                {/* Brand Section */}
                <div className={footerStyles.column}>
                    <div className="flex items-center gap-3 mb-6">
                        <img src={logo} alt="Logo" className="size-12" />
                        <span className="text-white font-bold text-2xl tracking-tighter">STEAM <span className="text-red-600">FIRE</span></span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        The ultimate gaming destination. Connect, discover, and play your favorite titles on our state-of-the-art platform. Join millions of gamers worldwide.
                    </p>
                    <div className="flex items-center gap-4">
                        <motion.a whileHover={{ y: -3 }} href="#" className={footerStyles.socialIcon}>
                            <Twitter size={18} />
                        </motion.a>
                        <motion.a whileHover={{ y: -3 }} href="#" className={footerStyles.socialIcon}>
                            <Youtube size={18} />
                        </motion.a>
                        <motion.a whileHover={{ y: -3 }} href="#" className={footerStyles.socialIcon}>
                            <Github size={18} />
                        </motion.a>
                        <motion.a whileHover={{ y: -3 }} href="#" className={footerStyles.socialIcon}>
                            <Facebook size={18} />
                        </motion.a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={footerStyles.column}>
                    <h3 className={footerStyles.heading}>Explore</h3>
                    <ul className="space-y-3">
                        <li><a className={footerStyles.link}>Store Home</a></li>
                        <li><a className={footerStyles.link}>Top Sellers</a></li>
                        <li><a className={footerStyles.link}>New Releases</a></li>
                        <li><a className={footerStyles.link}>Upcoming Games</a></li>
                        <li><a className={footerStyles.link}>Special Offers</a></li>
                    </ul>
                </div>

                {/* Support & Community */}
                <div className={footerStyles.column}>
                    <h3 className={footerStyles.heading}>Community</h3>
                    <ul className="space-y-3">
                        <li><a className={footerStyles.link}>Community Hub</a></li>
                        <li><a className={footerStyles.link}>Discussions</a></li>
                        <li><a className={footerStyles.link}>Workshop</a></li>
                        <li><a className={footerStyles.link}>Marketplace</a></li>
                        <li><a className={footerStyles.link}>Broadcasts</a></li>
                    </ul>
                </div>

                {/* Newsletter / Contact */}
                <div className={footerStyles.column}>
                    <h3 className={footerStyles.heading}>Stay Updated</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Subscribe to get the latest news and special offers.
                    </p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-black/50 border border-red-900/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600/50 transition-all"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">
                            <Mail size={18} />
                        </button>
                    </div>
                    <div className="pt-4 flex flex-wrap gap-2">
                        <div className={footerStyles.badge}>
                            <ShieldCheck size={10} className="inline mr-1" /> Verified
                        </div>
                        <div className={footerStyles.badge}>
                            <HelpCircle size={10} className="inline mr-1" /> Support 24/7
                        </div>
                    </div>
                </div>
            </div>

            <div className={footerStyles.bottom}>
                <div className="flex items-center gap-8">
                    <p>© 2026 STEAM FIRE Corporation. All rights reserved.</p>
                    <div className="hidden lg:flex items-center gap-6">
                        <a className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
                        <a className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
                        <a className="hover:text-white transition-colors cursor-pointer">Legal</a>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <span>Server Status:</span>
                    <span className="flex items-center gap-1.5 text-green-500 font-medium">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                        Operational
                    </span>
                </div>
            </div>
        </footer>
    );
}
