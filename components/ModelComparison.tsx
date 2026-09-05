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
                <a href={model.href}>{model.name}</a>
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
        </div>
      </div>

      <style>{`
        .modelComparison {
          display: grid;
          min-height: calc(100vh - 82px);
          padding: clamp(28px, 3.2vw, 42px) clamp(22px, 7vw, 112px);
          background:
            radial-gradient(circle at 86% 12%, rgba(239, 116, 48, .08), transparent 30%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #111;
          align-items: center;
        }

        .modelComparisonShell {
          width: min(100%, 1180px);
          margin: 0 auto;
        }

        .modelComparisonHead {
          display: grid;
          grid-template-columns: minmax(190px, .52fr) minmax(0, 1fr);
          gap: clamp(24px, 4vw, 58px);
          align-items: end;
          margin-bottom: clamp(18px, 2.4vw, 28px);
        }

        .modelComparisonHead p {
          margin: 0;
          color: #ef7430;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .modelComparisonHead h2 {
          max-width: 620px;
          margin: 0;
          color: #10161a;
          font-size: clamp(38px, 3.2vw, 48px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: 0;
        }

        .modelComparisonTable {
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: rgba(255, 255, 255, .72);
          box-shadow: 0 18px 44px rgba(17, 17, 17, .06);
        }

        .modelComparisonRow {
          display: grid;
          grid-template-columns: minmax(180px, .85fr) repeat(2, minmax(0, 1fr));
          column-gap: clamp(20px, 4vw, 58px);
          align-items: center;
          min-height: 52px;
          padding: 0 clamp(20px, 3vw, 34px);
          border-bottom: 1px solid rgba(17, 17, 17, .08);
        }

        .modelComparisonRow > div {
          min-width: 0;
          color: #111;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.32;
        }

        .modelComparisonLabel,
        .modelComparisonHeader > div:first-child {
          color: #6a737b !important;
          font-size: 13px !important;
          font-weight: 700 !important;
        }

        .modelComparisonHeader {
          min-height: 84px;
          background: rgba(248, 248, 248, .78);
        }

        .modelComparisonVariant {
          display: grid;
          align-content: center;
          gap: 5px;
        }

        .modelComparisonVariant span {
          color: #ef7430;
          font-size: 13px;
          font-weight: 700;
        }

        .modelComparisonVariant a {
          width: fit-content;
          color: #10161a;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .modelComparisonVariant a:hover,
        .modelComparisonVariant a:focus-visible {
          color: #ef7430;
          outline: none;
        }

        .modelComparisonVariant small {
          max-width: 260px;
          color: #69737b;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.35;
        }

        .modelComparisonPrice {
          color: #10161a !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          letter-spacing: 0;
        }

        @media (max-width: 760px) {
          .modelComparison {
            padding: 54px 14px 64px;
          }

          .modelComparisonHead h2 {
            font-size: 42px;
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
            border-radius: 8px;
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
            color: #ef7430;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
          }
        }
      `}</style>
    </section>
  );
}
