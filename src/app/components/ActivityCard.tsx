import { Trophy, MessageCircle, ThumbsUp } from "lucide-react";

interface ActivityCardProps {
  playerName: string;
  avatar: string;
  action: string;
  game: string;
  time: string;
  likes?: number;
  comments?: number;
}

export function ActivityCard({ playerName, avatar, action, game, time, likes, comments }: ActivityCardProps) {
  return (
    <div className="bg-gradient-to-br from-red-950/30 to-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg p-4 hover:border-red-700/50 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shrink-0">
          {avatar}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white">{playerName}</span>
            <span className="text-gray-400 text-sm">{action}</span>
          </div>
          
          <div className="text-red-400 text-sm mb-2">{game}</div>
          
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <span>{time}</span>
            {likes !== undefined && (
              <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <ThumbsUp className="size-3" />
                <span>{likes}</span>
              </button>
            )}
            {comments !== undefined && (
              <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <MessageCircle className="size-3" />
                <span>{comments}</span>
              </button>
            )}
          </div>
        </div>
        
        <Trophy className="size-5 text-red-500" />
      </div>
    </div>
  );
}
