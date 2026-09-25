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
    <section className="productCustomMade" id="design" aria-labelledby={`${modelName.replace(/\s+/g, "-").toLowerCase()}-custom-title`}>
      <div className="productCustomCopy">
        <span className="productCustomEyebrow">Make it yours</span>
        <h2 id={`${modelName.replace(/\s+/g, "-").toLowerCase()}-custom-title`}>
          Custom made.<br /><span>For you.</span>
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
          grid-template-columns: minmax(280px, .72fr) minmax(460px, 1.28fr);
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
          min-height: calc(100svh - 88px);
          padding: clamp(54px, 6vw, 84px) clamp(22px, 6vw, 96px);
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 20%, rgba(239, 116, 48, .1), transparent 25%),
            linear-gradient(135deg, #fff 0%, #fafafa 54%, #f1f3f4 100%);
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

        .productCustomEyebrow {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .18em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productCustomEyebrow::after {
          content: "";
          width: 70px;
          height: 1px;
          background: currentColor;
          opacity: .72;
        }

        .productCustomCopy h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(42px, 4vw, 58px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: 0;
        }

        .productCustomCopy h2 span {
          color: #ef7430;
        }

        .productCustomCopy p {
          max-width: 430px;
          margin: 20px 0 0;
          color: #5f6b73;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.55;
        }

        .productCustomPicker {
          display: inline-grid;
          justify-items: start;
          margin-top: clamp(34px, 4vw, 52px);
          padding: 18px 20px 20px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 18px;
          background: rgba(255, 255, 255, .82);
          box-shadow: 0 18px 40px rgba(17, 17, 17, .08);
          backdrop-filter: blur(16px);
        }

        .productCustomPicker strong {
          display: block;
          margin-bottom: 16px;
          color: #111;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.2;
        }

        .productCustomPicker div {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 4px;
          border-radius: 999px;
          background: transparent;
          box-shadow: none;
        }

        .productCustomPicker span {
          display: block;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          box-shadow: 0 0 0 3px #fff, 0 8px 18px rgba(17, 17, 17, .18);
          cursor: pointer;
          transition: transform .2s ease, outline-color .2s ease;
        }

        .productCustomPicker span.isSelected {
          outline: 2px solid #ef7430;
          outline-offset: 4px;
        }

        .productCustomPicker span:hover,
        .productCustomPicker span:focus-visible {
          outline: none;
          transform: translateY(-2px);
        }

        .productCustomStage {
          display: grid;
          min-height: 470px;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 24px;
          background:
            linear-gradient(132deg, transparent 0 58%, rgba(239, 116, 48, .18) 58.2% 58.65%, transparent 58.9%),
            radial-gradient(circle at 72% 20%, rgba(239, 116, 48, .22), transparent 31%),
            linear-gradient(145deg, #1b1e1e, #0c0e0e 72%);
          box-shadow: 0 28px 60px rgba(17, 17, 17, .18);
        }

        .productCustomStage img {
          position: relative;
          z-index: 2;
          width: min(82%, 620px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 28px 34px rgba(0, 0, 0, .48));
          transform: translateY(-18px);
        }

        .productCustomGlow {
          position: absolute;
          width: min(78%, 580px);
          aspect-ratio: 1.28;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 116, 48, .2), rgba(10, 12, 12, 0) 64%);
        }

        .productCustomPlinth {
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: 38px;
          height: clamp(42px, 4vw, 62px);
          border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 50%;
          background:
            radial-gradient(ellipse, rgba(239, 116, 48, .16), rgba(255, 255, 255, .04) 58%, rgba(0, 0, 0, .25)),
            #181b1b;
          box-shadow: 0 18px 38px rgba(0, 0, 0, .42);
        }

        .productCustomPlinth::after {
          content: "";
          position: absolute;
          left: 6%;
          right: 6%;
          top: 14px;
          height: 1px;
          background: rgba(239, 116, 48, .42);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomMade {
          background:
            radial-gradient(circle at 84% 18%, rgba(239, 116, 48, .09), transparent 30%),
            linear-gradient(180deg, #080909 0%, #0d0f0f 100%) !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomMade::before {
          background:
            linear-gradient(132deg, transparent 0 58%, rgba(239, 116, 48, .12) 58.2% 58.5%, transparent 58.8%),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, .025) 0 1px, transparent 1px 112px);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomCopy h2 {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomCopy h2 span,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomEyebrow {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomCopy p {
          color: #aeb4b4 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPicker {
          border-color: rgba(255, 255, 255, .11);
          background: rgba(24, 27, 27, .92) !important;
          color: #f5f5f2 !important;
          box-shadow: 0 14px 34px rgba(0, 0, 0, .32);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPicker strong {
          color: #dfe2e2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPicker div {
          border: 0;
          background: transparent;
          box-shadow: none;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPicker span {
          box-shadow: 0 0 0 4px #242727, 0 10px 22px rgba(0, 0, 0, .38);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomGlow {
          background: radial-gradient(circle, rgba(239, 116, 48, .16), rgba(8, 9, 9, 0) 64%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomStage img {
          filter: drop-shadow(0 26px 30px rgba(0, 0, 0, .5));
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPlinth {
          border-color: rgba(255, 255, 255, .12);
          background:
            radial-gradient(ellipse, rgba(239, 116, 48, .16), rgba(255, 255, 255, .04) 58%, rgba(0, 0, 0, .25)),
            #181b1b;
          box-shadow: 0 18px 38px rgba(0, 0, 0, .42);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productCustomPlinth::after {
          background: rgba(255, 255, 255, .13);
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
            min-height: 420px;
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
            min-height: 320px;
            border-radius: 18px;
          }

          .productCustomStage img {
            width: 94%;
          }
        }
      `}</style>
    </section>
  );
}
