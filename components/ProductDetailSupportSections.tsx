import Image from "next/image";
import Link from "next/link";
import chargerImage from "@/asset/images/last/Charger.png";
import catalogImage from "@/asset/connect/Catelog.png";

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
            <h2 id="best-fit-title">A best fit for your Scooter</h2>
            <p>There&apos;s more under the hood.</p>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard rivotBestFitAccessories">
              <Image
                src={catalogImage}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                className="rivotBestFitAccessoriesBg"
              />
              <p className="rivotBestFitEyebrow">Shop</p>
              <h3>Accessories</h3>
              <p>There&apos;s more under the hood.</p>

              <Link href="/merchandise" className="rivotBestFitCta">
                Shop accessories <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </article>

            <article className="rivotBestFitCard">
              <p className="rivotBestFitEyebrow rivotBestFitGreen">Extended Warranty</p>
              <h3>Battery+Motor</h3>

              <span className="rivotBestFitShield rivotBestFitShieldGreen" aria-hidden="true">
                <svg viewBox="0 0 72 72" fill="none">
                  <path d="M36 7L62 17V34C62 51.4 51.42 62.72 36 68C20.58 62.72 10 51.4 10 34V17L36 7Z" fill="currentColor" opacity=".16" />
                  <path d="M36 16L53 22.4V34.8C53 47.02 46.28 55.4 36 60C25.72 55.4 19 47.02 19 34.8V22.4L36 16Z" fill="currentColor" />
                  <path d="M31.4 40.3L27 35.9L23.5 39.4L31.4 47.3L48.8 29.9L45.3 26.4L31.4 40.3Z" fill="#fff" />
                  <path d="M48 18V13M48 18H53M23 54V50M23 54H27" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
                </svg>
              </span>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>

            <article className="rivotBestFitCard rivotBestFitSubscription">
              <p className="rivotBestFitEyebrow rivotBestFitBlue">Subscription</p>
              <h3>Simple SuperPack</h3>
              <p>Extended Warranty &amp; Care for your Simple Scooters.</p>

              <span className="rivotBestFitShield rivotBestFitShieldBlue" aria-hidden="true">
                <svg viewBox="0 0 72 72" fill="none">
                  <path d="M36 7L62 17V34C62 51.4 51.42 62.72 36 68C20.58 62.72 10 51.4 10 34V17L36 7Z" fill="currentColor" opacity=".15" />
                  <path d="M36 16L53 22.4V34.8C53 47.02 46.28 55.4 36 60C25.72 55.4 19 47.02 19 34.8V22.4L36 16Z" fill="currentColor" />
                  <path d="M36 45.8L25.8 36.4C20.1 30.9 28.1 22.9 33.8 28.4L36 30.5L38.2 28.4C43.9 22.9 51.9 30.9 46.2 36.4L36 45.8Z" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M51 20V15M51 20H56" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
                </svg>
              </span>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
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
          padding: clamp(96px, 8vw, 124px) clamp(16px, 4vw, 48px) clamp(50px, 5vw, 72px);
          background: #f7f7f5;
          color: #151515;
        }

        .rivotBestFitShell {
          width: min(100%, 1320px);
          margin: 0 auto;
        }

        .rivotBestFitHeader {
          text-align: center;
        }

        .rivotBestFitHeader h2 {
          margin: 0;
          color: #080808;
          font-size: clamp(34px, 3.5vw, 46px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: -.055em;
        }

        .rivotBestFitHeader p {
          margin: 12px 0 0;
          color: #777d84;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.35;
        }

        .rivotBestFitGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 26px);
          margin-top: clamp(34px, 3.5vw, 48px);
          align-items: stretch;
        }

        .rivotBestFitCard {
          position: relative;
          display: flex;
          min-height: clamp(340px, 23vw, 410px);
          flex-direction: column;
          align-items: center;
          padding: clamp(32px, 2.8vw, 42px) clamp(22px, 2.2vw, 30px) clamp(30px, 2.6vw, 36px);
          border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 8px;
          background: #111313;
          box-shadow: 0 18px 40px rgba(17, 19, 19, .12);
          text-align: center;
          overflow: hidden;
        }

        .rivotBestFitAccessoriesBg {
          object-fit: contain;
          object-position: center;
          opacity: .68;
        }

        .rivotBestFitAccessories::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 9, 9, .9), rgba(8, 9, 9, .56));
          pointer-events: none;
        }

        .rivotBestFitAccessories > *:not(.rivotBestFitAccessoriesBg) {
          position: relative;
          z-index: 1;
        }

        .rivotBestFitEyebrow {
          margin: 0 0 12px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .42em;
          text-transform: uppercase;
        }

        .rivotBestFitGreen {
          color: #7ee7aa;
        }

        .rivotBestFitBlue {
          color: #9abaff;
        }

        .rivotBestFitCard h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 1.75vw, 32px);
          font-weight: 850;
          line-height: 1.08;
          letter-spacing: -.04em;
        }

        .rivotBestFitCard > p:not(.rivotBestFitEyebrow) {
          max-width: 300px;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, .66);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.35;
        }

        .rivotBestFitCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 142px;
          min-height: 48px;
          margin-top: auto;
          padding: 0 24px;
          border: 1px solid #ef7430;
          border-radius: 8px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 850;
          line-height: 1;
          transition: transform .2s ease, background .2s ease;
        }

        .rivotBestFitCta:hover {
          background: #c85a22;
          border-color: #c85a22;
          transform: translateY(-1px);
        }

        .rivotBestFitShield {
          display: grid;
          width: clamp(92px, 7vw, 112px);
          height: clamp(92px, 7vw, 112px);
          place-items: center;
          margin: auto 0 clamp(26px, 2.6vw, 36px);
        }

        .rivotBestFitShield svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 18px 18px rgba(0, 0, 0, .08));
        }

        .rivotBestFitShieldGreen {
          color: #45df82;
        }

        .rivotBestFitShieldBlue {
          color: #5b8dff;
        }

        .rivotBestFitSubscription {
          min-height: clamp(340px, 23vw, 410px);
          justify-content: flex-start;
          background: #111515;
        }

        .rivotBestFitSubscription .rivotBestFitEyebrow {
          margin-bottom: 10px;
          color: #8babff;
          font-size: 10px;
          letter-spacing: .5em;
        }

        .rivotBestFitSubscription > p:not(.rivotBestFitEyebrow) {
          max-width: 270px;
          margin-top: 8px;
          color: rgba(255, 255, 255, .82);
          font-size: 13px;
          line-height: 1.28;
        }

        .rivotBestFitSubscription .rivotBestFitShield {
          width: clamp(84px, 6.2vw, 104px);
          height: clamp(84px, 6.2vw, 104px);
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
            padding: 42px 20px 50px;
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-inline: auto;
          }

          .rivotBestFitCard {
            min-height: 360px;
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
            padding: 58px 12px 46px;
          }

          .rivotBestFitHeader h2 {
            font-size: clamp(30px, 9vw, 40px);
          }

          .rivotBestFitGrid {
            gap: 14px;
            margin-top: 26px;
          }

          .rivotBestFitCard {
            min-height: 320px;
            padding: 28px 18px 26px;
            border-radius: 16px;
          }

          .rivotBestFitEyebrow {
            font-size: 11px;
            letter-spacing: .34em;
          }

          .rivotBestFitCta {
            min-width: 152px;
            min-height: 46px;
            margin-top: auto;
            font-size: 14px;
          }

          .rivotBestFitShield {
            margin-bottom: 26px;
          }

          .rivotBestFitSubscription {
            min-height: 320px;
          }

          .rivotBestFitSubscription .rivotBestFitShield {
            width: 82px;
            height: 82px;
            margin: auto 0 24px;
          }
        }
      `}</style>
    </>
  );
}
