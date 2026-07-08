import { useEffect, useState } from "react";

import { HeroSection } from "./components/sections/HeroSection";
import { StorySection } from "./components/sections/StorySection";
import { WorldSection } from "./components/sections/WorldSection";
import { GallerySection } from "./components/sections/GallerySection";
import { TransmissionSection } from "./components/sections/TransmissionSection";
import { LimboParticlesSection } from "./components/sections/LimboParticlesSection";

import { Preloader } from "./components/ui/Preloader";
import { CustomCursor } from "./components/ui/CustomCursor";

import { useLenis } from "./hooks/useLenis";
import { useGsapScroll } from "./hooks/useGsapScroll";
import { useStoryScroll } from "./hooks/useStoryScroll";
import { useWorldScroll } from "./hooks/useWorldScroll";
import { useGalleryScroll } from "./hooks/useGalleryScroll";
import { useTransmissionScroll } from "./hooks/useTransmissionScroll";
import { useCtaScroll } from "./hooks/useCtaScroll";
import { useIntroTimeline } from "./hooks/useIntroTimeline";
import { useChapterRail } from "./hooks/useChapterRail";

export default function App() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    setIsMobile(mobileCheck);
  }, []);

  useLenis(ready);
  useGsapScroll(ready);
  useStoryScroll(ready);
  useWorldScroll(ready);
  useGalleryScroll(ready);
  useTransmissionScroll(ready);
  useCtaScroll(ready);
  useIntroTimeline(ready);
  useChapterRail(ready);

  useEffect(() => {
    document.body.classList.add("preloading");

    const readyTimer = window.setTimeout(() => {
      setReady(true);
      document.body.classList.remove("preloading");
    }, 1700);

    return () => {
      window.clearTimeout(readyTimer);
      document.body.classList.remove("preloading");
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
        <div>
          <h1 className="font-display text-6xl tracking-[0.12em] text-white">
            LIMBO
          </h1>

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-fog/70">
            Desktop Experience Only
          </p>

          <p className="mt-4 text-fog/50">
            Please open this experience on a desktop or laptop.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-fog">
      <Preloader ready={ready} />
      <CustomCursor />

      <main>
        <HeroSection />
        <StorySection />
        <WorldSection />
        <GallerySection />
        <TransmissionSection />
        <LimboParticlesSection />
      </main>
    </div>
  );
}