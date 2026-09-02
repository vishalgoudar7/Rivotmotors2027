"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type CareerSection = {
  title: string;
  highlight: string;
  description: string;
  quote: string;
  image?: string;
};

const careerSections: CareerSection[] = [
  {
    title: "RIVOT",
    highlight: "Culture",
    description:
      "We believe great work happens when people feel trusted, supported, and free to think. At RIVOT, culture is built through collaboration, ownership, and respect - every day, by everyone.",
    quote: "At RIVOT, we build the future together.",
  },
  {
    title: "Our",
    highlight: "Manifesto",
    description:
      "Dream beyond what exists. Build with intent. Learn fast, stay curious, and keep moving forward. We believe progress comes from action, not perfection.",
    quote: "The ones who are crazy enough to think they can change the world are the ones who do.",
    image: "/Story_page/10.webp",
  },
  {
    title: "Our",
    highlight: "Mission",
    description:
      "To redefine urban mobility through smart, sustainable innovation. We build products that solve real problems and make everyday transportation better for people and cities.",
    quote: "The future of mobility is not something we predict. It is something we build.",
    image: "/Story_page/13.webp",
  },
  {
    title: "Dreamer",
    highlight: "Doers",
    description:
      "We attract people who imagine boldly and execute relentlessly. If you like turning ideas into reality and learning by doing, you will feel at home here.",
    quote: "The way to get started is to quit talking and begin doing.",
    image: "/Story_page/12.webp",
  },
  {
    title: "Build the",
    highlight: "Future",
    description:
      "You will work on real challenges, not recycled ideas. From concept to execution, you will own your work and see its impact in the real world.",
    quote: "If you want something new, you have to stop doing something old.",
    image: "/Story_page/14.webp",
  },
  {
    title: "We are",
    highlight: "Different",
    description:
      "We do not follow trends, we question them. Built in Belagavi with global ambition, we believe meaningful innovation can come from anywhere.",
    quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    image: "/Story_page/15.webp",
  },
  {
    title: "You",
    highlight: "In?",
    description:
      "If you are curious, driven, and ready to build something meaningful, we want you. Your background does not matter, your mindset does.",
    quote: "We do not hire resumes. We hire minds that see what others do not.",
    image: "/Story_page/16.webp",
  },
];

const totalFrames = 120;

function padFrame(value: number) {
  return String(value).padStart(4, "0");
}

export function CareersShowcase() {
  const [activeSection, setActiveSection] = useState(0);
  const [frame, setFrame] = useState(6);
  const [dragging, setDragging] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastX = useRef(0);
  const isWheelCooling = useRef(false);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth > 900);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setLoadedFrames(totalFrames);
      return;
    }

    let cancelled = false;
    let loaded = 0;
    for (let index = 1; index <= totalFrames; index += 1) {
      const image = new window.Image();
      image.src = `/grayscooty/${padFrame(index)}.webp`;
      image.onload = image.onerror = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedFrames(loaded);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [isDesktop]);

  useEffect(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 18) return;
      event.preventDefault();

      if (isWheelCooling.current) return;
      isWheelCooling.current = true;

      setActiveSection((current) => {
        if (event.deltaY > 0) return Math.min(current + 1, careerSections.length - 1);
        return Math.max(current - 1, 0);
      });

      window.setTimeout(() => {
        isWheelCooling.current = false;
      }, 500);
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => panel.removeEventListener("wheel", onWheel);
  }, []);

  const frameSrc = useMemo(() => `/grayscooty/${padFrame(frame)}.webp`, [frame]);
  const loadingProgress = Math.round((loadedFrames / totalFrames) * 100);

  const updateFrameFromDelta = (deltaX: number) => {
    const step = Math.trunc(deltaX * 0.2);
    if (step === 0) return;
    setFrame((current) => {
      const next = ((current + step - 1 + totalFrames * 10) % totalFrames) + 1;
      return next;
    });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isDesktop) return;
    setDragging(true);
    lastX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!dragging || !isDesktop) return;
    const delta = event.clientX - lastX.current;
    updateFrameFromDelta(delta);
    lastX.current = event.clientX;
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isDesktop) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="rivotCareersPage">
      <div className="rivotCareersShell">
        <div className="rivotCareersViewerPanel">
          <div className="rivotCareersViewer" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
            {isDesktop && loadedFrames < totalFrames ? (
              <div className="rivotCareersLoader" aria-live="polite">
                <div className="rivotCareersLoaderBar" aria-hidden="true">
                  <span style={{ width: `${loadingProgress}%` }} />
                </div>
                <small>Loading... {loadingProgress}%</small>
              </div>
            ) : null}

            <Image src={frameSrc} alt="RIVOT scooter 360 view" fill priority className="rivotCareersScooter" sizes="(max-width: 900px) 100vw, 46vw" />

            <div className="rivotCareersRotationHint" aria-hidden="true">
              <b>360</b>
              <span>Drag to rotate</span>
            </div>
          </div>
        </div>

        <div className="rivotCareersContentPanel" ref={rightPanelRef}>
          {careerSections.map((section, index) => (
            <article className={`rivotCareersSection${section.image ? " hasImage" : ""}${index === activeSection ? " isActive" : ""}`} key={`${section.title}-${section.highlight}`}>
              {section.image ? <Image src={section.image} alt="" fill sizes="(max-width: 900px) 100vw, 54vw" className="rivotCareersSectionBg" /> : null}
              <div className="rivotCareersSectionShade" aria-hidden="true" />
              <div className="rivotCareersSectionBody">
                <h1>
                  {section.title} <span>{section.highlight}</span>
                </h1>
                <p>{section.description}</p>
                <strong>{section.quote}</strong>
                <div className="rivotCareersActions">
                  <Link href="/connect#career-opportunities">Openings</Link>
                  <Link href="/connect">Employee Journey</Link>
                </div>
              </div>
            </article>
          ))}

          <div className="rivotCareersDots" role="tablist" aria-label="Career sections">
            {careerSections.map((section, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={index === activeSection}
                className={index === activeSection ? "isActive" : ""}
                onClick={() => setActiveSection(index)}
                key={`dot-${section.title}-${section.highlight}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        body:has(.rivotCareersPage) .rivotHeader,
        body:has(.rivotCareersPage) .rivotBrand,
        body:has(.rivotCareersPage) .rivotHeaderLinks a,
        body:has(.rivotCareersPage) .rivotProductsButton,
        body:has(.rivotCareersPage) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.rivotCareersPage) .rivotBrandMark img {
          filter: none;
        }

        body:has(.rivotCareersPage) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.rivotCareersPage) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .rivotCareersPage {
          min-height: 100vh;
          padding: 104px clamp(16px, 4.5vw, 72px) 44px;
          background:
            radial-gradient(circle at 90% 10%, rgba(239, 116, 48, .14), transparent 30%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #111;
        }

        .rivotCareersShell {
          width: min(100%, 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 50% 50%;
          min-height: calc(100vh - 160px);
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, .88);
          box-shadow: 0 22px 54px rgba(17, 17, 17, .08);
        }

        .rivotCareersViewerPanel {
          position: relative;
          background:
            radial-gradient(circle at 50% 16%, rgba(239, 116, 48, .12), transparent 34%),
            linear-gradient(180deg, #fff 0%, #f4f4f4 100%);
          border-right: 1px solid rgba(17, 17, 17, .08);
        }

        .rivotCareersViewer {
          position: sticky;
          top: 104px;
          height: calc(100vh - 160px);
          cursor: ew-resize;
          user-select: none;
          overflow: hidden;
          touch-action: none;
        }

        .rivotCareersScooter {
          object-fit: contain;
          padding: clamp(24px, 6vw, 82px);
        }

        .rivotCareersLoader {
          position: absolute;
          left: 50%;
          bottom: 22px;
          z-index: 4;
          transform: translateX(-50%);
          display: grid;
          justify-items: center;
          gap: 8px;
        }

        .rivotCareersLoaderBar {
          width: 180px;
          height: 8px;
          border-radius: 999px;
          background: rgba(17, 17, 17, .16);
          overflow: hidden;
        }

        .rivotCareersLoaderBar span {
          display: block;
          height: 100%;
          background: #ef7430;
          transition: width .2s ease;
        }

        .rivotCareersLoader small {
          color: rgba(17, 17, 17, .68);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .08em;
        }

        .rivotCareersRotationHint {
          position: absolute;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          z-index: 3;
          display: grid;
          justify-items: center;
          gap: 6px;
          pointer-events: none;
        }

        .rivotCareersRotationHint span {
          color: rgba(17, 17, 17, .6);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .rivotCareersRotationHint b {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border: 2px solid rgba(17, 17, 17, .42);
          border-radius: 50%;
          color: rgba(17, 17, 17, .66);
          font-size: 11px;
          font-weight: 900;
          line-height: 1;
          animation: pulse 2s infinite;
        }

        .rivotCareersContentPanel {
          position: relative;
          overflow: hidden;
        }

        .rivotCareersSection {
          position: absolute;
          inset: 0;
          display: grid;
          align-items: center;
          background: linear-gradient(120deg, #fff 0%, #f7f7f7 100%);
          opacity: 0;
          transform: translateY(12%);
          transition: opacity .5s ease, transform .55s ease;
        }

        .rivotCareersSection.isActive {
          opacity: 1;
          transform: translateY(0);
          z-index: 2;
        }

        .rivotCareersSectionBg {
          object-fit: cover;
          object-position: center;
        }

        .rivotCareersSectionShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, rgba(0, 0, 0, .74) 24%, rgba(0, 0, 0, .48) 74%);
          z-index: 1;
          display: none;
        }

        .rivotCareersSection.hasImage .rivotCareersSectionShade {
          display: block;
        }

        .rivotCareersSectionBody {
          position: relative;
          z-index: 2;
          width: min(100%, 680px);
          padding: clamp(30px, 5vw, 56px);
        }

        .rivotCareersSection h1 {
          margin: 0;
          color: #111;
          font-size: clamp(42px, 5.6vw, 74px);
          font-weight: 300;
          line-height: 1.06;
        }

        .rivotCareersSection.hasImage h1 {
          color: #fff;
        }

        .rivotCareersSection h1 span {
          color: #ef7430;
        }

        .rivotCareersSection p {
          max-width: 700px;
          margin: 20px 0 16px;
          color: #4f5b63;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.6;
        }

        .rivotCareersSection.hasImage p {
          color: rgba(255, 255, 255, .88);
        }

        .rivotCareersSection strong {
          display: block;
          max-width: 760px;
          color: #ef7430;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.4;
        }

        .rivotCareersActions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 34px;
        }

        .rivotCareersActions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 8px;
          border: 1px solid #ef7430;
          color: #111;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .1em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, transform .2s ease;
        }

        .rivotCareersActions a:first-child {
          background: #ef7430;
          color: #fff;
          border-color: #ef7430;
        }

        .rivotCareersSection.hasImage .rivotCareersActions a:not(:first-child) {
          color: #fff;
          border-color: rgba(255, 255, 255, .5);
          background: rgba(255, 255, 255, .06);
        }

        .rivotCareersActions a:hover,
        .rivotCareersActions a:focus-visible {
          transform: translateY(-1px);
          background: rgba(239, 116, 48, .16);
          outline: none;
        }

        .rivotCareersActions a:first-child:hover,
        .rivotCareersActions a:first-child:focus-visible {
          background: #d86124;
        }

        .rivotCareersDots {
          position: absolute;
          right: 20px;
          top: 50%;
          z-index: 4;
          display: grid;
          gap: 10px;
          transform: translateY(-50%);
        }

        .rivotCareersDots button {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 50%;
          background: rgba(17, 17, 17, .26);
          cursor: pointer;
          transition: transform .2s ease, background .2s ease;
        }

        .rivotCareersDots button.isActive {
          background: #ef7430;
          transform: scale(1.25);
        }

        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotHeader,
        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotBrand,
        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotHeaderLinks a,
        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotProductsButton,
        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotExploreButton,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotHeader,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotBrand,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotHeaderLinks a,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotProductsButton,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotExploreButton {
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotBrandMark img,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotBrandMark img {
          filter: brightness(0) invert(1);
        }

        html[data-rivot-theme="dark"] body:has(.rivotCareersPage) .rivotThemeToggle,
        html[data-theme="dark"] body:has(.rivotCareersPage) .rivotThemeToggle {
          border-color: rgba(255, 255, 255, .18);
          background: rgba(17, 17, 17, .82);
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotCareersPage,
        html[data-theme="dark"] .rivotCareersPage {
          background:
            radial-gradient(circle at 90% 10%, rgba(239, 116, 48, .16), transparent 30%),
            linear-gradient(180deg, #080909 0%, #111212 100%);
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotCareersShell,
        html[data-theme="dark"] .rivotCareersShell {
          border-color: rgba(255, 255, 255, .12);
          background: rgba(16, 16, 16, .86);
          box-shadow: 0 24px 64px rgba(0, 0, 0, .45);
        }

        html[data-rivot-theme="dark"] .rivotCareersViewerPanel,
        html[data-theme="dark"] .rivotCareersViewerPanel {
          background:
            radial-gradient(circle at 50% 16%, rgba(239, 116, 48, .12), transparent 34%),
            linear-gradient(180deg, #0f0f0f 0%, #090909 100%);
          border-right-color: rgba(255, 255, 255, .12);
        }

        html[data-rivot-theme="dark"] .rivotCareersLoaderBar,
        html[data-theme="dark"] .rivotCareersLoaderBar {
          background: rgba(255, 255, 255, .22);
        }

        html[data-rivot-theme="dark"] .rivotCareersLoader small,
        html[data-theme="dark"] .rivotCareersLoader small,
        html[data-rivot-theme="dark"] .rivotCareersRotationHint span,
        html[data-theme="dark"] .rivotCareersRotationHint span {
          color: rgba(255, 255, 255, .7);
        }

        html[data-rivot-theme="dark"] .rivotCareersRotationHint b,
        html[data-theme="dark"] .rivotCareersRotationHint b {
          border-color: rgba(255, 255, 255, .48);
          color: rgba(255, 255, 255, .76);
        }

        html[data-rivot-theme="dark"] .rivotCareersSection,
        html[data-theme="dark"] .rivotCareersSection {
          background: linear-gradient(120deg, #111 0%, #161616 100%);
        }

        html[data-rivot-theme="dark"] .rivotCareersSection:not(.hasImage) h1,
        html[data-theme="dark"] .rivotCareersSection:not(.hasImage) h1,
        html[data-rivot-theme="dark"] .rivotCareersSection:not(.hasImage) p,
        html[data-theme="dark"] .rivotCareersSection:not(.hasImage) p,
        html[data-rivot-theme="dark"] .rivotCareersSection:not(.hasImage) .rivotCareersActions a:not(:first-child),
        html[data-theme="dark"] .rivotCareersSection:not(.hasImage) .rivotCareersActions a:not(:first-child) {
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotCareersDots button,
        html[data-theme="dark"] .rivotCareersDots button {
          background: rgba(255, 255, 255, .34);
        }

        @media (max-width: 900px) {
          .rivotCareersPage {
            padding: 88px 12px 36px;
          }

          .rivotCareersShell {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotCareersViewer {
            position: relative;
            top: auto;
            height: 320px;
          }

          .rivotCareersScooter {
            padding: 18px 18px 44px;
          }

          .rivotCareersContentPanel {
            min-height: 560px;
          }

          .rivotCareersSection h1 {
            font-size: clamp(34px, 11vw, 54px);
          }

          .rivotCareersSection p {
            font-size: 15px;
          }

          .rivotCareersSection strong {
            font-size: 17px;
          }

          .rivotCareersDots {
            right: 12px;
          }
        }
      `}</style>
    </section>
  );
}
