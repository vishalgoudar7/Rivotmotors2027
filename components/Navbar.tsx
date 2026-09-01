"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import modelPro from "@/asset/Model/Pro.png";
import modelSport from "@/asset/Model/Sport_NX100.png";
import logoBlack from "@/asset/images/RIVOT New Logo Back.png";
import logoWhite from "@/asset/images/RIVOT New Logo White.png";

const navItems = [
  { label: "Merchandise", href: "/merchandise" },
  { label: "Careers", href: "/careers" },
];

const communityItems = [
  { label: "Blog", href: "/blog" },
  { label: "Forum", href: "/forum" },
];

const reachItems = [
  { label: "Connect", href: "/connect" },
  { label: "Support", href: "/support" },
  { label: "Where", href: "/where" },
  { label: "FAQs", href: "/faqs" },
];

const productModels = [
  {
    name: "RIVOT NX100 Sport",
    tagline: "Sporty. Stylish. Dynamic.",
    price: "Starting at ₹1,39,000",
    href: "/products/nx100-sport",
    image: modelSport,
  },
  {
    name: "RIVOT NX100 Pro",
    tagline: "Powerful. Smart. Advanced.",
    price: "Starting at ₹1,29,000",
    href: "/products/nx100-pro",
    image: modelPro,
  },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [reachOpen, setReachOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const logo = theme === "light" ? logoBlack : logoWhite;

  useEffect(() => {
    const savedTheme = localStorage.getItem("rivot-theme-mode");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.rivotTheme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.dataset.rivotTheme = nextTheme;
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("rivot-theme-mode", nextTheme);
      return nextTheme;
    });
  };

  return (
    <header className="rivotHeader">
      <Link href="/" className="rivotBrand" aria-label="Rivot">
        <span className="rivotBrandMark">
          <Image src={logo} alt="RIVOT" priority />
        </span>
      </Link>

      <nav className="rivotHeaderLinks" aria-label="Primary navigation">
        <div
          className="rivotProductsNav"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
        >
          <button
            type="button"
            className="rivotProductsButton"
            aria-expanded={productsOpen}
            aria-controls="rivot-products-menu"
            onClick={() => setProductsOpen((open) => !open)}
          >
            Products
            <span aria-hidden="true" />
          </button>

          <div className={`rivotProductsMenu${productsOpen ? " isOpen" : ""}`} id="rivot-products-menu">
            <div className="rivotProductsMenuInner">
              <h2>Our Scooters</h2>
              <div className="rivotProductsGrid">
                {productModels.map((model) => (
                  <Link
                    href={model.href}
                    className="rivotProductCard"
                    key={model.name}
                    data-model={model.name.includes("Sport") ? "sport" : "pro"}
                    onClick={() => setProductsOpen(false)}
                  >
                    <span className="rivotProductImage">
                      <Image src={model.image} alt={model.name} sizes="(max-width: 900px) 44vw, 250px" />
                    </span>
                    <span className="rivotProductName">
                      {model.name}
                    </span>
                    <span className="rivotProductTagline">{model.tagline}</span>
                    <span className="rivotProductActions">
                      <span>Book Now</span>
                      <span>Explore</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="rivotCommunityNav"
          onMouseEnter={() => setCommunityOpen(true)}
          onMouseLeave={() => setCommunityOpen(false)}
        >
          <button
            type="button"
            className="rivotCommunityButton"
            aria-expanded={communityOpen}
            aria-controls="rivot-community-menu"
            onClick={() => setCommunityOpen((open) => !open)}
          >
            Community
            <span aria-hidden="true" />
          </button>

          <div className={`rivotCommunityMenu${communityOpen ? " isOpen" : ""}`} id="rivot-community-menu">
            {communityItems.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setCommunityOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}

        <div
          className="rivotExploreNav"
          onMouseEnter={() => setReachOpen(true)}
          onMouseLeave={() => setReachOpen(false)}
        >
          <button
            type="button"
            className="rivotExploreButton"
            aria-expanded={reachOpen}
            aria-controls="rivot-reach-menu"
            onClick={() => setReachOpen((open) => !open)}
          >
            Reach us
            <span aria-hidden="true" />
          </button>

          <div className={`rivotExploreMenu${reachOpen ? " isOpen" : ""}`} id="rivot-reach-menu">
            {reachItems.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setReachOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="rivotHeaderActions">
        <button className="rivotThemeToggle" type="button" onClick={toggleTheme}>
          <span aria-hidden="true">
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 15.2A7.4 7.4 0 0 1 8.8 4A8.2 8.2 0 1 0 20 15.2Z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </span>
          <b>{theme === "dark" ? "Dark Mode" : "Light Mode"}</b>
          <i aria-hidden="true" />
        </button>

        <Link href="/book-now" className="rivotBook">
          Book Now
        </Link>
      </div>

      <button
        className={`rivotMenuButton${menuOpen ? " isOpen" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`rivotMobileLinks${menuOpen ? " isOpen" : ""}`} aria-label="Mobile navigation">
        {productModels.map((model) => (
          <Link href={model.href} key={model.name} onClick={() => setMenuOpen(false)}>
            {model.name}
          </Link>
        ))}
        {navItems.map((item) => (
          <Link href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        {communityItems.map((item) => (
          <Link href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        {reachItems.map((item) => (
          <Link href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <style>{`
  .rivotHeader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 58px;

    height: 86px;
    padding: 0 48px;

    background: transparent;
    color: #fff;
  }

  .rivotMenuButton,
  .rivotMobileLinks {
    display: none;
  }

  .rivotBrand {
    display: inline-flex;
    align-items: center;
    color: #fff;
    line-height: 1;
    text-decoration: none;
  }

  .rivotBrandMark {
    display: grid;
    width: 162px;
    height: 54px;
    place-items: center;
  }

  .rivotBrandMark img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .rivotHeaderLinks {
    display: flex;
    justify-self: start;
    align-items: center;
    gap: 34px;
  }

  .rivotHeaderLinks a,
  .rivotProductsButton,
  .rivotCommunityButton {
    color: rgba(255, 255, 255, 0.92);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;

    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .rivotHeaderLinks a:hover,
  .rivotProductsButton:hover,
  .rivotProductsButton[aria-expanded="true"],
  .rivotCommunityButton:hover,
  .rivotCommunityButton[aria-expanded="true"] {
    color: #ef7430;
  }

  .rivotProductsNav,
  .rivotCommunityNav,
  .rivotExploreNav {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 86px;
  }

  .rivotCommunityButton,
  .rivotExploreButton {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 14px;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.92);
    font-size: 15px;
    font-weight: 600;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .rivotExploreButton:hover,
  .rivotExploreButton[aria-expanded="true"] {
    background: transparent;
    color: rgba(255, 255, 255, 0.92);
  }

  .rivotCommunityButton:hover,
  .rivotCommunityButton[aria-expanded="true"] {
    background: transparent;
  }

  .rivotCommunityButton span,
  .rivotExploreButton span {
    width: 7px;
    height: 7px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform .2s ease;
  }

  .rivotCommunityButton[aria-expanded="true"] span,
  .rivotExploreButton[aria-expanded="true"] span {
    transform: rotate(225deg) translate(-1px, -1px);
  }

  .rivotCommunityMenu,
  .rivotExploreMenu {
    position: absolute;
    top: calc(100% - 8px);
    left: 0;
    z-index: 999;
    display: grid;
    min-width: 182px;
    padding: 6px;
    border: 1px solid rgba(17, 17, 17, .1);
    border-radius: 8px;
    background: rgba(255, 255, 255, .72);
    box-shadow: 0 14px 34px rgba(17, 17, 17, .14);
    backdrop-filter: blur(20px) saturate(1.35);
    -webkit-backdrop-filter: blur(20px) saturate(1.35);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-6px);
    transition:
      opacity .2s ease,
      transform .2s ease,
      visibility .2s ease;
  }

  .rivotCommunityMenu::before,
  .rivotExploreMenu::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    height: 12px;
  }

  .rivotCommunityMenu.isOpen,
  .rivotExploreMenu.isOpen {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .rivotCommunityMenu a,
  .rivotExploreMenu a {
    display: block;
    padding: 11px 14px;
    border-radius: 4px;
    color: #090909;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .rivotCommunityMenu a:hover,
  .rivotExploreMenu a:hover {
    background: rgba(239, 116, 48, .12);
    color: #ef7430;
  }

  .rivotProductsButton {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .rivotProductsButton span {
    width: 7px;
    height: 7px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform .2s ease;
  }

  .rivotProductsButton[aria-expanded="true"] span {
    transform: rotate(225deg) translate(-1px, -1px);
  }

  .rivotProductsMenu {
    position: fixed;
    left: 48px;
    right: auto;
    top: 86px;
    z-index: 999;
    width: min(92vw, 620px);
    padding: 0;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity .2s ease,
      transform .2s ease,
      visibility .2s ease;
  }

  .rivotProductsMenu.isOpen {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .rivotProductsMenuInner {
    display: grid;
    gap: 12px;
    width: 100%;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, .42);
    border-radius: 18px;
    background: rgba(255, 255, 255, .58);
    color: #090909;
    box-shadow:
      0 24px 58px rgba(17, 17, 17, .12),
      inset 0 1px 0 rgba(255, 255, 255, .72);
    backdrop-filter: blur(28px) saturate(1.45);
    -webkit-backdrop-filter: blur(28px) saturate(1.45);
  }

  .rivotProductsMenuInner h2 {
    margin: 0;
    color: #171717;
    font-size: 17px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: 0;
  }

  .rivotProductsGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(210px, 1fr));
    gap: 12px;
  }

  .rivotProductCard {
    display: grid;
    grid-template-rows: 112px auto auto auto;
    align-content: start;
    justify-items: center;
    gap: 7px;
    min-width: 0;
    min-height: 230px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, .48);
    border-radius: 12px;
    background: rgba(255, 255, 255, .38);
    color: #090909;
    overflow: hidden;
    text-align: center;
    box-shadow:
      0 18px 38px rgba(17, 17, 17, .06),
      inset 0 1px 0 rgba(255, 255, 255, .64);
    backdrop-filter: blur(20px) saturate(1.25);
    -webkit-backdrop-filter: blur(20px) saturate(1.25);
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }

  .rivotProductCard:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, .54);
    box-shadow:
      0 22px 46px rgba(17, 17, 17, .1),
      inset 0 1px 0 rgba(255, 255, 255, .78);
  }

  .rivotProductImage {
    position: relative;
    display: grid;
    width: 100%;
    height: 112px;
    place-items: center;
    overflow: visible;
  }

  .rivotProductImage img {
    width: 100%;
    height: 100%;
    max-width: 178px;
    max-height: 106px;
    object-fit: contain;
    object-position: center;
    filter: drop-shadow(0 14px 16px rgba(17, 17, 17, .12));
    transform: none;
    transition: transform .2s ease;
  }

  .rivotProductCard:hover .rivotProductImage img {
    transform: scale(1.04) translateY(-2px);
  }

  .rivotProductCard[data-model="sport"] .rivotProductImage img {
    transform: none;
  }

  .rivotProductCard[data-model="sport"]:hover .rivotProductImage img {
    transform: scale(1.04) translateY(-2px);
  }

  .rivotProductName {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 0;
    margin-top: 5px;
    color: #050505;
    font-size: clamp(15px, 1.1vw, 17px);
    font-weight: 950;
    line-height: 1.02;
    letter-spacing: -.04em;
    text-align: center;
    overflow-wrap: anywhere;
  }

  .rivotProductTagline {
    width: 100%;
    min-width: 0;
    color: #5d7181;
    font-size: 11px;
    font-weight: 800;
    line-height: 1.25;
    overflow-wrap: anywhere;
    text-align: center;
  }

  .rivotProductActions {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    margin-top: 7px;
    color: #7b8389;
    font-size: 12px;
    font-weight: 850;
  }

  .rivotProductActions span:first-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 78px;
    min-height: 32px;
    border-radius: 5px;
    background: #ef7430;
    color: #fff;
    box-shadow: 0 10px 22px rgba(239, 116, 48, .24);
  }

  .rivotProductActions span:last-child {
    color: #68747c;
  }

  .rivotBook {
    display: inline-flex;
    justify-self: end;
    align-items: center;
    justify-content: center;

    min-width: 120px;
    height: 44px;
    padding: 0 22px;

    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: 999px;

    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);

    color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;

    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .rivotHeaderActions {
    display: inline-flex;
    justify-self: end;
    align-items: center;
    gap: 14px;
  }

  .rivotThemeToggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 30px;
    padding: 0 8px 0 10px;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;
    backdrop-filter: blur(8px);
  }

  .rivotThemeToggle b {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  .rivotThemeToggle span {
    display: inline-grid;
    width: 14px;
    height: 14px;
    place-items: center;
    flex: 0 0 auto;
    color: currentColor;
  }

  .rivotThemeToggle svg {
    display: block;
    width: 14px;
    height: 14px;
  }

  .rivotThemeToggle i {
    position: relative;
    display: block;
    width: 26px;
    height: 14px;
    flex: 0 0 auto;
    border-radius: 999px;
    background: rgba(255, 255, 255, .24);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .26);
  }

  .rivotThemeToggle i::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    transition: transform .24s ease, background .24s ease;
  }

  html[data-rivot-theme="light"] .rivotBrand {
    color: #0b0b0b;
  }

  html[data-rivot-theme="light"] .rivotBrandMark img {
    filter: none;
  }

  html[data-rivot-theme="light"] .rivotHeaderLinks a,
  html[data-rivot-theme="light"] .rivotProductsButton,
  html[data-rivot-theme="light"] .rivotCommunityButton,
  html[data-rivot-theme="light"] .rivotExploreButton {
    color: #111;
  }

  html[data-rivot-theme="light"] .rivotHeaderLinks a:hover,
  html[data-rivot-theme="light"] .rivotProductsButton:hover,
  html[data-rivot-theme="light"] .rivotProductsButton[aria-expanded="true"],
  html[data-rivot-theme="light"] .rivotCommunityButton:hover,
  html[data-rivot-theme="light"] .rivotCommunityButton[aria-expanded="true"] {
    color: #ef7430;
  }

  html[data-rivot-theme="light"] .rivotBook {
    border-color: #ef7430;
    background: transparent;
    color: #ef7430;
  }

  html[data-rivot-theme="light"] .rivotThemeToggle {
    border-color: rgba(0, 0, 0, .08);
    background: rgba(255, 255, 255, .78);
    color: #111;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
  }

  html[data-rivot-theme="light"] .rivotThemeToggle i {
    background: rgba(239, 116, 48, .18);
    box-shadow: inset 0 0 0 1px rgba(239, 116, 48, .22);
  }

  html[data-rivot-theme="light"] .rivotThemeToggle i::before {
    background: #ef7430;
    transform: translateX(12px);
  }

  .rivotBook:hover {
    background: #ef7430;
    border-color: #ef7430;
    color: #fff;
  }

  @media (max-width: 900px) {
    .rivotHeader {
      grid-template-columns: auto 1fr auto;
      gap: 24px;
      height: 70px;
      padding: 0 24px;
    }

    .rivotBrandMark {
      width: 142px;
      height: 48px;
    }

    .rivotHeaderLinks {
      gap: 22px;
    }

    .rivotProductsNav,
    .rivotCommunityNav,
    .rivotExploreNav {
      min-height: 70px;
    }

    .rivotProductsMenu {
      top: 70px;
      left: 20px;
      width: min(calc(100vw - 40px), 600px);
    }

    .rivotProductsMenuInner {
      padding: 14px;
      gap: 12px;
    }

    .rivotProductsGrid {
      gap: 12px;
    }

    .rivotProductImage {
      height: 110px;
    }

    .rivotProductCard {
      grid-template-rows: 110px auto auto auto;
      min-height: 224px;
      padding: 13px;
    }

    .rivotProductName {
      font-size: 16px;
    }

    .rivotProductActions {
      gap: 10px;
      font-size: 12px;
    }

    .rivotProductActions span:first-child {
      min-width: 78px;
      min-height: 32px;
    }
  }

  @media (max-width: 760px) {
    .rivotProductsGrid {
      grid-template-columns: 1fr;
    }

    .rivotProductsMenu {
      width: min(calc(100vw - 32px), 420px);
    }

    .rivotProductCard {
      min-height: 220px;
      padding: 13px;
    }

    .rivotProductImage {
      height: 106px;
    }

    .rivotProductImage img,
    .rivotProductCard:hover .rivotProductImage img,
    .rivotProductCard[data-model="sport"] .rivotProductImage img,
    .rivotProductCard[data-model="sport"]:hover .rivotProductImage img {
      max-width: 210px;
      max-height: 102px;
      transform: none;
    }
  }

  @media (max-width: 680px) {
    .rivotHeader {
      grid-template-columns: auto auto auto;
      justify-content: space-between;
      gap: 10px;
      height: 62px;
      padding: 0 14px;
    }

    .rivotHeaderLinks {
      display: none;
    }

    .rivotProductsMenu {
      display: none;
    }

    .rivotCommunityMenu {
      display: none;
    }

    .rivotBrandMark {
      width: 124px;
      height: 42px;
    }

    .rivotHeaderActions {
      gap: 10px;
    }

    .rivotThemeToggle {
      height: 32px;
      padding: 0 11px;
      font-size: 10px;
    }

    .rivotBook {
      min-width: 94px;
      height: 38px;
      padding: 0 14px;
      font-size: 13px;
    }

    .rivotMenuButton {
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      gap: 4px;

      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 50%;

      background: transparent;
      color: #fff;
      padding: 9px;
    }

    html[data-rivot-theme="light"] .rivotMenuButton {
      border-color: rgba(0, 0, 0, .18);
      color: #111;
    }

    .rivotMenuButton span {
      display: block;
      width: 16px;
      height: 2px;
      border-radius: 999px;
      background: currentColor;
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
    }

    .rivotMenuButton.isOpen span:first-child {
      transform: translateY(6px) rotate(45deg);
    }

    .rivotMenuButton.isOpen span:nth-child(2) {
      opacity: 0;
    }

    .rivotMenuButton.isOpen span:last-child {
      transform: translateY(-6px) rotate(-45deg);
    }

    .rivotMobileLinks {
      position: absolute;
      left: 14px;
      right: 14px;
      top: calc(100% + 8px);

      display: grid;
      visibility: hidden;

      overflow: hidden;

      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;

      background: rgba(10, 10, 10, 0.94);
      backdrop-filter: blur(18px);

      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);

      opacity: 0;
      transform: translateY(-8px);

      transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        visibility 0.2s ease;
    }

    .rivotMobileLinks.isOpen {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }

    .rivotMobileLinks a {
      padding: 15px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      color: #fff;
      font-size: 15px;
      font-weight: 800;
      text-decoration: none;
    }

    .rivotMobileLinks a:last-child {
      border-bottom: 0;
    }

    .rivotMobileLinks a:hover {
      color: #ef7430;
    }
  }

  @media (max-width: 380px) {
    .rivotHeader {
      padding: 0 10px;
      gap: 8px;
    }

    .rivotBrandMark {
      width: 96px;
      height: 34px;
    }

    .rivotBook {
      display: none;
    }

    .rivotThemeToggle {
      display: none;
    }

    .rivotThemeToggle span {
      font-size: 13px;
    }

    .rivotMenuButton {
      width: 36px;
      height: 36px;
    }
  }
`}</style>
    </header>
  );
}
