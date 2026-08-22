"use client";

import { useMemo, useState } from "react";

const categories = ["Generic", "Pricing", "Specifications", "All"] as const;

const faqs = [
  {
    category: "Specifications",
    question: "What is the range of the NX100?",
    answer:
      "The NX100 starts with a base range of 80 km, and this can be upgraded up to about 280-300 km depending on variant and usage.",
  },
  {
    category: "Pricing",
    question: "What is the average price of the NX100?",
    answer:
      "The NX100 is priced starting at around Rs. 89,000, with the average cost varying based on the chosen variant and features.",
  },
  {
    category: "Specifications",
    question: "What are the variants available?",
    answer: "Variants include Classic, Pro, Max, Sports, and Offlander.",
  },
  {
    category: "Specifications",
    question: "How large is the storage / boot space?",
    answer: "It offers a 45 litre boot that can accommodate two helmets and groceries.",
  },
  {
    category: "Generic",
    question: "Where is the NX100 manufactured?",
    answer: "The NX100 is produced at RIVOT Motors' first scooter manufacturing factory in Belagavi, Karnataka, India.",
  },
  {
    category: "Generic",
    question: "How can I book a test ride?",
    answer: "You can book a test ride from the Book Now page or contact the RIVOT team for availability in your city.",
  },
  {
    category: "Generic",
    question: "Where can I find the nearest RIVOT store?",
    answer: "Use the RIVOT store locator or contact support to find the nearest experience center and service touchpoint.",
  },
  {
    category: "Generic",
    question: "Who can I contact for support?",
    answer: "You can reach RIVOT support at support@rivotmotors.com or call +91 8988984646.",
  },
  {
    category: "Pricing",
    question: "Does the price change by variant?",
    answer: "Yes. Final pricing depends on the selected variant, battery configuration, features, taxes, and local registration charges.",
  },
  {
    category: "Pricing",
    question: "Are booking charges refundable?",
    answer: "Refund terms depend on the booking policy active at the time of purchase. Please check the latest cancellation and refund details before booking.",
  },
  {
    category: "Pricing",
    question: "Are finance options available?",
    answer: "Finance and EMI options may be available through partner institutions based on location, eligibility, and selected model.",
  },
  {
    category: "Specifications",
    question: "What unique features does the NX100 offer?",
    answer:
      "The NX100 includes an APU extra battery for extended range, gesture-based boot opening, front and rear ride cameras, Boost Mode, and more premium innovations designed for safety, convenience, and thrill.",
  },
];

export function Faqs() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Generic");

  const visibleFaqs = useMemo(() => {
    if (activeCategory === "All") {
      return faqs;
    }

    return faqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="rivotFaqs" id="rivot-faqs" aria-labelledby="rivot-faqs-title">
      <div className="rivotFaqsShell">
        <div className="rivotFaqsHeader">
          <h2 id="rivot-faqs-title">The Answers Behind the Ride.</h2>
          <div className="rivotFaqTabs" aria-label="FAQ categories">
            {categories.map((category) => (
              <button
                type="button"
                className={activeCategory === category ? "active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="rivotFaqsList">
          {visibleFaqs.map((faq) => (
            <details className="rivotFaqItem" key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <style>{`
        .rivotFaqs {
          padding: clamp(44px, 5vw, 72px) clamp(18px, 4vw, 64px) clamp(54px, 6vw, 84px);
          background: #fff;
          color: #111;
        }

        .rivotFaqsShell {
          display: grid;
          gap: clamp(34px, 4vw, 54px);
          width: min(100%, 920px);
          margin: 0 auto;
        }

        .rivotFaqsHeader {
          display: grid;
          justify-items: center;
          text-align: center;
        }

        .rivotFaqsHeader h2 {
          margin: 0;
          color: #111;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.055em;
        }

        .rivotFaqTabs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(9px, 1vw, 13px);
          width: min(100%, 540px);
          margin-top: clamp(20px, 2.4vw, 32px);
        }

        .rivotFaqTabs button {
          display: grid;
          min-width: 0;
          min-height: 46px;
          place-items: center;
          padding: 0 14px;
          border: 0;
          border-radius: 999px;
          background: #f3f3f3;
          color: #34383d;
          font: inherit;
          font-size: clamp(14px, .95vw, 17px);
          font-weight: 900;
          letter-spacing: -.02em;
          cursor: pointer;
          white-space: nowrap;
          transition:
            background .2s ease,
            color .2s ease,
            transform .2s ease,
            box-shadow .2s ease;
        }

        .rivotFaqTabs button:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(17, 17, 17, .06);
        }

        .rivotFaqTabs button.active,
        .rivotFaqTabs button[aria-pressed="true"] {
          background: #ef7430;
          color: #fff;
          box-shadow: 0 14px 26px rgba(239, 116, 48, .22);
        }

        .rivotFaqsList {
          display: grid;
          gap: 10px;
        }

        .rivotFaqItem {
          overflow: hidden;
          border-radius: 15px;
          background: #f4f4f4;
          box-shadow: none;
        }

        .rivotFaqItem summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: clamp(58px, 4.8vw, 72px);
          padding: 0 clamp(20px, 2.4vw, 30px);
          color: #111;
          cursor: pointer;
          list-style: none;
        }

        .rivotFaqItem summary::-webkit-details-marker {
          display: none;
        }

        .rivotFaqItem summary span {
          color: #111;
          font-size: clamp(16px, 1.15vw, 19px);
          font-weight: 800;
          line-height: 1.25;
        }

        .rivotFaqItem summary i {
          position: relative;
          flex: 0 0 auto;
          width: 21px;
          height: 21px;
        }

        .rivotFaqItem summary i::before,
        .rivotFaqItem summary i::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 15px;
          height: 2px;
          border-radius: 999px;
          background: #111;
          transform: translate(-50%, -50%);
        }

        .rivotFaqItem summary i::after {
          transform: translate(-50%, -50%) rotate(90deg);
          transition: transform .2s ease;
        }

        .rivotFaqItem[open] summary i::after {
          transform: translate(-50%, -50%) rotate(0deg);
        }

        .rivotFaqItem p {
          margin: 0;
          padding: 0 clamp(20px, 2.4vw, 30px) clamp(18px, 2vw, 24px);
          color: #5d6570;
          font-size: clamp(14px, .95vw, 16px);
          font-weight: 650;
          line-height: 1.6;
        }

        @media (max-width: 800px) {
          .rivotFaqsShell {
            width: min(100%, 760px);
          }
        }

        @media (max-width: 560px) {
          .rivotFaqs {
            padding: 40px 14px;
          }

          .rivotFaqTabs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .rivotFaqTabs button {
            min-height: 48px;
            padding-inline: 14px;
            font-size: 14px;
          }

          .rivotFaqItem summary {
            min-height: 64px;
            padding: 0 18px;
          }

          .rivotFaqItem p {
            padding: 0 18px 20px;
          }
        }

        @media (max-width: 380px) {
          .rivotFaqTabs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
