type PreloaderProps = {
  ready: boolean;
};

export const Preloader = ({ ready }: PreloaderProps) => {
  return (
    <div className="preloader fixed inset-0 z-[110] flex items-center justify-center bg-[#050507]" aria-hidden={ready}>
      <div className="w-[min(420px,80vw)]">
        <p className="preloader-percent font-display text-7xl tracking-[0.08em] text-fog">00</p>
        <div className="mt-5 h-px w-full overflow-hidden bg-white/20">
          <div className="preloader-bar h-full origin-left scale-x-0 bg-gradient-to-r from-white via-fog to-mist" />
        </div>
        <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-fog/55">
          {ready ? "Initializing Scene" : "Loading Cinematic Assets"}
        </p>
      </div>
    </div>
  );
};
