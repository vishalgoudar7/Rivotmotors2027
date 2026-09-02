"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  date: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const slides = [
  { src: "/Story_page/11.webp", alt: "Test ride - feel the freedom", caption: "Feel the\nFreedom" },
  { src: "/Story_page/12.webp", alt: "Test ride - urban performance", caption: "Urban\nPerformance" },
  { src: "/Story_page/13.webp", alt: "Test ride - next generation ride", caption: "Next-Gen Ride" },
] as const;

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
};

export default function TestRidePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const cityOptions = useMemo(() => stateCities[values.state] ?? [], [values.state]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

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
      <div className="rivotTestRideShell">
        <div className="rivotTestRideLeft">
          <div className="rivotTestRideContent">
            <p>Book</p>
            <h1>
              Test <span>Ride</span>
            </h1>
            <strong>
              Experience the thrill of our electric scooter firsthand. Fill out the form below to schedule your test ride at a location near you.
            </strong>

            <form className="rivotTestRideForm" onSubmit={onSubmit} noValidate>
              <div className="rivotTestRideGrid">
                <label>
                  Name
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={values.name}
                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                  />
                  {errors.name ? <small>{errors.name}</small> : null}
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                  />
                  {errors.email ? <small>{errors.email}</small> : null}
                </label>

                <label>
                  Phone Number
                  <input
                    name="mobile"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="Phone Number"
                    value={values.mobile}
                    onChange={(event) => setValues((prev) => ({ ...prev, mobile: event.target.value.replace(/\D/g, "") }))}
                  />
                  {errors.mobile ? <small>{errors.mobile}</small> : null}
                </label>

                <label>
                  State
                  <select
                    name="state"
                    value={values.state}
                    onChange={(event) => setValues((prev) => ({ ...prev, state: event.target.value, city: "" }))}
                  >
                    <option value="">Choose State</option>
                    {Object.keys(stateCities).map((stateName) => (
                      <option value={stateName} key={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>
                  {errors.state ? <small>{errors.state}</small> : null}
                </label>

                <label>
                  City
                  <select
                    name="city"
                    value={values.city}
                    disabled={!values.state}
                    onChange={(event) => setValues((prev) => ({ ...prev, city: event.target.value }))}
                  >
                    <option value="">Choose City</option>
                    {cityOptions.map((cityName) => (
                      <option value={cityName} key={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                  {errors.city ? <small>{errors.city}</small> : null}
                </label>

                <label>
                  Date
                  <input
                    name="date"
                    type="date"
                    min={today}
                    value={values.date}
                    onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
                  />
                  {errors.date ? <small>{errors.date}</small> : null}
                </label>
              </div>

              {submitError ? <div className="rivotTestRideError">{submitError}</div> : null}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Book Test Ride"}
              </button>
            </form>
          </div>
        </div>

        <div className="rivotTestRideRight" aria-hidden="true">
          {slides.map((slide, index) => (
            <div className={`rivotTestRideSlide${index === currentSlide ? " isActive" : ""}`} key={slide.src}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 980px) 100vw, 62vw"
              />
              <div className="rivotTestRideCaption">
                {slide.caption.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          ))}
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
      `}</style>
    </section>
  );
}
