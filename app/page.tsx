import Image from "next/image";
import Link from "next/link";
import heroDark from "@/asset/images/Hero1.png";
import heroLight from "@/asset/images/Hero2.png";
import riderAssistanceImage from "@/asset/images/Key features/Riderasistance.png";
import featureImage from "@/asset/images/Key features/Feature.png";
import safetyImage from "@/asset/images/Key features/Safeaty.png";
import { ScooterRotation } from "@/components/ScooterRotation";

const keyFeatures = [
  {
    number: "01",
    title: "Smart Riding",
    image: riderAssistanceImage,
    alt: "RIVOT rider assistance control close-up",
    pills: ["Boost Mode", "Ride cam", "comfortKey", "cruiseControl",],
  },
  {
    number: "02",
    title: "Built-In Innovation",
    image: featureImage,
    alt: "RIVOT NX100 front feature close-up",
    pills: ["recoEngine", "APU", "Compact Boot", "compact Charger(OBC)"],
  },
  {
    number: "03",
    title: "Advanced Safety",
    image: safetyImage,
    alt: "RIVOT safety switch close-up",
    pills: ["alerTire", "Roll Protecter", "Anti Theft", "Voice Alert"],
  },
];

export default function Home() {
  return (
    <>
      <section className="rivotHero">
        <Image
          src={heroDark}
          alt="Rivot NX100 hero image"
          fill
          priority
          sizes="100vw"
          className="rivotHeroImage rivotHeroImageDark"
        />
        <Image
          src={heroLight}
          alt=""
          fill
          sizes="100vw"
          className="rivotHeroImage rivotHeroImageLight"
        />
        <div className="rivotHeroShade" aria-hidden="true" />

        <div className="rivotHeroContent">
          <p className="rivotEyebrow">Meet the future</p>
          <h1 className="rivotHeroTitle">
            <span>NX100</span>
            <span className="rivotHeroMarks" aria-hidden="true">
              <span />
              <span />
            </span>
          </h1>
          <h2>Long rides to heavy loads</h2>
          <p className="rivotHeroCopy">
  Power for the Long Road, Space for the Long List
</p>

<div className="rivotHeroSpecs">

  {/* RANGE */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M8 36L17 18L25 29L33 13L40 23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 40H40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M33 13H40V20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <b>200 km</b>
    <small>Range</small>
  </div>

  {/* TOP SPEED */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M9 30C9 20.06 17.06 12 27 12C36.94 12 39 20.06 39 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M27 27L35 20"
          stroke="#ef7430"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="27"
          cy="27"
          r="3"
          fill="#ef7430"
        />
        <path
          d="M13 32H10M41 32H38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>

    <b>100 km/h</b>
    <small>Top Speed</small>
  </div>

  {/* FLASH CHARGE */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M27 5L11 27H23L20 43L37 19H25L27 5Z"
          stroke="#ef7430"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".55"
          strokeDasharray="4 4"
        />
      </svg>
    </span>

    <b>35 min</b>
    <small>Flash Charge</small>
  </div>

  {/* BATTERY */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect
          x="10"
          y="8"
          width="27"
          height="32"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M19 5H29"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="16"
          y="14"
          width="15"
          height="20"
          rx="2"
          fill="#ef7430"
          opacity=".9"
        />
        <path
          d="M20 18V30M24 18V30M28 18V30"
          stroke="#fff"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    </span>

    <b>4.4 kWh</b>
    <small>Battery</small>
  </div>

</div>

          <div className="rivotHeroButtons">
            <Link href="/book-now" className="rivotPriceBook">
              Book Now <span aria-hidden="true">{"\u2192"}</span>
            </Link>
            <Link href="/book-now" className="rivotTestRide">
              Test Ride <span aria-hidden="true">{"\u2192"}</span>
            </Link>
          </div>

          <div className="rivotHeroNotes">
            <span>EMI starting at Rs 3,999/month*</span>
            <span>Easy Financing Options</span>
          </div>
        </div>
      </section>

      <section className="rivotKeyFeatures" aria-labelledby="key-features-title">
        <div className="rivotKeyFeaturesShell">
          <div className="rivotKeyFeaturesCopy">
            <p className="rivotKeyEyebrow">
              <span aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 3.5L18.35 6.15L21.88 5.78L22.74 9.22L25.93 10.76L24.77 14.11L26.5 17.2L23.62 19.27L23.33 22.8L19.88 23.61L17.6 26.33L14.4 24.82L11.12 26.33L8.84 23.61L5.39 22.8L5.1 19.27L2.22 17.2L3.95 14.11L2.79 10.76L5.98 9.22L6.84 5.78L10.37 6.15L16 3.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="3.8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              Key Features.
            </p>
            <h2 id="key-features-title">
              Technology
              <br />
              that keeps you
              <br />
              ahead.
            </h2>
            <span className="rivotKeyAccent" aria-hidden="true" />
            <p>The features that set RIVOT apart.</p>
            <button className="rivotKeyArrow" type="button" aria-label="Explore all features">
              <span aria-hidden="true">{"\u2192"}</span>
            </button>
          </div>

          <div className="rivotKeyCards">
            {keyFeatures.map((feature) => (
              <article className="rivotKeyCard" key={feature.number}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 28vw"
                  className="rivotKeyCardImage"
                />
                <div className="rivotKeyCardShade" aria-hidden="true" />
                <div className="rivotKeyCardContent">
                  <div className="rivotKeyCardHeading">
                    <h3>{feature.title}</h3>
                  </div>
                  <div className="rivotKeyCardPills">
                    {feature.pills.map((pill) => (
                      <small key={pill}>{pill}</small>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rivotDesign" id="design" aria-labelledby="design-title">
        <div className="rivotDesignCopy">
          <h2 id="design-title">Designed Different.</h2>
          <p>A form built with purpose.</p>
        </div>

        <div className="rivotDesignScooter">
          <ScooterRotation className="rivotDesignImage" />
        </div>

        <div className="rivotDesignControls" aria-label="Scooter color options">
          <div className="rivotColorPicker" aria-label="Color option">
            <p>Sonic Grey</p>
            <div>
              <button type="button" className="active colorGrey" aria-label="Sonic Grey" />
              <button type="button" className="colorBlack" aria-label="Black" />
              <button type="button" className="colorBlue" aria-label="Blue Grey" />
              <button type="button" className="colorWhite" aria-label="White" />
              <button type="button" className="colorGraphite" aria-label="Graphite" />
            </div>
          </div>
        </div>
      </section>

      <section className="rivotIntro" id="explore">
        <p className="rivotEyebrow">Explore</p>
        <h2>Electric performance, staged for the spotlight.</h2>
      </section>

      <style>{`

      .rivotHeroTitle {
        display: flex;
        align-items: center;
        gap: clamp(18px, 2.4vw, 34px);
        margin: 14px 0 8px;
        color: #fff;
        font-size: clamp(52px, 8.1vw, 132px);
        font-weight: 800;
        line-height: .86;
        letter-spacing: -.055em;
        text-transform: uppercase;
      }

      .rivotHeroMarks {
        display: inline-flex;
        align-items: center;
        gap: clamp(7px, .7vw, 11px);
        flex: 0 0 auto;
        transform: skewX(-15deg);
      }

      .rivotHeroMarks span {
        display: block;
        width: clamp(24px, 2.7vw, 45px);
        height: clamp(54px, 6.1vw, 98px);
      }

      .rivotHeroMarks span:first-child {
        background: #ef7430;
      }

      .rivotHeroMarks span:last-child {
        background: rgba(255, 255, 255, .34);
      }

      .rivotHero h2 {
        margin: 0;
        color: #fff;
        font-size: clamp(20px, 1.85vw, 30px);
        font-weight: 400;
        line-height: 1.12;
        letter-spacing: .16em;
        text-transform: uppercase;
      }
        .rivotHero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  margin-top: 0;

  display: flex;
  align-items: flex-start;
  overflow: hidden;

  background: #0d1017;
  color: #fff;
}

        .rivotHeroImage {
          object-fit: cover;
          object-position: center bottom;
          transition: opacity .25s ease;
        }

        .rivotHeroImageLight {
          opacity: 0;
        }

        html[data-rivot-theme="light"] .rivotHeroImageDark {
          opacity: 0;
        }

        html[data-rivot-theme="light"] .rivotHeroImageLight {
          opacity: 1;
        }

        .rivotHeroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(1, 3, 5, .98) 0%, rgba(1, 3, 5, .86) 31%, rgba(1, 3, 5, .28) 54%, rgba(1, 3, 5, .16) 72%, rgba(1, 3, 5, .45) 100%),
            linear-gradient(180deg, rgba(1, 3, 5, .34) 0%, rgba(1, 3, 5, .04) 42%, rgba(1, 3, 5, .72) 100%);
        }

        html[data-rivot-theme="light"] .rivotHeroShade {
          background:
            linear-gradient(90deg, rgba(255,255,255,.98) 0%, rgba(255,255,255,.8) 32%, rgba(255,255,255,.16) 58%, rgba(255,255,255,.04) 100%),
            linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.02) 52%, rgba(255,255,255,.62) 100%);
        }

        html[data-rivot-theme="light"] .rivotHero,
        html[data-rivot-theme="light"] .rivotHeroTitle,
        html[data-rivot-theme="light"] .rivotHero h1,
        html[data-rivot-theme="light"] .rivotHero h2 {
          color: #111;
        }

        html[data-rivot-theme="light"] .rivotHeroCopy {
          color: rgba(17,17,17,.75);
        }

        html[data-rivot-theme="light"] .rivotHeroMarks span:last-child {
          background: rgba(17,17,17,.58);
        }

        html[data-rivot-theme="light"] .rivotSpecIcon {
          background: rgba(255,255,255,.62);
          color: #111;
          border-color: rgba(0,0,0,.1);
          box-shadow: 0 8px 22px rgba(0,0,0,.08);
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs div {
          border-left-color: rgba(0,0,0,.16);
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs b {
          color: #111;
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs small,
        html[data-rivot-theme="light"] .rivotHeroNotes {
          color: rgba(17,17,17,.72);
        }

        html[data-rivot-theme="light"] .rivotTestRide {
          color: #111;
          border-color: rgba(17,17,17,.28);
          background: rgba(255,255,255,.42);
        }

        .rivotHeroContent {
  position: relative;
  z-index: 1;
  width: min(42vw, 580px);
  margin-top: clamp(105px, 12vh, 125px);
  margin-left: clamp(32px, 6.5vw, 112px);
  text-align: left;
  text-shadow: none;
}

        .rivotEyebrow {
          margin: 0;
          color: #ef7430;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .rivotHero h1 {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2.4vw, 34px);
          margin: 14px 0 8px;
          color: #fff;
          font-size: clamp(52px, 8.1vw, 132px);
          font-weight: 800;
          line-height: .86;
          letter-spacing: -.055em;
          text-transform: uppercase;
        }

        .rivotHero h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 2vw, 34px);
          line-height: 1.12;
          letter-spacing: -.03em;
        }

        .rivotHeroCopy {
          max-width: 440px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, .76);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.45;
        }

        .rivotHeroSpecs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          max-width: 520px;
          margin-top: clamp(42px, 9vh, 92px);
          margin-bottom: 28px;
        }

        .rivotHeroSpecs div {
          min-width: 0;
          padding: 0 18px;
          border-left: 1px solid rgba(255, 255, 255, .14);
        }

        .rivotHeroSpecs div:first-child {
          padding-left: 0;
          border-left: 0;
        }

        .rivotSpecIcon {
  display: grid;
  width: 64px;
  height: 64px;
  margin-bottom: 12px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    0 8px 25px rgba(0, 0, 0, 0.18);
}

.rivotSpecIcon svg {
  width: 32px;
  height: 32px;
  display: block;
}

        .rivotHeroSpecs b,
        .rivotHeroSpecs small {
          display: block;
        }

        .rivotHeroSpecs b {
          color: #fff;
          font-size: 18px;
          line-height: 1.1;
        }

        .rivotHeroSpecs small {
          margin-top: 6px;
          color: rgba(255, 255, 255, .7);
          font-size: 14px;
        }

        .rivotHeroButtons {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 18px;
        }

        .rivotTestRide,
        .rivotPriceBook {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          min-width: 242px;
          min-height: 56px;
          padding: 0 34px;
          border: 1px solid rgba(255, 255, 255, .34);
          border-radius: 999px;
          font-size: 17px;
          font-weight: 700;
          box-shadow: none;
        }

        .rivotTestRide {
          background: transparent;
          color: #fff;
        }

        .rivotPriceBook {
          background: #ef7430;
          border-color: #ef7430;
          color: #fff;
        }

        .rivotPriceBook span,
        .rivotTestRide span {
          font-size: 28px;
          line-height: 1;
        }

        .rivotHeroNotes {
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
          margin-top: 16px;
          color: rgba(255, 255, 255, .72);
          font-size: 14px;
          font-weight: 700;
        }

        .rivotKeyFeatures {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: clamp(54px, 7vh, 74px) clamp(18px, 4vw, 46px);
          background:
            linear-gradient(180deg, #fff 0%, #fbfaf7 48%, #f7f7f5 100%);
          color: #111;
          overflow: hidden;
        }

        html[data-rivot-theme="light"] .rivotKeyFeatures {
          background:
            linear-gradient(180deg, #fff 0%, #fbfaf7 48%, #f7f7f5 100%);
        }

        .rivotKeyFeaturesShell {
          display: grid;
          grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
          gap: clamp(26px, 4vw, 54px);
          width: min(100%, 1180px);
          max-height: none;
          margin: 0 auto;
          padding: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          align-items: center;
        }

        html[data-rivot-theme="dark"] .rivotKeyFeaturesShell {
          background: transparent;
        }

        .rivotKeyFeaturesCopy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 0;
        }

        .rivotKeyEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 20px;
          color: #ff5b20;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .rivotKeyEyebrow span {
          display: inline-grid;
          width: 30px;
          height: 30px;
          place-items: center;
          flex: 0 0 auto;
          letter-spacing: 0;
        }

        .rivotKeyEyebrow svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .rivotKeyFeaturesCopy h2 {
          margin: 0;
          color: #111;
          font-size: clamp(28px, 2.8vw, 46px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .rivotKeyAccent {
          display: block;
          width: 48px;
          height: 3px;
          margin: 16px 0;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
          max-width: 255px;
          margin: 0 0 28px;
          color: #515151;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
        }

        .rivotKeyArrow {
          display: inline-grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border: 2px solid #ff6b28;
          border-radius: 50%;
          background: transparent;
          color: #ff6b28;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease, color .2s ease;
        }

        .rivotKeyArrow span {
          font-size: 28px;
          line-height: 1;
        }

        .rivotKeyArrow:hover {
          background: #ff6b28;
          color: #fff;
          transform: translateX(4px);
        }

        .rivotKeyCards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          min-width: 0;
          align-items: stretch;
        }

        .rivotKeyCard {
          position: relative;
          min-height: clamp(500px, 67vh, 600px);
          overflow: hidden;
          border-radius: 16px;
          isolation: isolate;
          transform: skewX(-10deg);
          transform-origin: center;
          box-shadow: 0 16px 36px rgba(0, 0, 0, .14);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .rivotKeyCard:hover {
          transform: skewX(-10deg) translateY(-5px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, .18);
        }

        .rivotKeyCardImage {
          object-fit: cover;
          object-position: center center;
          transform: skewX(10deg) scale(1.18);
          transition: transform .3s ease;
        }

        .rivotKeyCard:nth-child(1) .rivotKeyCardImage {
          object-position: 46% center;
          transform: skewX(10deg) scale(1.34);
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardImage {
          object-position: 52% center;
          transform: skewX(10deg) scale(1.33);
        }

        .rivotKeyCard:nth-child(3) .rivotKeyCardImage {
          object-position: 58% center;
          transform: skewX(10deg) scale(1.36);
        }

        .rivotKeyCard:hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.23);
        }

        .rivotKeyCard:nth-child(1):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.39);
        }

        .rivotKeyCard:nth-child(2):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.38);
        }

        .rivotKeyCard:nth-child(3):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.41);
        }

        .rivotKeyCardShade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.34) 34%, rgba(0,0,0,.12) 62%, rgba(0,0,0,.26) 100%);
        }

        .rivotKeyCardContent {
          position: absolute;
          top: 34px;
          left: 44px;
          right: 34px;
          bottom: 20px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          transform: skewX(10deg);
        }

        .rivotKeyCardHeading {
          min-width: 0;
        }

        .rivotKeyCardHeading > span {
          display: block;
          margin-bottom: 8px;
          color: #ff6b28;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        .rivotKeyCardHeading h3 {
          margin: 0 0 10px;
          color: #fff;
          font-size: clamp(16px, 1.25vw, 21px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.035em;
        }

        .rivotKeyCardPills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-left: 0;
        }

        .rivotKeyCardPills small {
          display: inline-flex;
          min-height: 24px;
          align-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, .28);
          color: #fff;
          padding: 0 11px;
          font-size: 10px;
          font-weight: 700;
          backdrop-filter: blur(10px);
        }

        .rivotDesign {
          position: relative;
          display: grid;
          min-height: 100vh;
          grid-template-rows: auto 1fr;
          align-items: center;
          justify-items: center;
          overflow: hidden;
          padding: clamp(42px, 5.2vh, 58px) 5% clamp(36px, 5vh, 52px);
          background: linear-gradient(180deg, #fbfbfb 0%, #f7f8f8 62%, #eaf5fc 100%);
          color: #050505;
          text-align: center;
        }

        html[data-rivot-theme="dark"] .rivotDesign {
          background: linear-gradient(180deg, #fafafa 0%, #f7f8f8 62%, #eaf5fc 100%);
          color: #050505;
        }

        .rivotDesignCopy {
          position: relative;
          z-index: 2;
        }

        .rivotDesignCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(44px, 4.2vw, 74px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.055em;
        }

        .rivotDesignCopy p {
          margin: 16px 0 0;
          color: #050505;
          font-size: clamp(17px, 1.35vw, 22px);
          font-weight: 700;
          line-height: 1.25;
        }

        .rivotDesignScooter {
          position: relative;
          z-index: 1;
          display: grid;
          width: min(100%, 940px);
          place-items: center;
          margin-top: clamp(14px, 2vh, 26px);
          margin-bottom: 0;
        }

        .rivotRotationStage {
          display: grid;
          width: 100%;
          place-items: center;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .rivotRotationStage:active {
          cursor: grabbing;
        }

        .rivotDesignScooter::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4%;
          width: min(58vw, 650px);
          height: 42px;
          border-radius: 50%;
          background: rgba(35, 45, 50, .13);
          filter: blur(16px);
          transform: translateX(-50%);
          z-index: -1;
        }

        .rivotDesignImage {
          display: block;
          width: min(68vw, 720px);
          height: auto;
          object-fit: contain;
        }

        .rivotDesignControls {
          position: absolute;
          right: clamp(28px, 5vw, 84px);
          bottom: clamp(34px, 5vh, 58px);
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .rivotColorPicker {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, .86);
          box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
          backdrop-filter: blur(16px);
        }

        .rivotColorPicker {
          position: relative;
          padding: 18px 18px 12px;
        }

        .rivotColorPicker p {
          position: absolute;
          left: 50%;
          top: -24px;
          margin: 0;
          color: #050505;
          font-size: 11px;
          font-weight: 700;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .rivotColorPicker div {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .rivotColorPicker button {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          box-shadow: inset 0 2px 5px rgba(255,255,255,.55), 0 4px 12px rgba(0,0,0,.2);
          cursor: pointer;
        }

        .rivotColorPicker button.active {
          outline: 3px solid rgba(239, 116, 48, .32);
          outline-offset: 3px;
        }

        .colorGrey {
          background: linear-gradient(135deg, #797c7d, #d8d9d8 45%, #515355);
        }

        .colorBlack {
          background: linear-gradient(135deg, #050505, #2b2c2d 48%, #050505);
        }

        .colorBlue {
          background: linear-gradient(135deg, #1c2c39, #526373 48%, #101922);
        }

        .colorWhite {
          background: linear-gradient(135deg, #f7f7f5, #d7d7d2 52%, #fff);
        }

        .colorGraphite {
          background: linear-gradient(135deg, #343434, #777 48%, #242424);
        }

        .rivotIntro {
          padding: 86px 7% 96px;
          background: #fbfbf8;
          color: #101211;
          text-align: center;
        }

        .rivotIntro .rivotEyebrow {
          color: #c85a22;
        }

        .rivotIntro h2 {
          max-width: 720px;
          margin: 18px auto 0;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1;
          letter-spacing: -.04em;
        }

        @media (max-width: 900px) {
          .rivotHero {
            height: calc(100vh - 64px);
            min-height: 0;
            margin-top: 64px;
            align-items: flex-start;
          }

          .rivotHeroImage {
            object-position: 64% bottom;
          }

          .rivotHeroContent {
            width: min(88vw, 560px);
            margin: 42px 0 0 6%;
          }

          .rivotHeroButtons {
            flex-wrap: wrap;
          }

          .rivotHero h1 {
            font-size: clamp(58px, 15vw, 96px);
            gap: 18px;
          }

          .rivotHero h2 {
            max-width: 460px;
          }

          .rivotHeroSpecs {
            max-width: 480px;
            margin-top: 34px;
          }

          .rivotTestRide,
          .rivotPriceBook {
            min-width: 210px;
            font-size: 16px;
          }

          .rivotKeyFeatures {
            min-height: auto;
            place-items: stretch;
          }

          .rivotKeyFeaturesShell {
            grid-template-columns: 1fr;
            max-height: none;
          }

          .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
            max-width: 460px;
          }

          .rivotDesign {
            min-height: 100vh;
            padding-block: 52px;
          }

          .rivotDesignImage {
            width: min(74vw, 680px);
          }

          .rivotDesignControls {
            right: 24px;
            bottom: 28px;
          }

        }

        @media (max-width: 560px) {
          .rivotHero {
            height: calc(100vh - 58px);
            min-height: 0;
            margin-top: 58px;
          }

          .rivotHeroImage {
            object-position: 74% bottom;
          }

          .rivotHeroContent {
            width: auto;
            margin: 28px 0 0;
            padding-inline: 16px;
          }

          .rivotEyebrow {
            font-size: 11px;
            letter-spacing: .42em;
          }

          .rivotHero h1 {
            font-size: clamp(42px, 15vw, 64px);
            line-height: .88;
            gap: 12px;
          }

          .rivotHero h2 {
            max-width: 330px;
            font-size: 15px;
            letter-spacing: .12em;
          }

          .rivotHeroCopy {
            font-size: 14px;
          }

          .rivotHeroMarks span {
            width: 14px;
            height: 38px;
          }

          .rivotHeroSpecs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 0;
            max-width: 340px;
            margin-top: 24px;
            margin-bottom: 18px;
          }

          .rivotHeroSpecs div {
            padding: 0 12px;
          }

          .rivotSpecIcon {
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
}

.rivotSpecIcon svg {
  width: 24px;
  height: 24px;
}

          .rivotHeroSpecs b {
            font-size: 16px;
          }

          .rivotHeroSpecs small {
            font-size: 12px;
          }

          .rivotHeroButtons {
            width: 100%;
            gap: 10px;
          }

          .rivotTestRide,
          .rivotPriceBook {
            width: 100%;
            min-width: 0;
            min-height: 46px;
            font-size: 15px;
          }

          .rivotHeroNotes {
            gap: 10px 18px;
            margin-top: 12px;
            font-size: 12px;
          }

          .rivotIntro {
            padding: 62px 5% 72px;
          }

          .rivotKeyFeatures {
            padding: 22px 12px;
          }

          .rivotKeyFeaturesShell {
            padding: 24px 18px;
            border-radius: 14px;
          }

          .rivotKeyEyebrow {
            margin-bottom: 18px;
            gap: 10px;
            font-size: 12px;
          }

          .rivotKeyEyebrow span {
            width: 24px;
            height: 24px;
          }

          .rivotKeyCards {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .rivotKeyCardContent {
            top: 24px;
            left: 20px;
            right: 18px;
            bottom: 20px;
          }

          .rivotKeyCard,
          .rivotKeyCard:hover {
            min-height: 320px;
            transform: none;
          }

          .rivotKeyCardImage,
          .rivotKeyCard:hover .rivotKeyCardImage {
            transform: scale(1.04);
          }

          .rivotKeyCardContent {
            transform: none;
          }

          .rivotDesign {
            min-height: 100vh;
            padding: 42px 16px 92px;
          }

          .rivotDesignCopy h2 {
            font-size: clamp(38px, 13vw, 54px);
          }

          .rivotDesignCopy p {
            margin-top: 12px;
            font-size: 16px;
          }

          .rivotDesignImage {
            width: 102vw;
            max-width: none;
          }

          .rivotDesignControls {
            right: 50%;
            bottom: 24px;
            transform: translateX(50%);
            gap: 12px;
          }

          .rivotColorPicker {
            padding: 15px 14px 10px;
          }

          .rivotColorPicker button {
            width: 28px;
            height: 28px;
          }

        }
      `}</style>
    </>
  );
}
