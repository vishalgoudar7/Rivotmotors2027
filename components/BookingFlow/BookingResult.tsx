"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = Record<string, unknown>;

function value(booking: Booking, keys: string[], fallback = "Not available") {
  const found = keys.map((key) => booking[key]).find((item) => item !== null && item !== undefined && item !== "");
  return found === undefined ? fallback : String(found);
}

function formatAmount(booking: Booking) {
  const amount = value(booking, ["amount"], "499");
  if (amount.startsWith("Rs") || amount.startsWith("\u20b9")) return amount;
  const numericAmount = Number(amount);
  return Number.isFinite(numericAmount)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(numericAmount)
    : `\u20b9${amount}`;
}

function formatDate(raw: string) {
  if (!raw || raw === "Not available") return raw;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="31" fill="currentColor" opacity=".16" />
      <circle cx="36" cy="36" r="23" fill="currentColor" />
      <path d="M25 36.4L32.3 43.7L48 28" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookingResult({ orderId, failed = false, reason = "" }: { orderId: string; failed?: boolean; reason?: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(!failed);
  const [error, setError] = useState("");

  useEffect(() => {
    if (failed) return;
    if (!orderId) {
      setError("No order ID was provided.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadBooking(attempt = 0) {
      try {
        const response = await fetch(`/get-booking-details?order_id=${encodeURIComponent(orderId)}`);
        const payload = (await response.json()) as { success?: boolean; booking?: Booking; message?: string };
        if (!response.ok || !payload.success) {
          throw new Error(payload.message || "Booking not found");
        }

        if (!cancelled) {
          setBooking(payload.booking || null);
          setError("");
          setLoading(false);
        }
      } catch (requestError) {
        if (attempt < 3) {
          window.setTimeout(() => loadBooking(attempt + 1), (attempt + 1) * 1000);
          return;
        }

        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load booking details");
          setLoading(false);
        }
      }
    }

    const timer = window.setTimeout(() => loadBooking(), 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [failed, orderId]);

  if (failed) {
    return (
      <main className="bookingResultPage">
        <section className="bookingResultCard bookingResultFailed">
          <div className="bookingResultIcon">!</div>
          <p className="bookingResultEyebrow">RIVOT MOTORS / PAYMENT</p>
          <h1>Payment was not completed</h1>
          <p className="bookingResultMessage">Your payment could not be verified. No confirmed booking was created. You can return to the booking page and try again.</p>
          {orderId || reason ? (
            <div className="bookingResultDetails bookingResultFailedDetails">
              {orderId ? <div><span>Order ID</span><strong>{orderId}</strong></div> : null}
              {reason ? <div><span>Reason</span><strong>{reason}</strong></div> : null}
            </div>
          ) : null}
          <Link className="bookingResultButton" href="/book-now">Try again</Link>
        </section>
        <style>{styles}</style>
      </main>
    );
  }

  const loadedBooking = booking || {};
  const statusText = value(loadedBooking, ["status"], loading ? "Verifying" : "Pending");
  const isConfirmed = statusText === "Confirmed" || statusText === "payment_completed";
  const customerName = `${value(loadedBooking, ["first_name"], "")} ${value(loadedBooking, ["last_name"], "")}`.trim();
  const address = [
    value(loadedBooking, ["address"], ""),
    value(loadedBooking, ["city"], ""),
    value(loadedBooking, ["state"], ""),
    value(loadedBooking, ["pincode"], ""),
  ].filter(Boolean).join(", ");
  const product = value(loadedBooking, ["product_name", "product"], "NX100");
  const model = value(loadedBooking, ["model"], "Pro");
  const color = value(loadedBooking, ["color"], "Selected");
  const email = value(loadedBooking, ["email"], "Not available");
  const phone = value(loadedBooking, ["phone", "mobile"], "Not available");
  const paymentDate = formatDate(value(loadedBooking, ["payment_date", "updated_at", "created_at"], "Not available"));

  return (
    <main className="bookingResultPage">
      <section className="bookingResultCard">
        <header className="bookingResultHero">
          <div className="bookingResultIcon bookingResultSuccessIcon"><CheckIcon /></div>
          <h1>{isConfirmed ? "Your Booking is Confirmed!" : "Booking Under Verification"}</h1>
          <p className="bookingResultMessage">
            {isConfirmed
              ? "Thank you for being a part of the RIVOT movement."
              : `We are verifying the payment for your RIVOT ${product} booking.`}
          </p>
        </header>

        <section className="bookingInfoCard bookingInfoWide">
          <h2><span className="bookingSectionIcon">▣</span>Booking Details</h2>
          <div className="bookingInfoGrid bookingInfoGridFour">
            <div><span>Order ID</span><strong>{value(loadedBooking, ["order_id"], orderId || "N/A")}</strong></div>
            <div><span>Payment Status</span><strong className={`bookingStatus ${isConfirmed ? "confirmed" : ""}`}><i>✓</i>{isConfirmed ? "Payment Successful" : statusText}</strong></div>
            <div><span>Payment ID</span><strong>{loading ? "Loading..." : value(loadedBooking, ["payment_id"], error ? "Error loading" : "N/A")}</strong></div>
            <div><span>Payment Date</span><strong>{paymentDate}</strong></div>
            <div><span>Amount Paid</span><strong>{formatAmount(loadedBooking)}</strong></div>
          </div>
        </section>

        <div className="bookingInfoColumns">
          <section className="bookingInfoCard">
            <h2><span className="bookingSectionIcon">◆</span>Vehicle Details</h2>
            <div className="bookingInfoGrid">
              <div><span>Product</span><strong>{product}</strong></div>
              <div><span>Model</span><strong>{model}</strong></div>
              <div><span>Color</span><strong><i className="bookingColorSwatch" style={{ backgroundColor: color.toLowerCase() }} />{color}</strong></div>
            </div>
          </section>

          <section className="bookingInfoCard">
            <h2><span className="bookingSectionIcon">♙</span>Customer Details</h2>
            <div className="bookingInfoGrid">
              <div><span>Name</span><strong>{customerName || "Not available"}</strong></div>
              <div><span>Email</span><strong><a href={`mailto:${email}`}>{email}</a></strong></div>
              <div><span>Mobile</span><strong>{phone}</strong></div>
              <div><span>Address</span><strong>{address || "Not available"}</strong></div>
              <div><span>Source</span><strong>{value(loadedBooking, ["source"], "Website")}</strong></div>
            </div>
          </section>
        </div>

        {error ? <p className="bookingResultError">Could not load full booking details: {error}</p> : null}

        <div className="bookingResultActions">
          <Link className="bookingResultButton" href="/">Back to Home</Link>
          <Link className="bookingResultSecondary" href="/products">View Products</Link>
        </div>
      </section>
      <style>{styles}</style>
    </main>
  );
}

const styles = `
.bookingResultPage { min-height: 100vh; display:block; padding: 94px 20px 64px; background: linear-gradient(180deg,#fffaf7 0%,#fff 52%,#fff9f5 100%); color: #161616; font-family: inherit; }
.bookingResultCard { width:min(100%,920px);margin:0 auto;text-align:left; }
.bookingResultHero { margin-bottom:16px;padding:22px 28px 20px;text-align:center;border-radius:18px;background:radial-gradient(circle at 50% -15%,rgba(255,102,24,.20),transparent 38%),linear-gradient(120deg,#fff1e8,#fff8f3);box-shadow:0 10px 32px rgba(89,48,22,.07); }
.bookingResultIcon { width:56px;height:56px;margin:0 auto 10px;display:grid;place-items:center;border-radius:50%;background:#ff5a12;color:#fff;font-size:30px;font-weight:700; }
.bookingResultSuccessIcon { background: transparent; color: #ff5a12; filter: drop-shadow(0 8px 14px rgba(255,90,18,.22)); }
.bookingResultSuccessIcon svg { width:56px;height:56px;display:block; }
.bookingResultFailed .bookingResultIcon { background: #9f3d32; }
.bookingResultFailed { max-width:650px;padding:36px;text-align:center;border:1px solid #eee7e2;border-radius:16px;background:#fff;box-shadow:0 12px 36px rgba(73,42,23,.08); }
.bookingResultFailed .bookingResultMessage { max-width:540px;margin:0 auto; }
.bookingResultEyebrow { margin: 0; color: #ef7430; font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.bookingResultCard h1 { margin:0 0 5px;color:#111;font-size:clamp(27px,3vw,34px);line-height:1.12;font-weight:800;letter-spacing:-.035em; }
.bookingResultMessage { margin:0;color:#555;font-size:14px;line-height:1.5; }
.bookingInfoCard { padding:20px;border:1px solid #eee7e2;border-radius:15px;background:rgba(255,255,255,.96);box-shadow:0 8px 24px rgba(73,42,23,.065); }
.bookingInfoWide { margin-bottom: 16px; }
.bookingInfoCard h2 { display:flex;align-items:center;gap:10px;margin:0 0 16px;color:#171717;font-size:16px;line-height:1.2;font-weight:800;letter-spacing:-.02em; }
.bookingSectionIcon { width:32px;height:32px;display:inline-grid;place-items:center;border-radius:8px;background:#ff5a12;color:#fff;font-size:15px;box-shadow:0 6px 12px rgba(255,90,18,.20); }
.bookingInfoColumns { display:grid;grid-template-columns:1fr 1.25fr;gap:16px; }
.bookingInfoGrid { display:grid;gap:10px; }
.bookingInfoGridFour { grid-template-columns:1fr 1fr;column-gap:38px; }
.bookingInfoGrid div { min-width:0;display:grid;grid-template-columns:115px minmax(0,1fr);gap:10px;align-items:start; }
.bookingInfoGrid span { color:#77808b;font-size:12.5px;line-height:1.45;font-weight:600; }
.bookingInfoGrid strong { position:relative;min-width:0;color:#282828;font-size:12.5px;font-weight:700;line-height:1.45;overflow-wrap:anywhere; }
.bookingInfoGrid strong:before { content:":";position:absolute;left:-22px;color:#b7b7b7; }
.bookingInfoGrid a { color:#1683e4;text-underline-offset:2px; }
.bookingStatus { display:inline-flex;align-items:center;max-width:100%;width:fit-content;padding:4px 9px;border-radius:999px;background:#fff1db;color:#a46300!important; }
.bookingStatus.confirmed { background:#dcf8e7;color:#159447!important; }
.bookingStatus i { flex:none;display:inline-grid;width:15px;height:15px;place-items:center;margin-right:5px;border-radius:50%;background:#a46300;color:#fff;font-size:10px;font-style:normal; }
.bookingStatus.confirmed i { background:#159447; }
.bookingColorSwatch { display:inline-block;width:18px;height:18px;margin-right:6px;border:1px solid #adb4ba;border-radius:50%;vertical-align:-4px; }
.bookingResultDetails { margin: 30px 0 0; padding: 20px; border-radius: 10px; text-align: left; background: #fff; }
.bookingResultDetails div { display:flex;justify-content:space-between;gap:18px;padding:11px 0;border-bottom:1px solid #eee; }
.bookingResultDetails strong { max-width:62%;text-align:right;overflow-wrap:anywhere; }
.bookingResultError { margin: 14px 0 0; color: #ffb08b; font-size: 13px; font-weight: 700; }
.bookingResultActions { display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:24px; }
.bookingResultButton,.bookingResultSecondary { display:inline-flex;min-width:190px;min-height:48px;align-items:center;justify-content:center;padding:0 24px;border-radius:7px;text-decoration:none;font-size:14px;font-weight:800;transition:.2s ease; }
.bookingResultButton { border:1px solid #ff5a12;background:#ff5a12;color:#fff;box-shadow:0 8px 18px rgba(255,90,18,.20); }
.bookingResultSecondary { border:1px solid #ff5a12;color:#ff5a12;background:#fff; }
.bookingResultButton:hover,.bookingResultSecondary:hover { background:#e94d08;border-color:#e94d08;color:#fff;transform:translateY(-1px); }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader { position:absolute;background:transparent!important;color:#151515!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:brightness(0)!important; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton) { color:#252525!important; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton):hover { color:#ff5a12!important; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu,.rivotExploreMenu,.rivotProductsMenuInner) { border-color:rgba(30,30,30,.10);background:rgba(255,255,255,.94);box-shadow:0 18px 42px rgba(0,0,0,.11); }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu a,.rivotExploreMenu a,.rivotProductsMenuInner h2,.rivotProductCard,.rivotProductCard span) { color:#171717!important; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotProductCard { border-color:#ebe5df;background:#fff; }
body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotProductTagline { color:#6e7478!important; }
html[data-theme="dark"] .bookingResultPage { background:radial-gradient(circle at 50% 5%,rgba(255,90,18,.12),transparent 31%),#0b0c0c!important;color:#f5f5f2!important; }
html[data-theme="dark"] .bookingResultCard { background:transparent!important;color:#f5f5f2!important;border-color:transparent!important; }
html[data-theme="dark"] .bookingResultHero { background:radial-gradient(circle at 50% -15%,rgba(255,105,35,.24),transparent 40%),linear-gradient(120deg,#211711,#141515);box-shadow:0 14px 42px rgba(0,0,0,.3); }
html[data-theme="dark"] .bookingInfoCard,html[data-theme="dark"] .bookingResultFailed { background:#151717!important;color:#f5f5f2!important;border-color:rgba(255,255,255,.10)!important;box-shadow:0 14px 38px rgba(0,0,0,.26); }
html[data-theme="dark"] .bookingResultPage :is(h1,h2) { color:#f5f5f2!important; }
html[data-theme="dark"] .bookingResultPage p { color:#b9bcb8!important; }
html[data-theme="dark"] .bookingInfoGrid span { color:#999f9f; }
html[data-theme="dark"] .bookingInfoGrid strong { color:#f3f3f0; }
html[data-theme="dark"] .bookingInfoGrid strong:before { color:#666b69; }
html[data-theme="dark"] .bookingResultSecondary { background:#151717;color:#ff7433; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader { background:transparent!important;color:#f5f5f2!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:none!important; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton) { color:#f5f5f2!important; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu,.rivotExploreMenu,.rivotProductsMenuInner) { border-color:rgba(255,255,255,.12);background:rgba(18,20,20,.96); }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu a,.rivotExploreMenu a,.rivotProductsMenuInner h2,.rivotProductCard,.rivotProductCard span) { color:#f5f5f2!important; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotProductCard { border-color:rgba(255,255,255,.10);background:#1b1d1d; }
html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotProductTagline { color:#aeb3b0!important; }
@media(max-width:680px){body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotMenuButton{color:#171717!important}html[data-theme="dark"] body:has(.bookingResultPage) .rivotHeader.isHomeHeader .rivotMenuButton{color:#fff!important}}
@media (max-width:760px){.bookingInfoColumns,.bookingInfoGridFour{grid-template-columns:1fr}.bookingResultPage{padding:calc(78px + env(safe-area-inset-top)) 14px 42px}.bookingResultHero{padding:20px 16px}.bookingInfoCard{padding:18px}.bookingInfoGrid div{grid-template-columns:100px minmax(0,1fr)} }
@media (max-width:480px){.bookingResultPage{padding-right:12px;padding-left:12px}.bookingResultHero{margin-bottom:12px;padding:18px 14px;border-radius:15px}.bookingResultIcon,.bookingResultSuccessIcon svg{width:50px;height:50px}.bookingResultCard h1{font-size:clamp(24px,7.5vw,30px);line-height:1.16}.bookingResultHero h1{font-size:clamp(13px,4.7vw,22px);letter-spacing:-.045em;white-space:nowrap}.bookingResultMessage{font-size:13px}.bookingInfoWide{margin-bottom:12px}.bookingInfoColumns{gap:12px}.bookingInfoCard{padding:16px 14px;border-radius:13px}.bookingInfoCard h2{margin-bottom:14px;font-size:15px}.bookingSectionIcon{width:30px;height:30px}.bookingInfoGrid{gap:11px}.bookingInfoGrid div{grid-template-columns:minmax(74px,30%) minmax(0,1fr);gap:14px}.bookingInfoGrid span,.bookingInfoGrid strong{font-size:12.5px}.bookingInfoGrid strong:before{left:-12px}.bookingResultActions{display:grid;grid-template-columns:1fr;margin-top:18px}.bookingResultButton,.bookingResultSecondary{width:100%;min-width:0}.bookingResultDetails div{flex-direction:column;gap:5px}.bookingResultDetails strong{max-width:100%;text-align:left}.bookingResultFailed{padding:24px 18px} }
@media (max-width:360px){.bookingInfoCard{padding:15px 12px}.bookingInfoGrid div{grid-template-columns:minmax(68px,29%) minmax(0,1fr);gap:12px}.bookingInfoGrid strong:before{left:-10px}.bookingResultFailed h1{font-size:24px} }
`;
