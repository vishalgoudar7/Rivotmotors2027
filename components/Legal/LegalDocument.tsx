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
          padding: 150px 20px 100px;
          background: #f7f7f5;
          color: #151515;
        }

        .rivotLegalShell {
          width: min(100%, 1450px);
          margin: 0 auto;
        }

        .rivotLegalShell .terms-section,
        .rivotLegalShell .subscriptions-section {
          margin: 0;
        }

        .rivotLegalShell .section-title {
          max-width: none;
          margin: 0 auto 65px;
          color: #c85a22;
          font-size: 40px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: 0;
          text-align: center;
        }

        .rivotLegalShell .section-title::after {
          display: none;
        }

        .rivotLegalShell h3 {
          margin: 0 0 20px;
          color: #151515;
          font-size: 26px;
          font-weight: 500;
          line-height: 1.16;
          letter-spacing: 0;
        }

        .rivotLegalShell p,
        .rivotLegalShell li {
          color: #555;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
        }

        .rivotLegalShell p {
          margin: 0 0 16px;
        }

        .rivotLegalShell ul {
          margin: 0 0 24px;
          padding: 0 0 0 20px;
          background: transparent;
        }

        .rivotLegalShell li {
          margin-bottom: 12px;
          padding-left: 4px;
        }

        .rivotLegalShell li::marker {
          color: #c85a22;
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
          color: #151515;
          font-weight: 700;
        }

        .rivotLegalShell br {
          display: none;
        }

        html[data-rivot-theme="dark"] .rivotLegal {
          background: #080909;
          color: #f5f5f2;
        }

        html[data-rivot-theme="dark"] .rivotLegalShell h3,
        html[data-rivot-theme="dark"] .rivotLegalShell strong {
          color: #f5f5f2;
        }

        html[data-rivot-theme="dark"] .rivotLegalShell p,
        html[data-rivot-theme="dark"] .rivotLegalShell li {
          color: #c9c9c2;
        }

        @media (max-width: 700px) {
          .rivotLegal {
            padding: 110px 16px 64px;
          }

          .rivotLegalShell .section-title {
            font-size: 32px;
          }

          .rivotLegalShell ul {
            padding-left: 20px;
          }
        }
      `}</style>
    </section>
  );
}
