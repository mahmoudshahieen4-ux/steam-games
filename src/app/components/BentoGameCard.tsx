import { motion } from "motion/react";
import { Play, Star, TrendingUp, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BentoGameCardProps {
  id: number | string;
  title: string;
  image: string;
  price?: string;
  discount?: number;
  rating?: number;
  players?: string;
  tags?: string[];
  size?: "small" | "medium" | "large" | "wide" | "tall";
  delay?: number;
}

const styles = {
  card: "relative group cursor-pointer rounded-xl overflow-hidden h-full w-full",
  background: "absolute inset-0",
  image: "size-full object-cover transition-transform duration-700 group-hover:scale-110",
  gradientOverlay: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80",
  accentOverlay: "absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent to-transparent",
  hoverOverlay: "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20",
  playButton: "flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-lg text-white font-bold shadow-xl shadow-red-900/20",
  content: "relative h-full flex flex-col justify-between p-4 md:p-6 z-10",
  tagList: "flex flex-wrap gap-2",
  tag: "px-2 py-1 bg-red-950/60 backdrop-blur-sm border border-red-500/30 text-red-100 text-[10px] uppercase tracking-wider font-semibold rounded-full",
  discountBadge: "bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg",
  title: (large: boolean) => `text-white mb-2 font-bold tracking-tight ${large ? "text-3xl" : "text-xl"}`,
  statsRow: "flex items-center gap-4 flex-wrap mb-3",
  statItem: "flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-white/5",
  priceRow: "flex items-center gap-2",
  oldPrice: "text-gray-400 line-through text-sm",
  currentPrice: "text-white text-xl font-extrabold",
  animatedBorder: "absolute inset-0 border-2 border-transparent rounded-xl z-30 pointer-events-none"
}

export function BentoGameCard({
  id,
  title,
  image,
  price,
  discount,
  rating,
  players,
  tags,
  size = "medium",
  delay = 0,
}: BentoGameCardProps) {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2",
    large: "col-span-2 row-span-3",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-3",
  };

  const isLarge = size === "large" || size === "tall";

  return (
    <Link to={`/game/${id}`} className={sizeClasses[size]}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`${styles.card} size-full`}
      >
        <div className={styles.background}>
          <ImageWithFallback
            src={image}
            alt={title}
            className={styles.image}
          />
          <div className={styles.gradientOverlay} />
          <div className={styles.accentOverlay} />
        </div>

        {/* Hover Overlay */}
        <div className={styles.hoverOverlay}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={styles.playButton}
          >
            <Play className="size-5" fill="currentColor" />
            <span>Play Now</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className="flex items-start justify-between">
            {tags && tags.length > 0 && (
              <div className={styles.tagList}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {discount && (
              <motion.div
                initial={{ rotate: -12 }}
                animate={{ rotate: 0 }}
                className={styles.discountBadge}
              >
                -{discount}%
              </motion.div>
            )}
          </div>

          <div>
            <motion.h3 className={styles.title(isLarge)}>
              {title}
            </motion.h3>

            <div className={styles.statsRow}>
              {rating && (
                <div className={styles.statItem}>
                  <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm">{rating}</span>
                </div>
              )}
              {players && (
                <div className={styles.statItem}>
                  <Users className="size-4 text-red-400" />
                  <span className="text-white text-sm">{players}</span>
                </div>
              )}
            </div>

            {price && (
              <div className={styles.priceRow}>
                {discount ? (
                  <>
                    <span className={styles.oldPrice}>
                      ${price}
                    </span>
                    <span className={styles.currentPrice}>
                      ${(parseFloat(price) * (1 - discount / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className={styles.currentPrice}>${price}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Animated Border overlay */}
        <motion.div
          className={styles.animatedBorder}
          whileHover={{
            borderColor: "rgba(220, 38, 38, 0.5)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}
