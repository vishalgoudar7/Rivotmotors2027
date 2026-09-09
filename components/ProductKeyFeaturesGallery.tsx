import Image, { type StaticImageData } from "next/image";

import antiTheftImage from "@/asset/newphotos/key features/antitheft.jpg";
import dashCamImage from "@/asset/newphotos/key features/dashcam.jpg";
import patternLockImage from "@/asset/newphotos/key features/pattern lock.jpg";
import tpmsImage from "@/asset/newphotos/key features/tpms.jpg";

type Feature = {
  title: string;
  description: string;
  image: StaticImageData;
  imagePosition?: string;
};

const features: Feature[] = [
  {
    title: "TPMS",
    description: "Real-time tyre monitoring keeps every ride ready.",
    image: tpmsImage,
    imagePosition: "center",
  },
  {
    title: "Anti Theft",
    description: "Smart lock protection for stronger everyday security.",
    image: antiTheftImage,
    imagePosition: "center",
  },
  {
    title: "Pattern Lock",
    description: "Secure, familiar access built into your RIVOT.",
    image: patternLockImage,
    imagePosition: "center",
  },
  {
    title: "Dash Cam",
    description: "Ride-aware visibility through an active front camera.",
    image: dashCamImage,
    imagePosition: "center",
  },
];

export function ProductKeyFeaturesGallery() {
  return (
    <section className="productKeyFeatures" id="key-features" aria-labelledby="product-key-features-title">
      <header className="productKeyFeaturesHeader">
        <p><span aria-hidden="true" /> Key features</p>
        <h2 id="product-key-features-title">Smarter by design.</h2>
        <div>
          <span aria-hidden="true" />
          <p>Thoughtful technology that protects, connects and keeps you in control.</p>
        </div>
      </header>

      <div className="productKeyFeaturesRail">
        {features.map((feature, index) => (
          <article className="productKeyFeatureCard" key={feature.title}>
            <Image
              src={feature.image}
              alt={`${feature.title} feature on the RIVOT NX100`}
              fill
              sizes="(max-width: 560px) calc(100vw - 36px), (max-width: 960px) 46vw, 24vw"
              style={{ objectPosition: feature.imagePosition }}
              priority={index === 0}
            />
            <div className="productKeyFeatureShade" aria-hidden="true" />
            <div className="productKeyFeatureCopy">
              <span>0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="productKeyFeaturesHint" aria-hidden="true">
        <span /> Swipe to explore
      </div>

      <style>{`
        .productKeyFeatures {
          padding: clamp(64px, 7vw, 104px) clamp(22px, 6.6vw, 106px);
          overflow: hidden;
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .09), transparent 25%),
            linear-gradient(180deg, #fff 0%, #f7f7f5 100%);
          color: #10161a;
        }

        .productKeyFeaturesHeader {
          display: grid;
          grid-template-columns: minmax(190px, .45fr) minmax(330px, 1fr) minmax(260px, .65fr);
          gap: clamp(24px, 4vw, 72px);
          align-items: end;
          margin: 0 auto clamp(34px, 4vw, 58px);
          max-width: 1700px;
        }

        .productKeyFeaturesHeader > p {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
          color: #ef7430;
          font-size: 13px;
          font-weight: 850;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .productKeyFeaturesHeader > p span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #ef7430;
          box-shadow: 0 0 0 7px rgba(239, 116, 48, .13);
        }

        .productKeyFeatures.productKeyFeatures h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(42px, 5vw, 76px);
          font-weight: 850;
          line-height: .95;
          letter-spacing: -.045em;
        }

        .productKeyFeaturesHeader > div {
          display: grid;
          gap: 16px;
        }

        .productKeyFeaturesHeader > div > span {
          width: 54px;
          height: 3px;
          background: #ef7430;
        }

        .productKeyFeatures.productKeyFeatures .productKeyFeaturesHeader > div p {
          max-width: 390px;
          margin: 0;
          color: #5f6b73;
          font-size: 15px;
          line-height: 1.55;
        }

        .productKeyFeaturesRail {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.2vw, 20px);
          max-width: 1700px;
          margin: 0 auto;
        }

        .productKeyFeatureCard {
          position: relative;
          min-height: clamp(390px, 35vw, 610px);
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 22px;
          background: #171919;
          box-shadow: 0 22px 52px rgba(17, 17, 17, .12);
          isolation: isolate;
        }

        .productKeyFeatureCard img {
          object-fit: cover;
          transition: transform .55s cubic-bezier(.2,.7,.2,1);
        }

        .productKeyFeatureCard:hover img {
          transform: scale(1.035);
        }

        .productKeyFeatureShade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,.05) 30%, rgba(0,0,0,.92) 100%);
        }

        .productKeyFeatureCopy {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          padding: clamp(22px, 2vw, 32px);
        }

        .productKeyFeatureCopy > span {
          display: block;
          margin-bottom: 10px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .15em;
        }

        .productKeyFeatures.productKeyFeatures .productKeyFeatureCopy h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 2vw, 34px);
          font-weight: 850;
          line-height: 1.05;
        }

        .productKeyFeatures.productKeyFeatures .productKeyFeatureCopy p {
          max-width: 300px;
          margin: 9px 0 0;
          color: rgba(255, 255, 255, .72);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.42;
        }

        .productKeyFeaturesHint {
          display: none;
        }

        @media (max-width: 1050px) {
          .productKeyFeaturesHeader {
            grid-template-columns: 1fr 1.4fr;
          }

          .productKeyFeaturesHeader > div {
            grid-column: 2;
          }

          .productKeyFeaturesRail {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .productKeyFeatureCard {
            min-height: 480px;
          }
        }

        @media (max-width: 560px) {
          .productKeyFeatures {
            padding: 54px 18px 58px;
          }

          .productKeyFeaturesHeader {
            display: block;
            margin-bottom: 30px;
          }

          .productKeyFeaturesHeader > p {
            margin-bottom: 24px;
            font-size: 12px;
          }

          .productKeyFeatures.productKeyFeatures h2 {
            max-width: 330px;
            font-size: clamp(39px, 12vw, 48px);
            line-height: .96;
          }

          .productKeyFeaturesHeader > div {
            margin-top: 22px;
          }

          .productKeyFeatures.productKeyFeatures .productKeyFeaturesHeader > div p {
            max-width: 330px;
            font-size: 14px;
          }

          .productKeyFeaturesRail {
            display: flex;
            width: 100%;
            gap: 14px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }

          .productKeyFeaturesRail::-webkit-scrollbar {
            display: none;
          }

          .productKeyFeatureCard {
            flex: 0 0 100%;
            min-height: min(128vw, 500px);
            border-radius: 18px;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          .productKeyFeatureCopy {
            padding: 24px 22px;
          }

          .productKeyFeatures.productKeyFeatures .productKeyFeatureCopy h3 {
            font-size: 28px;
          }

          .productKeyFeaturesHint {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 18px;
            color: #747b7f;
            font-size: 11px;
            font-weight: 750;
            letter-spacing: .12em;
            text-transform: uppercase;
          }

          .productKeyFeaturesHint span {
            width: 42px;
            height: 2px;
            background: #ef7430;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .productKeyFeatureCard img {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
