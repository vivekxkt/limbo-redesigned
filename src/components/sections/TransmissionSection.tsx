

export const TransmissionSection = () => {
  return (
    <section
      id="transmission"
      className="transmission-scope relative min-h-[220vh]"
    >
      <div
        className="transmission-image absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/limbo_upscaled.png')`,
        }}
      />

      <div className="transmission-dark absolute inset-0 bg-black" />

      <div className="transmission-content sticky top-0 flex h-screen items-center">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="transmission-tag font-body text-xs uppercase tracking-[0.5em] text-fog/60">
  Chapter Two
</p>

<h2 className="transmission-title mt-4 font-display text-7xl leading-none md:text-[11rem]">
  INTO THE
  <br />
  DARK
</h2>

<p className="transmission-quote mt-10 max-w-xl text-xl text-fog/70 md:text-2xl">
  Every step forward feels like a mistake. Turning back is no longer an option.
</p>
        </div>
      </div>
    </section>
  );
};
