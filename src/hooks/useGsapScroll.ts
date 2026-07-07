import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {

      // Reveal-up animations
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 66, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((element) => {
        gsap.to(element, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: 1.4,
          },
        });
      });

      // HERO TIMELINE
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=190%",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      heroTimeline

        // Initial dark cinematic state
        .to(".hero-video", {
          scale: 0.90,
          yPercent: 4,
          filter: "grayscale(100%) contrast(118%) brightness(0.65)",
          ease: "none",
        }, 0)

        // Gradual image reveal (more visible as scroll continues)
        .to(
          ".hero-video",
          {
            filter: "grayscale(0%) contrast(105%) brightness(1)",
            ease: "none",
          },
          0.6
        )

        // Reduce overlay darkness gradually
        .to(
          ".hero-overlay",
          {
            opacity: 0.55,
            ease: "none",
          },
          0.6
        )

        // Slight vignette softening
        .to(
          ".hero-vignette",
          {
            opacity: 0.15,
            ease: "none",
          },
          0.6
        )

        // Text animations (slightly delayed now)
        .to(
          ".hero-tag",
          {
            y: -55,
            opacity: 0,
          },
          0.3
        )
        .to(
          ".hero-title",
          {
            y: -70,
            scale: 0.83,
            opacity: 0.22,
          },
          0.4
        )
        .to(
          ".hero-sub",
          {
            y: 44,
            opacity: 0,
          },
          0.4
        )
        .to(
          ".hero-line",
          {
            scaleX: 0.15,
            transformOrigin: "left",
            opacity: 0.35,
          },
          0.45
        )
        .fromTo(
          ".hero-next",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1 },
          0.6
        )
        .to(
          ".hero-next",
          {
            y: -24,
            opacity: 0,
          },
          0.9
        );

      // Progress bar
      gsap.fromTo(
        ".chapter-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ready]);
};
