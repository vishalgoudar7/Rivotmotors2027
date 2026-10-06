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
import mediaInquiryBackground from "@/asset/connect/Connect/Golden Hour Electric Scooter Ride.png";
import vendorInquiryBackground from "@/asset/connect/Connect/vender.png";
import investorInquiryBackground from "@/asset/connect/Connect/invest.png";
import careerInquiryBackground from "@/asset/connect/Connect/Golden Forest Ride Break.png";

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
    <section className={`rivotConnect ${currentPage === "selection" ? "isSelection" : "isForm"}${currentPage === "media" || currentPage === "vendor" || currentPage === "investor" || currentPage === "overseas" || currentPage === "careers" ? " isShowcaseForm" : ""}`}>
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

        .rivotMediaInquiry {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(500px, .88fr);
          grid-template-rows: minmax(380px, 49vh) auto;
          min-height: calc(100vh - 104px);
          max-width: none;
          margin: 0 auto;
          overflow: hidden;
          border: 0;
          border-radius: 0;
          background: #fff;
          box-shadow: none;
        }

        .rivotConnect.isShowcaseForm { padding: 104px 0 0; }

        .rivotMediaVisual {
          position: relative;
          display: flex;
          min-height: 0;
          padding: clamp(30px, 3.8vw, 54px);
          align-items: center;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
        }

        .rivotMediaVisualImage {
          z-index: -2;
          object-fit: cover;
          object-position: 58% center;
        }

        .rivotMediaVisual::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(180deg, rgba(7, 8, 8, .08), rgba(7, 8, 8, .2) 40%, rgba(7, 8, 8, .9));
        }

        .rivotMediaVisual::before {
          content: "";
          position: absolute;
          top: -8%;
          right: -64px;
          z-index: 2;
          width: 125px;
          height: 116%;
          background: #fff;
          transform: skewX(-14deg);
          pointer-events: none;
        }

        .rivotMediaVisualContent { max-width: 360px; }
        .rivotMediaEyebrow,
        .rivotMediaFormKicker {
          margin: 0 0 14px;
          color: #ff6b35;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .28em;
          text-transform: uppercase;
        }

        .rivotMediaVisual h2 {
          max-width: 430px;
          margin: 0;
          color: #fff;
          font-size: clamp(38px, 3vw, 50px);
          font-weight: 900;
          line-height: .96;
          letter-spacing: -.055em;
        }

        .rivotMediaVisual h2 span { color: #ff6b35; }
        .rivotMediaVisualContent > p:not(.rivotMediaEyebrow) {
          max-width: 440px;
          margin: 16px 0 24px;
          color: rgba(255, 255, 255, .84);
          font-size: 12px;
          line-height: 1.55;
        }

        .rivotMediaResources {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
        }

        .rivotMediaResources span {
          min-height: 42px;
          padding: 8px 10px;
          border: 0;
          border-left: 1px solid rgba(255, 255, 255, .35);
          border-radius: 0;
          background: transparent;
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }

        .rivotMediaAssets {
          grid-column: 1;
          grid-row: 2;
          padding: 18px clamp(30px, 3.8vw, 54px) 22px;
          background: linear-gradient(145deg, #fff, #faf8f6);
        }

        .rivotMediaAssets > p {
          margin: 0 0 6px;
          color: #5f6368;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .25em;
          text-transform: uppercase;
        }

        .rivotMediaAssets h3 {
          margin: 0 0 12px;
          color: #111;
          font-size: 24px;
          line-height: 1;
        }

        .rivotMediaAssets h3 span { color: #ff6b35; }
        .rivotMediaAssetGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .rivotMediaAssetCard {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) 26px;
          gap: 10px;
          align-items: center;
          min-height: 54px;
          padding: 8px 10px;
          border: 1px solid #eadfd8;
          border-radius: 10px;
          background: #fff;
        }

        .rivotMediaAssetCard i,
        .rivotMediaAssetCard em {
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff1ea;
          color: #ff6b35;
          font-style: normal;
          font-weight: 900;
        }

        .rivotMediaAssetCard i { width: 34px; height: 34px; }
        .rivotMediaAssetCard em { width: 26px; height: 26px; }
        .rivotMediaAssetCard b { display: block; color: #111; font-size: 11px; }
        .rivotMediaAssetCard small { display: block; margin-top: 3px; color: #6b7074; font-size: 9px; line-height: 1.25; }

        .rivotMediaFormPanel {
          position: relative;
          grid-column: 2;
          grid-row: 1 / 3;
          padding: clamp(28px, 2.8vw, 44px);
          background:
            radial-gradient(circle at 100% 0%, rgba(255, 107, 53, .09), transparent 30%),
            linear-gradient(145deg, #fff, #faf7f4);
        }

        .rivotMediaFormPanel .rivotConnectBack {
          position: absolute;
          top: 18px;
          right: 22px;
          min-width: 72px;
          height: 38px;
          margin: 0;
          border-radius: 999px;
          font-size: 12px;
        }

        .rivotMediaFormPanel h1 {
          margin: 0;
          color: #111;
          font-size: clamp(34px, 2.8vw, 46px);
          line-height: .98;
          letter-spacing: -.045em;
        }

        .rivotMediaFormPanel h1 span { color: #ff6b35; }
        .rivotMediaFormIntro {
          max-width: 620px;
          margin: 10px 0 16px;
          color: #5f6368;
          font-size: 13px;
          line-height: 1.55;
        }

        .rivotMediaFormPanel .rivotConnectFormContainer {
          padding: 16px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 16px;
          background: rgba(255, 255, 255, .88);
          box-shadow: 0 18px 48px rgba(20, 20, 20, .07);
        }

        .rivotMediaFormPanel form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 12px;
        }

        .rivotMediaFormPanel .rivotConnectGroup { position: relative; margin: 0; }
        .rivotMediaFormPanel .rivotConnectGroup:last-of-type { grid-column: 1 / -1; }
        .rivotMediaFormPanel .rivotConnectGroup label { margin-bottom: 5px; font-size: 11px; }
        .rivotRequiredMark { margin-left: 2px; color: #e53935 !important; }
        .rivotMediaFormPanel .rivotConnectGroup :is(input, select) { min-height: 38px; padding: 7px 10px; font-size: 11px; }
        .rivotMediaFormPanel .rivotConnectGroup textarea { min-height: 78px; padding: 8px 10px; font-size: 11px; }
        .rivotMediaFormPanel .rivotConnectGroup .rivotMediaFieldIcon + :is(input, select, textarea) { padding-left: 34px; }
        .rivotMediaFieldIcon {
          position: absolute;
          z-index: 1;
          left: 11px;
          top: 29px;
          width: 14px;
          height: 14px;
          color: #666d72;
          pointer-events: none;
        }
        .rivotMediaFieldIcon svg { display: block; width: 100%; height: 100%; }
        .rivotMediaFormPanel .rivotConnectGroup[data-field="message"] textarea { padding-right: 12px; padding-bottom: 22px; }
        .rivotMediaCharacterCount {
          position: absolute;
          right: 10px;
          bottom: 7px;
          color: #74797d;
          font-size: 9px;
          line-height: 1;
        }
        .rivotMediaFormPanel .rivotConnectSubmit {
          min-height: 40px;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .rivotMediaFormPanel .rivotConnectSubmit span { font-size: 18px; font-weight: 400; line-height: 1; }
        .rivotMediaPrivacy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 10px 0 0;
          color: #777d80;
          font-size: 8px;
          line-height: 1.35;
          text-align: center;
        }
        .rivotMediaPrivacy span { font-size: 9px; }

        html:is([data-theme="light"], [data-rivot-theme="light"]) body:has(.rivotConnect.isShowcaseForm) .rivotHeader.isHomeHeader,
        html:is([data-theme="light"], [data-rivot-theme="light"]) body:has(.rivotConnect.isShowcaseForm) .rivotHeader.isHomeHeader :is(
          .rivotBrand,
          .rivotHeaderLinks a,
          .rivotProductsButton,
          .rivotCommunityButton,
          .rivotExploreButton,
          .rivotMenuButton
        ) {
          color: #111 !important;
          text-shadow: none !important;
        }

        html:is([data-theme="light"], [data-rivot-theme="light"]) body:has(.rivotConnect.isShowcaseForm) .rivotHeader.isHomeHeader {
          background: #fff !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        html:is([data-theme="light"], [data-rivot-theme="light"]) body:has(.rivotConnect.isShowcaseForm) .rivotBrandMark img {
          filter: brightness(0) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isShowcaseForm) .rivotHeader.isHomeHeader,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isShowcaseForm) .rivotHeader.isHomeHeader :is(
          .rivotBrand,
          .rivotHeaderLinks a,
          .rivotProductsButton,
          .rivotCommunityButton,
          .rivotExploreButton,
          .rivotMenuButton
        ) {
          color: #fff !important;
          text-shadow: 0 1px 10px rgba(0, 0, 0, .3) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) body:has(.rivotConnect.isShowcaseForm) .rivotBrandMark img {
          filter: brightness(0) invert(1) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaInquiry {
          background: #0b0d0e;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaVisual::before {
          background: #0d0f10;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssets {
          background: linear-gradient(145deg, #101213, #0b0d0e);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssets > p {
          color: #aeb5b7;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssets h3,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssetCard b {
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssetCard {
          border-color: rgba(255, 255, 255, .12);
          background: #171a1b;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaAssetCard small {
          color: #aeb5b7;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel {
          background:
            radial-gradient(circle at 100% 0%, rgba(255, 107, 53, .1), transparent 30%),
            linear-gradient(145deg, #121516, #0b0d0e);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel h1,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel .rivotConnectGroup label {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormIntro {
          color: #b4babc;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel .rivotConnectFormContainer {
          border-color: rgba(255, 255, 255, .12);
          background: rgba(24, 27, 28, .94);
          box-shadow: 0 20px 50px rgba(0, 0, 0, .28);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel .rivotConnectGroup :is(input, select, textarea) {
          border-color: rgba(255, 255, 255, .16);
          background: #0f1213 !important;
          color: #f5f5f2 !important;
          color-scheme: dark;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotMediaFormPanel .rivotConnectGroup :is(input, textarea)::placeholder {
          color: #7f888b;
        }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.rivotMediaFieldIcon, .rivotMediaCharacterCount, .rivotMediaPrivacy) {
          color: #9ba3a6;
        }
        .rivotMediaFormPanel .rivotConnectSubmit { grid-column: 1 / -1; background: #ff6b35; }

        .rivotMediaVisualImage { animation: rivotMediaImageIn 1.15s cubic-bezier(.22,1,.36,1) both; }
        .rivotMediaVisualContent > *,
        .rivotMediaAssets > p,
        .rivotMediaAssets > h3,
        .rivotMediaAssetCard,
        .rivotMediaFormPanel > .rivotMediaFormKicker,
        .rivotMediaFormPanel > h1,
        .rivotMediaFormIntro,
        .rivotMediaFormPanel .rivotConnectFormContainer,
        .rivotMediaFormPanel .rivotConnectBack {
          opacity: 0;
          animation: rivotMediaReveal .68s cubic-bezier(.22,1,.36,1) forwards;
        }
        .rivotMediaVisualContent > :nth-child(1) { animation-delay: .12s; }
        .rivotMediaVisualContent > :nth-child(2) { animation-delay: .22s; }
        .rivotMediaVisualContent > :nth-child(3) { animation-delay: .34s; }
        .rivotMediaVisualContent > :nth-child(4) { animation-delay: .46s; }
        .rivotMediaAssets > p { animation-delay: .42s; }
        .rivotMediaAssets > h3 { animation-delay: .5s; }
        .rivotMediaAssetCard:nth-child(1) { animation-delay: .58s; }
        .rivotMediaAssetCard:nth-child(2) { animation-delay: .66s; }
        .rivotMediaAssetCard:nth-child(3) { animation-delay: .74s; }
        .rivotMediaAssetCard:nth-child(4) { animation-delay: .82s; }
        .rivotMediaFormPanel .rivotConnectBack { animation-delay: .2s; }
        .rivotMediaFormPanel > .rivotMediaFormKicker { animation-delay: .18s; }
        .rivotMediaFormPanel > h1 { animation-delay: .28s; }
        .rivotMediaFormIntro { animation-delay: .4s; }
        .rivotMediaFormPanel .rivotConnectFormContainer { animation-delay: .52s; }
        .rivotMediaFormPanel .rivotConnectGroup { animation: rivotMediaFieldIn .5s cubic-bezier(.22,1,.36,1) both; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(1) { animation-delay: .62s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(2) { animation-delay: .68s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(3) { animation-delay: .74s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(4) { animation-delay: .8s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(5) { animation-delay: .86s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(6) { animation-delay: .92s; }
        .rivotMediaFormPanel .rivotConnectGroup:nth-child(7) { animation-delay: .98s; }
        .rivotMediaFormPanel .rivotConnectSubmit { animation: rivotMediaFieldIn .5s cubic-bezier(.22,1,.36,1) 1.04s both; }

        @keyframes rivotMediaImageIn {
          from { opacity: .35; transform: scale(1.08); filter: saturate(.7); }
          to { opacity: 1; transform: scale(1); filter: saturate(1); }
        }
        @keyframes rivotMediaReveal {
          from { opacity: 0; transform: translateY(22px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes rivotMediaFieldIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotMediaInquiry,
          .rivotMediaInquiry *,
          .rivotMediaInquiry *::before,
          .rivotMediaInquiry *::after {
            opacity: 1 !important;
            filter: none !important;
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 1040px) {
          .rivotMediaInquiry { grid-template-columns: 1fr; grid-template-rows: auto; }
          .rivotMediaVisual { min-height: 520px; }
          .rivotMediaVisual::before { display: none; }
          .rivotMediaAssets,
          .rivotMediaFormPanel { grid-column: 1; grid-row: auto; }
          .rivotMediaFormPanel { padding: 44px clamp(28px, 6vw, 64px); }
          .rivotMediaFormPanel .rivotConnectFormContainer { max-width: 760px; }
        }

        @media (max-width: 620px) {
          .rivotConnect.isShowcaseForm { padding-top: 104px; overflow: visible; }
          .rivotMediaInquiry { width: 100%; border-radius: 0; }
          .rivotMediaVisual { min-height: 500px; padding: 34px 20px; }
          .rivotMediaVisualImage { object-position: 63% center; }
          .rivotMediaVisualContent { width: 100%; max-width: 330px; }
          .rivotMediaVisual h2 { font-size: clamp(36px, 11vw, 46px); }
          .rivotMediaVisualContent > p:not(.rivotMediaEyebrow) { max-width: 315px; font-size: 11px; }
          .rivotMediaResources span { padding-inline: 5px; font-size: 8px; }
          .rivotMediaAssets { padding: 24px 16px 28px; }
          .rivotMediaAssets h3 { font-size: 25px; }
          .rivotMediaAssetGrid { grid-template-columns: 1fr; }
          .rivotMediaFormPanel { padding: 66px 16px 30px; }
          .rivotMediaFormPanel h1 { font-size: clamp(34px, 11vw, 44px); }
          .rivotMediaFormIntro { font-size: 12px; }
          .rivotMediaFormPanel .rivotConnectFormContainer { width: 100%; padding: 15px; }
          .rivotMediaFormPanel form { grid-template-columns: 1fr; }
          .rivotMediaFormPanel .rivotConnectGroup { min-width: 0; }
          .rivotMediaFormPanel .rivotConnectGroup :is(input, select, textarea) { min-width: 0; }
          .rivotMediaFormPanel .rivotConnectGroup:last-of-type,
          .rivotMediaFormPanel .rivotConnectSubmit { grid-column: auto; }
          .rivotMediaFormPanel .rivotConnectBack { top: 16px; right: 16px; }
        }

        @media (max-width: 390px) {
          .rivotMediaVisual { min-height: 470px; }
          .rivotMediaVisual h2 { font-size: 35px; }
          .rivotMediaResources { grid-template-columns: 1fr; }
          .rivotMediaResources span { min-height: 30px; border-left: 0; border-top: 1px solid rgba(255, 255, 255, .28); }
          .rivotMediaFormPanel h1 { font-size: 34px; }
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
  const [messageLength, setMessageLength] = useState(0);
  const isShowcaseForm = id === "media" || id === "vendor" || id === "investor" || id === "overseas" || id === "careers";
  const showcasePlaceholders: Record<string, string> = {
    name: "Your full name",
    outlet: "Publication or media outlet",
    company: id === "investor" ? "Company or fund name" : "Your company name",
    contact: "Full name",
    cv: "Upload your CV",
    email: id === "media" ? "you@publication.com" : "you@company.com",
    phone: "+91 98765 43210",
    message: id === "vendor" ? "Tell us about your company, products, capabilities, and partnership goals..." : id === "investor" ? "Tell us about your investment interest, focus, and any questions for our team..." : id === "overseas" ? "Tell us about your business, market reach, and distribution capabilities..." : id === "careers" ? "Tell us why you would like to join RIVOT and what you can bring to the team..." : "Tell us about your inquiry, interview request, or any specific information you need...",
  };
  const formFields = config.fields.map((field) => (
    <div className="rivotConnectGroup" data-field={field.name} key={field.name}>
      <label htmlFor={field.name}>
        {field.label.replace(" *", "")}
        {field.required ? <span className="rivotRequiredMark" aria-hidden="true">*</span> : null}
      </label>
      {isShowcaseForm ? <span className="rivotMediaFieldIcon" aria-hidden="true"><MediaFieldIcon name={field.name} /></span> : null}
      {field.type === "select" ? (
        <select id={field.name} name={field.name} required={field.required} defaultValue="">
          <option value="" disabled>Select {field.label.replace(" *", "")}</option>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : field.type === "textarea" ? (
        <>
          <textarea
            id={field.name}
            name={field.name}
            required={field.required}
            placeholder={isShowcaseForm ? showcasePlaceholders[field.name] : undefined}
            maxLength={isShowcaseForm && field.name === "message" ? 1000 : undefined}
            onChange={isShowcaseForm && field.name === "message" ? (event) => setMessageLength(event.currentTarget.value.length) : undefined}
          />
          {isShowcaseForm && field.name === "message" ? <small className="rivotMediaCharacterCount">{messageLength}/1000</small> : null}
        </>
      ) : (
        <input id={field.name} name={field.name} type={field.type} required={field.required} placeholder={isShowcaseForm ? showcasePlaceholders[field.name] : undefined} accept={field.type === "file" ? ".pdf,.doc,.docx" : undefined} />
      )}
    </div>
  ));

  const formFeedback = (
    <>
      {success ? <div className="rivotConnectSuccess">{config.successMessage}</div> : null}
      {error ? <div className="rivotConnectSuccess" style={{ color: "#a33", borderColor: "#d99" }}>Unable to send your request. Please try again.</div> : null}
    </>
  );

  if (id === "media" || id === "vendor" || id === "investor" || id === "overseas" || id === "careers") {
    const isVendor = id === "vendor";
    const isInvestor = id === "investor";
    const isOverseas = id === "overseas";
    const isCareers = id === "careers";
    const heroItems = isVendor
      ? ["Trusted Supply Network", "Long-Term Growth", "Shared Innovation"]
      : isInvestor
        ? ["High-Growth Market", "Technology Leadership", "Sustainable Returns"]
      : isOverseas
        ? ["Regional Exclusivity", "Market Support", "Global Mobility"]
      : isCareers
        ? ["Purposeful Work", "Engineering Culture", "Career Growth"]
      : ["Press Releases", "High-Resolution Assets", "Expert Interviews"];
    const resourceCards = isVendor
      ? [
          ["Quality Partnership", "Trusted standards and dependable collaboration."],
          ["Growing Ecosystem", "New opportunities in electric mobility."],
          ["Product Development", "Collaborate on components and technology."],
          ["Sustainable Impact", "Responsible manufacturing and supply."],
        ]
      : isInvestor
        ? [
            ["Market Opportunity", "Participate in the accelerating electric mobility market."],
            ["Product Innovation", "Back differentiated technology and engineering."],
            ["Experienced Team", "Partner with a focused electric mobility team."],
            ["Sustainable Growth", "Support scalable, responsible transportation."],
          ]
      : isOverseas
        ? [
            ["Exclusive Territories", "Build RIVOT's presence in your regional market."],
            ["Launch Support", "Access product, training, and marketing assistance."],
            ["Competitive Partnership", "Grow with attractive international terms."],
            ["Future-Ready Products", "Bring innovative electric mobility to new customers."],
          ]
      : isCareers
        ? [
            ["Meaningful Impact", "Help shape cleaner, smarter everyday mobility."],
            ["Innovative Work", "Solve ambitious engineering and design challenges."],
            ["Grow Together", "Learn alongside a driven multidisciplinary team."],
            ["People First", "Build your career in an inclusive, hands-on culture."],
          ]
      : [
          ["Press Releases", "Latest news and company updates."],
          ["Media Kit", "Images, videos and brand assets."],
          ["Executive Interviews", "Expert interviews and commentary."],
          ["Product Resources", "Specifications and demonstration opportunities."],
        ];
    return (
      <div className="rivotMediaInquiry">
        <section className="rivotMediaVisual">
          <Image className="rivotMediaVisualImage" src={isVendor ? vendorInquiryBackground : isInvestor || isOverseas ? investorInquiryBackground : isCareers ? careerInquiryBackground : mediaInquiryBackground} alt={isVendor ? "RIVOT vendor manufacturing partnership" : isInvestor ? "RIVOT electric mobility investment opportunity" : isOverseas ? "RIVOT international electric mobility partnership" : isCareers ? "RIVOT team taking a break during a forest ride" : "RIVOT electric scooter rider at golden hour"} fill priority sizes="(max-width: 1040px) 100vw, 52vw" />
          <div className="rivotMediaVisualContent">
            <p className="rivotMediaEyebrow">{isVendor ? "Vendor partnership" : isInvestor ? "Investment opportunity" : isOverseas ? "Overseas partnership" : isCareers ? "Careers at RIVOT" : "Media inquiry"}</p>
            <h2>{isVendor ? <>Build the future, <span>together.</span></> : isInvestor ? <>Invest in a <span>cleaner future.</span></> : isOverseas ? <>Take mobility <span>beyond borders.</span></> : isCareers ? <>Build what <span>moves next.</span></> : <>Stories that drive a <span>cleaner tomorrow.</span></>}</h2>
            <p>{isVendor ? "Partner with RIVOT as a trusted supplier and help build the next generation of electric mobility." : isInvestor ? "Join RIVOT in shaping the next generation of electric mobility through technology, scale, and sustainable growth." : isOverseas ? "Bring RIVOT electric mobility to customers worldwide as a trusted international distribution partner." : isCareers ? "Join the dreamers, engineers, makers, and doers reimagining everyday mobility." : "For press releases, interviews, product information and media resources, connect with our media relations team."}</p>
            <div className="rivotMediaResources" aria-label={isVendor ? "Vendor partnership advantages" : isInvestor ? "Investment highlights" : isOverseas ? "International partnership highlights" : isCareers ? "Career highlights" : "Available media resources"}>
              {heroItems.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="rivotMediaAssets">
          <p>{isVendor ? "Partner advantages" : isInvestor ? "Investor highlights" : isOverseas ? "Global advantages" : isCareers ? "Life at RIVOT" : "Media resources"}</p>
          <h3>{isVendor ? <>Partnerships built to <span>grow</span></> : isInvestor ? <>Opportunity built to <span>scale</span></> : isOverseas ? <>Reach built to <span>expand</span></> : isCareers ? <>Work that helps you <span>grow</span></> : <>Assets to <span>tell our story</span></>}</h3>
          <div className="rivotMediaAssetGrid">
            {resourceCards.map(([title, copy], index) => (
              <div className="rivotMediaAssetCard" key={title}><i>{index + 1}</i><span><b>{title}</b><small>{copy}</small></span><em>→</em></div>
            ))}
          </div>
        </section>

        <section className="rivotMediaFormPanel">
          <button type="button" className="rivotConnectBack" onClick={onBack}>Back</button>
          <p className="rivotMediaFormKicker">{isVendor ? "Partner with purpose" : isInvestor ? "Invest in progress" : isOverseas ? "Expand with purpose" : isCareers ? "Join the journey" : "Get in touch"}</p>
          <h1>{isVendor ? <>Vendor <span>Partnership</span></> : isInvestor ? <>Investment <span>Opportunity</span></> : isOverseas ? <>Overseas <span>Partnership</span></> : isCareers ? <>Career <span>Opportunities</span></> : <>Media <span>Inquiry</span></>}</h1>
          <p className="rivotMediaFormIntro">{config.description}</p>
          <div className="rivotConnectFormContainer">
            {formFeedback}
            <form onSubmit={onSubmit}>
              {formFields}
              <button type="submit" className="rivotConnectSubmit" disabled={submitting}>{submitting ? "Sending..." : config.submitLabel}{!submitting ? <span aria-hidden="true">→</span> : null}</button>
            </form>
            <p className="rivotMediaPrivacy"><span aria-hidden="true">🔒</span>{isVendor ? "Your information will be shared only with our vendor partnerships team." : isInvestor ? "Your information will be shared only with our investment relations team." : isOverseas ? "Your information will be shared only with our international partnerships team." : isCareers ? "Your information will be shared only with our recruitment team." : "Your information will be shared only with our media relations team."}</p>
          </div>
        </section>
      </div>
    );
  }

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
          {formFeedback}

          <form onSubmit={onSubmit}>
            {formFields}

            <button type="submit" className="rivotConnectSubmit" disabled={submitting}>
              {submitting ? "Sending..." : config.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MediaFieldIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "name" || name === "contact") return <svg {...props}><circle cx="12" cy="8" r="3" /><path d="M6.5 19c.5-3.4 2.4-5.2 5.5-5.2s5 1.8 5.5 5.2" /></svg>;
  if (name === "outlet" || name === "company") return <svg {...props}><path d="M6 21V4h12v17M9 8h2m2 0h2M9 12h2m2 0h2M9 16h2m2 0h2M4 21h16" /></svg>;
  if (name === "email") return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === "phone") return <svg {...props}><path d="M7.2 3.8 10 7.6 8.3 10c1.2 2.5 3.2 4.5 5.7 5.7l2.4-1.7 3.8 2.8-.7 3c-.2.8-.9 1.3-1.7 1.2C10.2 20.1 3.9 13.8 3 6.2c-.1-.8.4-1.5 1.2-1.7l3-.7Z" /></svg>;
  if (name === "type" || name === "category" || name === "business") return <svg {...props}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r=".8" fill="currentColor" stroke="none" /><circle cx="4.5" cy="12" r=".8" fill="currentColor" stroke="none" /><circle cx="4.5" cy="18" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (name === "range") return <svg {...props}><path d="M4 19h16M6 16l4-4 3 2 5-7" /><path d="M14 7h4v4" /></svg>;
  if (name === "country") return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></svg>;
  if (name === "experience") return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  if (name === "position") return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></svg>;
  if (name === "cv") return <svg {...props}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M12 17V10m-3 3 3-3 3 3" /></svg>;
  if (name === "deadline") return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></svg>;
  return <svg {...props}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6m-6 4h6" /></svg>;
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
