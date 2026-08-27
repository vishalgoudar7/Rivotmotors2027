"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import rotationIcon from "@/asset/rivot-website-main/img/360-rotation.png";
import logo from "@/asset/images/RIVOT New Logo White.png";

type ProductSpec = {
  value: string;
  label: string;
};

type ProductSection = {
  title: string;
  highlight: string;
  description: string;
  specs: ProductSpec[];
  gallery?: boolean;
  cta?: boolean;
};

export type ProductModel = {
  model: string;
  alt: string;
  colorLabel: string;
  colors: string[];
  design: "pro" | "sport";
  sections: ProductSection[];
};

const totalFrames = 120;
const dragSpeed = 0.25;

function formatFrame(frame: number) {
  return String(frame).padStart(4, "0");
}

function frameSrc(frame: number) {
  return `/grayscooty/${formatFrame(frame)}.webp`;
}

export function ProductModelExperience({ model }: { model: ProductModel }) {
  const [activeSection, setActiveSection] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(6);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const activeSectionRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  const sectionIndexes = useMemo(
    () => model.sections.map((_, index) => index),
    [model.sections],
  );

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    let cancelled = false;

    if (window.innerWidth <= 768) {
      setLoaded(true);
      setLoadingProgress(100);
      return;
    }

    async function preloadImages() {
      let loadedCount = 0;
      const urls = Array.from({ length: totalFrames }, (_, index) => frameSrc(index + 1));
      const maxConcurrentLoads = 10;

      for (let index = 0; index < urls.length; index += maxConcurrentLoads) {
        const batch = urls.slice(index, index + maxConcurrentLoads);
        await Promise.all(
          batch.map(
            (url) =>
              new Promise<void>((resolve) => {
                const image = new window.Image();
                image.src = url;
                image.onload = image.onerror = () => {
                  loadedCount += 1;
                  if (!cancelled) {
                    setLoadingProgress(Math.round((loadedCount / urls.length) * 100));
                  }
                  resolve();
                };
              }),
          ),
        );
      }

      if (!cancelled) {
        setLoaded(true);
        setCurrentFrame(1);
      }
    }

    preloadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const navigateToSection = (nextIndex: number) => {
      if (
        isAnimatingRef.current ||
        nextIndex < 0 ||
        nextIndex >= model.sections.length
      ) {
        return;
      }

      isAnimatingRef.current = true;
      setActiveSection(nextIndex);
      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1000);
    };

    const handleWheel = (event: WheelEvent) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const isTouchpad = Math.abs(event.deltaY) < 100;
      if (isTouchpad && Math.abs(event.deltaY) < 10) {
        event.preventDefault();
        return;
      }

      const now = Date.now();
      if (now - lastScrollTimeRef.current < 1500) {
        event.preventDefault();
        return;
      }

      scrollDeltaRef.current += event.deltaY;
      scrollTimeoutRef.current = setTimeout(() => {
        scrollDeltaRef.current = 0;
      }, 300);

      const threshold = isTouchpad ? 50 : 30;
      if (Math.abs(scrollDeltaRef.current) <= threshold) {
        event.preventDefault();
        return;
      }

      const direction = scrollDeltaRef.current > 0 ? 1 : -1;
      const nextIndex = activeSectionRef.current + direction;
      scrollDeltaRef.current = 0;
      lastScrollTimeRef.current = now;

      if (nextIndex >= 0 && nextIndex < model.sections.length) {
        event.preventDefault();
        navigateToSection(nextIndex);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0].clientY;
      touchStartTimeRef.current = Date.now();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const deltaY = event.touches[0].clientY - touchStartYRef.current;
      if (Math.abs(deltaY) > 10) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const deltaY = event.changedTouches[0].clientY - touchStartYRef.current;
      const elapsed = Date.now() - touchStartTimeRef.current;
      const velocity = Math.abs(deltaY) / elapsed;

      if (Math.abs(deltaY) > 50 || velocity > 0.3) {
        navigateToSection(activeSectionRef.current + (deltaY > 0 ? -1 : 1));
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [model.sections.length]);

  const updateFrameFromX = (clientX: number) => {
    const deltaX = clientX - lastXRef.current;
    const frameChange = Math.round(deltaX * dragSpeed);

    if (frameChange !== 0) {
      setCurrentFrame((frame) => {
        let nextFrame = (frame + frameChange) % totalFrames;
        if (nextFrame <= 0) nextFrame += totalFrames;
        return nextFrame;
      });
      lastXRef.current = clientX;
    }
  };

  return (
    <section className={`productModelPage ${model.design}Design`} aria-label={`RIVOT ${model.model}`}>
      <div className="classic-container">
        <div className="classic-left">
          <div className="modelBadge">
            <span>{model.design === "pro" ? "Pro Series" : "Sport Mode"}</span>
            <b>{model.model}</b>
          </div>
          {!loaded && (
            <div className="loaderOverlay">
              <Image className="loaderLogo" src={logo} alt="Loading Logo" priority />
              <div className="progressBar">
                <div className="progressFill" style={{ width: `${loadingProgress}%` }} />
              </div>
              <div className="progressText">Loading... {loadingProgress}%</div>
            </div>
          )}

          <div
            className="viewer"
            onMouseDown={(event) => {
              if (window.innerWidth <= 768) return;
              isDraggingRef.current = true;
              lastXRef.current = event.clientX;
            }}
            onMouseMove={(event) => {
              if (!isDraggingRef.current || window.innerWidth <= 768) return;
              updateFrameFromX(event.clientX);
            }}
            onMouseUp={() => {
              isDraggingRef.current = false;
            }}
            onMouseLeave={() => {
              isDraggingRef.current = false;
            }}
            onTouchStart={(event) => {
              if (window.innerWidth <= 768) return;
              isDraggingRef.current = true;
              lastXRef.current = event.touches[0].clientX;
            }}
            onTouchMove={(event) => {
              if (!isDraggingRef.current || window.innerWidth <= 768) return;
              updateFrameFromX(event.touches[0].clientX);
            }}
            onTouchEnd={() => {
              isDraggingRef.current = false;
            }}
          >
            <img
              className="sequenceImage mobile-image"
              src={frameSrc(currentFrame)}
              alt={model.alt}
              draggable={false}
            />
            <div className="rotation-icon-container">
              <div className="rotation-icon">
                <Image src={rotationIcon} alt="360 degree rotation" />
              </div>
            </div>
          </div>

          <div className="color-section">
            <span className="color-label">{model.colorLabel}</span>
            <div className="color-dots" role="radiogroup" aria-label={`${model.model} colours`}>
              {model.colors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  type="button"
                  className={index === activeColor ? "active" : ""}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                  aria-checked={index === activeColor}
                  role="radio"
                  onClick={() => {
                    setActiveColor(index);
                    setCurrentFrame(1);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="classic-right">
          <div className="content-sections">
            {model.sections.map((section, index) => (
              <article
                className={`content-section ${
                  index === activeSection ? "active" : index < activeSection ? "prev" : "next"
                }`}
                data-gallery={section.gallery ? "true" : undefined}
                key={`${section.title}-${section.highlight}`}
              >
                <div className="content-wrapper">
                  <h1 className="model-title">
                    {section.title} <span className="highlight">{section.highlight}</span>
                  </h1>
                  <p className="model-description">{section.description}</p>

                  <div className="specs-container">
                    {section.specs.map((spec) => (
                      <div className="spec-item" key={`${spec.value}-${spec.label}`}>
                        <div className="spec-value">{spec.value}</div>
                        <div className="spec-label">{spec.label}</div>
                      </div>
                    ))}
                  </div>

                  {section.gallery && (
                    <div className="story-carousel">
                      <img src="/Story_page/10.webp" alt={`${model.model} feature 1`} />
                      <img src="/Story_page/15.webp" alt={`${model.model} feature 2`} />
                      <img src="/Story_page/10.webp" alt={`${model.model} feature 3`} />
                    </div>
                  )}

                  {section.cta && (
                    <div className="cta-buttons">
                      <Link href="/book-now" className="cta-button primary-button">
                        Book Now
                      </Link>
                      <Link href="/book-now" className="cta-button secondary-button">
                        Test Ride
                      </Link>
                    </div>
                  )}

                  {index === 0 && <div className="scroll-indicator">Scroll Down</div>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="section-indicator" aria-label={`${model.model} sections`}>
        {sectionIndexes.map((index) => (
          <button
            type="button"
            className={`section-dot${index === activeSection ? " active" : ""}`}
            aria-label={`Go to section ${index + 1}`}
            aria-current={index === activeSection}
            key={index}
            onClick={() => setActiveSection(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .productModelPage {
          --model-accent: #ce6723;
          --model-accent-2: #6f8793;
          --model-ink: #ffffff;
          --model-panel: #090909;
          --model-line: rgba(255, 255, 255, 0.18);
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: inherit;
          overflow: hidden;
        }

        .productModelPage.proDesign {
          --model-accent: #ce6723;
          --model-accent-2: #aeb7bc;
          --model-panel: #101112;
          background:
            linear-gradient(90deg, #efefea 0 50%, #070707 50% 100%);
        }

        .productModelPage.sportDesign {
          --model-accent: #ff3d2e;
          --model-accent-2: #42c8d8;
          --model-panel: #08090b;
          background:
            linear-gradient(115deg, #050506 0 38%, #161012 38% 50%, #07080a 50% 100%);
        }

        .classic-container {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        .classic-left,
        .classic-right {
          width: 50%;
          height: 100vh;
        }

        .classic-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #000;
        }

        .proDesign .classic-left {
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.94), rgba(222, 224, 220, 0.86)),
            radial-gradient(circle at 52% 48%, rgba(206, 103, 35, 0.15), transparent 38%);
          color: #111;
        }

        .sportDesign .classic-left {
          background:
            linear-gradient(130deg, rgba(255, 61, 46, 0.16), transparent 42%),
            repeating-linear-gradient(116deg, transparent 0 42px, rgba(255, 255, 255, 0.045) 42px 44px),
            #050506;
        }

        .classic-left::before,
        .classic-left::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .proDesign .classic-left::before {
          inset: 10%;
          border: 1px solid rgba(16, 17, 18, 0.08);
          border-radius: 50%;
          transform: scaleX(1.25);
        }

        .proDesign .classic-left::after {
          left: 12%;
          right: 12%;
          bottom: 17%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16, 17, 18, 0.42), transparent);
        }

        .sportDesign .classic-left::before {
          top: 12%;
          right: -8%;
          width: 56%;
          height: 72%;
          border-left: 2px solid rgba(255, 61, 46, 0.65);
          transform: skewX(-16deg);
          background: rgba(255, 61, 46, 0.06);
        }

        .sportDesign .classic-left::after {
          left: 8%;
          bottom: 18%;
          width: 74%;
          height: 3px;
          background: linear-gradient(90deg, var(--model-accent), var(--model-accent-2), transparent);
          box-shadow: 0 0 24px rgba(255, 61, 46, 0.32);
        }

        .modelBadge {
          position: absolute;
          top: 108px;
          left: 48px;
          z-index: 5;
          display: grid;
          gap: 4px;
          padding-left: 16px;
          border-left: 3px solid var(--model-accent);
          text-transform: uppercase;
        }

        .modelBadge span {
          color: var(--model-accent);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .modelBadge b {
          color: currentColor;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
        }

        .sportDesign .modelBadge {
          color: #fff;
          transform: skewX(-8deg);
        }

        .viewer {
          position: relative;
          display: flex;
          width: 100%;
          height: 80vh;
          justify-content: center;
          align-items: center;
          cursor: ew-resize;
          touch-action: none;
        }

        .viewer:active {
          cursor: grabbing;
        }

        .sequenceImage {
          width: min(120%, 860px);
          max-width: 120%;
          max-height: 77%;
          margin-top: 140px;
          object-fit: contain;
          user-select: none;
          filter: drop-shadow(0 26px 26px rgba(0, 0, 0, 0.4));
        }

        .proDesign .sequenceImage {
          width: min(114%, 820px);
          filter: drop-shadow(0 30px 28px rgba(42, 42, 38, 0.28));
        }

        .sportDesign .sequenceImage {
          width: min(126%, 900px);
          transform: translateX(-12px) rotate(-1deg);
          filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.68))
            drop-shadow(0 0 28px rgba(255, 61, 46, 0.14));
        }

        .loaderOverlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #000;
        }

        .loaderLogo {
          width: 60px;
          height: auto;
          margin-bottom: 20px;
          animation: bounceLogo 1s infinite;
        }

        .progressBar {
          width: 180px;
          height: 10px;
          margin-bottom: 10px;
          overflow: hidden;
          border-radius: 5px;
          background: #222;
        }

        .progressFill {
          height: 100%;
          background: var(--model-accent);
          transition: width 0.2s;
        }

        .progressText {
          color: #ccc;
          font-size: 14px;
        }

        .color-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .color-label {
          color: currentColor;
          font-size: 16px;
        }

        .proDesign .color-section {
          position: relative;
          z-index: 4;
          padding: 12px 16px;
          border: 1px solid rgba(16, 17, 18, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.58);
          color: #121212;
          box-shadow: 0 14px 34px rgba(16, 17, 18, 0.08);
        }

        .sportDesign .color-section {
          position: relative;
          z-index: 4;
          padding: 10px 14px;
          border: 1px solid rgba(255, 61, 46, 0.34);
          background: rgba(255, 61, 46, 0.08);
          color: #fff;
          transform: skewX(-8deg);
        }

        .sportDesign .color-section > * {
          transform: skewX(8deg);
        }

        .color-dots {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .color-dots button {
          display: inline-block;
          width: 24px;
          height: 24px;
          padding: 0;
          border: 2px solid transparent;
          border-radius: 50%;
          cursor: pointer;
          transition: border-color 0.3s, transform 0.3s;
        }

        .color-dots button.active {
          border-color: var(--model-accent);
          transform: scale(1.1);
        }

        .rotation-icon-container {
          position: absolute;
          bottom: -15px;
          left: 50%;
          z-index: 10;
          transform: translateX(-50%);
          text-align: center;
        }

        .rotation-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .rotation-icon :global(img) {
          width: 35px;
          height: 35px;
          animation: pulse 2s infinite;
        }

        .classic-right {
          position: relative;
          overflow: hidden;
          background: var(--model-panel);
        }

        .proDesign .classic-right {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 42%),
            #080808;
        }

        .sportDesign .classic-right {
          background:
            linear-gradient(120deg, rgba(255, 61, 46, 0.16), transparent 30%),
            linear-gradient(300deg, rgba(66, 200, 216, 0.08), transparent 34%),
            #050608;
        }

        .content-sections {
          position: relative;
          height: 100vh;
        }

        .content-section {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          opacity: 0;
          transform: translateY(100%);
          background-size: cover;
          background-position: center;
          transition: opacity 1.5s ease, transform 1s ease-out;
        }

        .proDesign .content-section {
          padding: 64px;
        }

        .sportDesign .content-section {
          padding: 54px 64px;
          clip-path: polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 8%);
        }

        .content-section:nth-child(2) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/10.webp");
        }

        .content-section:nth-child(3) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/11.webp");
        }

        .content-section:nth-child(4) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/12.webp");
        }

        .content-section:nth-child(5) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/13.webp");
        }

        .content-section:nth-child(6) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/14.webp");
        }

        .content-section:nth-child(7) {
          background-image: linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
            url("/Story_page/15.webp");
        }

        .content-section.active {
          opacity: 1;
          transform: translateY(0);
        }

        .content-section.prev {
          opacity: 0;
          transform: translateY(-100%);
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          height: 100%;
          flex-direction: column;
          justify-content: center;
        }

        .proDesign .content-wrapper {
          max-width: 760px;
        }

        .sportDesign .content-wrapper {
          max-width: 780px;
          padding-left: 22px;
          border-left: 2px solid var(--model-accent);
        }

        .model-title {
          margin: 0 0 20px;
          color: #fff;
          font-size: 72px;
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .proDesign .model-title {
          max-width: 720px;
          font-size: clamp(58px, 5.8vw, 86px);
          font-weight: 200;
        }

        .sportDesign .model-title {
          max-width: 780px;
          font-size: clamp(56px, 6.4vw, 92px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transform: skewX(-7deg);
        }

        .highlight {
          color: var(--model-accent);
        }

        .model-description {
          max-width: 80%;
          margin: 0 0 40px;
          color: #fff;
          font-size: 18px;
          line-height: 1.6;
        }

        .proDesign .model-description {
          max-width: 620px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 19px;
        }

        .sportDesign .model-description {
          max-width: 660px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.55;
        }

        .specs-container {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 40px;
          max-width: 650px;
        }

        .spec-item {
          min-width: 0;
          padding: 16px 18px;
          border: 1px solid var(--model-line);
          background: rgba(255, 255, 255, 0.045);
        }

        .proDesign .spec-item {
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .sportDesign .spec-item {
          border-color: rgba(255, 61, 46, 0.28);
          background: linear-gradient(120deg, rgba(255, 61, 46, 0.14), rgba(255, 255, 255, 0.035));
          transform: skewX(-7deg);
        }

        .sportDesign .spec-item > * {
          transform: skewX(7deg);
        }

        .spec-value {
          margin-bottom: 5px;
          color: var(--model-accent);
          font-size: 28px;
          font-weight: 600;
        }

        .sportDesign .spec-value {
          color: #fff;
          font-weight: 900;
          text-shadow: 0 0 18px rgba(255, 61, 46, 0.45);
        }

        .spec-label {
          color: #ccc;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 30px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .primary-button {
          border: 1px solid var(--model-accent);
          background: var(--model-accent);
          color: #fff;
        }

        .secondary-button {
          border: 1px solid var(--model-accent);
          background: transparent;
          color: #fff;
        }

        .sportDesign .cta-button {
          border-radius: 0;
          transform: skewX(-8deg);
        }

        .story-carousel {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-width: 620px;
        }

        .story-carousel img {
          width: 100%;
          height: 118px;
          object-fit: cover;
          border-radius: 6px;
        }

        .scroll-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          z-index: 1000;
          color: #fff;
          font-size: 14px;
          opacity: 0.7;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        .section-indicator {
          position: fixed;
          right: 30px;
          top: 50%;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: translateY(-50%);
        }

        .section-dot {
          width: 10px;
          height: 10px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s;
        }

        .section-dot.active {
          background: var(--model-accent);
          transform: scale(1.3);
        }

        @keyframes bounceLogo {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-20px) translateX(-50%);
          }
          60% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .productModelPage {
            overflow: visible;
          }

          .classic-container {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
          }

          .classic-left,
          .classic-right {
            width: 100%;
            height: 50vh;
          }

          .classic-left {
            padding: 15px;
          }

          .modelBadge {
            top: 78px;
            left: 24px;
          }

          .viewer {
            height: 40vh;
          }

          .sequenceImage {
            max-width: 150%;
            max-height: 199%;
            margin-top: 160px;
            pointer-events: none;
          }

          .color-section {
            justify-content: flex-start;
            width: 100%;
            margin-top: 165px;
          }

          .content-section {
            min-height: 50vh;
            padding: 28px 24px;
            clip-path: none;
          }

          .model-title {
            font-size: 48px;
          }

          .model-description {
            max-width: 95%;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.3;
          }

          .specs-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
            margin-bottom: 22px;
          }

          .spec-value {
            font-size: 24px;
          }

          .spec-label {
            font-size: 12px;
          }

          .cta-buttons {
            gap: 15px;
          }

          .cta-button {
            min-height: 48px;
            padding: 0 25px;
            font-size: 14px;
          }

          .rotation-icon-container {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
