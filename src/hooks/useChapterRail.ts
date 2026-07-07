import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ties each [data-chapter] section to its matching [data-rail-item] in the
 * ChapterRail, by document order. Previously the rail was purely decorative
 * (static opacity, no scroll logic) — this makes it a real progress indicator.
 */
export const useChapterRail = (ready: boolean) => {
  useLayoutEffect(() => {
    if (!ready) return;

    const sections = gsap.utils.toArray<HTMLElement>("[data-chapter]");
    const railItems = gsap.utils.toArray<HTMLElement>("[data-rail-item]");

    const triggers = sections.map((section, index) => {
      const railItem = railItems[index];
      if (!railItem) return null;

      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            railItems.forEach((item) => item.classList.remove("is-active"));
            railItem.classList.add("is-active");
          }
        },
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [ready]);
};
