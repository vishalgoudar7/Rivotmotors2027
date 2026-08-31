import Image, { type StaticImageData } from "next/image";
import accelerationImage from "@/asset/images/last/accelaration.png";
import rangeImage from "@/asset/images/last/IDC Range.png";
import discImage from "@/asset/images/last/Disc.png";
import monoshockImage from "@/asset/images/last/Monoshock.png";
import motorImage from "@/asset/images/last/Motor-card.jpg";
import riderAssistanceImage from "@/asset/images/Key features/Riderasistance.png";
import featureImage from "@/asset/images/Key features/Feature.png";
import safetyImage from "@/asset/images/Key features/Safeaty.png";

const keyFeatures = [
  {
    title: "Smart Riding",
    image: riderAssistanceImage,
    alt: "RIVOT rider assistance control close-up",
    pills: ["Boost Mode", "Ride cam", "comfortKey", "cruiseControl"],
  },
  {
    title: "Built-In Innovation",
    image: featureImage,
    alt: "RIVOT NX100 front feature close-up",
    pills: ["recoEngine", "APU", "Compact Boot", "compact Charger(OBC)"],
  },
  {
    title: "Advanced Safety",
    image: safetyImage,
    alt: "RIVOT safety switch close-up",
    pills: ["alerTire", "Roll Protecter", "Anti Theft", "Voice Alert"],
  },
];

const engineeringFeatures: {
  title: string;
  copy: string;
  image?: StaticImageData;
  tone?: "orange" | "green" | "blue" | "multi";
}[] = [
  { title: "Boost Mode", copy: "Feel the surge of peak power.", tone: "multi" },
  { title: "Motor", copy: "Experience the unfiltered expression of power.", image: motorImage },
  { title: "Cruise Control", copy: "Steady speed. Zero strain.", tone: "green" },
  { title: "Dual Disk", copy: "Where precision can make or brake.", image: discImage },
  { title: "All Tests Cleared", copy: "Cleared through standard RIVOT testing.", tone: "blue" },
  { title: "MonoShock", copy: "Passed for the sudden surprises along the journey.", image: monoshockImage },
];

function GearIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 3.5L18.35 6.15L21.88 5.78L22.74 9.22L25.93 10.76L24.77 14.11L26.5 17.2L23.62 19.27L23.33 22.8L19.88 23.61L17.6 26.33L14.4 24.82L11.12 26.33L8.84 23.61L5.39 22.8L5.1 19.27L2.22 17.2L3.95 14.11L2.79 10.76L5.98 9.22L6.84 5.78L10.37 6.15L16 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FeatureIcon({ tone }: { tone?: string }) {
  if (tone === "green") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M8 23C8 16.37 13.37 11 20 11C26.63 11 32 16.37 32 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 22L26 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (tone === "blue") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M18 5L29 9V17C29 24.4 24.38 29.45 18 32C11.62 29.45 7 24.4 7 17V9L18 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M13 18L16.5 21.5L24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M20 4L9 20H17L15 32L28 14H20L20 4Z" fill="currentColor" />
    </svg>
  );
}

export function ProductFeatureSections() {
  return (
    <>
      <section className="productKeyFeatures" aria-labelledby="product-key-features-title">
        <div className="productSectionCopy">
          <p>
            <span aria-hidden="true"><GearIcon /></span>
            Key Features.
          </p>
          <h2 id="product-key-features-title">Technology that keeps you ahead.</h2>
          <i aria-hidden="true" />
          <small>The features that set RIVOT apart.</small>
        </div>

        <div className="productKeyCards">
          {keyFeatures.map((feature) => (
            <article className="productKeyCard" key={feature.title}>
              <Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 768px) 100vw, 28vw" />
              <div className="productCardShade" aria-hidden="true" />
              <div className="productKeyCardContent">
                <h3>{feature.title}</h3>
                <div>
                  {feature.pills.map((pill) => <small key={pill}>{pill}</small>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="productEngineering" aria-labelledby="product-engineering-title">
        <div className="productSectionCopy">
          <p>Beyond The Surface.</p>
          <h2 id="product-engineering-title">Engineering <span>That Moves You.</span></h2>
          <small>Advanced technology built around the way you ride.</small>
          <i aria-hidden="true" />
        </div>

        <div className="productEngineeringGrid">
          {engineeringFeatures.map((feature) => (
            <article className="productEngineeringCard" key={feature.title}>
              {feature.image ? <Image src={feature.image} alt="" fill sizes="(max-width: 900px) 100vw, 22vw" /> : null}
              <div className="productEngineeringShade" aria-hidden="true" />
              <span data-tone={feature.tone ?? "orange"}><FeatureIcon tone={feature.tone} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="productPerformance" aria-labelledby="product-performance-title">
        <div className="productSectionCopy">
          <p>Performance</p>
          <h2 id="product-performance-title">Performance that <span>redefines</span> every ride.</h2>
          <small>Instant power. Impressive range. Built for the real world.</small>
          <i aria-hidden="true" />
        </div>

        <div className="productPerformanceCards">
          <article>
            <Image src={accelerationImage} alt="RIVOT scooter ready for acceleration" fill sizes="(max-width: 900px) 100vw, 28vw" />
            <div className="productCardShade" aria-hidden="true" />
            <div>
              <p>Acceleration</p>
              <h3>0-40 km/h <span>in 2.55s</span></h3>
              <small>Instant torque. Explosive start.</small>
            </div>
          </article>
          <article>
            <Image src={rangeImage} alt="RIVOT scooter for long range riding" fill sizes="(max-width: 900px) 100vw, 28vw" />
            <div className="productCardShade" aria-hidden="true" />
            <div>
              <p>Range</p>
              <h3>200 km <span>IDC Range</span></h3>
              <small>Go further. Explore more.</small>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .productKeyFeatures,
        .productEngineering,
        .productPerformance {
          display: grid;
          grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
          padding: clamp(58px, 8vw, 96px) clamp(24px, 7vw, 112px);
          background: #fff;
          color: #080808;
        }

        .productEngineering {
          grid-template-columns: minmax(230px, .9fr) minmax(0, 2.1fr);
          background: #fbfbfb;
        }

        .productSectionCopy {
          min-width: 0;
        }

        .productSectionCopy p {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 22px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .22em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productSectionCopy p span {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
        }

        .productSectionCopy svg {
          width: 100%;
          height: 100%;
        }

        .productSectionCopy h2 {
          max-width: 430px;
          margin: 0;
          color: #060606;
          font-size: clamp(38px, 4.4vw, 62px);
          font-weight: 900;
          line-height: .96;
          letter-spacing: -.045em;
        }

        .productSectionCopy h2 span {
          color: #ef7430;
        }

        .productSectionCopy small {
          display: block;
          max-width: 310px;
          margin-top: 28px;
          color: #34404a;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.45;
        }

        .productSectionCopy i {
          display: block;
          width: 58px;
          height: 3px;
          margin-top: 28px;
          background: #ef7430;
        }

        .productKeyCards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          min-width: 0;
        }

        .productKeyCard,
        .productPerformanceCards article,
        .productEngineeringCard {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .productKeyCard {
          min-height: 420px;
          transform: skewX(-10deg);
          box-shadow: 0 20px 48px rgba(17, 17, 17, .12);
        }

        .productKeyCard img,
        .productPerformanceCards img,
        .productEngineeringCard img {
          object-fit: cover;
        }

        .productCardShade,
        .productEngineeringShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.55));
          z-index: 1;
        }

        .productKeyCardContent {
          position: absolute;
          inset: 30px 30px 24px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          transform: skewX(10deg);
        }

        .productKeyCardContent h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(18px, 1.5vw, 25px);
          font-weight: 900;
          line-height: 1;
        }

        .productKeyCardContent div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .productKeyCardContent small {
          display: inline-flex;
          min-height: 28px;
          align-items: center;
          border-radius: 999px;
          background: rgba(105, 105, 105, .88);
          color: #fff;
          padding: 0 13px;
          font-size: 11px;
          font-weight: 850;
          white-space: nowrap;
        }

        .productEngineeringGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(220px, 1fr));
          gap: 18px;
        }

        .productEngineeringCard {
          display: grid;
          min-height: 260px;
          align-content: start;
          justify-items: center;
          padding: 42px 26px;
          background: #f4f4f4;
          text-align: center;
        }

        .productEngineeringCard img {
          opacity: .62;
        }

        .productEngineeringShade {
          background: linear-gradient(180deg, rgba(244,244,244,.82), rgba(244,244,244,.28));
        }

        .productEngineeringCard > span,
        .productEngineeringCard h3,
        .productEngineeringCard p {
          position: relative;
          z-index: 2;
        }

        .productEngineeringCard > span {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          margin-bottom: 22px;
          border-radius: 13px;
          background: #ef7430;
          color: #fff;
          box-shadow: 0 12px 22px rgba(200, 90, 34, .22);
        }

        .productEngineeringCard > span[data-tone="green"] {
          border-radius: 50%;
          background: rgba(31, 167, 102, .1);
          color: #1fa766;
          box-shadow: none;
        }

        .productEngineeringCard > span[data-tone="blue"] {
          background: #2c8dff;
        }

        .productEngineeringCard > span svg {
          width: 28px;
          height: 28px;
        }

        .productEngineeringCard h3 {
          margin: 0;
          color: #111;
          font-size: 22px;
          font-weight: 900;
          line-height: 1.1;
        }

        .productEngineeringCard p {
          max-width: 210px;
          margin: 16px auto 0;
          color: #30363d;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.45;
        }

        .productPerformance {
          background: #fff;
        }

        .productPerformanceCards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .productPerformanceCards article {
          min-height: 440px;
          transform: skewX(-6deg);
          box-shadow: 0 20px 48px rgba(17, 17, 17, .12);
        }

        .productPerformanceCards article > div:last-child {
          position: absolute;
          inset: 38px;
          z-index: 2;
          color: #fff;
          transform: skewX(6deg);
        }

        .productPerformanceCards p {
          margin: 0 0 48px;
          color: rgba(255,255,255,.86);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .productPerformanceCards h3 {
          margin: 0 0 28px;
          color: #fff;
          font-size: clamp(38px, 4vw, 58px);
          font-weight: 900;
          line-height: .98;
          letter-spacing: -.04em;
        }

        .productPerformanceCards h3 span {
          display: block;
          color: #ef7430;
        }

        .productPerformanceCards small {
          color: #fff;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.35;
        }

        @media (max-width: 1000px) {
          .productKeyFeatures,
          .productEngineering,
          .productPerformance {
            grid-template-columns: 1fr;
          }

          .productKeyCards,
          .productEngineeringGrid,
          .productPerformanceCards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .productKeyFeatures,
          .productEngineering,
          .productPerformance {
            padding: 42px 14px;
          }

          .productSectionCopy h2 {
            font-size: clamp(34px, 11vw, 46px);
          }

          .productKeyCard,
          .productPerformanceCards article {
            min-height: 330px;
            transform: none;
          }

          .productKeyCardContent,
          .productPerformanceCards article > div:last-child {
            transform: none;
            inset: 24px;
          }

          .productEngineeringCard {
            min-height: 220px;
          }
        }
      `}</style>
    </>
  );
}
