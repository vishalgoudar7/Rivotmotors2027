"use client";

import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <button
        className="rivotProductsBackToTop"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <span aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 18V7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M6.5 12.5L12 7L17.5 12.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <style jsx>{`
        .rivotProductsBackToTop {
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
          background: radial-gradient(circle at 28% 24%, #ffa165 0%, #ff8033 38%, #ef6725 100%);
          color: #fff;
          box-shadow: 0 14px 28px rgba(239, 116, 48, .34), inset 0 1px 0 rgba(255, 255, 255, .4);
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
        }

        .rivotProductsBackToTop span,
        .rivotProductsBackToTop svg {
          display: grid;
          width: 11px;
          height: 11px;
          place-items: center;
        }

        .rivotProductsBackToTop:hover,
        .rivotProductsBackToTop:focus-visible {
          filter: brightness(1.04);
          box-shadow: 0 18px 34px rgba(239, 116, 48, .42), inset 0 1px 0 rgba(255, 255, 255, .46);
          transform: translateY(-2px);
          outline: none;
        }

        @media (max-width: 560px) {
          .rivotProductsBackToTop {
            right: 12px;
            bottom: 12px;
            width: 23px;
            height: 23px;
          }

          .rivotProductsBackToTop span,
          .rivotProductsBackToTop svg {
            width: 9px;
            height: 9px;
          }
        }
      `}</style>
    </>
  );
}
