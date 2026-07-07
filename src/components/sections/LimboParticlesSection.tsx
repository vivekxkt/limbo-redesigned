import { useRef } from "react";
import {  PlayCircle } from "lucide-react";
import { useLimboParticlesScroll } from "../../hooks/useLimboParticlesScroll";

export const LimboParticlesSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLimboParticlesScroll(canvasRef);

  return (
    <section
      id="limbo-particles"
      data-chapter
      className="limbo-particles-scope relative h-[300vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="limbo-particles-canvas absolute inset-0 h-full w-full"
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

        {/* Hidden LIMBO target */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2
            className="
              limbo-particles-target
              pointer-events-none
              select-none
              font-display
              text-[18vw]
              font-black
              tracking-[0.18em]
              text-white
              opacity-0
            "
          >
            LIMBO
          </h2>
        </div>

        {/* CTA Buttons */}
        <div
          className="
            limbo-cta
            absolute
            left-1/2
            top-[62%]
            flex
            -translate-x-1/2
            gap-5
            opacity-0
            pt-5
          "
        >
          <a
            href="https://store.steampowered.com/app/48000/LIMBO/"
            target="_blank"
            rel="noreferrer"
            className="
              flex items-center gap-2
              rounded-full
              border border-white/20
              bg-white/5
              px-7 py-3
              text-sm tracking-[0.2em]
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-white/10
            "
          >
            
            BUY GAME
          </a>

          <a
            href="https://www.youtube.com/watch?v=Y4HSyVXKYz8"
            target="_blank"
            rel="noreferrer"
            className="
              flex items-center gap-2
              rounded-full
              border border-white/20
              bg-white/5
              px-7 py-3
              text-sm tracking-[0.2em]
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-white/10
            "
          >
            <PlayCircle size={18} />
            WATCH TRAILER
          </a>
        </div>

        {/* Footer */}
        <footer
          className="
            limbo-footer
            absolute
            bottom-10
            left-0
            right-0
            text-center
            opacity-0
          "
        >
          <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase">
            © 2026 Vivek
          </p>
        </footer>
      </div>
    </section>
  );
};