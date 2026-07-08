import { siteContent } from "../../data/siteContent";

export const StorySection = () => {
  return (
    <section
  id="story"
  data-chapter
  className="relative min-h-screen flex items-center overflow-hidden"
>
  {/* Background Image */}
  <div
    className="story-image absolute inset-0 -z-20 bg-cover bg-[position:70%_center]"
    style={{
      backgroundImage: `url('/chap-2_upscaled.png')`,
    }}
  />
  

  {/* Full black mask (STARTS FULLY BLACK) */}
  <div className="story-mask absolute inset-0 -z-10 bg-black" />

  {/* Bottom fade into next section */}
<div className="absolute inset-x-0 bottom-0 h-64 md:h-20 z-0 bg-gradient-to-b from-transparent via-black/70 to-black" />

  <div className="story-wrapper relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
    <div className="grid gap-16 md:grid-cols-2 items-center">
      <div>
        <p className="story-tag mb-4 text-xs uppercase tracking-[0.35em] text-fog/70">
          Chapter One
        </p>

        <h2 className="story-title font-display text-6xl md:text-8xl tracking-[0.08em]">
          THE FIRST DROP
        </h2>
      </div>

      <p className="story-text text-xl md:text-2xl leading-relaxed text-fog/90">
        {siteContent.story}
      </p>
    </div>
  </div>
</section>
  );
};
