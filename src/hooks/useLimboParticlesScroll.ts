import { type RefObject, useLayoutEffect } from "react";
import gsap from "gsap";

type Particle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  size: number;
};

export const useLimboParticlesScroll = (
  canvasRef: RefObject<HTMLCanvasElement | null>
) => {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const section = document.getElementById("limbo-particles");

    if (!section) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let particles: Particle[] = [];

    const progress = {
      value: 0,
    };

    const ui = {
      buttons: 0,
      footer: 0,
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return;

      offscreen.width = window.innerWidth;
      offscreen.height = window.innerHeight;

      const fontSize = Math.min(window.innerWidth * 0.18, 260);

      offCtx.fillStyle = "white";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${fontSize}px Arial Black`;

      offCtx.fillText(
        "LIMBO",
        offscreen.width / 2,
        offscreen.height / 2
      );

      const imageData = offCtx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      const gap = 6;

      for (let y = 0; y < imageData.height; y += gap) {
        for (let x = 0; x < imageData.width; x += gap) {
          const index = (y * imageData.width + x) * 4 + 3;

          if (imageData.data[index] > 128) {
            particles.push({
              startX:
                Math.random() * window.innerWidth * 2 -
                window.innerWidth / 2,

              startY:
                Math.random() * window.innerHeight * 2 -
                window.innerHeight / 2,

              targetX: x,
              targetY: y,

              x: 0,
              y: 0,

              size: Math.random() * 2 + 1,
            });
          }
        }
      }
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const start = viewportHeight;

      const end = -(rect.height * 0.5);

      const raw = (start - rect.top) / (start - end);

      progress.value = gsap.utils.clamp(
        0,
        1,
        raw
      );

      // Buttons appear after LIMBO has mostly formed
  ui.buttons = gsap.utils.clamp(
  0,
  1,
  (progress.value - 0.95) / 0.03
);

ui.footer = gsap.utils.clamp(
  0,
  1,
  (progress.value - 0.98) / 0.02
);

      gsap.set(".limbo-cta", {
        opacity: ui.buttons,
        y: gsap.utils.interpolate(
          60,
          0,
          ui.buttons
        ),
      });

      gsap.set(".limbo-footer", {
        opacity: ui.footer,
        y: gsap.utils.interpolate(
          40,
          0,
          ui.footer
        ),
      });
    };

    const render = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles.forEach((particle) => {
        particle.x = gsap.utils.interpolate(
          particle.startX,
          particle.targetX,
          progress.value
        );

        particle.y = gsap.utils.interpolate(
          particle.startY,
          particle.targetY,
          progress.value
        );

        const alpha = gsap.utils.clamp(
          0,
          1,
          (progress.value - 0.05) / 0.25
        );

        const scale = gsap.utils.interpolate(
          0.2,
          1,
          alpha
        );

        ctx.fillStyle = `rgba(255,255,255,${
          alpha * 0.95
        })`;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size * scale,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      animationFrame =
        requestAnimationFrame(render);
    };

    resize();
    updateProgress();
    render();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "scroll",
      updateProgress
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "scroll",
        updateProgress
      );
    };
  }, [canvasRef]);
};