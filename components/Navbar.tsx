"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoMark from "@/asset/images/logo (1).webp";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Stores", href: "/#stores" },
  { label: "Explore", href: "/#explore" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

      <Link href="/book-now" className="rivotBook">
        Book Now
      </Link>

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
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 58px;
          height: 72px;
          padding: 0 48px;
          background: #fff;
          color: #0b0b0b;
        }

        .rivotMenuButton,
        .rivotMobileLinks {
          display: none;
        }

        .rivotBrand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #0b0b0b;
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
          filter: invert(1);
        }

        .rivotBrandText {
          font-size: 32px;
          font-weight: 950;
          letter-spacing: -0.08em;
        }

        .rivotHeaderLinks {
          display: flex;
          justify-self: start;
          align-items: center;
          gap: 34px;
        }

        .rivotHeaderLinks a {
          color: #6f7378;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
        }

        .rivotBook {
          display: inline-flex;
          justify-self: end;
          align-items: center;
          justify-content: center;
          min-width: 108px;
          height: 40px;
          padding: 0 18px;
          border-radius: 999px;
          background: #ffa52c;
          color: #050505;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .rivotHeader {
            grid-template-columns: auto 1fr auto;
            gap: 24px;
            height: 64px;
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
            height: 58px;
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
            border: 1px solid rgba(0, 0, 0, .12);
            border-radius: 50%;
            background: #fff;
            color: #0b0b0b;
            padding: 9px;
          }

          .rivotMenuButton span {
            display: block;
            width: 16px;
            height: 2px;
            border-radius: 999px;
            background: currentColor;
            transition: transform .2s ease, opacity .2s ease;
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
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, .14);
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
          }

          .rivotMobileLinks.isOpen {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
          }

          .rivotMobileLinks a {
            padding: 15px 18px;
            border-bottom: 1px solid rgba(0, 0, 0, .08);
            color: #111;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
          }

          .rivotMobileLinks a:last-child {
            border-bottom: 0;
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

          .rivotMenuButton {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </header>
  );
}
