import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import detailImage from "@/asset/images/Details/Main detail photo.png";
import bootImage from "@/asset/images/Details/Boot space with helmet.png";
import floorImage from "@/asset/images/Details/Floorboard photo.png";
import discImage from "@/asset/images/last/Disc.png";
import motorImage from "@/asset/images/last/Motor-card.jpg";

type DetailCard = {
  title: string;
  copy: string;
  image: StaticImageData;
  className: string;
};

const designDetails: DetailCard[] = [
  {
    title: "Two tone seat",
    copy: "Improved ergonomics and comfort.",
    image: bootImage,
    className: "seat",
  },
  {
    title: "Dual disc control",
    copy: "Confidence when traffic changes.",
    image: discImage,
    className: "wheel",
  },
  {
    title: "Body coloured mirrors",
    copy: "A cleaner look from every angle.",
    image: detailImage,
    className: "mirror",
  },
  {
    title: "New grab handle",
    copy: "Hold on tight.",
    image: floorImage,
    className: "grab",
  },
  {
    title: "Protected drivetrain",
    copy: "Built for dust, water, and daily use.",
    image: motorImage,
    className: "drive",
  },
];

export function ProductDesignDetails() {
  return (
    <section className="productDesignDetails" aria-labelledby="product-design-details-title">
      <div className="productDesignIntro">
        <p><span>03</span> Design</p>
        <h2 id="product-design-details-title">A closer look at what makes it unique.</h2>
        <small>Thoughtful details. Everyday comfort. Timeless RIVOT style.</small>
        <Link href="/products#details">Explore Design <span aria-hidden="true">{"\u2192"}</span></Link>
      </div>

      <div className="productDesignGrid">
        {designDetails.map((detail) => (
          <article className={`productDesignCard ${detail.className}`} key={detail.title}>
            <Image src={detail.image} alt="" fill sizes="(max-width: 900px) 100vw, 28vw" />
            <div className="productDesignShade" aria-hidden="true" />
            <div>
              <h3>{detail.title}</h3>
              <p>{detail.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .productDesignDetails {
          display: grid;
          grid-template-columns: minmax(270px, 380px) minmax(0, 1fr);
          gap: clamp(34px, 5vw, 76px);
          align-items: center;
          min-height: 100vh;
          padding: clamp(76px, 8vw, 112px) clamp(26px, 6vw, 96px);
          background:
            radial-gradient(circle at 12% 8%, rgba(239, 116, 48, .08), transparent 28%),
            linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
          color: #080808;
        }

        .productDesignIntro {
          min-width: 0;
          padding-left: 0;
        }

        .productDesignIntro p {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 28px;
          color: #111;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .18em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productDesignIntro p span {
          letter-spacing: 0;
          color: #111;
        }

        .productDesignIntro p::after {
          content: "";
          width: 48px;
          height: 1px;
          background: #ef7430;
        }

        .productDesignIntro h2 {
          max-width: 340px;
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 800;
          line-height: .98;
          letter-spacing: 0;
        }

        .productDesignIntro small {
          display: block;
          max-width: 290px;
          margin-top: 20px;
          color: #64717a;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.38;
        }

        .productDesignIntro a {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
          color: #111;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color .2s ease, transform .2s ease;
        }

        .productDesignIntro a:hover,
        .productDesignIntro a:focus-visible {
          color: #ef7430;
          outline: none;
          transform: translateX(3px);
        }

        .productDesignGrid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: minmax(210px, 1fr);
          gap: 14px;
          min-width: 0;
        }

        .productDesignCard {
          position: relative;
          min-height: 220px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: #edf0f1;
          box-shadow: 0 18px 42px rgba(17, 17, 17, .08);
          transform: none;
        }

        .productDesignCard img {
          inset: -4% !important;
          width: 108% !important;
          height: 108% !important;
          object-fit: cover;
          transition: transform .35s ease;
        }

        .productDesignCard:hover img {
          transform: scale(1.035);
        }

        .productDesignShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, rgba(255,255,255,.88), rgba(255,255,255,.26) 55%, rgba(0,0,0,.12));
          z-index: 1;
        }

        .productDesignCard div:last-child {
          position: relative;
          z-index: 2;
          padding: clamp(20px, 2vw, 28px);
          color: #111;
        }

        .productDesignCard h3 {
          max-width: 210px;
          margin: 0;
          color: #111;
          font-size: clamp(20px, 1.55vw, 24px);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .productDesignCard p {
          max-width: 230px;
          margin: 9px 0 0;
          color: #5d666d;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.3;
        }

        .productDesignCard.seat {
          grid-column: span 2;
        }

        .productDesignCard.wheel {
          grid-column: span 2;
        }

        .productDesignCard.mirror {
          grid-column: span 2;
        }

        .productDesignCard.grab {
          grid-column: span 3;
        }

        .productDesignCard.drive {
          grid-column: span 3;
        }

        .productDesignCard.wheel .productDesignShade,
        .productDesignCard.drive .productDesignShade {
          background: linear-gradient(110deg, rgba(0,0,0,.48), rgba(0,0,0,.08) 56%, rgba(255,255,255,.08));
        }

        .productDesignCard.wheel h3,
        .productDesignCard.wheel p,
        .productDesignCard.drive h3,
        .productDesignCard.drive p {
          color: #fff;
          text-shadow: 0 8px 18px rgba(0, 0, 0, .35);
        }

        .productDesignCard.wheel p,
        .productDesignCard.drive p {
          color: rgba(255, 255, 255, .78);
        }

        @media (max-width: 1000px) {
          .productDesignDetails {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-block: 64px;
          }

          .productDesignIntro {
            padding-left: 0;
          }

          .productDesignIntro h2,
          .productDesignIntro small {
            max-width: 620px;
          }
        }

        @media (max-width: 720px) {
          .productDesignDetails {
            padding: 48px 14px 56px;
          }

          .productDesignGrid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }

          .productDesignCard,
          .productDesignCard:hover img {
            transform: none;
          }

          .productDesignCard.seat,
          .productDesignCard.wheel,
          .productDesignCard.mirror,
          .productDesignCard.grab,
          .productDesignCard.drive {
            grid-column: auto;
          }

          .productDesignCard {
            min-height: 240px;
          }

          .productDesignIntro h2 {
            font-size: 42px;
          }
        }
      `}</style>
    </section>
  );
}
