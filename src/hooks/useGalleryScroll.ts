import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGalleryScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const track = document.querySelector<HTMLElement>(".gallery-track");
      const pin = document.querySelector<HTMLElement>(".gallery-pin");
      if (!track || !pin) return;

      const getScrollAmount = () => Math.max(track.scrollWidth - pin.clientWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
  trigger: pin,
  start: "top 20%",
  end: () => "+=" + getScrollAmount(),
  scrub: 1,
  pin: true,
  invalidateOnRefresh: true,
},
      });

      // Each image drifts opposite the track for a subtle depth effect
      gsap.utils.toArray<HTMLElement>(".gallery-image").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.25, xPercent: -6 },
          {
            scale: 1,
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Cards fade/rise in as they enter the horizontal viewport
      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
            },
          }
        );
      });
    }, ".gallery-scope");

    return () => ctx.revert();
  }, [ready]);
};
