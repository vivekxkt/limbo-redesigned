import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

export const useCtaScroll = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    let frameId = 0;

    const ctx = gsap.context(() => {
      const heading = document.querySelector<HTMLElement>(".cta-title");

      if (heading) {
        const original = heading.textContent ?? "";

        ScrollTrigger.create({
          trigger: heading,
          start: "top 85%",
          once: true,
          onEnter: () => {
            let progress = 0;
            const totalFrames = original.length * 3;

            const scramble = () => {
              let output = "";
              const revealCount = Math.floor(
                (progress / totalFrames) * original.length
              );

              for (let i = 0; i < original.length; i += 1) {
                if (original[i] === " ") {
                  output += " ";
                } else if (i < revealCount) {
                  output += original[i];
                } else {
                  output +=
                    SCRAMBLE_CHARS[
                      Math.floor(
                        Math.random() * SCRAMBLE_CHARS.length
                      )
                    ];
                }
              }

              heading.textContent = output;
              progress += 1;

              if (progress <= totalFrames) {
                frameId = requestAnimationFrame(scramble);
              } else {
                heading.textContent = original;
              }
            };

            scramble();
          },
        });
      }

      // Pulsing glow behind the card
      gsap.to(".cta-pulse", {
        scale: 1.15,
        opacity: 0.55,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating CTA button
      gsap.to(".cta-magnetic", {
        keyframes: [
          { y: -6, rotateZ: -0.5 },
          { y: 0, rotateZ: 0.5 },
          { y: -6, rotateZ: -0.5 },
        ],
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
      });

      // Subtle breathing scale
      gsap.to(".cta-magnetic", {
        scale: 1.03,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ".cta-scope");

    // Magnetic button
    const button = document.querySelector<HTMLElement>(".cta-magnetic");
    let cleanupMagnetic = () => {};

    if (button) {
      const moveX = gsap.quickTo(button, "x", {
        duration: 0.3,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(button, "y", {
        duration: 0.3,
        ease: "power3.out",
      });

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();

        moveX(
          (event.clientX - rect.left - rect.width / 2) * 0.35
        );

        moveY(
          (event.clientY - rect.top - rect.height / 2) * 0.35
        );

        gsap.to(button, {
          scale: 1.08,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        moveX(0);
        moveY(0);

        gsap.to(button, {
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);

      cleanupMagnetic = () => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      ctx.revert();
      cleanupMagnetic();
      cancelAnimationFrame(frameId);
    };
  }, [ready]);
};