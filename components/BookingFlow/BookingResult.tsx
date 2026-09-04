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
  return amount.startsWith("Rs") || amount.startsWith("\u20b9") ? amount : `Rs ${amount}`;
}

function formatDate(raw: string) {
  if (!raw || raw === "Not available") return raw;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString();
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

  return (
    <main className="bookingResultPage">
      <section className="bookingResultCard">
        <div className="bookingResultIcon bookingResultSuccessIcon"><CheckIcon /></div>
        <p className="bookingResultEyebrow">RIVOT MOTORS / {isConfirmed ? "BOOKING CONFIRMED" : "BOOKING STATUS"}</p>
        <h1>{isConfirmed ? "Booking Successful!" : "Booking Under Verification"}</h1>
        <p className="bookingResultMessage">
          {isConfirmed
            ? "Thank you for booking your RIVOT nx100. Your payment has been processed successfully and your booking is confirmed. You will receive a confirmation email shortly with all the details."
            : "We are checking the payment status for your RIVOT nx100 booking. Your booking will be confirmed only after successful gateway verification."}
        </p>

        <div className="bookingResultDetails">
          <h2>Booking Details</h2>
          <div><span>Payment ID</span><strong>{loading ? "Loading..." : value(loadedBooking, ["payment_id"], error ? "Error loading" : "N/A")}</strong></div>
          <div><span>Order ID</span><strong>{value(loadedBooking, ["order_id"], orderId || "N/A")}</strong></div>
          <div><span>Amount Paid</span><strong>{formatAmount(loadedBooking)}</strong></div>
          <div><span>Status</span><strong className={isConfirmed ? "confirmed" : ""}>{statusText}</strong></div>
          <div><span>Customer Name</span><strong>{customerName || "Not available"}</strong></div>
          <div><span>Model</span><strong>{value(loadedBooking, ["model"], "NX100")}</strong></div>
          <div><span>Color</span><strong>{value(loadedBooking, ["color"], "Selected")}</strong></div>
          <div><span>Email</span><strong>{value(loadedBooking, ["email"], "Not available")}</strong></div>
          <div><span>Phone</span><strong>{value(loadedBooking, ["phone"], "Not available")}</strong></div>
          <div><span>Address</span><strong>{address || "Not available"}</strong></div>
          <div><span>Booking Date</span><strong>{formatDate(value(loadedBooking, ["created_at"], "Not available"))}</strong></div>
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
.bookingResultPage { min-height: 100vh; display: grid; place-items: center; padding: 132px 20px 70px; background: radial-gradient(circle at 50% 0%, rgba(206,103,35,.14), transparent 34%), #050606; color: #fff; font-family: inherit; }
.bookingResultCard { width: min(100%, 650px); margin: auto; padding: clamp(26px, 6vw, 48px); text-align: center; border: 1px solid rgba(255,255,255,.11); border-radius: 15px; background: rgba(255,255,255,.055); box-shadow: 0 24px 70px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05); backdrop-filter: blur(18px); }
.bookingResultIcon { width: 80px; height: 80px; margin: 0 auto 20px; display: grid; place-items: center; border-radius: 50%; background: #31864b; color: #fff; font-size: 42px; font-weight: 700; animation: bookingSuccessBounce 2s ease infinite; }
.bookingResultSuccessIcon { background: transparent; color: #4caf50; filter: drop-shadow(0 0 24px rgba(76,175,80,.28)); }
.bookingResultSuccessIcon svg { width: 80px; height: 80px; display: block; }
.bookingResultFailed .bookingResultIcon { background: #9f3d32; }
.bookingResultEyebrow { margin: 0; color: #ef7430; font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.bookingResultCard h1 { margin: 12px 0 18px; color: #ce6723; font-size: clamp(28px, 4.4vw, 38px); font-weight: 700; letter-spacing: 0; }
.bookingResultMessage { max-width: 540px; margin: 0 auto; color: #c8ccc7; font-size: clamp(15px, 2vw, 18px); line-height: 1.65; }
.bookingResultDetails { margin: 30px 0 0; padding: 20px; border-radius: 10px; text-align: left; background: rgba(255,255,255,.09); }
.bookingResultDetails h2 { margin: 0 0 14px; color: #ce6723; font-size: 18px; font-weight: 800; letter-spacing: 0; }
.bookingResultDetails div { display: flex; justify-content: space-between; gap: 18px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.bookingResultDetails div:last-child { border: 0; }
.bookingResultDetails span { color: #999; font-size: 14px; font-weight: 700; }
.bookingResultDetails strong { max-width: 62%; color: #fff; text-align: right; overflow-wrap: anywhere; font-size: 14px; font-weight: 650; }
.confirmed { color: #55c676 !important; }
.bookingResultError { margin: 14px 0 0; color: #ffb08b; font-size: 13px; font-weight: 700; }
.bookingResultActions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
.bookingResultButton, .bookingResultSecondary { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; padding: 0 24px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 800; transition: background .2s ease, color .2s ease, transform .2s ease; }
.bookingResultButton { border: 1px solid #ce6723; background: #ce6723; color: #fff; }
.bookingResultSecondary { border: 1px solid #ce6723; color: #ce6723; }
.bookingResultButton:hover, .bookingResultSecondary:hover { background: #e07a3a; border-color: #e07a3a; color: #fff; transform: translateY(-1px); }
@keyframes bookingSuccessBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@media (max-width: 520px) { .bookingResultPage { padding: 102px 14px 42px; align-items: start; } .bookingResultCard { padding: 24px 18px; } .bookingResultDetails { padding: 18px; } .bookingResultDetails div { flex-direction: column; gap: 5px; } .bookingResultDetails strong { max-width: 100%; text-align: left; } .bookingResultActions { display: grid; grid-template-columns: 1fr; } .bookingResultButton, .bookingResultSecondary { width: 100%; } }
`;
