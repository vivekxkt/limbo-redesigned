type ChapterRailProps = {
  chapters: string[];
};

export const ChapterRail = ({ chapters }: ChapterRailProps) => {
  return (
    <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-4">
      <div className="chapter-progress absolute right-12 top-2 h-40 w-px bg-gradient-to-b from-white/80 to-white/20" />
      {chapters.map((chapter, index) => (
        <div key={chapter} data-rail-item className="rail-item opacity-40 transition-all duration-300">
          <div className="flex items-center gap-3">
            <span className="rail-dot h-2 w-2 rounded-full bg-current" />
            <p className="font-body text-[11px] uppercase tracking-[0.2em]">{`${String(index + 1).padStart(2, "0")} ${chapter}`}</p>
          </div>
        </div>
      ))}
    </aside>
  );
};
