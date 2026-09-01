"use client";

import { useState, type FormEvent } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { ReachStyles } from "@/components/Support";

const locations = [
  {
    title: "HeadQuarter",
    address: "1st Cross, 1st Main, Sadashiv Nagar, Belagavi India",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    phone: "+91 898 898 4646",
    icon: "office",
  },
  {
    title: "Plant 1 Address",
    address: "RIVOT Manufacturing Plant 1, Kanbargi, Belagavi",
    hours: "Monday - Saturday: 8:00 AM - 5:00 PM",
    phone: "+91 898 898 4646",
    icon: "plant",
  },
  {
    title: "Corporate Office",
    address: "RIVOT Tower, 10th Floor, MG Road, Bengaluru, Karnataka 560001",
    hours: "Monday - Friday: 9:30 AM - 6:30 PM",
    phone: "+91 898 898 4646",
    icon: "office",
  },
  {
    title: "Overseas Office",
    address: "RIVOT International, 123 Business District, Dubai, UAE",
    hours: "Sunday - Thursday: 9:00 AM - 5:00 PM GST",
    phone: "+91 898 898 4646",
    icon: "globe",
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/rivotmotors", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/rivotmotors/", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/c/rivotmotors", icon: FaYoutube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/rivotmotors?originalSubdomain=in", icon: FaLinkedinIn },
];

export function Where() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="rivotReachPage">
      <div className="rivotReachShell">
        <header className="rivotReachHero">
          <p>Where</p>
          <h1>
            Find <span>RIVOT</span>
          </h1>
          <strong>Visit our offices and manufacturing facilities across India and abroad.</strong>
        </header>

        <div className="rivotWhereGrid">
          {locations.map((location) => (
            <article className="rivotWhereCard" key={location.title}>
              <div className="rivotReachIcon" aria-hidden="true">
                <WhereIcon name={location.icon} />
              </div>
              <h2>{location.title}</h2>
              <ul>
                <li>{location.address}</li>
                <li>{location.hours}</li>
              </ul>
              <a href="tel:+918988984646">{location.phone}</a>
            </article>
          ))}
        </div>

        <section className="rivotReachFormSection" aria-labelledby="where-form-title">
          <div>
            <p>Contact</p>
            <h2 id="where-form-title">
              Contact <span>Us</span>
            </h2>
            <strong>Have questions or want to schedule a visit? Send a message and we will get back to you.</strong>
          </div>

          <form onSubmit={handleSubmit}>
            {sent ? <div className="rivotReachSuccess">Thank you for contacting us. We'll get back to you soon.</div> : null}

            <div className="rivotReachFields">
              <label>
                Full Name *
                <input name="name" type="text" required />
              </label>
              <label>
                Email Address *
                <input name="email" type="email" required />
              </label>
              <label>
                Phone Number
                <input name="phone" type="tel" />
              </label>
              <label>
                Location of Interest
                <select name="location" defaultValue="">
                  <option value="">Select Location</option>
                  <option value="headquarter">HeadQuarter - Belagavi</option>
                  <option value="plant">Plant 1 - Belagavi</option>
                  <option value="corporate">Corporate Office - Bengaluru</option>
                  <option value="overseas">Overseas Office - Dubai</option>
                </select>
              </label>
            </div>
            <label className="rivotReachMessage">
              Message
              <textarea name="message" />
            </label>
            <button type="submit">Send Message</button>
          </form>
        </section>

        <section className="rivotWhereSocial" aria-labelledby="where-social-title">
          <p>Social</p>
          <h2 id="where-social-title">
            Follow <span>Us</span>
          </h2>
          <strong>Stay connected with RIVOT for the latest updates, news, and announcements.</strong>
          <div>
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a href={link.href} key={link.label} target="_blank" rel="noreferrer" aria-label={link.label} className={`rivotWhereSocial${link.label}`}>
                  <Icon aria-hidden="true" focusable="false" />
                </a>
              );
            })}
          </div>
        </section>

        <section className="rivotWhereMap" aria-label="RIVOT map">
          <iframe
            src="https://www.google.com/maps?q=Belagavi%2C%20Karnataka&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>

      <style>{`
        .rivotWhereCard ul {
          display: grid;
          gap: 8px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .rivotWhereSocial {
          margin-top: 56px;
          text-align: center;
        }

        .rivotWhereSocial p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotWhereSocial h2 {
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 950;
          line-height: 1;
        }

        .rivotWhereSocial h2 span {
          color: #ef7430;
        }

        .rivotWhereSocial strong {
          display: block;
          max-width: 700px;
          margin: 16px auto 26px;
          color: #5f6b73;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.55;
        }

        .rivotWhereSocial div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .rivotWhereSocial a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 50%;
          background: #fff;
          color: #151515;
          box-shadow: 0 8px 18px rgba(17, 17, 17, .08);
          font-weight: 900;
          text-decoration: none;
          transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
        }

        .rivotWhereSocial a svg {
          width: 19px;
          height: 19px;
        }

        .rivotWhereSocial a:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .rivotWhereSocialFacebook { color: #1877f2; }
        .rivotWhereSocialInstagram { color: #e1306c; }
        .rivotWhereSocialYouTube { color: #ff0000; }
        .rivotWhereSocialLinkedIn { color: #0a66c2; }

        .rivotWhereSocialFacebook:hover { border-color: #1877f2; background: #1877f2; }
        .rivotWhereSocialInstagram:hover { border-color: #e1306c; background: #e1306c; }
        .rivotWhereSocialYouTube:hover { border-color: #ff0000; background: #ff0000; }
        .rivotWhereSocialLinkedIn:hover { border-color: #0a66c2; background: #0a66c2; }

        .rivotWhereMap {
          height: 420px;
          margin-top: 46px;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 22px 54px rgba(17, 17, 17, .1);
        }

        .rivotWhereMap iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .rivotReachPage .rivotReachHero h1,
        .rivotReachPage .rivotReachFormSection h2 {
          font-size: 48px;
        }

        .rivotReachPage .rivotReachHero strong,
        .rivotReachPage .rivotReachFormSection strong {
          font-size: 15px;
          font-weight: 600;
        }

        .rivotReachPage .rivotWhereCard h2 {
          font-size: 15px;
          line-height: 1.2;
        }

        .rivotReachPage .rivotWhereCard li,
        .rivotReachPage .rivotWhereCard a,
        .rivotReachPage .rivotReachFormSection label,
        .rivotReachPage .rivotReachFormSection input,
        .rivotReachPage .rivotReachFormSection select,
        .rivotReachPage .rivotReachFormSection textarea,
        .rivotReachPage .rivotReachFormSection button {
          font-size: 15px;
        }

        .rivotReachPage .rivotReachFormSection button {
          border-radius: 8px;
        }

        @media (max-width: 680px) {
          .rivotReachPage .rivotReachHero h1,
          .rivotReachPage .rivotReachFormSection h2 {
            font-size: 40px;
          }

          .rivotWhereSocial {
            margin-top: 40px;
          }

          .rivotWhereSocial h2 {
            font-size: 40px;
          }

          .rivotWhereSocial strong {
            margin: 14px auto 22px;
            font-size: 15px;
          }

          .rivotWhereSocial a {
            width: 42px;
            height: 42px;
          }

          .rivotWhereMap {
            height: 300px;
            margin-top: 34px;
          }
        }
      `}</style>
      <ReachStyles />
    </section>
  );
}

function WhereIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "plant") {
    return (
      <svg {...props}>
        <path d="M5 25h22" />
        <path d="M7 25V12l7 4v-4l7 4V9h4v16" />
        <path d="M10 20h3" />
        <path d="M17 20h3" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...props}>
        <circle cx="16" cy="16" r="10" />
        <path d="M6 16h20" />
        <path d="M16 6c3 3 4.5 6.3 4.5 10S19 23 16 26c-3-3-4.5-6.3-4.5-10S13 9 16 6Z" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M7 27V9l9-4 9 4v18" />
      <path d="M12 27v-8h8v8" />
      <path d="M11 13h2" />
      <path d="M19 13h2" />
    </svg>
  );
}
