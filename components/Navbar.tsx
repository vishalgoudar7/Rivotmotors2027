"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import modelPro from "@/asset/Model/Pro.png";
import modelSport from "@/asset/Model/Sport_NX100.png";
import logoBlack from "@/asset/images/RIVOT New Logo Back.png";
import logoWhite from "@/asset/images/RIVOT New Logo White.png";

const navItems = [{ label: "Stores", href: "/#stores" }];

const reachItems = [
  { label: "Connect", href: "/connect" },
  { label: "Support", href: "/support" },
  { label: "Where", href: "/where" },
  { label: "FAQs", href: "/faqs" },
];

const productModels = [
  {
    name: "RIVOT NX100 Sport",
    price: "Starting at ₹1,94,999",
    href: "/products/nx100-sport",
    image: modelSport,
  },
  {
    name: "RIVOT NX100 Pro",
    price: "Starting at ₹1,29,000",
    href: "/products/nx100-pro",
    image: modelPro,
  },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [reachOpen, setReachOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const logo = theme === "light" ? logoBlack : logoWhite;

  useEffect(() => {
    const savedTheme = localStorage.getItem("rivot-theme-mode");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.rivotTheme = nextTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.dataset.rivotTheme = nextTheme;
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
              {productModels.map((model) => (
                <Link
                  href={model.href}
                  className="rivotProductCard"
                  key={model.name}
                  data-model={model.name.includes("Sport") ? "sport" : "pro"}
                  onClick={() => setProductsOpen(false)}
                >
                  <span className="rivotProductImage">
                    <Image src={model.image} alt={model.name} sizes="(max-width: 900px) 45vw, 280px" />
                  </span>
                  <span className="rivotProductName">
                    {model.name}
                  </span>
                  <span className="rivotProductActions">
                    <span>Book Now</span>
                    <span>Explore</span>
                  </span>
                </Link>
              ))}
            </div>
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
          <span aria-hidden="true">{theme === "dark" ? "D" : "L"}</span>
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
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
  .rivotProductsButton {
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
  .rivotProductsButton[aria-expanded="true"] {
    color: #ef7430;
  }

  .rivotProductsNav,
  .rivotExploreNav {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 86px;
  }

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
    background: rgba(244, 244, 244, .92);
    color: #111;
  }

  .rivotExploreButton span {
    width: 7px;
    height: 7px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform .2s ease;
  }

  .rivotExploreButton[aria-expanded="true"] span {
    transform: rotate(225deg) translate(-1px, -1px);
  }

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
    background: #fff;
    box-shadow: 0 14px 34px rgba(17, 17, 17, .14);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-6px);
    transition:
      opacity .2s ease,
      transform .2s ease,
      visibility .2s ease;
  }

  .rivotExploreMenu::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    height: 12px;
  }

  .rivotExploreMenu.isOpen {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

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

  .rivotExploreMenu a:hover {
    background: #f1f1f1;
    color: #090909;
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
    left: 0;
    right: 0;
    top: 86px;
    z-index: 999;
    padding: 4px 50px 0;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-12px);
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
    grid-template-columns: repeat(2, 232px);
    justify-content: start;
    gap: 14px;
    width: 100%;
    min-height: 264px;
    padding: 28px 52px 30px;
    border: 1px solid rgba(17, 17, 17, .06);
    border-radius: 22px;
    background: rgba(247, 247, 247, .98);
    color: #090909;
    box-shadow: 0 28px 70px rgba(17, 17, 17, .16);
    backdrop-filter: blur(18px);
  }

  .rivotProductCard {
    display: grid;
    grid-template-rows: 142px auto auto;
    align-content: start;
    justify-items: center;
    gap: 8px;
    min-width: 0;
    min-height: 222px;
    padding: 16px 14px 18px;
    border: 1px solid rgba(17, 17, 17, .06);
    border-radius: 8px;
    background: #fff;
    color: #090909;
    overflow: visible;
    text-align: center;
    box-shadow: 0 12px 30px rgba(17, 17, 17, .04);
    transition: transform .2s ease, box-shadow .2s ease;
  }

  .rivotProductCard:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(17, 17, 17, .08);
  }

  .rivotProductImage {
    position: relative;
    display: grid;
    width: 100%;
    height: 142px;
    place-items: center;
    overflow: visible;
  }

  .rivotProductImage img {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    object-fit: contain;
    object-position: center;
    filter: drop-shadow(0 14px 16px rgba(17, 17, 17, .12));
    transform: scale(1.04);
    transition: transform .2s ease;
  }

  .rivotProductCard:hover .rivotProductImage img {
    transform: scale(1.08) translateY(-2px);
  }

  .rivotProductCard[data-model="sport"] .rivotProductImage img {
    transform: scale(.98);
  }

  .rivotProductCard[data-model="sport"]:hover .rivotProductImage img {
    transform: scale(1.02) translateY(-2px);
  }

  .rivotProductName {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #050505;
    font-size: clamp(19px, 1.45vw, 22px);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -.045em;
    text-align: center;
  }

  .rivotProductName small {
    display: inline-grid;
    min-height: 17px;
    place-items: center;
    padding: 0 10px;
    border-radius: 2px;
    background: linear-gradient(90deg, #35b55f, rgba(53, 181, 95, .12));
    color: #fff;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: .07em;
    text-transform: uppercase;
  }

  .rivotProductPrice {
    color: #5d7181;
    font-size: clamp(17px, 1.35vw, 22px);
    font-weight: 700;
    line-height: 1.2;
  }

  .rivotProductActions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 2px;
    color: #7b8389;
    font-size: 12px;
    font-weight: 700;
  }

  .rivotProductActions span:first-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 82px;
    min-height: 34px;
    border-radius: 5px;
    background: #4169e1;
    color: #fff;
    box-shadow: 0 8px 18px rgba(65, 105, 225, .2);
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
    gap: 7px;
    height: 34px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;
    backdrop-filter: blur(8px);
  }

  .rivotThemeToggle span {
    font-size: 13px;
    line-height: 1;
  }

  html[data-rivot-theme="light"] .rivotBrand {
    color: #0b0b0b;
  }

  html[data-rivot-theme="light"] .rivotBrandMark img {
    filter: none;
  }

  html[data-rivot-theme="light"] .rivotHeaderLinks a,
  html[data-rivot-theme="light"] .rivotProductsButton,
  html[data-rivot-theme="light"] .rivotExploreButton {
    color: #111;
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
    .rivotExploreNav {
      min-height: 70px;
    }

    .rivotProductsMenu {
      top: 70px;
      padding: 4px 20px 0;
    }

    .rivotProductsMenuInner {
      grid-template-columns: repeat(2, minmax(200px, 232px));
      min-height: 258px;
      padding: 28px 24px 30px;
      gap: 12px;
    }

    .rivotProductImage {
      height: 136px;
    }

    .rivotProductCard {
      grid-template-rows: 136px auto auto;
      min-height: 218px;
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
