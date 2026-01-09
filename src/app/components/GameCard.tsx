import { Play, Clock, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./ImageWithFallback";

interface GameCardProps {
  id: number | string;
  title: string;
  image: string;
  hoursPlayed: number;
  lastPlayed: string;
}

const styles = {
  container: "group relative bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm rounded-md overflow-hidden cursor-pointer transition-all hover:scale-[1.02] border border-red-900/30 hover:border-red-600/50 shadow-lg shadow-black/20",
  imageWrapper: "relative overflow-hidden min-w-[300px] max-w-full",
  image: "size-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110",
  imageOverlay: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60",
  tintOverlay: "absolute inset-0 bg-red-950/20",
  playOverlay: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
  playButton: "flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-3 rounded-lg text-white font-bold transition-all transform hover:scale-105 shadow-xl shadow-red-900/20",
  content: "p-4 bg-gradient-to-b from-transparent to-black/20",
  title: "text-white mb-2 font-bold tracking-tight text-lg",
  stats: "flex items-center gap-4 text-sm text-gray-400 font-medium",
  statIcon: "size-4 text-red-500",
  downloadBtn: "mt-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-4 py-2 rounded-lg border border-white/5 hover:border-red-500/30 transition-all text-xs font-bold w-full",
}

export function GameCard({ id, title, image, hoursPlayed, lastPlayed }: GameCardProps) {
  return (
    <Link to={`/game/${id}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <ImageWithFallback
            src={image}
            alt={title}
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
          <div className={styles.tintOverlay} />
          <div className={styles.playOverlay}>
            <div className={styles.playButton}>
              <Play className="size-5" fill="currentColor" />
              <span>Play</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.stats}>
            <div className="flex items-center gap-1.5">
              <Clock className={styles.statIcon} />
              <span>{hoursPlayed}h</span>
            </div>
            <span className="opacity-60">Last played: {lastPlayed}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              alert(`Starting download for ${title}...`);
            }}
            className={styles.downloadBtn}
          >
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </Link>
  );
}