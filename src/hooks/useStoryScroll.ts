import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const useStoryScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    let split: SplitType | null = null;

    const ctx = gsap.context(() => {

      // Split text into WORDS (stronger effect than lines)
      split = new SplitType(".story-text", {
        types: "words",
      });

      gsap.set(split.words, {
        opacity: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#story",
          start: "top top",
          end: "+=180%",
          scrub: 1.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background Parallax Depth
      tl.to(
        ".story-image",
        {
          scale: 1.15,
          yPercent: -8,
          ease: "none",
        },
        0
      );

      // Darkness slowly reduces (bug fix: was targeting ".story-dark", which
      // never existed in the markup — the mask is actually ".story-mask")
      tl.to(
        ".story-mask",
        {
          opacity: 0.55,
          ease: "none",
        },
        0.2
      );

      // Tag reveal
      tl.fromTo(
        ".story-tag",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.25
      );

      // Title stretch reveal
      tl.fromTo(
        ".story-title",
        {
          y: 120,
          opacity: 0,
          scaleY: 1.3,
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          duration: 1,
        },
        0.35
      );

      // Title subtle fade into background
      tl.to(
        ".story-title",
        {
          opacity: 0.35,
          scale: 0.94,
        },
        0.65
      );

      // Word-by-word stagger
      tl.to(
        split.words,
        {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.03,
          },
        },
        0.55
      );

      // Slight horizontal drift for cinematic separation
      tl.to(
        ".story-wrapper",
        {
          xPercent: -2,
          ease: "none",
        },
        0.8
      );
    });

    return () => {
      ctx.revert();
      if (split) split.revert(); // 🔥 IMPORTANT FIX
    };
  }, [ready]);
};
