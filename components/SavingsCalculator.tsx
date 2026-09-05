"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const MIN_DAILY_KM = 10;
const MAX_DAILY_KM = 200;
const DAILY_KM_SEQUENCE = [10, 25, 30, 50, 75, 100, 150, 200] as const;
const DEFAULT_DAILY_KM = DAILY_KM_SEQUENCE[0];
const COST_BASE_DAILY_KM = 20;
const PETROL_COST_PER_KM = 16002 / (COST_BASE_DAILY_KM * 365);
const RIVOT_COST_PER_KM = 2006 / (COST_BASE_DAILY_KM * 365);
const RUPEE = "\u20B9";

type SavingsCardProps = {
  accent: "orange" | "green";
  backgroundIcon: ReactNode;
  icon: ReactNode;
  title: string;
  subtitle: string;
  value: string;
};

type MetricCardProps = {
  tone: "purple" | "blue";
  icon: ReactNode;
  value: string;
  label: string;
};

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function FuelIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M11 6H22C23.1 6 24 6.9 24 8V31H9V8C9 6.9 9.9 6 11 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M13 11H20V18H13V11Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 13H28L31 16V25C31 26.66 29.66 28 28 28H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 13V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M20 4L9 21H17L15 32L28 14H20V4Z" fill="currentColor" />
    </svg>
  );
}

function PiggyIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M8 19C8 14.58 11.58 11 16 11H22C25.86 11 29 14.14 29 18V24H26L24.8 30H20L19.1 26H15.4L14.4 30H10L9 25.5C6.8 24.7 5 22.78 5 20.5V18H8V19Z" fill="currentColor" />
      <circle cx="22" cy="9" r="3.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14 13.5H20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24.5" cy="17" r="1.4" fill="#fff" />
    </svg>
  );
}

function DropIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <path d="M61 10C47 34 31 52 31 78C31 99 45.1 111 61 111C77.5 111 91 99 91 78C91 52 74 34 61 10Z" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <path d="M61 96C72 93 78 86 78 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function LightningOutlineIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <path d="M70 8L24 70H55L45 112L96 50H65L70 8Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
    </svg>
  );
}

function PiggyOutlineIcon() {
  return (
    <svg viewBox="0 0 140 120" fill="none">
      <path d="M28 66C28 47.8 42.8 33 61 33H84C101.1 33 115 46.9 115 64V85H102L98 105H79L76 92H54L50 105H32L28.5 89C18 85.6 10 77 10 66V55H28V66Z" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <path d="M113 70H132" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle cx="87" cy="19" r="13" stroke="currentColor" strokeWidth="7" />
      <circle cx="94" cy="57" r="3" fill="currentColor" />
      <path d="M53 36C62 29 74 29 83 36" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function RoadIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M11 32L15 5H21L25 32" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8V12M18 17V21M18 26V30" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
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

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10.5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function SavingsCard({ accent, backgroundIcon, icon, title, subtitle, value }: SavingsCardProps) {
  return (
    <article className={`rivotSavingsCard ${accent}`}>
      <span className="rivotSavingsCardIcon" aria-hidden="true">
        {icon}
      </span>
      <span className="rivotSavingsCardGhost" aria-hidden="true">
        {backgroundIcon}
      </span>
      <small>{title}</small>
      <p>{subtitle}</p>
      <b>{value}</b>
    </article>
  );
}

function MetricCard({ tone, icon, value, label }: MetricCardProps) {
  return (
    <article className={`rivotSavingsMetric ${tone}`}>
      <span aria-hidden="true">{icon}</span>
      <div>
        <b>{value}</b>
        <small>{label}</small>
      </div>
    </article>
  );
}

function UsageSlider({
  dailyKm,
  sliderPercent,
  onChange,
}: {
  dailyKm: number;
  sliderPercent: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rivotSavingsUsage">
      <div className="rivotSavingsUsageCopy">
        <p>What&apos;s your daily usage?</p>
        <b>{dailyKm} km / day</b>
      </div>
      <label
        className="rivotSavingsSlider"
        aria-label="Daily usage in kilometers"
        style={{ "--rivot-savings-progress": `${sliderPercent}%` } as CSSProperties}
      >
        <input
          type="range"
          min={MIN_DAILY_KM}
          max={MAX_DAILY_KM}
          value={dailyKm}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <i>{dailyKm} km</i>
        <small><span>{MIN_DAILY_KM} km</span><span>{MAX_DAILY_KM} km</span></small>
      </label>
    </div>
  );
}

export function SavingsCalculator() {
  const [dailyKm, setDailyKm] = useState<number>(DEFAULT_DAILY_KM);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDailyKm((currentKm) => {
        const currentIndex = DAILY_KM_SEQUENCE.findIndex((value) => value === currentKm);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % DAILY_KM_SEQUENCE.length : 0;
        return DAILY_KM_SEQUENCE[nextIndex];
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

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
        <header className="rivotSavingsHeader">
          <div>
            <p>Finance &amp; Savings</p>
            <h2>
              The math is simple.
              <br />
              You <span>save</span> big.
            </h2>
          </div>
          <a href="mailto:support@rivotmotors.com">
            Have a Question? <span aria-hidden="true">?</span>
          </a>
        </header>

        <div className="rivotSavingsCards">
          <SavingsCard
            accent="orange"
            backgroundIcon={<DropIcon />}
            icon={<FuelIcon />}
            title="Petrol Scooter"
            subtitle="Annual running cost*"
            value={`${RUPEE} ${formatRupees(values.petrolAnnual)}`}
          />
          <SavingsCard
            accent="green"
            backgroundIcon={<LightningOutlineIcon />}
            icon={<BoltIcon />}
            title="RIVOT NX100"
            subtitle="Annual running cost*"
            value={`${RUPEE} ${formatRupees(values.rivotAnnual)}`}
          />
          <SavingsCard
            accent="orange"
            backgroundIcon={<PiggyOutlineIcon />}
            icon={<PiggyIcon />}
            title="You Save Annually"
            subtitle="with RIVOT NX100"
            value={`${RUPEE} ${formatRupees(values.annualSavings)}`}
          />
        </div>

        <div className="rivotSavingsCalculator">
          <UsageSlider dailyKm={dailyKm} sliderPercent={values.sliderPercent} onChange={setDailyKm} />
          <div className="rivotSavingsMetricGrid">
            <MetricCard tone="purple" icon={<RoadIcon />} value="200 km" label="Real range*" />
            <MetricCard tone="blue" icon={<ShieldIcon />} value="3.2 Paise/km" label="Running cost*" />
          </div>
        </div>

        <p className="rivotSavingsNote">
          <InfoIcon />
          *These are estimated values. Actual results may vary based on usage and conditions.
        </p>
      </div>

      <style jsx global>{`
        .rivotSavings {
          min-height: 100vh;
          display: grid;
          align-items: center;
          padding: clamp(24px, 4vw, 52px) clamp(14px, 3vw, 34px) clamp(34px, 5vw, 64px);
          background:
            radial-gradient(circle at 92% 18%, rgba(134, 92, 255, .1), transparent 32%),
            radial-gradient(circle at 88% 92%, rgba(32, 178, 107, .12), transparent 32%),
            linear-gradient(135deg, rgba(241, 245, 255, .92) 0%, rgba(255, 255, 255, .92) 45%, rgba(250, 247, 255, .92) 100%);
          color: #0f1f36;
        }

        .rivotSavingsPanel {
          width: min(100%, 1280px);
          margin: 0 auto;
          padding: clamp(16px, 1.8vw, 28px) 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .rivotSavingsHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 28px;
        }

        .rivotSavingsHeader p {
          margin: 0 0 6px;
          color: #0f8f4c;
          font-size: 15px;
          font-weight: 900;
          line-height: 1.15;
        }

        .rivotSavingsHeader h2 {
          margin: 0;
          color: #0b1730;
          font-size: clamp(32px, 3.2vw, 46px);
          font-weight: 950;
          line-height: .9;
          letter-spacing: 0;
        }

        .rivotSavingsHeader h2 span {
          color: #16a765;
        }

        .rivotSavingsHeader a {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
          color: #071227;
          font-size: 15px;
          font-weight: 900;
          line-height: 1;
          white-space: nowrap;
        }

        .rivotSavingsHeader a span {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 3px solid #16a765;
          border-radius: 50%;
          color: #16a765;
          font-size: 23px;
          font-weight: 800;
        }

        .rivotSavingsCards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 1.15vw, 18px);
          margin-top: clamp(14px, 1.45vw, 22px);
        }

        .rivotSavingsCard {
          position: relative;
          min-height: clamp(166px, 12vw, 190px);
          overflow: hidden;
          padding: clamp(16px, 1.25vw, 22px);
          border: 1px solid rgba(20, 40, 60, .08);
          border-radius: 22px;
          background: rgba(255, 255, 255, .72);
          box-shadow: 0 14px 32px rgba(15, 31, 54, .07);
          backdrop-filter: blur(18px);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .rivotSavingsCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 54px rgba(15, 31, 54, .12);
        }

        .rivotSavingsCardIcon {
          display: grid;
          width: 50px;
          height: 50px;
          place-items: center;
          margin-bottom: 14px;
          border-radius: 50%;
          color: #fff;
        }

        .rivotSavingsCard.orange .rivotSavingsCardIcon {
          background: linear-gradient(135deg, #ff9b59 0%, #f47721 100%);
        }

        .rivotSavingsCard.green .rivotSavingsCardIcon {
          background: #d3f3df;
          color: #16a765;
        }

        .rivotSavingsCardIcon svg {
          width: 27px;
          height: 27px;
        }

        .rivotSavingsCardGhost {
          position: absolute;
          right: clamp(20px, 2.4vw, 42px);
          bottom: 14px;
          width: min(28%, 88px);
          color: #f47721;
          opacity: .16;
          pointer-events: none;
        }

        .rivotSavingsCard.green .rivotSavingsCardGhost {
          color: #16a765;
          opacity: .16;
        }

        .rivotSavingsCardGhost svg {
          width: 100%;
          height: auto;
        }

        .rivotSavingsCard small,
        .rivotSavingsCard p,
        .rivotSavingsCard b {
          position: relative;
          z-index: 1;
          display: block;
        }

        .rivotSavingsCard small {
          color: #0b1730;
          font-size: clamp(16px, 1vw, 19px);
          font-weight: 950;
          line-height: 1.1;
        }

        .rivotSavingsCard p {
          margin: 6px 0 14px;
          color: rgba(15, 31, 54, .78);
          font-size: clamp(12px, .82vw, 15px);
          font-weight: 650;
          line-height: 1.25;
        }

        .rivotSavingsCard b {
          color: #071227;
          font-size: clamp(28px, 2.45vw, 38px);
          font-weight: 950;
          line-height: 1;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .rivotSavingsCard.green b {
          color: #16a765;
        }

        .rivotSavingsCard.orange:nth-child(3) b {
          color: #f47721;
        }

        .rivotSavingsCalculator {
          display: grid;
          grid-template-columns: minmax(520px, 1fr) minmax(420px, .74fr);
          gap: clamp(14px, 1.4vw, 22px);
          align-items: center;
          margin-top: clamp(14px, 1.45vw, 22px);
          padding: clamp(14px, 1.3vw, 20px);
          border: 1px solid rgba(20, 40, 60, .08);
          border-radius: 22px;
          background: rgba(255, 255, 255, .74);
          box-shadow: 0 14px 32px rgba(15, 31, 54, .07);
          backdrop-filter: blur(18px);
        }

        .rivotSavingsUsage {
          display: grid;
          grid-template-columns: minmax(150px, 180px) minmax(300px, 620px);
          align-items: center;
          justify-content: space-between;
          gap: clamp(18px, 2vw, 30px);
          min-width: 0;
        }

        .rivotSavingsUsageCopy {
          min-width: 0;
        }

        .rivotSavingsUsageCopy p {
          margin: 0 0 16px;
          color: #071227;
          font-size: clamp(14px, .95vw, 17px);
          font-weight: 950;
          line-height: 1.25;
        }

        .rivotSavingsUsageCopy b {
          display: block;
          color: #16a765;
          font-size: clamp(22px, 1.85vw, 30px);
          font-weight: 950;
          line-height: 1;
        }

        .rivotSavingsSlider {
          --rivot-slider-pad: 20px;
          position: relative;
          display: block;
          min-width: 0;
          height: 70px;
          user-select: none;
        }

        .rivotSavingsSlider::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 34px;
          height: 7px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, #f9732a var(--rivot-savings-progress), rgba(15, 31, 54, .11) 0);
          box-shadow: inset 0 1px 2px rgba(15, 31, 54, .08);
          transition: background .35s ease;
        }

        .rivotSavingsSlider::after {
          content: "";
          position: absolute;
          left: clamp(12px, var(--rivot-savings-progress), calc(100% - 12px));
          top: 26px;
          z-index: 2;
          width: 24px;
          height: 24px;
          border: 3px solid #f9732a;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 12px rgba(15, 31, 54, .12);
          transform: translateX(-50%);
          transition: left .35s ease;
        }

        .rivotSavingsSlider input {
          position: absolute;
          inset: 10px 0 0;
          z-index: 3;
          width: 100%;
          height: 44px;
          margin: 0;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .rivotSavingsSlider input:focus {
          outline: none;
        }

        .rivotSavingsSlider input::-webkit-slider-runnable-track {
          height: 44px;
          border: 0;
          background: transparent;
        }

        .rivotSavingsSlider input::-moz-range-track {
          height: 44px;
          border: 0;
          background: transparent;
        }

        .rivotSavingsSlider input::-moz-range-progress {
          height: 44px;
          border: 0;
          background: transparent;
        }

        .rivotSavingsSlider input::-webkit-slider-thumb {
          appearance: none;
          width: 38px;
          height: 46px;
          border: 0;
          background: transparent;
        }

        .rivotSavingsSlider input::-moz-range-thumb {
          width: 38px;
          height: 46px;
          border: 0;
          background: transparent;
        }

        .rivotSavingsSlider i {
          position: absolute;
          left: clamp(38px, var(--rivot-savings-progress), calc(100% - 38px));
          top: 0;
          z-index: 2;
          display: grid;
          min-width: 64px;
          height: 34px;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #ff8a3a 0%, #f9732a 100%);
          color: #fff;
          font-size: 13px;
          font-style: normal;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 12px 24px rgba(249, 115, 42, .24);
          pointer-events: none;
          transform: translateX(-50%);
          transition: left .35s ease;
        }

        .rivotSavingsSlider i::before {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 12px;
          height: 12px;
          background: #f9732a;
          transform: translateX(-50%) rotate(45deg);
        }

        .rivotSavingsSlider small {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 var(--rivot-slider-pad);
          color: rgba(15, 31, 54, .78);
          font-size: 12px;
          font-weight: 650;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .rivotSavingsSlider small span {
          display: block;
          white-space: nowrap;
        }

        .rivotSavingsMetricGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(10px, 1vw, 16px);
          padding-left: clamp(14px, 1.4vw, 22px);
          border-left: 1px solid rgba(20, 40, 60, .12);
        }

        .rivotSavingsMetric {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          align-items: center;
          gap: 12px;
          min-height: 88px;
          padding: clamp(12px, 1vw, 16px);
          border: 1px solid rgba(20, 40, 60, .08);
          border-radius: 18px;
          background: rgba(255, 255, 255, .82);
          box-shadow: 0 14px 34px rgba(15, 31, 54, .07);
        }

        .rivotSavingsMetric > span {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          border-radius: 50%;
        }

        .rivotSavingsMetric.purple > span {
          background: #eee8ff;
          color: #7a45e5;
        }

        .rivotSavingsMetric.blue > span {
          background: #e9f1ff;
          color: #2d76f0;
        }

        .rivotSavingsMetric svg {
          width: 26px;
          height: 26px;
        }

        .rivotSavingsMetric b,
        .rivotSavingsMetric small {
          display: block;
        }

        .rivotSavingsMetric b {
          color: #071227;
          font-size: clamp(20px, 1.35vw, 24px);
          font-weight: 950;
          line-height: 1;
          overflow-wrap: anywhere;
          white-space: nowrap;
        }

        .rivotSavingsMetric small {
          margin-top: 4px;
          color: rgba(15, 31, 54, .76);
          font-size: clamp(12px, .8vw, 14px);
          font-weight: 750;
          line-height: 1.15;
        }

        .rivotSavingsNote {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: clamp(12px, 1.35vw, 20px) 0 0;
          color: rgba(15, 31, 54, .82);
          font-size: clamp(12px, .9vw, 15px);
          font-weight: 650;
          line-height: 1.35;
          text-align: center;
        }

        .rivotSavingsNote svg {
          width: 24px;
          height: 24px;
          flex: 0 0 auto;
          color: #16a765;
        }

        @media (max-width: 1180px) {
          .rivotSavingsPanel {
            padding: 34px 0;
          }

          .rivotSavingsCards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .rivotSavingsCard:nth-child(3) {
            grid-column: 1 / -1;
          }

          .rivotSavingsCard {
            min-height: 210px;
            padding: 24px;
          }

          .rivotSavingsCalculator {
            grid-template-columns: 1fr;
          }

          .rivotSavingsMetricGrid {
            grid-template-columns: repeat(2, minmax(260px, 1fr));
            padding-left: 0;
            border-left: 0;
          }
        }

        @media (max-width: 900px) {
          .rivotSavingsPanel {
            padding: 30px 0;
          }

          .rivotSavingsHeader h2 {
            font-size: clamp(38px, 8vw, 54px);
          }

          .rivotSavingsCard {
            min-height: 200px;
          }

          .rivotSavingsUsage {
            grid-template-columns: minmax(150px, .38fr) minmax(260px, 1fr);
          }
        }

        @media (max-width: 760px) {
          .rivotSavings {
            padding: 24px 12px 36px;
          }

          .rivotSavingsPanel {
            padding: 32px 0;
            border-radius: 0;
          }

          .rivotSavingsHeader {
            display: grid;
          }

          .rivotSavingsHeader h2 {
            font-size: clamp(40px, 11vw, 52px);
          }

          .rivotSavingsHeader a {
            width: max-content;
            max-width: 100%;
          }

          .rivotSavingsCards {
            grid-template-columns: 1fr;
          }

          .rivotSavingsCard:nth-child(3) {
            grid-column: auto;
          }

          .rivotSavingsCard {
            min-height: 190px;
          }

          .rivotSavingsCalculator {
            padding: 22px;
          }

          .rivotSavingsUsage {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .rivotSavingsUsageCopy p {
            margin-bottom: 18px;
          }

          .rivotSavingsMetricGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .rivotSavingsMetric {
            grid-template-columns: 1fr;
            gap: 14px;
            min-height: auto;
            padding: 18px;
            align-content: start;
          }

          .rivotSavingsMetric > span {
            width: 54px;
            height: 54px;
          }

          .rivotSavingsMetric svg {
            width: 34px;
            height: 34px;
          }

          .rivotSavingsMetric b {
            font-size: clamp(22px, 6vw, 26px);
          }

          .rivotSavingsNote {
            align-items: flex-start;
            text-align: left;
          }
        }

        @media (max-width: 560px) {
          .rivotSavingsMetricGrid {
            grid-template-columns: 1fr;
          }

          .rivotSavingsMetric {
            grid-template-columns: 54px minmax(0, 1fr);
            align-content: center;
          }
        }

        @media (max-width: 440px) {
          .rivotSavings {
            padding: 18px 12px 28px;
          }

          .rivotSavingsPanel {
            padding: 28px 0;
          }

          .rivotSavingsHeader a {
            white-space: normal;
          }

          .rivotSavingsCalculator {
            padding: 18px 14px;
          }

          .rivotSavingsMetricGrid {
            grid-template-columns: 1fr;
          }

          .rivotSavingsSlider i {
            min-width: 66px;
            height: 38px;
            font-size: 14px;
          }

          .rivotSavingsSlider {
            --rivot-slider-pad: 16px;
          }
        }
      `}</style>
    </section>
  );
}
