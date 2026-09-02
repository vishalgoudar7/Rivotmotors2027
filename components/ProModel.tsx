import Image from "next/image";
import Link from "next/link";
import { ProductFeatureSections } from "@/components/ProductFeatureSections";
import { ProductHeroSpecs } from "@/components/ProductHeroSpecs";
import proImage from "@/asset/Model/Pro.png";
import detailImage from "@/asset/images/Details/Main detail photo.png";
import bootImage from "@/asset/images/Details/Boot space with helmet.png";
import floorImage from "@/asset/images/Details/Floorboard photo.png";

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
          <nav className="proBreadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products">Products</Link>
            <span aria-hidden="true">/</span>
            <span>NX100 Pro</span>
          </nav>
          <p className="proKicker">The Performance Electric</p>
          <h1>
            <span>NX100</span> <em>Pro</em>
          </h1>
          <h2>Power. Performance. Perfection.</h2>
          <p className="proIntro">
            The NX100 Pro is built for riders who demand more. More range, more speed, and more control.
          </p>
          <div className="proActions">
            <Link href="/book-now">Book Now <span aria-hidden="true">{"\u2192"}</span></Link>
            <Link href="/test-ride">Test Ride <span aria-hidden="true">{"\u2192"}</span></Link>
          </div>
          <div className="proHeroColors" aria-label="Available colors">
            <span>Available Colors</span>
            <div>
              <button className="proColor proColorOrange isSelected" type="button" aria-label="Select orange color" aria-pressed="true" />
              <button className="proColor proColorWhite" type="button" aria-label="Select white color" aria-pressed="false" />
              <button className="proColor proColorBlack" type="button" aria-label="Select black color" aria-pressed="false" />
              <button className="proColor proColorRed" type="button" aria-label="Select red color" aria-pressed="false" />
              <button className="proColor proColorGreen" type="button" aria-label="Select green color" aria-pressed="false" />
            </div>
          </div>
        </div>

        <div className="proStage" aria-label="RIVOT NX100 Pro">
          <div className="proHalo" />
          <Image src={proImage} alt="RIVOT NX100 Pro" priority sizes="(max-width: 900px) 92vw, 58vw" />
        </div>

        <ProductHeroSpecs />
      </div>

      <ProductFeatureSections />

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
          font-family: inherit;
        }

        .proHero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(320px, .7fr) minmax(440px, 1.1fr) minmax(178px, .28fr);
          gap: clamp(18px, 2.6vw, 46px);
          align-items: center;
          min-height: 100vh;
          padding: 104px clamp(30px, 4.2vw, 74px) 30px;
          overflow: hidden;
          background:
            radial-gradient(circle at 86% 21%, rgba(239, 116, 48, .09), transparent 30%),
            radial-gradient(circle at 66% 74%, rgba(70, 88, 102, .07), transparent 36%),
            linear-gradient(135deg, #fff 0%, #f7f8f8 58%, #eef1f3 100%);
        }

        .proHero::before {
          content: "";
          position: absolute;
          inset: 0 -8% 0 42%;
          background:
            linear-gradient(132deg, transparent 0 17%, rgba(255,255,255,.52) 17.2% 20%, transparent 20.2%),
            linear-gradient(132deg, transparent 0 43%, rgba(17,17,17,.035) 43.2% 43.55%, transparent 43.8%),
            linear-gradient(132deg, transparent 0 62%, rgba(239,116,48,.12) 62.1% 62.25%, transparent 62.5%);
          opacity: .6;
          pointer-events: none;
        }

        .proHeroCopy {
          position: relative;
          z-index: 2;
          max-width: 520px;
        }

        .proBreadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin: 0 0 22px;
          color: rgba(17, 17, 17, .48);
          font-size: 12px;
          font-weight: 750;
          line-height: 1.2;
        }

        .proBreadcrumb a {
          color: inherit;
          transition: color .2s ease;
        }

        .proBreadcrumb a:hover,
        .proBreadcrumb a:focus-visible {
          color: var(--pro-copper);
          outline: none;
        }

        .proKicker {
          margin: 0 0 10px;
          color: var(--pro-copper);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .proHero h1 {
          margin: 0;
          color: var(--pro-ink);
          font-size: 48px;
          font-weight: 950;
          line-height: .96;
          letter-spacing: 0;
        }

        .proHero h1 em {
          color: var(--pro-copper);
          font-style: normal;
        }

        .proHero h2 {
          margin: clamp(12px, 1.3vw, 18px) 0 0;
          color: #0d0d0d;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: 0;
        }

        .proIntro {
          max-width: 430px;
          margin: 10px 0 0;
          color: var(--pro-muted);
          font-size: 15px;
          font-weight: 650;
          line-height: 1.45;
        }

        .proIntro::after {
          content: "";
          display: block;
          width: 58px;
          height: 3px;
          margin-top: 16px;
          background: var(--pro-copper);
        }

        .proActions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: clamp(22px, 2.3vw, 32px);
        }

        .proActions a,
        .proFinal a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-width: 160px;
          min-height: 48px;
          padding: 0 22px;
          border: 1px solid var(--pro-copper);
          border-radius: 10px;
          background: var(--pro-copper);
          color: #fff;
          font-size: 15px;
          font-weight: 850;
        }

        .proActions a:nth-child(2) {
          border-color: #0d0d0d;
          background: rgba(255,255,255,.55);
          color: #111;
        }

        .proActions a {
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease;
        }

        .proActions a:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(239, 116, 48, .22);
        }

        .proActions a:nth-child(2):hover {
          border-color: var(--pro-copper);
          box-shadow: 0 14px 26px rgba(17, 17, 17, .08);
        }

        .proActions a:focus-visible {
          outline: 3px solid rgba(239, 116, 48, .28);
          outline-offset: 4px;
        }

        .proHeroColors {
          margin-top: clamp(18px, 2vw, 26px);
        }

        .proHeroColors > span {
          display: block;
          margin-bottom: 8px;
          color: #606c74;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0;
        }

        .proHeroColors > div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .proColor {
          display: block;
          width: 22px;
          height: 22px;
          padding: 0;
          border: 1px solid rgba(0, 0, 0, .14);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 3px #fff, 0 6px 14px rgba(0, 0, 0, .12);
          transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
        }

        .proColor.isSelected {
          border-color: var(--pro-copper);
          box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(239, 116, 48, .34), 0 8px 18px rgba(239, 116, 48, .18);
        }

        .proColor:hover {
          transform: translateY(-1px);
        }

        .proColor:focus-visible {
          outline: 3px solid rgba(239, 116, 48, .26);
          outline-offset: 5px;
        }

        .proColorOrange { background: #ef7430; }
        .proColorWhite { background: #fff; }
        .proColorBlack { background: #050505; }
        .proColorRed { background: #cd2e30; }
        .proColorGreen { background: #638860; }

        .proStage {
          position: relative;
          z-index: 1;
          display: grid;
          min-height: 520px;
          place-items: center;
          min-width: 0;
        }

        .proHalo {
          position: absolute;
          width: min(82%, 630px);
          aspect-ratio: 1;
          border: 1px solid rgba(17,17,17,.045);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.74), rgba(255,255,255,0) 66%);
        }

        .proStage img {
          position: relative;
          z-index: 1;
          width: min(126%, 820px);
          height: auto;
          transform: translateX(2vw);
          filter: drop-shadow(0 34px 36px rgba(38, 36, 32, .2));
          animation: proScooterIn .65s ease both;
        }

        .proHero > .modelHeroSpecs {
          position: relative;
          z-index: 3;
          align-self: center;
          justify-self: end;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          width: min(210px, 100%);
          max-width: none;
          margin: 0;
          padding: 18px 16px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 18px;
          background: rgba(255, 255, 255, .72);
          box-shadow: 0 24px 54px rgba(30, 32, 34, .12);
          backdrop-filter: blur(14px);
          animation: proSpecsIn .65s ease .12s both;
        }

        .proHero > .modelHeroSpecs div {
          grid-template-columns: 40px minmax(0, 1fr);
          column-gap: 12px;
          padding: 14px 0;
          border-left: 0;
          border-top: 1px solid rgba(17, 17, 17, .07);
        }

        .proHero > .modelHeroSpecs div:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .proHero > .modelHeroSpecs div:last-child {
          padding-bottom: 0;
        }

        .proHero > .modelHeroSpecs .rivotSpecIcon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(239, 116, 48, .08);
        }

        .proHero > .modelHeroSpecs .rivotSpecIcon svg {
          width: 26px;
          height: 26px;
        }

        .proHero > .modelHeroSpecs b {
          font-size: 18px;
          line-height: 1.02;
        }

        .proHero > .modelHeroSpecs small {
          margin-top: 3px;
          font-size: 11px;
          line-height: 1.15;
        }

        @keyframes proScooterIn {
          from {
            opacity: 0;
            transform: translate(3.5vw, 14px);
          }
          to {
            opacity: 1;
            transform: translateX(2vw);
          }
        }

        @keyframes proSpecsIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .proStats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(620px, 100%);
          margin-top: 34px;
        }

        .proStats div {
          min-width: 0;
          padding: 0 18px;
          border-left: 1px solid var(--pro-line);
          text-align: center;
        }

        .proStats div:first-child {
          padding-left: 0;
          border-left: 0;
        }

        .proStats b {
          display: block;
          color: var(--pro-ink);
          font-size: 18px;
          line-height: 1.05;
          white-space: nowrap;
        }

        .proStats small {
          margin-left: 4px;
          color: var(--pro-copper);
          font-size: inherit;
        }

        .proStats span {
          display: block;
          margin-top: 7px;
          color: var(--pro-muted);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .proExecutive {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(280px, .55fr);
          gap: clamp(28px, 6vw, 86px);
          padding: clamp(54px, 7vw, 86px) clamp(22px, 7vw, 110px);
          border-top: 1px solid var(--pro-line);
          border-bottom: 1px solid var(--pro-line);
          background: #fff;
        }

        .proSpecs h2,
        .proFinal h2 {
          margin: 0;
          font-size: clamp(40px, 5vw, 74px);
          font-weight: 950;
          line-height: 1.02;
          letter-spacing: 0;
        }

        .proExecutive h2 {
          margin: 0;
          color: var(--pro-ink);
          font-size: 48px;
          font-weight: 950;
          line-height: 1.06;
          letter-spacing: 0;
        }

        .proExecutive > p {
          align-self: end;
          margin: 0;
          color: var(--pro-muted);
          font-size: 15px;
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
            padding-top: 98px;
          }

          .proStage {
            min-height: 420px;
          }

          .proStage img {
            width: min(112%, 660px);
            transform: translateX(0);
          }

          .proHero > .modelHeroSpecs {
            justify-self: start;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0 18px;
            width: min(620px, 100%);
            margin-top: 8px;
          }

          .proHero > .modelHeroSpecs div:nth-child(2) {
            padding-top: 0;
            border-top: 0;
          }

          .proStats,
          .proExecutive,
          .proSpecs {
            position: relative;
            grid-template-columns: 1fr;
          }

          .proExecutive h2 {
            font-size: 42px;
          }

          .proStats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 0;
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
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .proStats div {
            border-left: 1px solid var(--pro-line);
          }

          .proStats b {
            font-size: 16px;
          }

          .proStats span {
            font-size: 12px;
          }

          .proHero {
            padding: 90px 18px 34px;
          }

          .proHero h1 {
            font-size: 42px;
          }

          .proActions a {
            min-width: 0;
            width: 100%;
            min-height: 54px;
            font-size: 16px;
          }

          .proHero > .modelHeroSpecs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding: 16px 14px;
            border-radius: 16px;
          }

          .proHero > .modelHeroSpecs div {
            grid-template-columns: 34px minmax(0, 1fr);
            column-gap: 9px;
          }

          .proHero > .modelHeroSpecs b {
            font-size: 16px;
          }

          .proHero > .modelHeroSpecs small {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .proStage img,
          .proHero > .modelHeroSpecs,
          .proActions a,
          .proColor {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
