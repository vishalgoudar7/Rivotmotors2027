"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = Record<string, unknown>;

function value(booking: Booking, keys: string[], fallback = "Not available") {
  const found = keys.map((key) => booking[key]).find((item) => item !== null && item !== undefined && item !== "");
  return found === undefined ? fallback : String(found);
}

export function BookingResult({ orderId, failed = false }: { orderId: string; failed?: boolean }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(!failed);

  useEffect(() => {
    if (failed || !orderId) return;
    fetch(`/get-booking-details?order_id=${encodeURIComponent(orderId)}`)
      .then((response) => response.json())
      .then((payload: { booking?: Booking }) => setBooking(payload.booking || null))
      .finally(() => setLoading(false));
  }, [failed, orderId]);

  if (failed) {
    return (
      <main className="bookingResultPage">
        <section className="bookingResultCard bookingResultFailed">
          <div className="bookingResultIcon">!</div>
          <p className="bookingResultEyebrow">RIVOT MOTORS / PAYMENT</p>
          <h1>Payment was not completed</h1>
          <p className="bookingResultMessage">Your payment could not be verified. No confirmed booking was created. You can return to the booking page and try again.</p>
          <Link className="bookingResultButton" href="/book-now">Try again</Link>
        </section>
        <style>{styles}</style>
      </main>
    );
  }

  return (
    <main className="bookingResultPage">
      <section className="bookingResultCard">
        <div className="bookingResultIcon">✓</div>
        <p className="bookingResultEyebrow">RIVOT MOTORS / BOOKING CONFIRMED</p>
        <h1>Booking successful</h1>
        <p className="bookingResultMessage">Thank you for booking your RIVOT NX100. Your payment has been processed successfully.</p>
        <div className="bookingResultDetails">
          <div><span>Payment ID</span><strong>{loading ? "Loading..." : value(booking || {}, ["payment_id"])}</strong></div>
          <div><span>Order ID</span><strong>{value(booking || {}, ["order_id"], orderId)}</strong></div>
          <div><span>Amount paid</span><strong>Rs {value(booking || {}, ["amount"], "499")}</strong></div>
          <div><span>Status</span><strong className="confirmed">{value(booking || {}, ["status"], "Confirmed")}</strong></div>
          <div><span>Model / colour</span><strong>{value(booking || {}, ["model"], "NX100")} / {value(booking || {}, ["color"], "Selected")}</strong></div>
          <div><span>Customer</span><strong>{value(booking || {}, ["first_name"], "")}{value(booking || {}, ["last_name"], "") ? ` ${value(booking || {}, ["last_name"])}` : ""}</strong></div>
        </div>
        <div className="bookingResultActions"><Link className="bookingResultButton" href="/">Back to home</Link><Link className="bookingResultSecondary" href="/products">View products</Link></div>
      </section>
      <style>{styles}</style>
    </main>
  );
}

const styles = `
.bookingResultPage { min-height: 100vh; padding: 140px 20px 70px; background: #080909; color: #fff; font-family: inherit; }
.bookingResultCard { width: min(100%, 650px); margin: auto; padding: clamp(30px, 7vw, 70px); text-align: center; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.05); box-shadow: 0 24px 70px rgba(0,0,0,.35); }
.bookingResultIcon { width: 76px; height: 76px; margin: 0 auto 24px; display: grid; place-items: center; border-radius: 50%; background: #31864b; color: #fff; font-size: 42px; font-weight: 700; }
.bookingResultFailed .bookingResultIcon { background: #9f3d32; }
.bookingResultEyebrow { color: #ef7430; font-size: 12px; font-weight: 800; letter-spacing: .12em; }
.bookingResultCard h1 { margin: 16px 0; font-size: clamp(30px, 5vw, 48px); }
.bookingResultMessage { color: #c8ccc7; line-height: 1.7; }
.bookingResultDetails { margin: 30px 0; text-align: left; background: rgba(255,255,255,.07); }
.bookingResultDetails div { display: flex; justify-content: space-between; gap: 18px; padding: 15px 18px; border-bottom: 1px solid rgba(255,255,255,.1); }
.bookingResultDetails div:last-child { border: 0; }
.bookingResultDetails span { color: #969c96; }.bookingResultDetails strong { text-align: right; }.confirmed { color: #55c676; }
.bookingResultActions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }.bookingResultButton, .bookingResultSecondary { padding: 13px 24px; text-decoration: none; }.bookingResultButton { background: #ce6723; color: #fff; }.bookingResultSecondary { border: 1px solid #ce6723; color: #ce6723; }
@media (max-width: 520px) { .bookingResultDetails div { flex-direction: column; gap: 6px; }.bookingResultDetails strong { text-align: left; } }
`;
