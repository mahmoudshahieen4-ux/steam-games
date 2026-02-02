import { motion } from "motion/react";

interface SkeletonBentoCardProps {
    size?: "small" | "medium" | "large" | "wide" | "tall";
}

const styles = {
    card: "relative rounded-xl overflow-hidden h-full w-full bg-red-950/20 border border-red-900/30",
    content: "relative h-full flex flex-col justify-between p-4 md:p-6",
    shimmer: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-red-900/10 to-transparent",
}

export function SkeletonBentoCard({ size = "medium" }: SkeletonBentoCardProps) {
    const sizeClasses = {
        small: "col-span-1 row-span-1 min-h-[200px]",
        medium: "col-span-1 row-span-1 sm:row-span-2 min-h-[400px]",
        large: "col-span-1 sm:col-span-2 row-span-1 sm:row-span-3 min-h-[600px]",
        wide: "col-span-1 sm:col-span-2 row-span-1 min-h-[200px]",
        tall: "col-span-1 row-span-1 sm:row-span-3 min-h-[600px]",
    };

    return (
        <div className={`${sizeClasses[size]} ${styles.card}`}>
            <div className={styles.shimmer} />

            {/* Skeleton Content */}
            <div className={styles.content}>
                <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                        <div className="h-5 w-16 bg-red-900/20 rounded-full" />
                        <div className="h-5 w-16 bg-red-900/20 rounded-full" />
                    </div>
                    <div className="h-6 w-12 bg-red-900/20 rounded-lg" />
                </div>

                <div className="space-y-4">
                    {/* Title skeleton */}
                    <div className="h-8 w-3/4 bg-red-900/20 rounded-lg" />

                    {/* Stats skeleton */}
                    <div className="flex gap-3">
                        <div className="h-6 w-12 bg-red-900/20 rounded" />
                        <div className="h-6 w-12 bg-red-900/20 rounded" />
                    </div>

                    {/* Price skeleton */}
                    <div className="h-8 w-24 bg-red-900/20 rounded-lg" />

                    {/* Button skeleton */}
                    <div className="h-8 w-24 bg-red-900/20 rounded-lg mt-4" />
                </div>
            </div>
        </div>
    );
}
