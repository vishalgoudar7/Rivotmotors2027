import Image from "next/image";
import Link from "next/link";
import sportImage from "@/asset/Model/Sport_NX100.png";
import actionOne from "@/asset/rivot-website-main/Story_page/11.webp";
import actionTwo from "@/asset/rivot-website-main/Story_page/13.webp";
import actionThree from "@/asset/rivot-website-main/Story_page/15.webp";

const telemetry = [
  { value: "100", unit: "km/h", label: "Top Speed" },
  { value: "45.5", unit: "Nm", label: "Torque" },
  { value: "6", unit: "kW", label: "Motor" },
  { value: "200", unit: "km", label: "Range" },
];

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
          <p>RIVOT NX100</p>
          <h1>Sports</h1>
          <span>Performance-focused electric riding with long-range practicality.</span>
          <div className="sportActions">
            <Link href="/book-now">Book Now</Link>
            <Link href="/book-now">Test Ride</Link>
          </div>
        </div>

        <div className="sportMachine">
          <div className="speedLine speedLineOne" />
          <div className="speedLine speedLineTwo" />
          <Image src={sportImage} alt="RIVOT NX100 Sports" priority sizes="(max-width: 900px) 95vw, 62vw" />
        </div>

        <div className="sportTelemetry">
          {telemetry.map((item) => (
            <article key={item.label}>
              <b>
                {item.value}
                <small>{item.unit}</small>
              </b>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

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
          font-family: Montserrat, sans-serif;
        }

        .sportHero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(320px, .72fr) minmax(440px, 1.28fr);
          min-height: 100vh;
          align-items: center;
          padding: 128px clamp(22px, 5vw, 76px) 42px;
          background:
            radial-gradient(circle at 76% 42%, rgba(239, 116, 48, .16), transparent 36%),
            linear-gradient(120deg, #fff 0%, #f7f7f5 58%, #f4e5dd 100%);
        }

        .sportHero::before {
          content: "NX100";
          position: absolute;
          right: -2vw;
          top: 13vh;
          color: rgba(17,17,17,.04);
          font-size: clamp(120px, 22vw, 330px);
          font-weight: 900;
          line-height: .8;
          letter-spacing: .02em;
        }

        .sportCopy {
          position: relative;
          z-index: 4;
          padding-left: 22px;
          border-left: 4px solid var(--sport-accent);
        }

        .sportCopy > p,
        .sportManifest p {
          margin: 0 0 16px;
          color: var(--sport-accent);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .26em;
          text-transform: uppercase;
        }

        .sportCopy h1 {
          margin: 0;
          color: #070707;
          font-size: clamp(62px, 9vw, 132px);
          font-weight: 950;
          line-height: .82;
          letter-spacing: .04em;
          text-transform: uppercase;
          transform: none;
        }

        .sportCopy > span {
          display: block;
          max-width: 480px;
          margin-top: 30px;
          color: var(--sport-muted);
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 700;
          line-height: 1.38;
        }

        .sportActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 38px;
        }

        .sportActions a,
        .sportFinal a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 24px;
          border: 1px solid var(--sport-accent);
          border-radius: 999px;
          background: var(--sport-accent);
          color: #fff;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sportActions a:nth-child(2) {
          border-color: var(--sport-accent);
          background: transparent;
          color: var(--sport-accent);
        }

        .sportMachine {
          position: relative;
          z-index: 2;
          display: grid;
          min-height: 620px;
          place-items: center;
        }

        .sportMachine::before {
          content: "";
          position: absolute;
          width: min(82%, 740px);
          height: 48%;
          border: 1px solid rgba(17,17,17,.08);
          border-radius: 8px;
          transform: skewX(-10deg) rotate(-2deg);
          background: rgba(255, 255, 255, .36);
          box-shadow: 0 24px 60px rgba(17,17,17,.08);
        }

        .sportMachine img {
          position: relative;
          z-index: 3;
          width: min(112%, 940px);
          height: auto;
          transform: translateX(-1vw) rotate(-1.4deg);
          filter: drop-shadow(0 34px 34px rgba(17,17,17,.22));
        }

        .speedLine {
          position: absolute;
          z-index: 1;
          height: 5px;
          background: linear-gradient(90deg, transparent, var(--sport-accent), rgba(17,17,17,.18), transparent);
          transform: skewX(-22deg);
        }

        .speedLineOne {
          top: 34%;
          left: 3%;
          width: 76%;
        }

        .speedLineTwo {
          bottom: 30%;
          right: 2%;
          width: 52%;
          opacity: .62;
        }

        .sportTelemetry {
          position: absolute;
          left: clamp(22px, 5vw, 76px);
          right: clamp(22px, 5vw, 76px);
          bottom: 26px;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          background: var(--sport-line);
          border: 1px solid var(--sport-line);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 18px 42px rgba(17, 17, 17, .08);
        }

        .sportTelemetry article {
          min-height: 118px;
          padding: 20px;
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(14px);
        }

        .sportTelemetry b {
          display: block;
          color: #070707;
          font-size: clamp(34px, 4vw, 60px);
          line-height: .9;
        }

        .sportTelemetry small {
          margin-left: 5px;
          color: var(--sport-accent);
          font-size: 16px;
        }

        .sportTelemetry span {
          display: block;
          margin-top: 12px;
          color: var(--sport-muted);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .sportManifest {
          padding: clamp(76px, 9vw, 126px) clamp(22px, 7vw, 112px);
          background:
            radial-gradient(circle at 92% 12%, rgba(239, 116, 48, .1), transparent 25%),
            #fff;
        }

        .sportManifest h2 {
          max-width: 1120px;
          margin: 0;
          color: #070707;
          font-size: clamp(42px, 6vw, 88px);
          font-weight: 900;
          line-height: .96;
          letter-spacing: .01em;
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
            padding-top: 104px;
          }

          .sportMachine {
            min-height: 440px;
          }

          .sportTelemetry {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 22px;
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

          .sportFinal {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .sportCopy {
            padding-left: 16px;
          }

          .sportTelemetry {
            grid-template-columns: 1fr;
          }

          .sportTelemetry article {
            transform: none;
          }

          .sportTelemetry article > * {
            transform: none;
          }

          .sportMachine img {
            width: 124%;
            transform: translateX(-5vw) rotate(-1.4deg);
          }
        }
      `}</style>
    </section>
  );
}
