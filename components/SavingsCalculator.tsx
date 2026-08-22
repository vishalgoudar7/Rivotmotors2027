"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import silhouetteDetailImage from "@/asset/grayscooty/0030.webp";

const MIN_DAILY_KM = 15;
const MAX_DAILY_KM = 200;
const DEFAULT_DAILY_KM = 60;
const PETROL_COST_PER_KM = 64008 / (DEFAULT_DAILY_KM * 365);
const RIVOT_COST_PER_KM = 8024 / (DEFAULT_DAILY_KM * 365);

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M20 4L10 20H18L16 32L27 15H20V4Z" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M18 5L29 9V17C29 24.4 24.38 29.45 18 32C11.62 29.45 7 24.4 7 17V9L18 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M13 18L16.5 21.5L24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SavingsCalculator() {
  const [dailyKm, setDailyKm] = useState(DEFAULT_DAILY_KM);

  const values = useMemo(() => {
    const annualDistance = dailyKm * 365;
    const petrolAnnual = annualDistance * PETROL_COST_PER_KM;
    const rivotAnnual = annualDistance * RIVOT_COST_PER_KM;
    const annualSavings = petrolAnnual - rivotAnnual;
    const sliderPercent = ((dailyKm - MIN_DAILY_KM) / (MAX_DAILY_KM - MIN_DAILY_KM)) * 100;

    return {
      annualSavings,
      petrolAnnual,
      rivotAnnual,
      sliderPercent,
    };
  }, [dailyKm]);

  return (
    <section className="rivotSavings" aria-label="Finance and savings estimate">
      <div className="rivotSavingsPanel">
        <div className="rivotSavingsVisual" aria-hidden="true">
          <span />
          <Image src={silhouetteDetailImage} alt="" width={430} height={275} sizes="(max-width: 900px) 78vw, 420px" />
        </div>

        <div className="rivotSavingsMain">
          <div className="rivotSavingsHeader">
            <div>
              <p>Finance &amp; Savings</p>
              <h2>
                The math is Simple.
                <br />
                You save big.
              </h2>
            </div>
            <a href="mailto:support@rivotmotors.com">
              Have a Question? <span aria-hidden="true">?</span>
            </a>
          </div>

          <div className="rivotSavingsCards">
            <article>
              <span aria-hidden="true">
                <svg viewBox="0 0 36 36" fill="none">
                  <path d="M12 6H24C26.21 6 28 7.79 28 10V30H12V6Z" stroke="currentColor" strokeWidth="2.4" />
                  <path d="M16 11H24M28 15H31V24C31 25.66 29.66 27 28 27" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <small>Petrol Scooter</small>
              <p>Annual running cost*</p>
              <b>₹ {formatRupees(values.petrolAnnual)}</b>
            </article>

            <article>
              <span aria-hidden="true">
                <BoltIcon />
              </span>
              <small>RIVOT NX100</small>
              <p>Annual running cost*</p>
              <b className="green">₹ {formatRupees(values.rivotAnnual)}</b>
            </article>

            <article>
              <span aria-hidden="true">
                <svg viewBox="0 0 36 36" fill="none">
                  <path d="M18 8C23.52 8 28 11.58 28 16C28 20.42 23.52 24 18 24C12.48 24 8 20.42 8 16C8 11.58 12.48 8 18 8Z" fill="currentColor" />
                  <path d="M12 24L9 29M24 24L27 29" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <small>You Save Annually</small>
              <p>with RIVOT NX100</p>
              <b className="orange">₹ {formatRupees(values.annualSavings)}</b>
            </article>
          </div>

          <div className="rivotSavingsBottom">
            <div className="rivotSavingsUsage">
              <p>What&apos;s your daily usage?</p>
              <b>{dailyKm} km / day</b>
              <label className="rivotSavingsSlider" aria-label="Daily usage in kilometers">
                <input
                  type="range"
                  min={MIN_DAILY_KM}
                  max={MAX_DAILY_KM}
                  value={dailyKm}
                  onChange={(event) => setDailyKm(Number(event.target.value))}
                  style={{ "--rivot-savings-progress": `${values.sliderPercent}%` } as CSSProperties}
                />
                <i style={{ left: `${values.sliderPercent}%` }}>{dailyKm} km</i>
              </label>
              <small><span>{MIN_DAILY_KM} km</span><span>{MAX_DAILY_KM} km</span></small>
            </div>

            <div className="rivotSavingsMetric">
              <BoltIcon />
              <div>
                <b>200 km</b>
                <span>Real range*</span>
              </div>
            </div>

            <div className="rivotSavingsMetric">
              <ShieldIcon />
              <div>
                <b>3.2 Paise/km</b>
                <span>Running cost*</span>
              </div>
            </div>
          </div>

          <p className="rivotSavingsNote">*These are estimated values. Actual results may vary based on usage and conditions.</p>
        </div>
      </div>

      <style jsx>{`
        .rivotSavings {
          padding: clamp(34px, 4vw, 58px) clamp(18px, 3vw, 44px) clamp(52px, 5vw, 76px);
          background: #fff;
          color: #111;
        }

        .rivotSavingsPanel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(340px, 420px) minmax(0, 1fr);
          gap: clamp(26px, 3vw, 54px);
          width: min(100%, 1420px);
          margin: 0 auto;
          overflow: visible;
          border-radius: 0;
          background: #fff;
          box-shadow: none;
        }

        .rivotSavingsVisual {
          position: relative;
          min-height: 500px;
          padding: 0;
        }

        .rivotSavingsVisual span {
          position: absolute;
          top: 54px;
          left: 50%;
          z-index: 0;
          width: clamp(300px, 25vw, 390px);
          aspect-ratio: 1;
          border-radius: 50%;
          background:
            linear-gradient(135deg, transparent 0 42%, #ef7430 43.5% 52.5%, transparent 54%),
            #f5f0ea;
          transform: translateX(-50%);
        }

        .rivotSavingsVisual img {
          position: absolute;
          left: 50%;
          bottom: 4px;
          z-index: 2;
          width: min(78%, 285px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 22px 22px rgba(17, 17, 17, .18));
          transform: translateX(-50%);
        }

        .rivotSavingsMain {
          display: grid;
          align-content: center;
          gap: clamp(16px, 1.5vw, 24px);
          padding: clamp(12px, 1.5vw, 22px) 0;
        }

        .rivotSavingsHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .rivotSavingsHeader p {
          margin: 0 0 10px;
          color: #171717;
          font-size: clamp(14px, .95vw, 17px);
          font-weight: 800;
          line-height: 1.2;
        }

        .rivotSavingsHeader h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(36px, 3vw, 54px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: -.045em;
        }

        .rivotSavingsHeader a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #171717;
          font-size: clamp(14px, .95vw, 16px);
          font-weight: 800;
          white-space: nowrap;
        }

        .rivotSavingsHeader a span {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border: 2px solid #ef7430;
          border-radius: 50%;
          color: #ef7430;
          font-size: 16px;
          font-weight: 900;
        }

        .rivotSavingsCards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 1.4vw, 24px);
        }

        .rivotSavingsCards article,
        .rivotSavingsBottom,
        .rivotSavingsMetric {
          border-radius: 14px;
          background: #fff;
          box-shadow:
            0 10px 28px rgba(17, 17, 17, .06),
            inset 0 0 0 1px rgba(17, 17, 17, .08);
        }

        .rivotSavingsCards article {
          min-height: 168px;
          padding: clamp(22px, 1.7vw, 28px);
        }

        .rivotSavingsCards span {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          margin-bottom: 18px;
          border-radius: 50%;
          background: rgba(239, 116, 48, .1);
          color: #ef7430;
        }

        .rivotSavingsCards article:nth-child(2) span {
          background: rgba(37, 167, 93, .1);
          color: #25a75d;
        }

        .rivotSavingsCards svg {
          width: 26px;
          height: 26px;
        }

        .rivotSavingsCards small {
          display: block;
          color: #111;
          font-size: clamp(15px, 1vw, 18px);
          font-weight: 900;
          line-height: 1.15;
        }

        .rivotSavingsCards p {
          margin: 5px 0 16px;
          color: #626a75;
          font-size: clamp(12px, .82vw, 15px);
          font-weight: 750;
          line-height: 1.2;
        }

        .rivotSavingsCards b {
          display: block;
          overflow-wrap: anywhere;
          color: #111;
          font-size: clamp(32px, 2.5vw, 44px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.04em;
        }

        .rivotSavingsCards b.green {
          color: #25a75d;
        }

        .rivotSavingsCards b.orange {
          color: #ef7430;
        }

        .rivotSavingsBottom {
          display: grid;
          grid-template-columns: minmax(360px, 1.7fr) minmax(190px, .65fr) minmax(220px, .75fr);
          gap: 16px;
          padding: 16px;
        }

        .rivotSavingsUsage {
          display: grid;
          grid-template-columns: 150px minmax(260px, 1fr);
          grid-template-rows: auto auto;
          position: relative;
          align-items: end;
          column-gap: 28px;
          min-width: 0;
          min-height: 82px;
          padding: 15px 22px 13px;
        }

        .rivotSavingsUsage::after {
          content: "";
          position: absolute;
          top: 18px;
          bottom: 18px;
          left: 172px;
          width: 1px;
          background: rgba(17, 17, 17, .08);
        }

        .rivotSavingsUsage p {
          grid-column: 1;
          grid-row: 1;
          align-self: start;
          margin: 0;
          color: #111;
          font-size: 12px;
          font-weight: 900;
        }

        .rivotSavingsUsage b {
          grid-column: 1;
          grid-row: 2;
          align-self: start;
          display: block;
          margin: 2px 0 0;
          color: #ef7430;
          font-size: 16px;
          font-weight: 900;
        }

        .rivotSavingsSlider {
          position: relative;
          display: block;
          grid-column: 2;
          grid-row: 1;
          align-self: end;
          height: 32px;
          margin: 0 6px;
        }

        .rivotSavingsSlider input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .rivotSavingsSlider::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 8px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, #ef7430 var(--rivot-savings-progress), rgba(239, 116, 48, .22) 0);
          transform: translateY(-50%);
        }

        .rivotSavingsSlider input::-webkit-slider-thumb {
          appearance: none;
          width: 58px;
          height: 32px;
          border: 0;
          border-radius: 10px;
          background: transparent;
        }

        .rivotSavingsSlider input::-moz-range-thumb {
          width: 58px;
          height: 32px;
          border: 0;
          border-radius: 10px;
          background: transparent;
        }

        .rivotSavingsSlider i {
          position: absolute;
          top: 50%;
          z-index: 1;
          display: grid;
          min-width: 58px;
          height: 32px;
          place-items: center;
          border-radius: 10px;
          background: #ef7430;
          color: #fff;
          font-size: 12px;
          font-style: normal;
          font-weight: 900;
          box-shadow: 0 8px 18px rgba(239, 116, 48, .22);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .rivotSavingsUsage small {
          display: flex;
          grid-column: 2;
          grid-row: 2;
          align-self: start;
          justify-content: space-between;
          padding: 0 6px;
          color: #717780;
          font-size: 11px;
          font-weight: 750;
        }

        .rivotSavingsMetric {
          display: grid;
          grid-template-columns: 44px 1fr;
          align-items: center;
          gap: 14px;
          min-width: 0;
          padding: 22px;
        }

        .rivotSavingsMetric svg {
          width: 34px;
          height: 34px;
          color: #25a75d;
        }

        .rivotSavingsMetric b,
        .rivotSavingsMetric span {
          display: block;
        }

        .rivotSavingsMetric b {
          color: #111;
          font-size: clamp(20px, 1.35vw, 25px);
          font-weight: 900;
          line-height: 1.1;
        }

        .rivotSavingsMetric span {
          margin-top: 3px;
          color: #626a75;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.2;
        }

        .rivotSavingsNote {
          margin: -2px 0 0;
          color: #747b85;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
        }

        @media (max-width: 900px) {
          .rivotSavingsPanel {
            grid-template-columns: 1fr;
          }

          .rivotSavingsVisual {
            min-height: 280px;
            padding-bottom: 0;
          }

          .rivotSavingsMain {
            padding: 0 24px 24px;
          }

          .rivotSavingsBottom {
            grid-template-columns: 1fr;
          }

          .rivotSavingsUsage {
            grid-template-columns: 150px minmax(0, 1fr);
          }
        }

        @media (max-width: 560px) {
          .rivotSavings {
            padding: 22px 12px;
          }

          .rivotSavingsPanel {
            border-radius: 14px;
          }

          .rivotSavingsVisual {
            min-height: 230px;
            padding: 52px 8px 0;
          }

          .rivotSavingsMain {
            padding: 0 16px 20px;
          }

          .rivotSavingsHeader {
            display: grid;
          }

          .rivotSavingsHeader a {
            width: max-content;
          }

          .rivotSavingsCards {
            grid-template-columns: 1fr;
          }

          .rivotSavingsCards article {
            min-height: auto;
          }

          .rivotSavingsUsage {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto auto;
            row-gap: 8px;
            min-height: auto;
            padding: 16px;
          }

          .rivotSavingsUsage::after {
            display: none;
          }

          .rivotSavingsUsage p,
          .rivotSavingsUsage b,
          .rivotSavingsSlider,
          .rivotSavingsUsage small {
            grid-column: 1;
            grid-row: auto;
          }

          .rivotSavingsSlider {
            margin-top: 8px;
          }
        }
      `}</style>
    </section>
  );
}
