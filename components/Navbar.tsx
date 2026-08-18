"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import logoMark from "@/asset/images/rivot-logo-transparent.png";
import logoMarkWhite from "@/asset/images/rivot-logo-white-transparent.png";

const navItems = [
  { label: "Products", href: "/products", icon: ProductIcon, active: true },
  { label: "Technology", href: "/#technology", icon: BoltIcon },
  { label: "Experience", href: "/#experience", icon: HelmetIcon },
  { label: "About Us", href: "/#about", icon: PeopleIcon },
  { label: "Contact", href: "/#contact", icon: MailIcon },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("rivot-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rivot-theme", theme);
  }, [theme]);

  return (
    <>
      <header className={`nav rivotNav${scrolled ? " isScrolled" : ""}`}>
        <Link href="/" className="logo rivotLogo" aria-label="RIVOT Motors">
          <span className="rivotLogoMark">
            <Image src={theme === "dark" ? logoMarkWhite : logoMark} alt="" priority />
          </span>
          <span className="rivotLogoText">
            <span>RIVOT</span>
            <small>MOTORS</small>
          </span>
        </Link>

        <span className="navDivider" aria-hidden="true" />

        <nav className="rivotNavLinks" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                className={`rivotNavItem${item.active ? " isActive" : ""}`}
                key={item.label}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <span className="navDivider navDividerRight" aria-hidden="true" />

        <div className="rivotNavActions">
          <Link href="/book-now" className="rivotTestRide">
            Book a Test Ride <span aria-hidden="true">{"\u2197"}</span>
          </Link>
          <button
            className="rivotCircleBtn"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <button
          className={`rivotCircleBtn rivotMenuBtn${menuOpen ? " isOpen" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`rivotMobileMenu${menuOpen ? " isOpen" : ""}`} aria-hidden={!menuOpen}>
        <div className="rivotMobileMenuInner">
          <button
            className="rivotMobileClose"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span />
            <span />
          </button>

          <button
            className="rivotMobileTheme"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {navItems.map((item, index) => (
            <Link
              href={item.href}
              className={`rivotMobileLink${item.active ? " isActive" : ""}`}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{item.label}</span>
              <b aria-hidden="true">{"\u2197"}</b>
            </Link>
          ))}

          <Link href="/book-now" className="rivotMobileCta" onClick={() => setMenuOpen(false)}>
            Book a Test Ride <span aria-hidden="true">{"\u2197"}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function ProductIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15h9l2-5h3l2 5" /><path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M10 10h4" /></svg>;
}

function BoltIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" /></svg>;
}

function HelmetIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 0 1 16 0v3H9a5 5 0 0 1-5-5v-2" /><path d="M13 17h7" /><path d="M8 10h11" /></svg>;
}

function PeopleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M17 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M14 19a5 5 0 0 1 7 0" /></svg>;
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z" /><path d="m4 8 8 6 8-6" /></svg>;
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 7 7 0 1 0 20 15.5Z" /></svg>;
}

function SunIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v2" /><path d="M12 18v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M4 12h2" /><path d="M18 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>;
}
