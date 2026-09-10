import Link from "next/link";

type ProductPerformanceBandProps = {
  modelName: string;
};

const performanceCards = [
  {
    label: "4.4 kWh",
    title: "Battery",
    copy: "Power built for long daily rides.",
    tone: "orange",
    icon: "bolt",
  },
  {
    label: "100 km/h",
    title: "Top Speed",
    copy: "Ready when the road opens up.",
    tone: "blue",
    icon: "gauge",
  },
  {
    label: "200 km",
    title: "Range",
    copy: "Go further between charges.",
    tone: "green",
    icon: "pin",
  },
  {
    label: "35 min",
    title: "Flash Charger",
    copy: "Fast charging for quick daily turnarounds.",
    tone: "amber",
    icon: "bolt",
  },
];

function PerformanceIcon({ icon }: { icon: string }) {
  if (icon === "gauge") {
    return (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M8 27a12 12 0 0 1 24 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 27l7-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 27h2M26 27h2M13.5 18.5l1.5 1.5M26.5 18.5L25 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "pin") {
    return (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 35s10-9.2 10-19A10 10 0 0 0 10 16c0 9.8 10 19 10 19Z" fill="currentColor" />
        <circle cx="20" cy="16" r="3.7" fill="#fff" />
      </svg>
    );
  }

  if (icon === "disc") {
    return (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="3" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <path d="M20 7v5M31 20h-5M20 28v5M9 20h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M22 4L10 22h9l-2 14 13-20h-9l1-12Z" fill="currentColor" />
    </svg>
  );
}

export function ProductPerformanceBand({ modelName }: ProductPerformanceBandProps) {
  return (
    <section className="productPerformanceBand" id="performance" aria-label={`${modelName} performance highlights`}>
      <div className="productPerformanceScene">
        <div className="productPerformanceCopy">
          <p>Performance</p>
          <h2>
            Power. Speed. Range. <span>Safety.</span>
          </h2>
          <small>Ready. Set. Ride.</small>
          <Link href="/test-ride">Feel the Difference <span aria-hidden="true">{"\u2192"}</span></Link>
          <b>Built for a bolder tomorrow.</b>
        </div>

        <div className="productPerformanceMetricGrid">
          {performanceCards.map((card) => (
            <article className="productPerformanceMetric" data-tone={card.tone} key={card.title}>
              <span aria-hidden="true">
                <PerformanceIcon icon={card.icon} />
              </span>
              <div>
                <h3>{card.label}</h3>
                <p>{card.title}</p>
                <i aria-hidden="true" />
                <small>{card.copy}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .productPerformanceBand {
          padding: 0;
          background: #f7f7f5;
          color: #080808;
        }

        .productPerformanceScene {
          position: relative;
          display: grid;
          grid-template-columns: minmax(260px, .88fr) minmax(430px, 1.48fr);
          gap: clamp(24px, 4vw, 54px);
          align-items: center;
          min-height: calc(100svh - 88px);
          overflow: hidden;
          border: 0;
          border-radius: 0;
          padding: clamp(34px, 4.2vw, 56px);
          background:
            radial-gradient(circle at 24% 72%, rgba(239, 116, 48, .12), transparent 28%),
            radial-gradient(circle at 86% 16%, rgba(239, 116, 48, .08), transparent 25%),
            linear-gradient(135deg, #fff 0%, #f8f8f8 58%, #eef1f3 100%);
          box-shadow: none;
          isolation: isolate;
        }

        .productPerformanceScene::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            linear-gradient(115deg, rgba(255, 255, 255, .92) 0 38%, rgba(255, 255, 255, .62) 58%, rgba(239, 116, 48, .04)),
            repeating-linear-gradient(90deg, rgba(17,17,17,.035) 0 1px, transparent 1px 92px);
        }

        .productPerformanceScene::after {
          content: "";
          position: absolute;
          left: 26%;
          right: 34%;
          bottom: 23%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(239, 116, 48, .42), transparent);
          box-shadow: 0 0 24px rgba(239, 116, 48, .18);
          transform: rotate(-2deg);
          z-index: -1;
        }

        .productPerformanceCopy {
          position: relative;
          z-index: 3;
          display: grid;
          align-content: center;
          min-height: 420px;
        }

        .productPerformanceCopy p {
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

        .productPerformanceCopy p::after {
          content: "";
          width: 70px;
          height: 1px;
          background: currentColor;
          opacity: .72;
        }

        .productPerformanceCopy h2 {
          max-width: 410px;
          margin: 0;
          color: #080808;
          font-size: 48px;
          font-weight: 800;
          line-height: .96;
          letter-spacing: 0;
        }

        .productPerformanceCopy h2 span {
          color: #ef7430;
        }

        .productPerformanceCopy small {
          display: block;
          margin-top: 24px;
          color: #5f6b73;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.45;
        }

        .productPerformanceCopy a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: fit-content;
          min-height: 54px;
          margin-top: 34px;
          padding: 0 30px;
          border: 1px solid #ef7430;
          border-radius: 999px;
          background: #ef7430;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }

        .productPerformanceCopy a:hover,
        .productPerformanceCopy a:focus-visible {
          border-color: #ef7430;
          background: #d96120;
          outline: none;
          transform: translateY(-2px);
        }

        .productPerformanceCopy b {
          align-self: end;
          margin-top: 58px;
          color: rgba(17, 17, 17, .42);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .16em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productPerformanceMetricGrid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .productPerformanceMetric {
          display: grid;
          grid-template-columns: 116px minmax(0, 1fr);
          gap: 28px;
          align-items: center;
          min-height: 178px;
          padding: clamp(22px, 2vw, 34px);
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255,255,255,.96), rgba(246,248,248,.9));
          color: #060606;
          box-shadow: 0 20px 38px rgba(17, 17, 17, .08);
          transform: skewX(-8deg);
          backdrop-filter: blur(18px);
        }

        .productPerformanceMetric > * {
          transform: skewX(8deg);
        }

        .productPerformanceMetric > span {
          display: grid;
          width: 96px;
          aspect-ratio: 1;
          place-items: center;
          border-radius: 50%;
          color: #ef7430;
          background: rgba(239, 116, 48, .13);
        }

        .productPerformanceMetric[data-tone="blue"] > span {
          color: #2f85d8;
          background: rgba(47, 133, 216, .14);
        }

        .productPerformanceMetric[data-tone="green"] > span {
          color: #1d934d;
          background: rgba(29, 147, 77, .14);
        }

        .productPerformanceMetric[data-tone="amber"] > span {
          color: #bd6a18;
          background: rgba(239, 166, 67, .18);
        }

        .productPerformanceMetric svg {
          width: 48px;
          height: 48px;
        }

        .productPerformanceMetric h3 {
          margin: 0;
          color: #050505;
          font-size: clamp(24px, 2vw, 32px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0;
        }

        .productPerformanceMetric p {
          margin: 8px 0 0;
          color: #0c0c0c;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.12;
        }

        .productPerformanceMetric i {
          display: block;
          width: 46px;
          height: 2px;
          margin-top: 18px;
          background: currentColor;
          opacity: .55;
        }

        .productPerformanceMetric small {
          display: block;
          margin-top: 18px;
          color: #555b61;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.35;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productPerformanceBand {
          background: #080909 !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productPerformanceScene {
          background:
            radial-gradient(circle at 24% 72%, rgba(239, 116, 48, .1), transparent 30%),
            radial-gradient(circle at 86% 16%, rgba(239, 116, 48, .06), transparent 26%),
            linear-gradient(135deg, #111313 0%, #0d0f0f 58%, #15120f 100%) !important;
          box-shadow: 0 26px 70px rgba(0, 0, 0, .38);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productPerformanceScene::before {
          background:
            linear-gradient(115deg, rgba(17, 19, 19, .94) 0 38%, rgba(17, 19, 19, .62) 58%, rgba(239, 116, 48, .035)),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, .025) 0 1px, transparent 1px 92px);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productPerformanceMetric {
          border-color: rgba(255, 255, 255, .1);
          background: linear-gradient(135deg, #191b1b, #121414);
          color: #f5f5f2;
          box-shadow: 0 20px 38px rgba(0, 0, 0, .3);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.productPerformanceCopy h2, .productPerformanceMetric h3, .productPerformanceMetric p) {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productPerformanceCopy p {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.productPerformanceCopy small, .productPerformanceMetric small, .productPerformanceCopy b) {
          color: #aeb4b4;
        }

        @media (max-width: 1100px) {
          .productPerformanceScene {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .productPerformanceCopy {
            min-height: auto;
          }

        }

        @media (max-width: 760px) {
          .productPerformanceBand {
            padding: 0;
          }

          .productPerformanceScene {
            padding: 28px 16px;
          }

          .productPerformanceMetricGrid {
            grid-template-columns: 1fr;
          }

          .productPerformanceMetric {
            grid-template-columns: 82px minmax(0, 1fr);
            gap: 18px;
            min-height: 138px;
            transform: none;
          }

          .productPerformanceMetric > * {
            transform: none;
          }

          .productPerformanceMetric > span {
            width: 72px;
          }

          .productPerformanceMetric svg {
            width: 36px;
            height: 36px;
          }

          .productPerformanceCopy h2 {
            font-size: 48px;
          }

          .productPerformanceCopy a {
            width: 100%;
          }

          .productPerformanceCopy b {
            margin-top: 36px;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
