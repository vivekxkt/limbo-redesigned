import { siteContent } from "../../data/siteContent";

export const GallerySection = () => {
  return (
    <section
  id="gallery"
  data-chapter
  className="gallery-scope relative z-20 overflow-hidden bg-black py-24 md:py-32"
>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <h2 className="reveal-up mb-4 font-display text-6xl tracking-[0.08em] md:text-7xl">LIMBO FRAGMENTS</h2>
        <p className="reveal-up mb-4 max-w-2xl font-body text-sm uppercase tracking-[0.3em] text-fog/60">
          Official gameplay stills from LIMBO.
        </p>
        <p className="reveal-up font-body text-xs uppercase tracking-[0.4em] text-fog/40">Scroll to explore &rarr;</p>
      </div>

      <div className="gallery-pin relative mt-12 overflow-hidden">
        <div className="gallery-track flex gap-6 pl-[320px] pr-6 md:pl-[420px] md:pr-12" style={{ width: "max-content" }}>
          {siteContent.gallery.map((item, index) => (
            <article
              key={item.title}
              data-cursor="hover"
              className="gallery-card group relative h-[75vh] w-[80vw]  rounded-2xl b"
            >
              <div className="h-full w-full overflow-hidden">
                <img
  src={item.image}
  alt={item.title}
  className="gallery-image h-full w-full object-cover object-center saturate-[0.65] transition duration-700 group-hover:saturate-100"
/>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.3em] text-fog/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="absolute bottom-5 left-5 font-display text-4xl tracking-[0.08em] text-fog">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
