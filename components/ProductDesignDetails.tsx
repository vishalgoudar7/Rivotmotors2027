import Image, { type StaticImageData } from "next/image";
import bootImage from "@/asset/images/Details/Boot space with helmet.png";
import floorImage from "@/asset/images/Details/Floorboard photo.png";
import discImage from "@/asset/images/last/Disc.png";
import motorImage from "@/asset/images/last/Motor-card.jpg";
import sideFootrestImage from "@/asset/models/pro/Left side view.png";

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
    title: "Side Footrest",
    copy: "Added comfort and support for your passenger.",
    image: sideFootrestImage,
    className: "mirror footrest",
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
    <section className="productDesignDetails" id="details" aria-labelledby="product-design-details-title">
      <div className="productDesignIntro">
        <p><span>03</span> Design</p>
        <h2 id="product-design-details-title">A closer look at what makes it <span>unique.</span></h2>
        <small>Thoughtful details. Everyday comfort. Timeless RIVOT style.</small>
      </div>

      <div className="productDesignGrid">
        {designDetails.map((detail) => (
          <article className={`productDesignCard ${detail.className}`} key={detail.title}>
            <Image
              src={detail.image}
              alt={detail.className.includes("footrest") ? "RIVOT scooter side passenger footrest" : ""}
              fill
              sizes="(max-width: 900px) 100vw, 28vw"
            />
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
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
          min-height: calc(100svh - 88px);
          padding: clamp(64px, 7vw, 96px) clamp(26px, 6vw, 96px);
          background:
            radial-gradient(circle at 8% 18%, rgba(239, 116, 48, .1), transparent 25%),
            linear-gradient(135deg, #fff 0%, #fafafa 54%, #f1f3f4 100%);
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
          color: #ef7430;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .18em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productDesignIntro p span {
          letter-spacing: 0;
          color: inherit;
        }

        .productDesignIntro p::after {
          content: "";
          width: 70px;
          height: 1px;
          background: #ef7430;
        }

        .productDesignIntro h2 {
          max-width: 370px;
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 800;
          line-height: .98;
          letter-spacing: 0;
        }

        .productDesignIntro h2 span {
          color: #ef7430;
        }

        .productDesignIntro small {
          display: block;
          max-width: 330px;
          margin-top: 24px;
          color: #5f6b73;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.38;
        }

        .productDesignGrid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: minmax(230px, 1fr);
          gap: 16px;
          min-width: 0;
        }

        .productDesignCard {
          position: relative;
          min-height: 230px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 18px;
          background: #171919;
          box-shadow: 0 20px 44px rgba(17, 17, 17, .12);
          transform: none;
        }

        .productDesignCard img {
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          transition: transform .45s ease;
        }

        .productDesignCard:hover img {
          transform: scale(1.045);
        }

        .productDesignCard.footrest img {
          object-fit: cover;
          object-position: center 62%;
        }

        .productDesignShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,.05) 22%, rgba(0,0,0,.82) 100%),
            linear-gradient(90deg, rgba(0,0,0,.24), transparent 66%);
          z-index: 1;
        }

        .productDesignCard div:last-child {
          position: absolute;
          inset: auto 0 0;
          z-index: 2;
          padding: clamp(20px, 2vw, 28px);
          color: #fff;
        }

        .productDesignCard div:last-child::before {
          content: "";
          display: block;
          width: 38px;
          height: 3px;
          margin-bottom: 12px;
          border-radius: 999px;
          background: #ef7430;
        }

        .productDesignCard h3 {
          max-width: 210px;
          margin: 0;
          color: #fff;
          font-size: clamp(21px, 1.55vw, 26px);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .productDesignCard p {
          max-width: 230px;
          margin: 9px 0 0;
          color: rgba(255, 255, 255, .78);
          font-size: 16px;
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

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignDetails {
          background:
            radial-gradient(circle at 12% 8%, rgba(239, 116, 48, .08), transparent 30%),
            linear-gradient(180deg, #080909 0%, #0d0f0f 100%) !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro h2 {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro h2 span {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro p {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro p span {
          color: #ef7430;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro small {
          color: #aeb4b4;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignCard {
          border-color: rgba(255, 255, 255, .12) !important;
          background: #151717 !important;
          box-shadow: 0 18px 42px rgba(0, 0, 0, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignShade {
          background:
            linear-gradient(180deg, rgba(0,0,0,.08) 22%, rgba(0,0,0,.88) 100%),
            linear-gradient(90deg, rgba(0,0,0,.3), transparent 66%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.productDesignCard h3, .productDesignCard p) {
          color: #fff !important;
          text-shadow: 0 5px 18px rgba(0, 0, 0, .58);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignCard p {
          color: rgba(255, 255, 255, .8) !important;
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
            min-height: 270px;
          }

          .productDesignIntro h2 {
            font-size: 42px;
          }

        }
      `}</style>
    </section>
  );
}
