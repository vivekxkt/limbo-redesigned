import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const useWorldScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    let split: SplitType | null = null;
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Title
      split = new SplitType(".world-title", { types: "chars" });

      gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          yPercent: 120,
          rotateX: -90,
        },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: ".world-title",
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // HUD brackets
      gsap
        .utils
        .toArray<SVGPathElement>(".world-bracket path")
        .forEach((path) => {
          const length = path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#world",
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
          });
        });

      // Cards
      const cards = gsap.utils.toArray<HTMLElement>(".world-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotateX: 25,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );

        // Magnetic tilt
        const moveX = gsap.quickTo(card, "rotateY", {
          duration: 0.4,
          ease: "power3.out",
        });

        const moveY = gsap.quickTo(card, "rotateX", {
          duration: 0.4,
          ease: "power3.out",
        });

        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();

          const px =
            (event.clientX - rect.left) / rect.width - 0.5;

          const py =
            (event.clientY - rect.top) / rect.height - 0.5;

          moveX(px * 14);
          moveY(-py * 14);
        };

        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        cleanupFns.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // Counters
      gsap
        .utils
        .toArray<HTMLElement>(".world-count")
        .forEach((el) => {
          const target = Number(el.dataset.count ?? 0);

          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
            onUpdate: () => {
              el.textContent = String(
                Math.round(counter.value)
              ).padStart(2, "0");
            },
          });
        });
    }, ".world-scope");

    return () => {
      ctx.revert();
      split?.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, [ready]);
};