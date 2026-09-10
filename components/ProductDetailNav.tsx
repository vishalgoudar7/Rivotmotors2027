"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { id: "performance", label: "Performance" },
  { id: "details", label: "Details" },
  { id: "design", label: "Design" },
  { id: "key-features", label: "Key Features" },
  { id: "model-comparison", label: "Compare" },
  { id: "support", label: "Support" },
] as const;

type ProductSectionId = (typeof navigationItems)[number]["id"];

export function ProductDetailNav() {
  const [activeSection, setActiveSection] = useState<ProductSectionId>(navigationItems[0].id);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id as ProductSectionId);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="productDetailNav" aria-label="Product page navigation">
      <div className="productDetailNavShell">
        <div className="productDetailNavLinks">
          {navigationItems.map((item) => (
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "isActive" : ""}
              onClick={() => setActiveSection(item.id)}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="productDetailNavActions">
          <Link href="/test-ride" className="productDetailNavSecondary">Test Ride</Link>
          <Link href="/book-now" className="productDetailNavPrimary">Book Now</Link>
        </div>
      </div>

      <style jsx>{`
        .productDetailNav {
          position: sticky;
          top: 0;
          z-index: 40;
          border-block: 1px solid rgba(17, 17, 17, .1);
          background: rgba(255, 255, 255, .94);
          box-shadow: 0 10px 30px rgba(17, 17, 17, .05);
          backdrop-filter: blur(16px);
        }

        .productDetailNavShell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          width: min(100%, 1420px);
          min-height: 88px;
          margin: 0 auto;
          padding: 14px clamp(28px, 5vw, 64px);
        }

        .productDetailNavLinks,
        .productDetailNavActions {
          display: flex;
          align-items: center;
        }

        .productDetailNavLinks {
          flex: 1 1 auto;
          gap: clamp(18px, 2vw, 32px);
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
        }

        .productDetailNavLinks::-webkit-scrollbar {
          display: none;
        }

        .productDetailNavLinks a {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          color: #171717;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color .2s ease;
        }

        .productDetailNavLinks a:hover,
        .productDetailNavLinks a:focus-visible,
        .productDetailNavLinks a.isActive {
          color: #ef7430;
          outline: none;
        }

        .productDetailNavLinks a.isActive {
          text-decoration: underline;
          text-decoration-color: #ef7430;
          text-decoration-thickness: 2px;
          text-underline-offset: 9px;
        }

        .productDetailNavActions {
          flex: 0 0 auto;
          gap: 12px;
        }

        .productDetailNavPrimary,
        .productDetailNavSecondary {
          display: inline-flex;
          min-width: 126px;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          border: 1px solid #ef7430;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color .2s ease, background .2s ease, transform .2s ease;
        }

        .productDetailNavPrimary {
          background: #ef7430;
          color: #fff;
        }

        .productDetailNavSecondary {
          background: transparent;
          color: #d75f21;
        }

        .productDetailNavPrimary:hover,
        .productDetailNavSecondary:hover {
          transform: translateY(-1px);
        }

        .productDetailNavSecondary:hover {
          background: #fff4ed;
        }

        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNav {
          border-color: rgba(255, 255, 255, .1);
          background: rgba(12, 14, 14, .96);
          box-shadow: 0 12px 34px rgba(0, 0, 0, .3);
        }

        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavLinks a {
          color: #d9dcdc !important;
        }

        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavLinks a:hover,
        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavLinks a:focus-visible,
        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavLinks a.isActive {
          color: #ef7430 !important;
        }

        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavSecondary {
          background: transparent;
          color: #ef7430 !important;
        }

        :global(html:is([data-theme="dark"], [data-rivot-theme="dark"])) .productDetailNavSecondary:hover {
          background: rgba(239, 116, 48, .12);
        }

        @media (max-width: 900px) {
          .productDetailNavShell {
            min-height: 76px;
            padding-inline: 24px;
          }

          .productDetailNavLinks {
            gap: 20px;
          }

          .productDetailNavActions {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .productDetailNav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
