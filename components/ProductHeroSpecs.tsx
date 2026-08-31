export function ProductHeroSpecs() {
  return (
    <>
      <div className="rivotHeroSpecs modelHeroSpecs">
        <div>
          <span className="rivotSpecIcon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M8 36L17 18L25 29L33 13L40 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 40H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M33 13H40V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <b>200 km</b>
          <small>Range</small>
        </div>

        <div>
          <span className="rivotSpecIcon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M9 30C9 20.06 17.06 12 27 12C36.94 12 39 20.06 39 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M27 27L35 20" stroke="#ef7430" strokeWidth="3" strokeLinecap="round" />
              <circle cx="27" cy="27" r="3" fill="#ef7430" />
              <path d="M13 32H10M41 32H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <b>100 km/h</b>
          <small>Top Speed</small>
        </div>

        <div>
          <span className="rivotSpecIcon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M27 5L11 27H23L20 43L37 19H25L27 5Z" stroke="#ef7430" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity=".55" strokeDasharray="4 4" />
            </svg>
          </span>
          <b>35 min</b>
          <small>Flash Charge</small>
        </div>

        <div>
          <span className="rivotSpecIcon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="10" y="8" width="27" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
              <path d="M19 5H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="16" y="14" width="15" height="20" rx="2" fill="#ef7430" opacity=".9" />
              <path d="M20 18V30M24 18V30M28 18V30" stroke="#fff" strokeWidth="1.5" opacity=".9" />
            </svg>
          </span>
          <b>4.4 kWh</b>
          <small>Battery</small>
        </div>
      </div>

      <style>{`
        .modelHeroSpecs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(680px, 100%);
          max-width: 680px;
          margin-top: clamp(42px, 9vh, 92px);
          margin-left: -36px;
          margin-bottom: 28px;
        }

        .modelHeroSpecs div {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          border-left: 1px solid rgba(17, 17, 17, .14);
          text-align: center;
        }

        .modelHeroSpecs div:first-child {
          padding-left: 20px;
          border-left: 0;
        }

        .modelHeroSpecs .rivotSpecIcon {
          display: grid;
          width: 64px;
          height: 64px;
          margin: 0 auto 12px;
          place-items: center;
          border: 1px solid rgba(17, 17, 17, .06);
          border-radius: 50%;
          background: rgba(255, 255, 255, .72);
          color: #161616;
          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, .6),
            0 8px 25px rgba(17, 17, 17, .08);
        }

        .modelHeroSpecs .rivotSpecIcon svg {
          display: block;
          width: 32px;
          height: 32px;
        }

        .modelHeroSpecs b,
        .modelHeroSpecs small {
          display: block;
        }

        .modelHeroSpecs b {
          color: #111;
          font-size: 18px;
          line-height: 1.1;
        }

        .modelHeroSpecs small {
          margin-top: 6px;
          color: #63707a;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .modelHeroSpecs {
            width: min(680px, 100%);
            margin-left: 0;
            margin-top: 34px;
          }
        }

        @media (max-width: 560px) {
          .modelHeroSpecs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 0;
            max-width: 340px;
            margin-top: 24px;
            margin-bottom: 18px;
          }

          .modelHeroSpecs div {
            padding: 0 12px;
          }

          .modelHeroSpecs .rivotSpecIcon {
            width: 46px;
            height: 46px;
            margin-bottom: 8px;
          }

          .modelHeroSpecs .rivotSpecIcon svg {
            width: 24px;
            height: 24px;
          }

          .modelHeroSpecs b {
            font-size: 16px;
          }

          .modelHeroSpecs small {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
