import { useEffect } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");

    if (!dot || !ring) {
      return;
    }

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
    };

    const hoverTargets = document.querySelectorAll("a, button, [data-cursor='hover']");

    const activate = () => {
      document.body.classList.add("cursor-active");
      gsap.to(ring, { scale: 1.75, duration: 0.24, ease: "power2.out" });
      gsap.to(dot, { scale: 0.7, duration: 0.24, ease: "power2.out" });
    };

    const deactivate = () => {
      document.body.classList.remove("cursor-active");
      gsap.to(ring, { scale: 1, duration: 0.24, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.24, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    hoverTargets.forEach((node) => {
      node.addEventListener("mouseenter", activate);
      node.addEventListener("mouseleave", deactivate);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      hoverTargets.forEach((node) => {
        node.removeEventListener("mouseenter", activate);
        node.removeEventListener("mouseleave", deactivate);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-ring hidden md:block" />
      <div className="cursor-dot hidden md:block" />
    </>
  );
};
