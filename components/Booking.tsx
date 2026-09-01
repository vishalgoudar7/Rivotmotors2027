"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sportModelImage from "@/asset/Model/Sport_NX100.png";
import proModelImage from "@/asset/Model/Pro.png";
import sportView1 from "@/asset/models/Sports/1.png";
import sportView2 from "@/asset/models/Sports/2.png";
import sportView3 from "@/asset/models/Sports/3.png";
import sportView4 from "@/asset/models/Sports/4.png";
import proFrontView from "@/asset/models/pro/Front view.png";
import proLeftSideView from "@/asset/models/pro/Left side view.png";
import proRearView from "@/asset/models/pro/Rear view.png";
import proSilverGreyView from "@/asset/models/pro/Silver grey1 (2).png";

type Model = "sport" | "pro";
type BookingField = "name" | "mobile" | "email" | "pincode" | "state" | "city" | "source";
type BookingErrors = Partial<Record<BookingField | "terms", string>>;

const bookingColors = ["#FCFCFC", "#757180", "#CD2E30", "#050505", "#C3CADB"];

const models = [
  {
    id: "pro" as const,
    label: "Pro",
    price: "₹ 1,29,000",
    colors: bookingColors,
    image: proModelImage,
    gallery: [proFrontView, proLeftSideView, proRearView, proSilverGreyView],
  },
  {
    id: "sport" as const,
    label: "Sport",
    price: "₹ 1,39,000",
    colors: bookingColors,
    image: sportModelImage,
    gallery: [sportView1, sportView2, sportView3, sportView4],
  },
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

function FieldError({ field, errors, touched }: { field: BookingField | "terms"; errors: BookingErrors; touched: Partial<Record<BookingField | "terms", boolean>> }) {
  const message = touched[field] ? errors[field] : undefined;
  return message ? <span className="rivotBookingFieldError" id={`${field}-error`} role="alert">{message}</span> : null;
}

export function Booking() {
  const router = useRouter();
  const [model, setModel] = useState<Model>(models[0].id);
  const [color, setColor] = useState(models[0].colors[0]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<BookingErrors>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<BookingField | "terms", boolean>>>({});
  const selectedModel = models.find((item) => item.id === model) ?? models[0];

  function chooseModel(nextModel: Model) {
    setModel(nextModel);
    setColor(models.find((item) => item.id === nextModel)?.colors[0] ?? "#000000");
    setGalleryIndex(0);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateFields(formData, event.currentTarget.querySelector<HTMLInputElement>("input[type=checkbox]")?.checked ?? false);
    setFieldErrors(nextErrors);
    setTouchedFields({ name: true, mobile: true, email: true, pincode: true, state: true, city: true, source: true, terms: true });
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setError("");

    formData.set("amount", "499");
    formData.set("price", "499");
    formData.set("model", model);
    formData.set("product_name", selectedModel.label);
    formData.set("color", color);

    const nextOrderId = `RIVOT-${Date.now()}`;
    formData.set("orderId", nextOrderId);
    formData.set("order_id", nextOrderId);
    formData.set("trackId", nextOrderId);

    try {
      const response = await fetch("/api/book-now", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { success?: boolean; orderId?: string; message?: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Booking could not be saved.");
      }

      router.push(`/booking/payment?order_id=${encodeURIComponent(payload.orderId || nextOrderId)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  function validateFields(formData: FormData, termsAccepted: boolean): BookingErrors {
    const nextErrors: BookingErrors = {};
    const name = String(formData.get("name") || "").trim();
    const mobile = String(formData.get("mobile") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const pincode = String(formData.get("pincode") || "").trim();
    const stateValue = String(formData.get("state") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const source = String(formData.get("source") || "").trim();

    if (!name) nextErrors.name = "Please enter your first name.";
    if (!/^\d{10}$/.test(mobile)) nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!/^\d{6}$/.test(pincode)) nextErrors.pincode = "Enter a valid 6-digit pincode.";
    if (!stateValue) nextErrors.state = "Please select your state.";
    if (!city) nextErrors.city = "Please select your city.";
    if (!source) nextErrors.source = "Please select one option.";
    if (!termsAccepted) nextErrors.terms = "Please accept the terms and conditions.";

    return nextErrors;
  }

  function handleFieldBlur(field: BookingField, form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors = validateFields(formData, form.querySelector<HTMLInputElement>("input[type=checkbox]")?.checked ?? false);
    setTouchedFields((current) => ({ ...current, [field]: true }));
    setFieldErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  function fieldProps(field: BookingField) {
    const hasError = Boolean(touchedFields[field] && fieldErrors[field]);
    return {
      "aria-invalid": hasError,
      "aria-describedby": hasError ? `${field}-error` : undefined,
      className: hasError ? "hasError" : undefined,
    };
  }

  return (
    <section className="rivotBooking">
      <div className="rivotBookingShell">
        <div className="rivotBookingLayout">
        <div className="rivotBookingViewer">
          <div className="rivotBookingIntro">
              <p>Reserve</p>
              <h1>
                NX <span>100</span>
              </h1>
              <strong>Starting at {selectedModel.price}*</strong>
            <small>Booking amount Rs 499. Fully refundable.</small>
          </div>
          <div className="rivotRotationStage">
            <img
              key={`${selectedModel.id}-${galleryIndex}`}
              className="rivotBookingScooter"
              src={(selectedModel.gallery[galleryIndex] ?? selectedModel.image).src}
              alt={`RIVOT NX100 ${selectedModel.label} scooter`}
              decoding="async"
            />
          </div>
          <div className="rivotBookingGallery" aria-label={`${selectedModel.label} scooter gallery`}>
            {selectedModel.gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={galleryIndex === index ? "active" : ""}
                aria-label={`Show ${selectedModel.label} view ${index + 1}`}
                aria-pressed={galleryIndex === index}
                onClick={() => setGalleryIndex(index)}
              >
                <img src={image.src} alt="" decoding="async" />
              </button>
            ))}
          </div>
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
              <p>Choose Model</p>
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
          {error ? <div className="rivotBookingError">{error}</div> : null}
          <form onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="model" value={model} />
            <input type="hidden" name="color" value={color} />
            <input type="hidden" name="amount" value="499" />
            <input type="hidden" name="price" value="499" />
            <input type="hidden" name="product_name" value={selectedModel.label} />
            <div className="rivotBookingFields">
              <div className="rivotBookingField"><label htmlFor="booking-name">First Name</label><input id="booking-name" name="name" placeholder="First Name" required autoComplete="given-name" {...fieldProps("name")} onBlur={(event) => handleFieldBlur("name", event.currentTarget.form!)} /><FieldError field="name" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-last-name">Last Name</label><input id="booking-last-name" name="lastName" placeholder="Last Name" autoComplete="family-name" /></div>
              <div className="rivotBookingField"><label htmlFor="booking-mobile">Mobile</label><input id="booking-mobile" name="mobile" placeholder="Mobile" type="tel" pattern="[0-9]{10}" required autoComplete="tel" {...fieldProps("mobile")} onBlur={(event) => handleFieldBlur("mobile", event.currentTarget.form!)} /><FieldError field="mobile" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-email">Email</label><input id="booking-email" name="email" placeholder="Email" type="email" required autoComplete="email" {...fieldProps("email")} onBlur={(event) => handleFieldBlur("email", event.currentTarget.form!)} /><FieldError field="email" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField wide"><label htmlFor="booking-address">Address</label><input id="booking-address" name="address" placeholder="Address" autoComplete="street-address" /></div>
              <div className="rivotBookingField"><label htmlFor="booking-country">Country</label><input id="booking-country" name="country" placeholder="Country" autoComplete="country-name" defaultValue="India" /></div>
              <div className="rivotBookingField"><label htmlFor="booking-pincode">Pincode</label><input id="booking-pincode" name="pincode" placeholder="Pincode *" inputMode="numeric" maxLength={6} pattern="[0-9]{6}" required autoComplete="postal-code" {...fieldProps("pincode")} onBlur={(event) => handleFieldBlur("pincode", event.currentTarget.form!)} /><FieldError field="pincode" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-state">State</label><select id="booking-state" name="state" required aria-label="Select State" value={state} {...fieldProps("state")} onChange={(event) => setState(event.target.value)} onBlur={(event) => handleFieldBlur("state", event.currentTarget.form!)}>
                <option value="">Choose State</option>
                {states.map((item) => <option key={item}>{item}</option>)}
              </select><FieldError field="state" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-city">City</label><select id="booking-city" name="city" required aria-label="Select City" disabled={!state} {...fieldProps("city")} onBlur={(event) => handleFieldBlur("city", event.currentTarget.form!)}>
                <option value="">Choose City</option>
                {cities[state]?.map((item) => <option key={item}>{item}</option>)}
              </select><FieldError field="city" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-source">How did you hear about RIVOT?</label><select id="booking-source" name="source" required aria-label="Where did you hear about RIVOT?" {...fieldProps("source")} onBlur={(event) => handleFieldBlur("source", event.currentTarget.form!)}>
                <option value="">Where did you hear about RIVOT? *</option>
                <option>Google</option><option>YouTube</option><option>Social Media</option><option>Others</option>
              </select><FieldError field="source" errors={fieldErrors} touched={touchedFields} /></div>
              <div className="rivotBookingField"><label htmlFor="booking-referral">Referral Code</label><input id="booking-referral" name="referralCode" placeholder="Referral Code" /></div>
            </div>
            <label className="rivotBookingTerms">
              <input type="checkbox" required aria-invalid={Boolean(touchedFields.terms && fieldErrors.terms)} aria-describedby={touchedFields.terms && fieldErrors.terms ? "terms-error" : undefined} onChange={(event) => { setTouchedFields((current) => ({ ...current, terms: true })); setFieldErrors((current) => ({ ...current, terms: event.target.checked ? undefined : "Please accept the terms and conditions." })); }} />
              <span>I agree to the <Link href="/legal/terms-and-conditions">Terms &amp; Conditions</Link> for this booking.</span>
            </label>
            <FieldError field="terms" errors={fieldErrors} touched={touchedFields} />
            <div className="rivotBookingPayment">
              <div><small>Due Today</small><strong>₹ 499</strong></div>
              <span>Fully refundable deposit.</span>
            </div>
            <p className="rivotBookingAmount">Booking Amount: ₹499 Fully Refundable</p>
            <small className="rivotBookingFinePrint">Zaakpay may show the amount in paise format. ₹49900 means ₹499.00 only.</small>
            <button className="rivotBookingSubmit" type="submit" disabled={loading}>{loading ? "Saving..." : "Continue"} <span aria-hidden="true">→</span></button>
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

        body:has(.rivotBooking) .rivotBrandMark img {
          filter: none;
        }

        body:has(.rivotBooking) .rivotBook {
          display: none;
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
          font-family: inherit;
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

        /* Final booking layout system: keeps the product gallery and form balanced across viewports. */
        body:has(.rivotBooking) .rivotBooking {
          box-sizing: border-box;
          min-height: calc(100vh - 86px);
          padding: 104px clamp(24px, 5vw, 76px) 40px;
          background: linear-gradient(125deg, #fff 0%, #fbfbfa 68%, #fff3ea 100%);
        }

        body:has(.rivotBooking) .rivotBooking * { box-sizing: border-box; }
        body:has(.rivotBooking) .rivotBookingShell { width: min(100%, 1320px); }
        body:has(.rivotBooking) .rivotBookingLayout {
          display: grid;
          grid-template-columns: minmax(0, 45fr) minmax(0, 55fr);
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }

        body:has(.rivotBooking) .rivotBookingViewer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 0;
          padding: 0;
          overflow: visible;
        }

        body:has(.rivotBooking) .rivotBookingIntro {
          width: 100%;
          margin: 0 0 8px;
        }

        body:has(.rivotBooking) .rivotBookingIntro p {
          margin: 0 0 10px;
          font-size: 13px;
          line-height: 1;
        }

        body:has(.rivotBooking) .rivotBookingIntro h1 {
          margin: 0;
          font-size: clamp(62px, 6.2vw, 96px);
          line-height: .88;
        }

        body:has(.rivotBooking) .rivotBookingIntro strong {
          margin-top: 14px;
          font-size: clamp(17px, 1.45vw, 22px);
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingIntro small {
          margin-top: 5px;
          font-size: 12px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
          width: 100%;
          height: clamp(280px, 35vw, 410px);
          min-height: 0;
          display: grid;
          place-items: center;
          overflow: visible;
        }

        body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
          width: min(100%, 560px);
          height: 100%;
          object-fit: contain;
        }

        body:has(.rivotBooking) .rivotBookingGallery {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(100%, 520px);
          height: 70px;
          gap: 10px;
          margin: 0 0 16px;
        }

        body:has(.rivotBooking) .rivotBookingGallery img,
        body:has(.rivotBooking) .rivotBooking360 {
          width: 100%;
          height: 70px;
          min-width: 0;
          border-radius: 10px;
          object-fit: contain;
        }

        body:has(.rivotBooking) .rivotBookingGallery button {
          width: 100%;
          height: 70px;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 10px;
          background: #f6f6f6;
          cursor: pointer;
        }

        body:has(.rivotBooking) .rivotBookingGallery button.active {
          border-color: #ef7430;
          box-shadow: 0 0 0 1px #ef7430;
        }

        body:has(.rivotBooking) .rivotBooking360 { gap: 7px; }
        body:has(.rivotBooking) .rivotBooking360 b { font-size: 25px; }
        body:has(.rivotBooking) .rivotBooking360 small { font-size: 10px; font-weight: 800; }

        body:has(.rivotBooking) .rivotBookingViewer .rivotBookingSpecs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          width: min(100%, 520px);
          height: 86px;
          min-height: 86px;
          margin: 0;
          border-radius: 12px;
        }

        body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 86px; padding: 12px 8px; }
        body:has(.rivotBooking) .rivotBookingSpecs b { font-size: clamp(19px, 2vw, 26px); }
        body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 10px; text-transform: uppercase; }

        body:has(.rivotBooking) .rivotBookingPanel {
          width: 100%;
          min-width: 0;
          padding: 24px clamp(22px, 2.5vw, 34px) 26px;
          border-radius: 12px;
        }

        body:has(.rivotBooking) .rivotBookingPanelHeader p { margin: 0 0 16px; font-size: 18px; }
        body:has(.rivotBooking) .rivotBookingModels { gap: 12px; margin: 0 0 28px; }
        body:has(.rivotBooking) .rivotBookingModels button { min-height: 76px; padding: 14px 18px; border-radius: 11px; }
        body:has(.rivotBooking) .rivotBookingModels button span { font-size: 17px; }
        body:has(.rivotBooking) .rivotBookingModels button small { font-size: 12px; }
        body:has(.rivotBooking) .rivotBookingColors { margin: 0 0 28px; padding: 0 0 18px; border-top: 0; }
        body:has(.rivotBooking) .rivotBookingColors::before { top: -26px; font-size: 17px; }
        body:has(.rivotBooking) .rivotBookingColors > span { display: none; }
        body:has(.rivotBooking) .rivotBookingColors > div { gap: 16px; justify-content: flex-end; }
        body:has(.rivotBooking) .rivotBookingColors button { width: 30px; height: 30px; }
        body:has(.rivotBooking) .rivotBookingLead { margin: 0; font-size: 0; line-height: 1; }
        body:has(.rivotBooking) .rivotBookingLead::before { margin-bottom: 14px; font-size: 17px; line-height: 1; }
        body:has(.rivotBooking) .rivotBookingFields { gap: 10px 12px; margin-top: 0; }
        body:has(.rivotBooking) .rivotBookingFields input,
        body:has(.rivotBooking) .rivotBookingFields select { min-height: 46px; padding: 11px 13px; border-radius: 9px; font-size: 13px; }
        body:has(.rivotBooking) .rivotBookingTerms { margin: 14px 0 16px; font-size: 12px; }
        body:has(.rivotBooking) .rivotBookingPayment { margin: 0 0 18px; padding-top: 16px; }
        body:has(.rivotBooking) .rivotBookingPayment div strong { font-size: 29px; }
        body:has(.rivotBooking) .rivotBookingSubmit { min-height: 52px; border-radius: 9px; font-size: 16px; }

        @media (max-width: 999px) {
          body:has(.rivotBooking) .rivotBooking { padding: 96px 20px 56px; }
          body:has(.rivotBooking) .rivotBookingLayout { grid-template-columns: 1fr; gap: 28px; }
          body:has(.rivotBooking) .rivotBookingViewer { width: min(100%, 720px); margin: 0 auto; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { height: min(60vw, 420px); }
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingGallery,
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingSpecs { width: min(100%, 620px); }
          body:has(.rivotBooking) .rivotBookingPanel { width: min(100%, 720px); margin: 0 auto; }
        }

        @media (max-width: 520px) {
          body:has(.rivotBooking) .rivotBooking { padding: 82px 14px 40px; }
          body:has(.rivotBooking) .rivotBookingLayout { gap: 22px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(56px, 18vw, 82px); }
          body:has(.rivotBooking) .rivotBookingIntro strong { font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { height: 280px; }
          body:has(.rivotBooking) .rivotBookingGallery { gap: 6px; height: 58px; margin-bottom: 12px; }
          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 { height: 58px; border-radius: 8px; }
          body:has(.rivotBooking) .rivotBooking360 { gap: 2px; }
          body:has(.rivotBooking) .rivotBooking360 b { font-size: 19px; }
          body:has(.rivotBooking) .rivotBooking360 small { font-size: 8px; }
          body:has(.rivotBooking) .rivotBookingSpecs { height: 78px; min-height: 78px; border-radius: 10px; }
          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 78px; padding: 9px 3px; }
          body:has(.rivotBooking) .rivotBookingSpecs b { font-size: 17px; }
          body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 8px; }
          body:has(.rivotBooking) .rivotBookingPanel { padding: 22px 14px 20px; border-radius: 11px; }
          body:has(.rivotBooking) .rivotBookingModels { grid-template-columns: 1fr; gap: 9px; margin-bottom: 26px; }
          body:has(.rivotBooking) .rivotBookingModels button { min-height: 66px; }
          body:has(.rivotBooking) .rivotBookingFields { grid-template-columns: 1fr; gap: 9px; }
          body:has(.rivotBooking) .rivotBookingFields .wide { grid-column: auto; }
          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select { min-height: 44px; font-size: 13px; }
          body:has(.rivotBooking) .rivotBookingSubmit { min-height: 50px; }
        }
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

        .rivotBookingGallery {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          width: min(100%, 560px);
          margin: 4px 0 8px;
        }

        .rivotBookingGallery img,
        .rivotBooking360 {
          width: 100%;
          height: 68px;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 8px;
          background: #f6f6f6;
          object-fit: contain;
        }

        .rivotBookingGallery button {
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 8px;
          background: #f6f6f6;
          cursor: pointer;
        }

        .rivotBookingGallery button.active {
          border-color: #ef7430;
          box-shadow: 0 0 0 1px #ef7430;
        }

        .rivotBookingGallery img:first-child { border-color: #ef7430; }

        .rivotBooking360 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #111;
        }

        .rivotBooking360 b { font-size: 28px; font-weight: 400; }
        .rivotBooking360 small { font-size: 10px; font-weight: 800; }

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

        .rivotBookingPanelHeader p::before {
          content: "1. ";
          color: #111;
          letter-spacing: 0;
        }

        .rivotBookingPanelHeader h2 { display: none; }
        .rivotBookingColors::before {
          content: "2. Choose Color";
          position: absolute;
          top: -30px;
          left: 0;
          color: #111;
          font-size: 15px;
          font-weight: 950;
        }
        .rivotBookingColors { position: relative; padding-top: 28px; border-top: 1px solid rgba(17, 17, 17, .08); }
        .rivotBookingLead::before {
          content: "3. Your Details";
          display: block;
          margin-bottom: 12px;
          color: #111;
          font-size: 15px;
          font-weight: 950;
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

          .rivotBookingGallery {
            width: min(100%, 470px);
            gap: 8px;
            margin: 0 0 8px;
          }

          .rivotBookingGallery img,
          .rivotBooking360 {
            height: 58px;
          }

          .rivotBookingViewer .rivotBookingHint { order: 5; }
          .rivotBookingViewer .rivotBookingSpecs { order: 6; }
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

          .rivotBookingColors::before,
          .rivotBookingLead::before { font-size: 13px; }
        }

        body:has(.rivotBooking) { background: #f8f8f8; }
        body:has(.rivotBooking) .rivotBooking {
          min-height: calc(100vh - 82px);
          padding: 104px clamp(28px, 4vw, 72px) 24px;
          background: linear-gradient(115deg, #fff 0%, #fff 64%, #fff4ed 100%);
        }
        body:has(.rivotBooking) .rivotBookingLayout { grid-template-columns: minmax(500px, 1fr) minmax(520px, 710px); gap: 28px; }
        body:has(.rivotBooking) .rivotBookingViewer { border: 0; background: transparent; box-shadow: none; border-radius: 0; padding: 8px 24px 0; }
        body:has(.rivotBooking) .rivotBookingPanel { background: rgba(255,255,255,.86); border: 1px solid rgba(30,30,30,.06); box-shadow: 0 12px 36px rgba(40,30,20,.08); }
        body:has(.rivotBooking) .rivotBookingPanel h2,
        body:has(.rivotBooking) .rivotBookingPanelHeader h2 { display: none; }
        body:has(.rivotBooking) .rivotBookingPanelHeader p { color: #111; letter-spacing: 0; font-size: 16px; text-transform: none; }
        body:has(.rivotBooking) .rivotBookingPanelHeader p::before { color: #111; }
        body:has(.rivotBooking) .rivotBookingPanelHeader p { font-weight: 950; }
        body:has(.rivotBooking) .rivotBookingPanel > .rivotBookingModels { margin-top: 16px; }
        body:has(.rivotBooking) .rivotBookingColors::before,
        body:has(.rivotBooking) .rivotBookingLead::before { color: #111; }
        body:has(.rivotBooking) .rivotBookingColors { border-top-color: rgba(17,17,17,.08); }
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBooking,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingLayout,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingViewer { background: linear-gradient(115deg, #fff 0%, #fff 64%, #fff4ed 100%); }
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingPanel { background: rgba(255,255,255,.92); }
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingPanel h1,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingPanel > p,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingPanelHeader p,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingColors > span,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingAmount { color: #111; }
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingModels button { background: #fff; color: #111; border-color: rgba(17,17,17,.12); }
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingFields input,
        html[data-rivot-theme="dark"] body:has(.rivotBooking) .rivotBookingFields select { background: #f6f6f6; color: #111; border-color: rgba(17,17,17,.12); }
        body:has(.rivotBooking) .rivotBrandMark img { filter: brightness(0); }
        @media (min-width: 981px) and (max-width: 1200px) {
          body:has(.rivotBooking) .rivotBooking { padding-left: 20px; padding-right: 20px; }
          body:has(.rivotBooking) .rivotBookingLayout { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; }
          body:has(.rivotBooking) .rivotBookingViewer { padding-left: 0; padding-right: 0; }
          body:has(.rivotBooking) .rivotBookingPanel { padding-left: 16px; padding-right: 16px; }
        }
        @media (min-width: 601px) and (max-width: 980px) {
          body:has(.rivotBooking) .rivotHeader { gap: 18px; padding: 0 20px; }
          body:has(.rivotBooking) .rivotHeaderLinks { gap: 16px; }
          body:has(.rivotBooking) .rivotCommunityNav,
          body:has(.rivotBooking) .rivotHeaderLinks > a[href="/careers"] { display: none; }
          body:has(.rivotBooking) .rivotBrandMark { width: 132px; }
          body:has(.rivotBooking) .rivotThemeToggle { padding-left: 10px; padding-right: 10px; }
          body:has(.rivotBooking) .rivotBook { padding-left: 14px; padding-right: 14px; }
        }
        @media (max-width: 980px) { body:has(.rivotBooking) .rivotBooking { padding: 96px 18px 40px; } body:has(.rivotBooking) .rivotBookingLayout { grid-template-columns: 1fr; gap: 18px; } body:has(.rivotBooking) .rivotBookingViewer { padding: 10px; } }

        @media (min-width: 760px) {
          body:has(.rivotBooking) .rivotBooking {
            min-height: 100vh;
            padding: 72px 26px 42px;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingShell { width: min(100%, 1100px); }
          body:has(.rivotBooking) .rivotBookingLayout {
            grid-template-columns: minmax(0, .93fr) minmax(0, 1.07fr);
            gap: 30px;
            min-height: calc(100vh - 28px);
            align-items: stretch;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            display: grid;
            grid-template-rows: auto 250px auto 0 auto;
            min-height: 0;
            padding: 10px 0 0;
            align-content: stretch;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingIntro { margin: 0; text-align: left; }
          body:has(.rivotBooking) .rivotBookingIntro p { margin: 4px 0 10px; font-size: 13px; letter-spacing: 0; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(64px, 7vw, 86px); line-height: .88; }
          body:has(.rivotBooking) .rivotBookingIntro strong { margin-top: 14px; color: #69747c; font-size: 18px; }
          body:has(.rivotBooking) .rivotBookingIntro small { margin-top: 3px; color: #69747c; font-size: 12px; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { align-self: stretch; min-height: 0; width: 100%; display: grid; place-items: center; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter { width: min(100%, 500px); height: 250px; }
          body:has(.rivotBooking) .rivotBookingGallery { width: min(100%, 440px); margin: 0 auto 8px; }
          body:has(.rivotBooking) .rivotBookingGallery img, body:has(.rivotBooking) .rivotBooking360 { height: 56px; }
          body:has(.rivotBooking) .rivotBookingHint { display: none; }
          body:has(.rivotBooking) .rivotBookingSpecs { width: min(100%, 450px); margin: 0 auto; }
          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 62px; padding: 7px 8px; }
          body:has(.rivotBooking) .rivotBookingSpecs b { font-size: 20px; }
          body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 10px; text-transform: uppercase; }

          body:has(.rivotBooking) .rivotBookingPanel { padding: 18px 28px 16px; border-radius: 9px; }
          body:has(.rivotBooking) .rivotBookingPanelHeader p { margin: 0 0 16px; font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingModels { margin: 0 0 24px; gap: 12px; }
          body:has(.rivotBooking) .rivotBookingModels button { min-height: 64px; padding: 11px 14px; }
          body:has(.rivotBooking) .rivotBookingModels button span { font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingModels button small { font-size: 12px; }
          body:has(.rivotBooking) .rivotBookingColors { margin: 0 0 18px; padding: 0 0 16px; border-top: 0; border-bottom: 1px solid rgba(17,17,17,.08); }
          body:has(.rivotBooking) .rivotBookingColors::before { top: -28px; font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingColors > span { display: none; }
          body:has(.rivotBooking) .rivotBookingColors > div { justify-content: flex-end; }
          body:has(.rivotBooking) .rivotBookingColors button { width: 28px; height: 28px; }
          body:has(.rivotBooking) .rivotBookingLead { margin: 0; font-size: 0; line-height: 1; }
          body:has(.rivotBooking) .rivotBookingLead::before { margin-bottom: 10px; font-size: 16px; line-height: 1; }
          body:has(.rivotBooking) .rivotBookingFields { gap: 7px 9px; margin-top: 0; }
          body:has(.rivotBooking) .rivotBookingFields input, body:has(.rivotBooking) .rivotBookingFields select { min-height: 34px; padding: 7px 11px; font-size: 11px; }
          body:has(.rivotBooking) .rivotBookingTerms { margin: 9px 0 10px; font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingPayment { display: flex; align-items: flex-end; justify-content: space-between; margin: 0 0 10px; padding-top: 10px; border-top: 1px solid rgba(17,17,17,.08); }
          body:has(.rivotBooking) .rivotBookingPayment div { display: grid; gap: 2px; }
          body:has(.rivotBooking) .rivotBookingPayment div small { color: #ef7430; font-size: 11px; font-weight: 900; text-transform: uppercase; }
          body:has(.rivotBooking) .rivotBookingPayment div strong { color: #111; font-size: 27px; line-height: 1; }
          body:has(.rivotBooking) .rivotBookingPayment > span { color: #77828a; font-size: 11px; }
          body:has(.rivotBooking) .rivotBookingSubmit { min-height: 46px; border-radius: 7px; text-transform: uppercase; font-size: 15px; }
        }

        @media (max-width: 759px) { body:has(.rivotBooking) .rivotBooking { padding-top: 88px; } }

        @media (min-width: 1000px) {
          body:has(.rivotBooking) .rivotBooking {
            padding: 104px clamp(24px, 4vw, 64px) 40px;
            background:
              radial-gradient(circle at 88% 12%, rgba(239, 116, 48, .12), transparent 27%),
              linear-gradient(115deg, #fff 0%, #fff 62%, #fff3ea 100%);
          }

          body:has(.rivotBooking) .rivotBookingShell {
            width: min(100%, 1420px);
          }

          body:has(.rivotBooking) .rivotBookingLayout {
            grid-template-columns: minmax(430px, .92fr) minmax(520px, 680px);
            gap: clamp(28px, 4vw, 60px);
            min-height: auto;
            align-items: start;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            grid-template-rows: auto 300px auto auto;
            padding-top: 20px;
          }

          body:has(.rivotBooking) .rivotBookingIntro h1 {
            font-size: clamp(64px, 6.4vw, 104px);
          }

          body:has(.rivotBooking) .rivotBookingIntro strong {
            margin-top: 12px;
            font-size: clamp(17px, 1.45vw, 22px);
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
            min-height: 300px;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
            width: min(100%, 520px);
            height: 295px;
          }

          body:has(.rivotBooking) .rivotBookingPanel {
            padding: 24px 32px 26px;
            border-radius: 14px;
            background: rgba(255, 255, 255, .9);
            box-shadow:
              0 22px 60px rgba(24, 18, 12, .1),
              inset 0 1px 0 rgba(255, 255, 255, .8);
          }

          body:has(.rivotBooking) .rivotBookingPanelHeader p {
            margin-bottom: 14px;
            font-size: 17px;
            line-height: 1.15;
          }

          body:has(.rivotBooking) .rivotBookingModels {
            margin-bottom: 20px;
          }

          body:has(.rivotBooking) .rivotBookingModels button {
            min-height: 62px;
            padding: 10px 18px;
            border-radius: 9px;
          }

          body:has(.rivotBooking) .rivotBookingColors {
            margin-bottom: 14px;
            padding-bottom: 14px;
          }

          body:has(.rivotBooking) .rivotBookingColors::before,
          body:has(.rivotBooking) .rivotBookingLead::before {
            font-size: 17px;
          }

          body:has(.rivotBooking) .rivotBookingFields {
            gap: 8px 10px;
          }

          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select {
            min-height: 36px;
            padding: 7px 12px;
            border-radius: 7px;
            font-size: 12px;
          }

          body:has(.rivotBooking) .rivotBookingTerms {
            margin: 10px 0 10px;
            font-size: 11px;
            line-height: 1.35;
          }

          body:has(.rivotBooking) .rivotBookingPayment {
            margin-bottom: 12px;
            padding-top: 12px;
          }

          body:has(.rivotBooking) .rivotBookingPayment div strong {
            font-size: 27px;
          }

          body:has(.rivotBooking) .rivotBookingSubmit {
            min-height: 44px;
            border-radius: 8px;
            font-size: 15px;
            letter-spacing: .02em;
          }
        }

        @media (min-width: 1000px) and (max-height: 850px) {
          body:has(.rivotBooking) .rivotBooking {
            padding-top: 92px;
            padding-bottom: 24px;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            grid-template-rows: auto 250px auto auto;
            padding-top: 10px;
          }

          body:has(.rivotBooking) .rivotBookingIntro p {
            margin-bottom: 6px;
          }

          body:has(.rivotBooking) .rivotBookingIntro h1 {
            font-size: clamp(58px, 5.5vw, 86px);
          }

          body:has(.rivotBooking) .rivotBookingIntro strong {
            margin-top: 8px;
            font-size: 17px;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
            min-height: 250px;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
            height: 245px;
          }

          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 {
            height: 50px;
          }

          body:has(.rivotBooking) .rivotBookingPanel {
            padding: 18px 26px 20px;
          }

          body:has(.rivotBooking) .rivotBookingPanelHeader p {
            margin-bottom: 10px;
            font-size: 15px;
          }

          body:has(.rivotBooking) .rivotBookingModels {
            margin-bottom: 18px;
          }

          body:has(.rivotBooking) .rivotBookingModels button {
            min-height: 54px;
            padding: 8px 14px;
          }

          body:has(.rivotBooking) .rivotBookingColors::before {
            top: -24px;
          }

          body:has(.rivotBooking) .rivotBookingColors,
          body:has(.rivotBooking) .rivotBookingPayment {
            margin-bottom: 9px;
            padding-bottom: 10px;
          }

          body:has(.rivotBooking) .rivotBookingLead::before {
            margin-bottom: 7px;
          }

          body:has(.rivotBooking) .rivotBookingFields {
            gap: 6px 8px;
          }

          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select {
            min-height: 32px;
            padding: 6px 10px;
            font-size: 11px;
          }

          body:has(.rivotBooking) .rivotBookingTerms {
            margin: 7px 0;
            font-size: 10px;
          }

          body:has(.rivotBooking) .rivotBookingPayment {
            padding-top: 8px;
          }

          body:has(.rivotBooking) .rivotBookingPayment div strong {
            font-size: 24px;
          }

          body:has(.rivotBooking) .rivotBookingSubmit {
            min-height: 40px;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            overflow: visible;
            grid-template-rows: auto 245px 56px 0 76px;
            align-content: start;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
            min-height: 245px;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingGallery {
            display: grid;
            visibility: visible;
            opacity: 1;
            height: 56px;
            margin: 0 auto 12px;
          }

          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 {
            display: block;
            visibility: visible;
            height: 56px;
          }

          body:has(.rivotBooking) .rivotBooking360 {
            display: flex;
          }

          body:has(.rivotBooking) .rivotBookingSpecs {
            display: grid;
            visibility: visible;
            opacity: 1;
            height: 76px;
            margin-top: 4px;
          }
        }

        body:has(.rivotBooking) .rivotBooking {
          background:
            radial-gradient(circle at 12% 55%, rgba(255, 238, 226, .8), transparent 27%),
            linear-gradient(120deg, #fff 0%, #fbfbfa 62%, #fff4ec 100%);
        }

        body:has(.rivotBooking) .rivotBookingViewer {
          position: relative;
        }

        body:has(.rivotBooking) .rivotBookingIntro p {
          color: #f05b21;
          font-weight: 800;
          letter-spacing: .02em;
        }

        body:has(.rivotBooking) .rivotBookingIntro h1 {
          color: #090909;
          font-weight: 850;
          letter-spacing: -.055em;
        }

        body:has(.rivotBooking) .rivotBookingIntro h1 span { color: #f05b21; }
        body:has(.rivotBooking) .rivotBookingIntro strong { color: #66737b; font-weight: 750; }
        body:has(.rivotBooking) .rivotBookingIntro small { color: #66737b; font-weight: 550; }

        body:has(.rivotBooking) .rivotBookingPanel {
          border: 1px solid rgba(30, 30, 30, .07);
          box-shadow: 0 20px 55px rgba(45, 31, 20, .1), 0 2px 8px rgba(45, 31, 20, .04);
          backdrop-filter: blur(12px);
        }

        body:has(.rivotBooking) .rivotBookingPanelHeader p,
        body:has(.rivotBooking) .rivotBookingColors::before,
        body:has(.rivotBooking) .rivotBookingLead::before {
          color: #111;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        body:has(.rivotBooking) .rivotBookingModels button {
          position: relative;
          border-color: #e0e2e3;
          background: #fff;
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease, transform .2s ease;
        }

        body:has(.rivotBooking) .rivotBookingModels button::after {
          content: "";
          position: absolute;
          top: 14px;
          right: 14px;
          width: 12px;
          height: 12px;
          border: 1.5px solid #c9ced1;
          border-radius: 50%;
        }

        body:has(.rivotBooking) .rivotBookingModels button.active {
          border-color: #f05b21;
          background: #fffaf7;
          box-shadow: 0 5px 16px rgba(240, 91, 33, .1);
          transform: translateY(-1px);
        }

        body:has(.rivotBooking) .rivotBookingModels button.active::after {
          border: 3px solid #fff;
          background: #f05b21;
          box-shadow: 0 0 0 1px #f05b21;
        }

        body:has(.rivotBooking) .rivotBookingModels button span { color: #111; }
        body:has(.rivotBooking) .rivotBookingModels button small { color: #5f6b73; }
        body:has(.rivotBooking) .rivotBookingColors button { transition: transform .2s ease, box-shadow .2s ease; }
        body:has(.rivotBooking) .rivotBookingColors button:hover { transform: scale(1.12); }

        body:has(.rivotBooking) .rivotBookingFields input,
        body:has(.rivotBooking) .rivotBookingFields select {
          min-height: 44px;
          padding: 0 14px;
          border: 1px solid #dce8ea;
          border-radius: 2px;
          background: #e7f0f1;
          color: #536a72;
          font-size: 13px;
          font-weight: 500;
          transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
        }

        body:has(.rivotBooking) .rivotBookingFields input::placeholder { color: #92a8ae; opacity: 1; }
        body:has(.rivotBooking) .rivotBookingFields select { color: #536a72; }

        body:has(.rivotBooking) .rivotBookingFields input:focus,
        body:has(.rivotBooking) .rivotBookingFields select:focus {
          border-color: #f05b21;
          background: #f0f7f7;
          box-shadow: 0 0 0 2px rgba(240, 91, 33, .12);
        }

        body:has(.rivotBooking) .rivotBookingFields input:hover,
        body:has(.rivotBooking) .rivotBookingFields select:hover { border-color: #b9ced2; }

        body:has(.rivotBooking) .rivotBookingGallery img,
        body:has(.rivotBooking) .rivotBooking360 {
          border-color: #e4e5e5;
          background: rgba(247, 247, 247, .86);
          box-shadow: 0 4px 12px rgba(20, 20, 20, .04);
        }

        body:has(.rivotBooking) .rivotBookingGallery img:first-child {
          border-color: #f05b21;
          box-shadow: 0 5px 14px rgba(240, 91, 33, .12);
        }

        body:has(.rivotBooking) .rivotBookingSpecs {
          border: 0;
          background: #fff;
          box-shadow: 0 10px 26px rgba(20, 20, 20, .08);
        }

        body:has(.rivotBooking) .rivotBookingSpecs div { position: relative; }
        body:has(.rivotBooking) .rivotBookingSpecs div + div::before {
          content: "";
          position: absolute;
          left: 0;
          top: 22%;
          height: 56%;
          border-left: 1px solid #e2e4e4;
        }

        body:has(.rivotBooking) .rivotBookingSpecs b { color: #171717; font-weight: 800; }
        body:has(.rivotBooking) .rivotBookingSpecs span { color: #68747c; letter-spacing: .04em; }
        body:has(.rivotBooking) .rivotBookingPayment { border-top-color: #ececec; }
        body:has(.rivotBooking) .rivotBookingSubmit {
          background: linear-gradient(100deg, #ff5a08, #f36528);
          box-shadow: 0 10px 22px rgba(240, 91, 33, .2);
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        body:has(.rivotBooking) .rivotBookingSubmit:hover {
          background: linear-gradient(100deg, #ec4e00, #e8581d);
          box-shadow: 0 13px 26px rgba(240, 91, 33, .28);
          transform: translateY(-1px);
        }

        @media (max-width: 759px) {
          body:has(.rivotBooking) .rivotBooking { padding: 88px 16px 36px; }
          body:has(.rivotBooking) .rivotBookingPanel { border-radius: 12px; padding: 22px 18px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(56px, 16vw, 84px); }

          body:has(.rivotBooking) .rivotBookingLayout {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            display: flex;
            flex-direction: column;
            height: auto;
            min-height: 0;
            overflow: visible;
            padding: 12px 0 0;
          }

          body:has(.rivotBooking) .rivotBookingIntro { width: 100%; margin: 0 0 10px; }
          body:has(.rivotBooking) .rivotBookingIntro p { margin: 0 0 8px; font-size: 12px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(58px, 16vw, 92px); }
          body:has(.rivotBooking) .rivotBookingIntro strong { margin-top: 10px; font-size: 17px; }
          body:has(.rivotBooking) .rivotBookingIntro small { margin-top: 4px; font-size: 12px; }

          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
            width: 100%;
            height: clamp(260px, 58vw, 390px);
            min-height: 0;
            flex: none;
            display: grid;
            place-items: center;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
            width: min(100%, 500px);
            height: 100%;
          }

          body:has(.rivotBooking) .rivotBookingGallery {
            display: grid;
            width: 100%;
            height: 64px;
            margin: 0 0 14px;
            gap: 8px;
          }

          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 { height: 64px; }
          body:has(.rivotBooking) .rivotBooking360 { display: flex; }
          body:has(.rivotBooking) .rivotBookingHint { display: none; }

          body:has(.rivotBooking) .rivotBookingSpecs {
            display: grid;
            width: 100%;
            height: auto;
            min-height: 86px;
            margin: 0;
          }

          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 86px; padding: 12px 6px; }
          body:has(.rivotBooking) .rivotBookingSpecs b { font-size: clamp(17px, 5vw, 24px); }
          body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingPanel { width: 100%; height: auto; overflow: visible; }
        }

        @media (min-width: 760px) and (max-height: 650px) {
          body:has(.rivotBooking) .rivotHeader,
          body:has(.rivotBooking) footer { display: none; }

          body:has(.rivotBooking) .rivotBooking {
            min-height: 100vh;
            height: 100vh;
            padding: 8px 20px 12px;
            overflow: hidden;
          }

          body:has(.rivotBooking) .rivotBookingShell { width: min(100%, 1000px); height: 100%; }
          body:has(.rivotBooking) .rivotBookingLayout {
            grid-template-columns: minmax(0, 43%) minmax(0, 57%);
            gap: 24px;
            min-height: 100%;
            height: 100%;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            grid-template-rows: auto minmax(0, 1fr) auto auto;
            height: 100%;
            padding: 8px 0 0;
          }

          body:has(.rivotBooking) .rivotBookingIntro p { margin: 2px 0 7px; font-size: 11px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(54px, 6vw, 76px); }
          body:has(.rivotBooking) .rivotBookingIntro strong { margin-top: 8px; font-size: 15px; }
          body:has(.rivotBooking) .rivotBookingIntro small { margin-top: 2px; font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { min-height: 0; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter { width: min(100%, 390px); height: 245px; }
          body:has(.rivotBooking) .rivotBookingGallery { width: 100%; gap: 8px; margin: 0 0 8px; }
          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 { height: 50px; }
          body:has(.rivotBooking) .rivotBookingSpecs { width: 100%; height: 62px; }
          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 62px; padding: 5px; }
          body:has(.rivotBooking) .rivotBookingSpecs b { font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 9px; }

          body:has(.rivotBooking) .rivotBookingPanel {
            height: 100%;
            padding: 16px 22px 14px;
            overflow: hidden;
            border-radius: 10px;
          }

          body:has(.rivotBooking) .rivotBookingPanelHeader p { margin-bottom: 10px; font-size: 14px; }
          body:has(.rivotBooking) .rivotBookingModels { gap: 10px; margin-bottom: 18px; }
          body:has(.rivotBooking) .rivotBookingModels button { min-height: 54px; padding: 8px 13px; }
          body:has(.rivotBooking) .rivotBookingModels button span { font-size: 14px; }
          body:has(.rivotBooking) .rivotBookingModels button small { font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingColors { margin-bottom: 14px; padding-bottom: 12px; }
          body:has(.rivotBooking) .rivotBookingColors::before,
          body:has(.rivotBooking) .rivotBookingLead::before { font-size: 14px; }
          body:has(.rivotBooking) .rivotBookingColors::before { top: -22px; }
          body:has(.rivotBooking) .rivotBookingFields { gap: 5px 8px; }
          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select { min-height: 30px; padding: 5px 9px; font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingTerms { margin: 6px 0 7px; font-size: 9px; }
          body:has(.rivotBooking) .rivotBookingPayment { margin-bottom: 8px; padding-top: 7px; }
          body:has(.rivotBooking) .rivotBookingPayment div strong { font-size: 22px; }
          body:has(.rivotBooking) .rivotBookingPayment div small,
          body:has(.rivotBooking) .rivotBookingPayment > span { font-size: 9px; }
          body:has(.rivotBooking) .rivotBookingSubmit { min-height: 36px; font-size: 13px; }
        }

        @media (min-width: 1000px) {
          body:has(.rivotBooking) .rivotBookingViewer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 0;
            height: auto;
            min-height: 0;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingIntro,
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage,
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingGallery,
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingSpecs { flex: none; }

          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
            width: 100%;
            height: 300px;
            min-height: 300px;
            display: grid;
            place-items: center;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
            width: min(100%, 510px);
            height: 300px;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingGallery {
            width: min(100%, 470px);
            height: 58px;
            margin: 0 auto 12px;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBookingViewer .rivotBooking360 { height: 58px; }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingGallery button { height: 58px; }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingSpecs {
            width: min(100%, 470px);
            height: 72px;
            min-height: 72px;
            margin: 0;
          }

          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingSpecs div { min-height: 72px; }
        }

        @media (min-width: 760px) and (max-width: 999px) {
          body:has(.rivotBooking) .rivotBooking {
            padding: 92px 20px 56px;
          }

          body:has(.rivotBooking) .rivotBookingLayout {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 24px;
          }

          body:has(.rivotBooking) .rivotBookingViewer {
            display: flex;
            flex-direction: column;
            min-height: 0;
            padding: 0;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingIntro { width: 100%; margin-bottom: 8px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(64px, 12vw, 100px); }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { height: min(54vw, 400px); min-height: 280px; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter { width: min(100%, 520px); height: 100%; }
          body:has(.rivotBooking) .rivotBookingGallery { width: min(100%, 540px); margin: 0 auto 14px; }
          body:has(.rivotBooking) .rivotBookingSpecs { width: min(100%, 540px); min-height: 84px; }
          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 84px; }

          body:has(.rivotBooking) .rivotBookingPanel {
            width: 100%;
            padding: 28px 26px 24px;
            overflow: visible;
          }

          body:has(.rivotBooking) .rivotBookingPanelHeader p { font-size: 20px; }
          body:has(.rivotBooking) .rivotBookingModels { gap: 14px; }
          body:has(.rivotBooking) .rivotBookingModels button { min-height: 76px; }
          body:has(.rivotBooking) .rivotBookingFields { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select { min-height: 46px; font-size: 13px; }
          body:has(.rivotBooking) .rivotBookingTerms { font-size: 12px; }
          body:has(.rivotBooking) .rivotBookingSubmit { min-height: 54px; }
        }

        body:has(.rivotBooking) { overflow-x: hidden; }
        body:has(.rivotBooking) .rivotBooking { max-width: 100vw; }

        @media (min-width: 760px) and (max-width: 1100px) {
          body:has(.rivotBooking) .rivotHeader {
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 18px;
            padding: 0 20px;
          }
          body:has(.rivotBooking) .rivotBrandMark { width: 132px; }
          body:has(.rivotBooking) .rivotHeaderLinks { gap: 16px; }
          body:has(.rivotBooking) .rivotHeaderActions { gap: 8px; }
          body:has(.rivotBooking) .rivotThemeToggle { padding-left: 10px; padding-right: 10px; }
          body:has(.rivotBooking) .rivotBook { padding-left: 14px; padding-right: 14px; }
        }

        @media (max-width: 520px) {
          body:has(.rivotBooking) .rivotBooking { padding: 82px 12px 42px; }
          body:has(.rivotBooking) .rivotBookingViewer { padding: 0 4px; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(54px, 17vw, 78px); }
          body:has(.rivotBooking) .rivotBookingIntro strong { font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingIntro small { font-size: 11px; }
          body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage { height: 280px; min-height: 0; }
          body:has(.rivotBooking) .rivotBookingGallery { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 5px; height: 54px; }
          body:has(.rivotBooking) .rivotBookingGallery img,
          body:has(.rivotBooking) .rivotBooking360 { height: 54px; }
          body:has(.rivotBooking) .rivotBookingGallery button { height: 54px; }
          body:has(.rivotBooking) .rivotBooking360 { gap: 3px; }
          body:has(.rivotBooking) .rivotBooking360 b { font-size: 20px; }
          body:has(.rivotBooking) .rivotBooking360 small { font-size: 8px; }
          body:has(.rivotBooking) .rivotBookingSpecs { min-height: 74px; }
          body:has(.rivotBooking) .rivotBookingSpecs div { min-height: 74px; padding: 8px 3px; }
          body:has(.rivotBooking) .rivotBookingSpecs b { font-size: 17px; }
          body:has(.rivotBooking) .rivotBookingSpecs span { font-size: 8px; }
          body:has(.rivotBooking) .rivotBookingPanel { padding: 22px 14px 18px; }
          body:has(.rivotBooking) .rivotBookingPanelHeader p { font-size: 16px; }
          body:has(.rivotBooking) .rivotBookingModels { gap: 8px; margin-bottom: 22px; }
          body:has(.rivotBooking) .rivotBookingModels button { min-height: 62px; padding: 10px 12px; }
          body:has(.rivotBooking) .rivotBookingModels button span { font-size: 15px; }
          body:has(.rivotBooking) .rivotBookingModels button small { font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingFields { grid-template-columns: 1fr; gap: 9px; }
          body:has(.rivotBooking) .rivotBookingFields .wide { grid-column: auto; }
          body:has(.rivotBooking) .rivotBookingFields input,
          body:has(.rivotBooking) .rivotBookingFields select { min-height: 44px; padding: 10px 12px; font-size: 13px; }
          body:has(.rivotBooking) .rivotBookingTerms { font-size: 11px; }
          body:has(.rivotBooking) .rivotBookingPayment { align-items: center; }
          body:has(.rivotBooking) .rivotBookingPayment div strong { font-size: 25px; }
          body:has(.rivotBooking) .rivotBookingPayment > span { font-size: 10px; }
          body:has(.rivotBooking) .rivotBookingSubmit { min-height: 50px; font-size: 15px; }
        }

        body:has(.rivotBooking) .rivotBookingViewer {
          position: relative;
          z-index: 1;
          height: auto !important;
        }

        body:has(.rivotBooking) .rivotBookingPanel {
          position: relative;
          z-index: 0;
        }
        body:has(.rivotBooking) .rivotBookingField { min-width: 0; }
        body:has(.rivotBooking) .rivotBookingField > label {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        body:has(.rivotBooking) .rivotBookingFieldError {
          display: block;
          margin: 4px 2px 0;
          color: #b42318;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.2;
        }
        body:has(.rivotBooking) .rivotBookingFields input.hasError,
        body:has(.rivotBooking) .rivotBookingFields select.hasError {
          border-color: #c84035;
          background: #fff1f0;
        }
        body:has(.rivotBooking) .rivotBookingTerms + .rivotBookingFieldError {
          margin: -9px 0 12px 28px;
        }

        @media (max-width: 520px) {
          body:has(.rivotBooking) .rivotBookingFieldError { font-size: 11px; }
        }

        body:has(.rivotBooking) .rivotBookingPanel {
          border: 0;
          border-radius: 0;
          box-shadow: none;
          background: transparent;
          backdrop-filter: none;
        }

        @media (max-width: 759px) {
          body:has(.rivotBooking) .rivotBookingPanel {
            border: 0;
            border-radius: 0;
            box-shadow: none;
            padding-left: 0;
            padding-right: 0;
          }
        }

        body:has(.rivotBooking) .rivotBookingModels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin: 0 0 28px;
        }

        body:has(.rivotBooking) .rivotBookingModels button {
          width: 100%;
          min-height: 78px;
          margin: 0;
          padding: 14px 18px;
          border-radius: 11px;
        }

        body:has(.rivotBooking) .rivotBookingColors {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 76px;
          margin: 0 0 28px;
          padding: 30px 0 16px;
          border-top: 0;
          border-bottom: 1px solid #ececec;
        }

        body:has(.rivotBooking) .rivotBookingColors::before {
          top: 0;
          left: 0;
          font-size: 18px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingColors > div {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: 0;
        }

        body:has(.rivotBooking) .rivotBookingColors button {
          flex: 0 0 36px;
          width: 36px;
          height: 36px;
        }

        body:has(.rivotBooking) .rivotBookingLead {
          margin: 0 0 14px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingLead::before {
          margin: 0 0 14px;
          font-size: 18px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingFields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          gap: 10px 12px;
          margin: 0;
        }

        body:has(.rivotBooking) .rivotBookingField {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }

        body:has(.rivotBooking) .rivotBookingFields input,
        body:has(.rivotBooking) .rivotBookingFields select {
          width: 100%;
          min-height: 46px;
          margin: 0;
          padding: 0 14px;
          border-radius: 9px;
        }

        body:has(.rivotBooking) .rivotBookingFieldError {
          min-height: 15px;
          margin: 4px 2px 0;
          font-size: 12px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingTerms {
          align-items: center;
          margin: 16px 0 18px;
          gap: 9px;
          font-size: 13px;
        }

        body:has(.rivotBooking) .rivotBookingTerms input {
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
          margin: 0;
        }

        body:has(.rivotBooking) .rivotBookingPayment {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin: 0 0 18px;
          padding-top: 18px;
          border-top: 1px solid #ececec;
        }

        body:has(.rivotBooking) .rivotBookingPayment div { display: grid; gap: 3px; }
        body:has(.rivotBooking) .rivotBookingPayment div small { color: #f05b21; font-size: 12px; font-weight: 800; text-transform: uppercase; }
        body:has(.rivotBooking) .rivotBookingPayment div strong { color: #111; font-size: 30px; line-height: 1; }
        body:has(.rivotBooking) .rivotBookingPayment > span { color: #718087; font-size: 13px; }

        body:has(.rivotBooking) .rivotBookingViewer {
          gap: 14px;
        }

        body:has(.rivotBooking) .rivotBookingIntro {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          width: min(100%, 530px);
          margin: 0 auto 2px;
          column-gap: 16px;
          align-items: end;
        }

        body:has(.rivotBooking) .rivotBookingIntro p {
          grid-column: 1 / -1;
          margin: 0 0 5px;
          font-size: 12px;
          line-height: 1;
          text-transform: uppercase;
        }

        body:has(.rivotBooking) .rivotBookingIntro h1 {
          white-space: nowrap;
          font-size: clamp(56px, 5.1vw, 82px);
          line-height: .86;
        }

        body:has(.rivotBooking) .rivotBookingIntro strong {
          align-self: center;
          width: max-content;
          margin: 0;
          font-size: 15px;
          line-height: 1.1;
          white-space: nowrap;
        }

        body:has(.rivotBooking) .rivotBookingIntro small {
          grid-column: 1 / -1;
          margin: 8px 0 0;
          font-size: 12px;
          line-height: 1.2;
        }

        body:has(.rivotBooking) .rivotBookingViewer .rivotRotationStage {
          height: clamp(315px, 30vw, 380px);
          margin-top: -4px;
        }

        body:has(.rivotBooking) .rivotBookingViewer .rivotBookingScooter {
          width: min(100%, 500px);
        }

        body:has(.rivotBooking) .rivotBookingGallery {
          margin-top: -4px;
        }

        body:has(.rivotBooking) .rivotBookingGallery img:first-child {
          border-color: transparent;
          box-shadow: none;
        }

        @media (max-width: 600px) {
          body:has(.rivotBooking) .rivotBookingModels { grid-template-columns: 1fr; }
          body:has(.rivotBooking) .rivotBookingFields { grid-template-columns: 1fr; }
          body:has(.rivotBooking) .rivotBookingFields .wide { grid-column: auto; }
          body:has(.rivotBooking) .rivotBookingIntro { grid-template-columns: 1fr; }
          body:has(.rivotBooking) .rivotBookingIntro h1 { font-size: clamp(54px, 18vw, 76px); }
          body:has(.rivotBooking) .rivotBookingIntro strong { width: fit-content; margin-top: 8px; white-space: normal; }
        }
      `}</style>
    </section>
  );
}
