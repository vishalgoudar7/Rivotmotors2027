"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import catalog from "@/asset/connect/Catelog.png";
import tpms from "@/asset/connect/16.webp";
import helmet from "@/asset/connect/RIVOT Helmet.png";
import charger from "@/asset/connect/Fast Charger (2).png";
import port from "@/asset/connect/Port C.png";
import floorMat from "@/asset/connect/floor mat.png";
import jacket from "@/asset/connect/32.png";
import cover from "@/asset/connect/Scooter cover.png";

type MerchandiseItem = {
  name: string;
  highlight: string;
  description: string;
  image: StaticImageData;
  specs: Array<{ value: string; label: string }>;
};

const merchandiseItems: MerchandiseItem[] = [
  {
    name: "RIVOT",
    highlight: "Merchandise",
    description:
      "Explore our premium collection of RIVOT merchandise designed to complement your electric scooter experience. From protective gear to stylish accessories.",
    image: catalog,
    specs: [
      { value: "Premium", label: "Quality" },
      { value: "Eco", label: "Friendly" },
      { value: "RIVOT", label: "Design" },
      { value: "1 Year", label: "Warranty" },
    ],
  },
  {
    name: "alerTier",
    highlight: "TPMS",
    description:
      "alerTire TPMS delivers accurate tire pressure and temperature data, helping riders maintain safety, efficiency, and optimal vehicle performance.",
    image: tpms,
    specs: [
      { value: "Wireless", label: "Connectivity" },
      { value: "Live", label: "Monitoring" },
      { value: "Accurate", label: "Sensors" },
      { value: "Paired", label: "alerTire App" },
    ],
  },
  {
    name: "RIVOT X",
    highlight: "Helmet",
    description:
      "Stay protected on every ride with our lightweight, durable helmet designed for maximum safety and all day comfort.",
    image: helmet,
    specs: [
      { value: "Comfort", label: "Fit" },
      { value: "Secure", label: "Lock" },
      { value: "Airflow", label: "Ventilation" },
      { value: "Certified", label: "Standard" },
    ],
  },
  {
    name: "Fast",
    highlight: "Charger",
    description:
      "Power up effortlessly at home with our Fast Charger designed for quick, safe, and reliable charging.",
    image: charger,
    specs: [
      { value: "Rapid", label: "Power" },
      { value: "Secured", label: "Safety" },
      { value: "Portable", label: "Design" },
      { value: "Efficient", label: "Build" },
    ],
  },
  {
    name: "RIVOT",
    highlight: "Charge Port",
    description:
      "A compact, reliable Type-2 EV adapter designed for seamless home and public charging with RIVOT scooters.",
    image: port,
    specs: [
      { value: "Universal", label: "Compatibility" },
      { value: "Fast", label: "Charging" },
      { value: "Durable", label: "Build" },
      { value: "Protected", label: "Safety" },
    ],
  },
  {
    name: "Floor",
    highlight: "Mat",
    description:
      "Keep your scooter spotless with RIVOT's premium floor mat, designed for durability, easy cleaning, grip, and a perfect fit.",
    image: floorMat,
    specs: [
      { value: "Protective", label: "Dust" },
      { value: "Anti-Slip", label: "Grip" },
      { value: "Durable", label: "Material" },
      { value: "Resists", label: "Wear" },
    ],
  },
  {
    name: "RIVOT",
    highlight: "Jacket",
    description:
      "A high performance riding jacket built for comfort, protection, and style for everyday rides and long journeys.",
    image: jacket,
    specs: [
      { value: "Comfort", label: "Fit" },
      { value: "QuickDry", label: "Fabric" },
      { value: "Secure", label: "Control" },
      { value: "Durable", label: "Stitching" },
    ],
  },
  {
    name: "Scooter",
    highlight: "Cover",
    description:
      "A durable, all-weather scooter cover designed to protect your ride from dust, rain, sunlight, and outdoor wear.",
    image: cover,
    specs: [
      { value: "Weather", label: "Protection" },
      { value: "UVSafe", label: "Guard" },
      { value: "Sealed", label: "Shield" },
      { value: "Tough", label: "Fabric" },
    ],
  },
];

export function Merchandise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = merchandiseItems[activeIndex];

  return (
    <main className="rivotMerch">
      <section className="rivotMerchHero" aria-labelledby="merch-title">
        <div className="rivotMerchMedia">
          <div className="rivotMerchImageFrame">
            <Image
              key={activeItem.highlight}
              src={activeItem.image}
              alt={`${activeItem.name} ${activeItem.highlight}`}
              priority
              sizes="(max-width: 900px) 88vw, 46vw"
            />
          </div>
          <div className="rivotMerchDots" aria-label="Merchandise selector">
            {merchandiseItems.map((item, index) => (
              <button
                type="button"
                key={`${item.name}-${item.highlight}`}
                className={index === activeIndex ? "active" : ""}
                aria-label={`Show ${item.name} ${item.highlight}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="rivotMerchContent">
          <p className="rivotMerchEyebrow">Store</p>
          <h1 id="merch-title">
            {activeItem.name} <span>{activeItem.highlight}</span>
          </h1>
          <p className="rivotMerchDescription">{activeItem.description}</p>

          <div className="rivotMerchSpecs">
            {activeItem.specs.map((spec) => (
              <div key={`${activeItem.highlight}-${spec.label}`}>
                <strong>{spec.value}</strong>
                <span>{spec.label}</span>
              </div>
            ))}
          </div>

          <div className="rivotMerchActions">
            <Link href="/book-now">Shop Now</Link>
            <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % merchandiseItems.length)}>
              View Next
            </button>
          </div>
        </div>
      </section>

      <section className="rivotMerchCollection" aria-label="Merchandise collection">
        {merchandiseItems.map((item, index) => (
          <button
            type="button"
            key={`${item.name}-${item.highlight}-card`}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            <span>
              <Image src={item.image} alt="" sizes="160px" />
            </span>
            <strong>
              {item.name} <em>{item.highlight}</em>
            </strong>
          </button>
        ))}
      </section>

      <style>{`
        .rivotMerch {
          min-height: 100vh;
          padding: 118px clamp(18px, 5vw, 72px) 56px;
          background:
            radial-gradient(circle at 88% 14%, rgba(239, 116, 48, .18), transparent 28%),
            linear-gradient(115deg, #ffffff 0%, #fbfaf8 60%, #f6e7df 100%);
          color: #070707;
        }

        .rivotMerchHero {
          display: grid;
          grid-template-columns: minmax(380px, 1fr) minmax(360px, 520px);
          gap: 26px;
          align-items: stretch;
        }

        .rivotMerchMedia,
        .rivotMerchContent {
          min-height: 560px;
          border: 1px solid rgba(17, 17, 17, .07);
          border-radius: 8px;
          background: rgba(255, 255, 255, .9);
          box-shadow: 0 24px 70px rgba(17, 17, 17, .08);
        }

        .rivotMerchMedia {
          display: grid;
          grid-template-rows: 1fr auto;
          padding: clamp(18px, 3vw, 34px);
          overflow: hidden;
        }

        .rivotMerchImageFrame {
          display: grid;
          place-items: center;
          min-height: 430px;
        }

        .rivotMerchImageFrame img {
          width: min(100%, 620px);
          height: min(54vh, 470px);
          object-fit: contain;
          filter: drop-shadow(0 24px 28px rgba(17, 17, 17, .18));
          animation: rivotMerchImageIn .35s ease both;
        }

        .rivotMerchDots {
          display: flex;
          justify-content: center;
          gap: 9px;
          padding-top: 8px;
        }

        .rivotMerchDots button {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: #d8d8d5;
          cursor: pointer;
        }

        .rivotMerchDots button.active {
          width: 34px;
          background: #ef7430;
        }

        .rivotMerchContent {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(24px, 3vw, 46px);
        }

        .rivotMerchEyebrow {
          margin: 0 0 12px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .rivotMerchContent h1 {
          margin: 0;
          color: #070707;
          font-size: clamp(42px, 5vw, 72px);
          font-weight: 950;
          line-height: .95;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .rivotMerchContent h1 span {
          display: block;
          color: #ef7430;
        }

        .rivotMerchDescription {
          max-width: 560px;
          margin: 22px 0 0;
          color: #5f6b73;
          font-size: clamp(15px, 1.2vw, 18px);
          font-weight: 700;
          line-height: 1.55;
        }

        .rivotMerchSpecs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 30px;
        }

        .rivotMerchSpecs div {
          padding: 16px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: rgba(255, 255, 255, .72);
        }

        .rivotMerchSpecs strong,
        .rivotMerchSpecs span {
          display: block;
        }

        .rivotMerchSpecs strong {
          color: #ef7430;
          font-size: 22px;
          font-weight: 950;
        }

        .rivotMerchSpecs span {
          margin-top: 4px;
          color: #68747c;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .rivotMerchActions {
          display: flex;
          gap: 14px;
          margin-top: 34px;
        }

        .rivotMerchActions a,
        .rivotMerchActions button {
          display: inline-flex;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
        }

        .rivotMerchActions a {
          border: 1px solid #ef7430;
          background: #ef7430;
          color: #fff;
        }

        .rivotMerchActions button {
          border: 1px solid rgba(17, 17, 17, .18);
          background: #fff;
          color: #070707;
        }

        .rivotMerchCollection {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .rivotMerchCollection button {
          display: grid;
          grid-template-columns: 92px 1fr;
          min-height: 112px;
          align-items: center;
          gap: 14px;
          padding: 14px;
          border: 1px solid rgba(17, 17, 17, .07);
          border-radius: 8px;
          background: rgba(255, 255, 255, .82);
          text-align: left;
          box-shadow: 0 14px 32px rgba(17, 17, 17, .06);
          cursor: pointer;
        }

        .rivotMerchCollection button.active {
          border-color: #ef7430;
          background: #fff4ed;
        }

        .rivotMerchCollection span {
          display: grid;
          width: 92px;
          height: 76px;
          place-items: center;
          border-radius: 7px;
          background: #fff;
        }

        .rivotMerchCollection img {
          width: 86px;
          height: 70px;
          object-fit: contain;
        }

        .rivotMerchCollection strong {
          color: #070707;
          font-size: 15px;
          font-weight: 950;
          line-height: 1.15;
        }

        .rivotMerchCollection em {
          display: block;
          color: #ef7430;
          font-style: normal;
        }

        html[data-rivot-theme="dark"] .rivotMerch {
          background:
            radial-gradient(circle at 86% 12%, rgba(239, 116, 48, .2), transparent 28%),
            linear-gradient(115deg, #080909 0%, #101211 62%, #1b130f 100%);
          color: #fff;
        }

        html[data-rivot-theme="dark"] .rivotMerchMedia,
        html[data-rivot-theme="dark"] .rivotMerchContent,
        html[data-rivot-theme="dark"] .rivotMerchCollection button {
          border-color: rgba(255, 255, 255, .1);
          background: rgba(18, 20, 20, .86);
        }

        html[data-rivot-theme="dark"] .rivotMerchContent h1,
        html[data-rivot-theme="dark"] .rivotMerchCollection strong,
        html[data-rivot-theme="dark"] .rivotMerchActions button {
          color: #fff;
        }

        html[data-rivot-theme="dark"] .rivotMerchDescription,
        html[data-rivot-theme="dark"] .rivotMerchSpecs span {
          color: #c9c9c2;
        }

        html[data-rivot-theme="dark"] .rivotMerchSpecs div,
        html[data-rivot-theme="dark"] .rivotMerchCollection span,
        html[data-rivot-theme="dark"] .rivotMerchActions button {
          border-color: rgba(255, 255, 255, .12);
          background: rgba(255, 255, 255, .06);
        }

        html[data-rivot-theme="dark"] .rivotMerchCollection button.active {
          border-color: #ef7430;
          background: rgba(239, 116, 48, .14);
        }

        @keyframes rivotMerchImageIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1100px) {
          .rivotMerchHero {
            grid-template-columns: 1fr;
          }

          .rivotMerchMedia,
          .rivotMerchContent {
            min-height: auto;
          }

          .rivotMerchCollection {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .rivotMerch {
            padding: 96px 16px 42px;
          }

          .rivotMerchMedia,
          .rivotMerchContent {
            padding: 20px;
          }

          .rivotMerchImageFrame {
            min-height: 300px;
          }

          .rivotMerchImageFrame img {
            height: 300px;
          }

          .rivotMerchSpecs,
          .rivotMerchCollection {
            grid-template-columns: 1fr;
          }

          .rivotMerchActions {
            flex-direction: column;
          }

          .rivotMerchCollection button {
            grid-template-columns: 82px 1fr;
          }
        }
      `}</style>
    </main>
  );
}
