"use client";

import { useState, type FormEvent } from "react";
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
  { label: "Facebook", href: "https://www.facebook.com/rivotmotors" },
  { label: "Instagram", href: "https://www.instagram.com/rivotmotors/" },
  { label: "YouTube", href: "https://www.youtube.com/c/rivotmotors" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/rivotmotors?originalSubdomain=in" },
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
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
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
          font-size: clamp(34px, 4vw, 58px);
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
          font-size: 17px;
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
          min-height: 44px;
          padding: 0 22px;
          border-radius: 999px;
          background: #ef7430;
          color: #fff;
          font-weight: 900;
          text-decoration: none;
        }

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
