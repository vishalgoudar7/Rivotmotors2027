import Link from "next/link";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Subscriptions", href: "/legal/subscriptions" },
  { label: "License", href: "/legal/license" },
];

const policyLinks = [
  { label: "Terms and Conditions", href: "/legal/terms-and-conditions" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cancellation/Refund", href: "/legal/cancellation-refund" },
  { label: "FAQs", href: "/#rivot-faqs" },
];

const socialLinks = [
  { label: "Facebook", mark: "f", href: "#" },
  { label: "X", mark: "X", href: "#" },
  { label: "Instagram", mark: "◎", href: "#" },
  { label: "YouTube", mark: "▶", href: "#" },
  { label: "LinkedIn", mark: "in", href: "#" },
];

export function Footer() {
  return (
    <footer className="rivotFooter">
      <div className="rivotFooterTop">
        <nav className="rivotFooterColumn" aria-label="Primary footer links">
          <h2>Quick Links</h2>
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="rivotFooterColumn" aria-label="Policy footer links">
          <h2>Quick Links</h2>
          {policyLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>

        <section className="rivotFooterColumn rivotFooterContact" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Contact Us</h2>
          <p>
            1st Cross, 1st Main, Sadashiv
            <br />
            Nagar, Belagavi India
          </p>
          <p>
            Email:
            <br />
            <a href="mailto:support@rivotmotors.com">support@rivotmotors.com</a>
          </p>
          <p>
            Phone: <a href="tel:+918988984646">+91 8988984646</a>
          </p>
        </section>

        <section className="rivotFooterColumn" aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">Social</h2>
          <div className="rivotFooterSocial">
            {socialLinks.map((link) => (
              <a href={link.href} aria-label={link.label} key={link.label}>
                {link.mark}
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="rivotFooterBottom">
        <p>&copy; 2025 RIVOT Motors (INDIA) Pvt Ltd, all rights reserved | Designed in Belagavi, Made in India</p>
      </div>

      <style>{`
        .rivotFooter {
          display: block;
          padding: 0;
          border-top: 1px solid rgba(255, 255, 255, .12);
          background: #050505;
          color: #f4f4f4;
        }

        .rivotFooterTop {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(34px, 6vw, 92px);
          width: min(100%, 1460px);
          margin: 0 auto;
          padding: clamp(48px, 6vw, 72px) clamp(22px, 8vw, 150px);
        }

        .rivotFooterColumn {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }

        .rivotFooterColumn h2 {
          margin: 0 0 2px;
          color: #fff;
          font-size: clamp(20px, 1.5vw, 26px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0;
        }

        .rivotFooterColumn a,
        .rivotFooterColumn p {
          margin: 0;
          color: rgba(255, 255, 255, .68);
          font-size: clamp(16px, 1.12vw, 21px);
          font-weight: 400;
          line-height: 1.38;
          letter-spacing: 0;
        }

        .rivotFooterColumn a {
          transition: color .2s ease;
        }

        .rivotFooterColumn a:hover {
          color: #ef7430;
        }

        .rivotFooterContact {
          gap: 17px;
        }

        .rivotFooterSocial {
          display: flex;
          align-items: center;
          gap: clamp(22px, 2vw, 34px);
          padding-top: 4px;
        }

        .rivotFooterSocial a {
          display: inline-flex;
          min-width: 28px;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, .72);
          font-size: 30px;
          font-weight: 800;
          line-height: 1;
        }

        .rivotFooterSocial a:nth-child(3),
        .rivotFooterSocial a:nth-child(4) {
          font-size: 27px;
        }

        .rivotFooterSocial a:nth-child(5) {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -.08em;
        }

        .rivotFooterBottom {
          display: flex;
          justify-content: center;
          padding: 26px 22px;
          border-top: 1px solid rgba(255, 255, 255, .12);
        }

        .rivotFooterBottom p {
          margin: 0;
          color: rgba(255, 255, 255, .58);
          font-size: clamp(15px, 1.08vw, 21px);
          font-weight: 400;
          line-height: 1.4;
          text-align: center;
          letter-spacing: 0;
        }

        @media (max-width: 980px) {
          .rivotFooterTop {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding-inline: clamp(22px, 6vw, 60px);
          }
        }

        @media (max-width: 560px) {
          .rivotFooterTop {
            grid-template-columns: 1fr;
            gap: 34px;
            padding: 40px 22px;
          }

          .rivotFooterColumn {
            gap: 13px;
          }

          .rivotFooterSocial {
            flex-wrap: wrap;
          }

          .rivotFooterBottom {
            justify-content: flex-start;
            padding: 22px;
          }

          .rivotFooterBottom p {
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}
