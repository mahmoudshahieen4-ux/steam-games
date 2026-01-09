import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings } from "lucide-react";
import logo from "../../assets/logo.png";
interface NavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const headerStyles = {
    container: "sticky top-0 bg-gradient-to-r from-black via-red-950/20 to-black border-b border-red-900/30 px-6 py-1 flex items-center justify-between backdrop-blur-md z-[60]",
    leftSection: "flex items-center gap-3",
    menuButton: "p-2 hover:bg-red-900/20 rounded transition-colors lg:hidden",
    logo: "text-white text-2xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent",
    nav: "hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2",
    navLink: "text-gray-400 hover:text-white transition-colors relative group",
    navLinkActive: "text-white relative border-b-2 border-red-600 pb-0.5",
    navUnderline: "absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 group-hover:w-full transition-all",
    rightSection: "flex items-center gap-3",
    notificationButton: "relative p-2 text-gray-400 hover:text-white transition-colors hover:bg-red-900/20 rounded",
    notificationDot: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full",
    settingsButton: "p-2 text-gray-400 hover:text-white transition-colors hover:bg-red-900/20 rounded",
    loginButton: "px-4 py-2 text-gray-400 hover:text-white transition-colors hidden sm:block",
    signupButton: "px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded font-medium transition-all shadow-lg shadow-red-900/20 active:scale-95 hidden sm:block",
};

export function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className={headerStyles.container}>
            <div className={headerStyles.leftSection}>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={headerStyles.menuButton}
                >
                    <Menu className="size-5 text-white" />
                </button>
                <Link to="/">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={headerStyles.logo}
                    >
                        <div className="flex items-center">
                            <img src={logo} alt="Logo" className="size-16 mr-2" />
                            <h2 className="mr-4">STEAM <span className="text-red-600 font-bold">FIRE</span></h2>
                        </div>
                    </motion.h1>
                </Link>
            </div>
            <nav className={headerStyles.nav}>
                <Link
                    to="/"
                    className={isActive("/") ? headerStyles.navLinkActive : headerStyles.navLink}
                >
                    Store
                    {!isActive("/") && <span className={headerStyles.navUnderline} />}
                </Link>
                <Link
                    to="/library"
                    className={isActive("/library") ? headerStyles.navLinkActive : headerStyles.navLink}
                >
                    Library
                    {!isActive("/library") && <span className={headerStyles.navUnderline} />}
                </Link>
                <Link
                    to="/community"
                    className={isActive("/community") ? headerStyles.navLinkActive : headerStyles.navLink}
                >
                    Community
                    {!isActive("/community") && <span className={headerStyles.navUnderline} />}
                </Link>
            </nav>
            <div className={headerStyles.rightSection}>
                <Link to="/login" className={headerStyles.loginButton}>
                    Login
                </Link>
                <Link to="/signup" className={headerStyles.signupButton}>
                    Sign Up
                </Link>
                <div className="w-px h-6 bg-red-900/30 mx-2" />
                <button className={headerStyles.settingsButton}>
                    <Settings className="size-5" />
                </button>
            </div>
        </header>
    );
}
