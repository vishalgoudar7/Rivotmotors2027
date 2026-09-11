"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import heroSpotlightImageOne from "@/asset/newphotos/1.optimized.webp";
import heroSpotlightImageTwo from "@/asset/newphotos/2.optimized.webp";
import heroSpotlightImageThree from "@/asset/newphotos/3.optimized.webp";
import diagnosticsAppImage from "@/asset/images/App/Diagnostics (2).png";
import flashChargingAppImage from "@/asset/images/App/Flash Charging.png";
import geofencingAppImage from "@/asset/images/App/Geofencing.png";
import tpmsAppImage from "@/asset/images/App/TPMS (Tire Pressure Monitoring System).png";
import tripInsightsAppImage from "@/asset/images/App/Trip Insights.png";
import accelerationImage from "@/asset/newimg/performance/accelaration.jpeg";
import recoEngineImage from "@/asset/newimg/performance/recoengine.jpeg";
import chargerImage from "@/asset/images/last/Charger.optimized.webp";
import boostModeImage from "@/asset/newimg/Engineering/boost-mode.png";
import cruiseImage from "@/asset/newimg/Engineering/cuise.jpeg";
import discImage from "@/asset/newimg/Engineering/disccc.jpeg";
import allTestsClearedImage from "@/asset/newimg/Engineering/All test cleared.optimized.jpg";
import monoshockImage from "@/asset/newimg/Engineering/mono shock.jpeg";
import motorImage from "@/asset/images/last/Motor-card.jpg";
import riderAssistanceImage from "@/asset/newimg/Key feuture/Smart ride.jpeg";
import featureImage from "@/asset/newimg/Key feuture/Built-In Innovation.jpeg";
import safetyImage from "@/asset/newimg/Key feuture/Advanced Safety.jpeg";
import ergonomicSeatImage from "@/asset/newimg/Design/erogonomy seat .png";
import floorboardDetailImage from "@/asset/newimg/Design/Footfloor.jpeg";
import bootSpaceImage from "@/asset/newimg/Design/bootspace.jpeg";
import { bookingColors } from "@/data/bookingColors";

const DashboardRotation = dynamic(() => import("@/components/DashboardRotation").then((module) => module.DashboardRotation));
const Faqs = dynamic(() => import("@/components/Faqs").then((module) => module.Faqs));
const SafetyTech = dynamic(() => import("@/components/SafetyTech").then((module) => module.SafetyTech));
const SavingsCalculator = dynamic(() => import("@/components/SavingsCalculator").then((module) => module.SavingsCalculator));
const ScooterRotation = dynamic(() => import("@/components/ScooterRotation").then((module) => module.ScooterRotation));

const keyFeatures = [
  {
    number: "01",
    title: "Smart Riding",
    image: riderAssistanceImage,
    alt: "RIVOT rider assistance control close-up",
    pills: ["Boost Mode", "Ride cam", "comfortKey", "cruiseControl"],
  },
  {
    number: "02",
    title: "Built In Innovation",
    image: featureImage,
    alt: "RIVOT NX100 front feature close-up",
    pills: ["recoEngine", "APU", "Compact Boot", "Integrated OBC"],
  },
  {
    number: "03",
    title: "Advanced Safety",
    image: safetyImage,
    alt: "RIVOT safety switch close-up",
    pills: ["alerTire", "Roll Protector", "Anti Theft", "Voice Alert"],
  },
];

const engineeringFeatures = [
  {
    title: "Boost Mode",
    copy: "Feel the surge of peak power.",
    status: "GO",
    statusTone: "multi",
    icon: "bolt",
    image: boostModeImage,
  },
  {
    title: "Motor",
    copy: "Experience the unfiltered expression of power.",
    status: null,
    statusTone: null,
    icon: "hex",
    image: motorImage,
  },
  {
    title: "Cruise Control",
    copy: "Steady speed. Zero strain.",
    status: "ACTIVE",
    statusTone: "green",
    icon: "gauge",
    image: cruiseImage,
  },
  {
    title: "Dual Disk",
    copy: "Where precision can make or brake.",
    status: null,
    statusTone: null,
    icon: "ring",
    image: discImage,
  },
  {
    title: "All Tests Cleared",
    copy: "Cleared through standard RIVOT testing.",
    status: "SAFETY",
    statusTone: "blue",
    icon: "shield",
    image: allTestsClearedImage,
  },
  {
    title: "MonoShock",
    copy: "Passed for the sudden surprises along the journey.",
    status: null,
    statusTone: null,
    icon: "shock",
    image: monoshockImage,
  },
];

const rideInsightFeatures = [
  ["Trip Insights", "Track every trip in detail.", "route", tripInsightsAppImage],
  ["Geofencing", "Set boundaries for every ride.", "home", geofencingAppImage],
  ["Diagnostics", "Monitor your scooter health.", "eco", diagnosticsAppImage],
  ["Flash Charging", "Spend less time waiting to charge.", "compare", flashChargingAppImage],
  ["TPMS (Tire Pressure Monitoring System)", "Stay informed about tire pressure.", "history", tpmsAppImage],
] as const;

const productNavigationItems = [
  { id: "key-features", label: "Key Features" },
  { id: "design", label: "Design" },
  { id: "design-details", label: "Details" },
  { id: "performance", label: "Performance" },
  { id: "connectivity", label: "Connectivity" },
  { id: "ride-insights", label: "Ride Insights" },
  { id: "engineering", label: "Engineering" },
] as const;

const heroSpotlightImages = [
  heroSpotlightImageOne,
  heroSpotlightImageTwo,
  heroSpotlightImageThree,
] as const;

function EngineeringIcon({ type }: { type: string }) {
  if (type === "bolt") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M20 4L9 20H17L15 32L28 14H20L20 4Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "gauge") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M8 23C8 16.37 13.37 11 20 11C26.63 11 32 16.37 32 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 22L26 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 14L7 11M29 14L32 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "ring") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="4" />
        <circle cx="18" cy="18" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M18 5L29 9V17C29 24.4 24.38 29.45 18 32C11.62 29.45 7 24.4 7 17V9L18 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M13 18L16.5 21.5L24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "shock") {
    return (
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M24 5L12 31" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 9L25 12L16 16L23 19L14 23L21 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" fill="none">
      <path d="M18 4L30 11V25L18 32L6 25V11L18 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="5" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const keyFeaturesSectionRef = useRef<HTMLElement>(null);
  const designSectionRef = useRef<HTMLElement>(null);
  const designDetailsSectionRef = useRef<HTMLElement>(null);
  const performanceSectionRef = useRef<HTMLElement>(null);
  const rideInsightsSectionRef = useRef<HTMLElement>(null);
  const engineeringSectionRef = useRef<HTMLElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const detailCardsRef = useRef<HTMLDivElement>(null);
  const performanceCardsRef = useRef<HTMLDivElement>(null);
  const engineeringCardsRef = useRef<HTMLDivElement>(null);
  const bestFitSectionRef = useRef<HTMLElement>(null);
  const reachSectionRef = useRef<HTMLElement>(null);
  const [selectedDesignColor, setSelectedDesignColor] = useState<(typeof bookingColors)[number]>(bookingColors[0]);
  const [selectedRideInsight, setSelectedRideInsight] = useState(0);
  const [selectedHeroImage, setSelectedHeroImage] = useState(0);
  const [previousHeroImage, setPreviousHeroImage] = useState<number | null>(null);
  const [heroSlideDirection, setHeroSlideDirection] = useState<"next" | "previous">("next");
  const [keyFeaturesTextVisible, setKeyFeaturesTextVisible] = useState(false);
  const [designTextVisible, setDesignTextVisible] = useState(false);
  const [designDetailsTextVisible, setDesignDetailsTextVisible] = useState(false);
  const [performanceTextVisible, setPerformanceTextVisible] = useState(false);
  const [rideInsightsTextVisible, setRideInsightsTextVisible] = useState(false);
  const [engineeringTextVisible, setEngineeringTextVisible] = useState(false);
  const [bestFitVisible, setBestFitVisible] = useState(false);
  const selectedHeroImageRef = useRef(0);
  const [activeProductSection, setActiveProductSection] = useState("key-features");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [reachVisible, setReachVisible] = useState(false);

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      const currentImage = selectedHeroImageRef.current;
      const nextImage = (currentImage + 1) % heroSpotlightImages.length;
      setHeroSlideDirection("next");
      setPreviousHeroImage(currentImage);
      selectedHeroImageRef.current = nextImage;
      setSelectedHeroImage(nextImage);
    }, 8000);

    return () => window.clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const section = keyFeaturesSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setKeyFeaturesTextVisible(entry.isIntersecting);
    }, { threshold: .18 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = designDetailsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setDesignDetailsTextVisible(entry.isIntersecting);
    }, { threshold: .2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = designSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setDesignTextVisible(entry.isIntersecting);
    }, { threshold: .25 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = performanceSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setPerformanceTextVisible(entry.isIntersecting);
    }, { threshold: .2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = engineeringSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEngineeringTextVisible(entry.isIntersecting);
    }, { threshold: .18 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = rideInsightsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRideInsightsTextVisible(entry.isIntersecting),
      { threshold: .18, rootMargin: "-8% 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = bestFitSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setBestFitVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = reachSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setReachVisible(entry.isIntersecting),
      { threshold: .2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const carousel = featureCardsRef.current;
    const smallScreen = window.matchMedia("(max-width: 560px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!carousel || reducedMotion.matches) return;

    const slideTimer = window.setInterval(() => {
      if (!smallScreen.matches || document.hidden) return;

      const firstCard = carousel.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const cardStep = firstCard.getBoundingClientRect().width + 14;
      const reachedLastCard = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;

      carousel.scrollTo({
        left: reachedLastCard ? 0 : carousel.scrollLeft + cardStep,
        behavior: "smooth",
      });
    }, 3200);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const carousel = detailCardsRef.current;
    const smallScreen = window.matchMedia("(max-width: 560px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!carousel || reducedMotion.matches) return;

    const slideTimer = window.setInterval(() => {
      const bounds = carousel.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (!smallScreen.matches || !isVisible || document.hidden) return;

      const reachedLastSlide = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
      carousel.scrollTo({
        left: reachedLastSlide ? 0 : carousel.scrollLeft + carousel.clientWidth + 14,
        behavior: "smooth",
      });
    }, 3600);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const carousel = performanceCardsRef.current;
    const smallScreen = window.matchMedia("(max-width: 560px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!carousel || reducedMotion.matches) return;

    const slideTimer = window.setInterval(() => {
      const bounds = carousel.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (!smallScreen.matches || !isVisible || document.hidden) return;

      const reachedLastSlide = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
      carousel.scrollTo({
        left: reachedLastSlide ? 0 : carousel.scrollLeft + carousel.clientWidth + 14,
        behavior: "smooth",
      });
    }, 3600);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const carousel = engineeringCardsRef.current;
    const smallScreen = window.matchMedia("(max-width: 560px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!carousel || reducedMotion.matches) return;

    const slideTimer = window.setInterval(() => {
      const bounds = carousel.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (!smallScreen.matches || !isVisible || document.hidden) return;

      const reachedLastGroup = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
      carousel.scrollTo({
        left: reachedLastGroup ? 0 : carousel.scrollLeft + carousel.clientWidth + 12,
        behavior: "smooth",
      });
    }, 3600);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const sections = productNavigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const syncActiveHash = () => {
      const hashSection = window.location.hash.slice(1);

      if (productNavigationItems.some((item) => item.id === hashSection)) {
        setActiveProductSection(hashSection);
        return true;
      }

      return false;
    };

    syncActiveHash();
    window.addEventListener("hashchange", syncActiveHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (activeEntry) {
          setActiveProductSection(activeEntry.target.id);
        }
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveHash);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className={`rivotHero ${heroSlideDirection === "previous" ? "isReverse" : "isForward"}`}>
        {heroSpotlightImages.map((heroImage, index) => (
          <Image
            src={heroImage}
            alt={index === 0 ? "RIVOT NX100 scooter under a dramatic spotlight" : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`rivotHeroImage${index === selectedHeroImage ? " isActive" : ""}${index === previousHeroImage ? " isPrevious" : ""}`}
            key={heroImage.src}
          />
        ))}
        <div className="rivotHeroShade" aria-hidden="true" />

        <div className="rivotHeroContent">
          <p className="rivotEyebrow">Meet the future</p>
          <h1 className="rivotHeroTitle">
            <span className="rivotHeroModelName"><em>nx 100</em></span>
            <span className="rivotHeroMarks" aria-hidden="true">
              <span />
              <span />
            </span>
          </h1>
          <h2>Long rides to heavy loads</h2>
          <p className="rivotHeroCopy">
  Power for the Long Road, Space for the Long List
</p>

<div className="rivotHeroSpecs">

  {/* RANGE */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M8 36L17 18L25 29L33 13L40 23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 40H40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M33 13H40V20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <b>200 km</b>
    <small>Range</small>
  </div>

  {/* TOP SPEED */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M9 30C9 20.06 17.06 12 27 12C36.94 12 39 20.06 39 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M27 27L35 20"
          stroke="#ef7430"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="27"
          cy="27"
          r="3"
          fill="#ef7430"
        />
        <path
          d="M13 32H10M41 32H38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>

    <b>100 km/h</b>
    <small>Top Speed</small>
  </div>

  {/* FLASH CHARGE */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M27 5L11 27H23L20 43L37 19H25L27 5Z"
          stroke="#ef7430"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".55"
          strokeDasharray="4 4"
        />
      </svg>
    </span>

    <b>35 min</b>
    <small>200km Charge</small>
  </div>

  {/* BATTERY */}
  <div>
    <span className="rivotSpecIcon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect
          x="10"
          y="8"
          width="27"
          height="32"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M19 5H29"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="16"
          y="14"
          width="15"
          height="20"
          rx="2"
          fill="#ef7430"
          opacity=".9"
        />
        <path
          d="M20 18V30M24 18V30M28 18V30"
          stroke="#fff"
          strokeWidth="1.5"
          opacity=".9"
        />
      </svg>
    </span>

    <b>4.4 kWh</b>
    <small>Battery</small>
  </div>

</div>

          <div className="rivotHeroButtons">
            <Link href="/book-now" className="rivotPriceBook">
              Book Now
            </Link>
            <Link href="/test-ride" className="rivotTestRide">
              Test Ride
            </Link>
          </div>

          <div className="rivotHeroNotes">
            <strong>Starting at just ₹1,29,000*</strong>
            <span className="rivotHeroSubLine">
              EMI starting at Rs 3,999/month* <i aria-hidden="true">|</i> Easy Financing Options
            </span>
          </div>

          <div className="rivotHeroPointers" aria-label="Hero slide navigation">
            {heroSpotlightImages.map((heroImage, index) => (
              <button
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === selectedHeroImage}
                onClick={() => {
                  if (index === selectedHeroImage) return;
                  setHeroSlideDirection(index < selectedHeroImage ? "previous" : "next");
                  setPreviousHeroImage(selectedHeroImage);
                  selectedHeroImageRef.current = index;
                  setSelectedHeroImage(index);
                }}
                className={index === selectedHeroImage ? "isActive" : ""}
                key={`hero-pointer-${heroImage.src}`}
              />
            ))}
          </div>
        </div>
      </section>

      <nav className="rivotProductNav" aria-label="NX100 product navigation">
        <div className="rivotProductNavShell">
          <div className="rivotProductNavLinks">
            {productNavigationItems.map((item) => (
              <a
                href={`#${item.id}`}
                className={activeProductSection === item.id ? "isActive" : ""}
                key={item.id}
                onClick={() => setActiveProductSection(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="rivotProductNavActions">
            <a href="/test-ride" className="rivotProductNavBrochure">
              Test Ride
            </a>
            <a href="/book-now" className="rivotProductNavWatch">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      <section
        ref={keyFeaturesSectionRef}
        className={`rivotKeyFeatures${keyFeaturesTextVisible ? " isTextVisible" : ""}`}
        id="key-features"
        aria-labelledby="key-features-title"
      >
        <div className="rivotKeyFeaturesShell">
          <div className="rivotKeyFeaturesCopy">
            <p className="rivotKeyEyebrow">
              <span aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 3.5L18.35 6.15L21.88 5.78L22.74 9.22L25.93 10.76L24.77 14.11L26.5 17.2L23.62 19.27L23.33 22.8L19.88 23.61L17.6 26.33L14.4 24.82L11.12 26.33L8.84 23.61L5.39 22.8L5.1 19.27L2.22 17.2L3.95 14.11L2.79 10.76L5.98 9.22L6.84 5.78L10.37 6.15L16 3.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="3.8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              Key Features.
            </p>
            <h2 id="key-features-title">Stay Ahead with Tech</h2>
            <span className="rivotKeyAccent" aria-hidden="true" />
            <p>The features that set RIVOT apart.</p>
            <Link className="rivotKeyArrow" href="#design" aria-label="Explore the design section">
              <span aria-hidden="true">{"\u2192"}</span>
            </Link>
          </div>

          <div className="rivotKeyCards" ref={featureCardsRef} aria-label="Key feature carousel">
            {keyFeatures.map((feature) => (
              <article className="rivotKeyCard" key={feature.number}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 28vw"
                  className="rivotKeyCardImage"
                />
                <div className="rivotKeyCardShade" aria-hidden="true" />
                <div className="rivotKeyCardContent">
                  <div className="rivotKeyCardHeading">
                    <h3>{feature.title}</h3>
                  </div>
                  <div className="rivotKeyCardPills">
                    {feature.pills.map((pill) => (
                      <small key={pill}>{pill}</small>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`rivotDesign${designTextVisible ? " is-text-visible" : ""}`}
        id="design"
        aria-labelledby="design-title"
        ref={designSectionRef}
      >
        <div className="rivotDesignCopy">
          <h2 id="design-title">Designed <span>Different.</span></h2>
          <p>A form built with purpose.</p>
        </div>

        <div className="rivotDesignScooter">
          <ScooterRotation className="rivotDesignImage" />
        </div>

        <div className="rivotDesignControls" aria-label="Scooter color options">
          <div className="rivotColorPicker" aria-label="Color option">
            <p aria-live="polite">{selectedDesignColor.name}</p>
            <div>
              {bookingColors.map((color) => (
                <button
                  type="button"
                  className={selectedDesignColor.value === color.value ? "active" : ""}
                  aria-label={color.name}
                  aria-pressed={selectedDesignColor.value === color.value}
                  onClick={() => setSelectedDesignColor(color)}
                  style={{ backgroundColor: color.value }}
                  key={color.value}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={`rivotDesignDetails${designDetailsTextVisible ? " is-text-visible" : ""}`}
        id="design-details"
        aria-labelledby="design-details-title"
        ref={designDetailsSectionRef}
      >
        <div className="rivotDesignDetailsShell">
          <div className="rivotDesignDetailsCopy">
            <p className="rivotDetailsEyebrow">
              Design <span aria-hidden="true" />
            </p>
            <h2 id="design-details-title">
              Details that
              <br />
              <span>Elevate.</span>
            </h2>
            <p className="rivotDetailsIntro">
              Every element is crafted to enhance your experience.
            </p>

            <div className="rivotDetailsList">
              <div>
                <span aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M9 26H25L31 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 26V31H30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 23L25 21" stroke="#ef7430" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h3>Ergonomic Seat</h3>
                  <p>Comfort that goes the distance.</p>
                </div>
              </div>
              <div>
                <span aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M9 19C9 12 14 8 20 8C26 8 31 12 31 19V25C31 28.31 28.31 31 25 31H15C11.69 31 9 28.31 9 25V19Z" stroke="currentColor" strokeWidth="2.4" />
                    <path d="M14 21H17M23 21H26M15 27H25" stroke="#ef7430" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h3>Boot Space</h3>
                  <p>Space for everything you need.</p>
                </div>
              </div>
              <div>
                <span aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M10 9H30L27 31H13L10 9Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M15 14H25M14 20H26M15 26H25" stroke="#ef7430" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h3>Spacious Floorboard</h3>
                  <p>Move freely. Ride confidently.</p>
                </div>
              </div>
            </div>

            <button className="rivotDetailsCta" type="button">
              Explore Design <span aria-hidden="true">{"\u2192"}</span>
            </button>
          </div>

          <div className="rivotDetailsMedia" ref={detailCardsRef} aria-label="Design detail carousel">
            <div className="rivotDetailsHeroPlaceholder">
              <Image
                src={floorboardDetailImage}
                alt="RIVOT scooter with a spacious floorboard"
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                className="rivotDetailsPhoto"
              />
              <div className="rivotDetailsLanguage">
                <i aria-hidden="true" />
                <div>
                  <b>RIVOT Design Language</b>
                  <small>Purposeful. Functional. Futuristic.</small>
                </div>
              </div>
              <div className="rivotDetailsSlider" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="rivotDetailsCaption">Spacious floorboard</span>
            </div>
            <div className="rivotDetailsSideStack">
              <div className="rivotDetailsSmallPlaceholder">
                <Image
                  src={ergonomicSeatImage}
                  alt="RIVOT scooter ergonomic riding position"
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className="rivotDetailsPhoto"
                />
                <div className="rivotDetailsMiniCaption">
                  <i aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none">
                      <path d="M8 14H24L22 23H10L8 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M11 14C11 10.7 13 8 16 8C19 8 21 10.7 21 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </i>
                  <div>
                    <b>Ergonomic seat</b>
                    <small>Comfort that goes the distance.</small>
                  </div>
                </div>
              </div>
              <div className="rivotDetailsSmallPlaceholder">
                <Image
                  src={bootSpaceImage}
                  alt="RIVOT scooter boot space"
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className="rivotDetailsPhoto"
                />
                <div className="rivotDetailsMiniCaption">
                  <i aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none">
                      <path d="M10 9H22L20 24H12L10 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M13 13H19M13.5 17H18.5M14 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </i>
                  <div>
                    <b>Boot Space</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`rivotPerformance${performanceTextVisible ? " is-text-visible" : ""}`}
        id="performance"
        aria-labelledby="performance-title"
        ref={performanceSectionRef}
      >
        <div className="rivotPerformanceShell">
          <div className="rivotPerformanceCopy">
            <p className="rivotPerformanceEyebrow">Performance</p>
            <h2 id="performance-title">
              Performance
              <br />
              that <span>redefines</span>
              <br />
              every ride.
            </h2>
            <p>
              Instant power. Impressive range.
              <br />
              Built for the real world.
            </p>
            <span className="rivotPerformanceAccent" aria-hidden="true" />
          </div>

          <div className="rivotPerformanceCards" ref={performanceCardsRef} aria-label="Performance carousel">
            <article className="rivotPerformanceCard">
              <div className="rivotPerformancePlaceholder">
                <Image
                  src={accelerationImage}
                  alt="RIVOT scooter ready for acceleration"
                  fill
                  sizes="(max-width: 900px) 100vw, 28vw"
                  className="rivotPerformancePhoto"
                />
              </div>
              <div className="rivotPerformanceCardShade" aria-hidden="true" />
              <div className="rivotPerformanceCardContent">
                <p>Acceleration</p>
                <h3>
                  0-40 km/h
                  <br />
                  <span>in 2.55s</span>
                </h3>
                <p>Instant torque. Explosive start.</p>
              </div>
            </article>

            <article className="rivotPerformanceCard">
              <div className="rivotPerformancePlaceholder">
                <Image
                  src={recoEngineImage}
                  alt="RIVOT scooter recoEngine drivetrain"
                  fill
                  sizes="(max-width: 900px) 100vw, 28vw"
                  className="rivotPerformancePhoto"
                />
              </div>
              <div className="rivotPerformanceCardShade" aria-hidden="true" />
              <div className="rivotPerformanceCardContent">
                <p>recoEngine</p>
                <h3>
                  Smart Power
                  <br />
                  <span>Built to Adapt</span>
                </h3>
                <p>Intelligent control. Seamless performance.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <DashboardRotation />

      <section
        ref={rideInsightsSectionRef}
        className={`rivotAppConnect${rideInsightsTextVisible ? " is-text-visible" : ""}`}
        id="ride-insights"
        aria-labelledby="app-connect-title"
      >
        <div className="rivotAppConnectShell">
          <article className="rivotAppConnectCopy">
            <p className="rivotAppEyebrow">Ride Insights</p>
            <h2 id="app-connect-title">
              Understand
              <br />
              <span>every journey.</span>
            </h2>
            <p className="rivotAppLead">
              Track your rides, performance
              <br />
              and eco score over time.
            </p>

            <div className="rivotRideInsightList" aria-label="Ride insight features">
              {rideInsightFeatures.map(([title, copy, icon], index) => (
                <button
                  className={index === selectedRideInsight ? "active" : ""}
                  key={title}
                  type="button"
                  aria-pressed={index === selectedRideInsight}
                  onClick={() => setSelectedRideInsight(index)}
                >
                  <i aria-hidden="true" data-icon={icon}>
                    <svg viewBox="0 0 32 32" fill="none">
                      {icon === "route" ? (
                        <>
                          <path d="M8 23C8 17 13 17 13 12C13 8 8 8 8 12C8 17 13 17 13 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                          <path d="M19 9H24V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18 15L24 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </>
                      ) : null}
                      {icon === "home" ? (
                        <>
                          <path d="M7 15L16 8L25 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 14V24H22V14" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                        </>
                      ) : null}
                      {icon === "eco" ? (
                        <>
                          <path d="M8 18C8 11 14 8 24 8C24 18 21 24 14 24C10.7 24 8 21.3 8 18Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                          <path d="M13 19C16 17 18 15 20 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </>
                      ) : null}
                      {icon === "compare" ? (
                        <>
                          <path d="M8 11H18M14 7L18 11L14 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M24 21H14M18 17L14 21L18 25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      ) : null}
                      {icon === "history" ? (
                        <>
                          <path d="M9 10V16H15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16C24 20.42 20.42 24 16 24C13.4 24 11.1 22.76 9.64 20.84" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </>
                      ) : null}
                    </svg>
                  </i>
                  <span>
                    <b>{title}</b>
                    <small>{copy}</small>
                  </span>
                </button>
              ))}
            </div>
          </article>

          <article className="rivotRidePhoneCard" aria-label="Ride Insights app screen">
            <Image
              src={rideInsightFeatures[selectedRideInsight][3]}
              alt={`${rideInsightFeatures[selectedRideInsight][0]} RIVOT scooter visual`}
              width={360}
              height={760}
              className="rivotRideInsightPhoto"
            />
          </article>
        </div>
      </section>

      <section
        className={`rivotEngineering${engineeringTextVisible ? " is-text-visible" : ""}`}
        id="engineering"
        aria-labelledby="engineering-title"
        ref={engineeringSectionRef}
      >
        <div className="rivotEngineeringHeader">
          <p>Beyond the surface.</p>
          <h2 id="engineering-title">
            Engineering
            <br />
            <span>That Moves You.</span>
          </h2>
          <small>Advanced technology built around the way you ride.</small>
          <i aria-hidden="true" />
        </div>

        <div className="rivotEngineeringGrid" ref={engineeringCardsRef} aria-label="Engineering feature carousel">
          {engineeringFeatures.map((feature, index) => (
            <article className="rivotEngineeringCard" key={feature.title}>
              {"image" in feature && feature.image ? (
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 30vw"
                  className="rivotEngineeringCardBg"
                />
              ) : null}
              <span className="rivotEngineeringIcon" data-tone={feature.statusTone ?? "orange"}>
                <EngineeringIcon type={feature.icon} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              {feature.status === "GO" ? (
                <div className="rivotEngineeringModes" aria-label="Mode indicators">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
              {feature.status && feature.status !== "GO" ? (
                <b className={`rivotEngineeringStatus ${feature.statusTone ?? ""}`}>
                  {feature.status} <span aria-hidden="true" />
                </b>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <SafetyTech />

      <SavingsCalculator />

      <section
        ref={reachSectionRef}
        className={`rivotReach rivotReachAnimated${reachVisible ? " isVisible" : ""}`}
        aria-label="RIVOT access network"
      >
        <div className="rivotReachPanel">
          <article className="rivotReachCard rivotReachStore">
            <div className="rivotReachCopy">
              <span className="rivotReachIcon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path d="M9 17L12 8H28L31 17" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M11 17V32H29V17" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M16 32V23H24V32" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M7 17H33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <p>RIVOT Stores</p>
              <h2>
                Always
                <br />
                within reach.
              </h2>
              <small>Find your nearest RIVOT store and experience the NX100.</small>
              <Link href="/book-now" className="rivotReachArrow" aria-label="Find a RIVOT store">
                <b>Find a Store</b>
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src="/images/last/Showroom.avif" alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
            </div>
          </article>

          <article className="rivotReachCard rivotReachCharge">
            <div className="rivotReachCopy">
              <span className="rivotReachIcon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path d="M13 6H25C27.21 6 29 7.79 29 10V34H13V6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M17 12H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M29 14H32C33.1 14 34 14.9 34 16V25C34 26.66 32.66 28 31 28H29" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M20 19L17 25H22L19 31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p>RIVOT Charging Network</p>
              <h2>
                Power,
                <br />
                everywhere.
              </h2>
              <small>India&apos;s most reliable EV charging network for every RIVOT ride.</small>
              <Link href="/products" className="rivotReachArrow" aria-label="Explore RIVOT charging network">
                <b>Find a Charger</b>
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src={chargerImage} alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
            </div>
          </article>

        </div>
      </section>

      <section
        ref={bestFitSectionRef}
        className={`rivotBestFit rivotBestFitAnimated${bestFitVisible ? " isVisible" : ""}`}
        aria-labelledby="best-fit-title"
      >
        <div className="rivotBestFitShell">
          <div className="rivotBestFitHeader">
            <h2 id="best-fit-title">A best fit for your Scooter</h2>
            <p>There's more under the hood.</p>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard rivotBestFitAccessories">
              <Image
                src="/images/shop/accessories.optimized.webp"
                alt="RIVOT scooter accessories"
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 33vw"
                className="rivotBestFitCardImage"
              />
              <h3>Accessories</h3>
              <p>There's more under the hood.</p>

              <Link href="/merchandise" className="rivotBestFitCta">
                Shop accessories <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </article>

            <article className="rivotBestFitCard">
              <Image
                src="/images/shop/battery.optimized.webp"
                alt="Battery and motor extended warranty"
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 33vw"
                className="rivotBestFitCardImage"
              />
              <p className="rivotBestFitEyebrow rivotBestFitGreen">Extended Warranty</p>
              <h3>Battery + Motor</h3>
              <p>Engineered for a longer, smarter ride.</p>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>

            <article className="rivotBestFitCard rivotBestFitSubscription">
              <Image
                src="/images/shop/smart-care.optimized.webp"
                alt="Smart Care extended scooter coverage"
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 33vw"
                className="rivotBestFitCardImage"
              />
              <p className="rivotBestFitEyebrow rivotBestFitBlue">Subscription</p>
              <h3>Smart Care</h3>
              <p>Extended Warranty &amp; Care for your Simple Scooters.</p>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Faqs />

      {showBackToTop ? (
        <button className="rivotBackToTop" type="button" onClick={scrollToTop} aria-label="Back to top">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 18V7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M6.5 12.5L12 7L17.5 12.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      ) : null}

      <style>{`

      .rivotHeroTitle {
        display: flex;
        align-items: center;
        gap: clamp(18px, 2.4vw, 34px);
        margin: 14px 0 8px;
        color: #fff;
        font-size: clamp(52px, 8.1vw, 132px);
        font-weight: 800;
        line-height: .86;
        letter-spacing: -.055em;
        text-transform: none;
      }

      .rivotHeroTitle .rivotHeroModelName {
        display: inline-block;
        text-transform: lowercase;
      }

      .rivotHeroTitle .rivotHeroModelName em {
        font-style: italic;
      }

      .rivotHeroMarks {
        display: inline-flex;
        align-items: center;
        gap: clamp(7px, .7vw, 11px);
        flex: 0 0 auto;
        transform: skewX(-15deg);
      }

      .rivotHeroMarks span {
        display: block;
        width: clamp(24px, 2.7vw, 45px);
        height: clamp(54px, 6.1vw, 98px);
      }

      .rivotHeroMarks span:first-child {
        background: #ef7430;
      }

      .rivotHeroMarks span:last-child {
        background: rgba(255, 255, 255, .34);
      }

      .rivotHero h2 {
        margin: 0;
        color: #fff;
        font-size: clamp(20px, 1.85vw, 30px);
        font-weight: 400;
        line-height: 1.12;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .rivotBackToTop {
        position: fixed;
        right: clamp(16px, 3vw, 30px);
        bottom: clamp(16px, 3.4vh, 28px);
        z-index: 80;
        display: grid;
        place-items: center;
        width: 27px;
        height: 27px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background:
          radial-gradient(circle at 28% 24%, #ff9f5f 0%, #ff7f31 38%, #ef6725 100%);
        color: #fff;
        box-shadow:
          0 14px 28px rgba(239, 116, 48, .34),
          inset 0 1px 0 rgba(255, 255, 255, .4);
        cursor: pointer;
        transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
      }

      .rivotBackToTop span {
        display: grid;
        place-items: center;
        width: 11px;
        height: 11px;
        line-height: 0;
      }

      .rivotBackToTop svg {
        width: 11px;
        height: 11px;
      }

      .rivotBackToTop:hover,
      .rivotBackToTop:focus-visible {
        filter: brightness(1.04);
        box-shadow:
          0 18px 34px rgba(239, 116, 48, .42),
          inset 0 1px 0 rgba(255, 255, 255, .46);
        transform: translateY(-2px);
        outline: none;
      }

      html[data-rivot-theme="light"] .rivotBackToTop {
        color: #fff;
      }

      html[data-rivot-theme="dark"] .rivotBackToTop {
        background:
          radial-gradient(circle at 28% 24%, #ffa165 0%, #ff8033 38%, #ef6725 100%);
        color: #fff;
      }

      @media (max-width: 560px) {
        .rivotBackToTop {
          right: 12px;
          bottom: 12px;
          width: 23px;
          height: 23px;
        }

        .rivotBackToTop span,
        .rivotBackToTop svg {
          width: 9px;
          height: 9px;
        }
      }
        .rivotHero {
          position: relative;
          display: grid;
          height: 100vh;
          min-height: 700px;
          margin-top: 0;
          overflow: hidden;
          background: #06080d;
          color: #fff;
        }

        .rivotHeroImage {
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transform: scale(1.02);
          transition: opacity .9s ease, transform 5s ease;
        }

        .rivotHeroImage.isActive {
          opacity: 1;
          transform: scale(1);
        }

        .rivotHeroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(2, 4, 8, .58) 0%, rgba(2, 4, 8, .05) 42%, rgba(2, 4, 8, .72) 100%),
            linear-gradient(90deg, rgba(2, 4, 8, .2) 0%, rgba(2, 4, 8, 0) 48%, rgba(2, 4, 8, .26) 100%);
        }

        html[data-rivot-theme="light"] .rivotHeroShade {
          background:
            linear-gradient(180deg, rgba(2, 4, 8, .46) 0%, rgba(2, 4, 8, .02) 42%, rgba(2, 4, 8, .68) 100%),
            linear-gradient(90deg, rgba(2, 4, 8, .18) 0%, rgba(2, 4, 8, 0) 48%, rgba(2, 4, 8, .24) 100%);
        }

        html[data-rivot-theme="light"] .rivotHero,
        html[data-rivot-theme="light"] .rivotHeroTitle,
        html[data-rivot-theme="light"] .rivotHero h1,
        html[data-rivot-theme="light"] .rivotHero h2 {
          color: #111;
        }

        html[data-rivot-theme="light"] .rivotHeroCopy {
          color: rgba(17,17,17,.75);
        }

        html[data-rivot-theme="light"] .rivotHeroMarks span:last-child {
          background: rgba(17,17,17,.58);
        }

        html[data-rivot-theme="light"] .rivotSpecIcon {
          background: rgba(255,255,255,.62);
          color: #111;
          border-color: rgba(0,0,0,.1);
          box-shadow: 0 8px 22px rgba(0,0,0,.08);
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs div {
          border-left-color: rgba(0,0,0,.16);
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs b {
          color: #111;
        }

        html[data-rivot-theme="light"] .rivotHeroSpecs small,
        html[data-rivot-theme="light"] .rivotHeroNotes {
          color: rgba(17,17,17,.72);
        }

        html[data-rivot-theme="light"] .rivotTestRide {
          color: #c45a21;
          border-color: rgba(239, 116, 48, .5);
          background: rgba(255, 255, 255, .9);
        }

        .rivotHeroPointers {
          position: absolute;
          right: clamp(54px, 7vw, 132px);
          bottom: clamp(46px, 7vh, 76px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: auto;
        }

        .rivotHeroPointers button {
          display: block;
          width: clamp(48px, 4.2vw, 76px);
          height: 7px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 255, 255, .34);
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .32);
          transition: background .35s ease, width .35s ease, opacity .35s ease;
        }

        .rivotHeroPointers button.isActive {
          width: clamp(58px, 5vw, 88px);
          background: rgba(255, 255, 255, .94);
        }

        html[data-rivot-theme="light"] .rivotHeroPointers button {
          background: rgba(255, 255, 255, .42);
        }

        html[data-rivot-theme="light"] .rivotHeroPointers button.isActive {
          background: #fff;
        }

        .rivotHeroContent {
          position: absolute;
          left: 50%;
          bottom: clamp(44px, 7vh, 70px);
          z-index: 2;
          display: flex;
          width: min(92vw, 430px);
          flex-direction: column;
          align-items: center;
          margin: 0;
          text-align: center;
          text-shadow: 0 4px 24px rgba(0, 0, 0, .55);
          transform: translateX(-50%);
        }

        .rivotEyebrow,
        .rivotHeroTitle,
        .rivotHero h2,
        .rivotHeroCopy,
        .rivotHeroSpecs {
          display: none;
        }

        .rivotEyebrow {
          margin: 0;
          color: #ef7430;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .rivotHero h1 {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2.4vw, 34px);
          margin: 14px 0 8px;
          color: #fff;
          font-size: clamp(52px, 8.1vw, 132px);
          font-weight: 800;
          line-height: .86;
          letter-spacing: -.055em;
          text-transform: uppercase;
        }

        .rivotHero h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 2vw, 34px);
          line-height: 1.12;
          letter-spacing: -.03em;
        }

        .rivotHeroCopy {
          max-width: 440px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, .76);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.45;
        }

        .rivotHeroSpecs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(680px, 100%);
          max-width: 680px;
          margin-top: clamp(42px, 9vh, 92px);
          margin-left: -36px;
          margin-bottom: 28px;
        }

        .rivotHeroSpecs div {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 0;
          padding: 0 20px;
          text-align: center;
          border-left: 1px solid rgba(255, 255, 255, .14);
        }

        .rivotHeroSpecs div:first-child {
          padding-left: 20px;
          border-left: 0;
        }

        .rivotSpecIcon {
  display: grid;
  width: 64px;
  height: 64px;
          margin: 0 auto 12px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    0 8px 25px rgba(0, 0, 0, 0.18);
}

.rivotSpecIcon svg {
  width: 32px;
  height: 32px;
  display: block;
}

        .rivotHeroSpecs b,
        .rivotHeroSpecs small {
          display: block;
        }

        .rivotHeroSpecs b {
          color: #fff;
          font-size: 18px;
          line-height: 1.1;
        }

        .rivotHeroSpecs small {
          margin-top: 6px;
          color: rgba(255, 255, 255, .7);
          font-size: 14px;
        }

        .rivotHeroButtons {
          display: flex;
          align-items: center;
          justify-content: center;
          order: 2;
          gap: 14px;
          width: 100%;
          margin-top: 18px;
        }

        .rivotTestRide,
        .rivotPriceBook {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 154px;
          min-height: 46px;
          padding: 0 26px;
          border: 1px solid rgba(255, 255, 255, .55);
          border-radius: 999px;
          font-size: 15px;
          font-weight: 800;
          box-shadow: 0 12px 28px rgba(0, 0, 0, .16);
          text-decoration: none;
          backdrop-filter: blur(10px);
        }

        .rivotTestRide {
          background: rgba(255, 255, 255, .06);
          color: #fff;
        }

        .rivotPriceBook {
          background: #fff;
          border-color: #fff;
          color: #050505;
          box-shadow: 0 14px 30px rgba(0, 0, 0, .18);
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
        }

        .rivotPriceBook:hover,
        .rivotPriceBook:focus-visible {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
          box-shadow: 0 14px 28px rgba(239, 116, 48, .32);
          outline: none;
          transform: translateY(-3px);
        }

        .rivotTestRide:hover,
        .rivotTestRide:focus-visible {
          border-color: #fff;
          background: rgba(255, 255, 255, .16);
          color: #fff;
          outline: none;
          transform: translateY(-2px);
        }

        .rivotPriceBook svg,
        .rivotTestRide svg {
          width: 17px;
          height: 17px;
          transition: transform .2s ease;
        }

        .rivotPriceBook:hover svg,
        .rivotPriceBook:focus-visible svg,
        .rivotTestRide:hover svg,
        .rivotTestRide:focus-visible svg { transform: translateX(3px); }

        .rivotHeroNotes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          order: 1;
          row-gap: 8px;
          column-gap: 12px;
          margin-top: 0;
          color: rgba(255, 255, 255, .82);
          font-size: 11px;
          font-weight: 700;
          line-height: 1.2;
        }

        .rivotHeroNotes strong {
          flex: 0 0 100%;
          color: currentColor;
          font-size: 23px;
          font-weight: 900;
          line-height: 1.2;
        }

        .rivotProductNav {
          position: sticky;
          top: 0;
          z-index: 20;
          border-block: 1px solid rgba(17, 17, 17, .1);
          background: rgba(255, 255, 255, .94);
          backdrop-filter: blur(16px);
        }

        .rivotProductNavShell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          width: min(100%, 1240px);
          min-height: 88px;
          margin: 0 auto;
          padding: 16px clamp(28px, 5vw, 64px);
        }

        .rivotProductNavLinks,
        .rivotProductNavActions {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .rivotProductNavLinks {
          flex: 1 1 auto;
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
        }

        .rivotProductNavLinks::-webkit-scrollbar {
          display: none;
        }

        .rivotProductNavLinks a {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          color: #151515;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.2;
          text-decoration: none;
          transition: color .2s ease;
        }

        .rivotProductNavLinks a:hover,
        .rivotProductNavLinks a:focus-visible,
        .rivotProductNavLinks a.isActive {
          color: #ef7430;
          outline: none;
        }

        .rivotProductNavLinks a.isActive {
          text-decoration: underline;
          text-decoration-color: #ef7430;
          text-decoration-thickness: 2px;
          text-underline-offset: 8px;
        }

        .rivotProductNavActions {
          flex: 0 0 auto;
          margin-left: auto;
          gap: 14px;
        }

        .rivotProductNavWatch,
        .rivotProductNavBrochure {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 20px;
          border: 1px solid #151515;
          border-radius: 999px;
          color: #151515;
          font-size: 14px;
          font-weight: 800;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
        }

        .rivotProductNavWatch {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
        }

        .rivotProductNavWatch:hover,
        .rivotProductNavWatch:focus-visible {
          border-color: #ef7430;
          background: #ef7430;
          outline: none;
          transform: translateY(-1px);
        }

        .rivotProductNavBrochure {
          background: transparent;
          border-color: #ef7430;
          color: #ef7430;
        }

        .rivotProductNavBrochure:hover,
        .rivotProductNavBrochure:focus-visible {
          border-color: #ef7430;
          background: rgba(239, 116, 48, .1);
          color: #c85a22;
          outline: none;
        }

        .rivotProductNav svg {
          width: 15px;
          height: 15px;
        }

        :root {
          --section-open-offset: 98px;
          --section-open-gap: clamp(82px, 7vw, 112px);
          --section-close-gap: clamp(48px, 5vw, 72px);
        }

        .rivotKeyFeatures,
        .rivotDesign,
        .rivotDesignDetails,
        .rivotPerformance,
        .rivotDashboard,
        .rivotAppConnect,
        .rivotEngineering {
          scroll-margin-top: var(--section-open-offset);
        }

        html[data-rivot-theme="dark"] .rivotProductNav {
          border-color: rgba(255, 255, 255, .14);
          background: rgba(8, 9, 9, .94);
        }

        html[data-rivot-theme="dark"] .rivotProductNavLinks a,
        html[data-rivot-theme="dark"] .rivotProductNavBrochure {
          border-color: rgba(255, 255, 255, .44);
          color: #f5f5f2;
        }

        html[data-rivot-theme="dark"] .rivotProductNavLinks a.isActive {
          color: #ef7430;
        }

        html[data-rivot-theme="dark"] .rivotProductNavBrochure:hover,
        html[data-rivot-theme="dark"] .rivotProductNavBrochure:focus-visible {
          border-color: #ef7430;
          color: #ef7430;
        }

        .rivotKeyFeatures {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: clamp(54px, 7vh, 74px) clamp(18px, 4vw, 46px);
          background:
            linear-gradient(180deg, #fff 0%, #fbfaf7 48%, #f7f7f5 100%);
          color: #111;
          overflow: hidden;
        }

        html[data-rivot-theme="light"] .rivotKeyFeatures {
          background:
            linear-gradient(180deg, #fff 0%, #fbfaf7 48%, #f7f7f5 100%);
        }

        .rivotKeyFeaturesShell {
          display: grid;
          grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
          gap: clamp(26px, 4vw, 54px);
          width: min(100%, 1180px);
          max-height: none;
          margin: 0 auto;
          padding: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          align-items: center;
        }

        html[data-rivot-theme="dark"] .rivotKeyFeaturesShell {
          background: transparent;
        }

        .rivotKeyFeaturesCopy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 0;
        }

        .rivotKeyEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 20px;
          color: #ff5b20;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .rivotKeyEyebrow span {
          display: inline-grid;
          width: 30px;
          height: 30px;
          place-items: center;
          flex: 0 0 auto;
          letter-spacing: 0;
        }

        .rivotKeyEyebrow svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .rivotKeyFeaturesCopy h2 {
          margin: 0;
          color: #111;
          font-size: clamp(28px, 2.8vw, 46px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .rivotKeyAccent {
          display: block;
          width: 48px;
          height: 3px;
          margin: 16px 0;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
          max-width: 255px;
          margin: 0 0 28px;
          color: #515151;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
        }

        .rivotKeyArrow {
          display: inline-grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border: 2px solid #ff6b28;
          border-radius: 50%;
          background: transparent;
          color: #ff6b28;
          cursor: pointer;
          text-decoration: none;
          transition: transform .2s ease, background .2s ease, color .2s ease;
        }

        .rivotKeyArrow span {
          font-size: 28px;
          line-height: 1;
        }

        .rivotKeyArrow:hover {
          background: #ff6b28;
          color: #fff;
          transform: translateX(4px);
        }

        .rivotKeyFeaturesCopy .rivotKeyEyebrow,
        .rivotKeyFeaturesCopy h2,
        .rivotKeyFeaturesCopy .rivotKeyAccent,
        .rivotKeyFeaturesCopy > p:not(.rivotKeyEyebrow),
        .rivotKeyCardHeading h3,
        .rivotKeyCardPills small {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .9s ease, transform .9s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotKeyFeatures.isTextVisible .rivotKeyFeaturesCopy .rivotKeyEyebrow,
        .rivotKeyFeatures.isTextVisible .rivotKeyFeaturesCopy h2,
        .rivotKeyFeatures.isTextVisible .rivotKeyFeaturesCopy .rivotKeyAccent,
        .rivotKeyFeatures.isTextVisible .rivotKeyFeaturesCopy > p:not(.rivotKeyEyebrow),
        .rivotKeyFeatures.isTextVisible .rivotKeyCardHeading h3,
        .rivotKeyFeatures.isTextVisible .rivotKeyCardPills small {
          opacity: 1;
          transform: translateY(0);
        }

        .rivotKeyFeaturesCopy h2 { transition-delay: .12s; }
        .rivotKeyFeaturesCopy .rivotKeyAccent { transition-delay: .24s; }
        .rivotKeyFeaturesCopy > p:not(.rivotKeyEyebrow) { transition-delay: .34s; }
        .rivotKeyCard:nth-child(1) .rivotKeyCardHeading h3 { transition-delay: .24s; }
        .rivotKeyCard:nth-child(2) .rivotKeyCardHeading h3 { transition-delay: .38s; }
        .rivotKeyCard:nth-child(3) .rivotKeyCardHeading h3 { transition-delay: .52s; }
        .rivotKeyCard:nth-child(1) .rivotKeyCardPills small { transition-delay: .48s; }
        .rivotKeyCard:nth-child(2) .rivotKeyCardPills small { transition-delay: .62s; }
        .rivotKeyCard:nth-child(3) .rivotKeyCardPills small { transition-delay: .76s; }

        @media (prefers-reduced-motion: reduce) {
          .rivotKeyFeaturesCopy .rivotKeyEyebrow,
          .rivotKeyFeaturesCopy h2,
          .rivotKeyFeaturesCopy .rivotKeyAccent,
          .rivotKeyFeaturesCopy > p:not(.rivotKeyEyebrow),
          .rivotKeyCardHeading h3,
          .rivotKeyCardPills small {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .rivotKeyCards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          min-width: 0;
          align-items: stretch;
        }

        .rivotKeyCard {
          position: relative;
          min-height: clamp(500px, 67vh, 600px);
          overflow: hidden;
          border-radius: 18px;
          isolation: isolate;
          transform: skewX(-10deg);
          transform-origin: center;
          background: #0b0d10;
          box-shadow: 0 18px 42px rgba(17, 17, 17, .12);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .rivotKeyCard:hover {
          transform: skewX(-10deg) translateY(-5px);
          box-shadow: 0 26px 54px rgba(17, 17, 17, .18);
        }

        .rivotKeyCardImage {
          object-fit: cover;
          object-position: center center;
          transform: skewX(10deg) scale(1.18);
          transition: transform .3s ease;
        }

        .rivotKeyCard:nth-child(1) .rivotKeyCardImage {
          object-position: 46% center;
          transform: skewX(10deg) scale(1.34);
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardImage {
          object-position: 52% center;
          transform: skewX(10deg) scale(1.33);
        }

        .rivotKeyCard:nth-child(3) .rivotKeyCardImage {
          object-position: 58% center;
          transform: skewX(10deg) scale(1.36);
        }

        .rivotKeyCard:hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.23);
        }

        .rivotKeyCard:nth-child(1):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.39);
        }

        .rivotKeyCard:nth-child(2):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.38);
        }

        .rivotKeyCard:nth-child(3):hover .rivotKeyCardImage {
          transform: skewX(10deg) scale(1.41);
        }

        .rivotKeyCardShade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.34) 34%, rgba(0,0,0,.12) 62%, rgba(0,0,0,.26) 100%);
        }

        .rivotKeyCardContent {
          position: absolute;
          top: 34px;
          left: 44px;
          right: 34px;
          bottom: 22px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          transform: skewX(10deg);
        }

        .rivotKeyCardHeading {
          min-width: 0;
        }

        .rivotKeyCardHeading > span {
          display: block;
          margin-bottom: 8px;
          color: #ff6b28;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        .rivotKeyCardHeading h3 {
          margin: 0 0 10px;
          color: #fff;
          font-size: clamp(16px, 1.25vw, 21px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.035em;
        }

        .rivotKeyCardPills {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, max-content));
          justify-content: start;
          justify-items: start;
          width: 100%;
          margin-left: clamp(-56px, -3vw, -28px);
          gap: 10px 12px;
        }

        .rivotKeyCardPills small {
          display: inline-flex;
          width: 100%;
          min-height: 28px;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(8px, .75vw, 12px);
          border-radius: 999px;
          background: rgba(105, 105, 105, .88);
          color: #fff;
          font-size: clamp(9px, .7vw, 11px);
          font-weight: 850;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .16);
          backdrop-filter: blur(8px);
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardPills {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          width: 100%;
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardPills small:last-child {
          grid-column: auto;
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardPills small {
          min-width: 0;
          width: 100%;
          padding-inline: 6px;
          font-size: clamp(9px, .62vw, 10px);
        }

        @media (max-width: 760px) {
          .rivotKeyCardPills {
            margin-left: 0;
          }
        }

        .rivotDesign {
          position: relative;
          display: grid;
          min-height: 100vh;
          grid-template-rows: auto 1fr;
          align-items: center;
          justify-items: center;
          overflow: hidden;
          padding: var(--section-open-gap) 5% var(--section-close-gap);
          background: linear-gradient(180deg, #fbfbfb 0%, #f7f8f8 62%, #eaf5fc 100%);
          color: #050505;
          text-align: center;
        }

        html[data-rivot-theme="dark"] .rivotDesign {
          background: linear-gradient(180deg, #fafafa 0%, #f7f8f8 62%, #eaf5fc 100%);
          color: #050505;
        }

        .rivotDesignCopy {
          position: relative;
          z-index: 2;
        }

        .rivotDesignCopy h2,
        .rivotDesignCopy p {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(5px);
          transition:
            opacity .8s cubic-bezier(.22, 1, .36, 1),
            transform .8s cubic-bezier(.22, 1, .36, 1),
            filter .8s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform, filter;
        }

        .rivotDesign.is-text-visible .rivotDesignCopy h2,
        .rivotDesign.is-text-visible .rivotDesignCopy p {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .rivotDesign.is-text-visible .rivotDesignCopy h2 {
          transition-delay: .08s;
        }

        .rivotDesign.is-text-visible .rivotDesignCopy p {
          transition-delay: .26s;
        }

        .rivotDesignCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(40px, 4vw, 46px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.055em;
        }

        .rivotDesignCopy p {
          margin: 16px 0 0;
          color: #050505;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotDesignCopy h2,
          .rivotDesignCopy p {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }

        .rivotDesignScooter {
          position: relative;
          z-index: 1;
          display: grid;
          width: min(100%, 940px);
          place-items: center;
          margin-top: clamp(14px, 2vh, 26px);
          margin-bottom: 0;
        }

        .rivotRotationStage {
          display: grid;
          width: 100%;
          place-items: center;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .rivotRotationStage:active {
          cursor: grabbing;
        }

        .rivotDesignScooter::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4%;
          width: min(58vw, 650px);
          height: 42px;
          border-radius: 50%;
          background: rgba(35, 45, 50, .13);
          filter: blur(16px);
          transform: translateX(-50%);
          z-index: -1;
        }

        .rivotDesignImage {
          display: block;
          width: min(68vw, 720px);
          height: auto;
          object-fit: contain;
        }

        .rivotDesignControls {
          position: absolute;
          right: clamp(28px, 5vw, 84px);
          bottom: clamp(34px, 5vh, 58px);
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .rivotColorPicker {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, .86);
          box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
          backdrop-filter: blur(16px);
        }

        .rivotColorPicker {
          position: relative;
          padding: 18px 18px 12px;
        }

        .rivotColorPicker p {
          position: absolute;
          left: 50%;
          top: -24px;
          margin: 0;
          color: #050505;
          font-size: 11px;
          font-weight: 700;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .rivotColorPicker div {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .rivotColorPicker button {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(17, 17, 17, .12);
          border-radius: 50%;
          box-shadow: inset 0 2px 5px rgba(255,255,255,.55), 0 4px 12px rgba(0,0,0,.2);
          cursor: pointer;
          transition: transform .2s ease, outline-color .2s ease, box-shadow .2s ease;
        }

        .rivotColorPicker button.active {
          outline: 3px solid rgba(239, 116, 48, .32);
          outline-offset: 3px;
          transform: scale(1.04);
        }

        .rivotColorPicker button:hover,
        .rivotColorPicker button:focus-visible {
          transform: translateY(-2px) scale(1.04);
        }

        .rivotEngineering {
          position: relative;
          display: grid;
          grid-template-columns: minmax(230px, .9fr) minmax(0, 2.1fr);
          min-height: 72vh;
          overflow: hidden;
          padding: var(--section-open-gap) clamp(24px, 4.8vw, 72px) var(--section-close-gap);
          background: #fbfbfb;
          color: #050505;
        }

        .rivotEngineeringHeader {
          position: relative;
          z-index: 2;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(18px, 2vw, 30px) clamp(18px, 3vw, 40px) clamp(18px, 2vw, 30px) 0;
          text-align: left;
        }

        .rivotEngineeringHeader > *,
        .rivotEngineeringCard > h3,
        .rivotEngineeringCard > p,
        .rivotEngineeringCard > .rivotEngineeringStatus {
          opacity: 0;
          transform: translateY(22px);
          filter: blur(5px);
          transition:
            opacity .76s cubic-bezier(.22, 1, .36, 1),
            transform .76s cubic-bezier(.22, 1, .36, 1),
            filter .76s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform, filter;
        }

        .rivotEngineering.is-text-visible .rivotEngineeringHeader > *,
        .rivotEngineering.is-text-visible .rivotEngineeringCard > h3,
        .rivotEngineering.is-text-visible .rivotEngineeringCard > p,
        .rivotEngineering.is-text-visible .rivotEngineeringCard > .rivotEngineeringStatus {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .rivotEngineering.is-text-visible .rivotEngineeringHeader > p { transition-delay: .04s; }
        .rivotEngineering.is-text-visible .rivotEngineeringHeader > h2 { transition-delay: .14s; }
        .rivotEngineering.is-text-visible .rivotEngineeringHeader > small { transition-delay: .26s; }
        .rivotEngineering.is-text-visible .rivotEngineeringHeader > i { transition-delay: .36s; }
        .rivotEngineeringCard:nth-child(1) { --engineering-text-delay: .16s; }
        .rivotEngineeringCard:nth-child(2) { --engineering-text-delay: .24s; }
        .rivotEngineeringCard:nth-child(3) { --engineering-text-delay: .32s; }
        .rivotEngineeringCard:nth-child(4) { --engineering-text-delay: .4s; }
        .rivotEngineeringCard:nth-child(5) { --engineering-text-delay: .48s; }
        .rivotEngineeringCard:nth-child(6) { --engineering-text-delay: .56s; }
        .rivotEngineering.is-text-visible .rivotEngineeringCard > h3 { transition-delay: var(--engineering-text-delay); }
        .rivotEngineering.is-text-visible .rivotEngineeringCard > p { transition-delay: calc(var(--engineering-text-delay) + .1s); }
        .rivotEngineering.is-text-visible .rivotEngineeringCard > .rivotEngineeringStatus { transition-delay: calc(var(--engineering-text-delay) + .2s); }

        .rivotEngineeringHeader p {
          margin: 0 0 14px;
          color: #c85a22;
          font-size: clamp(11px, .92vw, 14px);
          font-weight: 900;
          letter-spacing: .1em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .rivotEngineeringHeader h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(36px, 3.8vw, 46px);
          font-weight: 900;
          line-height: .96;
          letter-spacing: -.045em;
        }

        .rivotEngineeringHeader h2 span {
          color: #ef7430;
        }

        .rivotEngineeringHeader small {
          display: block;
          max-width: 255px;
          margin-top: 26px;
          color: #5c6267;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.28;
        }

        .rivotEngineeringHeader i {
          display: block;
          width: 58px;
          height: 3px;
          margin: 28px 0 0;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotEngineeringGrid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(220px, 1fr));
          gap: clamp(14px, 1.4vw, 22px);
          min-width: 0;
        }

        .rivotEngineeringCard {
          position: relative;
          display: grid;
          place-items: start center;
          align-content: start;
          min-height: 0;
          padding: clamp(28px, 3.2vw, 46px) clamp(18px, 2.4vw, 34px);
          border: 0;
          border-radius: 18px;
          background: #f4f4f4;
          text-align: center;
          overflow: hidden;
          transform: translateY(0) scale(1);
          transform-origin: center;
          transition:
            transform .38s cubic-bezier(.22, 1, .36, 1),
            box-shadow .38s ease,
            border-color .38s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .rivotEngineeringCard:hover {
            z-index: 3;
            transform: translateY(-8px) scale(1.018);
            box-shadow: 0 24px 48px rgba(10, 10, 10, .2);
          }

          .rivotEngineeringCard:nth-child(2):hover,
          .rivotEngineeringCard:nth-child(4):hover,
          .rivotEngineeringCard:nth-child(6):hover {
            border-color: #ff8a49;
            box-shadow:
              0 24px 48px rgba(10, 10, 10, .24),
              0 0 28px rgba(239, 116, 48, .3);
          }

          .rivotEngineeringCard:hover .rivotEngineeringCardBg {
            transform: scale(1.07);
          }

          .rivotEngineeringCard:hover .rivotEngineeringIcon {
            transform: translateY(-4px) scale(1.08);
          }
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg) {
          background: #080909;
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg) h3 {
          color: #fff;
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg) p {
          color: rgba(255, 255, 255, .72);
        }

        .rivotEngineeringCardBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 1;
          transform: scale(1);
          transition: transform .65s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg)::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(8, 9, 9, .68) 0%, rgba(8, 9, 9, .48) 38%, rgba(8, 9, 9, .08) 100%);
          pointer-events: none;
        }

        .rivotEngineeringCard:nth-child(n + 4):has(.rivotEngineeringCardBg)::before {
          background:
            linear-gradient(90deg, rgba(8, 9, 9, .72) 0%, rgba(8, 9, 9, .5) 48%, rgba(8, 9, 9, .08) 100%),
            linear-gradient(180deg, rgba(8, 9, 9, .12), rgba(8, 9, 9, .48));
        }

        .rivotEngineeringCard:nth-child(2) .rivotEngineeringCardBg {
          object-position: center bottom;
        }

        .rivotEngineeringCard:nth-child(4) .rivotEngineeringCardBg {
          object-position: right center;
        }

        .rivotEngineeringCard:nth-child(6) .rivotEngineeringCardBg {
          object-position: right center;
        }

        .rivotEngineeringCard:nth-child(2),
        .rivotEngineeringCard:nth-child(4),
        .rivotEngineeringCard:nth-child(6) {
          background: #080909;
          border: 2px solid #ef7430;
        }

        .rivotEngineeringCard:nth-child(1),
        .rivotEngineeringCard:nth-child(3),
        .rivotEngineeringCard:nth-child(5),
        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg),
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg),
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) {
          background: #f4f4f4;
        }

        .rivotEngineeringCard:nth-child(1) .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(3) .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(5) .rivotEngineeringCardBg {
          opacity: .72;
          filter: saturate(.86) brightness(1.06);
        }

        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg)::before {
          background: linear-gradient(180deg, rgba(255, 255, 255, .3), rgba(244, 244, 244, .54));
        }

        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg) h3,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg) h3,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) h3 {
          color: #121212;
        }

        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg) p,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg) p,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) p {
          color: #35383d;
        }

        .rivotEngineeringCard:nth-child(3) {
          background: #f4f4f4;
        }

        .rivotEngineeringCard:nth-child(5) {
          background: #f4f4f4;
        }

        /* Keep the existing engineering layout while making every photo readable. */
        .rivotEngineeringCard:has(.rivotEngineeringCardBg),
        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg),
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg),
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) {
          background: #090a0a;
        }

        .rivotEngineeringCard .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(1) .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(3) .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(5) .rivotEngineeringCardBg {
          opacity: 1;
          filter: saturate(1.04) contrast(1.04) brightness(.86);
        }

        .rivotEngineeringCard:nth-child(2) .rivotEngineeringCardBg,
        .rivotEngineeringCard:nth-child(6) .rivotEngineeringCardBg {
          filter: saturate(1.08) contrast(1.08) brightness(1.14);
        }

        .rivotEngineeringCard:nth-child(2),
        .rivotEngineeringCard:nth-child(4),
        .rivotEngineeringCard:nth-child(6) {
          border: 2px solid #ef7430;
        }

        .rivotEngineeringCard:nth-child(1),
        .rivotEngineeringCard:nth-child(3),
        .rivotEngineeringCard:nth-child(5) {
          border: 2px solid #ffd2b5;
          box-shadow: inset 0 0 0 1px rgba(255, 247, 239, .2);
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(n + 4):has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg)::before,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg)::before {
          background:
            linear-gradient(180deg, rgba(5, 6, 6, .58) 0%, rgba(5, 6, 6, .16) 52%, rgba(5, 6, 6, .48) 100%),
            linear-gradient(90deg, rgba(5, 6, 6, .2), transparent 72%);
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg) h3,
        .rivotEngineeringCard:has(.rivotEngineeringCardBg) p,
        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg) h3,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg) h3,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) h3 {
          color: #fff;
          text-shadow: 0 2px 14px rgba(0, 0, 0, .72);
        }

        .rivotEngineeringCard:nth-child(1):has(.rivotEngineeringCardBg) p,
        .rivotEngineeringCard:nth-child(3):has(.rivotEngineeringCardBg) p,
        .rivotEngineeringCard:nth-child(5):has(.rivotEngineeringCardBg) p {
          color: rgba(255, 255, 255, .84);
        }

        .rivotEngineeringIcon {
          position: relative;
          z-index: 2;
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          margin-bottom: 20px;
          border-radius: 13px;
          background: #ef7430;
          color: #fff;
          box-shadow: 0 12px 22px rgba(200, 90, 34, .22);
          transform: translateY(0) scale(1);
          transition: transform .38s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotEngineeringIcon[data-tone="green"] {
          background: rgba(31, 167, 102, .1);
          color: #1fa766;
          border-radius: 50%;
          box-shadow: none;
        }

        .rivotEngineeringCard:nth-child(n + 4) {
          grid-template-columns: 58px minmax(0, 1fr);
          grid-template-rows: auto auto 1fr;
          column-gap: 18px;
          place-items: start;
          align-content: start;
          padding-top: clamp(30px, 3.6vw, 50px);
          text-align: left;
        }

        .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringIcon {
          grid-column: 1;
          grid-row: 1 / span 2;
          margin: 0;
        }

        .rivotEngineeringCard:nth-child(n + 4) h3,
        .rivotEngineeringCard:nth-child(n + 4) p,
        .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringStatus {
          grid-column: 2;
        }

        .rivotEngineeringIcon svg {
          width: 28px;
          height: 28px;
        }

        .rivotEngineeringCard h3 {
          position: relative;
          z-index: 2;
          margin: 0;
          color: #121212;
          font-size: clamp(17px, 1.35vw, 22px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.02em;
        }

        .rivotEngineeringCard p {
          position: relative;
          z-index: 2;
          max-width: 190px;
          margin: 16px auto 0;
          color: #35383d;
          font-size: clamp(12px, .95vw, 15px);
          font-weight: 650;
          line-height: 1.45;
        }

        .rivotEngineeringCard:nth-child(n + 4) p {
          max-width: 170px;
          margin: 14px 0 0;
        }

        .rivotEngineeringModes {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .rivotEngineeringModes span {
          position: relative;
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border-radius: 7px;
          background: #2b9f68;
          transform: rotate(45deg);
        }

        .rivotEngineeringModes span::after {
          content: "";
          width: 9px;
          height: 9px;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transform: rotate(0deg) translate(-1px, -1px);
        }

        .rivotEngineeringModes span:nth-child(2) {
          background: #58a96f;
        }

        .rivotEngineeringModes span:nth-child(3) {
          background: #4a91c7;
        }

        .rivotEngineeringModes span:nth-child(4) {
          background: #5757b8;
        }

        .rivotEngineeringModes span:nth-child(5) {
          background: #ef7430;
        }

        .rivotEngineeringStatus {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          color: #1fa766;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .08em;
          line-height: 1;
          text-transform: uppercase;
        }

        .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringStatus {
          margin-top: 24px;
        }

        .rivotEngineeringStatus.blue {
          color: #2c8dff;
        }

        .rivotEngineeringStatus span {
          display: block;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: currentColor;
        }

        .rivotEngineeringStatus.blue span {
          width: 30px;
          height: 30px;
          box-shadow: 18px 0 0 #2c8dff;
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotEngineeringCard,
          .rivotEngineeringCard:hover {
            transform: none;
            transition: none;
          }

          .rivotEngineeringCardBg,
          .rivotEngineeringCard:hover .rivotEngineeringCardBg,
          .rivotEngineeringIcon,
          .rivotEngineeringCard:hover .rivotEngineeringIcon {
            transform: none;
            transition: none;
          }

          .rivotEngineeringHeader > *,
          .rivotEngineeringCard > h3,
          .rivotEngineeringCard > p,
          .rivotEngineeringCard > .rivotEngineeringStatus {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }

        /* Keep the complete Engineering panel inside the viewport when opened
           from the sticky product navigation on desktop. */
        @media (min-width: 1181px) and (min-height: 700px) {
          .rivotEngineering {
            height: calc(100svh - 88px);
            min-height: 0;
            padding: clamp(18px, 2.5vh, 26px) clamp(24px, 4.8vw, 72px);
            scroll-margin-top: 88px;
          }

          .rivotEngineeringHeader {
            padding-top: 0;
            padding-bottom: 0;
          }

          .rivotEngineeringGrid {
            min-height: 0;
            height: 100%;
            grid-template-rows: repeat(2, minmax(0, 1fr));
          }

          .rivotEngineeringCard,
          .rivotEngineeringCard:nth-child(n + 4) {
            min-height: 0;
            padding-top: clamp(18px, 2.4vh, 28px);
            padding-bottom: clamp(18px, 2.4vh, 28px);
          }
        }

        .rivotDesignDetails {
          min-height: 0;
          display: grid;
          place-items: center;
          padding: var(--section-open-gap) clamp(14px, 3vw, 34px) var(--section-close-gap);
          background: linear-gradient(180deg, #f7f7f5 0%, #fff 52%, #fbfaf7 100%);
          color: #0b0b0b;
        }

        .rivotDesignDetailsShell {
          display: grid;
          grid-template-columns: minmax(220px, .62fr) minmax(0, 1.58fr);
          gap: clamp(18px, 2.5vw, 34px);
          width: min(100%, 1320px);
          height: auto;
          min-height: 0;
          margin: 0 auto;
          padding: clamp(24px, 3vw, 38px) clamp(24px, 3.6vw, 48px);
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          overflow: hidden;
        }

        .rivotDesignDetailsCopy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .rivotDesignDetailsCopy > *,
        .rivotDetailsList > div {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity .72s cubic-bezier(.22, 1, .36, 1),
            transform .72s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform;
        }

        .rivotDesignDetails.is-text-visible .rivotDesignDetailsCopy > *,
        .rivotDesignDetails.is-text-visible .rivotDetailsList > div {
          opacity: 1;
          transform: translateY(0);
        }

        .rivotDesignDetails.is-text-visible .rivotDetailsEyebrow { transition-delay: .04s; }
        .rivotDesignDetails.is-text-visible .rivotDesignDetailsCopy h2 { transition-delay: .13s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsIntro { transition-delay: .22s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsList { transition-delay: .28s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsList > div:nth-child(1) { transition-delay: .32s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsList > div:nth-child(2) { transition-delay: .39s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsList > div:nth-child(3) { transition-delay: .46s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsCta { transition-delay: .62s; }

        .rivotDetailsEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 18px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .rivotDetailsEyebrow span {
          display: block;
          width: 42px;
          height: 2px;
          background: #ef7430;
        }

        .rivotDesignDetailsCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(30px, 3vw, 50px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: -.055em;
        }

        .rivotDesignDetailsCopy h2 span {
          color: #ef7430;
        }

        .rivotDetailsIntro {
          max-width: 255px;
          margin: 16px 0 24px;
          color: #42464d;
          font-size: clamp(15px, 1.15vw, 17px);
          font-weight: 500;
          line-height: 1.68;
        }

        .rivotDetailsList {
          display: grid;
          gap: 12px;
          width: 100%;
          max-width: 330px;
        }

        .rivotDetailsList > div {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 11px;
          align-items: center;
        }

        .rivotDetailsList span {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 116, 48, .08);
          color: #111;
          box-shadow: inset 0 0 0 1px rgba(20, 20, 20, .04);
        }

        .rivotDetailsList svg {
          width: 24px;
          height: 24px;
        }

        .rivotDetailsList h3 {
          margin: 0;
          color: #111;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -.025em;
        }

        .rivotDetailsList p {
          margin: 5px 0 0;
          color: #50545b;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.45;
        }

        .rivotDetailsCta {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 22px;
          border: 0;
          border-radius: 999px;
          background: #ef7430;
          color: #050505;
          padding: 0 22px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .02em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 16px 34px rgba(239, 116, 48, .24);
        }

        .rivotDetailsCta span {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          background: #050505;
          color: #fff;
          font-size: 20px;
          line-height: 1;
        }

        .rivotDetailsMedia {
          display: grid;
          grid-template-columns: minmax(0, 1.58fr) minmax(220px, .82fr);
          gap: 12px;
          min-width: 0;
          align-items: stretch;
          min-height: 0;
        }

        .rivotDetailsHeroPlaceholder,
        .rivotDetailsSmallPlaceholder {
          position: relative;
          overflow: hidden;
          border: 0;
          border-radius: 15px;
          isolation: isolate;
          background:
            radial-gradient(circle at 48% 42%, rgba(255, 255, 255, .05), transparent 34%),
            #060708;
          box-shadow:
            0 20px 44px rgba(0, 0, 0, .14),
            0 0 0 1px rgba(17, 17, 17, .04);
        }

        .rivotDetailsHeroPlaceholder {
          min-height: 0;
          height: clamp(360px, 38vw, 510px);
          border-radius: 15px;
        }

        .rivotDetailsSideStack {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          min-height: 0;
        }

        .rivotDetailsSmallPlaceholder {
          min-height: 0;
        }

        .rivotDetailsPhoto {
          border-radius: inherit;
          object-fit: cover;
          object-position: center;
          transform: scale(1.015);
        }

        .rivotDetailsHeroPlaceholder .rivotDetailsPhoto {
          object-position: 50% 52%;
        }

        .rivotDetailsSmallPlaceholder:first-child .rivotDetailsPhoto {
          object-position: 50% 58%;
        }

        .rivotDetailsSmallPlaceholder:last-child .rivotDetailsPhoto {
          object-position: 50% 64%;
        }

        .rivotDetailsHeroPlaceholder::after,
        .rivotDetailsSmallPlaceholder::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 50%;
          background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .72));
        }

        .rivotDetailsLanguage,
        .rivotDetailsCaption,
        .rivotDetailsMiniCaption {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(5px);
          transition:
            opacity .72s cubic-bezier(.22, 1, .36, 1),
            transform .72s cubic-bezier(.22, 1, .36, 1),
            filter .72s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform, filter;
        }

        .rivotDesignDetails.is-text-visible .rivotDetailsLanguage,
        .rivotDesignDetails.is-text-visible .rivotDetailsCaption,
        .rivotDesignDetails.is-text-visible .rivotDetailsMiniCaption {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .rivotDesignDetails.is-text-visible .rivotDetailsLanguage { transition-delay: .28s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsCaption { transition-delay: .42s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsSmallPlaceholder:first-child .rivotDetailsMiniCaption { transition-delay: .5s; }
        .rivotDesignDetails.is-text-visible .rivotDetailsSmallPlaceholder:last-child .rivotDetailsMiniCaption { transition-delay: .62s; }

        .rivotDetailsCaption {
          position: absolute;
          left: 22px;
          bottom: 22px;
          z-index: 3;
          color: rgba(255,255,255,.9);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .rivotDetailsLanguage {
          position: absolute;
          left: 22px;
          top: 22px;
          z-index: 3;
          display: inline-grid;
          grid-template-columns: 10px minmax(0, 1fr);
          align-items: center;
          gap: 9px;
          max-width: 235px;
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 8px;
          background: rgba(16, 17, 19, .78);
          color: #fff;
          backdrop-filter: blur(10px);
        }

        .rivotDetailsLanguage i {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef7430;
          box-shadow: 0 0 14px rgba(239, 116, 48, .8);
        }

        .rivotDetailsLanguage b,
        .rivotDetailsMiniCaption b {
          display: block;
          color: #fff;
          font-size: 8px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .rivotDetailsLanguage small,
        .rivotDetailsMiniCaption small {
          display: block;
          margin-top: 3px;
          color: rgba(255, 255, 255, .58);
          font-size: 8px;
          font-weight: 700;
          line-height: 1.2;
        }

        .rivotDetailsSlider {
          position: absolute;
          left: 22px;
          right: auto;
          bottom: 48px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 9px;
          width: 235px;
          height: 12px;
        }

        .rivotDetailsSlider::after {
          content: "";
          flex: 1;
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .16);
        }

        .rivotDetailsSlider span {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .5);
        }

        .rivotDetailsSlider span:first-child {
          width: 36px;
          height: 3px;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotDetailsMiniCaption {
          position: absolute;
          left: 18px;
          bottom: 18px;
          z-index: 3;
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          align-items: center;
          gap: 10px;
          width: min(88%, 265px);
        }

        .rivotDetailsMiniCaption i {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 1px solid rgba(239, 116, 48, .42);
          border-radius: 50%;
          background: rgba(239, 116, 48, .08);
          color: #ef7430;
        }

        .rivotDetailsMiniCaption svg {
          width: 18px;
          height: 18px;
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotDesignDetailsCopy > *,
          .rivotDetailsList > div,
          .rivotDetailsLanguage,
          .rivotDetailsCaption,
          .rivotDetailsMiniCaption {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }

        .rivotPerformance {
          padding: var(--section-open-gap) clamp(14px, 3vw, 34px) var(--section-close-gap);
          background: linear-gradient(180deg, #fbfaf7 0%, #fff 52%, #f7f7f5 100%);
          color: #050505;
          overflow: hidden;
        }

        .rivotPerformanceShell {
          display: grid;
          grid-template-columns: minmax(220px, .62fr) minmax(0, 1.58fr);
          gap: clamp(18px, 2.5vw, 34px);
          width: min(100%, 1320px);
          margin: 0 auto;
          padding: clamp(24px, 3vw, 38px) clamp(24px, 3.6vw, 48px);
          align-items: center;
        }

        .rivotPerformanceCopy {
          min-width: 0;
        }

        .rivotPerformanceCopy > *,
        .rivotPerformanceCardContent > * {
          opacity: 0;
          transform: translateY(24px);
          filter: blur(5px);
          transition:
            opacity .78s cubic-bezier(.22, 1, .36, 1),
            transform .78s cubic-bezier(.22, 1, .36, 1),
            filter .78s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform, filter;
        }

        .rivotPerformance.is-text-visible .rivotPerformanceCopy > *,
        .rivotPerformance.is-text-visible .rivotPerformanceCardContent > * {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .rivotPerformance.is-text-visible .rivotPerformanceEyebrow { transition-delay: .04s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCopy h2 { transition-delay: .14s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCopy > p:not(.rivotPerformanceEyebrow) { transition-delay: .26s; }
        .rivotPerformance.is-text-visible .rivotPerformanceAccent { transition-delay: .36s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:first-child .rivotPerformanceCardContent p:first-child { transition-delay: .2s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:first-child .rivotPerformanceCardContent h3 { transition-delay: .32s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:first-child .rivotPerformanceCardContent p:last-child { transition-delay: .44s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:nth-child(2) .rivotPerformanceCardContent p:first-child { transition-delay: .32s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:nth-child(2) .rivotPerformanceCardContent h3 { transition-delay: .44s; }
        .rivotPerformance.is-text-visible .rivotPerformanceCard:nth-child(2) .rivotPerformanceCardContent p:last-child { transition-delay: .56s; }

        .rivotPerformanceEyebrow {
          margin: 0 0 24px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .rivotPerformanceCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(30px, 3vw, 50px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .rivotPerformanceCopy h2 span {
          color: #ef7430;
        }

        .rivotPerformanceCopy > p:not(.rivotPerformanceEyebrow) {
          max-width: 300px;
          margin: 28px 0 0;
          color: #42464d;
          font-size: clamp(15px, 1.15vw, 17px);
          font-weight: 500;
          line-height: 1.65;
        }

        .rivotPerformanceAccent {
          display: block;
          width: 58px;
          height: 3px;
          margin-top: 32px;
          border-radius: 999px;
          background: #ef7430;
        }

        .rivotPerformanceCards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          min-width: 0;
        }

        .rivotPerformanceCard {
          position: relative;
          min-height: clamp(310px, 27vw, 420px);
          overflow: hidden;
          border-radius: 18px;
          background: #111;
          box-shadow: 0 16px 36px rgba(0, 0, 0, .14);
          transform: skewX(-4deg);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .rivotPerformanceCard:hover {
          transform: skewX(-4deg) translateY(-5px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, .18);
        }

        .rivotPerformancePlaceholder {
          position: absolute;
          inset: -10px;
          transform: skewX(4deg) scale(1.04);
          background:
            linear-gradient(135deg, rgba(239, 116, 48, .32), transparent 38%),
            linear-gradient(160deg, #4a4a43 0%, #171717 58%, #070707 100%);
        }

        .rivotPerformancePhoto {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .rivotPerformanceCard:first-child .rivotPerformancePhoto {
          object-position: 48% center;
        }

        .rivotPerformanceCard:nth-child(2) .rivotPerformancePhoto {
          object-position: 55% center;
        }

        .rivotPerformanceCard:nth-child(2) .rivotPerformancePlaceholder {
          background:
            linear-gradient(135deg, rgba(239, 116, 48, .26), transparent 34%),
            linear-gradient(145deg, #51311f 0%, #171411 42%, #050505 100%);
        }

        .rivotPerformancePlaceholder span {
          position: absolute;
          right: 28px;
          bottom: 24px;
          color: rgba(255,255,255,.55);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .rivotPerformanceCardShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.08) 52%, rgba(0,0,0,.62) 100%);
        }

        .rivotPerformanceCardContent {
          position: absolute;
          inset: 34px;
          z-index: 1;
          color: #fff;
          transform: skewX(4deg);
        }

        .rivotPerformanceCardContent p:first-child {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 44px;
          color: rgba(255,255,255,.76);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .rivotPerformanceCardContent p:first-child span {
          color: #ef7430;
          font-size: 22px;
          letter-spacing: -.04em;
        }

        .rivotPerformanceCardContent h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(28px, 3vw, 46px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -.045em;
        }

        .rivotPerformanceCardContent h3 span {
          color: #ef7430;
        }

        .rivotPerformanceCardContent p:last-child {
          max-width: 210px;
          margin: 22px 0 0;
          color: rgba(255,255,255,.76);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.45;
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotPerformanceCopy > *,
          .rivotPerformanceCardContent > * {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }

        .rivotSafetyTech {
          position: relative;
          overflow: hidden;
          padding: clamp(34px, 4.5vw, 58px) clamp(14px, 3vw, 34px) clamp(42px, 5vw, 68px);
          background: #d9d9d9;
          color: #0b0b0b;
        }

        .rivotSafetyTech::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(8, 10, 13, .55) 0%, rgba(8, 10, 13, .2) 32%, rgba(8, 10, 13, .1) 52%, rgba(8, 10, 13, .5) 100%),
            linear-gradient(180deg, rgba(8, 10, 13, .22) 0%, rgba(8, 10, 13, .08) 42%, rgba(8, 10, 13, .28) 100%);
          pointer-events: none;
        }

        .rivotSafetyTechPanel {
          position: relative;
          z-index: 2;
          width: min(100%, 1320px);
          margin: 0 auto;
        }

        .rivotSafetyHeader {
          display: grid;
          justify-items: center;
          text-align: center;
        }

        .rivotSafetyHeader p {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px;
          color: #f36f2b;
          font-size: clamp(12px, .95vw, 15px);
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
        }

        .rivotSafetyHeader p svg {
          width: 22px;
          height: 22px;
        }

        .rivotSafetyHeader h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(30px, 3vw, 42px);
          font-weight: 950;
          line-height: 1.02;
          letter-spacing: -.045em;
          text-shadow: 0 3px 20px rgba(0, 0, 0, .42);
        }

        .rivotSafetyHeader span {
          margin-top: 14px;
          color: rgba(255, 255, 255, .92);
          font-size: clamp(14px, 1.25vw, 18px);
          font-weight: 650;
          line-height: 1.45;
          text-shadow: 0 2px 12px rgba(0, 0, 0, .48);
        }

        .rivotSafetyHeader i {
          width: 56px;
          height: 3px;
          margin-top: 22px;
          border-radius: 999px;
          background: #f36f2b;
        }

        .rivotSafetyGrid {
          position: relative;
          display: grid;
          grid-template-columns: minmax(230px, .72fr) minmax(430px, 1.42fr) minmax(230px, .72fr);
          align-items: center;
          gap: clamp(12px, 1.6vw, 26px);
          margin-top: clamp(14px, 2vw, 26px);
          min-height: clamp(430px, 35vw, 510px);
        }

        .rivotSafetyBackground {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 1;
        }

        .rivotSafetyBackground img {
          object-fit: cover;
          object-position: center 52%;
        }

        .rivotSafetyStage {
          position: relative;
          z-index: 1;
          min-height: clamp(320px, 31vw, 455px);
        }

        .rivotSafetyList {
          position: relative;
          z-index: 2;
          display: grid;
          gap: clamp(26px, 3.1vw, 44px);
        }

        .rivotSafetyFeature {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(56px, 5.2vw, 76px);
          align-items: center;
          gap: clamp(14px, 1.4vw, 22px);
        }

        .rivotSafetyFeature > div {
          max-width: 210px;
        }

        .rivotSafetyListLeft .rivotSafetyFeature > div {
          justify-self: end;
        }

        .rivotSafetyListRight .rivotSafetyFeature {
          grid-template-columns: clamp(56px, 5.2vw, 76px) minmax(0, 1fr);
        }

        .rivotSafetyListLeft {
          text-align: right;
        }

        .rivotSafetyFeature h3 {
          margin: 0 0 12px;
          color: #fff;
          font-size: clamp(16px, 1.2vw, 20px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.03em;
          text-shadow: 0 2px 12px rgba(0, 0, 0, .58);
        }

        .rivotSafetyFeature p {
          margin: 0;
          color: rgba(255, 255, 255, .88);
          font-size: clamp(13px, .95vw, 16px);
          font-weight: 700;
          line-height: 1.48;
          text-shadow: 0 2px 10px rgba(0, 0, 0, .68);
        }

        .rivotSafetyRoundIcon {
          display: grid;
          width: clamp(56px, 5.2vw, 76px);
          height: clamp(56px, 5.2vw, 76px);
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .94);
          color: #f36f2b;
          box-shadow:
            0 14px 34px rgba(13, 13, 13, .08),
            inset 0 0 0 1px rgba(15, 15, 15, .04);
        }

        .rivotSafetyRoundIcon svg {
          width: 34px;
          height: 34px;
        }

        .rivotSafetyTc {
          border-radius: 18px;
          border: 3px solid rgba(243, 111, 43, .95);
          font-size: clamp(15px, 1.2vw, 19px);
          font-weight: 950;
          line-height: 1;
        }

        @media (min-width: 901px) and (min-height: 700px) {
          .rivotSafetyTech {
            height: min(660px, calc(100svh - 112px));
            min-height: 0;
            padding: clamp(14px, 2vh, 20px) clamp(14px, 3vw, 34px) 8px;
            scroll-margin-top: 112px;
          }

          .rivotSafetyTechPanel {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .rivotSafetyHeader {
            flex: 0 0 auto;
          }

          .rivotSafetyHeader p {
            margin-bottom: 6px;
          }

          .rivotSafetyHeader h2 {
            font-size: clamp(28px, 2.7vw, 38px);
          }

          .rivotSafetyHeader span {
            margin-top: 6px;
            font-size: clamp(13px, 1.1vw, 16px);
          }

          .rivotSafetyHeader i {
            margin-top: 8px;
          }

          .rivotSafetyGrid {
            flex: 1 1 auto;
            min-height: 0;
            margin-top: 6px;
          }

          .rivotSafetyStage {
            min-height: 0;
            height: 100%;
          }

          .rivotSafetyList {
            gap: clamp(10px, 1.6vh, 20px);
          }

          .rivotSafetyRoundIcon {
            width: clamp(52px, 4.4vw, 68px);
            height: clamp(52px, 4.4vw, 68px);
          }

          .rivotSafetyFeature,
          .rivotSafetyListRight .rivotSafetyFeature {
            grid-template-columns: minmax(0, 1fr) clamp(52px, 4.4vw, 68px);
          }

          .rivotSafetyListRight .rivotSafetyFeature {
            grid-template-columns: clamp(52px, 4.4vw, 68px) minmax(0, 1fr);
          }

          .rivotSafetyFeature h3 {
            margin-bottom: 7px;
          }
        }

        .rivotAppConnect {
          padding: clamp(44px, 5.5vw, 78px) clamp(16px, 4vw, 56px);
          background: #f3f3f4;
          color: #080808;
        }

        .rivotAppConnectShell {
          width: min(100%, 940px);
          margin: 0 auto;
        }

        .rivotAppConnectIntro {
          max-width: 460px;
          margin: 0 0 clamp(28px, 3vw, 40px);
          color: #050505;
          font-size: clamp(20px, 2.1vw, 28px);
          font-weight: 850;
          line-height: 1.14;
          letter-spacing: -.035em;
        }

        .rivotAppConnectCards {
          display: grid;
          grid-template-columns: minmax(250px, .95fr) minmax(280px, 1fr);
          gap: 18px;
        }

        .rivotAppConnectMenu,
        .rivotAppPhoneCard {
          min-height: clamp(420px, 36vw, 540px);
          overflow: hidden;
          border-radius: 16px;
        }

        .rivotAppConnectMenu {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(34px, 3.4vw, 48px);
          background: #fff;
          box-shadow: 0 18px 45px rgba(17, 17, 17, .05);
        }

        .rivotAppConnectMenu b,
        .rivotAppConnectMenu span {
          display: block;
          line-height: 1.2;
        }

        .rivotAppConnectMenu b {
          margin-bottom: 13px;
          color: #070707;
          font-size: clamp(24px, 2.2vw, 32px);
          font-weight: 850;
          letter-spacing: -.04em;
        }

        .rivotAppConnectMenu span {
          margin-top: 9px;
          color: #d4d5d7;
          font-size: clamp(22px, 2vw, 29px);
          font-weight: 800;
          letter-spacing: -.04em;
        }

        .rivotAppConnectFooter {
          display: grid;
          gap: 12px;
        }

        .rivotAppConnectDots {
          display: flex;
          gap: 5px;
        }

        .rivotAppConnectDots span {
          width: 5px;
          height: 5px;
          margin: 0;
          border-radius: 50%;
          background: #cfd1d4;
        }

        .rivotAppConnectDots span:first-child {
          background: #080808;
        }

        .rivotAppConnectFooter p {
          max-width: 280px;
          margin: 0;
          color: #9da1a6;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.35;
        }

        .rivotAppDownload {
          display: inline-grid;
          grid-template-columns: 30px minmax(0, auto);
          align-items: center;
          gap: 8px;
          width: max-content;
          min-height: 26px;
          color: #090909;
          font-size: 10px;
          font-weight: 900;
          line-height: 1.05;
        }

        .rivotAppDownload i {
          position: relative;
          display: block;
          width: 28px;
          height: 18px;
          border: 1.5px solid #111;
          border-radius: 999px;
        }

        .rivotAppDownload i::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 50%;
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 8px solid #111;
          transform: translateY(-50%);
        }

        .rivotAppDownload small {
          display: block;
          margin-top: 2px;
          color: #9da1a6;
          font-size: 8px;
          font-weight: 800;
        }

        .rivotAppPhoneCard {
          position: relative;
          display: grid;
          place-items: center;
          padding: 32px;
          background: linear-gradient(180deg, #dfe8f4 0%, #bfc2c7 100%);
          isolation: isolate;
          box-shadow: 0 18px 45px rgba(17, 17, 17, .08);
        }

        .rivotAppHand {
          position: absolute;
          z-index: 1;
          bottom: -8%;
          width: 34%;
          height: 70%;
          border-radius: 44% 44% 18% 18%;
          background: linear-gradient(160deg, rgba(25, 26, 28, .94), rgba(5, 6, 7, .98));
          filter: blur(.1px);
          opacity: .96;
        }

        .rivotAppHandLeft {
          left: 10%;
          transform: rotate(-18deg);
        }

        .rivotAppHandRight {
          right: 9%;
          transform: rotate(18deg);
        }

        .rivotPhoneMockup {
          position: relative;
          z-index: 2;
          width: min(58%, 228px);
          min-width: 178px;
          aspect-ratio: 9 / 18.4;
          padding: 12px 11px 13px;
          border: 5px solid #070707;
          border-radius: 32px;
          background: #f9faf7;
          box-shadow:
            0 22px 48px rgba(0, 0, 0, .34),
            inset 0 0 0 1px rgba(255, 255, 255, .5);
        }

        .rivotPhoneMockup::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 7px;
          width: 58px;
          height: 14px;
          border-radius: 999px;
          background: #070707;
          transform: translateX(-50%);
        }

        .rivotPhoneStatus {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 20px;
          padding-inline: 4px;
          color: #111;
          font-size: 8px;
          font-weight: 900;
        }

        .rivotPhoneStatus i {
          display: block;
          width: 22px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, #111 50%, transparent 50%);
          border: 1px solid #111;
        }

        .rivotPhoneTop {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-top: 10px;
          color: #171717;
        }

        .rivotPhoneTop small {
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rivotPhoneTop b {
          font-size: 12px;
          font-weight: 900;
        }

        .rivotPhoneMap {
          display: grid;
          place-items: center;
          height: 96px;
          margin-top: 10px;
          overflow: hidden;
          border: 1px solid #dde8e3;
          border-radius: 13px;
          background:
            linear-gradient(90deg, rgba(11, 83, 81, .06) 1px, transparent 1px),
            linear-gradient(0deg, rgba(11, 83, 81, .06) 1px, transparent 1px),
            #eef6f2;
          background-size: 18px 18px;
        }

        .rivotPhoneMap svg {
          width: 100%;
          height: 100%;
        }

        .rivotPhoneTrip {
          margin-top: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eef0ed;
        }

        .rivotPhoneTrip b,
        .rivotPhoneCard b {
          display: block;
          color: #111;
          font-size: 10px;
          font-weight: 900;
          line-height: 1.1;
        }

        .rivotPhoneTrip small,
        .rivotPhoneCard small {
          display: block;
          margin-top: 3px;
          color: #8a918d;
          font-size: 8px;
          font-weight: 750;
          line-height: 1.2;
        }

        .rivotPhoneStats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          margin-top: 10px;
        }

        .rivotPhoneStats span {
          display: grid;
          gap: 2px;
          min-height: 44px;
          align-content: center;
          padding: 7px 5px;
          border-radius: 10px;
          background: #f0f1ee;
          text-align: center;
        }

        .rivotPhoneStats b {
          color: #111;
          font-size: 11px;
          font-weight: 900;
        }

        .rivotPhoneStats small {
          color: #9da1a6;
          font-size: 7px;
          font-weight: 800;
        }

        .rivotPhoneCard {
          display: grid;
          grid-template-columns: 28px 1fr;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 9px;
          border-radius: 13px;
          background: #fff;
          box-shadow: 0 10px 24px rgba(17, 17, 17, .08);
        }

        .rivotPhoneCard i {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          background: #27c769;
        }

        .rivotPhoneCard i::before {
          content: "";
          width: 12px;
          height: 8px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(-45deg) translate(1px, -1px);
        }

        .rivotAppPhoneCard > p {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 58px;
          width: 150px;
          margin: 0;
          color: rgba(255, 255, 255, .92);
          font-size: 12px;
          font-weight: 900;
          line-height: 1.25;
          text-align: center;
          transform: translateX(-50%);
        }

        .rivotAppConnect {
          padding: var(--section-open-gap) clamp(18px, 5vw, 76px) var(--section-close-gap);
          overflow: hidden;
          background:
            radial-gradient(circle at 73% 28%, rgba(239, 116, 48, .08), transparent 31%),
            linear-gradient(180deg, #faf9f7 0%, #f3f2f0 100%);
          color: #080808;
        }

        .rivotAppConnectShell {
          position: relative;
          display: grid;
          grid-template-columns: minmax(300px, .95fr) minmax(300px, .82fr);
          align-items: center;
          gap: clamp(36px, 7vw, 116px);
          width: min(100%, 1180px);
          margin: 0 auto;
        }

        .rivotAppConnectCopy {
          position: relative;
          z-index: 2;
          min-width: 0;
        }

        .rivotAppConnectCopy > .rivotAppEyebrow,
        .rivotAppConnectCopy > h2,
        .rivotAppConnectCopy > .rivotAppLead {
          opacity: 0;
          translate: 0 26px;
          filter: blur(5px);
          transition:
            opacity .72s cubic-bezier(.22, 1, .36, 1),
            translate .72s cubic-bezier(.22, 1, .36, 1),
            filter .72s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotAppConnect.is-text-visible .rivotAppConnectCopy > .rivotAppEyebrow,
        .rivotAppConnect.is-text-visible .rivotAppConnectCopy > h2,
        .rivotAppConnect.is-text-visible .rivotAppConnectCopy > .rivotAppLead {
          opacity: 1;
          translate: 0 0;
          filter: blur(0);
        }

        .rivotAppConnect.is-text-visible .rivotAppEyebrow { transition-delay: .04s; }
        .rivotAppConnect.is-text-visible .rivotAppConnectCopy > h2 { transition-delay: .14s; }
        .rivotAppConnect.is-text-visible .rivotAppLead { transition-delay: .24s; }

        .rivotAppKicker,
        .rivotAppEyebrow {
          margin: 0;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .rivotAppKicker {
          margin-bottom: 12px;
        }

        .rivotAppEyebrow {
          margin-bottom: 14px;
        }

        .rivotAppConnectCopy h2 {
          margin: 0;
          color: #060606;
          font-size: clamp(40px, 4vw, 46px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: 0;
        }

        .rivotAppConnectCopy h2 span {
          color: #ef7430;
        }

        .rivotAppLead {
          margin: clamp(24px, 2.4vw, 34px) 0 0;
          max-width: 390px;
          color: #5f676c;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.5;
        }

        .rivotRideInsightList {
          display: grid;
          gap: 12px;
          max-width: 460px;
          margin-top: clamp(34px, 4vw, 54px);
        }

        .rivotRideInsightList > button {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) 18px;
          align-items: center;
          gap: 14px;
          min-height: 58px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, .32);
          color: #151515;
          border: 1px solid transparent;
          font: inherit;
          text-align: left;
          cursor: pointer;
          opacity: 0;
          translate: -24px 0;
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
        }

        .rivotAppConnect.is-text-visible .rivotRideInsightList > button {
          opacity: 1;
          translate: 0 0;
          transition:
            opacity .62s cubic-bezier(.22, 1, .36, 1),
            translate .62s cubic-bezier(.22, 1, .36, 1),
            background .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            transform .2s ease;
        }

        .rivotAppConnect.is-text-visible .rivotRideInsightList > button:nth-child(1) { transition-delay: .3s; }
        .rivotAppConnect.is-text-visible .rivotRideInsightList > button:nth-child(2) { transition-delay: .38s; }
        .rivotAppConnect.is-text-visible .rivotRideInsightList > button:nth-child(3) { transition-delay: .46s; }
        .rivotAppConnect.is-text-visible .rivotRideInsightList > button:nth-child(4) { transition-delay: .54s; }
        .rivotAppConnect.is-text-visible .rivotRideInsightList > button:nth-child(5) { transition-delay: .62s; }

        @media (prefers-reduced-motion: reduce) {
          .rivotAppConnectCopy > .rivotAppEyebrow,
          .rivotAppConnectCopy > h2,
          .rivotAppConnectCopy > .rivotAppLead,
          .rivotRideInsightList > button {
            opacity: 1;
            translate: 0 0;
            filter: none;
            transition: none;
          }
        }

        .rivotRideInsightList > button:hover {
          border-color: rgba(239, 116, 48, .16);
          background: rgba(255, 255, 255, .74);
          transform: translateY(-1px);
        }

        .rivotRideInsightList > button.active {
          background: #fff;
          color: #ef7430;
          border-color: rgba(239, 116, 48, .18);
          box-shadow: 0 18px 42px rgba(17, 17, 17, .08);
        }

        .rivotRideInsightList i {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border: 1px solid #e1e1df;
          border-radius: 9px;
          background: #fff;
          color: #151515;
        }

        .rivotRideInsightList .active i {
          border-color: rgba(239, 116, 48, .2);
          background: #fff7f2;
          color: #ef7430;
        }

        .rivotRideInsightList svg {
          width: 19px;
          height: 19px;
        }

        .rivotRideInsightList b,
        .rivotRideInsightList small {
          display: block;
        }

        .rivotRideInsightList b {
          color: #171717;
          font-size: 14px;
          font-weight: 900;
          line-height: 1.15;
        }

        .rivotRideInsightList small {
          margin-top: 4px;
          color: #737b80;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.2;
        }

        .rivotAppConnectDots {
          display: flex;
          gap: 14px;
          margin-top: clamp(42px, 5vw, 70px);
        }

        .rivotAppConnectDots span {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 50%;
          background: #d7d8d8;
        }

        .rivotAppConnectDots span:first-child,
        .rivotAppConnectDots span:nth-child(3) {
          background: #ef7430;
        }

        .rivotRidePhoneCard {
          position: relative;
          display: grid;
          place-items: center;
          justify-items: center;
          justify-self: center;
          width: min(100%, 470px);
          min-width: 0;
          padding: 0;
          isolation: isolate;
        }

        .rivotRidePhoneCard::before {
          display: none;
        }

        .rivotRideInsightPhoto {
          z-index: 2;
          display: block;
          width: clamp(238px, 24vw, 336px);
          height: auto;
          max-height: min(620px, 72vh);
          border: 0;
          border-radius: 0;
          object-fit: contain;
          object-position: center;
          background: transparent;
          box-shadow: none;
        }

        .rivotRidePhoneCard .rivotPhoneMockup {
          width: min(100%, 360px);
          min-width: 0;
          aspect-ratio: 9 / 18.7;
          padding: 18px 18px 14px;
          border: 2px solid rgba(17, 17, 17, .08);
          border-radius: 44px;
          background: #fff;
          box-shadow:
            0 28px 70px rgba(17, 17, 17, .12),
            inset 0 0 0 1px rgba(17, 17, 17, .05);
        }

        .rivotRidePhoneCard .rivotPhoneMockup::before {
          top: 14px;
          width: 92px;
          height: 24px;
          border-radius: 999px;
          background: #070707;
        }

        .rivotRidePhoneCard .rivotPhoneStatus {
          height: 30px;
          padding: 0 9px;
          color: #090909;
          font-size: 11px;
          font-weight: 900;
        }

        .rivotRidePhoneCard .rivotPhoneStatus i {
          width: 42px;
          height: 11px;
          border: 0;
          background:
            radial-gradient(circle at 8px 50%, #111 0 3px, transparent 4px),
            linear-gradient(90deg, #111 0 18px, transparent 18px 24px, #111 24px 42px);
        }

        .rivotPhoneHeader {
          margin-top: 18px;
        }

        .rivotPhoneHeader > b {
          display: block;
          color: #111;
          font-size: 21px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.04em;
        }

        .rivotPhoneHeader > span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 38px;
          margin-top: 18px;
          padding: 0 13px;
          border: 1px solid #eceeed;
          border-radius: 9px;
          background: #fbfbfa;
          color: #222;
          font-size: 12px;
          font-weight: 850;
        }

        .rivotPhoneHeader i {
          width: 7px;
          height: 7px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg) translateY(-2px);
        }

        .rivotPhoneMetrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-top: 22px;
          text-align: center;
        }

        .rivotPhoneMetrics b,
        .rivotPhoneSummary b,
        .rivotPhoneCard b {
          display: block;
          color: #111;
          font-size: 16px;
          font-weight: 900;
          line-height: 1.05;
        }

        .rivotPhoneMetrics small,
        .rivotPhoneSummary small,
        .rivotPhoneCard small {
          display: block;
          margin-top: 5px;
          color: #8f969b;
          font-size: 9px;
          font-weight: 850;
          line-height: 1.15;
          text-transform: uppercase;
        }

        .rivotPhoneChart {
          height: 186px;
          margin-top: 18px;
        }

        .rivotPhoneChart svg {
          width: 100%;
          height: 100%;
        }

        .rivotPhoneSummary {
          margin-top: 12px;
        }

        .rivotPhoneSummary > b {
          margin-bottom: 14px;
          font-size: 13px;
        }

        .rivotPhoneSummary > div {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 7px;
        }

        .rivotPhoneSummary span {
          min-width: 0;
        }

        .rivotPhoneSummary span b {
          font-size: 13px;
        }

        .rivotPhoneSummary span small {
          font-size: 7px;
          text-transform: none;
        }

        .rivotRidePhoneCard .rivotPhoneCard {
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 11px;
          margin-top: 18px;
          padding: 13px;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 14px 36px rgba(17, 17, 17, .08);
        }

        .rivotRidePhoneCard .rivotPhoneCard i {
          width: 38px;
          height: 38px;
          background: #dff8e5;
        }

        .rivotRidePhoneCard .rivotPhoneCard i::before {
          width: 20px;
          height: 20px;
          border: 0;
          border-radius: 50%;
          background:
            linear-gradient(135deg, transparent 38%, #25c865 39% 60%, transparent 61%),
            #6fea8b;
          transform: none;
        }

        .rivotRidePhoneCard .rivotPhoneCard b {
          font-size: 12px;
        }

        .rivotRidePhoneCard .rivotPhoneCard small {
          max-width: 210px;
          font-size: 9px;
          text-transform: none;
        }

        .rivotPhoneNav {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 2px;
          margin-top: 18px;
          padding-top: 12px;
          border-top: 1px solid #eef0ef;
          color: #8f969b;
          font-size: 9px;
          font-weight: 850;
          text-align: center;
        }

        .rivotPhoneNav span.active {
          color: #ef7430;
        }

        @media (max-width: 1180px) {
        .rivotAppConnect {
          padding: clamp(26px, 3vw, 42px) clamp(16px, 4vw, 56px);
        }

        .rivotAppConnectShell {
          grid-template-columns: minmax(260px, .9fr) minmax(250px, .64fr);
          gap: clamp(28px, 4.5vw, 68px);
          width: min(100%, 980px);
        }

        .rivotAppKicker {
          margin-bottom: 6px;
          font-size: 11px;
        }

        .rivotAppEyebrow {
          margin-bottom: 8px;
          font-size: 11px;
        }

        .rivotAppConnectCopy h2 {
          font-size: clamp(34px, 4vw, 46px);
          line-height: .9;
        }

        .rivotAppLead {
          margin-top: 18px;
          font-size: 15px;
          line-height: 1.45;
        }

        .rivotRideInsightList {
          gap: 8px;
          max-width: 410px;
          margin-top: 28px;
        }

        .rivotRideInsightList > button {
          grid-template-columns: 36px minmax(0, 1fr) 16px;
          min-height: 46px;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 10px;
        }

        .rivotRideInsightList i {
          width: 30px;
          height: 30px;
          border-radius: 8px;
        }

        .rivotRideInsightList svg {
          width: 16px;
          height: 16px;
        }

        .rivotRideInsightList b {
          font-size: 12px;
        }

        .rivotRideInsightList small {
          margin-top: 2px;
          font-size: 9px;
        }

        .rivotAppConnectDots {
          gap: 11px;
          margin-top: 28px;
        }

        .rivotAppConnectDots span {
          width: 8px;
          height: 8px;
        }

        .rivotRidePhoneCard .rivotPhoneMockup {
          width: min(100%, 270px);
          padding: 13px 13px 11px;
          border-radius: 34px;
          box-shadow:
            0 20px 48px rgba(17, 17, 17, .12),
            inset 0 0 0 1px rgba(17, 17, 17, .05);
        }

        .rivotRidePhoneCard .rivotPhoneMockup::before {
          top: 10px;
          width: 68px;
          height: 17px;
        }

        .rivotRidePhoneCard .rivotPhoneStatus {
          height: 23px;
          padding: 0 7px;
          font-size: 9px;
        }

        .rivotRidePhoneCard .rivotPhoneStatus i {
          width: 34px;
          height: 9px;
        }

        .rivotPhoneHeader {
          margin-top: 12px;
        }

        .rivotPhoneHeader > b {
          font-size: 16px;
        }

        .rivotPhoneHeader > span {
          min-height: 30px;
          margin-top: 12px;
          padding: 0 10px;
          font-size: 10px;
        }

        .rivotPhoneMetrics {
          gap: 6px;
          margin-top: 14px;
        }

        .rivotPhoneMetrics b,
        .rivotPhoneSummary b,
        .rivotPhoneCard b {
          font-size: 12px;
        }

        .rivotPhoneMetrics small,
        .rivotPhoneSummary small,
        .rivotPhoneCard small {
          margin-top: 3px;
          font-size: 7px;
        }

        .rivotPhoneChart {
          height: 120px;
          margin-top: 10px;
        }

        .rivotPhoneSummary {
          margin-top: 8px;
        }

        .rivotPhoneSummary > b {
          margin-bottom: 9px;
          font-size: 10px;
        }

        .rivotPhoneSummary > div {
          gap: 5px;
        }

        .rivotPhoneSummary span b {
          font-size: 10px;
        }

        .rivotPhoneSummary span small {
          font-size: 6px;
        }

        .rivotRidePhoneCard .rivotPhoneCard {
          grid-template-columns: 32px minmax(0, 1fr);
          gap: 8px;
          margin-top: 10px;
          padding: 9px;
          border-radius: 12px;
        }

        .rivotRidePhoneCard .rivotPhoneCard i {
          width: 30px;
          height: 30px;
        }

        .rivotRidePhoneCard .rivotPhoneCard i::before {
          width: 16px;
          height: 16px;
        }

        .rivotRidePhoneCard .rivotPhoneCard b {
          font-size: 10px;
        }

        .rivotRidePhoneCard .rivotPhoneCard small {
          max-width: 170px;
          font-size: 7px;
        }

        .rivotPhoneNav {
          margin-top: 10px;
          padding-top: 8px;
          font-size: 7px;
        }
        }

        .rivotReachAnimated .rivotReachCard {
          opacity: 0;
          filter: blur(8px);
          will-change: opacity, transform, filter;
        }

        .rivotReachAnimated .rivotReachStore {
          transform: translateX(-46px) scale(.975);
        }

        .rivotReachAnimated .rivotReachCharge {
          transform: translateX(46px) scale(.975);
        }

        .rivotReachAnimated.isVisible .rivotReachCard {
          opacity: 1;
          filter: blur(0);
          transform: translateX(0) scale(1);
          transition: opacity .85s ease, transform .95s cubic-bezier(.16, 1, .3, 1), filter .8s ease;
        }

        .rivotReachAnimated.isVisible .rivotReachCharge {
          transition-delay: .14s;
        }

        .rivotReachAnimated .rivotReachCopy > * {
          opacity: 0;
          transform: translateY(22px);
          filter: blur(5px);
        }

        .rivotReachAnimated.isVisible .rivotReachCopy > * {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
          transition: opacity .65s ease, transform .75s cubic-bezier(.22, 1, .36, 1), filter .65s ease;
        }

        .rivotReachAnimated.isVisible .rivotReachCopy > :nth-child(1) { transition-delay: .28s; }
        .rivotReachAnimated.isVisible .rivotReachCopy > :nth-child(2) { transition-delay: .38s; }
        .rivotReachAnimated.isVisible .rivotReachCopy > :nth-child(3) { transition-delay: .5s; }
        .rivotReachAnimated.isVisible .rivotReachCopy > :nth-child(4) { transition-delay: .62s; }
        .rivotReachAnimated.isVisible .rivotReachCharge .rivotReachCopy > :nth-child(1) { transition-delay: .4s; }
        .rivotReachAnimated.isVisible .rivotReachCharge .rivotReachCopy > :nth-child(2) { transition-delay: .5s; }
        .rivotReachAnimated.isVisible .rivotReachCharge .rivotReachCopy > :nth-child(3) { transition-delay: .62s; }
        .rivotReachAnimated.isVisible .rivotReachCharge .rivotReachCopy > :nth-child(4) { transition-delay: .74s; }

        .rivotReachAnimated.isVisible .rivotReachCopy h2 {
          animation: rivotReachHeadline .9s cubic-bezier(.16, 1, .3, 1) both;
        }

        .rivotReachAnimated .rivotReachMedia img {
          transform: scale(1.1);
          filter: saturate(.75) blur(3px);
          transition: transform 1.25s cubic-bezier(.16, 1, .3, 1), filter 1s ease;
        }

        .rivotReachAnimated.isVisible .rivotReachMedia img {
          transform: scale(1);
          filter: saturate(1) blur(0);
        }

        @keyframes rivotReachHeadline {
          from { letter-spacing: -.075em; }
          to { letter-spacing: -.055em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotReachAnimated .rivotReachCard,
          .rivotReachAnimated .rivotReachCopy > *,
          .rivotReachAnimated .rivotReachMedia img {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }

        .rivotReach {
          padding: clamp(28px, 3vw, 48px) clamp(18px, 4vw, 64px) clamp(64px, 7vw, 92px);
          background: var(--bg);
          color: #111;
          overflow: hidden;
        }

        .rivotReachPanel {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 28px);
          width: min(100%, 1360px);
          margin: 0 auto;
          padding-top: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .rivotReachCard {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, .96fr) minmax(0, 1.04fr);
          min-height: clamp(250px, 24vw, 330px);
          overflow: hidden;
          border: 0;
          border-radius: 24px;
          background: var(--surface);
          box-shadow: 0 18px 46px var(--shadow);
        }

        .rivotReachStore {
          border-radius: 24px;
          background: linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 91%, #ef7430 9%) 100%);
        }

        .rivotReachCharge {
          border-left: 0;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 91%, #25a75d 9%) 100%);
        }

        .rivotReachCard::before {
          content: "";
          position: absolute;
          left: -40px;
          bottom: -42px;
          width: 220px;
          height: 120px;
          opacity: .16;
          background-image: radial-gradient(rgba(239, 116, 48, .62) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .rivotReachCopy {
          position: relative;
          z-index: 2;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(42px, 4.2vw, 62px) clamp(24px, 2.2vw, 36px) clamp(28px, 2.8vw, 40px);
        }

        .rivotReachIcon {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          margin-bottom: 16px;
          border: 1px solid rgba(239, 116, 48, .18);
          border-radius: 13px;
          color: #ef7430;
          background: #fff;
          box-shadow: 0 10px 24px rgba(239, 116, 48, .1);
        }

        .rivotReachIcon svg {
          width: 26px;
          height: 26px;
        }

        .rivotReachCopy > p {
          margin: 0 0 18px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .rivotReachCopy h2 {
          max-width: 100%;
          margin: 0;
          color: #050505;
          font-size: clamp(34px, 2.45vw, 46px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: -.055em;
          overflow-wrap: normal;
          text-wrap: balance;
        }

        .rivotReachCharge .rivotReachCopy h2 {
          font-size: clamp(32px, 2.3vw, 43px);
        }

        .rivotReachCopy small {
          display: block;
          max-width: 255px;
          margin-top: 16px;
          color: #42464d;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
        }

        .rivotReachArrow {
          display: inline-flex;
          width: auto;
          min-width: 176px;
          height: 52px;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-top: 24px;
          padding: 0 16px 0 22px;
          border: 1px solid rgba(255, 255, 255, .26);
          border-radius: 999px;
          background: linear-gradient(135deg, #ff833e, #ef6725);
          color: #fff;
          font-size: 21px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 12px 24px rgba(239, 116, 48, .24);
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
        }

        .rivotReachArrow b {
          font-size: 14px;
          font-weight: 850;
          letter-spacing: -.01em;
        }

        .rivotReachArrow span {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .18);
        }

        .rivotReachArrow:hover {
          filter: brightness(1.04);
          transform: translateY(-3px);
          box-shadow: 0 18px 34px rgba(239, 116, 48, .3);
        }

        .rivotReachCharge .rivotReachCopy > p,
        .rivotReachCharge .rivotReachIcon,
        .rivotReachCharge .rivotReachArrow {
          color: #25a75d;
        }

        .rivotReachCharge .rivotReachIcon {
          border-color: rgba(37, 167, 93, .2);
          box-shadow: 0 10px 24px rgba(37, 167, 93, .1);
        }

        .rivotReachCharge .rivotReachArrow {
          background: linear-gradient(135deg, #2cc771, #159d51);
          color: #fff;
          box-shadow: 0 12px 24px rgba(37, 167, 93, .22);
        }

        .rivotReachCharge .rivotReachArrow:hover {
          box-shadow: 0 18px 34px rgba(37, 167, 93, .3);
        }

        .rivotReachMedia {
          position: relative;
          z-index: 1;
          min-width: 0;
          min-height: 100%;
          margin: 18px 18px 18px 0;
          overflow: hidden;
          border: 0;
          border-radius: 20px;
          clip-path: none;
          background: #111;
          box-shadow: 0 14px 32px rgba(17, 17, 17, .14);
        }

        .rivotReachMedia img {
          object-fit: cover;
          object-position: center;
        }

        .rivotReachMedia::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          background: linear-gradient(180deg, transparent 56%, rgba(7, 8, 8, .2));
          pointer-events: none;
        }

        .rivotReachAnimated.isVisible .rivotReachCard:hover {
          transform: translateY(-7px) scale(1);
          box-shadow: 0 30px 66px rgba(17, 17, 17, .14);
        }

        .rivotReachCard:hover .rivotReachMedia img {
          transform: scale(1.045);
        }

        .rivotReachAnimated.isVisible .rivotReachCard:hover .rivotReachMedia img {
          transform: scale(1.045);
        }

        .rivotReachCharge .rivotReachMedia {
          margin-right: 18px;
        }

        @media (min-width: 1001px) {
          .rivotReachCard {
            display: block;
            min-height: clamp(390px, 31vw, 500px);
            isolation: isolate;
          }

          .rivotReachCard::after {
            content: "";
            position: absolute;
            left: -90px;
            top: -110px;
            z-index: 0;
            width: 310px;
            height: 310px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(239, 116, 48, .13), transparent 70%);
            pointer-events: none;
          }

          .rivotReachCharge::after {
            background: radial-gradient(circle, rgba(37, 167, 93, .13), transparent 70%);
          }

          .rivotReachCopy {
            width: 52%;
            min-height: clamp(390px, 31vw, 500px);
            justify-content: center;
            padding: clamp(34px, 3.2vw, 52px) clamp(26px, 3vw, 48px);
          }

          .rivotReachCopy h2 {
            font-size: clamp(36px, 2.8vw, 52px);
          }

          .rivotReachCharge .rivotReachCopy h2 {
            font-size: clamp(34px, 2.55vw, 48px);
          }

          .rivotReachMedia,
          .rivotReachCharge .rivotReachMedia {
            position: absolute;
            inset: 16px 16px 16px auto;
            width: 51%;
            min-height: 0;
            margin: 0;
            border-radius: 42% 20px 20px 42%;
          }

          .rivotReachStore .rivotReachMedia img {
            object-position: 57% center;
          }

          .rivotReachCharge .rivotReachMedia img {
            object-position: 55% center;
          }
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReach {
          background: #080909;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachPanel {
          background: transparent;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCard {
          border-color: transparent;
          box-shadow: 0 22px 52px rgba(0, 0, 0, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachStore {
          background: linear-gradient(135deg, #111313 0%, #1c1511 100%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge {
          background: linear-gradient(135deg, #111313 0%, #102018 100%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge {
          border-left-color: transparent;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachIcon {
          background: #1a1c1c;
          border-color: rgba(239, 116, 48, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge .rivotReachIcon {
          border-color: rgba(37, 167, 93, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCopy h2 {
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCopy small {
          color: #c7cbc7;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachStore .rivotReachCopy > p {
          color: #ef7430;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge .rivotReachCopy > p {
          color: #39c976;
        }

        .rivotBestFit {
          padding: clamp(96px, 8vw, 124px) clamp(16px, 4vw, 48px) clamp(50px, 5vw, 72px);
          background: #f7f7f5;
          color: #151515;
        }

        .rivotBestFitShell {
          width: min(100%, 1320px);
          margin: 0 auto;
        }

        .rivotBestFitHeader {
          text-align: center;
        }

        .rivotBestFitHeader h2 {
          margin: 0;
          color: #080808;
          font-size: clamp(34px, 3.5vw, 46px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: -.055em;
        }

        .rivotBestFitHeader p {
          margin: 12px 0 0;
          color: #777d84;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.35;
        }

        .rivotBestFitGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 26px);
          margin-top: clamp(34px, 3.5vw, 48px);
          align-items: stretch;
        }

        .rivotBestFitCard {
          position: relative;
          display: flex;
          min-height: clamp(340px, 23vw, 410px);
          flex-direction: column;
          align-items: center;
          padding: clamp(32px, 2.8vw, 42px) clamp(22px, 2.2vw, 30px) clamp(30px, 2.6vw, 36px);
          border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 8px;
          background: #111313;
          box-shadow: 0 18px 40px rgba(17, 19, 19, .12);
          text-align: center;
          overflow: hidden;
        }

        .rivotBestFitAccessoriesBg {
          object-fit: contain;
          object-position: center;
          opacity: .68;
        }

        .rivotBestFitAccessories::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 9, 9, .9), rgba(8, 9, 9, .56));
          pointer-events: none;
        }

        .rivotBestFitAccessories > *:not(.rivotBestFitAccessoriesBg) {
          position: relative;
          z-index: 1;
        }

        .rivotBestFitEyebrow {
          margin: 0 0 12px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .42em;
          text-transform: uppercase;
        }

        .rivotBestFitGreen {
          color: #7ee7aa;
        }

        .rivotBestFitBlue {
          color: #9abaff;
        }

        .rivotBestFitCard h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 1.75vw, 32px);
          font-weight: 850;
          line-height: 1.08;
          letter-spacing: -.04em;
        }

        .rivotBestFitCard > p:not(.rivotBestFitEyebrow) {
          max-width: 300px;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, .66);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.35;
        }

        .rivotAccessoryTiles {
          display: grid;
          grid-template-columns: repeat(3, 84px);
          gap: 10px;
          margin-top: auto;
          padding-top: 34px;
        }

        .rivotAccessoryTiles span {
          display: grid;
          width: 84px;
          height: 92px;
          place-items: center;
          overflow: hidden;
          border-radius: 8px;
          background: #1c1f1f;
        }

        .rivotAccessoryPart {
          position: relative;
          display: block;
          filter: drop-shadow(0 10px 8px rgba(0, 0, 0, .14));
        }

        .rivotAccessoryGuard {
          width: 54px;
          height: 28px;
          transform: rotate(28deg);
          border-radius: 10px 4px 5px 16px;
          background: linear-gradient(135deg, #1d2026, #434852 52%, #131419);
        }

        .rivotAccessoryGuard::before,
        .rivotAccessoryGuard::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          background: #15171c;
        }

        .rivotAccessoryGuard::before {
          right: 7px;
          bottom: -18px;
          width: 8px;
          height: 30px;
          transform: rotate(-28deg);
        }

        .rivotAccessoryGuard::after {
          left: 7px;
          bottom: -12px;
          width: 34px;
          height: 7px;
          transform: rotate(-34deg);
        }

        .rivotAccessoryPanel {
          width: 56px;
          height: 44px;
          transform: rotate(-34deg) skewX(-12deg);
          clip-path: polygon(8% 48%, 72% 0, 100% 30%, 80% 100%, 18% 84%);
          background:
            linear-gradient(135deg, transparent 0 53%, #ef5548 54% 63%, transparent 64%),
            linear-gradient(135deg, #1d2025, #343741 60%, #111217);
        }

        .rivotAccessoryPanel::after {
          content: "";
          position: absolute;
          right: 16px;
          top: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef5548;
        }

        .rivotAccessoryGrip {
          width: 28px;
          height: 50px;
          transform: rotate(-6deg);
          border-radius: 8px 8px 16px 16px;
          background: linear-gradient(160deg, #272a30, #111317 70%);
        }

        .rivotAccessoryGrip::before {
          content: "";
          position: absolute;
          left: -15px;
          bottom: -4px;
          width: 48px;
          height: 17px;
          border-radius: 11px;
          background: #15171b;
          transform: rotate(-20deg);
        }

        .rivotBestFitDisabled,
        .rivotBestFitCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 142px;
          min-height: 48px;
          margin-top: 32px;
          padding: 0 24px;
          border: 1px solid #ef7430;
          border-radius: 8px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 850;
          line-height: 1;
        }

        .rivotBestFitDisabled {
          border-color: rgba(255, 255, 255, .15);
          background: rgba(255, 255, 255, .08);
          color: rgba(255, 255, 255, .45);
          cursor: not-allowed;
        }

        .rivotBestFitCta {
          margin-top: auto;
          transition: transform .2s ease, background .2s ease;
        }

        .rivotBestFitCta:hover {
          background: #c85a22;
          border-color: #c85a22;
          transform: translateY(-1px);
        }

        .rivotBestFitShield {
          display: grid;
          width: clamp(92px, 7vw, 112px);
          height: clamp(92px, 7vw, 112px);
          place-items: center;
          margin: auto 0 clamp(26px, 2.6vw, 36px);
        }

        .rivotBestFitShield svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 18px 18px rgba(0, 0, 0, .08));
        }

        .rivotBestFitShieldGreen {
          color: #45df82;
        }

        .rivotBestFitShieldBlue {
          color: #5b8dff;
        }

        .rivotBestFitSubscription {
          min-height: clamp(340px, 23vw, 410px);
          padding: clamp(32px, 2.8vw, 42px) clamp(22px, 2.2vw, 30px) clamp(30px, 2.6vw, 36px);
          justify-content: flex-start;
          background: #111515;
        }

        .rivotBestFitSubscription .rivotBestFitEyebrow {
          margin-bottom: 10px;
          color: #8babff;
          font-size: 10px;
          letter-spacing: .5em;
        }

        .rivotBestFitSubscription h3 {
          font-size: clamp(24px, 1.75vw, 32px);
          letter-spacing: -.055em;
        }

        .rivotBestFitSubscription > p:not(.rivotBestFitEyebrow) {
          max-width: 270px;
          margin-top: 8px;
          color: rgba(255, 255, 255, .82);
          font-size: 13px;
          line-height: 1.28;
        }

        .rivotBestFitSubscription .rivotBestFitShield {
          width: clamp(84px, 6.2vw, 104px);
          height: clamp(84px, 6.2vw, 104px);
          margin: auto 0 clamp(26px, 2.6vw, 36px);
        }

        .rivotBestFitSubscription .rivotBestFitCta {
          min-width: 142px;
          min-height: 48px;
          margin-top: auto;
          padding-inline: 22px;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .rivotHero {
            height: calc(100vh - 64px);
            min-height: 0;
            margin-top: 64px;
            align-items: flex-start;
          }

          .rivotHeroImage {
            object-position: 66% center;
          }

          .rivotHeroContent {
            width: min(88vw, 560px);
            margin: 42px 0 0 6%;
          }

          .rivotHeroButtons {
            flex-wrap: wrap;
          }

          .rivotHeroPointers {
            right: 6%;
            bottom: 28px;
            gap: 8px;
          }

          .rivotHeroPointers button {
            width: 42px;
            height: 6px;
          }

          .rivotHeroPointers button.isActive {
            width: 54px;
          }

          .rivotHero h1 {
            font-size: clamp(58px, 15vw, 96px);
            gap: 18px;
          }

          .rivotHero h2 {
            max-width: 460px;
          }

          .rivotHeroSpecs {
            max-width: 480px;
            margin-top: 34px;
            margin-left: 0;
          }

          .rivotHeroSpecs div,
          .rivotHeroSpecs div:first-child {
            padding-inline: 10px;
          }

          .rivotTestRide,
          .rivotPriceBook {
            min-width: 210px;
            font-size: 16px;
          }

          .rivotKeyFeatures {
            min-height: auto;
            place-items: stretch;
          }

          .rivotKeyFeaturesShell {
            grid-template-columns: 1fr;
            max-height: none;
          }

          .rivotKeyCards {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .rivotKeyCard {
            min-height: clamp(410px, 56vw, 500px);
          }

          .rivotKeyCardContent {
            top: 28px;
            left: 34px;
            right: 24px;
          }

          .rivotKeyCardPills {
            gap: 8px;
          }

          .rivotKeyCardPills small {
            min-height: 26px;
            padding-inline: 10px;
            font-size: 10px;
          }

          .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
            max-width: 460px;
          }

          .rivotDesign {
            min-height: 100vh;
            padding-block: var(--section-open-gap) var(--section-close-gap);
          }

          .rivotDesignImage {
            width: min(74vw, 680px);
          }

          .rivotDesignControls {
            right: 24px;
            bottom: 28px;
          }

          .rivotEngineering {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: var(--section-open-gap) 20px var(--section-close-gap);
          }

          .rivotEngineeringHeader {
            padding: 0 0 28px;
          }

          .rivotEngineeringHeader small {
            max-width: 460px;
          }

          .rivotEngineeringGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto;
          }

          .rivotEngineeringCard {
            min-height: 220px;
          }

          .rivotDesignDetailsShell {
            grid-template-columns: 1fr;
            height: auto;
            min-height: auto;
          }

          .rivotDetailsMedia {
            grid-template-columns: 1fr;
          }

          .rivotDetailsHeroPlaceholder {
            height: 430px;
            min-height: 0;
          }

          .rivotDetailsSideStack {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rivotDetailsSmallPlaceholder {
            height: 260px;
            min-height: 0;
          }

          .rivotDetailsSlider {
            width: min(235px, calc(100% - 44px));
          }

          .rivotPerformanceShell {
            grid-template-columns: 1fr;
          }

          .rivotPerformanceCopy > p:not(.rivotPerformanceEyebrow) {
            max-width: 460px;
          }

          .rivotSafetyGrid {
            grid-template-columns: 1fr;
            gap: 24px;
            width: min(100%, 760px);
            margin-inline: auto;
            min-height: 0;
          }

          .rivotSafetyBackground {
            position: relative;
            inset: auto;
            order: -2;
            width: 100%;
            min-height: clamp(300px, 58vw, 440px);
            filter: drop-shadow(0 18px 36px rgba(239, 116, 48, .12));
          }

          .rivotSafetyBackground img {
            object-fit: contain;
          }

          .rivotSafetyStage {
            order: -1;
            display: none;
          }

          .rivotSafetyList {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .rivotSafetyListLeft,
          .rivotSafetyListRight {
            text-align: left;
          }

          .rivotSafetyFeature,
          .rivotSafetyListRight .rivotSafetyFeature {
            grid-template-columns: 56px minmax(0, 1fr);
            gap: 12px;
            align-items: start;
          }

          .rivotSafetyListLeft .rivotSafetyFeature .rivotSafetyRoundIcon {
            grid-column: 1;
            grid-row: 1;
          }

          .rivotSafetyListLeft .rivotSafetyFeature div {
            grid-column: 2;
            grid-row: 1;
          }

          .rivotSafetyFeature > div {
            max-width: none;
          }

          .rivotAppConnectShell {
            grid-template-columns: 1fr;
            width: min(100%, 760px);
            gap: 38px;
          }

          .rivotAppConnectCopy {
            text-align: center;
          }

          .rivotAppLead {
            margin-inline: auto;
          }

          .rivotRideInsightList {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 680px;
            margin-inline: auto;
          }

          .rivotRideInsightList > button {
            grid-template-columns: 34px minmax(0, 1fr) 14px;
            min-height: 54px;
          }

          .rivotAppConnectDots {
            justify-content: center;
          }

          .rivotRidePhoneCard {
            width: min(100%, 420px);
            padding: 12px 20px 4px;
          }

          .rivotRideInsightPhoto {
            width: clamp(246px, 44vw, 316px);
            max-height: none;
            border-radius: 38px;
          }

          .rivotAppConnectCards {
            grid-template-columns: 1fr;
          }

          .rivotAppConnectMenu,
          .rivotAppPhoneCard {
            min-height: 430px;
          }

          .rivotAppPhoneCard {
            padding: 34px 28px 72px;
          }

          .rivotPhoneMockup {
            width: min(42%, 220px);
          }

          .rivotRidePhoneCard .rivotPhoneMockup {
            width: min(100%, 270px);
          }

          .rivotReach {
            padding-bottom: 54px;
          }

          .rivotReachPanel {
            grid-template-columns: 1fr;
            gap: 14px;
            padding-top: 54px;
            border-radius: 16px;
            box-shadow: none;
          }

          .rivotReachCard {
            grid-template-columns: minmax(190px, .85fr) minmax(240px, 1.15fr);
            border-radius: 16px;
            box-shadow:
              0 14px 36px rgba(17, 17, 17, .08),
              inset 0 0 0 1px rgba(17, 17, 17, .05);
          }

          .rivotReachCharge {
            border-left: 0;
          }

          .rivotBestFit {
            padding: 42px 20px 50px;
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-inline: auto;
          }

          .rivotBestFitCard {
            min-height: 360px;
          }

          .rivotAccessoryTiles {
            grid-template-columns: repeat(3, minmax(84px, 104px));
            justify-content: center;
          }

          .rivotAccessoryTiles span {
            width: 100%;
          }

        }

        @media (max-width: 560px) {
          :root {
            --section-open-offset: 18px;
            --section-open-gap: 54px;
            --section-close-gap: 46px;
          }

          .rivotProductNav {
            display: none;
          }

          .rivotProductNavShell {
            display: grid;
            gap: 10px;
            min-height: 0;
            padding: 12px 16px;
          }

          .rivotProductNavLinks {
            width: 100%;
            gap: 18px;
          }

          .rivotProductNavLinks a {
            font-size: 12px;
            min-height: 36px;
          }

          .rivotProductNavActions {
            width: 100%;
          }

          .rivotProductNavWatch,
          .rivotProductNavBrochure {
            flex: 1 1 0;
            min-height: 42px;
            padding: 0 12px;
            font-size: 12px;
          }

          .rivotHero {
            display: block;
            width: 100%;
            max-width: none;
            height: min(720px, 100svh);
            min-height: 646px;
            margin: 0;
            border: 0;
            border-radius: 0;
            background: #f5f2ef;
            box-shadow: none;
          }

          .rivotHeroImage {
            object-position: center center;
            transform: scale(1);
          }

          html[data-rivot-theme="light"] .rivotHeroShade,
          html[data-theme="light"] .rivotHeroShade {
            background:
              linear-gradient(90deg, rgba(2, 4, 8, .22) 0%, rgba(2, 4, 8, 0) 52%, rgba(2, 4, 8, .24) 100%),
              linear-gradient(180deg, rgba(2, 4, 8, .22) 0%, rgba(2, 4, 8, .08) 46%, rgba(2, 4, 8, .84) 100%);
          }

          .rivotHeroContent {
            position: absolute;
            inset: 76px 22px 18px;
            display: flex;
            width: auto;
            max-width: none;
            margin: 0;
            padding: 0;
            flex-direction: column;
            overflow: visible;
          }

          .rivotEyebrow {
            max-width: 170px;
            font-size: 11px;
            line-height: 1.35;
            letter-spacing: .14em;
          }

          .rivotHero h1 {
            max-width: 100%;
            margin-top: 18px;
            font-size: clamp(44px, 17vw, 64px);
            line-height: .88;
            gap: 8px;
          }

          .rivotHero h2 {
            max-width: 185px;
            font-size: 15px;
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: .08em;
          }

          .rivotHeroCopy {
            display: none;
          }

          .rivotHeroMarks span {
            width: 10px;
            height: 30px;
          }

          .rivotHeroSpecs {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0;
            width: 100%;
            max-width: none;
            margin: auto 0 14px;
            padding: 0;
            border-top: 1px solid rgba(17, 17, 17, .1);
            border-bottom: 1px solid rgba(17, 17, 17, .1);
            background: rgba(255, 255, 255, .38);
            backdrop-filter: blur(10px);
          }

          .rivotHeroSpecs div {
            justify-content: center;
            min-height: 68px;
            padding: 9px 4px;
            border-left: 1px solid rgba(17, 17, 17, .11);
          }

          .rivotHeroSpecs div:first-child {
            border-left: 0;
          }

          .rivotSpecIcon {
            display: none;
          }

          .rivotSpecIcon svg {
            width: 21px;
            height: 21px;
          }

          .rivotHeroSpecs b {
            font-size: 13px;
            white-space: nowrap;
          }

          .rivotHeroSpecs small {
            margin-top: 3px;
            font-size: 9px;
            line-height: 1.15;
          }

          .rivotHeroButtons {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-bottom: 14px;
          }

          .rivotHeroPointers {
            left: 50%;
            right: auto;
            bottom: 194px;
            transform: translateX(-50%);
            gap: 6px;
          }

          .rivotHeroPointers button {
            width: 24px;
            height: 4px;
          }

          .rivotHeroPointers button.isActive {
            width: 32px;
          }

          .rivotTestRide,
          .rivotPriceBook {
            width: 100%;
            min-width: 0;
            min-height: 48px;
            padding: 0 12px;
            border-radius: 15px;
            font-size: 13px;
          }

          .rivotHeroNotes {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 5px 12px;
            margin-top: 0;
            padding: 0 1px;
            font-size: 10px;
            line-height: 1.25;
          }

          .rivotHeroNotes strong {
            grid-column: 1;
            font-size: 12px;
            line-height: 1.18;
          }

          .rivotHeroNotes span {
            max-width: 100%;
          }

          .rivotHeroNotes span:last-child {
            display: none;
          }

          .rivotKeyFeatures {
            padding: 38px 12px 72px;
          }

          .rivotKeyFeaturesShell {
            width: 100%;
            gap: 30px;
            padding: 26px 16px 18px;
            border-radius: 14px;
          }

          .rivotKeyFeaturesCopy {
            padding-inline: 2px;
          }

          .rivotKeyEyebrow {
            margin-bottom: 22px;
            gap: 10px;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: .24em;
          }

          .rivotKeyEyebrow span {
            width: 24px;
            height: 24px;
          }

          .rivotKeyFeaturesCopy h2 {
            max-width: 350px;
            font-size: clamp(30px, 8.6vw, 38px);
            font-weight: 900;
            line-height: .98;
            letter-spacing: -.055em;
            text-wrap: balance;
          }

          .rivotKeyAccent {
            width: 54px;
            height: 3px;
            margin: 20px 0 18px;
          }

          .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
            max-width: 310px;
            margin: 0;
            color: #454545;
            font-size: 14px;
            line-height: 1.5;
          }

          .rivotKeyArrow {
            display: none;
          }

          .rivotKeyCards {
            display: flex;
            gap: 14px;
            width: 100%;
            margin: 0;
            padding: 2px 0;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .rivotKeyCards::-webkit-scrollbar {
            display: none;
          }

          .rivotKeyCardContent {
            top: 24px;
            left: 20px;
            right: 18px;
            bottom: 20px;
          }

          .rivotKeyCard,
          .rivotKeyCard:hover {
            width: 100%;
            flex: 0 0 100%;
            aspect-ratio: 1 / .72;
            min-height: 240px;
            transform: none;
            scroll-snap-align: start;
          }

          .rivotKeyCardImage,
          .rivotKeyCard:hover .rivotKeyCardImage {
            transform: scale(1.04);
          }

          .rivotKeyCardContent {
            transform: none;
          }

          .rivotKeyCardPills {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
            gap: 8px;
          }

          .rivotKeyCard:nth-child(2) .rivotKeyCardPills {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rivotKeyCardPills small {
            width: 100%;
            min-height: 26px;
            padding: 5px 8px;
            font-size: 10px;
            line-height: 1.15;
            white-space: normal;
          }

          .rivotDesign {
            min-height: 0;
            grid-template-rows: auto auto auto;
            gap: clamp(22px, 6vw, 30px);
            align-content: start;
            padding: 48px 18px 34px;
          }

          .rivotDesignCopy h2 {
            width: 100%;
            max-width: 100%;
            margin-inline: auto;
            font-size: clamp(27px, 8vw, 34px);
            line-height: 1;
            letter-spacing: -.05em;
            text-align: center;
            white-space: nowrap;
          }

          .rivotDesignCopy h2 span {
            display: inline;
          }

          .rivotDesignCopy p {
            width: 100%;
            margin: 10px auto 0;
            font-size: clamp(12px, 3.6vw, 14px);
            text-align: center;
          }

          .rivotDesignCopy {
            width: 100%;
            max-width: 100%;
            text-align: center;
          }

          .rivotDesignScooter {
            width: 100%;
            min-width: 0;
            margin: 0;
          }

          .rivotDesignScooter .rivotRotationStage {
            width: 100%;
            min-width: 0;
            overflow: hidden;
          }

          .rivotDesignImage {
            width: min(100%, 520px);
            max-width: 100%;
            max-height: none;
            object-fit: contain;
          }

          .rivotDesignControls {
            position: static;
            width: min(100%, 340px);
            margin: 4px auto 0;
            justify-content: center;
            transform: none;
          }

          .rivotEngineering {
            display: block;
            padding: 54px 12px 52px;
          }

          .rivotEngineeringHeader {
            align-items: center;
            padding: 0 8px 30px;
            text-align: center;
          }

          .rivotEngineeringHeader p {
            margin-bottom: 12px;
            font-size: 11px;
          }

          .rivotEngineeringHeader h2 {
            font-size: clamp(34px, 10.5vw, 44px);
            line-height: .94;
          }

          .rivotEngineeringHeader small {
            max-width: 300px;
            margin-top: 18px;
            font-size: 14px;
          }

          .rivotEngineeringHeader i {
            margin-top: 20px;
          }

          .rivotEngineeringGrid {
            display: flex;
            width: 100%;
            gap: 12px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .rivotEngineeringGrid::-webkit-scrollbar {
            display: none;
          }

          .rivotEngineeringCard,
          .rivotEngineeringCard:nth-child(n + 4) {
            display: flex;
            width: calc((100% - 12px) / 2);
            min-height: clamp(240px, 72vw, 280px);
            flex: 0 0 calc((100% - 12px) / 2);
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 0;
            padding: 22px 12px;
            border-radius: 15px;
            text-align: center;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          .rivotEngineeringCard:nth-child(n + 4) {
            grid-template-columns: none;
          }

          .rivotEngineeringIcon {
            width: 42px;
            height: 42px;
            margin: 0 0 16px;
          }

          .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringIcon,
          .rivotEngineeringCard:nth-child(n + 4) h3,
          .rivotEngineeringCard:nth-child(n + 4) p,
          .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringStatus {
            grid-column: auto;
            grid-row: auto;
          }

          .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringIcon {
            margin: 0 0 16px;
          }

          .rivotEngineeringCard h3 {
            font-size: clamp(15px, 4.5vw, 18px);
          }

          .rivotEngineeringCard p,
          .rivotEngineeringCard:nth-child(n + 4) p {
            max-width: 145px;
            margin: 12px auto 0;
            font-size: 11px;
            line-height: 1.35;
          }

          .rivotEngineeringStatus,
          .rivotEngineeringCard:nth-child(n + 4) .rivotEngineeringStatus,
          .rivotEngineeringModes {
            margin-top: auto;
            padding-top: 18px;
            font-size: 11px;
          }

          .rivotEngineeringModes {
            gap: 5px;
          }

          .rivotEngineeringModes span {
            width: 18px;
            height: 18px;
            border-radius: 5px;
          }

          .rivotEngineeringModes span::after {
            width: 7px;
            height: 7px;
          }

          .rivotColorPicker {
            width: 100%;
            justify-content: center;
            padding: 17px 16px 13px;
            box-shadow: 0 14px 36px rgba(25, 34, 40, .12);
          }

          .rivotColorPicker p {
            top: -25px;
            font-size: 12px;
            font-weight: 800;
          }

          .rivotColorPicker div {
            width: 100%;
            justify-content: space-between;
            gap: 10px;
          }

          .rivotColorPicker button {
            width: clamp(30px, 9vw, 36px);
            height: clamp(30px, 9vw, 36px);
          }

          .rivotDesignDetails {
            padding: var(--section-open-gap) 12px var(--section-close-gap);
            min-height: auto;
          }

          .rivotDesignDetailsShell {
            height: auto;
            gap: 34px;
            padding: 32px 16px;
            border-radius: 18px;
          }

          .rivotDesignDetailsCopy {
            align-items: center;
            text-align: center;
          }

          .rivotDetailsEyebrow {
            margin-bottom: 14px;
            font-size: 12px;
          }

          .rivotDesignDetailsCopy h2 {
            font-size: clamp(36px, 11vw, 46px);
            line-height: .94;
          }

          .rivotDetailsIntro {
            max-width: 300px;
            margin: 16px auto 26px;
            font-size: 14px;
            line-height: 1.5;
          }

          .rivotDetailsList {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: none;
            gap: 12px;
            text-align: left;
          }

          .rivotDetailsList > div {
            grid-template-columns: 38px minmax(0, 1fr);
            gap: 9px;
            min-width: 0;
            padding: 10px;
            border-radius: 12px;
            background: rgba(255, 255, 255, .74);
            box-shadow: inset 0 0 0 1px rgba(17, 17, 17, .05);
          }

          .rivotDetailsList span {
            width: 36px;
            height: 36px;
          }

          .rivotDetailsList h3 {
            font-size: 12px;
          }

          .rivotDetailsList p {
            margin-top: 3px;
            font-size: 10px;
            line-height: 1.3;
          }

          .rivotDetailsCta {
            width: min(100%, 310px);
            margin-top: 24px;
          }

          .rivotDetailsMedia {
            display: flex;
            width: 100%;
            gap: 14px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .rivotDetailsMedia::-webkit-scrollbar {
            display: none;
          }

          .rivotDetailsSideStack {
            display: contents;
          }

          .rivotDetailsHeroPlaceholder,
          .rivotDetailsSmallPlaceholder {
            width: 100%;
            height: clamp(280px, 82vw, 340px);
            flex: 0 0 100%;
            min-height: 0;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          .rivotDetailsLanguage {
            left: 16px;
            top: 16px;
            max-width: calc(100% - 32px);
          }

          .rivotDetailsCaption {
            left: 16px;
            bottom: 18px;
            font-size: 10px;
          }

          .rivotDetailsSlider {
            left: 16px;
            bottom: 42px;
            width: min(210px, calc(100% - 32px));
          }

          .rivotDetailsMiniCaption {
            left: 14px;
            bottom: 14px;
            grid-template-columns: 30px minmax(0, 1fr);
            gap: 8px;
          }

          .rivotDetailsMiniCaption i {
            width: 28px;
            height: 28px;
          }

          .rivotPerformance {
            padding: 54px 12px 52px;
          }

          .rivotPerformanceShell {
            gap: 32px;
            padding: 26px 16px;
          }

          .rivotPerformanceCopy {
            text-align: center;
          }

          .rivotPerformanceEyebrow {
            margin-bottom: 14px;
            font-size: 12px;
            letter-spacing: .12em;
          }

          .rivotPerformanceCopy h2 {
            font-size: clamp(36px, 11vw, 46px);
            line-height: .94;
          }

          .rivotPerformanceCopy > p:not(.rivotPerformanceEyebrow) {
            max-width: 310px;
            margin: 18px auto 0;
            font-size: 14px;
            line-height: 1.5;
          }

          .rivotPerformanceAccent {
            width: 54px;
            margin: 22px auto 0;
          }

          .rivotPerformanceCards {
            display: flex;
            width: 100%;
            gap: 14px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .rivotPerformanceCards::-webkit-scrollbar {
            display: none;
          }

          .rivotPerformanceCard,
          .rivotPerformanceCard:hover {
            width: 100%;
            min-height: clamp(300px, 92vw, 360px);
            flex: 0 0 100%;
            transform: none;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          .rivotPerformancePlaceholder,
          .rivotPerformanceCardContent {
            transform: none;
          }

          .rivotPerformanceCardContent {
            inset: 24px 22px;
          }

          .rivotPerformanceCardContent p:first-child {
            margin-bottom: 34px;
            font-size: 11px;
          }

          .rivotPerformanceCardContent h3 {
            font-size: clamp(30px, 10vw, 40px);
          }

          .rivotPerformanceCardContent p:last-child {
            margin-top: 18px;
            font-size: 14px;
          }

          .rivotSafetyTech {
            padding: 24px 12px 36px;
          }

          .rivotSafetyTech {
            padding: 38px 14px 46px;
          }

          .rivotSafetyHeader h2 {
            font-size: 30px;
          }

          .rivotSafetyHeader span {
            max-width: 300px;
          }

          .rivotSafetyGrid {
            gap: 18px;
          }

          .rivotSafetyBackground {
            min-height: 235px;
          }

          .rivotSafetyList {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .rivotSafetyFeature,
          .rivotSafetyListRight .rivotSafetyFeature {
            min-height: 92px;
            padding: 14px;
            border-radius: 16px;
            background: rgba(255, 255, 255, .86);
            box-shadow: inset 0 0 0 1px rgba(15, 15, 15, .05);
          }

          .rivotSafetyRoundIcon {
            width: 52px;
            height: 52px;
          }

          .rivotSafetyRoundIcon svg {
            width: 28px;
            height: 28px;
          }

          .rivotAppConnect {
            padding: var(--section-open-gap) 14px var(--section-close-gap);
          }

          .rivotAppConnectIntro {
            font-size: 21px;
          }

          .rivotAppConnectIntro br {
            display: none;
          }

          .rivotAppConnectCards {
            gap: 12px;
          }

          .rivotAppConnectMenu {
            min-height: 330px;
            padding: 28px 22px;
          }

          .rivotAppConnectMenu b {
            font-size: 24px;
          }

          .rivotAppConnectMenu span {
            font-size: 22px;
          }

          .rivotAppPhoneCard {
            min-height: 420px;
            padding: 28px 16px 70px;
          }

          .rivotPhoneMockup {
            width: min(58%, 190px);
            min-width: 166px;
          }

          .rivotRidePhoneCard .rivotPhoneMockup {
            width: min(100%, 258px);
            min-width: 0;
            padding: 12px 12px 10px;
            border-radius: 32px;
          }

          .rivotRidePhoneCard {
            width: min(100%, 336px);
            padding: 0;
          }

          .rivotRidePhoneCard::before {
            display: none;
          }

          .rivotRideInsightPhoto {
            width: min(78vw, 276px);
            border-radius: 0;
            box-shadow: none;
          }

          .rivotAppConnectCopy h2 {
            font-size: clamp(32px, 10vw, 44px);
          }

          .rivotAppLead br {
            display: none;
          }

          .rivotRideInsightList {
            grid-template-columns: 1fr;
            margin-top: 22px;
          }

          .rivotRideInsightList > button {
            grid-template-columns: 34px minmax(0, 1fr) 16px;
            min-height: 44px;
            padding: 7px 10px;
          }

          .rivotPhoneHeader > b {
            font-size: 15px;
          }

          .rivotPhoneChart {
            height: 112px;
          }

          .rivotPhoneMetrics b,
          .rivotPhoneSummary b,
          .rivotPhoneCard b {
            font-size: 13px;
          }

          .rivotRidePhoneCard .rivotPhoneCard {
            margin-top: 14px;
          }

          .rivotAppHand {
            width: 38%;
            height: 66%;
          }

          .rivotAppHandLeft {
            left: 5%;
          }

          .rivotAppHandRight {
            right: 4%;
          }

          .rivotAppPhoneCard > p {
            bottom: 40px;
            font-size: 11px;
          }

          .rivotReach {
            padding: 40px 12px 48px;
          }

          .rivotReachPanel {
            gap: 18px;
            padding-top: 0;
            background: transparent;
          }

          .rivotReachCard {
            grid-template-columns: 1fr;
            min-height: auto;
            border: 0;
            border-radius: 18px;
            box-shadow: 0 16px 38px rgba(17, 17, 17, .09);
          }

          .rivotReachStore,
          .rivotReachCharge {
            border-radius: 18px;
          }

          .rivotReachCharge {
            border-left: 0;
          }

          .rivotReachCopy {
            align-items: center;
            padding: 26px 22px 28px;
            text-align: center;
          }

          .rivotReachIcon {
            width: 42px;
            height: 42px;
            margin-bottom: 13px;
          }

          .rivotReachCopy > p {
            margin-bottom: 12px;
            font-size: 12px;
          }

          .rivotReachCopy h2 {
            font-size: clamp(32px, 10vw, 42px);
            line-height: .94;
          }

          .rivotReachCopy h2 br {
            display: none;
          }

          .rivotReachCopy small {
            max-width: 285px;
            margin-top: 14px;
            font-size: 14px;
            line-height: 1.5;
          }

          .rivotReachArrow {
            width: auto;
            min-width: 170px;
            height: 50px;
            margin-top: 20px;
            padding: 0 14px 0 20px;
          }

          .rivotReachArrow b {
            font-size: 13px;
          }

          .rivotReachMedia {
            min-height: clamp(210px, 64vw, 260px);
            margin: 0;
            border-radius: 17px 17px 0 0;
            clip-path: none;
            order: -1;
          }

          .rivotBestFit {
            padding: 56px 12px 48px;
          }

          .rivotBestFitHeader h2 {
            max-width: 330px;
            margin-inline: auto;
            font-size: clamp(32px, 9.5vw, 40px);
            line-height: .98;
            text-wrap: balance;
          }

          .rivotBestFitHeader p {
            margin-top: 10px;
            font-size: 14px;
          }

          .rivotBestFitGrid {
            width: 100%;
            gap: 16px;
            margin-top: 30px;
          }

          .rivotBestFitCard {
            width: 100%;
            min-height: 340px;
            padding: 30px 18px 26px;
            border-radius: 16px;
          }

          .rivotBestFitCard h3 {
            font-size: clamp(25px, 8vw, 31px);
          }

          .rivotBestFitCard > p:not(.rivotBestFitEyebrow) {
            max-width: 275px;
            font-size: 13px;
          }

          .rivotBestFitEyebrow {
            font-size: 11px;
            letter-spacing: .34em;
          }

          .rivotAccessoryTiles {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            width: 100%;
            padding-top: 28px;
          }

          .rivotAccessoryTiles span {
            height: clamp(76px, 23vw, 90px);
          }

          .rivotBestFitDisabled,
          .rivotBestFitCta {
            min-width: 152px;
            min-height: 46px;
            margin-top: 28px;
            font-size: 14px;
          }

          .rivotBestFitShield {
            margin-bottom: 26px;
          }

          .rivotBestFitSubscription {
            min-height: 340px;
            padding: 26px 18px 28px;
          }

          .rivotBestFitSubscription .rivotBestFitShield {
            width: 82px;
            height: 82px;
            margin: auto 0 24px;
          }

        }

        .rivotHero .rivotEyebrow,
        .rivotHero .rivotHeroTitle,
        .rivotHero h2,
        .rivotHero .rivotHeroCopy,
        .rivotHero .rivotHeroSpecs {
          display: none !important;
        }

        .rivotHero .rivotHeroImage {
          opacity: 0 !important;
          z-index: 0;
          transform: translate3d(100%, 0, 0) scale(1.01) !important;
          object-position: center center !important;
          transition: transform 1.05s cubic-bezier(.72, 0, .2, 1), opacity .72s ease !important;
          will-change: transform, opacity;
        }

        .rivotHero .rivotHeroImage.isPrevious {
          opacity: 0 !important;
          z-index: 1;
          transform: translate3d(-100%, 0, 0) scale(1.01) !important;
        }

        .rivotHero.isReverse .rivotHeroImage {
          transform: translate3d(-100%, 0, 0) scale(1.01) !important;
        }

        .rivotHero.isReverse .rivotHeroImage.isPrevious {
          transform: translate3d(100%, 0, 0) scale(1.01) !important;
        }

        .rivotHero .rivotHeroImage.isActive {
          opacity: 1 !important;
          z-index: 2;
          transform: translate3d(0, 0, 0) scale(1) !important;
        }

        .rivotHero .rivotHeroContent {
          position: absolute !important;
          z-index: 4 !important;
          left: 50% !important;
          right: auto !important;
          top: auto !important;
          bottom: clamp(42px, 7vh, 68px) !important;
          display: flex !important;
          width: min(92vw, 430px) !important;
          max-width: none !important;
          flex-direction: column !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
          text-align: center !important;
          transform: translateX(-50%) !important;
        }

        .rivotHero .rivotHeroShade,
        html[data-rivot-theme="light"] .rivotHero .rivotHeroShade,
        html[data-theme="light"] .rivotHero .rivotHeroShade,
        html[data-rivot-theme="dark"] .rivotHero .rivotHeroShade,
        html[data-theme="dark"] .rivotHero .rivotHeroShade {
          z-index: 3;
          background:
            linear-gradient(180deg, rgba(2, 4, 8, .26) 0%, rgba(2, 4, 8, .1) 42%, rgba(2, 4, 8, .84) 100%) !important,
            linear-gradient(90deg, rgba(2, 4, 8, .22) 0%, rgba(2, 4, 8, 0) 52%, rgba(2, 4, 8, .22) 100%) !important;
        }

        .rivotHero .rivotHeroNotes {
          order: 1 !important;
          justify-content: center !important;
          margin: 0 !important;
          color: rgba(255, 255, 255, .82) !important;
          text-align: center !important;
        }

        .rivotHero .rivotHeroNotes strong {
          color: #fff !important;
          font-size: clamp(24px, 2.5vw, 32px) !important;
          text-shadow: 0 5px 24px rgba(0, 0, 0, .72);
        }

        .rivotHero .rivotHeroButtons {
          display: flex !important;
          order: 2 !important;
          justify-content: center !important;
          width: 100% !important;
          margin-top: 18px !important;
        }

        .rivotHero .rivotHeroPointers {
          position: static !important;
          display: flex !important;
          order: 3 !important;
          justify-content: center !important;
          width: 100% !important;
          margin-top: 18px !important;
          transform: none !important;
        }

        .rivotHero .rivotHeroPointers button {
          width: 44px !important;
          height: 4px !important;
          border-radius: 999px !important;
          padding: 0 !important;
          border: 0 !important;
          background: rgba(255, 255, 255, .34) !important;
          cursor: pointer !important;
        }

        .rivotHero .rivotHeroPointers button.isActive {
          width: 58px !important;
          background: rgba(255, 255, 255, .92) !important;
        }

        .rivotHero .rivotPriceBook,
        .rivotHero .rivotTestRide {
          min-width: 154px !important;
          min-height: 46px !important;
          width: auto !important;
          border-radius: 999px !important;
        }

        .rivotHero .rivotTestRide {
          border-color: rgba(255, 255, 255, .68) !important;
          background: rgba(255, 255, 255, .08) !important;
          color: #fff !important;
          box-shadow: none !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
        }

        .rivotHero .rivotTestRide:hover,
        .rivotHero .rivotTestRide:focus-visible {
          border-color: #fff !important;
          background: rgba(255, 255, 255, .16) !important;
          color: #fff !important;
        }

        .rivotHero .rivotHeroNotes strong {
          animation: rivotHeroTextReveal .8s cubic-bezier(.22, 1, .36, 1) .18s both;
        }

        .rivotHero .rivotHeroSubLine {
          animation: rivotHeroTextReveal .8s cubic-bezier(.22, 1, .36, 1) .34s both;
        }

        .rivotHero .rivotHeroButtons {
          animation: rivotHeroActionsReveal .78s cubic-bezier(.22, 1, .36, 1) .5s both;
        }

        .rivotHero .rivotHeroPointers {
          animation: rivotHeroTextReveal .7s ease .68s both;
        }

        @keyframes rivotHeroTextReveal {
          from {
            opacity: 0;
            filter: blur(7px);
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes rivotHeroActionsReveal {
          from {
            opacity: 0;
            transform: translateY(24px) scale(.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotHero .rivotHeroImage,
          .rivotHero .rivotHeroNotes strong,
          .rivotHero .rivotHeroSubLine,
          .rivotHero .rivotHeroButtons,
          .rivotHero .rivotHeroPointers {
            animation: none !important;
          }

          .rivotHero .rivotHeroImage {
            transition: opacity .01s linear !important;
          }

          .rivotHero .rivotHeroImage.isPrevious,
          .rivotHero.isReverse .rivotHeroImage.isPrevious {
            transform: translate3d(0, 0, 0) !important;
          }
        }

        @media (max-width: 700px) {
          .rivotHero {
            height: 100svh !important;
            min-height: 620px !important;
            margin: 0 !important;
            background: #05070a !important;
          }

          .rivotHero .rivotHeroImage {
            object-position: center center !important;
          }

          .rivotHero .rivotHeroShade {
            background:
              linear-gradient(180deg, rgba(2, 4, 8, .16) 0%, rgba(2, 4, 8, .06) 42%, rgba(2, 4, 8, .82) 100%) !important,
              linear-gradient(90deg, rgba(2, 4, 8, .22) 0%, rgba(2, 4, 8, 0) 52%, rgba(2, 4, 8, .22) 100%) !important;
          }

          .rivotHero .rivotHeroContent {
            left: clamp(18px, 5vw, 34px) !important;
            right: clamp(18px, 5vw, 34px) !important;
            bottom: max(24px, env(safe-area-inset-bottom)) !important;
            width: auto !important;
            transform: none !important;
          }

          .rivotHero .rivotHeroNotes {
            display: flex !important;
            width: 100% !important;
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: clamp(5px, 1.8vw, 8px) clamp(8px, 2.8vw, 12px) !important;
            color: rgba(255, 255, 255, .9) !important;
            font-size: clamp(12px, 3.1vw, 16px) !important;
            line-height: 1.22 !important;
            text-align: left !important;
          }

          .rivotHero .rivotHeroNotes strong {
            flex: 0 0 100% !important;
            font-size: clamp(30px, 7.5vw, 42px) !important;
            line-height: 1.02 !important;
            letter-spacing: 0 !important;
          }

          .rivotHero .rivotHeroSubLine {
            display: inline-flex !important;
            align-items: center !important;
            gap: 10px !important;
            white-space: nowrap !important;
          }

          .rivotHero .rivotHeroSubLine i {
            font-style: normal !important;
            color: rgba(255, 255, 255, .8) !important;
          }

          .rivotHero .rivotHeroButtons {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: clamp(10px, 3.5vw, 16px) !important;
            margin-top: clamp(18px, 5vw, 28px) !important;
          }

          .rivotHero .rivotPriceBook,
          .rivotHero .rivotTestRide {
            min-width: 0 !important;
            min-height: clamp(52px, 13vw, 64px) !important;
            padding: 0 clamp(12px, 3.4vw, 18px) !important;
            font-size: clamp(18px, 4.9vw, 24px) !important;
            font-weight: 900 !important;
          }

          .rivotHero .rivotPriceBook {
            background: #fff !important;
            color: #0b0d12 !important;
            border-color: #fff !important;
          }

          .rivotHero .rivotTestRide {
            background: rgba(255, 255, 255, .04) !important;
            color: #fff !important;
            border-color: rgba(255, 255, 255, .9) !important;
          }

          .rivotHero .rivotHeroPointers {
            margin-top: clamp(20px, 5vw, 28px) !important;
            gap: clamp(8px, 2.5vw, 12px) !important;
          }

          .rivotHero .rivotHeroPointers button {
            width: clamp(30px, 10vw, 50px) !important;
            height: clamp(4px, 1.4vw, 7px) !important;
            background: rgba(255, 255, 255, .32) !important;
          }

          .rivotHero .rivotHeroPointers button.isActive {
            width: clamp(38px, 12vw, 58px) !important;
            background: rgba(255, 255, 255, .95) !important;
          }
        }

        @media (max-width: 430px) {
          .rivotHero .rivotHeroImage {
            object-position: center center !important;
          }

          .rivotHero .rivotHeroContent {
            left: 18px !important;
            right: 18px !important;
            bottom: max(22px, env(safe-area-inset-bottom)) !important;
          }

          .rivotHero .rivotHeroNotes strong {
            font-size: clamp(26px, 8.2vw, 34px) !important;
          }

          .rivotHero .rivotHeroNotes {
            font-size: clamp(12px, 3.4vw, 14px) !important;
          }

          .rivotHero .rivotHeroSubLine {
            gap: 8px !important;
          }
        }

        @media (max-width: 360px) {
          .rivotHero .rivotHeroContent {
            left: 14px !important;
            right: 14px !important;
          }

          .rivotHero .rivotPriceBook,
          .rivotHero .rivotTestRide {
            min-height: 50px !important;
            font-size: 16px !important;
          }
        }

        @media (max-width: 700px) and (max-height: 720px) {
          .rivotHero {
            min-height: 580px !important;
          }

          .rivotHero .rivotHeroContent {
            bottom: 18px !important;
          }

          .rivotHero .rivotHeroNotes strong {
            font-size: clamp(26px, 7.5vw, 36px) !important;
          }

          .rivotHero .rivotHeroNotes {
            font-size: clamp(12px, 3.2vw, 15px) !important;
          }

          .rivotHero .rivotPriceBook,
          .rivotHero .rivotTestRide {
            min-height: 48px !important;
            font-size: 16px !important;
          }

          .rivotHero .rivotHeroButtons,
          .rivotHero .rivotHeroPointers {
            margin-top: 14px !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) and (max-height: 520px) {
          .rivotHero {
            min-height: 520px !important;
          }

          .rivotHero .rivotHeroContent {
            left: 50% !important;
            right: auto !important;
            bottom: 20px !important;
            width: min(86vw, 520px) !important;
            transform: translateX(-50%) !important;
          }

          .rivotHero .rivotHeroNotes {
            justify-content: center !important;
            text-align: center !important;
          }

          .rivotHero .rivotHeroButtons {
            width: min(100%, 420px) !important;
            margin-inline: auto !important;
          }
        }

        /* Image-led shop cards. */
        .rivotBestFit {
          min-height: calc(100svh - 88px);
          display: flex;
          align-items: center;
          padding: clamp(22px, 3vh, 32px) clamp(16px, 4vw, 48px);
        }

        .rivotBestFitShell {
          width: min(100%, 1320px);
        }

        .rivotBestFitHeader h2 {
          font-size: clamp(32px, 3.2vw, 44px);
        }

        .rivotBestFitHeader p {
          margin-top: 8px;
        }

        .rivotBestFitGrid {
          margin-top: clamp(22px, 3vh, 32px);
        }

        .rivotBestFitCard,
        .rivotBestFitSubscription {
          height: clamp(390px, calc(100svh - 285px), 470px);
          min-height: 0;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(28px, 2.5vw, 40px);
          border: 0;
          border-radius: 14px;
          background: #111313;
          text-align: center;
          isolation: isolate;
        }

        .rivotBestFitCard::before,
        .rivotBestFitAccessories::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(5, 7, 8, .76) 0%, rgba(5, 7, 8, .42) 25%, rgba(5, 7, 8, .1) 52%, rgba(5, 7, 8, .62) 78%, rgba(5, 7, 8, .96) 100%);
          pointer-events: none;
        }

        .rivotBestFitCardImage {
          z-index: 0;
          object-fit: cover;
          object-position: center;
          transition: transform .6s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotBestFitCard:hover .rivotBestFitCardImage {
          transform: scale(1.035);
        }

        .rivotBestFitCard > *:not(.rivotBestFitCardImage) {
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 14px rgba(0, 0, 0, .72);
        }

        .rivotBestFitCard .rivotBestFitEyebrow,
        .rivotBestFitSubscription .rivotBestFitEyebrow {
          margin: 0 0 12px;
          font-size: 12px;
          line-height: 1.1;
        }

        .rivotBestFitCard h3,
        .rivotBestFitSubscription h3 {
          font-size: clamp(28px, 2.1vw, 36px);
          letter-spacing: -.045em;
        }

        .rivotBestFitCard > p:not(.rivotBestFitEyebrow),
        .rivotBestFitSubscription > p:not(.rivotBestFitEyebrow) {
          max-width: 330px;
          margin-top: 8px;
          color: rgba(255,255,255,.78);
          font-size: clamp(14px, 1vw, 16px);
          line-height: 1.35;
          text-align: center;
        }

        .rivotBestFitCard .rivotBestFitCta,
        .rivotBestFitSubscription .rivotBestFitCta {
          min-width: 0;
          min-height: 52px;
          margin-top: auto;
          padding: 0 28px;
          border-radius: 12px;
          font-size: 15px;
        }

        .rivotBestFitAnimated .rivotBestFitHeader > *,
        .rivotBestFitAnimated .rivotBestFitCard {
          opacity: 0;
          filter: blur(7px);
          transform: translateY(34px);
          will-change: opacity, transform, filter;
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitHeader > *,
        .rivotBestFitAnimated.isVisible .rivotBestFitCard {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitHeader h2 {
          transition: opacity .8s ease .06s, transform .85s cubic-bezier(.16, 1, .3, 1) .06s, filter .75s ease .06s;
          animation: rivotBestFitHeadline .9s cubic-bezier(.16, 1, .3, 1) .06s both;
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitHeader p {
          transition: opacity .7s ease .2s, transform .75s cubic-bezier(.22, 1, .36, 1) .2s, filter .7s ease .2s;
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitCard {
          transition: opacity .8s ease, transform .9s cubic-bezier(.16, 1, .3, 1), filter .75s ease;
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(1) { transition-delay: .3s; }
        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(2) { transition-delay: .45s; }
        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(3) { transition-delay: .6s; }

        .rivotBestFitAnimated .rivotBestFitCard > *:not(.rivotBestFitCardImage) {
          opacity: 0;
          filter: blur(5px);
          transform: translateY(18px);
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitCard > *:not(.rivotBestFitCardImage) {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
          transition: opacity .65s ease, transform .72s cubic-bezier(.22, 1, .36, 1), filter .65s ease;
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(1) > *:not(.rivotBestFitCardImage) { transition-delay: .5s; }
        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(2) > *:not(.rivotBestFitCardImage) { transition-delay: .65s; }
        .rivotBestFitAnimated.isVisible .rivotBestFitCard:nth-child(3) > *:not(.rivotBestFitCardImage) { transition-delay: .8s; }

        .rivotBestFitAnimated .rivotBestFitCardImage {
          filter: saturate(.72) blur(4px);
          transform: scale(1.08);
        }

        .rivotBestFitAnimated.isVisible .rivotBestFitCardImage {
          filter: saturate(1) blur(0);
          transform: scale(1);
          transition: filter 1s ease, transform 1.1s cubic-bezier(.16, 1, .3, 1);
        }

        @keyframes rivotBestFitHeadline {
          from { letter-spacing: -.075em; }
          to { letter-spacing: -.045em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotBestFitAnimated .rivotBestFitHeader > *,
          .rivotBestFitAnimated .rivotBestFitCard,
          .rivotBestFitAnimated .rivotBestFitCard > *,
          .rivotBestFitAnimated .rivotBestFitCardImage {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 1000px) {
          .rivotBestFit {
            min-height: 0;
            display: block;
            padding: clamp(58px, 8vw, 88px) clamp(16px, 4vw, 48px);
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            width: min(100%, 620px);
            margin-inline: auto;
          }

          .rivotBestFitCard,
          .rivotBestFitSubscription {
            height: clamp(430px, 76vw, 540px);
            min-height: clamp(430px, 76vw, 540px);
          }
        }

        @media (max-width: 560px) {
          .rivotBestFitCard,
          .rivotBestFitSubscription {
            height: 430px;
            min-height: 430px;
            padding: 26px 22px;
            border-radius: 12px;
          }

          .rivotBestFitCard .rivotBestFitCta,
          .rivotBestFitSubscription .rivotBestFitCta {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
