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
        <div className="productKeyFeaturesIntro">
          <p>Key features</p>
          <h2 id="product-key-features-title">Smarter by <span>design.</span></h2>
        </div>
        <div className="productKeyFeaturesSummary">
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
          min-height: calc(100svh - 88px);
          padding: clamp(64px, 7vw, 96px) clamp(22px, 6vw, 96px);
          overflow: hidden;
          background:
            radial-gradient(circle at 90% 10%, rgba(239, 116, 48, .1), transparent 25%),
            linear-gradient(135deg, #fff 0%, #fafafa 54%, #f1f3f4 100%);
          color: #10161a;
        }

        .productKeyFeaturesHeader {
          display: grid;
          grid-template-columns: minmax(340px, 1fr) minmax(260px, 430px);
          gap: clamp(36px, 6vw, 96px);
          align-items: end;
          margin: 0 auto clamp(38px, 4vw, 56px);
          max-width: 1700px;
        }

        .productKeyFeaturesIntro > p {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 24px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .18em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productKeyFeaturesIntro > p::after {
          content: "";
          width: 70px;
          height: 1px;
          background: currentColor;
          opacity: .72;
        }

        .productKeyFeatures.productKeyFeatures h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(44px, 4.6vw, 64px);
          font-weight: 800;
          line-height: .96;
          letter-spacing: 0;
        }

        .productKeyFeatures.productKeyFeatures h2 span {
          color: #ef7430;
        }

        .productKeyFeaturesSummary {
          display: grid;
          gap: 18px;
          padding-bottom: 5px;
        }

        .productKeyFeaturesSummary > span {
          width: 70px;
          height: 2px;
          background: #ef7430;
        }

        .productKeyFeatures.productKeyFeatures .productKeyFeaturesSummary p {
          max-width: 390px;
          margin: 0;
          color: #5f6b73;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
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
          min-height: clamp(400px, 33vw, 570px);
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 18px;
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
          background:
            linear-gradient(180deg, rgba(0,0,0,.03) 26%, rgba(0,0,0,.94) 100%),
            linear-gradient(90deg, rgba(0,0,0,.18), transparent 65%);
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
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .15em;
        }

        .productKeyFeatureCopy > span::after {
          content: "";
          width: 34px;
          height: 2px;
          background: currentColor;
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
          font-size: 15px;
          font-weight: 500;
          line-height: 1.42;
        }

        .productKeyFeaturesHint {
          display: none;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeatures {
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .08), transparent 28%),
            linear-gradient(180deg, #080909 0%, #0d0f0f 100%) !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeaturesRail {
          background: transparent !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeatures.productKeyFeatures h2 {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeatures.productKeyFeatures h2 span,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeaturesIntro > p {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeatures.productKeyFeatures .productKeyFeaturesSummary p {
          color: #aeb4b4 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productKeyFeatureCard {
          border-color: rgba(255, 255, 255, .12);
          box-shadow: 0 22px 52px rgba(0, 0, 0, .38);
        }

        @media (max-width: 1050px) {
          .productKeyFeaturesHeader {
            grid-template-columns: 1fr 1fr;
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

          .productKeyFeaturesIntro > p {
            margin-bottom: 24px;
            font-size: 12px;
          }

          .productKeyFeatures.productKeyFeatures h2 {
            max-width: 330px;
            font-size: clamp(39px, 12vw, 48px);
            line-height: .96;
          }

          .productKeyFeaturesSummary {
            margin-top: 22px;
          }

          .productKeyFeatures.productKeyFeatures .productKeyFeaturesSummary p {
            max-width: 330px;
            font-size: 15px;
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
