import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { GameCard } from "./GameCard";

interface Game {
  id: number;
  title: string;
  image: string;
  hoursPlayed?: number;
  lastPlayed?: string;
  price?: string;
  discount?: number;
}

interface GameSectionProps {
  title: string;
  icon: LucideIcon;
  games: Game[];
  iconColor?: string;
}

const styles = {
  section: "space-y-6",
  header: "flex items-center gap-3",
  iconWrapper: "p-3 bg-gradient-to-br from-red-950/40 to-black/40 border border-red-900/30 rounded-lg backdrop-blur-sm",
  title: "text-white text-2xl font-semibold tracking-tight",
  divider: "flex-1 flex-grow-1 h-px bg-gradient-to-r from-red-900/50 to-transparent",
  grid: "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6",
  cardWrapper: "relative group",
}

export function GameSection({ title, icon: Icon, games, iconColor = "text-red-500" }: GameSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.section}
    >
      <div className={styles.header}>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={styles.iconWrapper}
        >
          <Icon className={`size-6 ${iconColor}`} />
        </motion.div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={styles.cardWrapper}
          >
            <GameCard
              title={game.title}
              image={game.image}
              hoursPlayed={game.hoursPlayed || 0}
              lastPlayed={game.lastPlayed || "Never"}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
