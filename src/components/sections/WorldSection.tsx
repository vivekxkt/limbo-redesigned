import { siteContent } from "../../data/siteContent";

export const WorldSection = () => {
  return (
    <section id="world" data-chapter className="world-scope relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
      <div
  className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2"
  style={{
    background:
      "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 55%)",
  }}
/>
      
      <div className="relative mx-auto max-w-6xl">
        <h2 className="world-title font-display text-6xl leading-none tracking-[0.08em] md:text-8xl">
          NIGHT OWNS THE CITY
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3" style={{ perspective: "1200px" }}>
          {siteContent.features.map((feature, index) => (
            <article
              key={feature.title}
              data-cursor="hover"
              className="world-card relative rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/45 hover:bg-white/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="world-count block font-mono text-xs tracking-[0.3em] text-fog/50" data-count={index + 1}>
                00
              </span>
              <h3 className="mt-4 font-display text-4xl tracking-[0.08em] text-fog">{feature.title}</h3>
              <p className="mt-4 font-body text-lg leading-relaxed text-fog/80 md:text-xl">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
