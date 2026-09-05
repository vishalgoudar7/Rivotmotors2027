import Image from "next/image";
import Link from "next/link";
import chargerImage from "@/asset/images/last/Charger.png";

export function ProductDetailSupportSections() {
  return (
    <>
      <section className="rivotReach" aria-label="RIVOT access network">
        <div className="rivotReachPanel">
          <article className="rivotReachCard rivotReachStore">
            <div className="rivotReachCopy">
              <span className="rivotReachIcon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path d="M9 17L12 8H28L31 17" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M11 17V32H29V17" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M16 32V23H24V32" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M7 17H33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <p>RIVOT Stores</p>
              <h2>
                Always
                <br />
                within reach.
              </h2>
              <small>Find your nearest RIVOT store and experience the NX100.</small>
              <Link href="/book-now" className="rivotReachArrow" aria-label="Find a RIVOT store">
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src="/images/last/Showroom.avif" alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
            </div>
          </article>

          <article className="rivotReachCard rivotReachCharge">
            <div className="rivotReachCopy">
              <span className="rivotReachIcon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path d="M13 6H25C27.21 6 29 7.79 29 10V34H13V6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M17 12H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M29 14H32C33.1 14 34 14.9 34 16V25C34 26.66 32.66 28 31 28H29" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M20 19L17 25H22L19 31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p>RIVOT Charging Network</p>
              <h2>
                Power,
                <br />
                everywhere.
              </h2>
              <small>India&apos;s most reliable EV charging network for every RIVOT ride.</small>
              <Link href="/products" className="rivotReachArrow" aria-label="Explore RIVOT charging network">
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src={chargerImage} alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
            </div>
          </article>
        </div>
      </section>

      <section className="rivotBestFit" aria-labelledby="best-fit-title">
        <div className="rivotBestFitShell">
          <div className="rivotBestFitHeader">
            <span aria-hidden="true">06</span>
            <p>Keep Riding</p>
            <h2 id="best-fit-title">Your Scooter. Our Support.</h2>
            <small>Essential products and plans to keep you moving, always.</small>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard">
              <span className="rivotBestFitShield rivotBestFitShieldBlue" aria-hidden="true">
                <svg viewBox="0 0 92 92" fill="none">
                  <path d="M46 5L76 17V39C76 61.5 63.35 76.35 46 86C28.65 76.35 16 61.5 16 39V17L46 5Z" fill="currentColor" opacity=".1" />
                  <path d="M46 18L66 26V41C66 56.1 57.8 66.4 46 73C34.2 66.4 26 56.1 26 41V26L46 18Z" fill="currentColor" opacity=".55" />
                  <path d="M31 46H36L39 36H53L56 46H61" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M36 46V53M56 46V53" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="40" cy="54" r="3" fill="#fff" />
                  <circle cx="52" cy="54" r="3" fill="#fff" />
                </svg>
              </span>
              <p className="rivotBestFitEyebrow rivotBestFitBlueText">Roadside Assistance</p>
              <h3>Available 24x7</h3>
              <p>Help is just a call away</p>

              <button className="rivotBestFitDisabled" type="button" disabled>Coming Soon</button>
            </article>

            <article className="rivotBestFitCard">
              <span className="rivotBestFitShield rivotBestFitShieldGreen" aria-hidden="true">
                <svg viewBox="0 0 92 92" fill="none">
                  <path d="M46 5L76 17V39C76 61.5 63.35 76.35 46 86C28.65 76.35 16 61.5 16 39V17L46 5Z" fill="currentColor" opacity=".12" />
                  <path d="M46 18L66 26V41C66 56.1 57.8 66.4 46 73C34.2 66.4 26 56.1 26 41V26L46 18Z" fill="currentColor" opacity=".68" />
                  <path d="M45 35L48 30L52 34L58 34L57 40L61 45L56 49L55 55L49 55L45 60L41 55L35 55L34 49L29 45L33 40L32 34L38 34L41 30L45 35Z" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
                  <path d="M40 45L44 49L51 41" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="rivotBestFitEyebrow rivotBestFitGreenText">Extended Warranty</p>
              <h3>Battery + Motor</h3>
              <p>Extended protection, zero worries.</p>

              <Link href="/products" className="rivotBestFitPill">
                Explore More
              </Link>
            </article>

            <article className="rivotBestFitCard rivotBestFitSubscription">
              <span className="rivotBestFitShield rivotBestFitShieldBlue" aria-hidden="true">
                <svg viewBox="0 0 92 92" fill="none">
                  <path d="M46 5L76 17V39C76 61.5 63.35 76.35 46 86C28.65 76.35 16 61.5 16 39V17L46 5Z" fill="currentColor" opacity=".1" />
                  <path d="M46 18L66 26V41C66 56.1 57.8 66.4 46 73C34.2 66.4 26 56.1 26 41V26L46 18Z" fill="currentColor" opacity=".62" />
                  <path d="M46 56L35.5 46.3C29.6 40.6 38 32.3 43.8 38L46 40.2L48.2 38C54 32.3 62.4 40.6 56.5 46.3L46 56Z" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M61 27V20M61 27H68" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
              <p className="rivotBestFitEyebrow rivotBestFitBlueText">Subscription</p>
              <h3>Simple SuperPack</h3>
              <p>Keeping your ride in peak condition.</p>

              <Link href="/products" className="rivotBestFitPill">
                Explore More
              </Link>
            </article>
          </div>
        </div>
      </section>

      <style>{`
        .rivotReach {
          padding: clamp(8px, 1.5vw, 18px) clamp(10px, 2vw, 22px) clamp(64px, 7vw, 92px);
          background: #fff;
          color: #111;
          overflow: hidden;
        }

        .rivotReachPanel {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          width: min(100%, 1360px);
          margin: 0 auto;
          border-radius: 16px;
          background: #fff;
          box-shadow:
            0 12px 34px rgba(17, 17, 17, .08),
            inset 0 0 0 1px rgba(17, 17, 17, .06);
        }

        .rivotReachCard {
          position: relative;
          display: grid;
          grid-template-columns: minmax(185px, .78fr) minmax(240px, 1.08fr);
          min-height: clamp(250px, 24vw, 330px);
          overflow: hidden;
          background: #fff;
        }

        .rivotReachStore {
          border-radius: 16px 0 0 16px;
        }

        .rivotReachCharge {
          border-left: 1px solid rgba(17, 17, 17, .06);
          border-radius: 0 16px 16px 0;
        }

        .rivotReachCard::before {
          content: "";
          position: absolute;
          left: -40px;
          bottom: -42px;
          width: 220px;
          height: 120px;
          opacity: .16;
          background-image: radial-gradient(rgba(239, 116, 48, .62) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .rivotReachCopy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(42px, 4.2vw, 62px) clamp(24px, 3.2vw, 46px) clamp(28px, 2.8vw, 40px);
        }

        .rivotReachIcon {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          margin-bottom: 16px;
          border: 1px solid rgba(239, 116, 48, .18);
          border-radius: 13px;
          color: #ef7430;
          background: #fff;
          box-shadow: 0 10px 24px rgba(239, 116, 48, .1);
        }

        .rivotReachIcon svg {
          width: 26px;
          height: 26px;
        }

        .rivotReachCopy > p {
          margin: 0 0 18px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 900;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .rivotReachCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(30px, 3vw, 46px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: -.055em;
        }

        .rivotReachCopy small {
          display: block;
          max-width: 255px;
          margin-top: 16px;
          color: #42464d;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
        }

        .rivotReachArrow {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          margin-top: 24px;
          border-radius: 50%;
          background: #ef7430;
          color: #fff;
          font-size: 23px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 12px 24px rgba(239, 116, 48, .24);
        }

        .rivotReachCharge .rivotReachCopy > p,
        .rivotReachCharge .rivotReachIcon,
        .rivotReachCharge .rivotReachArrow {
          color: #25a75d;
        }

        .rivotReachCharge .rivotReachIcon {
          border-color: rgba(37, 167, 93, .2);
          box-shadow: 0 10px 24px rgba(37, 167, 93, .1);
        }

        .rivotReachCharge .rivotReachArrow {
          background: #25a75d;
          color: #fff;
          box-shadow: 0 12px 24px rgba(37, 167, 93, .22);
        }

        .rivotReachMedia {
          position: relative;
          min-height: 100%;
          margin: 18px 18px 18px 0;
          border-radius: 0 14px 14px 0;
          clip-path: polygon(17% 0, 93% 0, 100% 7%, 100% 93%, 93% 100%, 17% 100%, 0 50%);
          background: #111;
        }

        .rivotReachMedia img {
          object-fit: cover;
          object-position: center;
        }

        .rivotReachCharge .rivotReachMedia {
          margin-right: 18px;
        }

        .rivotBestFit {
          position: relative;
          padding: clamp(54px, 6vw, 82px) clamp(16px, 4vw, 48px) clamp(54px, 6vw, 82px);
          background:
            radial-gradient(circle at 12% 8%, rgba(239, 116, 48, .12), transparent 28%),
            radial-gradient(circle at 88% 82%, rgba(239, 116, 48, .08), transparent 32%),
            linear-gradient(180deg, #fff 0%, #fbfaf8 54%, #f6f3ef 100%);
          color: #151515;
          overflow: hidden;
        }

        .rivotBestFit::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(132deg, transparent 0 58%, rgba(239, 116, 48, .08) 58.15% 58.35%, transparent 58.55%),
            repeating-linear-gradient(90deg, rgba(17, 17, 17, .025) 0 1px, transparent 1px 112px);
          pointer-events: none;
        }

        .rivotBestFitShell {
          position: relative;
          width: min(100%, 1160px);
          margin: 0 auto;
        }

        .rivotBestFitHeader {
          position: relative;
          text-align: center;
        }

        .rivotBestFitHeader > span {
          position: absolute;
          left: 0;
          top: -14px;
          color: rgba(239, 116, 48, .12);
          font-size: clamp(42px, 5vw, 66px);
          font-weight: 900;
          line-height: 1;
        }

        .rivotBestFitHeader > p {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          margin: 0 0 10px;
          color: #ef7430;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .24em;
          line-height: 1;
          text-transform: uppercase;
        }

        .rivotBestFitHeader > p::before,
        .rivotBestFitHeader > p::after {
          content: "";
          width: 20px;
          height: 2px;
          background: #ef7430;
        }

        .rivotBestFitHeader h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .rivotBestFitHeader small {
          display: block;
          margin: 8px 0 0;
          color: #606c74;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
        }

        .rivotBestFitGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 28px);
          margin-top: clamp(28px, 3.2vw, 42px);
          align-items: stretch;
        }

        .rivotBestFitCard {
          position: relative;
          display: grid;
          min-height: 330px;
          grid-template-rows: 130px auto auto 1fr auto;
          justify-items: center;
          align-items: start;
          padding: 34px 28px 32px;
          border: 1px solid rgba(17, 17, 17, .045);
          border-radius: 18px;
          background: rgba(255, 255, 255, .88);
          box-shadow: 0 18px 48px rgba(24, 28, 31, .06);
          text-align: center;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }

        .rivotBestFitCard::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 0%, rgba(239, 116, 48, .055), transparent 42%),
            linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(239, 116, 48, .018));
          pointer-events: none;
        }

        .rivotBestFitCard:hover {
          transform: translateY(-3px);
          border-color: rgba(239, 116, 48, .18);
          box-shadow: 0 24px 54px rgba(40, 27, 18, .12);
        }

        .rivotBestFitShield {
          position: relative;
          z-index: 1;
          display: grid;
          width: 108px;
          height: 108px;
          place-items: center;
          margin: 0 auto 14px;
          color: #5e86ff;
          filter: drop-shadow(0 18px 26px rgba(94, 134, 255, .18));
        }

        .rivotBestFitShield svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .rivotBestFitShieldGreen {
          color: #29d86f;
          filter: drop-shadow(0 18px 26px rgba(41, 216, 111, .18));
        }

        .rivotBestFitShieldBlue {
          color: #5e86ff;
        }

        .rivotBestFitCard h3 {
          position: relative;
          z-index: 1;
          margin: 14px 0 0;
          color: #10161a;
          font-size: 26px;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: 0;
        }

        .rivotBestFitCard > p {
          position: relative;
          z-index: 1;
          max-width: 260px;
          margin: 12px 0 0;
          color: #606c74;
          font-size: 14px;
          font-weight: 650;
          line-height: 1.35;
        }

        .rivotBestFitEyebrow {
          position: relative;
          z-index: 1;
          margin: 4px 0 0;
          color: #ef7430;
          font-size: 11px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .34em;
          text-transform: uppercase;
        }

        .rivotBestFitBlueText {
          color: #5e86ff;
        }

        .rivotBestFitGreenText {
          color: #16c766;
        }

        .rivotBestFitPill,
        .rivotBestFitDisabled {
          position: relative;
          z-index: 1;
          align-self: end;
          display: inline-flex;
          min-width: 140px;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          margin-top: 34px;
          border: 0;
          border-radius: 999px;
          background: #f2f2f2;
          color: #10161a;
          font: inherit;
          font-size: 14px;
          font-weight: 750;
          line-height: 1;
          box-shadow: inset 0 0 0 1px rgba(17, 17, 17, .02);
          transition: transform .2s ease, background .2s ease, color .2s ease;
        }

        .rivotBestFitDisabled {
          color: #aab0b4;
          cursor: not-allowed;
        }

        .rivotBestFitPill:hover,
        .rivotBestFitPill:focus-visible {
          background: #ef7430;
          color: #fff;
          outline: none;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .rivotReach {
            padding-bottom: 54px;
          }

          .rivotReachPanel {
            grid-template-columns: 1fr;
            gap: 14px;
            padding-top: 54px;
            border-radius: 16px;
            box-shadow: none;
          }

          .rivotReachCard {
            grid-template-columns: minmax(190px, .85fr) minmax(240px, 1.15fr);
            border-radius: 16px;
            box-shadow:
              0 14px 36px rgba(17, 17, 17, .08),
              inset 0 0 0 1px rgba(17, 17, 17, .05);
          }

          .rivotReachCharge {
            border-left: 0;
          }

          .rivotBestFit {
            padding: 48px 20px 54px;
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-inline: auto;
          }

          .rivotBestFitCard {
            min-height: 320px;
          }
        }

        @media (max-width: 560px) {
          .rivotReach {
            padding: 20px 12px 44px;
          }

          .rivotReachPanel {
            gap: 14px;
            padding-top: 50px;
          }

          .rivotReachCard {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotReachCopy {
            padding: 28px 22px 22px;
          }

          .rivotReachMedia {
            min-height: 240px;
            margin: 0;
            border-radius: 14px 14px 0 0;
            clip-path: none;
            order: -1;
          }

          .rivotBestFit {
            padding: 46px 12px;
          }

          .rivotBestFitHeader h2 {
            font-size: clamp(28px, 9vw, 36px);
          }

          .rivotBestFitGrid {
            gap: 14px;
            margin-top: 26px;
          }

          .rivotBestFitCard {
            min-height: 300px;
            padding: 28px 18px;
            border-radius: 16px;
          }

          .rivotBestFitShield {
            width: 96px;
            height: 96px;
          }

          .rivotBestFitCard h3 {
            font-size: 23px;
          }
        }
      `}</style>
    </>
  );
}
