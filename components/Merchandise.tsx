import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
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
  description: string;
  image: StaticImageData;
  tags: string[];
};

const merchandiseItems: MerchandiseItem[] = [
  {
    name: "RIVOT Merchandise",
    description: "Premium RIVOT accessories designed to complete your electric scooter experience.",
    image: catalog,
    tags: ["Premium", "Eco Friendly"],
  },
  {
    name: "alerTire TPMS",
    description: "Wireless tyre pressure and temperature monitoring for safer everyday rides.",
    image: tpms,
    tags: ["Wireless", "Live Data"],
  },
  {
    name: "RIVOT X Helmet",
    description: "Lightweight protective helmet with airflow, comfort, and certified safety.",
    image: helmet,
    tags: ["Comfort", "Certified"],
  },
  {
    name: "Fast Charger",
    description: "Quick, reliable home charging with smart safety protection.",
    image: charger,
    tags: ["Rapid", "Portable"],
  },
  {
    name: "RIVOT Charge Port",
    description: "Compact Type-2 EV adapter for seamless home and public charging.",
    image: port,
    tags: ["Durable", "Protected"],
  },
  {
    name: "Floor Mat",
    description: "Anti-slip premium mat that protects your scooter floorboard.",
    image: floorMat,
    tags: ["Anti-Slip", "Washable"],
  },
  {
    name: "RIVOT Jacket",
    description: "Sporty riding jacket built for comfort, protection, and long rides.",
    image: jacket,
    tags: ["QuickDry", "Durable"],
  },
  {
    name: "Scooter Cover",
    description: "All-weather scooter cover for dust, rain, sunlight, and outdoor protection.",
    image: cover,
    tags: ["Weather", "UV Safe"],
  },
];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 8.1h11.6l-1.1 6.2a2 2 0 0 1-2 1.7H9.6a2 2 0 0 1-2-1.6L6.3 5.8H3.9" />
      <path d="M9.2 19.2h.1M16.3 19.2h.1" />
    </svg>
  );
}

export function Merchandise() {
  return (
    <main className="rivotShop">
      <section className="rivotShopHeader" aria-labelledby="merch-title">
        <p>Store</p>
        <h1 id="merch-title">
          RIVOT <span>Merchandise</span>
        </h1>
        <strong>Shop RIVOT ride gear, charging essentials, and scooter accessories.</strong>
      </section>

      <section className="rivotShopGrid" aria-label="RIVOT merchandise products">
        {merchandiseItems.map((item) => (
          <article className="rivotShopCard" key={item.name}>
            <div className="rivotShopImage">
              <Image src={item.image} alt={item.name} sizes="(max-width: 760px) 50vw, 30vw" />
            </div>
            <div className="rivotShopInfo">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div className="rivotShopTags">
                {item.tags.map((tag) => (
                  <span key={`${item.name}-${tag}`}>{tag}</span>
                ))}
              </div>
              <Link href="/book-now" className="rivotShopButton">
                Shop Now <CartIcon />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <style>{`
        .rivotShop {
          min-height: 100vh;
          padding: 118px clamp(18px, 5vw, 72px) 64px;
          background:
            radial-gradient(circle at 88% 13%, rgba(239, 116, 48, .16), transparent 30%),
            linear-gradient(115deg, #ffffff 0%, #fbfaf8 60%, #f6e7df 100%);
          color: #070707;
        }

        .rivotShopHeader {
          max-width: 1040px;
          margin: 0 auto 28px;
        }

        .rivotShopHeader p {
          margin: 0 0 10px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotShopHeader h1 {
          margin: 0;
          color: #070707;
          font-size: clamp(42px, 6vw, 82px);
          font-weight: 950;
          line-height: .94;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .rivotShopHeader h1 span {
          color: #ef7430;
        }

        .rivotShopHeader strong {
          display: block;
          max-width: 680px;
          margin-top: 14px;
          color: #5f6b73;
          font-size: clamp(15px, 1.35vw, 20px);
          font-weight: 800;
          line-height: 1.45;
        }

        .rivotShopGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .rivotShopCard {
          display: grid;
          grid-template-rows: 220px 1fr;
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: rgba(255, 255, 255, .94);
          box-shadow: 0 20px 48px rgba(17, 17, 17, .08);
        }

        .rivotShopImage {
          display: grid;
          place-items: center;
          padding: 18px;
          background: #fff;
        }

        .rivotShopImage img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 14px 16px rgba(17, 17, 17, .14));
        }

        .rivotShopInfo {
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .rivotShopInfo h2 {
          margin: 0;
          color: #070707;
          font-size: 21px;
          font-weight: 950;
          line-height: 1.12;
        }

        .rivotShopInfo p {
          min-height: 58px;
          margin: 8px 0 14px;
          color: #68747c;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.42;
        }

        .rivotShopTags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 16px;
        }

        .rivotShopTags span {
          padding: 6px 9px;
          border-radius: 999px;
          background: #fff4ed;
          color: #ef7430;
          font-size: 11px;
          font-weight: 900;
        }

        .rivotShopButton {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding: 0 14px;
          border-radius: 8px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
        }

        .rivotShopButton svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2;
        }

        html[data-rivot-theme="dark"] .rivotShop {
          background:
            radial-gradient(circle at 86% 12%, rgba(239, 116, 48, .2), transparent 30%),
            linear-gradient(115deg, #080909 0%, #101211 62%, #1b130f 100%);
        }

        html[data-rivot-theme="dark"] .rivotShopHeader h1,
        html[data-rivot-theme="dark"] .rivotShopInfo h2 {
          color: #fff;
        }

        html[data-rivot-theme="dark"] .rivotShopHeader strong,
        html[data-rivot-theme="dark"] .rivotShopInfo p {
          color: #c9c9c2;
        }

        html[data-rivot-theme="dark"] .rivotShopCard {
          border-color: rgba(255, 255, 255, .1);
          background: rgba(18, 20, 20, .88);
        }

        html[data-rivot-theme="dark"] .rivotShopImage {
          background: rgba(255, 255, 255, .05);
        }

        html[data-rivot-theme="dark"] .rivotShopTags span {
          background: rgba(239, 116, 48, .14);
        }

        @media (max-width: 980px) {
          .rivotShopGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .rivotShop {
            padding: 96px 14px 42px;
          }

          .rivotShopGrid {
            grid-template-columns: 1fr;
          }

          .rivotShopCard {
            grid-template-rows: 230px 1fr;
          }
        }
      `}</style>
    </main>
  );
}
