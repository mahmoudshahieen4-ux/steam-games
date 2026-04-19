import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Library,
  Gamepad2,
  Clock,
  Star,
  Loader2,
  Calendar,
} from "lucide-react";
import { fetchGames, Game } from "../app/services/gameService";
import { OptimizedImage } from "../app/components/OptimizedImage";
import { GameCard } from "../app/components/GameCard";

export default function LibraryPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const fetchedGames = await fetchGames();
        setGames(fetchedGames);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-white space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30">
            <Library className="size-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
            <p className="text-gray-400 mt-1">
              Manage and play your collection of games
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="size-10 text-red-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-900/20 rounded-xl border border-red-900/30">
          <Library className="size-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
          <p className="text-gray-400 mt-1">
            Manage and play your collection of games
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-red-950/20 to-black/40 border border-red-900/20 rounded-xl overflow-hidden group"
          >
            <div className="aspect-video bg-red-900/10 relative">
              <OptimizedImage
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-4 group-hover:text-red-500 transition-colors">
                {game.name}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Star className="size-4" />
                    <span>Rating</span>
                  </div>
                  <span className="text-white font-medium">
                    {game.rating}/5
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Added</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatDate(game.released)}
                  </span>
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
