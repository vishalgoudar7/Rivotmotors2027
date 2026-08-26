import Image from "next/image";
import Link from "next/link";
import proImage from "@/asset/Model/Pro.png";
import detailImage from "@/asset/images/Details/Main detail photo.png";
import bootImage from "@/asset/images/Details/Boot space with helmet.png";
import floorImage from "@/asset/images/Details/Floorboard photo.png";

const heroStats = [
  { value: "200 km", label: "Real range" },
  { value: "4.4 kWh", label: "LiMFP battery" },
  { value: "55 L", label: "Boot space" },
];

const comfortSpecs = [
  ["Charge", "4 hr home charge, 1.5 hr FlashCharge ready"],
  ["Ride", "Progressive rear monoshock with telescopic front suspension"],
  ["Safety", "CBS, dual disc brakes, IP67 motor and controller"],
  ["Utility", "Front charge port, 50 cm water wading, 162 mm clearance"],
];

export function ProModel() {
  return (
    <section className="proPage">
      <div className="proHero">
        <div className="proHeroCopy">
          <p className="proKicker">RIVOT NX100</p>
          <h1>Pro</h1>
          <p className="proIntro">
            The long-range RIVOT for riders who want calm power, everyday space, and premium confidence in one electric scooter.
          </p>
          <div className="proActions">
            <Link href="/book-now">Book Now</Link>
            <Link href="/book-now">Test Ride</Link>
          </div>
        </div>

        <div className="proStage" aria-label="RIVOT NX100 Pro">
          <div className="proHalo" />
          <Image src={proImage} alt="RIVOT NX100 Pro" priority sizes="(max-width: 900px) 92vw, 58vw" />
        </div>

        <div className="proStats" aria-label="NX100 Pro highlights">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="proExecutive">
        <div>
          <p className="proKicker">Designed For Distance</p>
          <h2>Refined performance for the everyday long ride.</h2>
        </div>
        <p>
          NX100 Pro focuses on useful upgrades: extended range, stable battery chemistry, larger storage, and a ride posture built for repeated commutes.
        </p>
      </section>

      <section className="proGallery" aria-label="NX100 Pro details">
        <figure>
          <Image src={detailImage} alt="NX100 Pro detail view" sizes="(max-width: 800px) 100vw, 38vw" />
          <figcaption>Premium finish and integrated bodywork</figcaption>
        </figure>
        <figure>
          <Image src={bootImage} alt="NX100 Pro boot space" sizes="(max-width: 800px) 100vw, 30vw" />
          <figcaption>55 L storage for daily essentials</figcaption>
        </figure>
        <figure>
          <Image src={floorImage} alt="NX100 Pro floorboard" sizes="(max-width: 800px) 100vw, 30vw" />
          <figcaption>Comfortable floorboard and riding posture</figcaption>
        </figure>
      </section>

      <section className="proSpecs">
        <div className="proSpecsHead">
          <p className="proKicker">Specification Suite</p>
          <h2>Built around comfort, range, and control.</h2>
        </div>
        <div className="proSpecGrid">
          {comfortSpecs.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proFinal">
        <div>
          <p className="proKicker">NX100 Pro</p>
          <h2>Premium utility without excess noise.</h2>
        </div>
        <Link href="/book-now">Reserve Pro</Link>
      </section>

      <style>{`
        body:has(.proPage) .rivotHeader,
        body:has(.proPage) .rivotBrand,
        body:has(.proPage) .rivotHeaderLinks a,
        body:has(.proPage) .rivotProductsButton,
        body:has(.proPage) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.proPage) .rivotBrandMark img {
          filter: none;
        }

        body:has(.proPage) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.proPage) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .proPage {
          --pro-paper: #f6f5f1;
          --pro-ink: #151513;
          --pro-muted: #63625d;
          --pro-copper: #ef7430;
          --pro-line: rgba(21, 21, 19, .12);
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .14), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: var(--pro-ink);
          font-family: Montserrat, sans-serif;
        }

        .proHero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(320px, .86fr) minmax(420px, 1.14fr);
          align-items: center;
          min-height: 100vh;
          padding: 128px clamp(22px, 5vw, 72px) 56px;
          overflow: hidden;
          background:
            radial-gradient(circle at 76% 42%, rgba(239, 116, 48, .14), transparent 36%),
            linear-gradient(120deg, #fff 0%, #f7f7f5 58%, #f4e5dd 100%);
        }

        .proHero::before {
          content: "";
          position: absolute;
          inset: 92px clamp(18px, 4vw, 58px) 34px;
          border: 1px solid var(--pro-line);
          border-radius: 8px;
          pointer-events: none;
        }

        .proHeroCopy {
          position: relative;
          z-index: 2;
          max-width: 560px;
        }

        .proKicker {
          margin: 0 0 18px;
          color: var(--pro-copper);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .proHero h1 {
          margin: 0;
          color: var(--pro-ink);
          font-size: clamp(72px, 10vw, 142px);
          font-weight: 950;
          line-height: .88;
          letter-spacing: 0;
        }

        .proIntro {
          max-width: 500px;
          margin: 34px 0 0;
          color: var(--pro-muted);
          font-size: clamp(18px, 1.7vw, 25px);
          font-weight: 700;
          line-height: 1.42;
        }

        .proActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 38px;
        }

        .proActions a,
        .proFinal a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 24px;
          border: 1px solid var(--pro-copper);
          border-radius: 999px;
          background: var(--pro-copper);
          color: #fff;
          font-weight: 800;
        }

        .proActions a:nth-child(2) {
          background: transparent;
          color: var(--pro-copper);
        }

        .proStage {
          position: relative;
          z-index: 1;
          display: grid;
          min-height: 620px;
          place-items: center;
        }

        .proHalo {
          position: absolute;
          width: min(72%, 620px);
          aspect-ratio: 1;
          border: 1px solid rgba(17,17,17,.08);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.88), rgba(255,255,255,0) 64%);
        }

        .proStage img {
          position: relative;
          z-index: 1;
          width: min(105%, 860px);
          height: auto;
          filter: drop-shadow(0 34px 34px rgba(38, 36, 32, .22));
        }

        .proStats {
          position: absolute;
          left: clamp(22px, 5vw, 72px);
          right: clamp(22px, 5vw, 72px);
          bottom: 28px;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--pro-line);
          border-bottom: 1px solid var(--pro-line);
          background: rgba(246,245,241,.74);
          backdrop-filter: blur(14px);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 18px 42px rgba(17, 17, 17, .08);
        }

        .proStats div {
          padding: 22px 24px;
          border-right: 1px solid var(--pro-line);
        }

        .proStats div:last-child {
          border-right: 0;
        }

        .proStats b {
          display: block;
          color: var(--pro-ink);
          font-size: clamp(28px, 3vw, 46px);
          line-height: 1;
        }

        .proStats span {
          display: block;
          margin-top: 8px;
          color: var(--pro-muted);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .proExecutive {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(280px, .55fr);
          gap: clamp(28px, 8vw, 120px);
          padding: clamp(78px, 10vw, 132px) clamp(22px, 7vw, 110px);
          border-top: 1px solid var(--pro-line);
          border-bottom: 1px solid var(--pro-line);
          background: #fff;
        }

        .proExecutive h2,
        .proSpecs h2,
        .proFinal h2 {
          margin: 0;
          font-size: clamp(40px, 5vw, 74px);
          font-weight: 950;
          line-height: 1.02;
          letter-spacing: 0;
        }

        .proExecutive > p {
          align-self: end;
          margin: 0;
          color: var(--pro-muted);
          font-size: clamp(18px, 1.65vw, 24px);
          font-weight: 700;
          line-height: 1.55;
        }

        .proGallery {
          display: grid;
          grid-template-columns: 1.2fr .9fr .9fr;
          gap: 1px;
          background: var(--pro-line);
        }

        .proGallery figure {
          position: relative;
          min-height: 440px;
          margin: 0;
          overflow: hidden;
          background: #111;
        }

        .proGallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
        }

        .proGallery figure:hover img {
          transform: scale(1.035);
        }

        .proGallery figcaption {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 22px;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          text-shadow: 0 2px 18px rgba(0,0,0,.55);
        }

        .proSpecs {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: clamp(30px, 6vw, 90px);
          padding: clamp(76px, 9vw, 128px) clamp(22px, 7vw, 110px);
          background: #f8f8f8;
        }

        .proSpecGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .proSpecGrid article {
          min-height: 180px;
          padding: 26px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 16px 38px rgba(17, 17, 17, .06);
        }

        .proSpecGrid span {
          color: var(--pro-copper);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .proSpecGrid p {
          margin: 42px 0 0;
          color: var(--pro-ink);
          font-size: clamp(19px, 1.5vw, 24px);
          font-weight: 750;
          line-height: 1.32;
        }

        .proFinal {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          padding: clamp(68px, 8vw, 112px) clamp(22px, 7vw, 110px);
          background:
            radial-gradient(circle at 92% 10%, rgba(239, 116, 48, .18), transparent 28%),
            #080909;
          color: #fff;
        }

        .proFinal h2 {
          color: #fff;
        }

        @media (max-width: 900px) {
          .proHero {
            grid-template-columns: 1fr;
            padding-top: 104px;
          }

          .proStage {
            min-height: 430px;
          }

          .proStats,
          .proExecutive,
          .proSpecs {
            position: relative;
            grid-template-columns: 1fr;
          }

          .proStats {
            left: auto;
            right: auto;
            bottom: auto;
            margin-top: 24px;
          }

          .proGallery {
            grid-template-columns: 1fr;
          }

          .proGallery figure {
            min-height: 340px;
          }

          .proSpecGrid {
            grid-template-columns: 1fr;
          }

          .proFinal {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .proHero::before {
            display: none;
          }

          .proStats {
            grid-template-columns: 1fr;
          }

          .proStats div {
            border-right: 0;
            border-bottom: 1px solid var(--pro-line);
          }

          .proStats div:last-child {
            border-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
