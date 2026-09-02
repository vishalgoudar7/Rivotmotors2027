"use client";

import { useState, type FormEvent } from "react";

const supportCards = [
  {
    title: "Helpline Number",
    description: "Our customer support team is available to assist you with product, service, and ownership queries.",
    contact: "+91 898-898-4646",
    href: "tel:+918988984646",
    hours: "Available 24/7",
    icon: "phone",
  },
  {
    title: "WhatsApp Support",
    description: "Connect with us instantly on WhatsApp for quick responses to your questions and support needs.",
    contact: "+91 898-898-4646",
    href: "https://wa.me/918988984646",
    hours: "Mon-Sat: 9 AM-8 PM",
    icon: "chat",
  },
  {
    title: "Email Support",
    description: "Send us a detailed email and our team will respond with the next steps as soon as possible.",
    contact: "support@rivotmotors.com",
    href: "mailto:support@rivotmotors.com",
    hours: "Response within 24 hours",
    icon: "mail",
  },
  {
    title: "Visit Our Showroom",
    description: "Experience RIVOT scooters firsthand at our showroom and service location.",
    contact: "PLANT1, Plot No. 1340-1341, KHB Layout, Auto Nagar",
    href: "/where",
    hours: "Belagavi, Karnataka - 590015",
    icon: "pin",
  },
];

export function Support() {
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
          <p>Support</p>
          <h1>
            Customer <span>Support</span>
          </h1>
          <strong>Dedicated support for your RIVOT scooter whenever your ride needs attention.</strong>
        </header>

        <div className="rivotSupportGrid">
          {supportCards.map((card) => (
            <article className="rivotSupportCard" key={card.title}>
              <div className="rivotReachIcon" aria-hidden="true">
                <ReachIcon name={card.icon} />
              </div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <a href={card.href}>{card.contact}</a>
              <small>{card.hours}</small>
            </article>
          ))}
        </div>

        <section className="rivotReachFormSection" aria-labelledby="support-form-title">
          <div>
            <p>Message</p>
            <h2 id="support-form-title">
              Send us a <span>Message</span>
            </h2>
            <strong>Fill out the form and our support team will get back to you as soon as possible.</strong>
          </div>

          <form onSubmit={handleSubmit}>
            {sent ? <div className="rivotReachSuccess">Thank you for contacting RIVOT Support. We'll get back to you within 24 hours.</div> : null}

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
                Subject *
                <select name="subject" required defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="warranty">Warranty Claims</option>
                  <option value="service">Service Center</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </label>
            </div>
            <label className="rivotReachMessage">
              Message *
              <textarea name="message" required />
            </label>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>

      <ReachStyles />
    </section>
  );
}

function ReachIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "phone") {
    return (
      <svg {...props}>
        <path d="M10 5h5l2 6-3 2c1.4 3 3.8 5.4 6.8 6.8l2-3 6 2v5c0 1.2-1 2-2.2 2A21.6 21.6 0 0 1 5 10.4C5 6 6 5 7.2 5H10Z" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg {...props}>
        <path d="M7 8h18v12H13l-6 5V8Z" />
        <path d="M12 13h8" />
        <path d="M12 17h5" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...props}>
        <rect x="5" y="8" width="22" height="16" rx="2" />
        <path d="m7 11 9 7 9-7" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M16 28s8-7.2 8-14a8 8 0 0 0-16 0c0 6.8 8 14 8 14Z" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  );
}

export function ReachStyles() {
  return (
    <style>{`
      body:has(.rivotReachPage) .rivotHeader,
      body:has(.rivotReachPage) .rivotBrand,
      body:has(.rivotReachPage) .rivotHeaderLinks a,
      body:has(.rivotReachPage) .rivotProductsButton,
      body:has(.rivotReachPage) .rivotExploreButton {
        color: #0a0a0a;
      }

      body:has(.rivotReachPage) .rivotBrandMark img {
        filter: none;
      }

      body:has(.rivotReachPage) .rivotBook {
        border-color: #ef7430;
        background: transparent;
        color: #ef7430;
      }

      body:has(.rivotReachPage) .rivotThemeToggle {
        border-color: rgba(0, 0, 0, .08);
        background: rgba(255, 255, 255, .78);
        color: #111;
        box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
      }

      .rivotReachPage {
        min-height: 100vh;
        padding: 128px clamp(18px, 5vw, 84px) 80px;
        background:
          radial-gradient(circle at 94% 10%, rgba(239, 116, 48, .14), transparent 28%),
          linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
        color: #090909;
      }

      .rivotReachShell {
        width: min(100%, 1180px);
        margin: 0 auto;
      }

      .rivotReachHero {
        max-width: 760px;
        margin-bottom: 44px;
      }

      .rivotReachHero p,
      .rivotReachFormSection > div > p {
        margin: 0 0 14px;
        color: #ef7430;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: .24em;
        text-transform: uppercase;
      }

      .rivotReachHero h1,
      .rivotReachFormSection h2 {
        margin: 0;
        color: #070707;
        font-size: clamp(40px, 6vw, 48px);
        font-weight: 950;
        line-height: 1.04;
      }

      .rivotReachHero h1 span,
      .rivotReachFormSection h2 span {
        color: #ef7430;
      }

      .rivotReachHero strong,
      .rivotReachFormSection strong {
        display: block;
        max-width: 720px;
        margin-top: 20px;
        color: #5f6b73;
        font-size: 15px;
        font-weight: 700;
        line-height: 1.6;
      }

      .rivotSupportGrid,
      .rivotWhereGrid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-bottom: 56px;
      }

      .rivotSupportCard,
      .rivotWhereCard {
        display: grid;
        align-content: start;
        min-height: 250px;
        padding: 28px;
        border: 1px solid rgba(17, 17, 17, .08);
        border-radius: 8px;
        background: rgba(255, 255, 255, .94);
        box-shadow: 0 22px 54px rgba(17, 17, 17, .08);
      }

      .rivotReachIcon {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        margin-bottom: 22px;
        border-radius: 50%;
        background: rgba(239, 116, 48, .11);
        color: #ef7430;
      }

      .rivotReachIcon svg {
        width: 29px;
        height: 29px;
      }

      .rivotSupportCard h2,
      .rivotWhereCard h2 {
        margin: 0 0 10px;
        color: #050505;
        font-size: clamp(24px, 2vw, 32px);
        font-weight: 950;
        line-height: 1.08;
      }

      .rivotSupportCard p,
      .rivotWhereCard p,
      .rivotWhereCard li {
        margin: 0;
        color: #63707a;
        font-size: 15px;
        font-weight: 650;
        line-height: 1.55;
      }

      .rivotSupportCard a,
      .rivotWhereCard a {
        width: fit-content;
        margin-top: 22px;
        color: #ef7430;
        font-size: 17px;
        font-weight: 900;
        text-decoration: none;
      }

      .rivotSupportCard small {
        margin-top: 6px;
        color: #8a949c;
        font-size: 13px;
        font-weight: 700;
      }

      .rivotReachFormSection {
        display: grid;
        grid-template-columns: minmax(280px, .9fr) minmax(340px, 1fr);
        gap: 32px;
        align-items: start;
        padding: 34px;
        border: 1px solid rgba(17, 17, 17, .08);
        border-radius: 8px;
        background: rgba(255, 255, 255, .92);
        box-shadow: 0 22px 54px rgba(17, 17, 17, .08);
      }

      .rivotReachFormSection h2 {
        font-size: clamp(32px, 4vw, 48px);
      }

      .rivotReachFields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      .rivotReachFormSection label {
        display: grid;
        gap: 9px;
        color: #101010;
        font-size: 13px;
        font-weight: 900;
      }

      .rivotReachFormSection input,
      .rivotReachFormSection select,
      .rivotReachFormSection textarea {
        width: 100%;
        min-height: 46px;
        padding: 12px 14px;
        border: 1px solid rgba(17, 17, 17, .13);
        border-radius: 8px;
        background: #f6f6f6;
        color: #111;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
      }

      .rivotReachMessage {
        margin-top: 16px;
      }

      .rivotReachFormSection textarea {
        min-height: 118px;
        resize: vertical;
      }

      .rivotReachFormSection button {
        width: 100%;
        min-height: 52px;
        margin-top: 18px;
        border: 0;
        border-radius: 999px;
        background: #ef7430;
        color: #fff;
        font: inherit;
        font-weight: 950;
        cursor: pointer;
      }

      .rivotReachSuccess {
        margin-bottom: 16px;
        padding: 14px 16px;
        border: 1px solid rgba(37, 175, 103, .28);
        border-radius: 8px;
        background: rgba(37, 175, 103, .08);
        color: #17844a;
        font-size: 14px;
        font-weight: 800;
      }

      @media (max-width: 900px) {
        .rivotSupportGrid,
        .rivotWhereGrid,
        .rivotReachFormSection {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 600px) {
        .rivotReachPage {
          padding: 92px 16px 56px;
        }

        .rivotReachFields {
          grid-template-columns: 1fr;
        }

        .rivotSupportCard,
        .rivotWhereCard,
        .rivotReachFormSection {
          padding: 20px;
        }
      }
    `}</style>
  );
}
