import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const useIntroTimeline = (ready: boolean) => {
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const percentEl = gsap.utils.toArray<HTMLElement>(".preloader-percent")[0];

      const counter = { value: 0 };

      tl.current = gsap.timeline();

      tl.current
        .to(counter, {
          value: 100,
          duration: 1.4,
          ease: "expo.out",
          onUpdate: () => {
            if (percentEl) {
              percentEl.textContent = Math.floor(counter.value)
                .toString()
                .padStart(2, "0");
            }
          },
        })
        .to(
          ".preloader-bar",
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power4.inOut",
          },
          "<"
        )
        .to(".preloader-percent", {
          y: -20,
          opacity: 0,
          duration: 0.4,
        })
        .to(".preloader", {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        });
    });

    return () => ctx.revert();
  }, [ready]);
};