"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import testRideBackground from "@/asset/newimg/Testdrive.png";

type FormValues = {
  name: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  date: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const stateCities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  Haryana: ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai", "Saiha", "Kolasib"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Jorethang"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti", "Minicoy", "Andrott"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
};

const initialValues: FormValues = {
  name: "",
  email: "",
  mobile: "",
  state: "",
  city: "",
  date: "",
  message: "",
};

export default function TestRidePage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const cityOptions = useMemo(() => stateCities[values.state] ?? [], [values.state]);
  const today = new Date().toISOString().split("T")[0];

  const validate = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};

    if (nextValues.name.trim().length < 2) nextErrors.name = "Please enter a valid name.";
    if (!/^\S+@\S+\.\S+$/.test(nextValues.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!/^\d{10}$/.test(nextValues.mobile.trim())) nextErrors.mobile = "Please enter a valid 10-digit mobile number.";
    if (!nextValues.state) nextErrors.state = "Please select a state.";
    if (!nextValues.city) nextErrors.city = "Please select a city.";
    if (!nextValues.date) nextErrors.date = "Please select a date.";

    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/test-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Failed to submit test ride request.");
      }

      setSubmitSuccess(true);
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit test ride request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rivotTestRidePage">
      <Image
        className="rivotTestRideBackground"
        src={testRideBackground}
        alt="Rider with a RIVOT electric scooter at sunset"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
      />
      <div className="rivotTestRideShade" aria-hidden="true" />
      <div className="rivotTestRideShell">
        <div className="rivotTestRideStory">
          <p className="rivotTestRideEyebrow">Experience RIVOT</p>
          <h1>
            <span className="rivotTestRideTitleLine">Test Ride</span>
            <span className="rivotTestRideTitleLine rivotTestRideTitleAccent">A Brighter</span>
            <span className="rivotTestRideTitleLine">Tomorrow</span>
          </h1>
          <p className="rivotTestRideIntro">Feel the performance. Experience the comfort. Discover why RIVOT is built for a cleaner, smarter future.</p>
          <div className="rivotTestRideBenefits">
            <div><b>⚡</b><p><strong>Real Performance</strong><span>Feel the power yourself</span></p></div>
            <div><b>♧</b><p><strong>Zero Emissions</strong><span>A cleaner tomorrow</span></p></div>
            <div><b>◇</b><p><strong>Safe &amp; Reliable</strong><span>Ride with confidence</span></p></div>
          </div>
        </div>

        <div className="rivotTestRideCard">
          <div className="rivotTestRideCardHead">
            <div><p><span /> Book your</p><h2>Test Ride</h2></div>
            <p>Fill in your details and we&apos;ll arrange a test ride at a dealership near you.</p>
          </div>
          <form className="rivotTestRideForm" onSubmit={onSubmit} noValidate>
            <div className="rivotTestRideGrid">
              <label>Full Name <em>*</em><input name="name" autoComplete="name" placeholder="Enter your name" value={values.name} onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))} />{errors.name ? <small>{errors.name}</small> : null}</label>
              <label>Email Address <em>*</em><input name="email" type="email" autoComplete="email" placeholder="Enter your email" value={values.email} onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))} />{errors.email ? <small>{errors.email}</small> : null}</label>
              <label>Phone Number <em>*</em><input name="mobile" type="tel" autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} placeholder="Enter your phone number" value={values.mobile} onChange={(event) => setValues((prev) => ({ ...prev, mobile: event.target.value.replace(/\D/g, "") }))} />{errors.mobile ? <small>{errors.mobile}</small> : null}</label>
              <label>State <em>*</em><select name="state" value={values.state} onChange={(event) => setValues((prev) => ({ ...prev, state: event.target.value, city: "" }))}><option value="">Select state</option>{Object.keys(stateCities).map((stateName) => <option value={stateName} key={stateName}>{stateName}</option>)}</select>{errors.state ? <small>{errors.state}</small> : null}</label>
              <label>City <em>*</em><select name="city" value={values.city} disabled={!values.state} onChange={(event) => setValues((prev) => ({ ...prev, city: event.target.value }))}><option value="">Select city</option>{cityOptions.map((cityName) => <option value={cityName} key={cityName}>{cityName}</option>)}</select>{errors.city ? <small>{errors.city}</small> : null}</label>
              <label>Preferred Date <em>*</em><input name="date" type="date" min={today} value={values.date} onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))} />{errors.date ? <small>{errors.date}</small> : null}</label>
              <label className="rivotTestRideMessage">Any Additional Message <span>(Optional)</span><textarea name="message" rows={2} placeholder="Tell us if you have any specific model or queries..." value={values.message} onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))} /></label>
            </div>
            {submitError ? <div className="rivotTestRideError">{submitError}</div> : null}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Book Test Ride  →"}</button>
            <p className="rivotTestRidePrivacy">▣ &nbsp; Your information is safe with us. We will contact you to confirm your test ride.</p>
          </form>
        </div>
      </div>

      {submitSuccess ? (
        <div className="rivotTestRideOverlay" role="dialog" aria-modal="true" aria-label="Test ride request submitted">
          <div className="rivotTestRideOverlayCard">
            <h2>
              Thank <span>You!</span>
            </h2>
            <p>Your test ride request has been received. Our representative will contact you shortly to confirm your appointment.</p>
            <button type="button" onClick={() => setSubmitSuccess(false)}>Close</button>
          </div>
        </div>
      ) : null}

      <style>{`
        body:has(.rivotTestRidePage) .rivotHeader,
        body:has(.rivotTestRidePage) .rivotBrand,
        body:has(.rivotTestRidePage) .rivotHeaderLinks a,
        body:has(.rivotTestRidePage) .rivotProductsButton,
        body:has(.rivotTestRidePage) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.rivotTestRidePage) .rivotBrandMark img {
          filter: none;
        }

        body:has(.rivotTestRidePage) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.rivotTestRidePage) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .rivotTestRidePage {
          min-height: 100vh;
          padding: 110px clamp(18px, 5vw, 84px) 70px;
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .16), transparent 30%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #090909;
        }

        .rivotTestRideShell {
          width: min(100%, 1240px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 38% 62%;
          min-height: min(820px, calc(100vh - 190px));
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, .92);
          box-shadow: 0 22px 54px rgba(17, 17, 17, .08);
        }

        .rivotTestRideLeft {
          padding: clamp(24px, 3.2vw, 42px);
          display: grid;
          align-items: center;
          background: rgba(255, 255, 255, .95);
          border-right: 1px solid rgba(17, 17, 17, .08);
        }

        .rivotTestRideContent p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotTestRideContent h1 {
          margin: 0;
          color: #070707;
          font-size: clamp(40px, 5vw, 48px);
          font-weight: 900;
          line-height: 1.04;
        }

        .rivotTestRideContent h1 span {
          color: #ef7430;
        }

        .rivotTestRideContent strong {
          display: block;
          margin-top: 16px;
          color: #5f6b73;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.6;
        }

        .rivotTestRideForm {
          margin-top: 24px;
        }

        .rivotTestRideGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .rivotTestRideForm label {
          display: grid;
          gap: 8px;
          color: #111;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .rivotTestRideForm input,
        .rivotTestRideForm select {
          width: 100%;
          min-height: 44px;
          padding: 10px 12px;
          border: 1px solid rgba(17, 17, 17, .14);
          border-radius: 8px;
          background: #f6f6f6;
          color: #111;
          font: inherit;
          font-size: 14px;
          text-transform: none;
        }

        .rivotTestRideForm input::placeholder {
          color: #78838b;
        }

        .rivotTestRideForm select option {
          background: #fff;
          color: #111;
        }

        .rivotTestRideForm input:focus,
        .rivotTestRideForm select:focus {
          outline: none;
          border-color: #ef7430;
          box-shadow: 0 0 0 3px rgba(239, 116, 48, .2);
        }

        .rivotTestRideForm small {
          color: #d33434;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .rivotTestRideError {
          margin-top: 12px;
          padding: 10px 12px;
          border: 1px solid rgba(217, 71, 71, .36);
          border-radius: 8px;
          background: rgba(217, 71, 71, .1);
          color: #b32a2a;
          font-size: 13px;
          font-weight: 700;
        }

        .rivotTestRideForm button {
          width: 100%;
          min-height: 48px;
          margin-top: 14px;
          border: 0;
          border-radius: 10px;
          background: #ef7430;
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: .06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform .2s ease, filter .2s ease;
        }

        .rivotTestRideForm button:hover,
        .rivotTestRideForm button:focus-visible {
          filter: brightness(1.05);
          transform: translateY(-1px);
          outline: none;
        }

        .rivotTestRideForm button:disabled {
          cursor: not-allowed;
          opacity: .72;
          transform: none;
        }

        .rivotTestRideRight {
          position: relative;
          min-height: 640px;
          overflow: hidden;
          background: #0b0b0b;
        }

        .rivotTestRideSlide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .7s ease;
        }

        .rivotTestRideSlide.isActive {
          opacity: 1;
        }

        .rivotTestRideSlide::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(11, 11, 11, .66) 8%, rgba(11, 11, 11, .34) 100%);
          z-index: 1;
        }

        .rivotTestRideCaption {
          position: absolute;
          right: clamp(18px, 4vw, 42px);
          top: 52%;
          z-index: 2;
          display: grid;
          justify-items: end;
          gap: 8px;
          transform: translateY(-50%);
          color: #fff;
          font-size: clamp(38px, 8vw, 112px);
          font-weight: 900;
          line-height: .95;
          text-transform: uppercase;
          text-align: right;
          text-shadow: 0 14px 40px rgba(0, 0, 0, .45);
        }

        .rivotTestRideOverlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0, 0, 0, .82);
          backdrop-filter: blur(4px);
        }

        .rivotTestRideOverlayCard {
          width: min(100%, 520px);
          padding: 28px;
          border-radius: 10px;
          border: 1px solid rgba(239, 116, 48, .5);
          background: #111;
          text-align: center;
        }

        .rivotTestRideOverlayCard h2 {
          margin: 0;
          font-size: clamp(34px, 6vw, 48px);
          line-height: .95;
        }

        .rivotTestRideOverlayCard h2 span {
          color: #ef7430;
        }

        .rivotTestRideOverlayCard p {
          margin: 14px 0 20px;
          color: rgba(255, 255, 255, .8);
          font-size: 15px;
          line-height: 1.55;
        }

        .rivotTestRideOverlayCard button {
          min-height: 44px;
          padding: 0 20px;
          border: 0;
          border-radius: 999px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          cursor: pointer;
        }

        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotHeader,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotHeader,
        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotBrand,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotBrand,
        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotHeaderLinks a,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotHeaderLinks a,
        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotProductsButton,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotProductsButton,
        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotExploreButton,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotExploreButton {
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] body:has(.rivotTestRidePage) .rivotThemeToggle,
        html[data-theme="dark"] body:has(.rivotTestRidePage) .rivotThemeToggle {
          border-color: rgba(255, 255, 255, .18);
          background: rgba(15, 15, 15, .8);
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotTestRidePage,
        html[data-theme="dark"] .rivotTestRidePage {
          background:
            radial-gradient(circle at 92% 8%, rgba(239, 116, 48, .16), transparent 30%),
            linear-gradient(180deg, #080909 0%, #101111 100%);
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotTestRideShell,
        html[data-theme="dark"] .rivotTestRideShell {
          border-color: rgba(255, 255, 255, .12);
          background: rgba(15, 16, 16, .86);
          box-shadow: 0 24px 60px rgba(0, 0, 0, .45);
        }

        html[data-rivot-theme="dark"] .rivotTestRideLeft,
        html[data-theme="dark"] .rivotTestRideLeft {
          background: rgba(17, 18, 18, .9);
          border-right-color: rgba(255, 255, 255, .12);
        }

        html[data-rivot-theme="dark"] .rivotTestRideContent h1,
        html[data-theme="dark"] .rivotTestRideContent h1 {
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotTestRideContent strong,
        html[data-theme="dark"] .rivotTestRideContent strong {
          color: #c2cbc8;
        }

        html[data-rivot-theme="dark"] .rivotTestRideForm label,
        html[data-theme="dark"] .rivotTestRideForm label {
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotTestRideForm input,
        html[data-rivot-theme="dark"] .rivotTestRideForm select,
        html[data-theme="dark"] .rivotTestRideForm input,
        html[data-theme="dark"] .rivotTestRideForm select {
          border-color: rgba(255, 255, 255, .2);
          background: rgba(255, 255, 255, .08);
          color: #f3f3f0;
        }

        html[data-rivot-theme="dark"] .rivotTestRideForm input::placeholder,
        html[data-theme="dark"] .rivotTestRideForm input::placeholder {
          color: #a7b0ae;
        }

        html[data-rivot-theme="dark"] .rivotTestRideForm select option,
        html[data-theme="dark"] .rivotTestRideForm select option {
          background: #141515;
          color: #f3f3f0;
        }

        @media (max-width: 980px) {
          .rivotTestRidePage {
            padding: 88px 16px 56px;
          }

          .rivotTestRideShell {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotTestRideRight {
            order: -1;
            min-height: 300px;
          }

          .rivotTestRideCaption {
            justify-items: start;
            text-align: left;
            left: 16px;
            right: auto;
            top: auto;
            bottom: 18px;
            transform: none;
            font-size: clamp(26px, 10vw, 54px);
          }

          .rivotTestRideGrid {
            grid-template-columns: 1fr;
          }
        }

        /* Full-bleed test ride composition */
        body:has(.rivotTestRidePage) .rivotHeader {
          background: linear-gradient(180deg, rgba(0, 0, 0, .72), transparent);
        }

        body:has(.rivotTestRidePage) .rivotBrand,
        body:has(.rivotTestRidePage) .rivotHeaderLinks a,
        body:has(.rivotTestRidePage) .rivotProductsButton,
        body:has(.rivotTestRidePage) .rivotExploreButton {
          color: #fff;
        }

        body:has(.rivotTestRidePage) .rivotBrandMark img { filter: brightness(0) invert(1); }

        .rivotTestRidePage {
          position: relative;
          isolation: isolate;
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: clamp(92px, 10vh, 116px) clamp(20px, 4vw, 64px) 34px;
          background: #080808;
          color: #fff;
        }

        .rivotTestRideBackground {
          z-index: -3;
          object-fit: cover;
          object-position: center;
        }

        .rivotTestRideShade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: linear-gradient(90deg, rgba(0, 0, 0, .78) 0%, rgba(0, 0, 0, .38) 47%, rgba(0, 0, 0, .24) 100%);
        }

        .rivotTestRideShell {
          width: min(100%, 1480px);
          min-height: 0;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(480px, .86fr);
          align-items: center;
          gap: clamp(34px, 7vw, 112px);
          overflow: visible;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .rivotTestRideStory { max-width: 570px; }
        .rivotTestRideEyebrow {
          margin: 0 0 16px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .42em;
          text-transform: uppercase;
        }

        .rivotTestRideStory h1 {
          display: grid;
          justify-items: start;
          gap: .035em;
          margin: 0;
          font-size: clamp(48px, 5.7vw, 86px);
          font-weight: 950;
          line-height: .86;
          letter-spacing: -.055em;
          text-transform: uppercase;
          text-shadow: 0 6px 28px rgba(0, 0, 0, .3);
        }

        .rivotTestRideTitleLine {
          display: block;
          width: max-content;
          max-width: 100%;
          color: #fff;
          white-space: nowrap;
        }

        .rivotTestRideTitleAccent {
          color: #f5762c;
        }
        .rivotTestRideIntro {
          max-width: 455px;
          margin: 22px 0 25px;
          color: rgba(255, 255, 255, .9);
          font-size: 16px;
          line-height: 1.45;
        }

        .rivotTestRideBenefits { display: grid; gap: 13px; }
        .rivotTestRideBenefits > div { display: flex; align-items: center; gap: 13px; }
        .rivotTestRideBenefits b {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, .72);
          border-radius: 50%;
          color: #fff;
          font-size: 18px;
        }
        .rivotTestRideBenefits p { display: grid; gap: 2px; margin: 0; }
        .rivotTestRideBenefits strong { font-size: 13px; }
        .rivotTestRideBenefits span { color: rgba(255, 255, 255, .74); font-size: 11px; }

        .rivotTestRideCard {
          width: 100%;
          padding: clamp(24px, 3vw, 40px);
          border: 1px solid rgba(255, 255, 255, .72);
          border-radius: 22px;
          background: rgba(250, 251, 252, .96);
          color: #15191f;
          box-shadow: 0 24px 70px rgba(0, 0, 0, .34);
          backdrop-filter: blur(15px);
        }

        .rivotTestRideCardHead {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: 25px;
          margin-bottom: 24px;
        }
        .rivotTestRideCardHead p { margin: 0; color: #4d555e; font-size: 12px; line-height: 1.45; }
        .rivotTestRideCardHead > div > p { color: #68717b; font-size: 10px; font-weight: 800; letter-spacing: .32em; text-transform: uppercase; }
        .rivotTestRideCardHead > div > p span { display: inline-block; width: 18px; height: 3px; margin-right: 10px; border-radius: 2px; background: #f5762c; vertical-align: middle; }
        .rivotTestRideCardHead h2 { margin: 5px 0 0; font-size: clamp(34px, 3vw, 48px); line-height: .95; letter-spacing: -.045em; }

        .rivotTestRideForm { margin: 0; }
        .rivotTestRideGrid { gap: 15px 16px; }
        .rivotTestRideForm label {
          display: block;
          color: #252a30;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: none;
        }
        .rivotTestRideForm label em { color: #f5762c; font-style: normal; }
        .rivotTestRideForm label > span { color: #737b84; font-weight: 600; }
        .rivotTestRideForm input,
        .rivotTestRideForm select,
        .rivotTestRideForm textarea {
          width: 100%;
          min-height: 46px;
          margin-top: 7px;
          padding: 11px 13px;
          border: 1px solid #dde1e5;
          border-radius: 9px;
          background: #fff;
          color: #171b20;
          font: inherit;
          font-size: 13px;
          resize: vertical;
          box-shadow: 0 3px 12px rgba(26, 32, 38, .04);
        }
        .rivotTestRideForm textarea { min-height: 62px; }
        .rivotTestRideForm input:focus,
        .rivotTestRideForm select:focus,
        .rivotTestRideForm textarea:focus { outline: none; border-color: #f5762c; box-shadow: 0 0 0 3px rgba(245, 118, 44, .14); }
        .rivotTestRideForm small { display: block; margin-top: 4px; }
        .rivotTestRideMessage { grid-column: 1 / -1; }
        .rivotTestRideForm button {
          min-height: 54px;
          margin-top: 17px;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff6428, #ff7729);
          font-size: 15px;
          letter-spacing: 0;
          text-transform: none;
          box-shadow: 0 12px 24px rgba(245, 118, 44, .24);
        }
        .rivotTestRidePrivacy { margin: 12px 0 0; color: #7b8289; font-size: 9px; text-align: center; }

        html[data-rivot-theme="dark"] .rivotTestRidePage,
        html[data-theme="dark"] .rivotTestRidePage { background: #080808; color: #fff; }
        html[data-rivot-theme="dark"] .rivotTestRideCard,
        html[data-theme="dark"] .rivotTestRideCard { background: rgba(250, 251, 252, .96); color: #15191f; }
        html[data-rivot-theme="dark"] .rivotTestRideForm label,
        html[data-theme="dark"] .rivotTestRideForm label { color: #252a30; }
        html[data-rivot-theme="dark"] .rivotTestRideForm input,
        html[data-rivot-theme="dark"] .rivotTestRideForm select,
        html[data-rivot-theme="dark"] .rivotTestRideForm textarea,
        html[data-theme="dark"] .rivotTestRideForm input,
        html[data-theme="dark"] .rivotTestRideForm select,
        html[data-theme="dark"] .rivotTestRideForm textarea { border-color: #dde1e5; background: #fff; color: #171b20; }

        @media (max-width: 900px) {
          .rivotTestRidePage { overflow: visible; padding: 104px 18px 40px; }
          .rivotTestRideBackground { object-position: 35% center; }
          .rivotTestRideShade { background: rgba(0, 0, 0, .55); }
          .rivotTestRideShell { grid-template-columns: 1fr; gap: 34px; }
          .rivotTestRideStory { padding: 42px 5px 0; }
          .rivotTestRideStory h1 { font-size: clamp(46px, 12vw, 72px); }
          .rivotTestRideCard { max-width: 650px; justify-self: center; }
        }

        @media (max-width: 560px) {
          .rivotTestRidePage { padding: 88px 12px 28px; }
          .rivotTestRideStory { padding-top: 24px; }
          .rivotTestRideEyebrow { font-size: 9px; }
          .rivotTestRideStory h1 { font-size: clamp(39px, 12vw, 56px); }
          .rivotTestRideIntro { font-size: 14px; }
          .rivotTestRideCard { padding: 22px 16px; border-radius: 16px; }
          .rivotTestRideCardHead { grid-template-columns: 1fr; gap: 10px; }
          .rivotTestRideGrid { grid-template-columns: 1fr; }
          .rivotTestRideMessage { grid-column: auto; }
          .rivotTestRideForm input,
          .rivotTestRideForm select,
          .rivotTestRideForm textarea { font-size: 16px; }
        }

        /* Final sizing and contrast corrections */
        .rivotTestRideShell {
          width: min(100%, 1420px);
          grid-template-columns: minmax(0, 1fr) minmax(460px, 570px);
          gap: clamp(32px, 5vw, 76px);
        }

        .rivotTestRideStory { max-width: 520px; }
        .rivotTestRideStory h1 { font-size: clamp(44px, 4.35vw, 70px); }
        .rivotTestRideIntro { max-width: 420px; font-size: 14px; }
        .rivotTestRideBenefits { gap: 9px; }
        .rivotTestRideBenefits b { width: 36px; height: 36px; font-size: 15px; }
        .rivotTestRideBenefits strong { font-size: 12px; }
        .rivotTestRideBenefits span { font-size: 10px; }

        .rivotTestRideCard { padding: 26px 30px 22px; border-radius: 18px; }
        .rivotTestRideCardHead { margin-bottom: 18px; }
        .rivotTestRideCardHead h2 { color: #15191f; font-size: clamp(30px, 2.4vw, 40px); }
        .rivotTestRideCardHead > p { color: #4d555e; }
        .rivotTestRideCardHead > div > p { color: #68717b; }
        .rivotTestRideGrid { gap: 11px 14px; }

        .rivotTestRideCard .rivotTestRideForm label,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm label,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm label {
          color: #252a30;
          font-size: 10px;
        }

        .rivotTestRideCard .rivotTestRideForm input,
        .rivotTestRideCard .rivotTestRideForm select,
        .rivotTestRideCard .rivotTestRideForm textarea,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm input,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm select,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm input,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm select,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea {
          min-height: 42px;
          margin-top: 5px;
          padding: 9px 12px;
          border-color: #d9dde2;
          background: #fff;
          color: #171b20;
          font-size: 12px;
        }

        .rivotTestRideCard .rivotTestRideForm input::placeholder,
        .rivotTestRideCard .rivotTestRideForm textarea::placeholder,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm input::placeholder,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea::placeholder,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm input::placeholder,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea::placeholder {
          color: #7a828a;
          opacity: 1;
        }

        .rivotTestRideCard .rivotTestRideForm select:disabled { color: #737b84; background: #f1f2f3; }
        .rivotTestRideCard .rivotTestRideForm textarea { min-height: 54px; }
        .rivotTestRideCard .rivotTestRideForm button { min-height: 46px; margin-top: 12px; font-size: 13px; }
        .rivotTestRidePrivacy { color: #707880; margin-top: 9px; }

        html[data-rivot-theme="dark"] .rivotTestRideShell,
        html[data-theme="dark"] .rivotTestRideShell {
          border: 0;
          background: transparent;
          box-shadow: none;
        }

        @media (max-height: 820px) and (min-width: 901px) {
          .rivotTestRidePage { padding-top: 88px; padding-bottom: 18px; }
          .rivotTestRideStory h1 { font-size: clamp(42px, 4vw, 62px); }
          .rivotTestRideIntro { margin: 15px 0 17px; }
          .rivotTestRideCard { padding-top: 20px; padding-bottom: 16px; }
          .rivotTestRideCardHead { margin-bottom: 13px; }
          .rivotTestRideGrid { gap: 8px 12px; }
          .rivotTestRideCard .rivotTestRideForm input,
          .rivotTestRideCard .rivotTestRideForm select { min-height: 38px; }
          .rivotTestRideCard .rivotTestRideForm textarea { min-height: 46px; }
        }

        @media (max-width: 900px) {
          .rivotTestRideShell { grid-template-columns: 1fr; }
          .rivotTestRideStory { max-width: 560px; }
          .rivotTestRideCard { width: min(100%, 620px); }
        }

        @media (max-width: 560px) {
          .rivotTestRideStory h1 { font-size: clamp(38px, 11vw, 52px); }
          .rivotTestRideCard { padding: 20px 15px; }
          .rivotTestRideCard .rivotTestRideForm input,
          .rivotTestRideCard .rivotTestRideForm select,
          .rivotTestRideCard .rivotTestRideForm textarea { font-size: 16px; }
        }

        /* Test ride form dark theme */
        html[data-rivot-theme="dark"] .rivotTestRideCard,
        html[data-theme="dark"] .rivotTestRideCard {
          border-color: rgba(255, 255, 255, .16) !important;
          background: rgba(17, 18, 18, .96) !important;
          color: #f7f7f5 !important;
          box-shadow: 0 24px 70px rgba(0, 0, 0, .5) !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCardHead h2,
        html[data-theme="dark"] .rivotTestRideCardHead h2 {
          color: #f7f7f5 !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCardHead > p,
        html[data-theme="dark"] .rivotTestRideCardHead > p,
        html[data-rivot-theme="dark"] .rivotTestRideCardHead > div > p,
        html[data-theme="dark"] .rivotTestRideCardHead > div > p {
          color: #aeb5b9 !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm label,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm label {
          color: #eceeec !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm label > span,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm label > span {
          color: #9fa6aa !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm input,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm select,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm input,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm select,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea {
          border-color: rgba(255, 255, 255, .17) !important;
          background: #202222 !important;
          color: #f7f7f5 !important;
          color-scheme: dark;
          box-shadow: none !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm input::placeholder,
        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea::placeholder,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm input::placeholder,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm textarea::placeholder {
          color: #9ca2a5 !important;
          opacity: 1 !important;
        }

        html[data-rivot-theme="dark"] .rivotTestRideCard .rivotTestRideForm select:disabled,
        html[data-theme="dark"] .rivotTestRideCard .rivotTestRideForm select:disabled {
          background: #292b2b !important;
          color: #858b8e !important;
          opacity: 1;
        }

        html[data-rivot-theme="dark"] .rivotTestRidePrivacy,
        html[data-theme="dark"] .rivotTestRidePrivacy {
          color: #a3aaad !important;
        }
      `}</style>
    </section>
  );
}
