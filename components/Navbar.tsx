"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logoMark from "@/asset/images/logo (1).webp";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Stores", href: "/#stores" },
  { label: "Explore", href: "/#explore" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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
          <Image src={logoMark} alt="" priority />
        </span>
        <span className="rivotBrandText">Rivot</span>
      </Link>

      <nav className="rivotHeaderLinks" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
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
        {navItems.map((item) => (
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
    gap: 12px;
    color: #fff;
    line-height: 1;
    text-decoration: none;
  }

  .rivotBrandMark {
    display: grid;
    width: 54px;
    height: 54px;
    place-items: center;
  }

  .rivotBrandMark img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    /* Black logo -> white */
    filter: brightness(0) invert(1);
  }

  .rivotBrandText {
    color: #fff;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.055em;
  }

  .rivotHeaderLinks {
    display: flex;
    justify-self: start;
    align-items: center;
    gap: 34px;
  }

  .rivotHeaderLinks a {
    color: rgba(255, 255, 255, 0.92);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;

    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .rivotHeaderLinks a:hover {
    color: #ef7430;
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

  html[data-rivot-theme="light"] .rivotBrand,
  html[data-rivot-theme="light"] .rivotBrandText {
    color: #0b0b0b;
  }

  html[data-rivot-theme="light"] .rivotBrandMark img {
    filter: brightness(0);
  }

  html[data-rivot-theme="light"] .rivotHeaderLinks a {
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
      width: 44px;
      height: 44px;
    }

    .rivotBrandText {
      font-size: 28px;
    }

    .rivotHeaderLinks {
      gap: 22px;
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

    .rivotBrand {
      gap: 8px;
    }

    .rivotBrandMark {
      width: 36px;
      height: 36px;
    }

    .rivotBrandText {
      font-size: 24px;
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

    .rivotBrandText {
      font-size: 21px;
    }

    .rivotBrandMark {
      width: 32px;
      height: 32px;
    }

    .rivotBook {
      min-width: 86px;
      height: 36px;
      padding: 0 12px;
    }

    .rivotThemeToggle {
      width: 36px;
      padding: 0;
      font-size: 0;
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
