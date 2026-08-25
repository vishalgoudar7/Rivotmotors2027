"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ScooterRotation } from "@/components/ScooterRotation";

type Model = "sport" | "pro";

const models: { id: Model; label: string; price: string; colors: string[] }[] = [
  { id: "sport", label: "RIVOT NX100 Sport", price: "Starting at just Rs 1,94,999*", colors: ["#f26f2f", "#ffffff", "#111111"] },
  { id: "pro", label: "RIVOT NX100 Pro", price: "Starting at Rs 1,29,000", colors: ["#111111", "#ffffff", "#6f7479"] },
];

const states = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat", "Haryana", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const cities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Haryana: ["Gurgaon", "Faridabad", "Panipat"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Belagavi", "Mangalore"],
  Kerala: ["Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Ludhiana", "Amritsar", "Mohali"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
};

export function Booking() {
  const [model, setModel] = useState<Model>("sport");
  const [color, setColor] = useState(models[0].colors[0]);
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selectedModel = models.find((item) => item.id === model) ?? models[0];

  function chooseModel(nextModel: Model) {
    setModel(nextModel);
    setColor(models.find((item) => item.id === nextModel)?.colors[0] ?? "#000000");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="rivotBooking">
      <div className="rivotBookingShell">
        <div className="rivotBookingLayout">
        <div className="rivotBookingViewer">
          <div className="rivotBookingIntro">
            <p>Book Now</p>
            <h1>
              Reserve your <span>NX100</span>
            </h1>
            <strong>{selectedModel.price}</strong>
            <small>Booking amount Rs 499. Fully refundable.</small>
          </div>
          <ScooterRotation className="rivotBookingScooter" />
          <p className="rivotBookingHint">Drag to explore the NX100</p>
          <div className="rivotBookingSpecs" aria-label="NX100 highlights">
            <div>
              <b>200 km</b>
              <span>Range</span>
            </div>
            <div>
              <b>100 km/h</b>
              <span>Top Speed</span>
            </div>
            <div>
              <b>35 min</b>
              <span>Flash Charge</span>
            </div>
          </div>
        </div>

        <div className="rivotBookingPanel">
          <div className="rivotBookingPanelHeader">
            <p>Choose your model</p>
            <h2>{selectedModel.label}</h2>
          </div>
          <div className="rivotBookingModels" role="tablist" aria-label="Choose model">
            {models.map((item) => (
              <button key={item.id} type="button" className={model === item.id ? "active" : ""} onClick={() => chooseModel(item.id)}>
                <span>{item.label}</span>
                <small>{item.price}</small>
              </button>
            ))}
          </div>

          <div className="rivotBookingColors">
            <span>Color:</span>
            <div role="radiogroup" aria-label="Select color">
              {selectedModel.colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={`Select color ${item}`}
                  aria-checked={color === item}
                  className={color === item ? "active" : ""}
                  style={{ backgroundColor: item }}
                  onClick={() => setColor(item)}
                />
              ))}
            </div>
          </div>

          <p className="rivotBookingLead">Enter your details below and the RIVOT team will contact you for the next step.</p>
          {submitted ? <div className="rivotBookingSuccess">Your booking details are ready. Our team will contact you shortly.</div> : null}
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="model" value={model} />
            <input type="hidden" name="color" value={color} />
            <div className="rivotBookingFields">
              <input name="name" placeholder="First Name" required aria-label="First Name" />
              <input name="lastName" placeholder="Last Name" aria-label="Last Name" />
              <input name="mobile" placeholder="Mobile" type="tel" pattern="[0-9]{10}" required aria-label="Mobile Number" />
              <input name="email" placeholder="Email" type="email" required aria-label="Email Address" />
              <input name="address" placeholder="Address" className="wide" aria-label="Address" />
              <input name="country" placeholder="Country" aria-label="Country" />
              <input name="pincode" placeholder="Pincode *" inputMode="numeric" maxLength={6} pattern="[0-9]{6}" required aria-label="Pincode" />
              <select name="state" required aria-label="Select State" value={state} onChange={(event) => setState(event.target.value)}>
                <option value="">Choose State</option>
                {states.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select name="city" required aria-label="Select City" disabled={!state}>
                <option value="">Choose City</option>
                {cities[state]?.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select name="source" required aria-label="Where did you hear about RIVOT?">
                <option value="">Where did you hear about RIVOT? *</option>
                <option>Google</option><option>YouTube</option><option>Social Media</option><option>Others</option>
              </select>
              <input name="referralCode" placeholder="Referral Code" aria-label="Referral Code" />
            </div>
            <label className="rivotBookingTerms">
              <input type="checkbox" required />
              <span>I agree to the <Link href="/legal/terms-and-conditions">Terms &amp; Conditions</Link> for this booking.</span>
            </label>
            <div className="rivotBookingPayment">
              <p>Booking Amount: Rs 499 Fully Refundable</p>
              <small>Zaakpay may show the amount in paise format. Rs 49900 means Rs 499.00 only.</small>
            </div>
            <p className="rivotBookingAmount">Booking Amount: ₹499 Fully Refundable</p>
            <small className="rivotBookingFinePrint">Zaakpay may show the amount in paise format. ₹49900 means ₹499.00 only.</small>
            <button className="rivotBookingSubmit" type="submit">Next <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </div>
      </div>

      <style>{`
        .rivotBooking { min-height: 100vh; padding: 104px 0 0; background: #f7f7f5; color: #151515; font-family: Montserrat, sans-serif; }
        .rivotBookingLayout { display: flex; min-height: calc(100vh - 104px); overflow: hidden; background: linear-gradient(120deg, #fff 0%, #f7f7f5 58%, #f4e5dd 100%); }
        .rivotBookingViewer { width: 55%; min-height: 700px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 60px; background: transparent; }
        .rivotBookingScooter { width: min(100%, 700px); height: min(78vh, 650px); object-fit: contain; user-select: none; }
        .rivotBookingHint { margin: -8px 0 0; color: #686c68; font-size: 13px; }
        .rivotBookingPanel { width: 45%; padding: 40px clamp(24px, 4vw, 60px) 70px 40px; background: rgba(255, 255, 255, .68); border-left: 1px solid rgba(16, 18, 17, .08); box-shadow: -16px 0 45px rgba(16, 18, 17, .06); animation: rivotBookingReveal .8s ease both; }
        .rivotBookingPanel h1 { margin: 0 0 20px; color: #151515; font-size: clamp(34px, 4vw, 48px); font-weight: 700; line-height: 1.1; letter-spacing: -.04em; }
        .rivotBookingPanel h1 span { color: #c85a22; }
        .rivotBookingPanel > p { color: #555; }
        .rivotBookingModels { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 15px; }
        .rivotBookingModels button { padding: 8px 16px; border: 1px solid #d4d4d0; border-radius: 999px; background: #fff; color: #555; cursor: pointer; }
        .rivotBookingModels button.active, .rivotBookingModels button:hover { border-color: #c85a22; background: #c85a22; color: #fff; }
        .rivotBookingColors { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 28px 0; }
        .rivotBookingColors > span { color: #151515; }
        .rivotBookingColors > div { display: flex; flex-wrap: wrap; gap: 10px; }
        .rivotBookingColors button { width: 24px; height: 24px; padding: 0; border: 2px solid transparent; border-radius: 50%; cursor: pointer; }
        .rivotBookingColors button.active { border-color: #fff; outline: 1px solid #c85a22; transform: scale(1.1); }
        .rivotBookingFields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 16px; margin-top: 22px; }
        .rivotBookingFields input, .rivotBookingFields select { width: 100%; min-width: 0; margin-bottom: 15px; padding: 11px 15px; border: 1px solid #d4d4d0; border-radius: 8px; background: rgba(255,255,255,.78); color: #151515; font: inherit; }
        .rivotBookingFields input::placeholder { color: #777; }
        .rivotBookingFields input:focus, .rivotBookingFields select:focus { outline: none; border-color: #c85a22; box-shadow: 0 0 0 3px rgba(200,90,34,.12); }
        .rivotBookingFields select option { background: #fff; color: #151515; }
        .rivotBookingFields .wide { grid-column: 1 / -1; }
        .rivotBookingTerms { display: flex; align-items: flex-start; gap: 10px; margin: 12px 0 15px; color: #555; font-size: 14px; line-height: 1.5; }
        .rivotBookingTerms input { margin-top: 4px; accent-color: #c85a22; }
        .rivotBookingTerms a { color: #c85a22; text-decoration: none; font-weight: 700; }
        .rivotBookingAmount { margin: 0 0 6px; color: #151515; font-weight: 700; }
        .rivotBookingFinePrint { display: block; margin-bottom: 14px; color: #777; font-size: 8px; }
        .rivotBookingSubmit { width: 100%; padding: 15px; border: 0; border-radius: 999px; background: #c85a22; color: #fff; font-size: 18px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 24px rgba(200,90,34,.24); }
        .rivotBookingSubmit:hover { background: #a9471a; }
        .rivotBookingSubmit span { margin-left: 12px; font-size: 22px; }
        .rivotBookingSuccess { margin: 16px 0; padding: 12px; border: 1px solid #2ecc71; border-radius: 4px; color: #2ecc71; font-size: 14px; }
        @keyframes rivotBookingReveal { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        html[data-rivot-theme="dark"] .rivotBooking { background: #080909; color: #f5f5f2; }
        html[data-rivot-theme="dark"] .rivotBookingLayout, html[data-rivot-theme="dark"] .rivotBookingViewer { background: #080909; }
        html[data-rivot-theme="dark"] .rivotBookingPanel { background: rgba(17,19,19,.88); border-left-color: rgba(255,255,255,.14); }
        html[data-rivot-theme="dark"] .rivotBookingPanel h1, html[data-rivot-theme="dark"] .rivotBookingAmount, html[data-rivot-theme="dark"] .rivotBookingColors > span { color: #f5f5f2; }
        html[data-rivot-theme="dark"] .rivotBookingPanel > p, html[data-rivot-theme="dark"] .rivotBookingTerms { color: #c9c9c2; }
        html[data-rivot-theme="dark"] .rivotBookingModels button { border-color: rgba(255,255,255,.22); background: transparent; color: #c9c9c2; }
        html[data-rivot-theme="dark"] .rivotBookingFields input, html[data-rivot-theme="dark"] .rivotBookingFields select { border-color: rgba(255,255,255,.22); background: rgba(255,255,255,.08); color: #f5f5f2; }
        html[data-rivot-theme="dark"] .rivotBookingFields input::placeholder { color: #a8a8a2; }
        html[data-rivot-theme="dark"] .rivotBookingFields select option { background: #111313; color: #f5f5f2; }
        html[data-rivot-theme="dark"] .rivotBookingHint, html[data-rivot-theme="dark"] .rivotBookingFinePrint { color: #a8a8a2; }
        @media (max-width: 768px) { .rivotBooking { padding-top: 70px; } .rivotBookingLayout { flex-direction: column; } .rivotBookingViewer, .rivotBookingPanel { width: 100%; } .rivotBookingViewer { min-height: 390px; padding: 20px; } .rivotBookingScooter { height: 330px; } .rivotBookingPanel { padding: 34px 20px 60px; } }
        @media (max-width: 500px) { .rivotBookingFields { grid-template-columns: 1fr; } .rivotBookingFields .wide { grid-column: auto; } }
        body:has(.rivotBooking) .rivotHeader,
        body:has(.rivotBooking) .rivotBrand,
        body:has(.rivotBooking) .rivotHeaderLinks a,
        body:has(.rivotBooking) .rivotProductsButton,
        body:has(.rivotBooking) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.rivotBooking) .rivotBrandMark img {
          filter: none;
        }

        body:has(.rivotBooking) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.rivotBooking) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .rivotBooking {
          min-height: 100vh;
          padding: 128px clamp(18px, 5vw, 84px) 82px;
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .16), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #090909;
          font-family: Montserrat, sans-serif;
        }

        .rivotBookingShell {
          width: min(100%, 1260px);
          margin: 0 auto;
        }

        .rivotBookingIntro {
          max-width: 820px;
          margin-bottom: 36px;
        }

        .rivotBookingIntro p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotBookingIntro h1 {
          margin: 0;
          color: #070707;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 950;
          line-height: .92;
          letter-spacing: 0;
        }

        .rivotBookingIntro h1 span {
          color: #ef7430;
        }

        .rivotBookingIntro strong,
        .rivotBookingIntro small {
          display: block;
          margin-top: 16px;
          color: #5f6b73;
          font-size: clamp(18px, 1.45vw, 23px);
          font-weight: 800;
          line-height: 1.45;
        }

        .rivotBookingIntro small {
          margin-top: 4px;
          font-size: 14px;
          font-weight: 700;
        }

        .rivotBookingLayout {
          display: grid;
          grid-template-columns: minmax(360px, 1fr) minmax(380px, 520px);
          gap: 24px;
          min-height: auto;
          overflow: visible;
          background: transparent;
        }

        .rivotBookingViewer {
          width: auto;
          min-height: 620px;
          display: grid;
          align-content: center;
          justify-items: center;
          padding: 32px;
          border: 1px solid rgba(17, 17, 17, .06);
          border-radius: 8px;
          background: rgba(255, 255, 255, .9);
          box-shadow: 0 24px 60px rgba(17, 17, 17, .08);
        }

        .rivotBookingScooter {
          width: min(100%, 700px);
          height: min(58vh, 500px);
          object-fit: contain;
          user-select: none;
          filter: drop-shadow(0 24px 26px rgba(17, 17, 17, .16));
        }

        .rivotBookingHint {
          margin: 6px 0 20px;
          color: #68747c;
          font-size: 13px;
          font-weight: 700;
        }

        .rivotBookingSpecs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          width: min(100%, 560px);
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: rgba(17, 17, 17, .08);
        }

        .rivotBookingSpecs div {
          display: grid;
          place-items: center;
          padding: 18px 10px;
          background: #fff;
          text-align: center;
        }

        .rivotBookingSpecs b {
          color: #070707;
          font-size: clamp(19px, 1.8vw, 26px);
          font-weight: 950;
        }

        .rivotBookingSpecs span {
          color: #68747c;
          font-size: 13px;
          font-weight: 700;
        }

        .rivotBookingPanel {
          width: auto;
          padding: 28px;
          border: 1px solid rgba(17, 17, 17, .06);
          border-radius: 8px;
          background: rgba(255, 255, 255, .94);
          box-shadow: 0 24px 60px rgba(17, 17, 17, .08);
          animation: none;
        }

        .rivotBookingPanelHeader p {
          margin: 0 0 8px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .rivotBookingPanelHeader h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(28px, 2.8vw, 42px);
          font-weight: 950;
          line-height: 1;
        }

        .rivotBookingLead {
          margin: 20px 0 0;
          color: #63707a;
          font-size: 14px;
          font-weight: 750;
          line-height: 1.55;
        }

        .rivotBookingModels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 18px 0 18px;
        }

        .rivotBookingModels button {
          display: grid;
          gap: 6px;
          min-height: 94px;
          padding: 16px;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 8px;
          background: #f8f8f8;
          color: #111;
          text-align: left;
          cursor: pointer;
        }

        .rivotBookingModels button span {
          font-size: 17px;
          font-weight: 950;
          line-height: 1.1;
        }

        .rivotBookingModels button small {
          color: #66727b;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.35;
        }

        .rivotBookingModels button.active,
        .rivotBookingModels button:hover {
          border-color: #ef7430;
          background: rgba(239, 116, 48, .08);
          color: #111;
        }

        .rivotBookingColors {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0 22px;
        }

        .rivotBookingColors > span {
          color: #111;
          font-size: 14px;
          font-weight: 900;
        }

        .rivotBookingColors > div {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .rivotBookingColors button {
          width: 28px;
          height: 28px;
          padding: 0;
          border: 2px solid #fff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 1px rgba(17, 17, 17, .16);
        }

        .rivotBookingColors button.active {
          outline: 2px solid #ef7430;
          outline-offset: 2px;
          transform: scale(1.04);
        }

        .rivotBookingFields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .rivotBookingFields input,
        .rivotBookingFields select {
          width: 100%;
          min-height: 48px;
          min-width: 0;
          margin: 0;
          padding: 12px 14px;
          border: 1px solid rgba(17, 17, 17, .12);
          border-radius: 8px;
          background: #f6f6f6;
          color: #111;
          font: inherit;
          font-size: 14px;
          font-weight: 750;
        }

        .rivotBookingFields input::placeholder {
          color: #7b858c;
        }

        .rivotBookingFields input:focus,
        .rivotBookingFields select:focus {
          outline: none;
          border-color: #ef7430;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(239, 116, 48, .12);
        }

        .rivotBookingFields select option {
          background: #fff;
          color: #111;
        }

        .rivotBookingFields .wide {
          grid-column: 1 / -1;
        }

        .rivotBookingTerms {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 18px 0 14px;
          color: #5f6b73;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.5;
        }

        .rivotBookingTerms input {
          margin-top: 4px;
          accent-color: #ef7430;
        }

        .rivotBookingTerms a {
          color: #ef7430;
          text-decoration: none;
          font-weight: 900;
        }

        .rivotBookingPayment {
          margin: 0 0 14px;
        }

        .rivotBookingPayment p {
          margin: 0 0 4px;
          color: #111;
          font-size: 15px;
          font-weight: 950;
        }

        .rivotBookingPayment small {
          display: block;
          color: #77828a;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.35;
        }

        .rivotBookingAmount,
        .rivotBookingFinePrint {
          display: none;
        }

        .rivotBookingSubmit {
          width: 100%;
          min-height: 54px;
          padding: 0 20px;
          border: 0;
          border-radius: 999px;
          background: #ef7430;
          color: #fff;
          font-size: 17px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 18px 36px rgba(239, 116, 48, .24);
        }

        .rivotBookingSubmit:hover {
          background: #d85f22;
        }

        .rivotBookingSubmit span {
          display: none;
        }

        .rivotBookingSubmit::after {
          content: ">";
          margin-left: 12px;
          font-size: 19px;
        }

        .rivotBookingSuccess {
          margin: 16px 0;
          padding: 13px 14px;
          border: 1px solid rgba(37, 175, 103, .28);
          border-radius: 8px;
          background: rgba(37, 175, 103, .08);
          color: #17844a;
          font-size: 13px;
          font-weight: 800;
        }

        html[data-rivot-theme="dark"] .rivotBooking,
        html[data-rivot-theme="dark"] .rivotBookingLayout,
        html[data-rivot-theme="dark"] .rivotBookingViewer {
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .12), transparent 28%),
            #080909;
        }

        @media (min-width: 1100px) {
          .rivotBooking {
            min-height: 100vh;
            padding: 86px clamp(18px, 3.2vw, 52px) 18px;
            overflow: hidden;
          }

          .rivotBookingShell {
            width: min(100%, 1580px);
          }

          .rivotBookingIntro {
            display: block;
            max-width: none;
            width: 100%;
            margin: 0 0 8px;
            justify-self: stretch;
          }

          .rivotBookingIntro p {
            margin-bottom: 6px;
            font-size: 11px;
          }

          .rivotBookingIntro h1 {
            max-width: none;
            font-size: clamp(42px, 4.7vw, 74px);
            line-height: .9;
            white-space: nowrap;
          }

          .rivotBookingIntro strong,
          .rivotBookingIntro small {
            grid-column: 2;
            margin-top: 0;
            font-size: 17px;
            line-height: 1.3;
          }

          .rivotBookingIntro strong {
            grid-row: 2 / span 2;
            align-self: center;
            white-space: nowrap;
          }

          .rivotBookingIntro small {
            grid-column: 1;
            grid-row: 3;
            margin-top: 4px;
            font-size: 12px;
          }

          .rivotBookingLayout {
            display: grid;
            grid-template-columns: minmax(500px, 1fr) minmax(420px, 600px);
            gap: 18px;
            min-height: calc(100vh - 285px);
            align-items: stretch;
          }

          .rivotBookingViewer,
          .rivotBookingPanel {
            width: auto;
            min-height: 0;
            padding: 18px 24px;
          }

          .rivotBookingViewer {
            max-height: calc(100vh - 248px);
            overflow: hidden;
            display: grid;
            grid-template-rows: auto minmax(0, 1fr) auto auto;
            align-items: center;
            justify-items: center;
          }

          .rivotBookingPanel {
            align-self: stretch;
            max-height: none;
            overflow: visible;
            padding: 18px 22px;
          }

          .rivotBookingScooter {
            width: min(100%, 560px);
            height: min(42vh, 365px);
          }

          .rivotBookingHint {
            margin: -8px 0 10px;
            font-size: 11px;
          }

          .rivotBookingSpecs {
            width: min(100%, 500px);
          }

          .rivotBookingSpecs div {
            min-height: 54px;
            padding: 8px;
          }

          .rivotBookingSpecs b {
            font-size: 22px;
          }

          .rivotBookingSpecs span {
            font-size: 11px;
          }

          .rivotBookingPanelHeader p {
            margin-bottom: 5px;
            font-size: 11px;
          }

          .rivotBookingPanelHeader h2 {
            font-size: clamp(28px, 2.2vw, 38px);
          }

          .rivotBookingModels {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            margin: 14px 0 12px;
          }

          .rivotBookingModels button {
            min-height: 64px;
            padding: 10px 13px;
          }

          .rivotBookingModels button span {
            font-size: 17px;
          }

          .rivotBookingModels button small {
            font-size: 11px;
          }

          .rivotBookingColors {
            margin: 10px 0 12px;
          }

          .rivotBookingColors button {
            width: 24px;
            height: 24px;
          }

          .rivotBookingLead {
            margin-top: 8px;
            font-size: 12px;
            line-height: 1.3;
          }

          .rivotBookingFields {
            gap: 7px 10px;
            margin-top: 10px;
          }

          .rivotBookingFields input,
          .rivotBookingFields select {
            min-height: 38px;
            padding: 8px 11px;
            font-size: 12px;
            border-radius: 7px;
          }

          .rivotBookingTerms {
            margin: 8px 0 6px;
            font-size: 10px;
          }

          .rivotBookingPayment {
            margin-bottom: 8px;
          }

          .rivotBookingPayment p {
            font-size: 13px;
          }

          .rivotBookingPayment small {
            font-size: 10px;
          }

          .rivotBookingSubmit {
            min-height: 42px;
            font-size: 15px;
          }

          .rivotBookingAmount,
          .rivotBookingFinePrint {
            display: none;
          }

          .rivotBookingViewer .rivotBookingIntro {
            display: grid;
            grid-template-columns: 1fr;
            align-self: start;
            margin-bottom: 0;
          }

          .rivotBookingViewer .rivotBookingIntro h1 {
            font-size: clamp(42px, 4vw, 62px);
            line-height: .9;
            white-space: nowrap;
          }

          .rivotBookingViewer .rivotBookingIntro strong {
            grid-column: 1;
            grid-row: auto;
            margin-top: 4px;
            font-size: 16px;
            white-space: normal;
          }

          .rivotBookingViewer .rivotBookingIntro small {
            grid-column: 1;
            grid-row: auto;
            margin-top: 2px;
            font-size: 11px;
          }

          .rivotBookingViewer .rivotRotationStage {
            align-self: center;
            width: 100%;
            min-height: 245px;
            display: grid;
            place-items: center;
          }

          .rivotBookingViewer .rivotBookingScooter {
            width: min(100%, 470px);
            height: 270px;
          }

          .rivotBookingViewer .rivotBookingHint {
            margin: 0 0 8px;
          }
        }

        @media (max-width: 980px) {
          .rivotBooking {
            padding-top: 112px;
          }

          .rivotBookingLayout {
            grid-template-columns: 1fr;
          }

          .rivotBookingViewer {
            min-height: 460px;
          }
        }

        @media (max-width: 600px) {
          .rivotBooking {
            padding: 92px 16px 56px;
          }

          .rivotBookingViewer,
          .rivotBookingPanel {
            padding: 20px;
          }

          .rivotBookingModels,
          .rivotBookingFields,
          .rivotBookingSpecs {
            grid-template-columns: 1fr;
          }

          .rivotBookingScooter {
            height: 300px;
          }
        }

        @media (min-width: 1100px) {
          .rivotBooking {
            overflow: visible;
          }

          .rivotBookingPanel {
            max-height: none;
            overflow: visible;
            align-self: stretch;
            padding: 14px 18px;
          }

          .rivotBookingViewer,
          .rivotBookingPanel {
            min-height: 558px;
          }

          .rivotBookingPanelHeader p {
            margin-bottom: 4px;
            font-size: 10px;
          }

          .rivotBookingPanelHeader h2 {
            font-size: clamp(28px, 2vw, 36px);
            line-height: .95;
          }

          .rivotBookingModels {
            gap: 8px;
            margin: 10px 0 8px;
          }

          .rivotBookingModels button {
            min-height: 56px;
            padding: 8px 12px;
            border-radius: 8px;
          }

          .rivotBookingModels button span {
            font-size: 15px;
          }

          .rivotBookingModels button small {
            margin-top: 5px;
            font-size: 10px;
          }

          .rivotBookingColors {
            margin: 7px 0 8px;
          }

          .rivotBookingColors button {
            width: 22px;
            height: 22px;
          }

          .rivotBookingLead {
            margin-top: 5px;
            font-size: 11px;
            line-height: 1.25;
          }

          .rivotBookingFields {
            gap: 6px 8px;
            margin-top: 8px;
          }

          .rivotBookingFields input,
          .rivotBookingFields select {
            min-height: 34px;
            margin-bottom: 0;
            padding: 7px 10px;
            font-size: 11px;
            border-radius: 7px;
          }

          .rivotBookingTerms {
            margin: 7px 0 5px;
            font-size: 10px;
            line-height: 1.25;
          }

          .rivotBookingPayment {
            margin-bottom: 7px;
          }

          .rivotBookingPayment p {
            font-size: 12px;
          }

          .rivotBookingPayment small {
            font-size: 9px;
          }

          .rivotBookingSubmit {
            min-height: 38px;
            padding: 8px 14px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
