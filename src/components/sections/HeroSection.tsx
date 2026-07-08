export const HeroSection = () => {
  return (
    <section
      id="hero"
      data-chapter
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-24 md:px-12 md:pb-24"
    >
      {/* Background Image */}
      <div
        className="hero-video absolute inset-0 bg-cover bg-center opacity-85"
        style={{
          backgroundImage: `url('/hero_upscaled.png')`,
        }}
      />

      <div className="hero-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.72)_58%,rgba(0,0,0,1)_100%)]" />

      <div className="hero-vignette absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0)_40%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="hero-tag mb-5 font-body text-sm uppercase tracking-[0.42em] text-fog/85">
          A PLAYDEAD-INSPIRED EXPERIENCE
        </p>

        <h1 className="hero-title font-display text-8xl leading-[0.9] tracking-[0.08em] text-white md:text-[11rem]">
          LIMBO
        </h1>

        <p className="hero-sub mt-6 max-w-2xl font-body text-base uppercase tracking-[0.35em] text-fog/75 md:text-lg">
          Where silence has gravity and shadows are alive.
        </p>

        <div className="hero-line mt-9 h-px w-full max-w-xl bg-gradient-to-r from-white via-fog/70 to-transparent" />

        <div className="hero-next pointer-events-none absolute bottom-2 left-0 opacity-0 md:bottom-6">
          <p className="font-body text-xs uppercase tracking-[0.45em] text-fog/70">
            Scroll To Enter Chapter One
          </p>
        </div>
      </div>
    </section>
  );
};
