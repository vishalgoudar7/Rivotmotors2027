"use client";

import Image from "next/image";
import safeImage from "@/asset/images/Safe.png";

function SafetyIcon({ type }: { type: "shield" | "bolt" | "gauge" | "light" | "theft" }) {
  if (type === "bolt") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M20 4L9 20H17L15 32L28 14H20L20 4Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "gauge") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M8 23C8 16.37 13.37 11 20 11C26.63 11 32 16.37 32 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 22L26 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 14L7 11M29 14L32 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "light") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="3" />
        <path d="M18 4V8M18 28V32M4 18H8M28 18H32M8.1 8.1L11 11M25 25L27.9 27.9M27.9 8.1L25 11M11 25L8.1 27.9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "theft") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M9 18C9 12.48 13.48 8 19 8C24.52 8 29 12.48 29 18V21H9V18Z" fill="currentColor" />
        <path d="M7 21H31M11 25H27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="15" cy="17" r="1.7" fill="#fff" />
        <circle cx="23" cy="17" r="1.7" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M18 5L29 9V17C29 24.4 24.38 29.45 18 32C11.62 29.45 7 24.4 7 17V9L18 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M13 18L16.5 21.5L24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SafetyTech() {
  return (
    <section className="rivotSafetyTech" aria-label="Safety technology highlights">
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
    </section>
  );
}
