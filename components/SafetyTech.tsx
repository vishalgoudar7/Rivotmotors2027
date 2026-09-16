"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import safeImage from "@/asset/newimg/Safety/Safety.jpeg";

function SafetyIcon({ type }: { type: "shield" | "bolt" | "gauge" | "light" | "theft" }) {
  if (type === "bolt") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M20 4L9 20H17L15 32L28 14H20L20 4Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "gauge") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 23C8 16.37 13.37 11 20 11C26.63 11 32 16.37 32 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 22L26 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 14L7 11M29 14L32 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "light") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="3" />
        <path d="M18 4V8M18 28V32M4 18H8M28 18H32M8.1 8.1L11 11M25 25L27.9 27.9M27.9 8.1L25 11M11 25L8.1 27.9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "theft") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M9 18C9 12.48 13.48 8 19 8C24.52 8 29 12.48 29 18V21H9V18Z" fill="currentColor" />
        <path d="M7 21H31M11 25H27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="15" cy="17" r="1.7" fill="#fff" />
        <circle cx="23" cy="17" r="1.7" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 5L29 9V17C29 24.4 24.38 29.45 18 32C11.62 29.45 7 24.4 7 17V9L18 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M13 18L16.5 21.5L24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SafetyTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`rivotSafetyTech rivotSafetyAnimated${isVisible ? " isVisible" : ""}`}
      aria-label="Safety technology highlights"
    >
      <div className="rivotSafetyBackground" aria-hidden="true">
        <Image src={safeImage} alt="" fill sizes="100vw" />
      </div>
      <div className="rivotSafetyTechPanel">
        <div className="rivotSafetyHeader">
          <p><SafetyIcon type="shield" /> Safety</p>
          <h2>Advanced protection for every ride.</h2>
          <span>Smart systems that keep you and your ride safe, always.</span>
          <i aria-hidden="true" />
        </div>

        <div className="rivotSafetyGrid">
          <div className="rivotSafetyList rivotSafetyListLeft">
            <article className="rivotSafetyFeature">
              <div>
                <h3>Fall Guard</h3>
                <p>Detects a tip-over and cuts power instantly.</p>
              </div>
              <span className="rivotSafetyRoundIcon" aria-hidden="true"><SafetyIcon type="shield" /></span>
            </article>

            <article className="rivotSafetyFeature">
              <div>
                <h3>Traction Control</h3>
                <p>More grip. More confidence.</p>
              </div>
              <span className="rivotSafetyRoundIcon rivotSafetyTc" aria-hidden="true">TC</span>
            </article>

            <article className="rivotSafetyFeature">
              <div>
                <h3>Roll Protecter</h3>
                <p>Prevents rollovers. Just complete control on inclines.</p>
              </div>
              <span className="rivotSafetyRoundIcon" aria-hidden="true"><SafetyIcon type="gauge" /></span>
            </article>
          </div>

          <div className="rivotSafetyStage" aria-hidden="true" />

          <div className="rivotSafetyList rivotSafetyListRight">
            <article className="rivotSafetyFeature">
              <span className="rivotSafetyRoundIcon" aria-hidden="true"><SafetyIcon type="bolt" /></span>
              <div>
                <h3>Smart Brake Signal</h3>
                <p>Signals sudden braking instantly to riders behind you.</p>
              </div>
            </article>

            <article className="rivotSafetyFeature">
              <span className="rivotSafetyRoundIcon" aria-hidden="true"><SafetyIcon type="light" /></span>
              <div>
                <h3>Walk Away Lights</h3>
                <p>Lights the way when you need them.</p>
              </div>
            </article>

            <article className="rivotSafetyFeature">
              <span className="rivotSafetyRoundIcon" aria-hidden="true"><SafetyIcon type="theft" /></span>
              <div>
                <h3>Anti Theft</h3>
                <p>Instant alerts when unauthorized movement is detected.</p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="rivotSafetyMobile">
        <div className="rivotSafetyMobileHero">
          <Image src={safeImage} alt="RIVOT scooter safety technology" fill sizes="100vw" />
          <span className="rivotSafetyMobileHeroCopy">Ride<br />a safer<br />tomorrow<i /></span>
        </div>
        <div className="rivotSafetyMobileCopy">
          <p>Safety</p>
          <h2>Smarter rides, <span>safer tomorrows.</span></h2>
          <small>Advanced safety systems designed to keep every ride protected.</small>
        </div>
        <div className="rivotSafetyMobileGrid">
          <article><i><SafetyIcon type="shield" /></i><div><b>Fall Guard</b><small>Detects a tip-over instantly.</small></div></article>
          <article><i><span className="rivotSafetyMobileTc">TC</span></i><div><b>Traction Control</b><small>More grip. More confidence.</small></div></article>
          <article><i><SafetyIcon type="gauge" /></i><div><b>Roll Protecter</b><small>Prevents rollovers on inclines.</small></div></article>
          <article><i><SafetyIcon type="bolt" /></i><div><b>Smart Brake Signal</b><small>Alerts riders behind you.</small></div></article>
          <article><i><SafetyIcon type="light" /></i><div><b>Walk Away Lights</b><small>Lights the way when needed.</small></div></article>
          <article><i><SafetyIcon type="theft" /></i><div><b>Anti Theft</b><small>Instant unauthorized movement alerts.</small></div></article>
        </div>
      </div>

      <style jsx global>{`
        .rivotSafetyMobile {
          display: none;
        }

        .rivotSafetyAnimated .rivotSafetyHeader > *,
        .rivotSafetyAnimated .rivotSafetyFeature {
          opacity: 0;
          will-change: opacity, transform, filter;
        }

        .rivotSafetyAnimated .rivotSafetyHeader > * {
          transform: translateY(28px);
          filter: blur(7px);
        }

        .rivotSafetyAnimated .rivotSafetyFeature {
          transform: translateY(24px) scale(.97);
          filter: blur(5px);
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyHeader > *,
        .rivotSafetyAnimated.isVisible .rivotSafetyFeature {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyHeader p {
          transition: opacity .65s ease .08s, transform .65s cubic-bezier(.22, 1, .36, 1) .08s, filter .65s ease .08s;
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyHeader h2 {
          transition: opacity .85s ease .2s, transform .85s cubic-bezier(.16, 1, .3, 1) .2s, filter .8s ease .2s, letter-spacing .85s ease .2s;
          animation: rivotSafetyHeadline .85s cubic-bezier(.16, 1, .3, 1) .2s both;
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyHeader > span {
          transition: opacity .75s ease .38s, transform .75s cubic-bezier(.22, 1, .36, 1) .38s, filter .75s ease .38s;
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyHeader > i {
          transition: opacity .6s ease .52s, transform .8s cubic-bezier(.22, 1, .36, 1) .52s, filter .6s ease .52s;
        }

        .rivotSafetyAnimated.isVisible .rivotSafetyListLeft .rivotSafetyFeature:nth-child(1) { transition: opacity .7s ease .48s, transform .75s cubic-bezier(.22, 1, .36, 1) .48s, filter .7s ease .48s; }
        .rivotSafetyAnimated.isVisible .rivotSafetyListRight .rivotSafetyFeature:nth-child(1) { transition: opacity .7s ease .58s, transform .75s cubic-bezier(.22, 1, .36, 1) .58s, filter .7s ease .58s; }
        .rivotSafetyAnimated.isVisible .rivotSafetyListLeft .rivotSafetyFeature:nth-child(2) { transition: opacity .7s ease .68s, transform .75s cubic-bezier(.22, 1, .36, 1) .68s, filter .7s ease .68s; }
        .rivotSafetyAnimated.isVisible .rivotSafetyListRight .rivotSafetyFeature:nth-child(2) { transition: opacity .7s ease .78s, transform .75s cubic-bezier(.22, 1, .36, 1) .78s, filter .7s ease .78s; }
        .rivotSafetyAnimated.isVisible .rivotSafetyListLeft .rivotSafetyFeature:nth-child(3) { transition: opacity .7s ease .88s, transform .75s cubic-bezier(.22, 1, .36, 1) .88s, filter .7s ease .88s; }
        .rivotSafetyAnimated.isVisible .rivotSafetyListRight .rivotSafetyFeature:nth-child(3) { transition: opacity .7s ease .98s, transform .75s cubic-bezier(.22, 1, .36, 1) .98s, filter .7s ease .98s; }

        @keyframes rivotSafetyHeadline {
          from { letter-spacing: -.075em; }
          to { letter-spacing: -.045em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotSafetyAnimated .rivotSafetyHeader > *,
          .rivotSafetyAnimated .rivotSafetyFeature {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 560px) {
          .rivotSafetyTech {
            min-height: auto !important;
            padding: 0 !important;
            background: #fff !important;
          }

          .rivotSafetyBackground,
          .rivotSafetyTechPanel {
            display: none !important;
          }

          .rivotSafetyTech::after {
            display: none !important;
          }

          .rivotSafetyMobile {
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            padding: 12px 16px 20px;
            border: 0;
            border-radius: 0;
            background: #fff;
            color: #111;
            box-shadow: none;
          }

          .rivotSafetyMobileHero {
            position: relative;
            height: clamp(190px, 58vw, 250px);
            overflow: hidden;
            border-radius: 13px;
            background: #ddd;
          }

          .rivotSafetyMobileHero img {
            object-fit: cover;
            object-position: center;
          }

          .rivotSafetyMobileHero::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(0, 0, 0, .62), transparent 42%);
          }

          .rivotSafetyMobileHeroCopy {
            position: absolute;
            left: 22px;
            top: 50%;
            z-index: 2;
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            line-height: 1.7;
            letter-spacing: .32em;
            text-transform: uppercase;
            transform: translateY(-50%);
          }

          .rivotSafetyMobileHeroCopy i {
            display: block;
            width: 20px;
            height: 2px;
            margin-top: 8px;
            background: #fff;
          }

          .rivotSafetyMobileCopy {
            padding: 18px 10px 12px;
          }

          .rivotSafetyMobileCopy p {
            margin: 0 0 6px;
            color: #ef7430;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: .14em;
            text-transform: uppercase;
          }

          .rivotSafetyMobileCopy h2 {
            margin: 0;
            font-size: 32px;
            font-weight: 900;
            line-height: .94;
            letter-spacing: -.055em;
          }

          .rivotSafetyMobileCopy h2 span {
            color: #ef7430;
          }

          .rivotSafetyMobileCopy small {
            display: block;
            max-width: 280px;
            margin-top: 9px;
            color: #62666b;
            font-size: 13px;
            font-weight: 600;
            line-height: 1.35;
          }

          .rivotSafetyMobileGrid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
            padding: 2px 8px 12px;
          }

          .rivotSafetyMobileGrid article {
            display: grid;
            grid-template-columns: 54px minmax(0, 1fr);
            align-items: center;
            gap: 10px;
            min-height: 74px;
            padding: 9px;
            border: 1px solid #ececec;
            border-radius: 13px;
            background: #fff;
          }

          .rivotSafetyMobileGrid article > i {
            display: grid;
            width: 52px;
            height: 52px;
            place-items: center;
            border-radius: 50%;
            background: rgba(239, 116, 48, .09);
            color: #ff5f21;
            font-style: normal;
          }

          .rivotSafetyMobileGrid svg {
            width: 30px;
            height: 30px;
            color: #ef7430;
          }

          .rivotSafetyMobileGrid b {
            min-width: 0;
            font-size: 11px;
            font-weight: 800;
            line-height: 1.15;
          }

          .rivotSafetyMobileGrid small {
            display: block;
            margin-top: 4px;
            color: #697078;
            font-size: 9px;
            font-weight: 500;
            line-height: 1.25;
          }

          .rivotSafetyMobileTc {
            display: grid;
            width: 34px;
            height: 34px;
            place-items: center;
            border: 1.5px solid #ef7430;
            border-radius: 10px;
            color: #ef7430;
            font-size: 12px;
            font-weight: 900;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobile {
            background: #0a0c0d;
            color: #f5f5f2;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileCopy h2 {
            color: #f5f5f2 !important;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileCopy h2 span,
          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileCopy p {
            color: #ef7430 !important;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileCopy small {
            color: #b5babd;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileGrid article {
            border-color: rgba(255,255,255,.12);
            background: #151819;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.025);
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileGrid b {
            color: #f2f3f1;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileGrid small {
            color: #a9afb2;
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSafetyMobileGrid article > i {
            background: rgba(239,116,48,.14);
            color: #ff8447;
          }

        }
      `}</style>
    </section>
  );
}
