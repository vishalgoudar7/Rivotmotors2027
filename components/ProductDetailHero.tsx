"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, Play } from "lucide-react";
import heroFeatureDark from "@/asset/images/Hero/1 (3).png";
import heroFeatureLight from "@/asset/images/Hero/3 (3).png";
import heroFeatureStudio from "@/asset/images/Hero/ChatGPT Image Aug 26, 2026, 03_15_38 PM.png";
import heroFolderDark from "@/asset/images/Hero/Hero1.png";
import heroFolderLight from "@/asset/images/Hero/Hero2.png";

const heroCarouselImages = [
  heroFeatureDark,
  heroFeatureStudio,
  heroFeatureLight,
  heroFolderDark,
  heroFolderLight,
] as const;

type ProductDetailHeroProps = {
  modelName: string;
  headline: string;
  description: string;
  kicker?: string;
};

export function ProductDetailHero({
  modelName,
  headline,
  description,
  kicker = "Meet the future",
}: ProductDetailHeroProps) {
  const [selectedHeroImage, setSelectedHeroImage] = useState(0);
  const modelVariant = modelName.replace(/^NX100\s*/i, "").trim().toUpperCase();

  useEffect(() => {
    const heroImageInterval = window.setInterval(() => {
      setSelectedHeroImage((currentImage) => (currentImage + 1) % heroCarouselImages.length);
    }, 5000);

    return () => window.clearInterval(heroImageInterval);
  }, []);

  return (
    <section className="productDetailHero" aria-label={`RIVOT ${modelName}`}>
      {heroCarouselImages.map((heroImage, index) => (
        <Image
          src={heroImage}
          alt={index === 0 ? `RIVOT ${modelName} hero image` : ""}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`productDetailHeroImage${index === selectedHeroImage ? " isActive" : ""}`}
          key={heroImage.src}
        />
      ))}

      <div className="productDetailHeroShade" aria-hidden="true" />

      <div className="productDetailHeroPointers" aria-hidden="true">
        {heroCarouselImages.map((heroImage, index) => (
          <span
            className={index === selectedHeroImage ? "isActive" : ""}
            key={`pointer-${heroImage.src}`}
          />
        ))}
      </div>

      <div className="productDetailHeroContent">
        <p className="productDetailEyebrow">{kicker}</p>
        <h1 className="productDetailHeroTitle">
          <span className="productDetailHeroModelName">NX100</span>
          {modelVariant && <span className="productDetailHeroBadge">{modelVariant}</span>}
        </h1>
        <h2>{headline}</h2>
        <p className="productDetailHeroCopy">{description}</p>

        <div className="productDetailHeroSpecs">
          <div>
            <span className="productDetailSpecIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M8 36L17 18L25 29L33 13L40 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 40H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M33 13H40V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <b>200 km</b>
            <small>Range</small>
          </div>
          <div>
            <span className="productDetailSpecIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M9 30C9 20.06 17.06 12 27 12C36.94 12 39 20.06 39 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M27 27L35 20" stroke="#ef7430" strokeWidth="3" strokeLinecap="round" />
                <circle cx="27" cy="27" r="3" fill="#ef7430" />
                <path d="M13 32H10M41 32H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <b>100 km/h</b>
            <small>Top Speed</small>
          </div>
          <div>
            <span className="productDetailSpecIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M27 5L11 27H23L20 43L37 19H25L27 5Z" stroke="#ef7430" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity=".55" strokeDasharray="4 4" />
              </svg>
            </span>
            <b>35 min</b>
            <small>200km Charge</small>
          </div>
          <div>
            <span className="productDetailSpecIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="10" y="8" width="27" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <path d="M19 5H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="16" y="14" width="15" height="20" rx="2" fill="#ef7430" opacity=".9" />
                <path d="M20 18V30M24 18V30M28 18V30" stroke="#fff" strokeWidth="1.5" opacity=".9" />
              </svg>
            </span>
            <b>4.4 kWh</b>
            <small>Battery</small>
          </div>
        </div>

        <div className="productDetailHeroButtons">
          <Link href="/book-now" className="productDetailPriceBook">
            <Play aria-hidden="true" />
            Book Now
          </Link>
          <Link href="/test-ride" className="productDetailTestRide">
            <FileText aria-hidden="true" />
            Test Ride
          </Link>
        </div>

        <div className="productDetailHeroNotes">
          <strong>Starting at just ₹1,29,000*</strong>
          <span>EMI starting at Rs 3,999/month*</span>
          <span>Easy Financing Options</span>
        </div>
      </div>

      <style jsx>{`
        .productDetailHero {
          position: relative;
          display: flex;
          height: 100vh;
          min-height: 700px;
          margin-top: 0;
          align-items: flex-start;
          overflow: hidden;
          background: #0d1017;
          color: #fff;
        }

        .productDetailHeroImage {
          object-fit: cover;
          object-position: 68% center;
          opacity: 0;
          transform: scale(1.06);
          transition: opacity 1s ease, transform 6s ease;
        }

        .productDetailHeroImage.isActive {
          opacity: 1;
          transform: scale(1.035);
        }

        .productDetailHeroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(1, 3, 5, .98) 0%, rgba(1, 3, 5, .86) 31%, rgba(1, 3, 5, .28) 54%, rgba(1, 3, 5, .16) 72%, rgba(1, 3, 5, .45) 100%),
            linear-gradient(180deg, rgba(1, 3, 5, .34) 0%, rgba(1, 3, 5, .04) 42%, rgba(1, 3, 5, .72) 100%);
          pointer-events: none;
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroShade {
          background:
            linear-gradient(90deg, rgba(255,255,255,.98) 0%, rgba(255,255,255,.8) 32%, rgba(255,255,255,.16) 58%, rgba(255,255,255,.04) 100%),
            linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.02) 52%, rgba(255,255,255,.62) 100%);
        }

        :global(html[data-rivot-theme="light"]) .productDetailHero,
        :global(html[data-rivot-theme="light"]) .productDetailHeroTitle,
        :global(html[data-rivot-theme="light"]) .productDetailHero h1,
        :global(html[data-rivot-theme="light"]) .productDetailHero h2 {
          color: #111;
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroCopy {
          color: rgba(17, 17, 17, .75);
        }

        :global(html[data-rivot-theme="light"]) .productDetailSpecIcon {
          border-color: rgba(0, 0, 0, .1);
          background: rgba(255, 255, 255, .62);
          color: #111;
          box-shadow: 0 8px 22px rgba(0, 0, 0, .08);
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroSpecs div {
          border-left-color: rgba(0, 0, 0, .16);
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroSpecs b {
          color: #111;
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroSpecs small,
        :global(html[data-rivot-theme="light"]) .productDetailHeroNotes {
          color: rgba(17, 17, 17, .72);
        }

        :global(html[data-rivot-theme="light"]) .productDetailTestRide {
          border-color: rgba(239, 116, 48, .5);
          background: rgba(255, 255, 255, .9);
          color: #c45a21;
        }

        .productDetailHeroPointers {
          position: absolute;
          right: clamp(54px, 7vw, 132px);
          bottom: clamp(46px, 7vh, 76px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .productDetailHeroPointers span {
          display: block;
          width: clamp(48px, 4.2vw, 76px);
          height: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .34);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .32);
          transition: background .35s ease, width .35s ease, opacity .35s ease;
        }

        .productDetailHeroPointers span.isActive {
          width: clamp(58px, 5vw, 88px);
          background: rgba(255, 255, 255, .94);
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroPointers span {
          background: rgba(255, 255, 255, .42);
        }

        :global(html[data-rivot-theme="light"]) .productDetailHeroPointers span.isActive {
          background: #fff;
        }

        .productDetailHeroContent {
          position: relative;
          z-index: 1;
          width: min(50vw, 680px);
          margin-top: clamp(105px, 12vh, 125px);
          margin-left: clamp(48px, 3.2vw, 62px);
          text-align: left;
          text-shadow: none;
        }

        .productDetailEyebrow {
          margin: 0;
          color: #ef7430;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .productDetailHero h1 {
          display: flex;
          align-items: center;
          gap: clamp(12px, 1.7vw, 24px);
          margin: 14px 0 8px;
          color: #fff;
          font-size: clamp(52px, 8.1vw, 132px);
          font-weight: 800;
          line-height: .86;
          letter-spacing: -.055em;
          text-transform: uppercase;
        }

        .productDetailHeroModelName {
          display: block;
          font-style: italic;
        }

        .productDetailHeroBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(82px, 8vw, 126px);
          min-height: clamp(58px, 5.6vw, 84px);
          padding: 0 clamp(13px, 1.7vw, 22px);
          border-radius: clamp(7px, .8vw, 12px);
          background: #ef7430;
          color: #fff;
          font-size: clamp(26px, 2.9vw, 46px);
          font-style: italic;
          font-weight: 900;
          letter-spacing: -.03em;
          line-height: .9;
        }

        .productDetailHero h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 2vw, 34px);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -.03em;
          text-transform: uppercase;
        }

        .productDetailHeroCopy {
          max-width: 440px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, .76);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.45;
        }

        .productDetailHeroSpecs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(680px, 100%);
          max-width: 680px;
          margin-top: clamp(42px, 9vh, 92px);
          margin-bottom: 28px;
          margin-left: -36px;
        }

        .productDetailHeroSpecs div {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          border-left: 1px solid rgba(255, 255, 255, .14);
          text-align: center;
        }

        .productDetailHeroSpecs div:first-child {
          padding-left: 20px;
          border-left: 0;
        }

        .productDetailSpecIcon {
          display: grid;
          width: 64px;
          height: 64px;
          margin: 0 auto 12px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .04);
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          color: #fff;
          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, .02),
            0 8px 25px rgba(0, 0, 0, .18);
        }

        .productDetailSpecIcon svg {
          display: block;
          width: 32px;
          height: 32px;
        }

        .productDetailHeroSpecs b,
        .productDetailHeroSpecs small {
          display: block;
        }

        .productDetailHeroSpecs b {
          color: #fff;
          font-size: 18px;
          line-height: 1.1;
        }

        .productDetailHeroSpecs small {
          margin-top: 6px;
          color: rgba(255, 255, 255, .7);
          font-size: 14px;
        }

        .productDetailHeroButtons {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 18px;
          margin-top: 0;
        }

        .productDetailTestRide,
        .productDetailPriceBook {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 180px;
          min-height: 50px;
          padding: 0 24px;
          border: 1px solid rgba(239, 116, 48, .45);
          border-radius: 999px;
          box-shadow: none;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
        }

        .productDetailTestRide {
          background: rgba(255, 255, 255, .92);
          color: #c45a21;
        }

        .productDetailPriceBook {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
          box-shadow: 0 12px 28px rgba(239, 116, 48, .3);
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
        }

        .productDetailPriceBook:hover,
        .productDetailPriceBook:focus-visible {
          border-color: #d86124;
          background: #d86124;
          box-shadow: 0 14px 28px rgba(239, 116, 48, .32);
          outline: none;
          transform: translateY(-3px);
        }

        .productDetailTestRide:hover,
        .productDetailTestRide:focus-visible {
          border-color: #ef7430;
          background: rgba(239, 116, 48, .12);
          color: #b84f1c;
          outline: none;
          transform: translateY(-2px);
        }

        .productDetailPriceBook svg,
        .productDetailTestRide svg {
          width: 17px;
          height: 17px;
          transition: transform .2s ease;
        }

        .productDetailPriceBook:hover svg,
        .productDetailPriceBook:focus-visible svg,
        .productDetailTestRide:hover svg,
        .productDetailTestRide:focus-visible svg {
          transform: translateX(3px);
        }

        .productDetailHeroNotes {
          display: flex;
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 28px;
          margin-top: 16px;
          color: rgba(255, 255, 255, .72);
          font-size: 14px;
          font-weight: 700;
        }

        .productDetailHeroNotes strong {
          flex: 0 0 100%;
          color: currentColor;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.2;
        }

        @media (max-width: 980px) {
          .productDetailHero {
            min-height: 760px;
          }

          .productDetailHeroContent {
            width: min(66vw, 640px);
          }

          .productDetailHero h1 {
            flex-wrap: wrap;
          }

          .productDetailHeroSpecs {
            width: min(620px, 100%);
            margin-left: 0;
          }
        }

        @media (max-width: 560px) {
          .productDetailHero {
            display: block;
            width: 100%;
            max-width: none;
            height: min(720px, 100svh);
            min-height: 646px;
            margin: 0;
            border: 0;
            border-radius: 0;
            background: #f5f2ef;
            box-shadow: none;
          }

          .productDetailHeroImage {
            object-position: 64% center;
            transform: scale(1.015);
          }

          :global(html[data-rivot-theme="light"]) .productDetailHeroShade,
          .productDetailHeroShade {
            background:
              linear-gradient(90deg, rgba(255,255,255,.94) 0%, rgba(255,255,255,.72) 25%, rgba(255,255,255,.08) 55%, rgba(255,255,255,.02) 100%),
              linear-gradient(180deg, rgba(255,255,255,.48) 0%, rgba(255,255,255,.04) 46%, rgba(247,244,239,.9) 100%);
          }

          .productDetailHeroContent {
            position: absolute;
            inset: 76px 22px 18px;
            display: flex;
            width: auto;
            max-width: none;
            margin: 0;
            padding: 0;
            flex-direction: column;
            overflow: visible;
          }

          .productDetailEyebrow {
            max-width: 170px;
            font-size: 11px;
            line-height: 1.35;
            letter-spacing: .14em;
          }

          .productDetailHero h1 {
            max-width: 100%;
            margin-top: 18px;
            gap: 8px;
            color: #111;
            font-size: clamp(48px, 17vw, 66px);
            line-height: .88;
          }

          .productDetailHeroBadge {
            min-width: 52px;
            min-height: 34px;
            padding: 0 8px;
            border-radius: 5px;
            font-size: clamp(16px, 5.6vw, 24px);
          }

          .productDetailHero h2 {
            max-width: 185px;
            color: #111;
            font-size: 15px;
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: .08em;
          }

          .productDetailHeroCopy {
            display: none;
          }

          .productDetailHeroSpecs {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0;
            width: 100%;
            max-width: none;
            margin: auto 0 14px;
            padding: 0;
            border-top: 1px solid rgba(17, 17, 17, .1);
            border-bottom: 1px solid rgba(17, 17, 17, .1);
            background: rgba(255, 255, 255, .38);
            backdrop-filter: blur(10px);
          }

          .productDetailHeroSpecs div {
            justify-content: center;
            min-height: 68px;
            padding: 9px 4px;
            border-left: 1px solid rgba(17, 17, 17, .11);
          }

          .productDetailHeroSpecs div:first-child {
            border-left: 0;
          }

          .productDetailSpecIcon {
            display: none;
          }

          .productDetailHeroSpecs b {
            color: #111;
            font-size: 13px;
            white-space: nowrap;
          }

          .productDetailHeroSpecs small {
            margin-top: 3px;
            color: rgba(17, 17, 17, .72);
            font-size: 9px;
            line-height: 1.15;
          }

          .productDetailHeroButtons {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
            gap: 12px;
            margin-bottom: 14px;
          }

          .productDetailHeroPointers {
            right: auto;
            bottom: 194px;
            left: 50%;
            gap: 6px;
            transform: translateX(-50%);
          }

          .productDetailHeroPointers span {
            width: 24px;
            height: 4px;
          }

          .productDetailHeroPointers span.isActive {
            width: 32px;
            background: #fff;
          }

          .productDetailTestRide,
          .productDetailPriceBook {
            width: 100%;
            min-width: 0;
            min-height: 48px;
            padding: 0 12px;
            border-radius: 15px;
            font-size: 13px;
          }

          .productDetailHeroNotes {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 5px 12px;
            margin-top: 0;
            padding: 0 1px;
            color: rgba(17, 17, 17, .72);
            font-size: 10px;
            line-height: 1.25;
          }

          .productDetailHeroNotes strong {
            grid-column: 1;
            font-size: 12px;
            line-height: 1.18;
          }

          .productDetailHeroNotes span {
            max-width: 100%;
          }

          .productDetailHeroNotes span:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
