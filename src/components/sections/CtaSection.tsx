import { motion } from "framer-motion";

export const CtaSection = () => {
  return (
    <section id="descend" data-chapter className="cta-scope reveal-up relative overflow-hidden px-6 py-24 text-center md:px-12 md:py-32">
      <div className="cta-pulse pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/20" />
      <motion.div
        className="relative mx-auto max-w-4xl rounded-3xl border border-white/25 bg-black/60 px-6 py-12 shadow-glow backdrop-blur-md md:px-10"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
      >
        <p className="font-body text-xs uppercase tracking-[0.35em] text-fog/70">Coming November 2026</p>
        <h2 className="cta-title mt-5 font-display text-6xl leading-none tracking-[0.08em] text-fog md:text-8xl">
          START THE DESCENT
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-fog/85 md:text-xl">
          A bold LIMBO homage with GTA-inspired motion grammar: oversized typography, chapter pacing, and frictionless animation.
        </p>
        <a
  href="#hero"
  data-cursor="hover"
  className="cta-magnetic mt-10 inline-block rounded-full border border-white/40 bg-transparent px-8 py-3 font-display text-3xl tracking-[0.1em] text-fog backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/10 hover:text-white"
>
  WATCH TEASER
</a>
      </motion.div>
    </section>
  );
};
