import Link from "next/link";
import type { ModelComparisonColumn, ModelComparisonRow } from "@/data/modelComparison";

type ModelComparisonProps = {
  eyebrow?: string;
  title?: string;
  rows: ModelComparisonRow[];
  models: ModelComparisonColumn[];
};

export function ModelComparison({
  eyebrow = "Model Details",
  title = "Compare NX100 variants.",
  rows,
  models,
}: ModelComparisonProps) {
  return (
    <section className="modelComparison" id="model-comparison" aria-labelledby="model-comparison-title">
      <div className="modelComparisonShell">
        <div className="modelComparisonHead">
          <p>{eyebrow}</p>
          <h2 id="model-comparison-title">{title}</h2>
        </div>

        <div className="modelComparisonTable" role="table" aria-label="NX100 model comparison">
          <div className="modelComparisonRow modelComparisonHeader" role="row">
            <div role="columnheader">Variant</div>
            {models.map((model) => (
              <div className="modelComparisonVariant" role="columnheader" key={model.id}>
                <span>{model.badge}</span>
                <Link href={model.href}>{model.name}</Link>
                <small>{model.subtitle}</small>
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div className="modelComparisonRow" role="row" key={row.id}>
              <div className="modelComparisonLabel" role="rowheader">{row.label}</div>
              {models.map((model) => (
                <div
                  className={row.id === "startingFrom" ? "modelComparisonPrice" : ""}
                  data-model={model.id === "sport" ? "Sport" : "Pro"}
                  role="cell"
                  key={`${model.id}-${row.id}`}
                >
                  {model.values[row.id]}
                </div>
              ))}
            </div>
          ))}

          <div className="modelComparisonRow modelComparisonActions" role="row">
            <div role="cell" />
            {models.map((model) => (
              <div data-model={model.id === "sport" ? "Sport" : "Pro"} role="cell" key={`${model.id}-actions`}>
                <Link href={model.bookHref}>Book Now</Link>
                <Link href={model.testRideHref}>Test Ride</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .modelComparison {
          padding: clamp(72px, 9vw, 118px) clamp(18px, 7vw, 112px);
          background:
            radial-gradient(circle at 86% 12%, rgba(206, 103, 35, .11), transparent 30%),
            linear-gradient(180deg, #fff 0%, #f8f8f5 100%);
          color: #090909;
        }

        .modelComparisonShell {
          width: min(100%, 1040px);
          margin: 0 auto;
        }

        .modelComparisonHead {
          display: grid;
          grid-template-columns: minmax(180px, .72fr) minmax(0, 1.28fr);
          gap: clamp(22px, 4vw, 62px);
          align-items: end;
          margin-bottom: clamp(28px, 4vw, 52px);
        }

        .modelComparisonHead p {
          margin: 0;
          color: #ce6723;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .modelComparisonHead h2 {
          max-width: 620px;
          margin: 0;
          color: #070707;
          font-size: clamp(38px, 5vw, 68px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: 0;
        }

        .modelComparisonTable {
          width: 100%;
          border-top: 1px solid rgba(9, 9, 9, .09);
        }

        .modelComparisonRow {
          display: grid;
          grid-template-columns: minmax(180px, .85fr) repeat(2, minmax(0, 1fr));
          column-gap: clamp(22px, 4.4vw, 72px);
          align-items: center;
          min-height: 74px;
          border-bottom: 1px solid rgba(9, 9, 9, .09);
        }

        .modelComparisonRow > div {
          min-width: 0;
          color: #080808;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.35;
        }

        .modelComparisonLabel,
        .modelComparisonHeader > div:first-child {
          color: #8a9297 !important;
          font-size: 13px !important;
          font-weight: 800 !important;
        }

        .modelComparisonHeader {
          min-height: 120px;
        }

        .modelComparisonVariant {
          display: grid;
          align-content: center;
          gap: 5px;
        }

        .modelComparisonVariant span {
          color: #ce6723;
          font-size: 13px;
          font-weight: 800;
        }

        .modelComparisonVariant a {
          width: fit-content;
          color: #070707;
          font-size: clamp(24px, 2.2vw, 31px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .modelComparisonVariant a:hover,
        .modelComparisonVariant a:focus-visible {
          color: #ce6723;
          outline: none;
        }

        .modelComparisonVariant small {
          max-width: 260px;
          color: #8a9297;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.35;
        }

        .modelComparisonPrice {
          color: #050505 !important;
          font-size: clamp(22px, 2.2vw, 28px) !important;
          font-weight: 950 !important;
          letter-spacing: 0;
        }

        .modelComparisonActions {
          min-height: 94px;
          border-bottom: 0;
        }

        .modelComparisonActions > div:not(:first-child) {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .modelComparisonActions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 18px;
          border: 1px solid #ce6723;
          border-radius: 999px;
          color: #ce6723;
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }

        .modelComparisonActions a:first-child {
          background: #ce6723;
          color: #fff;
        }

        .modelComparisonActions a:hover,
        .modelComparisonActions a:focus-visible {
          border-color: #a94f1d;
          background: #a94f1d;
          color: #fff;
          outline: none;
        }

        @media (max-width: 760px) {
          .modelComparison {
            padding: 64px 18px 76px;
          }

          .modelComparisonHead {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .modelComparisonTable {
            display: grid;
            gap: 14px;
            border-top: 0;
          }

          .modelComparisonRow {
            grid-template-columns: 1fr;
            gap: 12px;
            min-height: 0;
            padding: 18px;
            border: 1px solid rgba(9, 9, 9, .09);
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 14px 34px rgba(17, 17, 17, .06);
          }

          .modelComparisonHeader {
            display: none;
          }

          .modelComparisonRow > div:not(.modelComparisonLabel) {
            display: grid;
            grid-template-columns: minmax(118px, .75fr) minmax(0, 1fr);
            gap: 12px;
            align-items: baseline;
          }

          .modelComparisonRow > div:not(.modelComparisonLabel)::before {
            content: attr(data-model);
            color: #ce6723;
            font-size: 12px;
            font-weight: 900;
            text-transform: uppercase;
          }

          .modelComparisonActions {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
