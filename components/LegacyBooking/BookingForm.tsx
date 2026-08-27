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

export function LegacyBookingForm() {
  const [model, setModel] = useState<Model>("sport");
  const [color, setColor] = useState(models[0].colors[0]);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const selectedModel = models.find((item) => item.id === model) ?? models[0];

  function chooseModel(nextModel: Model) {
    setModel(nextModel);
    setColor(models.find((item) => item.id === nextModel)?.colors[0] ?? "#000000");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    formData.set("amount", "499");
    formData.set("price", "499");
    formData.set("model", model);
    formData.set("product_name", selectedModel.label);
    formData.set("color", color);
    formData.set("orderId", `RIVOT-${Date.now()}`);
    formData.set("order_id", `RIVOT-${Date.now()}`);
    formData.set("trackId", `RIVOT-${Date.now()}`);

    try {
      const response = await fetch("/api/book-now", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { success?: boolean; orderId?: string; message?: string };
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Booking could not be saved.");
      }

      const nextOrderId = payload.orderId || "RIVOT-BOOKING";
      setOrderId(nextOrderId);
      setSubmitted(true);
      event.currentTarget.reset();
      setState("");
      setColor(models[0].colors[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed.");
    } finally {
      setLoading(false);
    }
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
                <button
                  key={item.id}
                  type="button"
                  className={model === item.id ? "active" : ""}
                  onClick={() => chooseModel(item.id)}
                >
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
            {submitted ? (
              <div className="rivotBookingSuccess">
                Your booking has been saved successfully. Order ID: <strong>{orderId}</strong>
              </div>
            ) : null}
            {error ? <div className="rivotBookingError">{error}</div> : null}

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="model" value={model} />
              <input type="hidden" name="color" value={color} />
              <input type="hidden" name="amount" value="499" />
              <input type="hidden" name="price" value="499" />
              <div className="rivotBookingFields">
                <input name="name" placeholder="First Name" required aria-label="First Name" />
                <input name="lastName" placeholder="Last Name" aria-label="Last Name" />
                <input name="mobile" placeholder="Mobile" type="tel" pattern="[0-9]{10}" required aria-label="Mobile Number" />
                <input name="email" placeholder="Email" type="email" required aria-label="Email Address" />
                <input name="address" placeholder="Address" className="wide" aria-label="Address" />
                <input name="country" placeholder="Country" aria-label="Country" defaultValue="India" />
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
                  <option>Google</option>
                  <option>YouTube</option>
                  <option>Social Media</option>
                  <option>Others</option>
                </select>
                <input name="referralCode" placeholder="Referral Code" aria-label="Referral Code" />
              </div>

              <label className="rivotBookingTerms">
                <input type="checkbox" required />
                <span>
                  I agree to the <Link href="/legal/terms-and-conditions">Terms &amp; Conditions</Link> for this booking.
                </span>
              </label>

              <div className="rivotBookingPayment">
                <p>Booking Amount: Rs 499 Fully Refundable</p>
                <small>Zaakpay may show the amount in paise format. Rs 49900 means Rs 499.00 only.</small>
              </div>

              <p className="rivotBookingAmount">Booking Amount: ₹499 Fully Refundable</p>
              <small className="rivotBookingFinePrint">Zaakpay may show the amount in paise format. ₹49900 means ₹499.00 only.</small>

              <button className="rivotBookingSubmit" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next"} <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .rivotBooking { min-height: 100vh; padding: 104px 0 0; background: #f7f7f5; color: #151515; font-family: inherit; }
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
        .rivotBookingSubmit:disabled { opacity: .7; cursor: wait; }
        .rivotBookingSubmit span { margin-left: 12px; font-size: 22px; }
        .rivotBookingSuccess { margin: 16px 0; padding: 12px; border: 1px solid #2ecc71; border-radius: 4px; color: #2ecc71; font-size: 14px; }
        .rivotBookingError { margin: 16px 0; padding: 12px; border: 1px solid #f0a3a3; border-radius: 4px; color: #b91c1c; font-size: 14px; }
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
        body:has(.rivotBooking) .rivotBrandMark img { filter: none; }
        body:has(.rivotBooking) .rivotBook { border-color: #ef7430; background: transparent; color: #ef7430; }
        body:has(.rivotBooking) .rivotThemeToggle { border-color: rgba(0, 0, 0, .08); background: rgba(255, 255, 255, .78); color: #111; box-shadow: 0 8px 24px rgba(0, 0, 0, .08); }
      `}</style>
    </section>
  );
}
