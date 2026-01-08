import { Play, ShoppingCart, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedGameProps {
  title: string;
  image: string;
  description: string;
  price: string;
  discount?: number;
  tags: string[];
}

export function FeaturedGame({ title, image, description, price, discount, tags }: FeaturedGameProps) {
  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden group">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col justify-end p-8">
        <div className="flex gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-red-900/50 backdrop-blur-sm text-red-100 text-xs rounded-full border border-red-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-4xl text-white mb-3">{title}</h2>
        <p className="text-gray-300 mb-6 max-w-2xl">{description}</p>
        
        <div className="flex items-center gap-4">
          {discount && (
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded">
              <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-2 py-1 rounded text-sm">
                -{discount}%
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">${price}</span>
                <span className="text-white text-xl">
                  ${(parseFloat(price) * (1 - discount / 100)).toFixed(2)}
                </span>
              </div>
            </div>
          )}
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-3 rounded text-white transition-all transform hover:scale-105">
            <ShoppingCart className="size-5" />
            <span>Add to Cart</span>
          </button>
          
          <button className="flex items-center gap-2 bg-red-950/50 backdrop-blur-sm hover:bg-red-900/50 border border-red-500/30 px-6 py-3 rounded text-white transition-all">
            <Heart className="size-5" />
            <span>Wishlist</span>
          </button>
          
          <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 px-6 py-3 rounded text-white transition-all">
            <Play className="size-5" fill="currentColor" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
