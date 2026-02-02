
interface SkeletonHeroProps { }

const styles = {
    container: "relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-12 bg-red-950/20 border border-red-900/30",
    shimmer: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-red-900/10 to-transparent",
    content: "relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-6 z-10",
    tagRow: "flex gap-2",
    tag: "h-6 w-20 bg-red-900/20 rounded-full",
    title: "h-16 w-3/4 bg-red-900/20 rounded-2xl",
    stats: "flex items-center gap-6",
    statItem: "h-5 w-24 bg-red-900/20 rounded",
    buttonRow: "flex gap-4 pt-4",
    btn: "h-14 w-40 bg-red-900/20 rounded-xl",
};

export function SkeletonHero({ }: SkeletonHeroProps) {
    return (
        <div className={styles.container}>
            <div className={styles.shimmer} />
            <div className={styles.content}>
                <div className={styles.tagRow}>
                    <div className={styles.tag} />
                    <div className={styles.tag} />
                    <div className={styles.tag} />
                </div>

                <div className={styles.title} />

                <div className={styles.stats}>
                    <div className={styles.statItem} />
                    <div className={styles.statItem} />
                </div>

                <div className={styles.buttonRow}>
                    <div className={styles.btn} />
                    <div className={styles.btn} />
                </div>
            </div>
        </div>
    );
}
