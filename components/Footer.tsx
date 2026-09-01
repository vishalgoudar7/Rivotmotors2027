import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/asset/images/RIVOT New Logo White.png";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Subscriptions", href: "/legal/subscriptions" },
  { label: "License", href: "/legal/license" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
];

const supportLinks = [
  { label: "Terms and Conditions", href: "/legal/terms-and-conditions" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cancellation/Refund", href: "/legal/cancellation-refund" },
  { label: "FAQs", href: "/faqs" },
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
      <div className="rivotFooterShell">
        <div className="rivotFooterTop">
          <section className="rivotFooterBrand" aria-label="RIVOT Motors">
            <Image src={logoWhite} alt="RIVOT Motors" priority />
            <p>
              Powering the future of electric mobility with innovation,
              reliability &amp; performance.
            </p>
          </section>

          <nav className="rivotFooterColumn" aria-label="Explore footer links">
            <h2>Explore</h2>
            {exploreLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="rivotFooterColumn" aria-label="Support footer links">
            <h2>Support</h2>
            {supportLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <section className="rivotFooterColumn rivotFooterContact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact Us</h2>
            <p>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21C15.2 17.6 18 14.1 18 10.5C18 7.19 15.31 4.5 12 4.5C8.69 4.5 6 7.19 6 10.5C6 14.1 8.8 17.6 12 21Z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="10.5" r="2" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              1st Cross, 1st Main,
              <br />
              Sadashiv Nagar,
              <br />
              Belagavi India
            </p>
            <p>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 7H19V17H5V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M5 8L12 13L19 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <a href="mailto:support@rivotmotors.com">support@rivotmotors.com</a>
            </p>
            <p>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M8.5 5.5L10.5 9.5L8.8 10.8C9.9 13.1 10.9 14.1 13.2 15.2L14.5 13.5L18.5 15.5V18.2C18.5 19.2 17.7 20 16.7 20C9.7 20 4 14.3 4 7.3C4 6.3 4.8 5.5 5.8 5.5H8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <a href="tel:+918988984646">+91 8988984646</a>
            </p>
          </section>

          <section className="rivotFooterColumn rivotFooterSubscribe" aria-labelledby="footer-connect-title">
            <h2 id="footer-connect-title">Connect With Us</h2>
            <div className="rivotFooterSocial" aria-label="Social links">
              {socialLinks.map((link) => (
                <a href={link.href} aria-label={link.label} key={link.label}>
                  {link.mark}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="rivotFooterBottom">
          <p>&copy; 2026 RIVOT Motors (INDIA) Pvt Ltd, all rights reserved.</p>
          <p>Designed in Belagavi, Made India </p>
        </div>
      </div>

      <style>{`
        .rivotFooter {
          display: block;
          padding: 0;
          border: 0;
          background: #f5f5f2;
          color: #f4f4f4;
        }

        .rivotFooterShell {
          width: 100%;
          margin: 0;
          overflow: hidden;
          border-radius: 16px;
          background:
            radial-gradient(circle at 100% 0%, rgba(255, 255, 255, .07), transparent 32%),
            linear-gradient(135deg, #151718 0%, #090a0a 100%);
          box-shadow:
            0 18px 50px rgba(0, 0, 0, .18),
            inset 0 0 0 1px rgba(255, 255, 255, .08);
        }

        .rivotFooterTop {
          display: grid;
          grid-template-columns: minmax(190px, 1.25fr) minmax(110px, .7fr) minmax(150px, .8fr) minmax(210px, 1fr) minmax(210px, 1.05fr);
          gap: 0;
          padding: clamp(28px, 3.2vw, 44px);
        }

        .rivotFooterBrand,
        .rivotFooterColumn {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 0 clamp(18px, 2.2vw, 34px);
          border-left: 1px solid rgba(239, 116, 48, .35);
        }

        .rivotFooterBrand {
          gap: 16px;
          padding-left: 0;
          padding-right: clamp(22px, 2.6vw, 40px);
          border-left: 0;
        }

        .rivotFooterBrand img {
          width: clamp(116px, 10vw, 150px);
          height: auto;
          object-fit: contain;
        }

        .rivotFooterBrand p {
          max-width: 230px;
          margin: 0;
          color: rgba(255, 255, 255, .68);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.55;
        }

        .rivotFooterColumn h2 {
          margin: 0 0 10px;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: 0;
        }

        .rivotFooterColumn a,
        .rivotFooterColumn p {
          margin: 0;
          color: rgba(255, 255, 255, .66);
          font-size: 13px;
          font-weight: 650;
          line-height: 1.45;
          letter-spacing: 0;
        }

        .rivotFooterColumn a {
          transition: color .2s ease;
        }

        .rivotFooterColumn a:hover {
          color: #ef7430;
        }

        .rivotFooterContact {
          gap: 13px;
        }

        .rivotFooterContact p {
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr);
          gap: 10px;
        }

        .rivotFooterContact p > span {
          display: grid;
          width: 18px;
          height: 18px;
          place-items: center;
          color: rgba(255, 255, 255, .76);
        }

        .rivotFooterContact svg {
          width: 17px;
          height: 17px;
        }

        .rivotFooterSocial {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 0;
        }

        .rivotFooterSocial a {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          color: rgba(255, 255, 255, .74);
          font-size: 14px;
          font-weight: 800;
          line-height: 1;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }

        .rivotFooterSocial a:hover {
          background: #ef7430;
          color: #fff;
          transform: translateY(-1px);
        }

        .rivotFooterSocial a:nth-child(5) {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -.08em;
        }

        .rivotFooterSubscribe {
          padding-right: 0;
        }

        .rivotFooterSubscribe > p {
          max-width: 190px;
          margin-bottom: 10px;
        }

        .rivotFooterSubscribe label {
          position: relative;
          display: block;
          width: min(100%, 250px);
        }

        .rivotFooterSubscribe label > span {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        .rivotFooterSubscribe input {
          width: 100%;
          height: 50px;
          padding: 0 58px 0 16px;
          border: 1px solid rgba(255, 255, 255, .18);
          border-radius: 7px;
          background: rgba(255, 255, 255, .05);
          color: #fff;
          font-size: 13px;
          font-weight: 650;
          outline: none;
        }

        .rivotFooterSubscribe input::placeholder {
          color: rgba(255, 255, 255, .52);
        }

        .rivotFooterSubscribe button {
          position: absolute;
          top: 6px;
          right: 6px;
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 0;
          border-radius: 7px;
          background: #ef7430;
          color: #fff;
          cursor: pointer;
        }

        .rivotFooterSubscribe button svg {
          width: 18px;
          height: 18px;
        }

        .rivotFooterBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 20px clamp(28px, 3.2vw, 44px);
          border-top: 1px solid #ef7430;
        }

        .rivotFooterBottom p {
          margin: 0;
          color: rgba(255, 255, 255, .62);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0;
        }

        @media (max-width: 1080px) {
          .rivotFooterTop {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px 0;
          }

          .rivotFooterColumn:nth-child(4) {
            border-left: 0;
          }
        }

        @media (max-width: 560px) {
          .rivotFooter {
            padding: 10px;
          }

          .rivotFooterShell {
            border-radius: 14px;
          }

          .rivotFooterTop {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 28px 20px;
          }

          .rivotFooterBrand,
          .rivotFooterColumn {
            gap: 11px;
            padding: 22px 0;
            border-left: 0;
            border-top: 1px solid rgba(239, 116, 48, .28);
          }

          .rivotFooterBrand {
            padding-top: 0;
            border-top: 0;
          }

          .rivotFooterSocial {
            flex-wrap: wrap;
          }

          .rivotFooterSubscribe label {
            width: 100%;
          }

          .rivotFooterBottom {
            align-items: flex-start;
            flex-direction: column;
            padding: 18px 20px;
          }
        }
      `}</style>
    </footer>
  );
}
