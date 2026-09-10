import type { ModelComparisonColumn, ModelComparisonRow } from "@/data/modelComparison";
import { Battery, Gauge, IndianRupee, Navigation, Settings, ShieldCheck, ShoppingBag, Zap } from "lucide-react";

const comparisonIcons = {
  battery: Battery,
  range: Navigation,
  topSpeed: Gauge,
  charge: Zap,
  ride: Settings,
  safety: ShieldCheck,
  utility: ShoppingBag,
  startingFrom: IndianRupee,
} as const;

type ModelComparisonProps = {
  eyebrow?: string;
  title?: string;
  rows: ModelComparisonRow[];
  models: ModelComparisonColumn[];
};

export function ModelComparison({
  eyebrow = "Model Comparison",
  title = "Compare NX100 variants.",
  rows,
  models,
}: ModelComparisonProps) {
  return (
    <section className="modelComparison" id="model-comparison" aria-labelledby="model-comparison-title">
      <div className="modelComparisonShell">
        <div className="modelComparisonHead">
          <p><span aria-hidden="true" />{eyebrow}<span aria-hidden="true" /></p>
          <h2 id="model-comparison-title">
            {title === "Compare NX100 variants." ? <>Compare NX100 <strong>variants.</strong></> : title}
          </h2>
          <small>Two personalities. The same electric spirit.</small>
        </div>

        <div className="modelComparisonTable" role="table" aria-label="NX100 model comparison">
          <div className="modelComparisonRow modelComparisonHeader" role="row">
            <div role="columnheader">Specifications</div>
            {models.map((model) => (
              <div className="modelComparisonVariant" data-variant={model.id} role="columnheader" key={model.id}>
                <a href={model.href}>NX100 <span>{model.id === "sport" ? "Sport" : "Pro"}</span></a>
                <small>{model.subtitle}</small>
              </div>
            ))}
          </div>

          {rows.map((row) => {
            const RowIcon = comparisonIcons[row.id as keyof typeof comparisonIcons];

            return (
              <div className="modelComparisonRow" role="row" key={row.id}>
                <div className="modelComparisonLabel" role="rowheader">
                  {RowIcon ? <RowIcon aria-hidden="true" /> : null}
                  <span>{row.label}</span>
                </div>
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
            );
          })}
        </div>
      </div>

      <style>{`
        .modelComparison {
          display: grid;
          min-height: auto;
          padding: clamp(52px, 6vw, 86px) clamp(22px, 7vw, 112px);
          background:
            radial-gradient(circle at 86% 12%, rgba(239, 116, 48, .08), transparent 30%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #111;
          align-items: center;
        }

        .modelComparisonShell {
          width: min(100%, 1280px);
          margin: 0 auto;
        }

        .modelComparisonHead {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: clamp(24px, 3vw, 38px);
          text-align: center;
        }

        .modelComparisonHead p {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 12px;
          color: #ef7430;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .modelComparisonHead p span {
          width: 42px;
          height: 2px;
          background: #ef7430;
        }

        .modelComparisonHead h2 {
          max-width: 760px;
          margin: 0;
          color: #080808;
          font-size: clamp(38px, 4vw, 58px);
          font-weight: 900;
          line-height: .98;
          letter-spacing: -.055em;
        }

        .modelComparisonHead h2 strong {
          color: #ef7430;
          font-weight: inherit;
        }

        .modelComparisonHead > small {
          margin-top: 9px;
          color: #69737b;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
        }

        .modelComparisonTable {
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 20px 55px rgba(17, 17, 17, .09);
        }

        .modelComparisonRow {
          display: grid;
          grid-template-columns: minmax(220px, .82fr) repeat(2, minmax(0, 1fr));
          align-items: center;
          min-height: 58px;
          border-bottom: 1px solid rgba(17, 17, 17, .08);
        }

        .modelComparisonRow:last-child {
          border-bottom: 0;
        }

        .modelComparisonRow > div {
          display: flex;
          height: 100%;
          min-height: 58px;
          align-items: center;
          justify-content: center;
          min-width: 0;
          padding: 11px clamp(18px, 2.4vw, 32px);
          border-left: 1px solid rgba(17, 17, 17, .08);
          color: #111;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.32;
          text-align: center;
        }

        .modelComparisonRow > div:first-child {
          border-left: 0;
        }

        .modelComparisonRow > div:nth-child(2) {
          background: rgba(239, 116, 48, .075);
        }

        .modelComparisonLabel,
        .modelComparisonHeader > div:first-child {
          justify-content: flex-start !important;
          gap: 14px;
          color: #626a70 !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          text-align: left !important;
        }

        .modelComparisonLabel svg {
          width: 18px;
          height: 18px;
          flex: 0 0 auto;
          stroke-width: 1.7;
        }

        .modelComparisonHeader {
          min-height: 92px;
          background: #fff;
        }

        .modelComparisonVariant {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .modelComparisonVariant::before {
          content: "";
          position: absolute;
          inset: 0 0 auto;
          height: 3px;
          background: #81878c;
        }

        .modelComparisonVariant[data-variant="sport"]::before {
          background: #ef7430;
        }

        .modelComparisonVariant a {
          width: fit-content;
          color: #10161a;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .modelComparisonVariant a:hover,
        .modelComparisonVariant a:focus-visible {
          color: #ef7430;
          outline: none;
        }

        .modelComparisonVariant a span {
          color: #ef7430;
        }

        .modelComparisonVariant small {
          max-width: 260px;
          color: #69737b;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.35;
        }

        .modelComparisonPrice {
          color: #10161a !important;
          font-size: 20px !important;
          font-weight: 900 !important;
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
            margin-bottom: 24px;
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

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparison {
          background:
            radial-gradient(circle at 86% 12%, rgba(239, 116, 48, .09), transparent 30%),
            linear-gradient(180deg, #080909 0%, #0d0f0f 100%) !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonShell {
          background: transparent !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonTable {
          border-color: rgba(255, 255, 255, .12);
          background: #151717;
          box-shadow: 0 22px 58px rgba(0, 0, 0, .38);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.modelComparisonRow, .modelComparisonRow > div) {
          border-color: rgba(255, 255, 255, .1);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonRow {
          background: #151717;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonRow > div {
          color: #e9ebeb;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonRow > div:nth-child(2) {
          background: rgba(239, 116, 48, .11);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonHeader {
          background: #181a1a;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.modelComparisonHead h2, .modelComparisonVariant a, .modelComparisonPrice) {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.modelComparisonHead > small, .modelComparisonVariant small, .modelComparisonLabel, .modelComparisonHeader > div:first-child) {
          color: #aeb4b4 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .modelComparisonHead p {
          color: #ef7430 !important;
        }
      `}</style>
    </section>
  );
}
