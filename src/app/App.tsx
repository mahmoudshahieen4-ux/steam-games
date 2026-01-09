import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BentoGameCard } from "./components/BentoGameCard";
import { CategoryButton } from "./components/CategoryButton";
import { GameSection } from "./components/GameSection";
import { FriendCard } from "./components/FriendCard";
import {
  Search, ChevronDown, User, Settings, Home, Library, Users, ShoppingCart, Bell, TrendingUp, Flame, Star, Download, Menu, Trophy, Target, Gamepad2, Zap, Sparkles, Tag, Crown, Loader2,
} from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/login";
import LibraryPage from "../pages/library";
import DownloadsPage from "../pages/downloads";
import GameDetailsPage from "../pages/game-details";
import FriendsPage from "../pages/friends";
import CommunityPage from "../pages/community";
import { Navbar } from "./components/Navbar";
import { fetchGames } from "./services/gameService";
import { Footer } from "./components/Footer";
import { HeroSlider } from "./components/HeroSlider";

const layoutStyles = {
  wrapper: "h-screen bg-black flex flex-col overflow-hidden",
  background: "fixed inset-0 pointer-events-none",
  content: "flex-1 flex overflow-hidden relative",
  mainArea: "flex-1 overflow-y-auto flex flex-col h-full scroll-smooth",
  contentContainer: "w-full p-4 md:p-8 space-y-12 pb-32",
};



const sidebarStyles = {
  container: (open: boolean) => `${open ? "w-64 fixed lg:relative" : "w-0 lg:w-24 relative"} top-[64px] lg:top-0 left-0 lg:inset-auto h-[calc(100vh-64px)] lg:h-full bg-gradient-to-b from-red-950/20 to-black border-r border-red-900/40 overflow-y-auto overflow-x-hidden flex-shrink-0 backdrop-blur-xl z-50 lg:z-40 transition-[width] duration-300 ease-in-out`,
  nav: "p-4 space-y-2",
  link: "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
  activeLink: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50",
  inactiveLink: "hover:bg-red-950/30 text-gray-400 hover:text-white",
};

const searchStyles = {
  container: "relative max-w-2xl mx-auto",
  icon: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500",
  input: "w-full bg-gradient-to-r from-red-950/30 to-black/50 backdrop-blur-sm border border-red-900/30 text-white placeholder:text-gray-500 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-all",
};

const featureStyles = {
  section: "space-y-6",
  header: "flex items-center justify-between mb-6",
  titleWrapper: "flex items-center gap-3",
  title: "text-white text-3xl font-bold tracking-tight",
  grid: "grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 auto-rows-[200px] grid-flow-dense",
  errorContainer: "p-8 text-center bg-red-950/20 border border-red-900/30 rounded-xl",
};

const dashboardStyles = {
  grid: "grid grid-cols-1 xl:grid-cols-3 gap-8",
  mainColumn: "xl:col-span-2 space-y-12",
  sideColumn: "space-y-6",
  widget: "bg-gradient-to-br from-red-950/20 to-black/40 border border-red-900/20 rounded-xl p-6 backdrop-blur-sm",
  stickyWidget: "bg-gradient-to-br from-red-950/20 to-black/40 border border-red-900/20 rounded-xl p-6 backdrop-blur-sm",
  widgetHeader: "flex items-center justify-between mb-4",
  widgetTitle: "text-white flex items-center gap-2 font-medium",
  statRow: "space-y-4",
  progressBarWrapper: "h-2 bg-black/50 rounded-full overflow-hidden",
  progressBar: "h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full",
};

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [games, setGames] = useState<any[]>([]);
  const [trendingGames, setTrendingGames] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [bestOfYear, setBestOfYear] = useState<any[]>([]);
  const [bestOffers, setBestOffers] = useState<any[]>([]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: "all", label: "All Games", icon: Gamepad2 },
    { id: "action", label: "Action", icon: Zap, slug: "action" },
    { id: "rpg", label: "RPG", icon: Sparkles, slug: "role-playing-games-rpg" },
    { id: "sports", label: "Sports", icon: Trophy, slug: "sports" },
    { id: "strategy", label: "Strategy", icon: Target, slug: "strategy" },
    { id: "indie", label: "Indie", icon: Star, slug: "indie" },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      setError(null);
      try {
        const category = categories.find(c => c.id === selectedCategory);
        const params: any = {
          page_size: "12",
          page: page,
        };

        if (category && category.slug) {
          params.genres = category.slug;
        }

        if (searchQuery) {
          params.search = searchQuery;
        } else if (selectedCategory === "all") {
          // If no specific category, let's show famous/popular games
          params.ordering = "-metacritic,-rating";
        } else {
          params.ordering = "-added";
        }

        const fetchedGames = await fetchGames(params);

        if (page === 1) {
          setGames(fetchedGames);
        } else {
          setGames(prev => [...prev, ...fetchedGames]);
        }

        if (page === 1 && !searchQuery && selectedCategory === "all") {
          // Fetch specifically famous games for the Hero/Trending section
          const trending = await fetchGames({
            search: "Grand Theft Auto V, Assassin's Creed Valhalla, Red Dead Redemption 2, Cyberpunk 2077",
            page_size: "4"
          });
          setTrendingGames(trending);

          // Best of last year (more likely to have data)
          const bestByYear = await fetchGames({ dates: "2025-01-01,2025-12-31", ordering: "-metacritic", page_size: "10" });
          setBestOfYear(bestByYear);

          // Top Rated instead of just "New Releases" to ensure quality and images
          const offers = await fetchGames({ ordering: "-metacritic", page_size: "10" });
          setBestOffers(offers);
        }
      } catch (err) {
        setError("Failed to fetch games. Please check your API key.");
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    const timeout = setTimeout(loadData, 500);
    return () => clearTimeout(timeout);
  }, [selectedCategory, searchQuery, page]);

  const friends = [
    { id: 1, name: "Alex_Gaming", avatar: "AG", status: "in-game" as const, currentGame: "Counter-Strike 2" },
    { id: 2, name: "Sarah_Pro", avatar: "SP", status: "online" as const },
    { id: 3, name: "Mike_Ninja", avatar: "MN", status: "in-game" as const, currentGame: "Dota 2" },
    { id: 4, name: "Emma_Star", avatar: "ES", status: "offline" as const },
    { id: 5, name: "Josh_King", avatar: "JK", status: "online" as const },
  ];

  const getGridSize = (index: number) => {
    const sizes: ("small" | "medium" | "large" | "wide" | "tall")[] = [
      "large", "small", "medium", "wide", "tall",
      "medium", "small", "large", "wide", "small"
    ];
    return sizes[index % sizes.length];
  };

  const mapToBento = (game: any, index: number) => ({
    id: game.id,
    title: game.name,
    image: game.background_image || "https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image",
    price: game.metacritic ? `${game.metacritic}.99` : "Free",
    discount: game.metacritic && game.metacritic > 80 ? 25 : undefined,
    rating: game.rating,
    players: `${(game.added / 1000).toFixed(1)}K+`,
    tags: game.genres.slice(0, 2).map((g: any) => g.name),
    size: getGridSize(index),
  });

  const mapToSection = (game: any) => ({
    id: game.id,
    title: game.name,
    image: game.background_image || "https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image",
    hoursPlayed: Math.floor(Math.random() * 100),
    lastPlayed: "Jan 7, 2026",
  });

  return (
    <div className={layoutStyles.wrapper}>
      {/* Animated Background */}
      <div className={layoutStyles.background}>
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Header */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={layoutStyles.content}>
        {/* Sidebar */}
        <aside className={sidebarStyles.container(sidebarOpen)}>
          <nav className={sidebarStyles.nav}>
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <Link
                to="/"
                className={`${sidebarStyles.link} ${location.pathname === "/"
                  ? sidebarStyles.activeLink
                  : sidebarStyles.inactiveLink
                  }`}
                onClick={() => {
                  if (window.innerWidth <= 1024) setSidebarOpen(false);
                }}
              >
                <Home className="size-5" />
                {sidebarOpen && <span>Home</span>}
              </Link>
            </motion.div>
            {[
              { icon: Library, label: "Library", path: "/library" },
              { icon: Users, label: "Friends", path: "/friends" },
              { icon: ShoppingCart, label: "Store", path: "/" },
              { icon: Download, label: "Downloads", path: "/downloads" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Link
                  to={item.path}
                  className={`${sidebarStyles.link} ${location.pathname === item.path
                    ? sidebarStyles.activeLink
                    : sidebarStyles.inactiveLink
                    }`}
                  onClick={() => {
                    if (window.innerWidth <= 1024) setSidebarOpen(false);
                  }}
                >
                  <item.icon className="size-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth Links */}
            {sidebarOpen && (
              <div className="mt-8 pt-6 border-t border-red-900/30 space-y-3 sm:hidden px-2">
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-all rounded-lg hover:bg-red-900/20"
                  onClick={() => setSidebarOpen(false)}
                >
                  <User className="size-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-900/40"
                  onClick={() => setSidebarOpen(false)}
                >
                  <User className="size-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <div className={layoutStyles.mainArea}>
          <div className="flex-1">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/game/:id" element={<GameDetailsPage />} />
              <Route path="/" element={
                <div className={layoutStyles.contentContainer}>
                  {/* Search Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${searchStyles.container} mb-12`}
                  >
                    <div className="relative group flex items-center gap-2">
                      <Search className={searchStyles.icon} />
                      <input
                        type="text"
                        placeholder="Search for games..."
                        value={tempSearch}
                        onChange={(e) => setTempSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSearchQuery(tempSearch);
                          }
                        }}
                        className={`${searchStyles.input} pr-24`}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery(tempSearch)}
                        className="absolute right-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-sm transition-colors"
                      >
                        Search
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Hero Slider */}
                  {!searchQuery && selectedCategory === "all" && trendingGames.length > 0 && (
                    <HeroSlider games={trendingGames} />
                  )}

                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent"
                  >
                    {categories.map((category) => (
                      <CategoryButton
                        key={category.id}
                        icon={category.icon}
                        label={category.label}
                        active={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      />
                    ))}
                  </motion.div>

                  {/* Featured Section */}
                  <section className={featureStyles.section}>
                    <div className={featureStyles.header}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={featureStyles.titleWrapper}
                      >
                        <Flame className="size-7 text-red-500" />
                        <h2 className={featureStyles.title}>
                          {searchQuery ? `Search Results for "${searchQuery}"` :
                            selectedCategory !== "all" ? `${categories.find(c => c.id === selectedCategory)?.label} Games` :
                              "Featured Games"}
                        </h2>
                      </motion.div>
                      {loading && <Loader2 className="size-6 text-red-500 animate-spin" />}
                    </div>

                    {error ? (
                      <div className={featureStyles.errorContainer}>
                        <p className="text-red-400 mb-2">{error}</p>
                        <p className="text-gray-500 text-sm">Please make sure the RAWG API key is configured correctly.</p>
                      </div>
                    ) : (

                      <>
                        <div className={featureStyles.grid}>
                          {games.map((game, index) => {
                            const mapped = mapToBento(game, index);
                            return (
                              <BentoGameCard
                                key={game.id}
                                {...mapped}
                                delay={index * 0.1}
                              />
                            );
                          })}
                          {games.length === 0 && !loading && (
                            <div className="col-span-full py-12 text-center text-gray-500 text-xl">
                              No games found matching your criteria.
                            </div>
                          )}
                        </div>

                        {games.length > 0 && (
                          <div className="flex justify-center mt-12 mb-8">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPage(prev => prev + 1)}
                              disabled={loadingMore}
                              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold shadow-xl shadow-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                              {loadingMore ? (
                                <Loader2 className="size-5 animate-spin" />
                              ) : (
                                <ChevronDown className="size-5 group-hover:translate-y-1 transition-transform" />
                              )}
                              <span>{loadingMore ? "Loading..." : "Show More"}</span>
                            </motion.button>
                          </div>
                        )}
                      </>
                    )}
                  </section>

                  {/* Secondary Content Grid */}
                  <div className={dashboardStyles.grid}>
                    {/* Left Column - Game Sections */}
                    <div className={dashboardStyles.mainColumn}>
                      {!searchQuery && selectedCategory === "all" && (
                        <>
                          <GameSection
                            title="Trending Now"
                            icon={TrendingUp}
                            games={trendingGames.map(mapToSection)}
                            iconColor="text-yellow-500"
                          />

                          <GameSection
                            title="Best of 2025"
                            icon={Crown}
                            games={bestOfYear.map(mapToSection)}
                            iconColor="text-red-500"
                          />

                          <GameSection
                            title="Top Rated"
                            icon={Tag}
                            games={bestOffers.map(mapToSection)}
                            iconColor="text-green-500"
                          />
                        </>
                      )}
                    </div>

                    {/* Right Column - Friends & Stats */}
                    <div className={dashboardStyles.sideColumn}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className={dashboardStyles.stickyWidget}
                      >
                        <div className={dashboardStyles.widgetHeader}>
                          <h3 className={dashboardStyles.widgetTitle}>
                            <Users className="size-5 text-red-500" />
                            Friends
                          </h3>
                          <span className="text-gray-400 text-sm">
                            {friends.filter((f) => f.status !== "offline").length}/
                            {friends.length} online
                          </span>
                        </div>
                        <div className="space-y-3">
                          {friends.map((friend) => (
                            <FriendCard
                              key={friend.id}
                              name={friend.name}
                              avatar={friend.avatar}
                              status={friend.status}
                              currentGame={friend.currentGame}
                            />
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className={dashboardStyles.widget}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="size-5 text-red-500" />
                          <h3 className="text-white font-medium">Your Stats</h3>
                        </div>
                        <div className={dashboardStyles.statRow}>
                          {[
                            { label: "Games Owned", value: "247", progress: "75%", delay: 0.7 },
                            { label: "Achievements", value: "1,234", progress: "66%", delay: 0.8 },
                            { label: "Total Hours", value: "2,567h", progress: "86%", delay: 0.9 },
                          ].map((stat) => (
                            <div key={stat.label}>
                              <div className="flex items-center justify-between mb-2 text-sm">
                                <span className="text-gray-400">{stat.label}</span>
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-white font-medium"
                                >
                                  {stat.value}
                                </motion.span>
                              </div>
                              <div className={dashboardStyles.progressBarWrapper}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: stat.progress }}
                                  transition={{ duration: 1, delay: stat.delay }}
                                  className={dashboardStyles.progressBar}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
