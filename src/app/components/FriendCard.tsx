import { MessageCircle, UserPlus } from "lucide-react";

interface FriendCardProps {
  name: string;
  avatar: string;
  status: "online" | "offline" | "in-game";
  currentGame?: string;
}

export function FriendCard({ name, avatar, status, currentGame }: FriendCardProps) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    "in-game": "bg-red-500",
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-red-950/20 to-black/30 backdrop-blur-sm border border-red-900/20 hover:border-red-700/40 transition-all group">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-lg">
          {avatar}
        </div>
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${statusColors[status]} border-2 border-black`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm">{name}</div>
        {currentGame && (
          <div className="text-red-400 text-xs truncate">{currentGame}</div>
        )}
        {!currentGame && status === "online" && (
          <div className="text-gray-400 text-xs">Online</div>
        )}
        {status === "offline" && (
          <div className="text-gray-500 text-xs">Offline</div>
        )}
      </div>
      
      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-900/30 rounded transition-all">
        <MessageCircle className="size-4 text-gray-400 hover:text-white" />
      </button>
    </div>
  );
}
