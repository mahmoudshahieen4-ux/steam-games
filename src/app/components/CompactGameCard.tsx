import { Play, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompactGameCardProps {
  title: string;
  image: string;
  status: "playing" | "installed" | "downloading";
  progress?: number;
}

export function CompactGameCard({ title, image, status, progress }: CompactGameCardProps) {
  return (
    <div className="bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm border border-red-900/20 rounded-lg overflow-hidden hover:border-red-700/40 transition-all group">
      <div className="flex items-center gap-3 p-3">
        <div className="w-20 h-20 rounded overflow-hidden shrink-0">
          <ImageWithFallback
            src={image}
            alt={title}
            className="size-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white mb-1 truncate">{title}</h4>
          
          {status === "downloading" && progress !== undefined && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Downloading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {status === "installed" && (
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-4 py-1.5 rounded text-white text-sm transition-all">
              <Play className="size-4" fill="currentColor" />
              <span>Play</span>
            </button>
          )}
          
          {status === "playing" && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400">Now Playing</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
