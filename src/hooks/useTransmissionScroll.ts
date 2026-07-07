import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTransmissionScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".transmission-scope",
          start: "top top",
          end: "+=220%",
          scrub: 1.5,
          pin: true,
        },
      });

      tl

      .fromTo(
        ".transmission-image",
        {
          scale: 1.35,
          filter: "brightness(0.2)",
        },
        {
          scale: 1,
          filter: "brightness(0.9)",
        },
        0
      )

      .fromTo(
        [
          ".transmission-tag",
          ".transmission-title",
          ".transmission-quote",
        ],
        {
          y: 180,
          opacity: 0,
          scaleY: 1.4,
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
        },
        0.15
      )

      .to(
        ".transmission-dark",
        {
          opacity: 0.45,
        },
        0.3
      )

      .fromTo(
  ".transmission-image",
  {
    scale: 1.35,
    filter: "brightness(0.2)",
  },
  {
    scale: 1,
    filter: "brightness(1)",
  },
  0
)

.to(
  [
    ".transmission-tag",
    ".transmission-title",
    ".transmission-quote",
  ],
  {
    opacity: 0,
    y: -120,
    stagger: 0.03,
  },
  0.8
)

.to(
  ".transmission-dark",
  {
    opacity: 0.15,
  },
  0.9
)
    });

    return () => ctx.revert();
  }, [ready]);
};
