import { useEffect, useState } from "react";

import { HeroSection } from "./components/sections/HeroSection";
import { StorySection } from "./components/sections/StorySection";
import { WorldSection } from "./components/sections/WorldSection";
import { GallerySection } from "./components/sections/GallerySection";
import { TransmissionSection } from "./components/sections/TransmissionSection";

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
import { LimboParticlesSection } from "./components/sections/LimboParticlesSection";

export default function App() {
  const [ready, setReady] = useState(false);

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
