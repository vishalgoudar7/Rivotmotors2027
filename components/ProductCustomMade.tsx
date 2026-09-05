import Image, { type StaticImageData } from "next/image";

type ProductCustomMadeProps = {
  modelName: string;
  image: StaticImageData;
  imageAlt: string;
};

const colorOptions = [
  { name: "Pearl White", value: "#FCFCFC", selected: true },
  { name: "Urban Grey", value: "#757180" },
  { name: "RIVOT Red", value: "#CD2E30" },
  { name: "Stealth Black", value: "#050505" },
  { name: "Blue Grey", value: "#C3CADB" },
];

export function ProductCustomMade({ modelName, image, imageAlt }: ProductCustomMadeProps) {
  const selectedColor = colorOptions.find((color) => color.selected) || colorOptions[0];

  return (
    <section className="productCustomMade" aria-labelledby={`${modelName.replace(/\s+/g, "-").toLowerCase()}-custom-title`}>
      <div className="productCustomCopy">
        <h2 id={`${modelName.replace(/\s+/g, "-").toLowerCase()}-custom-title`}>
          Custom made.<br />For you
        </h2>
        <p>Go glossy. Go matte. Choose your RIVOT vibe here.</p>

        <div className="productCustomPicker" aria-label={`${modelName} colour options`}>
          <strong>{selectedColor.name}</strong>
          <div>
            {colorOptions.map((color) => (
              <span
                aria-label={color.name}
                aria-pressed={Boolean(color.selected)}
                key={color.name}
                role="button"
                style={{ backgroundColor: color.value }}
                className={color.selected ? "isSelected" : ""}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="productCustomStage">
        <div className="productCustomGlow" aria-hidden="true" />
        <Image src={image} alt={imageAlt} sizes="(max-width: 800px) 92vw, 54vw" />
        <div className="productCustomPlinth" aria-hidden="true" />
      </div>

      <style>{`
        .productCustomMade {
          position: relative;
          display: grid;
          grid-template-columns: minmax(260px, .58fr) minmax(360px, .82fr);
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
          min-height: 480px;
          padding: clamp(46px, 5vw, 70px) clamp(22px, 7vw, 112px);
          overflow: hidden;
          background:
            radial-gradient(circle at 84% 18%, rgba(239, 116, 48, .07), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #111;
        }

        .productCustomMade::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(132deg, transparent 0 58%, rgba(239, 116, 48, .08) 58.2% 58.5%, transparent 58.8%),
            repeating-linear-gradient(90deg, rgba(17, 17, 17, .025) 0 1px, transparent 1px 112px);
          pointer-events: none;
        }

        .productCustomCopy,
        .productCustomStage {
          position: relative;
          z-index: 1;
        }

        .productCustomCopy h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(38px, 3.4vw, 48px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: 0;
        }

        .productCustomCopy p {
          max-width: 430px;
          margin: 20px 0 0;
          color: #5f6b73;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
        }

        .productCustomPicker {
          display: inline-grid;
          justify-items: center;
          margin-top: clamp(34px, 4.6vw, 58px);
        }

        .productCustomPicker strong {
          display: block;
          margin-bottom: 14px;
          color: #111;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
        }

        .productCustomPicker div {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .86);
          box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
          backdrop-filter: blur(16px);
        }

        .productCustomPicker span {
          display: block;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          box-shadow: 0 0 0 4px #fff, 0 10px 22px rgba(17, 17, 17, .18);
          cursor: pointer;
          transition: transform .2s ease, outline-color .2s ease;
        }

        .productCustomPicker span.isSelected {
          outline: 3px solid rgba(239, 116, 48, .32);
          outline-offset: 3px;
        }

        .productCustomPicker span:hover,
        .productCustomPicker span:focus-visible {
          outline: none;
          transform: translateY(-2px);
        }

        .productCustomStage {
          display: grid;
          min-height: 360px;
          place-items: center;
        }

        .productCustomStage img {
          position: relative;
          z-index: 2;
          width: min(86%, 560px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 24px 28px rgba(17, 17, 17, .16));
          transform: translateY(-10px);
        }

        .productCustomGlow {
          position: absolute;
          width: min(74%, 540px);
          aspect-ratio: 1.28;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 116, 48, .12), rgba(255, 255, 255, 0) 62%);
        }

        .productCustomPlinth {
          position: absolute;
          left: 13%;
          right: 9%;
          bottom: 22px;
          height: clamp(48px, 5.4vw, 78px);
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 50% 50% 8px 8px / 42% 42% 8px 8px;
          background:
            linear-gradient(180deg, #fff, #eef0ef),
            #fff;
          box-shadow: 0 16px 34px rgba(17, 17, 17, .08);
        }

        .productCustomPlinth::after {
          content: "";
          position: absolute;
          left: 6%;
          right: 6%;
          top: 14px;
          height: 1px;
          background: rgba(17, 17, 17, .16);
        }

        @media (max-width: 900px) {
          .productCustomMade {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .productCustomPicker {
            margin-top: 34px;
          }

          .productCustomStage {
            min-height: 340px;
          }
        }

        @media (max-width: 560px) {
          .productCustomMade {
            padding: 38px 18px 50px;
          }

          .productCustomCopy h2 {
            font-size: 40px;
          }

          .productCustomCopy p {
            margin-top: 22px;
            font-size: 15px;
          }

          .productCustomPicker strong {
            font-size: 13px;
          }

          .productCustomPicker span {
            width: 34px;
            height: 34px;
          }

          .productCustomStage {
            min-height: 280px;
          }

          .productCustomStage img {
            width: 102%;
          }
        }
      `}</style>
    </section>
  );
}
