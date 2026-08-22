type LegalDocumentProps = {
  html: string;
};

export function LegalDocument({ html }: LegalDocumentProps) {
  return (
    <section className="rivotLegal">
      <article className="rivotLegalShell" dangerouslySetInnerHTML={{ __html: html }} />

      <style>{`
        .rivotLegal {
          min-height: 100vh;
          padding: clamp(112px, 10vw, 140px) clamp(16px, 4vw, 64px) clamp(64px, 8vw, 104px);
          background: #fff;
          color: #111;
        }

        .rivotLegalShell {
          width: min(100%, 1040px);
          margin: 0 auto;
        }

        .rivotLegalShell .terms-section,
        .rivotLegalShell .subscriptions-section {
          margin: 0;
        }

        .rivotLegalShell .section-title {
          max-width: 900px;
          margin: 0 auto clamp(38px, 5vw, 64px);
          color: #111;
          font-size: clamp(40px, 5.2vw, 76px);
          font-weight: 900;
          line-height: .96;
          letter-spacing: -.055em;
          text-align: center;
        }

        .rivotLegalShell .section-title::after {
          content: "";
          display: block;
          width: 68px;
          height: 4px;
          margin: 24px auto 0;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotLegalShell h3 {
          margin: clamp(30px, 4vw, 46px) 0 14px;
          color: #111;
          font-size: clamp(21px, 1.7vw, 30px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.035em;
        }

        .rivotLegalShell p,
        .rivotLegalShell li {
          color: #4f5863;
          font-size: clamp(15px, 1.05vw, 18px);
          font-weight: 600;
          line-height: 1.72;
        }

        .rivotLegalShell p {
          margin: 0 0 16px;
        }

        .rivotLegalShell ul {
          margin: 0 0 24px;
          padding: clamp(18px, 2vw, 26px) clamp(20px, 2.2vw, 32px) clamp(12px, 1.6vw, 20px) clamp(34px, 3vw, 46px);
          border-radius: 16px;
          background: #f4f4f4;
        }

        .rivotLegalShell li {
          margin-bottom: 12px;
          padding-left: 4px;
        }

        .rivotLegalShell li::marker {
          color: #ef7430;
        }

        .rivotLegalShell a {
          color: #ef7430;
          font-weight: 800;
          text-decoration: none;
        }

        .rivotLegalShell a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .rivotLegalShell strong {
          color: #111;
          font-weight: 900;
        }

        .rivotLegalShell br {
          display: none;
        }

        @media (max-width: 700px) {
          .rivotLegal {
            padding: 104px 14px 56px;
          }

          .rivotLegalShell .section-title {
            text-align: left;
          }

          .rivotLegalShell .section-title::after {
            margin-left: 0;
          }

          .rivotLegalShell ul {
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}
