import Image from "next/image";
import Link from "next/link";
import { ProductFeatureSections } from "@/components/ProductFeatureSections";
import { ProductHeroSpecs } from "@/components/ProductHeroSpecs";
import sportImage from "@/asset/Model/Sport_NX100.png";
import actionOne from "@/asset/rivot-website-main/Story_page/11.webp";
import actionTwo from "@/asset/rivot-website-main/Story_page/13.webp";
import actionThree from "@/asset/rivot-website-main/Story_page/15.webp";

const rideModes = [
  { title: "Launch", copy: "Sharp throttle response tuned for fast city gaps and confident starts." },
  { title: "Hold", copy: "Stable high-speed composure from the LiMFP pack and balanced chassis." },
  { title: "Recover", copy: "Regen braking and dual discs keep stopping controlled and predictable." },
];

export function SportModel() {
  return (
    <section className="sportPage">
      <section className="sportHero">
        <div className="sportCopy">
          <p>The Performance Electric</p>
          <h1>
            <span>NX100</span> <em>Sport</em>
          </h1>
          <h2>Power. Performance. Perfection.</h2>
          <span>The NX100 Sport is built for riders who want a sharper, faster, more expressive electric ride.</span>
          <div className="sportActions">
            <Link href="/book-now">Book Now <span aria-hidden="true">{"\u2192"}</span></Link>
            <Link href="/test-ride">Test Ride <span aria-hidden="true">{"\u2192"}</span></Link>
          </div>
          <div className="sportHeroColors" aria-label="Available colors">
            <span>Available Colors</span>
            <div>
              <i className="sportColor sportColorOrange" />
              <i className="sportColor sportColorWhite" />
              <i className="sportColorBlack sportColor" />
              <i className="sportColor sportColorRed" />
              <i className="sportColor sportColorGreen" />
            </div>
          </div>
        </div>

        <div className="sportMachine">
          <Image src={sportImage} alt="RIVOT NX100 Sports" priority sizes="(max-width: 900px) 95vw, 62vw" />
        </div>

        <ProductHeroSpecs />
      </section>

      <ProductFeatureSections />

      <section className="sportManifest">
        <p>SPORT SETUP</p>
        <h2>A sharper NX100 for riders who like every commute to feel awake.</h2>
      </section>

      <section className="sportModes">
        {rideModes.map((mode, index) => (
          <article key={mode.title}>
            <b>0{index + 1}</b>
            <h3>{mode.title}</h3>
            <p>{mode.copy}</p>
          </article>
        ))}
      </section>

      <section className="sportGallery" aria-label="NX100 Sports action gallery">
        <figure>
          <Image src={actionOne} alt="NX100 Sports performance detail" sizes="(max-width: 800px) 100vw, 36vw" />
        </figure>
        <figure>
          <Image src={actionTwo} alt="NX100 Sports charging detail" sizes="(max-width: 800px) 100vw, 28vw" />
        </figure>
        <figure>
          <Image src={actionThree} alt="NX100 Sports riding detail" sizes="(max-width: 800px) 100vw, 28vw" />
        </figure>
      </section>

      <section className="sportSpecStrip">
        <div>
          <span>Battery</span>
          <b>4.4 kWh LiMFP</b>
        </div>
        <div>
          <span>Charging</span>
          <b>4 hr home / 1.5 hr flash</b>
        </div>
        <div>
          <span>Control</span>
          <b>CBS + dual disc brakes</b>
        </div>
        <div>
          <span>Utility</span>
          <b>55 L boot, 162 mm clearance</b>
        </div>
      </section>

      <section className="sportFinal">
        <h2>Ready for the quicker line?</h2>
        <Link href="/book-now">Reserve Sports</Link>
      </section>

      <style>{`
        body:has(.sportPage) .rivotHeader,
        body:has(.sportPage) .rivotBrand,
        body:has(.sportPage) .rivotHeaderLinks a,
        body:has(.sportPage) .rivotProductsButton,
        body:has(.sportPage) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.sportPage) .rivotBrandMark img {
          filter: none;
        }

        body:has(.sportPage) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.sportPage) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .sportPage {
          --sport-accent: #ef7430;
          --sport-dark: #151515;
          --sport-ink: #090909;
          --sport-muted: #63707a;
          --sport-line: rgba(17, 17, 17, .1);
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .14), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: var(--sport-ink);
          overflow: hidden;
          font-family: inherit;
        }

        .sportHero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(330px, .72fr) minmax(420px, 1fr) minmax(132px, .24fr);
          gap: clamp(16px, 3vw, 56px);
          min-height: 100vh;
          align-items: center;
          padding: 92px clamp(28px, 4vw, 68px) 28px;
          background:
            radial-gradient(circle at 92% 16%, rgba(239, 116, 48, .1), transparent 28%),
            linear-gradient(135deg, #fff 0%, #f7f8f8 58%, #eef1f3 100%);
        }

        .sportHero::before {
          content: "";
          position: absolute;
          inset: 0 -8% 0 42%;
          background:
            linear-gradient(132deg, transparent 0 17%, rgba(255,255,255,.78) 17.2% 20%, transparent 20.2%),
            linear-gradient(132deg, transparent 0 43%, rgba(17,17,17,.07) 43.2% 43.6%, transparent 43.8%),
            linear-gradient(132deg, transparent 0 62%, rgba(239,116,48,.22) 62.1% 62.3%, transparent 62.5%);
          opacity: .95;
          pointer-events: none;
        }

        .sportCopy {
          position: relative;
          z-index: 4;
          max-width: 520px;
          padding-left: 0;
          border-left: 0;
        }

        .sportCopy > p,
        .sportManifest p {
          margin: 0 0 10px;
          color: var(--sport-accent);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .sportCopy h1 {
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 950;
          line-height: .96;
          letter-spacing: 0;
          text-transform: none;
          transform: none;
        }

        .sportCopy h1 em {
          color: var(--sport-accent);
          font-style: normal;
        }

        .sportCopy h2 {
          margin: clamp(12px, 1.3vw, 18px) 0 0;
          color: #0d0d0d;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: 0;
        }

        .sportCopy > span {
          display: block;
          max-width: 430px;
          margin-top: 10px;
          color: var(--sport-muted);
          font-size: 15px;
          font-weight: 650;
          line-height: 1.45;
        }

        .sportCopy > span::after {
          content: "";
          display: block;
          width: 58px;
          height: 3px;
          margin-top: 16px;
          background: var(--sport-accent);
        }

        .sportActions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: clamp(22px, 2.3vw, 32px);
        }

        .sportActions a,
        .sportFinal a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-width: 160px;
          min-height: 48px;
          padding: 0 22px;
          border: 1px solid var(--sport-accent);
          border-radius: 10px;
          background: var(--sport-accent);
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          text-transform: none;
        }

        .sportActions a:nth-child(2) {
          border-color: #0d0d0d;
          background: rgba(255,255,255,.55);
          color: #111;
        }

        .sportHeroColors {
          margin-top: clamp(18px, 2vw, 26px);
        }

        .sportHeroColors > span {
          display: block;
          margin-bottom: 8px;
          color: #606c74;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0;
        }

        .sportHeroColors > div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sportColor {
          display: block;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(0, 0, 0, .14);
          border-radius: 50%;
          box-shadow: 0 0 0 3px #fff, 0 6px 14px rgba(0, 0, 0, .12);
        }

        .sportColorOrange { background: #ef7430; }
        .sportColorWhite { background: #fff; }
        .sportColorBlack { background: #050505; }
        .sportColorRed { background: #cd2e30; }
        .sportColorGreen { background: #638860; }

        .sportMachine {
          position: relative;
          z-index: 2;
          display: grid;
          min-height: 500px;
          place-items: center;
        }

        .sportMachine img {
          position: relative;
          z-index: 3;
          width: min(116%, 720px);
          height: auto;
          transform: translateX(-.5vw);
          filter: drop-shadow(0 34px 34px rgba(17,17,17,.2));
        }

        .sportHero > .modelHeroSpecs {
          position: relative;
          z-index: 3;
          align-self: center;
          justify-self: end;
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
          width: min(158px, 100%);
          max-width: none;
          margin: 0;
        }

        .sportHero > .modelHeroSpecs div {
          grid-template-columns: 38px minmax(0, 1fr);
          column-gap: 12px;
          padding: 0;
          border-left: 0;
        }

        .sportHero > .modelHeroSpecs .rivotSpecIcon {
          width: 32px;
          height: 32px;
        }

        .sportHero > .modelHeroSpecs .rivotSpecIcon svg {
          width: 29px;
          height: 29px;
        }

        .sportHero > .modelHeroSpecs b {
          font-size: 16px;
          line-height: 1.02;
        }

        .sportHero > .modelHeroSpecs small {
          margin-top: 3px;
          font-size: 11px;
          line-height: 1.15;
        }

        .sportTelemetry {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(620px, 100%);
          margin-top: 34px;
        }

        .sportTelemetry article {
          min-width: 0;
          padding: 0 18px;
          border-left: 1px solid rgba(17, 17, 17, .12);
          text-align: center;
        }

        .sportTelemetry article:first-child {
          padding-left: 0;
          border-left: 0;
        }

        .sportTelemetry b {
          display: block;
          color: #070707;
          font-size: 18px;
          line-height: 1.05;
          white-space: nowrap;
        }

        .sportTelemetry small {
          margin-left: 4px;
          color: var(--sport-accent);
          font-size: inherit;
        }

        .sportTelemetry span {
          display: block;
          margin-top: 7px;
          color: var(--sport-muted);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .sportManifest {
          padding: clamp(54px, 7vw, 86px) clamp(22px, 7vw, 112px);
          background:
            radial-gradient(circle at 92% 12%, rgba(239, 116, 48, .1), transparent 25%),
            #fff;
        }

        .sportManifest h2 {
          max-width: 1120px;
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: 0;
          text-transform: none;
        }

        .sportModes {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: var(--sport-line);
          padding: clamp(22px, 4vw, 54px);
        }

        .sportModes article {
          min-height: 360px;
          padding: clamp(28px, 4vw, 54px);
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 16px 38px rgba(17, 17, 17, .06);
        }

        .sportModes b {
          color: var(--sport-accent);
          font-size: 13px;
          letter-spacing: .18em;
        }

        .sportModes h3 {
          margin: 70px 0 18px;
          color: #070707;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 950;
          line-height: .9;
          text-transform: none;
          transform: none;
        }

        .sportModes p {
          max-width: 360px;
          margin: 0;
          color: var(--sport-muted);
          font-size: 18px;
          line-height: 1.48;
        }

        .sportGallery {
          display: grid;
          grid-template-columns: 1.3fr .85fr .85fr;
          gap: 0;
          background: #f8f8f8;
          padding: 1px;
        }

        .sportGallery figure {
          min-height: 470px;
          margin: 0;
          overflow: hidden;
          border-radius: 8px;
          clip-path: none;
        }

        .sportGallery figure:first-child {
          clip-path: none;
        }

        .sportGallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.05) contrast(1.08);
        }

        .sportSpecStrip {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid var(--sport-line);
          border-bottom: 1px solid var(--sport-line);
          background: #fff;
        }

        .sportSpecStrip div {
          min-height: 172px;
          padding: 28px;
          border-right: 1px solid var(--sport-line);
        }

        .sportSpecStrip div:last-child {
          border-right: 0;
        }

        .sportSpecStrip span {
          color: var(--sport-accent);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .sportSpecStrip b {
          display: block;
          margin-top: 44px;
          color: #070707;
          font-size: clamp(18px, 1.8vw, 28px);
          line-height: 1.14;
        }

        .sportFinal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 26px;
          padding: clamp(64px, 8vw, 108px) clamp(22px, 7vw, 112px);
          background:
            radial-gradient(circle at 92% 10%, rgba(239, 116, 48, .18), transparent 28%),
            #080909;
        }

        .sportFinal h2 {
          max-width: 820px;
          margin: 0;
          color: #fff;
          font-size: clamp(42px, 6vw, 86px);
          font-weight: 950;
          line-height: .95;
          text-transform: uppercase;
        }

        @media (max-width: 980px) {
          .sportHero {
            grid-template-columns: 1fr;
            padding-top: 92px;
          }

          .sportMachine {
            min-height: 390px;
          }

          .sportHero > .modelHeroSpecs {
            justify-self: start;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px 0;
            width: min(520px, 100%);
            margin-top: 8px;
          }

          .sportTelemetry {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 0;
          }

          .sportModes,
          .sportGallery,
          .sportSpecStrip {
            grid-template-columns: 1fr;
          }

          .sportGallery figure,
          .sportGallery figure:first-child {
            min-height: 350px;
            clip-path: none;
          }

          .sportSpecStrip div {
            border-right: 0;
            border-bottom: 1px solid var(--sport-line);
          }

          .sportManifest h2 {
            font-size: 42px;
          }

          .sportFinal {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .sportCopy {
            padding-left: 0;
          }

          .sportTelemetry {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sportTelemetry b {
            font-size: 16px;
          }

          .sportTelemetry span {
            font-size: 12px;
          }

          .sportTelemetry article {
            transform: none;
          }

          .sportTelemetry article > * {
            transform: none;
          }

          .sportMachine img {
            width: 124%;
            transform: translateX(-5vw);
          }

          .sportHero {
            padding: 84px 18px 34px;
          }

          .sportCopy h1 {
            font-size: 42px;
          }

          .sportActions a {
            min-width: 0;
            width: 100%;
            min-height: 54px;
            font-size: 16px;
          }

          .sportHero > .modelHeroSpecs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
