import Image from "next/image";
import Link from "next/link";
import launchHero from "@/asset/images/Hero.png";

export default function Home() {
  return (
    <>
      <section className="rivotHero">
        <Image
          src={launchHero}
          alt="Rivot NX100 hero image"
          fill
          priority
          sizes="100vw"
          className="rivotHeroImage"
        />
        <div className="rivotHeroShade" aria-hidden="true" />

        <div className="rivotHeroContent">
          <p className="rivotEyebrow">Meet the future</p>
          <h1 className="rivotHeroTitle">NX100</h1>
          <h2>Power. Performance. Possibilities.</h2>
          {/* <p className="rivotHeroCopy">
            The NX100 is a next generation electric scooter built for those who demand more
            from every ride. Intelligent technology, powerful performance, and zero compromise.
          </p> */}

          <div className="rivotHeroSpecs" aria-label="NX100 key specifications">
            <div>
              <span className="rivotSpecIcon" aria-hidden="true">0-40</span>
              <b>3.2s</b>
              <small>0-40 km/h</small>
            </div>
            <div>
              <span className="rivotSpecIcon" aria-hidden="true">IDC</span>
              <b>150 km</b>
              <small>IDC Range</small>
            </div>
            <div>
              <span className="rivotSpecIcon" aria-hidden="true">BAT</span>
              <b>4 kWh</b>
              <small>Battery</small>
            </div>
            <div>
              <span className="rivotSpecIcon" aria-hidden="true">3Y</span>
              <b>3 Year</b>
              <small>Warranty</small>
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

      <section className="rivotIntro" id="explore">
        <p className="rivotEyebrow">Explore</p>
        <h2>Electric performance, staged for the spotlight.</h2>
      </section>

      <style>{`

      .rivotHeroTitle {
        margin: 14px 0 8px;
        color: #fff;
        font-size: clamp(52px, 8.6vw, 142px);
        font-weight: 950;
        line-height: .82;
        letter-spacing: -.06em;
        text-transform: uppercase;
      }

      .rivotHero h2 {
        margin: 0;
        color: #fff;
        font-size: clamp(24px, 2vw, 34px);
        line-height: 1.12;
        letter-spacing: -.03em;
      }
        .rivotHero {
          position: relative;
          height: calc(100vh - 72px);
          min-height: 0;
          margin-top: 72px;
          display: flex;
          align-items: flex-start;
          overflow: hidden;
          background: #0d1017;
          color: #fff;
        }

        .rivotHeroImage {
          object-fit: cover;
          object-position: center bottom;
        }

        .rivotHeroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(1, 3, 5, .98) 0%, rgba(1, 3, 5, .86) 31%, rgba(1, 3, 5, .28) 54%, rgba(1, 3, 5, .16) 72%, rgba(1, 3, 5, .45) 100%),
            linear-gradient(180deg, rgba(1, 3, 5, .34) 0%, rgba(1, 3, 5, .04) 42%, rgba(1, 3, 5, .72) 100%);
        }

        .rivotHeroContent {
          position: relative;
          z-index: 1;
          width: min(42vw, 580px);
          margin-top: clamp(76px, 9vh, 112px);
          margin-left: clamp(32px, 6.5vw, 112px);
          text-align: left;
          text-shadow: 0 2px 22px rgba(0, 0, 0, .22);
        }

        .rivotEyebrow {
          margin: 0;
          color: #ef7430;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotHero h1 {
          margin: 14px 0 8px;
          color: #fff;
          font-size: clamp(52px, 8.6vw, 142px);
          font-weight: 950;
          line-height: .82;
          letter-spacing: -.06em;
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
          margin: 20px 0 24px;
          color: rgba(255, 255, 255, .76);
          font-size: 17px;
          font-weight: 600;
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
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          color: #ef7430;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .03em;
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
          font-weight: 900;
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
            font-size: clamp(44px, 17vw, 70px);
            line-height: .88;
          }

          .rivotHero h2 {
            max-width: 330px;
            font-size: 20px;
          }

          .rivotHeroCopy {
            font-size: 16px;
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
            width: 38px;
            height: 38px;
            margin-bottom: 8px;
            font-size: 9px;
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

        }
      `}</style>
    </>
  );
}
