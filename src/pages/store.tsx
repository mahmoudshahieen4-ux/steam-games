import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BentoGameCard } from "../app/components/BentoGameCard";
import { CategoryButton } from "../app/components/CategoryButton";
import { GameSection } from "../app/components/GameSection";
import { SkeletonBentoCard } from "../app/components/SkeletonBentoCard";
import { OptimizedImage } from "../app/components/OptimizedImage";
import {
  Search,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Flame,
  Zap,
  Crown,
  Target,
  Gamepad2,
  Sparkles,
  Tag,
  Loader2,
} from "lucide-react";
import { fetchGames } from "../app/services/gameService";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  metacritic: number;
  released: string;
  genres: Array<{ name: string }>;
  platforms: Array<{ platform: { name: string } }>;
  short_screenshots: Array<{ image: string }>;
  esrb_rating?: { name: string };
  publishers?: Array<{ name: string }>;
  description_raw?: string;
  website?: string;
  reddit_url?: string;
}

const categories = [
  { id: "all", name: "All Games", slug: "" },
  { id: "action", name: "Action", slug: "action" },
  { id: "adventure", name: "Adventure", slug: "adventure" },
  { id: "rpg", name: "RPG", slug: "role-playing-games-rpg" },
  { id: "strategy", name: "Strategy", slug: "strategy" },
  { id: "shooter", name: "Shooter", slug: "shooter" },
  { id: "puzzle", name: "Puzzle", slug: "puzzle" },
  { id: "racing", name: "Racing", slug: "racing" },
  { id: "sports", name: "Sports", slug: "sports" },
  { id: "fighting", name: "Fighting", slug: "fighting" },
  { id: "simulation", name: "Simulation", slug: "simulation" },
  { id: "indie", name: "Indie", slug: "indie" },
];

const sortOptions = [
  { id: "relevance", name: "Relevance", value: "" },
  { id: "name", name: "Name (A-Z)", value: "name" },
  { id: "released", name: "Release Date", value: "-released" },
  { id: "rating", name: "Rating", value: "-rating" },
  { id: "metacritic", name: "Metacritic", value: "-metacritic" },
  { id: "added", name: "Date Added", value: "-added" },
];

const StorePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [bestOfYear, setBestOfYear] = useState<Game[]>([]);
  const [bestOffers, setBestOffers] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load games when filters change
  useEffect(() => {
    if (page === 1) {
      loadGames(true);
    } else {
      setPage(1);
    }
  }, [selectedCategory, searchQuery, sortBy]);

  // Load more games when page changes
  useEffect(() => {
    if (page > 1) {
      loadGames(false);
    }
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading]);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      // Load trending games for hero section
      const trending = await fetchGames({
        ordering: "-metacritic",
        page_size: "6",
      });
      setTrendingGames(trending);

      // Load featured games
      const featured = await fetchGames({
        ordering: "-rating",
        page_size: "12",
      });
      setBestOfYear(featured);

      // Load special offers
      const offers = await fetchGames({
        dates: "2024-01-01,2025-12-31",
        ordering: "-metacritic",
        page_size: "8",
      });
      setBestOffers(offers);

      setLoading(false);
    } catch (error) {
      console.error("Error loading initial data:", error);
      setLoading(false);
    }
  };

  const loadGames = async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
        setPage(1);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;
      const category = categories.find((c) => c.id === selectedCategory);
      const sortOption = sortOptions.find((s) => s.id === sortBy);

      const params: any = {
        page_size: "24",
        page: currentPage,
      };

      if (category && category.slug) {
        params.genres = category.slug;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (sortOption && sortOption.value) {
        params.ordering = sortOption.value;
      } else if (!searchQuery && selectedCategory === "all") {
        params.ordering = "-metacritic,-rating";
      }

      const fetchedGames = await fetchGames(params);

      if (reset) {
        setGames(fetchedGames);
      } else {
        setGames((prev) => [...prev, ...fetchedGames]);
      }

      setHasMore(fetchedGames.length === 24);

      if (reset) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (error) {
      console.error("Error loading games:", error);
      if (reset) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const handleSearch = () => {
    setSearchQuery(tempSearch);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGamePrice = (game: Game) => {
    // Mock pricing logic - in real app, this would come from API
    const basePrice = Math.floor(Math.random() * 60) + 10;
    const discount =
      Math.random() > 0.7 ? Math.floor(Math.random() * 70) + 10 : 0;
    return {
      original: basePrice,
      discounted:
        discount > 0 ? Math.floor(basePrice * (1 - discount / 100)) : basePrice,
      discount: discount,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Skeleton */}
          <div className="h-96 bg-gray-800 rounded-xl animate-pulse" />

          {/* Categories Skeleton */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-24 bg-gray-800 rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>

          {/* Games Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <SkeletonBentoCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-red-950/20 to-black z-10" />
        <OptimizedImage
          src={
            trendingGames[0]?.background_image || "/api/placeholder/1920/1080"
          }
          alt="Featured Game"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-lg"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                Discover Amazing Games
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Explore thousands of games across all genres and platforms
              </p>
              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Browse Games
                </button>
                <button className="border border-red-600 hover:bg-red-600/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Special Offers
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-red-950/20 to-black/50 backdrop-blur-sm border border-red-900/30 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-black/50 border border-red-900/30 text-white placeholder:text-gray-500 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 items-center">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/50 border border-red-900/30 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-600/50"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="bg-gray-800"
                  >
                    {option.name}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex bg-black/50 border border-red-900/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-red-600" : "hover:bg-red-900/30"}`}
                >
                  <Grid3X3 className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-red-600" : "hover:bg-red-900/30"}`}
                >
                  <List className="size-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-lg border ${showFilters ? "bg-red-600 border-red-600" : "border-red-900/30 hover:bg-red-900/30"}`}
              >
                <Filter className="size-4" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Special Offers */}
        {bestOffers.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Flame className="size-8 text-red-500" />
              <h2 className="text-3xl font-bold">Special Offers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestOffers.slice(0, 8).map((game) => {
                const price = getGamePrice(game);
                return (
                  <motion.div
                    key={`offer-${game.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative bg-gradient-to-br from-red-950/20 to-black/40 border border-red-900/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <OptimizedImage
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {price.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                          -{price.discount}%
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
                          <Heart className="size-4" />
                        </button>
                        <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
                          <Eye className="size-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {game.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                        {game.metacritic && (
                          <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                            {game.metacritic}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {price.discount > 0 ? (
                            <>
                              <span className="text-red-400 font-bold">
                                ${price.discounted}
                              </span>
                              <span className="text-gray-500 line-through text-sm">
                                ${price.original}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold">${price.original}</span>
                          )}
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                          <ShoppingCart className="size-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Games Grid/List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "all"
                ? "All Games"
                : categories.find((c) => c.id === selectedCategory)?.name}
              {searchQuery && ` - "${searchQuery}"`}
            </h2>
            <div className="text-gray-400">{games.length} games found</div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {games.map((game) => {
                const price = getGamePrice(game);
                return (
                  <BentoGameCard
                    key={game.id}
                    game={game}
                    price={price}
                    onClick={() => window.open(`/game/${game.id}`, "_blank")}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {games.map((game) => {
                const price = getGamePrice(game);
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-red-950/20 to-black/40 border border-red-900/20 rounded-xl p-4 hover:border-red-600/50 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <OptimizedImage
                        src={game.background_image}
                        alt={game.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2 truncate">
                          {game.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            {game.rating?.toFixed(1) || "N/A"}
                          </div>
                          <span>{formatDate(game.released)}</span>
                          <span>{game.genres?.[0]?.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {price.discount > 0 ? (
                              <>
                                <span className="text-red-400 font-bold text-lg">
                                  ${price.discounted}
                                </span>
                                <span className="text-gray-500 line-through">
                                  ${price.original}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-lg">
                                ${price.original}
                              </span>
                            )}
                          </div>
                          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                            <ShoppingCart className="size-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Load More Indicator */}
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {loadingMore && (
              <div className="flex items-center gap-3 text-gray-400">
                <Loader2 className="size-6 animate-spin" />
                <span>Loading more games...</span>
              </div>
            )}
            {!hasMore && games.length > 0 && (
              <div className="text-gray-400">
                You've reached the end of the list
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StorePage;
