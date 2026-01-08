import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryButton({ icon: Icon, label, active, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
        active
          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50"
          : "bg-gradient-to-br from-red-950/30 to-black/40 border border-red-900/30 text-gray-300 hover:border-red-700/50 hover:text-white"
      } backdrop-blur-sm`}
    >
      <Icon className={`size-5 ${active ? "text-white" : "text-red-400"}`} />
      <span className="whitespace-nowrap">{label}</span>
    </motion.button>
  );
}
