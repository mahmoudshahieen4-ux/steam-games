import { useState, useRef, useEffect, memo } from "react";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = memo<OptimizedImageProps>(
  ({
    src,
    alt,
    fallbackSrc,
    className = "",
    lazy = true,
    onLoad,
    onError,
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      if (!lazy) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [lazy]);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    if (hasError) {
      return (
        <div
          className={`flex items-center justify-center bg-red-950/20 border border-red-900/30 rounded ${className}`}
        >
          <ImageOff className="size-8 text-red-900/40" />
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!isLoaded && (
          <div className="absolute inset-0 bg-red-950/10 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          {...props}
        />
      </div>
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";
