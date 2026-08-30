"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import heroFeatureDark from "@/asset/images/Hero/1 (3).png";
import heroFeatureLight from "@/asset/images/Hero/3 (3).png";
import heroFeatureStudio from "@/asset/images/Hero/ChatGPT Image Aug 26, 2026, 03_15_38 PM.png";
import heroFolderMain from "@/asset/images/Hero/Hero.png";
import heroFolderDark from "@/asset/images/Hero/Hero1.png";
import heroFolderLight from "@/asset/images/Hero/Hero2.png";
import diagnosticsAppImage from "@/asset/images/App/Diagnostics (2).png";
import flashChargingAppImage from "@/asset/images/App/Flash Charging.png";
import geofencingAppImage from "@/asset/images/App/Geofencing.png";
import tpmsAppImage from "@/asset/images/App/TPMS (Tire Pressure Monitoring System).png";
import tripInsightsAppImage from "@/asset/images/App/Trip Insights.png";
import accelerationImage from "@/asset/images/last/accelaration.png";
import rangeImage from "@/asset/images/last/IDC Range.png";
import showroomImage from "@/asset/images/last/Showroom.avif";
import chargerImage from "@/asset/images/last/Charger.png";
import discImage from "@/asset/images/last/Disc.png";
import monoshockImage from "@/asset/images/last/Monoshock.png";
import motorImage from "@/asset/images/last/Motor-card.jpg";
import riderAssistanceImage from "@/asset/images/Key features/Riderasistance.png";
import featureImage from "@/asset/images/Key features/Feature.png";
import safetyImage from "@/asset/images/Key features/Safeaty.png";
import bootDetailImage from "@/asset/images/Details/Boot space with helmet.png";
import floorboardDetailImage from "@/asset/images/Details/Floorboard photo.png";
import mainDetailImage from "@/asset/images/Details/Main detail photo.png";
import { DashboardRotation } from "@/components/DashboardRotation";
import { Faqs } from "@/components/Faqs";
import { SafetyTech } from "@/components/SafetyTech";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { ScooterRotation } from "@/components/ScooterRotation";

const keyFeatures = [
  {
    number: "01",
    title: "Smart Riding",
    image: riderAssistanceImage,
    alt: "RIVOT rider assistance control close-up",
    pills: ["Boost Mode", "Ride cam", "comfortKey", "cruiseControl",],
  },
  {
    number: "02",
    title: "Built-In Innovation",
    image: featureImage,
    alt: "RIVOT NX100 front feature close-up",
    pills: ["recoEngine", "APU", "Compact Boot", "compact Charger(OBC)"],
  },
  {
    number: "03",
    title: "Advanced Safety",
    image: safetyImage,
    alt: "RIVOT safety switch close-up",
    pills: ["alerTire", "Roll Protecter", "Anti Theft", "Voice Alert"],
  },
];

const engineeringFeatures = [
  {
    title: "Boost Mode",
    copy: "Feel the surge of peak power.",
    status: "GO",
    statusTone: "multi",
    icon: "bolt",
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

const heroCarouselImages = [
  heroFeatureDark,
  heroFeatureLight,
  heroFeatureStudio,
  heroFolderMain,
  heroFolderDark,
  heroFolderLight,
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
  const [selectedRideInsight, setSelectedRideInsight] = useState(2);
  const [selectedHeroImage, setSelectedHeroImage] = useState(0);

  useEffect(() => {
    const heroImageInterval = window.setInterval(() => {
      setSelectedHeroImage((currentImage) => (currentImage + 1) % heroCarouselImages.length);
    }, 5000);

    return () => window.clearInterval(heroImageInterval);
  }, []);

  return (
    <>
      <section className="rivotHero">
        {heroCarouselImages.map((heroImage, index) => (
          <Image
            src={heroImage}
            alt={index === 0 ? "Rivot NX100 hero image" : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`rivotHeroImage${index === selectedHeroImage ? " isActive" : ""}`}
            key={heroImage.src}
          />
        ))}
        <div className="rivotHeroShade" aria-hidden="true" />
        <div className="rivotHeroPointers" aria-hidden="true">
          {heroCarouselImages.map((heroImage, index) => (
            <span
              className={index === selectedHeroImage ? "isActive" : ""}
              key={`pointer-${heroImage.src}`}
            />
          ))}
        </div>

        <div className="rivotHeroContent">
          <p className="rivotEyebrow">Meet the future</p>
          <h1 className="rivotHeroTitle">
            <span>NX100</span>
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
    <small>Flash Charge</small>
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
              Book Now <span aria-hidden="true">{"\u2192"}</span>
            </Link>
            <Link href="/book-now" className="rivotTestRide">
              Test Ride <span aria-hidden="true">{"\u2192"}</span>
            </Link>
          </div>

          <div className="rivotHeroNotes">
            <strong>Starting at just ₹1,29,000*</strong>
            <span>EMI starting at Rs 3,999/month*</span>
            <span>Easy Financing Options</span>
          </div>
        </div>
      </section>

      <section className="rivotKeyFeatures" aria-labelledby="key-features-title">
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
            <h2 id="key-features-title">
              Technology
              <br />
              that keeps you
              <br />
              ahead.
            </h2>
            <span className="rivotKeyAccent" aria-hidden="true" />
            <p>The features that set RIVOT apart.</p>
            <button className="rivotKeyArrow" type="button" aria-label="Explore all features">
              <span aria-hidden="true">{"\u2192"}</span>
            </button>
          </div>

          <div className="rivotKeyCards">
            {keyFeatures.map((feature) => (
              <article className="rivotKeyCard" key={feature.number}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
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

      <section className="rivotDesign" id="design" aria-labelledby="design-title">
        <div className="rivotDesignCopy">
          <h2 id="design-title">Designed Different.</h2>
          <p>A form built with purpose.</p>
        </div>

        <div className="rivotDesignScooter">
          <ScooterRotation className="rivotDesignImage" />
        </div>

        <div className="rivotDesignControls" aria-label="Scooter color options">
          <div className="rivotColorPicker" aria-label="Color option">
            <p>Sonic Grey</p>
            <div>
              <button type="button" className="active colorGrey" aria-label="Sonic Grey" />
              <button type="button" className="colorBlack" aria-label="Black" />
              <button type="button" className="colorBlue" aria-label="Blue Grey" />
              <button type="button" className="colorWhite" aria-label="White" />
              <button type="button" className="colorGraphite" aria-label="Graphite" />
            </div>
          </div>
        </div>
      </section>

      <section className="rivotDesignDetails" aria-labelledby="design-details-title">
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
              <div>
                <span aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M20 7L32 17L20 33L8 17L20 7Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M8 17H32M15 17L20 33L25 17M14 17L20 7L26 17" stroke="#ef7430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3>Premium Finish</h3>
                  <p>Meticulous attention to detail.</p>
                </div>
              </div>
            </div>

            <button className="rivotDetailsCta" type="button">
              Explore Design <span aria-hidden="true">{"\u2192"}</span>
            </button>
          </div>

          <div className="rivotDetailsMedia">
            <div className="rivotDetailsHeroPlaceholder">
              <Image
                src={mainDetailImage}
                alt="RIVOT scooter main design detail"
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
              <span className="rivotDetailsCaption">Main detail</span>
            </div>
            <div className="rivotDetailsSideStack">
              <div className="rivotDetailsSmallPlaceholder">
                <Image
                  src={bootDetailImage}
                  alt="RIVOT scooter boot space with helmet"
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
                    <b>Boot detail</b>
                    <small>Generous space for your essentials.</small>
                  </div>
                </div>
              </div>
              <div className="rivotDetailsSmallPlaceholder">
                <Image
                  src={floorboardDetailImage}
                  alt="RIVOT scooter floorboard detail"
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
                    <b>APU</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rivotPerformance" aria-labelledby="performance-title">
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

          <div className="rivotPerformanceCards">
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
                  src={rangeImage}
                  alt="RIVOT scooter for long range riding"
                  fill
                  sizes="(max-width: 900px) 100vw, 28vw"
                  className="rivotPerformancePhoto"
                />
              </div>
              <div className="rivotPerformanceCardShade" aria-hidden="true" />
              <div className="rivotPerformanceCardContent">
                <p>Range</p>
                <h3>
                  200 km
                  <br />
                  <span>IDC Range</span>
                </h3>
                <p>Go further. Explore more.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <DashboardRotation />

      <section className="rivotAppConnect" aria-labelledby="app-connect-title">
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
                  {index === 0 ? <em aria-hidden="true">{"\u203A"}</em> : null}
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

      <section className="rivotEngineering" aria-labelledby="engineering-title">
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

        <div className="rivotEngineeringGrid">
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

      <section className="rivotReach" aria-label="RIVOT access network">
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
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src={showroomImage} alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
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
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </div>
            <div className="rivotReachMedia" aria-hidden="true">
              <Image src={chargerImage} alt="" fill sizes="(max-width: 900px) 100vw, 390px" />
            </div>
          </article>

        </div>
      </section>

      <section className="rivotBestFit" aria-labelledby="best-fit-title">
        <div className="rivotBestFitShell">
          <div className="rivotBestFitHeader">
            <h2 id="best-fit-title">A best fit for your Scooter</h2>
            <p>There's more under the hood.</p>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard rivotBestFitAccessories">
              <p className="rivotBestFitEyebrow">Shop</p>
              <h3>Accessories</h3>
              <p>There's more under the hood.</p>

              <div className="rivotAccessoryTiles" aria-label="Accessory preview">
                <span>
                  <i className="rivotAccessoryPart rivotAccessoryGuard" aria-hidden="true" />
                </span>
                <span>
                  <i className="rivotAccessoryPart rivotAccessoryPanel" aria-hidden="true" />
                </span>
                <span>
                  <i className="rivotAccessoryPart rivotAccessoryGrip" aria-hidden="true" />
                </span>
              </div>

              <Link href="/merchandise" className="rivotBestFitCta">
                Shop accessories <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </article>

            <article className="rivotBestFitCard">
              <p className="rivotBestFitEyebrow rivotBestFitGreen">Extended Warranty</p>
              <h3>Battery+Motor</h3>

              <span className="rivotBestFitShield rivotBestFitShieldGreen" aria-hidden="true">
                <svg viewBox="0 0 72 72" fill="none">
                  <path d="M36 7L62 17V34C62 51.4 51.42 62.72 36 68C20.58 62.72 10 51.4 10 34V17L36 7Z" fill="currentColor" opacity=".16" />
                  <path d="M36 16L53 22.4V34.8C53 47.02 46.28 55.4 36 60C25.72 55.4 19 47.02 19 34.8V22.4L36 16Z" fill="currentColor" />
                  <path d="M31.4 40.3L27 35.9L23.5 39.4L31.4 47.3L48.8 29.9L45.3 26.4L31.4 40.3Z" fill="#fff" />
                  <path d="M48 18V13M48 18H53M23 54V50M23 54H27" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
                </svg>
              </span>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>

            <article className="rivotBestFitCard">
              <p className="rivotBestFitEyebrow rivotBestFitBlue">Subscription</p>
              <h3>Simple SuperPack</h3>
              <p>Extended Warranty &amp; Care for your Simple Scooters.</p>

              <span className="rivotBestFitShield rivotBestFitShieldBlue" aria-hidden="true">
                <svg viewBox="0 0 72 72" fill="none">
                  <path d="M36 7L62 17V34C62 51.4 51.42 62.72 36 68C20.58 62.72 10 51.4 10 34V17L36 7Z" fill="currentColor" opacity=".15" />
                  <path d="M36 16L53 22.4V34.8C53 47.02 46.28 55.4 36 60C25.72 55.4 19 47.02 19 34.8V22.4L36 16Z" fill="currentColor" />
                  <path d="M36 45.8L25.8 36.4C20.1 30.9 28.1 22.9 33.8 28.4L36 30.5L38.2 28.4C43.9 22.9 51.9 30.9 46.2 36.4L36 45.8Z" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M51 20V15M51 20H56" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
                </svg>
              </span>

              <Link href="/products" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Faqs />

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
        text-transform: uppercase;
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
        .rivotHero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  margin-top: 0;

  display: flex;
  align-items: flex-start;
  overflow: hidden;

  background: #0d1017;
  color: #fff;
}

        .rivotHeroImage {
          object-fit: cover;
          object-position: 68% center;
          opacity: 0;
          transform: scale(1.06);
          transition: opacity 1s ease, transform 6s ease;
        }

        .rivotHeroImage.isActive {
          opacity: 1;
          transform: scale(1.035);
        }

        .rivotHeroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(1, 3, 5, .98) 0%, rgba(1, 3, 5, .86) 31%, rgba(1, 3, 5, .28) 54%, rgba(1, 3, 5, .16) 72%, rgba(1, 3, 5, .45) 100%),
            linear-gradient(180deg, rgba(1, 3, 5, .34) 0%, rgba(1, 3, 5, .04) 42%, rgba(1, 3, 5, .72) 100%);
        }

        html[data-rivot-theme="light"] .rivotHeroShade {
          background:
            linear-gradient(90deg, rgba(255,255,255,.98) 0%, rgba(255,255,255,.8) 32%, rgba(255,255,255,.16) 58%, rgba(255,255,255,.04) 100%),
            linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.02) 52%, rgba(255,255,255,.62) 100%);
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
          color: #111;
          border-color: rgba(17,17,17,.28);
          background: rgba(255,255,255,.42);
        }

        .rivotHeroPointers {
          position: absolute;
          right: clamp(54px, 7vw, 132px);
          bottom: clamp(46px, 7vh, 76px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .rivotHeroPointers span {
          display: block;
          width: clamp(48px, 4.2vw, 76px);
          height: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .34);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .32);
          transition: background .35s ease, width .35s ease, opacity .35s ease;
        }

        .rivotHeroPointers span.isActive {
          width: clamp(58px, 5vw, 88px);
          background: rgba(255, 255, 255, .94);
        }

        html[data-rivot-theme="light"] .rivotHeroPointers span {
          background: rgba(255, 255, 255, .42);
        }

        html[data-rivot-theme="light"] .rivotHeroPointers span.isActive {
          background: #fff;
        }

.rivotHeroContent {
  position: relative;
  z-index: 1;
  width: min(50vw, 680px);
  margin-top: clamp(105px, 12vh, 125px);
  margin-left: clamp(48px, 3.2vw, 62px);
  text-align: left;
  text-shadow: none;
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
          justify-content: flex-start;
          gap: 18px;
        }

        .rivotTestRide,
        .rivotPriceBook {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          min-width: 242px;
          min-height: 56px;
          padding: 0 34px;
          border: 1px solid rgba(255, 255, 255, .34);
          border-radius: 999px;
          font-size: 17px;
          font-weight: 700;
          box-shadow: none;
        }

        .rivotTestRide {
          background: transparent;
          color: #fff;
        }

        .rivotPriceBook {
          background: #ef7430;
          border-color: #ef7430;
          color: #fff;
        }

        .rivotPriceBook span,
        .rivotTestRide span {
          font-size: 28px;
          line-height: 1;
        }

        .rivotHeroNotes {
          display: flex;
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 28px;
          margin-top: 16px;
          color: rgba(255, 255, 255, .72);
          font-size: 14px;
          font-weight: 700;
        }

        .rivotHeroNotes strong {
          flex: 0 0 100%;
          color: currentColor;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.2;
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
          border-radius: 16px;
          isolation: isolate;
          transform: skewX(-10deg);
          transform-origin: center;
          box-shadow: 0 16px 36px rgba(0, 0, 0, .14);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .rivotKeyCard:hover {
          transform: skewX(-10deg) translateY(-5px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, .18);
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
          bottom: 20px;
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
          gap: 10px 12px;
          padding-left: 0;
        }

        .rivotKeyCardPills small {
          display: inline-flex;
          width: 100%;
          min-height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(105, 105, 105, .88);
          color: #fff;
          padding: 0 14px;
          font-size: clamp(10px, .78vw, 12px);
          font-weight: 850;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .16);
          backdrop-filter: blur(8px);
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardPills {
          grid-template-columns: repeat(2, minmax(92px, max-content));
        }

        .rivotKeyCard:nth-child(2) .rivotKeyCardPills small:last-child {
          grid-column: 1 / -1;
          justify-self: start;
        }

        .rivotDesign {
          position: relative;
          display: grid;
          min-height: 100vh;
          grid-template-rows: auto 1fr;
          align-items: center;
          justify-items: center;
          overflow: hidden;
          padding: clamp(42px, 5.2vh, 58px) 5% clamp(36px, 5vh, 52px);
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
          border: 0;
          border-radius: 50%;
          box-shadow: inset 0 2px 5px rgba(255,255,255,.55), 0 4px 12px rgba(0,0,0,.2);
          cursor: pointer;
        }

        .rivotColorPicker button.active {
          outline: 3px solid rgba(239, 116, 48, .32);
          outline-offset: 3px;
        }

        .colorGrey {
          background: linear-gradient(135deg, #797c7d, #d8d9d8 45%, #515355);
        }

        .colorBlack {
          background: linear-gradient(135deg, #050505, #2b2c2d 48%, #050505);
        }

        .colorBlue {
          background: linear-gradient(135deg, #1c2c39, #526373 48%, #101922);
        }

        .colorWhite {
          background: linear-gradient(135deg, #f7f7f5, #d7d7d2 52%, #fff);
        }

        .colorGraphite {
          background: linear-gradient(135deg, #343434, #777 48%, #242424);
        }

        .rivotEngineering {
          position: relative;
          display: grid;
          grid-template-columns: minmax(230px, .9fr) minmax(0, 2.1fr);
          min-height: 72vh;
          overflow: hidden;
          padding: clamp(30px, 4vw, 54px) clamp(24px, 4.8vw, 72px);
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
        }

        .rivotEngineeringCardBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: .92;
        }

        .rivotEngineeringCard:has(.rivotEngineeringCardBg)::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(244, 244, 244, .92) 0%, rgba(244, 244, 244, .78) 38%, rgba(244, 244, 244, .2) 100%);
          pointer-events: none;
        }

        .rivotEngineeringCard:nth-child(n + 4):has(.rivotEngineeringCardBg)::before {
          background:
            linear-gradient(90deg, rgba(244, 244, 244, .95) 0%, rgba(244, 244, 244, .78) 48%, rgba(244, 244, 244, .18) 100%),
            linear-gradient(180deg, rgba(244, 244, 244, .22), rgba(244, 244, 244, .82));
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
          background: #f4f4f4;
        }

        .rivotEngineeringCard:nth-child(3) {
          background: #f4f4f4;
        }

        .rivotEngineeringCard:nth-child(5) {
          background: #f4f4f4;
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

        .rivotDesignDetails {
          min-height: 0;
          display: grid;
          place-items: center;
          padding: clamp(26px, 3.6vw, 44px) clamp(14px, 3vw, 34px);
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
          border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 15px;
          background:
            radial-gradient(circle at 48% 42%, rgba(255, 255, 255, .05), transparent 34%),
            #060708;
          box-shadow:
            0 20px 44px rgba(0, 0, 0, .18),
            inset 0 0 0 1px rgba(255, 255, 255, .03);
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
          object-fit: cover;
          object-position: center;
          transform: scale(1.015);
        }

        .rivotDetailsHeroPlaceholder .rivotDetailsPhoto {
          object-position: 50% 48%;
        }

        .rivotDetailsSmallPlaceholder:first-child .rivotDetailsPhoto {
          object-position: 50% 42%;
        }

        .rivotDetailsSmallPlaceholder:last-child .rivotDetailsPhoto {
          object-position: 50% 58%;
        }

        .rivotDetailsHeroPlaceholder::after,
        .rivotDetailsSmallPlaceholder::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 50%;
          background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .72));
        }

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

        .rivotPerformance {
          padding: clamp(26px, 3.6vw, 44px) clamp(14px, 3vw, 34px);
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
          background: rgba(255, 255, 255, .22);
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
          color: #080808;
          font-size: clamp(30px, 3vw, 42px);
          font-weight: 950;
          line-height: 1.02;
          letter-spacing: -.045em;
        }

        .rivotSafetyHeader span {
          margin-top: 14px;
          color: #5b6169;
          font-size: clamp(14px, 1.25vw, 18px);
          font-weight: 650;
          line-height: 1.45;
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
          color: #080808;
          font-size: clamp(16px, 1.2vw, 20px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.03em;
        }

        .rivotSafetyFeature p {
          margin: 0;
          color: #535963;
          font-size: clamp(13px, .95vw, 16px);
          font-weight: 700;
          line-height: 1.48;
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
          padding: clamp(52px, 7vw, 108px) clamp(18px, 5vw, 76px);
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
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
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

        .rivotRideInsightList em {
          color: #ef7430;
          font-size: 20px;
          font-style: normal;
          font-weight: 900;
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
          padding: clamp(18px, 3vw, 34px);
          isolation: isolate;
        }

        .rivotRidePhoneCard::before {
          content: "";
          position: absolute;
          inset: clamp(18px, 4vw, 48px) 0;
          z-index: 1;
          border-radius: 34px;
          background:
            radial-gradient(circle at 50% 16%, rgba(255, 255, 255, .95), rgba(255, 255, 255, .38) 46%, transparent 70%),
            linear-gradient(180deg, rgba(255, 255, 255, .82), rgba(255, 255, 255, .3));
          box-shadow:
            0 32px 90px rgba(17, 17, 17, .1),
            inset 0 0 0 1px rgba(255, 255, 255, .86);
        }

        .rivotRideInsightPhoto {
          z-index: 2;
          display: block;
          width: clamp(238px, 24vw, 336px);
          height: auto;
          max-height: min(620px, 72vh);
          border: 2px solid rgba(17, 17, 17, .08);
          border-radius: clamp(30px, 3vw, 44px);
          object-fit: contain;
          object-position: center;
          background: #fff;
          box-shadow: 0 28px 72px rgba(17, 17, 17, .16);
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

        .rivotRideInsightList em {
          font-size: 17px;
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

        .rivotReach {
          padding: clamp(8px, 1.5vw, 18px) clamp(10px, 2vw, 22px) clamp(64px, 7vw, 92px);
          background: #fff;
          color: #111;
          overflow: hidden;
        }

        .rivotReachPanel {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          width: min(100%, 1360px);
          margin: 0 auto;
          padding-top: 0;
          border-radius: 16px;
          background: #fff;
          box-shadow:
            0 12px 34px rgba(17, 17, 17, .08),
            inset 0 0 0 1px rgba(17, 17, 17, .06);
        }

        .rivotReachCard {
          position: relative;
          display: grid;
          grid-template-columns: minmax(185px, .78fr) minmax(240px, 1.08fr);
          min-height: clamp(250px, 24vw, 330px);
          overflow: hidden;
          background: #fff;
          box-shadow: none;
        }

        .rivotReachStore {
          border-radius: 16px 0 0 16px;
        }

        .rivotReachCharge {
          border-left: 1px solid rgba(17, 17, 17, .06);
          border-radius: 0 16px 16px 0;
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
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(42px, 4.2vw, 62px) clamp(24px, 3.2vw, 46px) clamp(28px, 2.8vw, 40px);
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
          margin: 0;
          color: #050505;
          font-size: clamp(30px, 3vw, 46px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: -.055em;
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
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          margin-top: 24px;
          border-radius: 50%;
          background: #ef7430;
          color: #fff;
          font-size: 23px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 12px 24px rgba(239, 116, 48, .24);
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
          background: #25a75d;
          color: #fff;
          box-shadow: 0 12px 24px rgba(37, 167, 93, .22);
        }

        .rivotReachMedia {
          position: relative;
          min-height: 100%;
          margin: 18px 18px 18px 0;
          border-radius: 0 14px 14px 0;
          clip-path: polygon(17% 0, 93% 0, 100% 7%, 100% 93%, 93% 100%, 17% 100%, 0 50%);
          background: #111;
        }

        .rivotReachMedia img {
          object-fit: cover;
          object-position: center;
        }

        .rivotReachCharge .rivotReachMedia {
          margin-right: 18px;
        }

        .rivotBestFit {
          padding: clamp(28px, 3.4vw, 44px) clamp(16px, 4vw, 48px) clamp(34px, 3.8vw, 50px);
          background: #f3f3f4;
          color: #070707;
        }

        .rivotBestFitShell {
          width: min(100%, 1360px);
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
          gap: clamp(18px, 2vw, 28px);
          margin-top: clamp(28px, 3.2vw, 42px);
        }

        .rivotBestFitCard {
          display: flex;
          min-height: clamp(330px, 24vw, 390px);
          flex-direction: column;
          align-items: center;
          padding: clamp(28px, 2.8vw, 38px) clamp(22px, 2.4vw, 34px) clamp(26px, 2.6vw, 34px);
          border-radius: 20px;
          background: #fff;
          text-align: center;
        }

        .rivotBestFitEyebrow {
          margin: 0 0 12px;
          color: #0d0d0d;
          font-size: 12px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .42em;
          text-transform: uppercase;
        }

        .rivotBestFitGreen {
          color: #16ce69;
        }

        .rivotBestFitBlue {
          color: #0758ff;
        }

        .rivotBestFitCard h3 {
          margin: 0;
          color: #050505;
          font-size: clamp(24px, 1.9vw, 30px);
          font-weight: 850;
          line-height: 1.08;
          letter-spacing: -.04em;
        }

        .rivotBestFitCard > p:not(.rivotBestFitEyebrow) {
          max-width: 300px;
          margin: 12px 0 0;
          color: #777d84;
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
          border-radius: 13px;
          background: #f4f4f5;
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
          border: 0;
          border-radius: 999px;
          background: #f2f2f3;
          color: #080808;
          font-size: 14px;
          font-weight: 850;
          line-height: 1;
        }

        .rivotBestFitDisabled {
          color: #81868c;
          cursor: not-allowed;
        }

        .rivotBestFitCta {
          margin-top: auto;
          transition: transform .2s ease, background .2s ease;
        }

        .rivotBestFitCta:hover {
          background: #e9e9ea;
          transform: translateY(-1px);
        }

        .rivotBestFitShield {
          display: grid;
          width: clamp(86px, 7.5vw, 106px);
          height: clamp(86px, 7.5vw, 106px);
          place-items: center;
          margin: auto 0 clamp(24px, 2.6vw, 34px);
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

          .rivotHeroPointers span {
            width: 42px;
            height: 6px;
          }

          .rivotHeroPointers span.isActive {
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

          .rivotKeyFeaturesCopy p:not(.rivotKeyEyebrow) {
            max-width: 460px;
          }

          .rivotDesign {
            min-height: 100vh;
            padding-block: 52px;
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
            padding: 36px 20px;
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
          .rivotHero {
            height: calc(100vh - 58px);
            min-height: 0;
            margin-top: 58px;
          }

          .rivotHeroImage {
            object-position: 68% center;
          }

          .rivotHeroContent {
            width: 100%;
            max-width: 100%;
            margin: 24px 0 0;
            padding-inline: 16px;
            overflow: hidden;
          }

          .rivotEyebrow {
            font-size: 11px;
            letter-spacing: .28em;
          }

          .rivotHero h1 {
            max-width: 100%;
            font-size: clamp(38px, 18vw, 56px);
            line-height: .88;
            gap: 8px;
          }

          .rivotHero h2 {
            max-width: 100%;
            font-size: 15px;
            letter-spacing: .06em;
          }

          .rivotHeroCopy {
            max-width: 100%;
            font-size: 14px;
          }

          .rivotHeroMarks span {
            width: 10px;
            height: 30px;
          }

          .rivotHeroSpecs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 0;
            max-width: 340px;
            margin-left: 0;
            margin-top: 24px;
            margin-bottom: 18px;
          }

          .rivotHeroSpecs div {
            padding: 0 12px;
          }

          .rivotSpecIcon {
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
}

.rivotSpecIcon svg {
  width: 24px;
  height: 24px;
}

          .rivotHeroSpecs b {
            font-size: 16px;
          }

          .rivotHeroSpecs small {
            font-size: 12px;
          }

          .rivotHeroButtons {
            width: 100%;
            gap: 10px;
          }

          .rivotHeroPointers {
            right: 16px;
            bottom: 18px;
            gap: 7px;
          }

          .rivotHeroPointers span {
            width: 28px;
            height: 5px;
          }

          .rivotHeroPointers span.isActive {
            width: 36px;
          }

          .rivotTestRide,
          .rivotPriceBook {
            width: 100%;
            min-width: 0;
            min-height: 46px;
            font-size: 15px;
          }

          .rivotHeroNotes {
            gap: 10px 18px;
            margin-top: 12px;
            font-size: 12px;
          }

          .rivotHeroNotes span {
            max-width: 100%;
          }

          .rivotKeyFeatures {
            padding: 22px 12px;
          }

          .rivotKeyFeaturesShell {
            padding: 24px 18px;
            border-radius: 14px;
          }

          .rivotKeyEyebrow {
            margin-bottom: 18px;
            gap: 10px;
            font-size: 12px;
          }

          .rivotKeyEyebrow span {
            width: 24px;
            height: 24px;
          }

          .rivotKeyCards {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .rivotKeyCardContent {
            top: 24px;
            left: 20px;
            right: 18px;
            bottom: 20px;
          }

          .rivotKeyCard,
          .rivotKeyCard:hover {
            min-height: 320px;
            transform: none;
          }

          .rivotKeyCardImage,
          .rivotKeyCard:hover .rivotKeyCardImage {
            transform: scale(1.04);
          }

          .rivotKeyCardContent {
            transform: none;
          }

          .rivotDesign {
            min-height: 100vh;
            padding: 42px 16px 92px;
          }

          .rivotDesignCopy h2 {
            font-size: clamp(38px, 13vw, 54px);
          }

          .rivotDesignCopy p {
            margin-top: 12px;
            font-size: 15px;
          }

          .rivotDesignImage {
            width: 102vw;
            max-width: none;
          }

          .rivotDesignControls {
            right: 50%;
            bottom: 24px;
            transform: translateX(50%);
            gap: 12px;
          }

          .rivotEngineering {
            display: block;
            padding: 30px 12px 38px;
          }

          .rivotEngineeringHeader {
            padding: 0 6px 24px;
          }

          .rivotEngineeringHeader h2 {
            font-size: clamp(36px, 12vw, 46px);
          }

          .rivotEngineeringHeader small {
            margin-top: 18px;
            font-size: 15px;
          }

          .rivotEngineeringHeader i {
            margin-top: 20px;
          }

          .rivotEngineeringGrid {
            grid-template-columns: 1fr;
            width: 100%;
          }

          .rivotEngineeringCard {
            min-height: 210px;
            padding: 26px 22px 34px;
          }

          .rivotEngineeringCard:nth-child(n + 4) {
            grid-template-columns: 52px minmax(0, 1fr);
            column-gap: 14px;
          }

          .rivotEngineeringIcon {
            width: 46px;
            height: 46px;
          }

          .rivotEngineeringCard p {
            max-width: 240px;
          }

          .rivotColorPicker {
            padding: 15px 14px 10px;
          }

          .rivotColorPicker button {
            width: 28px;
            height: 28px;
          }

          .rivotDesignDetails {
            padding: 24px 12px;
            min-height: auto;
          }

          .rivotDesignDetailsShell {
            height: auto;
            padding: 28px 18px;
            border-radius: 18px;
          }

          .rivotDetailsIntro {
            margin: 22px 0 30px;
          }

          .rivotDetailsList {
            gap: 18px;
          }

          .rivotDetailsList > div {
            grid-template-columns: 52px 1fr;
            gap: 12px;
          }

          .rivotDetailsList span {
            width: 48px;
            height: 48px;
          }

          .rivotDetailsCta {
            width: 100%;
            margin-top: 30px;
          }

          .rivotDetailsHeroPlaceholder {
            height: 320px;
            min-height: 0;
          }

          .rivotDetailsSideStack {
            grid-template-columns: 1fr;
          }

          .rivotDetailsSmallPlaceholder {
            height: 220px;
            min-height: 0;
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
            padding: 22px 12px;
          }

          .rivotPerformanceShell {
            padding: 24px 18px;
          }

          .rivotPerformanceCards {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .rivotPerformanceCard,
          .rivotPerformanceCard:hover {
            min-height: 320px;
            transform: none;
          }

          .rivotPerformancePlaceholder,
          .rivotPerformanceCardContent {
            transform: none;
          }

          .rivotPerformanceCardContent {
            inset: 24px;
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
            padding: 34px 14px 44px;
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
            padding: 4px 6px 0;
          }

          .rivotRidePhoneCard::before {
            inset: 22px 0 8px;
            border-radius: 26px;
          }

          .rivotRideInsightPhoto {
            width: min(78vw, 276px);
            border-radius: 34px;
            box-shadow: 0 22px 52px rgba(17, 17, 17, .16);
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
            padding: 20px 12px 44px;
          }

          .rivotReachPanel {
            gap: 14px;
            padding-top: 50px;
          }

          .rivotReachCard {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotReachCopy {
            padding: 28px 22px 22px;
          }

          .rivotReachMedia {
            min-height: 240px;
            margin: 0;
            border-radius: 14px 14px 0 0;
            clip-path: none;
            order: -1;
          }

          .rivotBestFit {
            padding: 34px 12px 42px;
          }

          .rivotBestFitHeader h2 {
            font-size: clamp(30px, 9vw, 40px);
          }

          .rivotBestFitGrid {
            gap: 14px;
            margin-top: 26px;
          }

          .rivotBestFitCard {
            min-height: 328px;
            padding: 28px 18px 26px;
            border-radius: 16px;
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
            height: 88px;
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

        }
      `}</style>
    </>
  );
}
