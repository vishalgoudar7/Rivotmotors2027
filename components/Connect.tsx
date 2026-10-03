"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import connect20 from "@/asset/connect/20.webp";
import connect21 from "@/asset/connect/21.webp";
import connect25 from "@/asset/connect/25.webp";
import connect26 from "@/asset/connect/26.webp";
import connect27 from "@/asset/connect/27.webp";
import vendorCardImage from "@/asset/newphotos/rivot_connect_section_images/cinematic_ev_powertrain_gears.png";
import dealerCardImage from "@/asset/newphotos/rivot_connect_section_images/rivot_electric_mobility_showroom_at_sunset.png";
import mediaCardImage from "@/asset/newphotos/rivot_connect_section_images/rivot_microphone_at_a_cinematic_press_event.png";
import investorCardImage from "@/asset/newphotos/rivot_connect_section_images/sustainable_growth_at_sunrise.png";
import careersCardImage from "@/asset/newphotos/rivot_connect_section_images/contemplating_the_sunset_skyline.png";
import overseasCardImage from "@/asset/newphotos/rivot_connect_section_images/global_network_earth_from_space.png";

type ConnectionId = "vendor" | "dealer" | "media" | "investor" | "careers" | "overseas";

type FieldType = "text" | "email" | "tel" | "select" | "textarea" | "file" | "date";

type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
};

type ConnectionOption = {
  id: ConnectionId;
  name: string;
  description: string;
  icon: string;
  url?: string;
};

type FormConfig = {
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  benefitsHeading: string;
  benefits: string[];
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
};

const connectImages: Record<ConnectionId, StaticImageData> = {
  vendor: connect20,
  dealer: connect21,
  media: connect25,
  investor: connect26,
  careers: connect27,
  overseas: connect21,
};

const connectionCardImages: Record<ConnectionId, StaticImageData> = {
  vendor: vendorCardImage,
  dealer: dealerCardImage,
  media: mediaCardImage,
  investor: investorCardImage,
  careers: careersCardImage,
  overseas: overseasCardImage,
};

const connectionCtas: Record<ConnectionId, string> = {
  vendor: "Explore",
  dealer: "Join Now",
  media: "Get in Touch",
  investor: "Learn More",
  careers: "View Openings",
  overseas: "Connect",
};

const connections: ConnectionOption[] = [
  { id: "vendor", name: "Vendors", description: "Partner with us as a supplier", icon: "↔" },
  { id: "dealer", name: "Dealers", description: "Become an authorized dealer", icon: "⌁", url: "https://dealers.rivotmotors.com/" },
  { id: "media", name: "Media", description: "Press and media inquiries", icon: "▤" },
  { id: "investor", name: "Investors", description: "Investment opportunities", icon: "↗" },
  { id: "careers", name: "Careers", description: "Join our team", icon: "▣" },
  { id: "overseas", name: "Overseas Partnership", description: "International distribution opportunities", icon: "◉" },
];

const formConfigs: Record<ConnectionId, FormConfig> = {
  vendor: {
    title: "Vendor",
    highlight: "Partnership",
    subtitle: "Join our network of trusted suppliers and become an integral part of the RIVOT ecosystem",
    description:
      "We're seeking quality suppliers who share our commitment to excellence and sustainability. Partner with us to build the future of electric mobility together.",
    benefitsHeading: "Benefits of Partnering with RIVOT",
    benefits: [
      "Access to a rapidly growing electric mobility market",
      "Long-term partnership opportunities with stability",
      "Collaborative product development and innovation",
      "Shared commitment to sustainability and quality",
    ],
    fields: [
      { name: "company", label: "Company Name *", type: "text", required: true },
      { name: "contact", label: "Contact Person *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number *", type: "tel", required: true },
      {
        name: "category",
        label: "Product Category *",
        type: "select",
        required: true,
        options: [
          { value: "batteries", label: "Batteries" },
          { value: "electronics", label: "Electronics" },
          { value: "chassis", label: "Chassis Components" },
          { value: "accessories", label: "Accessories" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "message", label: "Tell us about your company", type: "textarea" },
    ],
    submitLabel: "Submit Application",
    successMessage: "Thank you for your vendor application! We'll review your information and get back to you soon.",
  },
  dealer: {
    title: "Dealership",
    highlight: "Opportunity",
    subtitle: "Become an authorized RIVOT dealer and bring the future of electric mobility to your community",
    description:
      "We're seeking passionate entrepreneurs who share our vision for sustainable transportation. Join us in revolutionizing the electric vehicle industry.",
    benefitsHeading: "Why Become a RIVOT Dealer?",
    benefits: [
      "Exclusive dealership rights in your territory",
      "Comprehensive training and ongoing support",
      "Marketing and promotional materials",
      "Attractive margins and performance incentives",
    ],
    fields: [
      { name: "company", label: "Business Name *", type: "text", required: true },
      { name: "owner", label: "Owner/Partner Name *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number *", type: "tel", required: true },
      { name: "location", label: "Preferred Location *", type: "text", required: true },
      {
        name: "experience",
        label: "Years in Automotive Business",
        type: "select",
        options: [
          { value: "0-2", label: "0-2 years" },
          { value: "3-5", label: "3-5 years" },
          { value: "6-10", label: "6-10 years" },
          { value: "10+", label: "10+ years" },
        ],
      },
      {
        name: "investment",
        label: "Investment Capacity",
        type: "select",
        options: [
          { value: "10-25", label: "₹10-25 Lakhs" },
          { value: "25-50", label: "₹25-50 Lakhs" },
          { value: "50-100", label: "₹50-100 Lakhs" },
          { value: "100+", label: "₹100+ Lakhs" },
        ],
      },
    ],
    submitLabel: "Submit Application",
    successMessage: "Thank you for your dealership application! Our team will review your information and contact you soon.",
  },
  media: {
    title: "Media",
    highlight: "Inquiry",
    subtitle: "For press releases, interviews, and media resources, connect with our media relations team",
    description:
      "We welcome media inquiries and are happy to provide information, interviews, and resources to support your coverage of RIVOT and the electric mobility industry.",
    benefitsHeading: "Media Resources",
    benefits: [
      "Press releases and media kits",
      "High-resolution images and videos",
      "Executive interviews and expert commentary",
      "Product demonstration opportunities",
    ],
    fields: [
      { name: "name", label: "Full Name *", type: "text", required: true },
      { name: "outlet", label: "Media Outlet *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel" },
      {
        name: "type",
        label: "Media Type *",
        type: "select",
        required: true,
        options: [
          { value: "print", label: "Print" },
          { value: "online", label: "Online" },
          { value: "tv", label: "Television" },
          { value: "radio", label: "Radio" },
          { value: "podcast", label: "Podcast" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "deadline", label: "Deadline (if applicable)", type: "date" },
      { name: "message", label: "Inquiry Details *", type: "textarea", required: true },
    ],
    submitLabel: "Submit Inquiry",
    successMessage: "Thank you for your media inquiry! Our team will respond to your request promptly.",
  },
  investor: {
    title: "Investment",
    highlight: "Opportunity",
    subtitle: "Join us in revolutionizing electric mobility with innovative technology and sustainable practices",
    description:
      "RIVOT is at the forefront of electric mobility innovation. We invite qualified investors to join us in shaping the future of sustainable transportation.",
    benefitsHeading: "Why Invest in RIVOT?",
    benefits: [
      "Rapidly growing electric vehicle market with exponential potential",
      "Innovative technology and strong IP portfolio",
      "Experienced leadership team with proven track record",
      "Clear path to profitability and sustainable growth",
    ],
    fields: [
      { name: "name", label: "Full Name *", type: "text", required: true },
      { name: "company", label: "Company/Fund Name *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number *", type: "tel", required: true },
      {
        name: "type",
        label: "Investor Type *",
        type: "select",
        required: true,
        options: [
          { value: "angel", label: "Angel Investor" },
          { value: "vc", label: "Venture Capital" },
          { value: "private", label: "Private Equity" },
          { value: "corporate", label: "Corporate Investor" },
          { value: "institutional", label: "Institutional Investor" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "range",
        label: "Investment Range *",
        type: "select",
        required: true,
        options: [
          { value: "1-5", label: "₹1-5 Crores" },
          { value: "5-10", label: "₹5-10 Crores" },
          { value: "10-25", label: "₹10-25 Crores" },
          { value: "25-50", label: "₹25-50 Crores" },
          { value: "50+", label: "₹50+ Crores" },
        ],
      },
      { name: "message", label: "Tell us about your interest", type: "textarea" },
    ],
    submitLabel: "Submit Inquiry",
    successMessage: "Thank you for your investment inquiry! Our team will review your information and contact you soon.",
  },
  careers: {
    title: "Career",
    highlight: "Opportunities",
    subtitle: "Join our team and help shape the future of electric mobility",
    description:
      "We're always looking for talented individuals who are passionate about sustainable transportation and innovation. Explore career opportunities at RIVOT.",
    benefitsHeading: "Why Work at RIVOT?",
    benefits: [
      "Be part of a revolutionary team in electric mobility",
      "Competitive salary and benefits package",
      "Opportunities for professional growth and development",
      "Work in a dynamic and innovative environment",
    ],
    fields: [
      { name: "name", label: "Full Name *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number *", type: "tel", required: true },
      {
        name: "position",
        label: "Position Applying For *",
        type: "select",
        required: true,
        options: [
          { value: "engineer", label: "Engineer" },
          { value: "designer", label: "Designer" },
          { value: "marketing", label: "Marketing" },
          { value: "sales", label: "Sales" },
          { value: "operations", label: "Operations" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "experience",
        label: "Years of Experience",
        type: "select",
        options: [
          { value: "0-2", label: "0-2 years" },
          { value: "3-5", label: "3-5 years" },
          { value: "6-10", label: "6-10 years" },
          { value: "10+", label: "10+ years" },
        ],
      },
      { name: "cv", label: "Attach CV *", type: "file", required: true },
      { name: "message", label: "Cover Letter", type: "textarea" },
    ],
    submitLabel: "Submit Application",
    successMessage: "Thank you for your application! We'll review your information and get back to you soon.",
  },
  overseas: {
    title: "Overseas",
    highlight: "Partnership",
    subtitle: "Expand RIVOT's global presence as our international distribution partner",
    description:
      "We're seeking established international partners to distribute RIVOT electric vehicles in global markets. Join us in bringing sustainable mobility solutions to customers worldwide.",
    benefitsHeading: "Benefits of International Partnership",
    benefits: [
      "Exclusive distribution rights in your region",
      "Comprehensive training and marketing support",
      "Competitive pricing and favorable terms",
      "Access to innovative electric mobility products",
    ],
    fields: [
      { name: "company", label: "Company Name *", type: "text", required: true },
      { name: "contact", label: "Contact Person *", type: "text", required: true },
      { name: "email", label: "Email Address *", type: "email", required: true },
      { name: "phone", label: "Phone Number *", type: "tel", required: true },
      {
        name: "country",
        label: "Country *",
        type: "select",
        required: true,
        options: [
          { value: "usa", label: "United States" },
          { value: "canada", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "germany", label: "Germany" },
          { value: "france", label: "France" },
          { value: "australia", label: "Australia" },
          { value: "japan", label: "Japan" },
          { value: "singapore", label: "Singapore" },
          { value: "uae", label: "UAE" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "business",
        label: "Type of Business *",
        type: "select",
        required: true,
        options: [
          { value: "distributor", label: "Distributor" },
          { value: "retailer", label: "Retailer" },
          { value: "dealer", label: "Dealership Network" },
          { value: "importer", label: "Importer" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "experience",
        label: "Years in Automotive Business",
        type: "select",
        options: [
          { value: "0-2", label: "0-2 years" },
          { value: "3-5", label: "3-5 years" },
          { value: "6-10", label: "6-10 years" },
          { value: "10+", label: "10+ years" },
        ],
      },
      { name: "message", label: "Tell us about your business", type: "textarea" },
    ],
    submitLabel: "Submit Application",
    successMessage: "Thank you for your overseas partnership inquiry! Our international team will review your application and contact you soon.",
  },
};

type PageState = "selection" | ConnectionId;

export function Connect() {
  const [currentPage, setCurrentPage] = useState<PageState>("selection");
  const [submittingId, setSubmittingId] = useState<ConnectionId | null>(null);
  const [successId, setSuccessId] = useState<ConnectionId | null>(null);
  const [errorId, setErrorId] = useState<ConnectionId | null>(null);

  useEffect(() => {
    const syncPageFromHash = () => {
      const hash = window.location.hash.slice(1).toLowerCase();
      if (hash === "career-opportunities" || hash === "careers") {
        setCurrentPage("careers");
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        });
      }
    };

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);
    return () => window.removeEventListener("hashchange", syncPageFromHash);
  }, []);

  const goToForm = (connection: ConnectionOption) => {
    if (connection.url) {
      window.location.href = connection.url;
      return;
    }
    setCurrentPage(connection.id);
    setSuccessId(null);
    setErrorId(null);
    if (connection.id === "careers") {
      window.history.replaceState(null, "", "/connect#career-opportunities");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBackToSelection = () => {
    setCurrentPage("selection");
    window.history.replaceState(null, "", "/connect");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (id: ConnectionId, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setSubmittingId(id);
    setErrorId(null);
    const formData = new FormData(form);
    formData.set("formType", id);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: formData });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to submit the form.");
      setSubmittingId(null);
      setSuccessId(id);
      form.reset();
      setTimeout(() => setSuccessId((current) => (current === id ? null : current)), 5000);
    } catch (error) {
      setSubmittingId(null);
      setErrorId(id);
      console.error(error);
    }
  };

  return (
    <section className={`rivotConnect ${currentPage === "selection" ? "isSelection" : "isForm"}`}>
      {currentPage === "selection" ? (
        <div className="rivotConnectSelection">
          <div className="rivotConnectHeader">
            <h1>
              Connect with <span className="highlight">RIVOT</span>
            </h1>
            <p>Select any option to explore partnership opportunities</p>
          </div>

          <div className="rivotConnectGrid" role="grid">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="rivotConnectCard"
                data-connection={connection.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${connection.name}`}
                onClick={() => goToForm(connection)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") goToForm(connection);
                }}
              >
                <Image
                  className="rivotConnectCardImage"
                  src={connectionCardImages[connection.id]}
                  alt=""
                  fill
                  sizes="(max-width: 960px) 50vw, 33vw"
                />
                <div className="rivotConnectIcon" aria-hidden="true">
                  <ConnectionIcon id={connection.id} />
                </div>
                <div className="rivotConnectName">{connection.name}</div>
                <p className="rivotConnectDescription">{connection.description}</p>
                <div className="rivotConnectCta" aria-hidden="true">
                  <span>{connectionCtas[connection.id]}</span>
                  <span className="rivotConnectArrow">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ConnectForm
          id={currentPage}
          config={formConfigs[currentPage]}
          submitting={submittingId === currentPage}
          success={successId === currentPage}
          error={errorId === currentPage}
          onBack={goBackToSelection}
          onSubmit={(event) => handleSubmit(currentPage, event)}
        />
      )}

      <style>{`
        body:has(.rivotConnect) .rivotHeader {
          color: #0a0a0a;
        }

        body:has(.rivotConnect) .rivotBrand,
        body:has(.rivotConnect) .rivotHeaderLinks a,
        body:has(.rivotConnect) .rivotProductsButton,
        body:has(.rivotConnect) .rivotExploreButton {
          color: #0a0a0a;
        }

        body:has(.rivotConnect) .rivotBrandMark img {
          filter: none;
        }

        body:has(.rivotConnect) .rivotBook {
          border-color: #ef7430;
          background: transparent;
          color: #ef7430;
        }

        body:has(.rivotConnect) .rivotThemeToggle {
          border-color: rgba(0, 0, 0, .08);
          background: rgba(255, 255, 255, .78);
          color: #111;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
        }

        .rivotConnect {
          min-height: 100vh;
          padding: 104px clamp(20px, 5vw, 84px) 76px;
          background:
            radial-gradient(circle at 92% 12%, rgba(239, 116, 48, .18), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f8f8f8 100%);
          color: #080808;
          font-family: inherit;
          line-height: 1.45;
          overflow: hidden;
        }

        .rivotConnectSelection,
        .rivotConnectFormPage {
          max-width: 1240px;
          margin: 0 auto;
        }

        .rivotConnectHeader {
          max-width: 760px;
          margin: 0 0 46px;
          text-align: left;
        }

        .rivotConnectHeader::before,
        .rivotConnectFormHeader::before {
          content: "CONNECT";
          display: block;
          margin-bottom: 16px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .rivotConnectFormHeader::before {
          content: none;
        }

        .rivotConnectHeader h1,
        .rivotConnectTitle {
          margin: 0;
          color: #070707;
          font-size: clamp(44px, 6.8vw, 92px);
          font-weight: 950;
          line-height: .94;
          letter-spacing: 0;
        }

        .rivotConnectHeader .highlight,
        .rivotConnectTitle .highlight {
          color: #ef7430;
        }

        .rivotConnectHeader p,
        .rivotConnectSubtitle,
        .rivotConnectDescriptionText {
          max-width: 620px;
          margin: 22px 0 0;
          color: #5f6b73;
          font-size: clamp(17px, 1.45vw, 22px);
          font-weight: 700;
          line-height: 1.55;
        }

        .rivotConnectGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .rivotConnectCard {
          position: relative;
          display: grid;
          min-height: 214px;
          padding: 24px;
          border: 1px solid rgba(10, 10, 10, .06);
          border-radius: 8px;
          background: rgba(255, 255, 255, .92);
          color: #090909;
          cursor: pointer;
          box-shadow: 0 24px 60px rgba(17, 17, 17, .08);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .rivotConnectCard:hover,
        .rivotConnectCard:focus-visible {
          border-color: rgba(239, 116, 48, .5);
          box-shadow: 0 30px 70px rgba(239, 116, 48, .14);
          outline: none;
          transform: translateY(-4px);
        }

        .rivotConnectIcon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          margin: 0 auto 26px;
          border-radius: 50%;
          background: rgba(239, 116, 48, .11);
          color: #ef7430;
        }

        .rivotConnectIcon svg {
          width: 29px;
          height: 29px;
        }

        .rivotConnectName {
          margin: 0 0 8px;
          color: #050505;
          font-size: clamp(22px, 2.1vw, 30px);
          font-weight: 950;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .rivotConnectDescription {
          max-width: 270px;
          margin: 0;
          color: #68747c;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.45;
        }

        .rivotConnectArrow {
          position: absolute;
          right: 22px;
          bottom: 22px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #ef7430;
          color: #fff;
          font-size: 20px;
          font-weight: 900;
          transition: transform .2s ease;
        }

        .rivotConnectCard:hover .rivotConnectArrow,
        .rivotConnectCard:focus-visible .rivotConnectArrow {
          transform: translateX(4px);
        }

        .rivotConnect.isSelection {
          min-height: 100vh;
          padding: 116px 24px 64px;
          background:
            radial-gradient(circle at 100% 0%, rgba(239, 116, 48, .12), transparent 22%),
            radial-gradient(circle at 0% 0%, rgba(239, 116, 48, .08), transparent 18%),
            linear-gradient(180deg, #fff 0%, #fbfbfb 100%);
        }

        .rivotConnect.isSelection .rivotConnectSelection {
          max-width: 1040px;
        }

        .rivotConnect.isSelection .rivotConnectHeader {
          max-width: none;
          margin: 0 auto 28px;
          text-align: center;
        }

        .rivotConnect.isSelection .rivotConnectHeader::before {
          content: none;
        }

        .rivotConnect.isSelection .rivotConnectHeader h1 {
          color: #080808;
          font-size: 48px;
          font-weight: 950;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .rivotConnect.isSelection .rivotConnectHeader p {
          max-width: none;
          margin: 8px auto 0;
          color: #5c6570;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }

        .rivotConnect.isSelection .rivotConnectGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px 24px;
          max-width: 980px;
          margin: 0 auto;
        }

        .rivotConnect.isSelection .rivotConnectCard {
          min-height: 206px;
          padding: 24px 18px 20px;
          justify-items: center;
          align-content: start;
          border-color: rgba(17, 17, 17, .09);
          background: rgba(255, 255, 255, .92);
          text-align: center;
          box-shadow: 0 16px 38px rgba(17, 17, 17, .06);
        }

        .rivotConnect.isSelection .rivotConnectCard:nth-child(2) {
          border-color: #ef7430;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible {
          border-color: #ef7430;
          box-shadow: 0 18px 42px rgba(239, 116, 48, .12);
        }

        .rivotConnect.isSelection .rivotConnectIcon {
          width: 58px;
          height: 58px;
          margin: 0 auto 14px;
          background: rgba(239, 116, 48, .11);
        }

        .rivotConnect.isSelection .rivotConnectIcon svg {
          width: 30px;
          height: 30px;
        }

        .rivotConnect.isSelection .rivotConnectName {
          margin: 0 0 8px;
          font-size: 15px;
          font-weight: 950;
          line-height: 1.1;
        }

        .rivotConnect.isSelection .rivotConnectDescription {
          max-width: 210px;
          min-height: 30px;
          margin: 0 auto;
          color: #69727c;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.35;
        }

        .rivotConnect.isSelection .rivotConnectArrow {
          position: static;
          width: 30px;
          height: 30px;
          margin: 16px auto 0;
          border: 1px solid #ef7430;
          background: transparent;
          color: #ef7430;
          font-size: 16px;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover .rivotConnectArrow,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible .rivotConnectArrow {
          background: #ef7430;
          color: #fff;
          transform: translateX(0);
        }

        .rivotConnectFormHeader {
          position: relative;
          max-width: none;
          margin: 0 calc(-1 * clamp(20px, 5vw, 84px)) 46px;
          padding: 22px clamp(20px, 5vw, 84px) 34px;
          border-bottom: 1px solid rgba(17, 17, 17, .14);
          text-align: center;
        }

        .rivotConnectFormHeader .rivotConnectTitle {
          color: #080808;
          font-size: 48px;
          font-weight: 900;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .rivotConnectFormHeader .rivotConnectTitle .highlight {
          color: #ef7430;
          font-weight: 900;
        }

        .rivotConnectFormHeader .rivotConnectSubtitle {
          max-width: 760px;
          margin: 18px auto 0;
          color: #697682;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.45;
        }

        .rivotConnectBack {
          position: static;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 92px;
          height: 56px;
          margin-top: 24px;
          border: 1px solid #ef7430;
          border-radius: 4px;
          background: transparent;
          color: #d45f22;
          font-size: 15px;
          font-weight: 400;
          cursor: pointer;
          box-shadow: none;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }

        .rivotConnectBack:hover {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
        }

        .rivotConnectDescriptionText {
          max-width: 940px;
          margin: 0 auto 86px;
          color: #2d3440;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.55;
          text-align: center;
        }

        .rivotConnectRow {
          display: grid;
          grid-template-columns: minmax(300px, 420px) minmax(360px, 520px);
          gap: 44px;
          align-items: start;
          max-width: 1180px;
          margin: 0 auto;
        }

        .rivotConnectInfoColumn {
          display: grid;
          gap: 16px;
        }

        .rivotConnectPhoto {
          position: relative;
          min-height: 360px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 8px;
          background: #f2f2f2;
          box-shadow: 0 18px 42px rgba(17, 17, 17, .16);
        }

        .rivotConnectPhoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .rivotConnectBenefits,
        .rivotConnectFormContainer {
          border: 1px solid rgba(17, 17, 17, .13);
          border-radius: 8px;
          background: rgba(255, 255, 255, .88);
          box-shadow: none;
        }

        .rivotConnectBenefits {
          min-height: auto;
          padding: 22px 24px;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, .92), rgba(250, 243, 238, .82));
        }

        .rivotConnectBenefits h3 {
          margin: 0 0 16px;
          color: #ef7430;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.2;
        }

        .rivotConnectBenefits ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .rivotConnectBenefits li {
          display: flex;
          gap: 10px;
          color: #4f5a64;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
          margin-bottom: 10px;
        }

        .rivotConnectBenefits li:last-child {
          margin-bottom: 0;
        }

        .rivotConnectBenefits li::before {
          content: "";
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          margin-top: 6px;
          border-radius: 50%;
          background: #ef7430;
          box-shadow: 0 0 0 4px rgba(239, 116, 48, .12);
        }

        .rivotConnectFormContainer {
          padding: 0;
          border: 0;
          background: transparent;
        }

        .rivotConnectSuccess {
          margin-bottom: 18px;
          padding: 14px 16px;
          border: 1px solid rgba(37, 175, 103, .28);
          border-radius: 8px;
          background: rgba(37, 175, 103, .08);
          color: #17844a;
          font-size: 14px;
          font-weight: 800;
        }

        .rivotConnectGroup {
          margin-bottom: 18px;
        }

        .rivotConnectGroup label {
          display: block;
          margin-bottom: 8px;
          color: #101010;
          font-size: 15px;
          font-weight: 800;
        }

        .rivotConnectGroup input,
        .rivotConnectGroup select,
        .rivotConnectGroup textarea {
          width: 100%;
          min-height: 48px;
          padding: 11px 14px;
          border: 1px solid rgba(17, 17, 17, .18);
          border-radius: 8px;
          background: rgba(255, 255, 255, .82);
          color: #111;
          font-size: 15px;
          font-family: inherit;
          font-weight: 400;
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }

        .rivotConnectGroup select option {
          background: #fff;
          color: #111;
        }

        .rivotConnectGroup textarea {
          min-height: 120px;
          resize: vertical;
        }

        .rivotConnectGroup input:focus,
        .rivotConnectGroup select:focus,
        .rivotConnectGroup textarea:focus {
          outline: none;
          border-color: #ef7430;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(239, 116, 48, .12);
        }

        .rivotConnectSubmit {
          width: 100%;
          min-height: 50px;
          margin-top: 4px;
          padding: 0 24px;
          border: 1px solid #ef7430;
          border-radius: 8px;
          background: #ef7430;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          box-shadow: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .rivotConnectSubmit:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 44px rgba(239, 116, 48, .3);
        }

        .rivotConnectSubmit:disabled {
          opacity: .72;
          cursor: not-allowed;
          transform: none;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection {
          background:
            radial-gradient(circle at 92% 10%, rgba(239, 116, 48, .12), transparent 28%),
            #080909;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectSelection,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectFormPage {
          background: transparent !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :where(.rivotConnectHeader h1, .rivotConnectTitle, .rivotConnectName, .rivotConnectGroup label) {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :where(.rivotConnectHeader p, .rivotConnectSubtitle, .rivotConnectDescription, .rivotConnectDescriptionText) {
          color: #aeb4b4 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectCard {
          border-color: rgba(255, 255, 255, .14) !important;
          background: #111313 !important;
          color: #f5f5f2 !important;
          box-shadow: 0 20px 48px rgba(0, 0, 0, .28) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectCard:hover,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectCard:focus-visible {
          border-color: #ef7430 !important;
          box-shadow: 0 22px 52px rgba(239, 116, 48, .14) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectIcon {
          background: rgba(239, 116, 48, .14) !important;
          color: #ff7b35;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :where(.rivotConnectBenefits, .rivotConnectFormContainer) {
          border-color: rgba(255, 255, 255, .14);
          background: #111313;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectBenefits li {
          color: #aeb4b4;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :where(.rivotConnectGroup input, .rivotConnectGroup select, .rivotConnectGroup textarea) {
          border-color: rgba(255, 255, 255, .16) !important;
          background: #111313 !important;
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnectGroup select option {
          background: #111313;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect) :where(.rivotHeader, .rivotBrand, .rivotHeaderLinks a, .rivotProductsButton, .rivotExploreButton) {
          color: #f5f5f2;
        }

        /* Premium neutral landing page with image-led partnership cards. */
        .rivotConnect.isSelection {
          background: linear-gradient(180deg, #F7F4F2 0%, #FFFFFF 45%, #F5F5F3 100%) !important;
          color: #111111 !important;
        }

        body:has(.rivotConnect.isSelection) .rivotHeader.isHomeHeader {
          background: transparent !important;
          color: #111111 !important;
          box-shadow: none !important;
        }

        body:has(.rivotConnect.isSelection) :is(.rivotBrand, .rivotHeaderLinks a, .rivotProductsButton, .rivotCommunityButton, .rivotExploreButton, .rivotMenuButton) {
          color: #111111 !important;
        }

        body:has(.rivotConnect.isSelection) .rivotBrandMark img { filter: brightness(0) !important; }

        .rivotConnect.isSelection .rivotConnectHeader::before {
          content: "PARTNER WITH PURPOSE";
          display: block;
          margin-bottom: 12px;
          color: #5F6368;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .34em;
        }

        .rivotConnect.isSelection .rivotConnectHeader h1 {
          color: #111111 !important;
          font-size: clamp(36px, 3vw, 48px);
        }

        .rivotConnect.isSelection .rivotConnectHeader .highlight { color: #FF6B35 !important; }
        .rivotConnect.isSelection .rivotConnectHeader p { color: #5F6368 !important; }

        .rivotConnect.isSelection .rivotConnectGrid {
          max-width: 1180px;
          gap: 16px;
        }

        .rivotConnect.isSelection .rivotConnectCard,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard {
          min-height: 260px;
          padding: 24px;
          align-content: end;
          justify-items: start;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .42) !important;
          border-radius: 18px;
          background: #111820 !important;
          color: #FFFFFF !important;
          text-align: left;
          box-shadow: 0 12px 30px rgba(17, 17, 17, .09) !important;
          isolation: isolate;
        }

        .rivotConnect.isSelection .rivotConnectCard::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(4, 8, 12, .06) 8%, rgba(4, 8, 12, .38) 56%, rgba(4, 8, 12, .94) 100%);
          pointer-events: none;
        }

        .rivotConnect.isSelection .rivotConnectCardImage {
          z-index: 0;
          object-fit: cover;
          object-position: center;
          transition: transform .5s cubic-bezier(.22, 1, .36, 1), filter .3s ease;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover .rivotConnectCardImage,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible .rivotConnectCardImage {
          transform: scale(1.045);
          filter: saturate(1.06);
        }

        .rivotConnect.isSelection .rivotConnectCard > :not(.rivotConnectCardImage) {
          position: relative;
          z-index: 2;
        }

        .rivotConnect.isSelection .rivotConnectIcon,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectIcon {
          width: 48px;
          height: 48px;
          margin: 0 0 18px;
          background: rgba(255, 107, 53, .92) !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .16);
        }

        .rivotConnect.isSelection .rivotConnectIcon svg { width: 25px; height: 25px; }

        .rivotConnect.isSelection .rivotConnectName,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectName {
          margin-bottom: 7px;
          color: #FFFFFF !important;
          font-size: clamp(22px, 2vw, 29px);
          text-shadow: 0 2px 12px rgba(0, 0, 0, .35);
        }

        .rivotConnect.isSelection .rivotConnectDescription,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectDescription {
          max-width: 230px;
          min-height: 0;
          color: rgba(255, 255, 255, .86) !important;
          font-size: 13px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, .38);
        }

        .rivotConnect.isSelection .rivotConnectArrow {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 3;
          margin: 0;
          border-color: rgba(255, 255, 255, .7);
          background: rgba(9, 13, 16, .35);
          color: #FFFFFF;
          backdrop-filter: blur(8px);
        }

        /* Split-card treatment from the supplied UI reference. */
        .rivotConnect.isSelection .rivotConnectCard,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard {
          --connect-card-bg: #FFFAF6;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 22px;
          border-color: #E8E3DF !important;
          background: var(--connect-card-bg) !important;
          color: #111111 !important;
          box-shadow: 0 9px 24px rgba(17, 17, 17, .065) !important;
        }

        .rivotConnect.isSelection .rivotConnectCard[data-connection="dealer"] { --connect-card-bg: #F2F7FC; }
        .rivotConnect.isSelection .rivotConnectCard[data-connection="media"] { --connect-card-bg: #F8F4FF; }
        .rivotConnect.isSelection .rivotConnectCard[data-connection="investor"] { --connect-card-bg: #F1FAF4; }
        .rivotConnect.isSelection .rivotConnectCard[data-connection="careers"] { --connect-card-bg: #FFF3F1; }
        .rivotConnect.isSelection .rivotConnectCard[data-connection="overseas"] { --connect-card-bg: #F1F7FC; }

        .rivotConnect.isSelection .rivotConnectCard::after {
          z-index: 1;
          background: linear-gradient(90deg, var(--connect-card-bg) 0%, var(--connect-card-bg) 43%, rgba(255, 255, 255, .78) 55%, transparent 72%);
        }

        .rivotConnect.isSelection .rivotConnectCardImage {
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: auto !important;
          width: 58% !important;
          height: 100% !important;
          clip-path: polygon(24% 0, 100% 0, 100% 100%, 0 100%);
        }

        .rivotConnect.isSelection .rivotConnectIcon,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectIcon {
          width: 46px;
          height: 46px;
          margin-bottom: 16px;
          background: rgba(255, 107, 53, .11) !important;
          color: #FF6B35 !important;
          box-shadow: none;
        }

        .rivotConnect.isSelection .rivotConnectCard[data-connection="media"] .rivotConnectIcon {
          background: rgba(111, 54, 219, .1) !important;
          color: #7138D7 !important;
        }

        .rivotConnect.isSelection .rivotConnectCard[data-connection="investor"] .rivotConnectIcon {
          background: rgba(30, 154, 86, .1) !important;
          color: #168A4A !important;
        }

        .rivotConnect.isSelection .rivotConnectCard[data-connection="overseas"] .rivotConnectIcon {
          background: rgba(42, 105, 185, .1) !important;
          color: #2869B8 !important;
        }

        .rivotConnect.isSelection .rivotConnectName,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectName {
          flex: 0 0 auto;
          max-width: 50%;
          margin: 0 0 7px;
          color: #111111 !important;
          font-size: clamp(20px, 1.7vw, 25px);
          text-shadow: none;
        }

        .rivotConnect.isSelection .rivotConnectDescription,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectDescription {
          flex: 0 0 auto;
          width: 48%;
          max-width: 48%;
          color: #5F6368 !important;
          font-size: 12px;
          line-height: 1.4;
          margin: 0;
          text-shadow: none;
        }

        .rivotConnect.isSelection .rivotConnectCta {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 14px;
          color: #FF6B35;
          font-size: 12px;
          font-weight: 800;
        }

        .rivotConnect.isSelection .rivotConnectCta .rivotConnectArrow {
          position: static;
          width: 34px;
          height: 34px;
          margin: 0;
          border: 0;
          background: #FF6B35;
          color: #FFFFFF;
          backdrop-filter: none;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard:hover,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard:focus-visible {
          border-color: rgba(255, 107, 53, .5) !important;
          box-shadow: 0 14px 32px rgba(17, 17, 17, .09) !important;
        }

        html body:has(.rivotConnect.isSelection) .rivotHeader.isHomeHeader :is(
          .rivotHeaderLinks a,
          .rivotProductsButton,
          .rivotCommunityButton,
          .rivotExploreButton
        ) {
          color: #111111 !important;
          text-shadow: none !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection {
          background: linear-gradient(180deg, #080A0B 0%, #101314 48%, #080A0B 100%) !important;
          color: #F5F5F2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isSelection) .rivotHeader.isHomeHeader {
          background: transparent !important;
          color: #FFFFFF !important;
          box-shadow: none !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isSelection) .rivotHeader.isHomeHeader :is(
          .rivotBrand,
          .rivotHeaderLinks a,
          .rivotProductsButton,
          .rivotCommunityButton,
          .rivotExploreButton,
          .rivotMenuButton
        ) {
          color: #FFFFFF !important;
          text-shadow: 0 1px 10px rgba(0, 0, 0, .2) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isSelection) .rivotBrandMark img {
          filter: brightness(0) invert(1) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectHeader h1 {
          color: #F5F5F2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectHeader::before,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectHeader p {
          color: #ADB4B7 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard {
          --connect-card-bg: #15191B;
          border-color: rgba(255, 255, 255, .13) !important;
          background: var(--connect-card-bg) !important;
          color: #F5F5F2 !important;
          box-shadow: 0 14px 34px rgba(0, 0, 0, .28) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard[data-connection="dealer"] { --connect-card-bg: #121A20; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard[data-connection="media"] { --connect-card-bg: #191520; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard[data-connection="investor"] { --connect-card-bg: #111B16; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard[data-connection="careers"] { --connect-card-bg: #1D1514; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard[data-connection="overseas"] { --connect-card-bg: #111923; }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard::after {
          background: linear-gradient(90deg, var(--connect-card-bg) 0%, var(--connect-card-bg) 43%, rgba(15, 18, 20, .8) 57%, transparent 74%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectName {
          color: #F5F5F2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectDescription {
          color: #B2B8BA !important;
        }

        .rivotConnect.isSelection .rivotConnectCard {
          animation: rivotConnectCardEnter .64s cubic-bezier(.22, 1, .36, 1) backwards;
        }

        .rivotConnect.isSelection .rivotConnectCard:nth-child(1) { animation-delay: .08s; }
        .rivotConnect.isSelection .rivotConnectCard:nth-child(2) { animation-delay: .16s; }
        .rivotConnect.isSelection .rivotConnectCard:nth-child(3) { animation-delay: .24s; }
        .rivotConnect.isSelection .rivotConnectCard:nth-child(4) { animation-delay: .32s; }
        .rivotConnect.isSelection .rivotConnectCard:nth-child(5) { animation-delay: .4s; }
        .rivotConnect.isSelection .rivotConnectCard:nth-child(6) { animation-delay: .48s; }

        .rivotConnect.isSelection .rivotConnectIcon {
          transition: transform .3s cubic-bezier(.22, 1, .36, 1), box-shadow .3s ease;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover .rivotConnectIcon,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible .rivotConnectIcon {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 8px 20px rgba(255, 107, 53, .16);
        }

        .rivotConnect.isSelection .rivotConnectCta .rivotConnectArrow {
          transition: transform .3s cubic-bezier(.22, 1, .36, 1), background .2s ease;
        }

        .rivotConnect.isSelection .rivotConnectCard:hover .rivotConnectCta .rivotConnectArrow,
        .rivotConnect.isSelection .rivotConnectCard:focus-visible .rivotConnectCta .rivotConnectArrow {
          transform: translateX(5px);
        }

        @keyframes rivotConnectCardEnter {
          from { opacity: 0; transform: translateY(28px) scale(.975); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotConnect.isSelection .rivotConnectCard {
            animation: none !important;
          }

          .rivotConnect.isSelection :is(.rivotConnectCard, .rivotConnectCardImage, .rivotConnectIcon, .rivotConnectArrow) {
            transition: none !important;
          }
        }

        @media (max-width: 960px) {
          .rivotConnect {
            padding-top: 96px;
          }

          .rivotConnectGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rivotConnect.isSelection .rivotConnectGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rivotConnectRow {
            grid-template-columns: 1fr;
            gap: 28px;
            max-width: 640px;
          }

          .rivotConnectPhoto {
            min-height: 380px;
          }
        }

        @media (max-width: 680px) {
          .rivotConnect {
            padding: 84px 16px 52px;
          }

          .rivotConnectHeader {
            margin-bottom: 28px;
          }

          .rivotConnectGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .rivotConnect.isSelection {
            padding: 88px 16px 48px;
          }

          .rivotConnect.isSelection .rivotConnectHeader h1,
          .rivotConnectFormHeader .rivotConnectTitle {
            font-size: 40px;
          }

          .rivotConnect.isSelection .rivotConnectHeader h1 {
            font-size: clamp(25px, 7.4vw, 30px);
            line-height: 1;
            letter-spacing: -.035em;
            white-space: nowrap;
          }

          .rivotConnect.isSelection .rivotConnectHeader .highlight {
            display: inline;
          }

          .rivotConnect.isSelection .rivotConnectHeader p {
            margin-top: 10px;
            font-size: 11px;
            line-height: 1.35;
            white-space: nowrap;
          }

          .rivotConnect.isSelection .rivotConnectGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .rivotConnect.isSelection .rivotConnectCard {
            min-width: 0;
            min-height: 178px;
            padding: 14px 8px 12px;
          }

          .rivotConnect.isSelection .rivotConnectIcon {
            width: 44px;
            height: 44px;
            margin-bottom: 10px;
          }

          .rivotConnect.isSelection .rivotConnectIcon svg {
            width: 22px;
            height: 22px;
          }

          .rivotConnect.isSelection .rivotConnectName {
            margin-bottom: 6px;
            font-size: 14px;
          }

          .rivotConnect.isSelection .rivotConnectDescription {
            max-width: 138px;
            min-height: 28px;
            font-size: 10px;
            line-height: 1.3;
          }

          .rivotConnect.isSelection .rivotConnectArrow {
            width: 28px;
            height: 28px;
            margin-top: 12px;
            font-size: 14px;
          }

          .rivotConnect.isSelection .rivotConnectHeader::before {
            margin-bottom: 9px;
            font-size: 8px;
            letter-spacing: .2em;
          }

          .rivotConnect.isSelection .rivotConnectCard,
          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard {
            min-height: 188px;
            padding: 12px 9px;
          }

          .rivotConnect.isSelection .rivotConnectCard::after {
            background: linear-gradient(90deg, var(--connect-card-bg) 0%, var(--connect-card-bg) 45%, rgba(255, 255, 255, .68) 72%, transparent 100%);
          }

          html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotConnect.isSelection .rivotConnectCard::after {
            background: linear-gradient(90deg, var(--connect-card-bg) 0%, var(--connect-card-bg) 45%, rgba(15, 18, 20, .7) 72%, transparent 100%);
          }

          .rivotConnect.isSelection .rivotConnectCardImage {
            width: 68% !important;
            opacity: .62;
            clip-path: polygon(38% 0, 100% 0, 100% 100%, 10% 100%);
          }

          .rivotConnect.isSelection .rivotConnectIcon {
            width: 38px;
            height: 38px;
          }

          .rivotConnect.isSelection .rivotConnectIcon svg {
            width: 19px;
            height: 19px;
          }

          .rivotConnect.isSelection .rivotConnectName,
          .rivotConnect.isSelection .rivotConnectDescription {
            position: relative;
            z-index: 3;
            width: 82%;
            max-width: 82%;
          }

          .rivotConnect.isSelection .rivotConnectCta {
            bottom: auto;
            left: auto;
            padding-top: 8px;
          }

          .rivotConnect.isSelection .rivotConnectCta > span:first-child {
            display: none;
          }

          .rivotConnect.isSelection .rivotConnectCta .rivotConnectArrow {
            width: 28px;
            height: 28px;
            margin: 0;
          }

          .rivotConnectCard {
            min-height: 174px;
            padding: 20px;
          }

          .rivotConnectIcon {
            width: 48px;
            height: 48px;
            margin-bottom: 20px;
          }

          .rivotConnectIcon svg {
            width: 24px;
            height: 24px;
          }

          .rivotConnectFormHeader {
            margin: 0 -16px 28px;
            padding: 14px 16px 22px;
          }

          .rivotConnectFormHeader .rivotConnectTitle {
            font-size: clamp(25px, 7.5vw, 32px);
            line-height: 1.05;
            letter-spacing: -.025em;
            white-space: nowrap;
          }

          .rivotConnectFormHeader .rivotConnectSubtitle {
            max-width: 330px;
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.4;
          }

          .rivotConnectBack {
            min-width: 78px;
            height: 42px;
            position: static;
            margin-top: 16px;
            border-radius: 8px;
            font-size: 13px;
          }

          .rivotConnectDescriptionText {
            margin-bottom: 38px;
            text-align: left;
          }

          .rivotConnectBenefits,
          .rivotConnectFormContainer {
            padding: 20px;
          }

          .rivotConnectPhoto {
            min-height: 300px;
          }

          .rivotConnectGroup input,
          .rivotConnectGroup select,
          .rivotConnectGroup textarea {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}

type ConnectFormProps = {
  id: ConnectionId;
  config: FormConfig;
  submitting: boolean;
  success: boolean;
  error: boolean;
  onBack: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ConnectForm({ id, config, submitting, success, error, onBack, onSubmit }: ConnectFormProps) {
  return (
    <div className="rivotConnectFormPage">
      <div className="rivotConnectFormHeader">
        <h1 className="rivotConnectTitle">
          {config.title} <span className="highlight">{config.highlight}</span>
        </h1>
        <p className="rivotConnectSubtitle">{config.subtitle}</p>
        <button type="button" className="rivotConnectBack" onClick={onBack}>
          Back
        </button>
      </div>

      <p className="rivotConnectDescriptionText">{config.description}</p>

      <div className="rivotConnectRow">
        <div className="rivotConnectInfoColumn">
          <div className="rivotConnectPhoto">
            <Image src={connectImages[id]} alt={`${config.title} ${config.highlight}`} sizes="(max-width: 960px) 100vw, 520px" />
          </div>

          <div className="rivotConnectBenefits">
            <h3>{config.benefitsHeading}</h3>
            <ul>
              {config.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rivotConnectFormContainer">
          {success ? <div className="rivotConnectSuccess">{config.successMessage}</div> : null}
          {error ? <div className="rivotConnectSuccess" style={{ color: "#a33", borderColor: "#d99" }}>Unable to send your request. Please try again.</div> : null}

          <form onSubmit={onSubmit}>
            {config.fields.map((field) => (
              <div className="rivotConnectGroup" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "select" ? (
                  <select id={field.name} name={field.name} required={field.required} defaultValue="">
                    <option value="" disabled>
                      Select {field.label.replace(" *", "")}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea id={field.name} name={field.name} required={field.required} />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    accept={field.type === "file" ? ".pdf,.doc,.docx" : undefined}
                  />
                )}
              </div>
            ))}

            <button type="submit" className="rivotConnectSubmit" disabled={submitting}>
              {submitting ? "Sending..." : config.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ConnectionIcon({ id }: { id: ConnectionId }) {
  const commonProps = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "vendor") {
    return (
      <svg {...commonProps}>
        <path d="M4 14h5l4 4c1.2 1.2 3.1 1.2 4.3 0l1.7-1.7" />
        <path d="M28 14h-5l-5-5h-5l-3.5 3.5c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l2.7-2.7" />
        <path d="M19 17l2 2c.8.8.8 2 0 2.8s-2 .8-2.8 0l-.5-.5" />
        <path d="M8 11V9H4v10h4v-2" />
        <path d="M24 11V9h4v10h-4v-2" />
      </svg>
    );
  }

  if (id === "dealer") {
    return (
      <svg {...commonProps}>
        <path d="M6 25 13 7h6l7 18" />
        <path d="M16 8v17" />
        <path d="M12 17h8" />
        <path d="M10 23h12" />
      </svg>
    );
  }

  if (id === "media") {
    return (
      <svg {...commonProps}>
        <rect x="5" y="8" width="22" height="16" rx="2" />
        <path d="M10 13h5" />
        <path d="M10 18h5" />
        <path d="M19 13h4" />
        <path d="M19 18h4" />
      </svg>
    );
  }

  if (id === "investor") {
    return (
      <svg {...commonProps}>
        <path d="M7 24h18" />
        <path d="M9 21l5-5 4 3 6-8" />
        <path d="M24 11v6h-6" />
      </svg>
    );
  }

  if (id === "careers") {
    return (
      <svg {...commonProps}>
        <rect x="6" y="11" width="20" height="14" rx="2" />
        <path d="M12 11V8h8v3" />
        <path d="M6 16h20" />
        <path d="M14 16v2h4v-2" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="16" cy="10" r="3" />
      <circle cx="9" cy="16" r="2.6" />
      <circle cx="23" cy="16" r="2.6" />
      <path d="M10 24c.7-3 2.8-5 6-5s5.3 2 6 5" />
      <path d="M4.5 24c.4-2.7 2-4.3 4.5-4.3" />
      <path d="M27.5 24c-.4-2.7-2-4.3-4.5-4.3" />
    </svg>
  );
}
