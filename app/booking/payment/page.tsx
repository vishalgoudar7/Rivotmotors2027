"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = { order_id?: string; first_name?: string; model?: string; color?: string; amount?: string };

export default async function BookingPaymentPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const { order_id: orderId = "" } = await searchParams;
  return <BookingPayment orderId={orderId} />;
}

function BookingPayment({ orderId }: { orderId: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID was provided.");
      setLoading(false);
      return;
    }

    fetch(`/get-booking-details?order_id=${encodeURIComponent(orderId)}`)
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok || !payload.success) throw new Error(payload.message || "Booking not found.");
        setBooking(payload.booking);
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Booking not found."))
      .finally(() => setLoading(false));
  }, [orderId]);

  async function startPayment() {
    setPaying(true);
    setError("");
    try {
      const response = await fetch("/api/booking/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success || !payload.action || !payload.fields) throw new Error(payload.message || "Payment could not be started.");
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payload.action;
      Object.entries(payload.fields as Record<string, string>).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Payment could not be started.");
      setPaying(false);
    }
  }

  return (
    <main className="bookingFlowPage">
      <section className="bookingFlowCard">
        <p className="bookingFlowEyebrow">RIVOT MOTORS / SECURE CHECKOUT</p>
        <h1>Complete your NX100 booking</h1>
        {loading ? <p className="bookingFlowMuted">Loading booking details...</p> : null}
        {error ? <div className="bookingFlowError">{error}</div> : null}
        {booking ? (
          <>
            <div className="bookingFlowDetails">
              <div><span>Order ID</span><strong>{booking.order_id || orderId}</strong></div>
              <div><span>Model</span><strong>{booking.model || "NX100"}</strong></div>
              <div><span>Colour</span><strong>{booking.color || "Selected colour"}</strong></div>
              <div><span>Booking amount</span><strong>Rs {booking.amount || "499"}</strong></div>
            </div>
            <p className="bookingFlowCopy">Your refundable booking is reserved. Continue to the configured Zaakpay payment page to complete the Rs 499 payment.</p>
            <button className="bookingFlowButton" onClick={startPayment} disabled={paying}>{paying ? "Opening payment..." : "Proceed to payment"} <span>→</span></button>
          </>
        ) : null}
        <Link className="bookingFlowBack" href="/book-now">Back to booking</Link>
      </section>
      <style>{styles}</style>
    </main>
  );
}

const styles = `
.bookingFlowPage { min-height: 100vh; padding: 150px 20px 80px; background: #090a09; color: #fff; font-family: inherit; }
.bookingFlowCard { width: min(100%, 680px); margin: auto; padding: clamp(28px, 6vw, 64px); border: 1px solid rgba(255,255,255,.14); background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.03)); box-shadow: 0 24px 70px rgba(0,0,0,.3); }
.bookingFlowEyebrow { color: #ef7430; font-size: 12px; font-weight: 800; letter-spacing: .12em; }
.bookingFlowCard h1 { margin: 18px 0 28px; font-size: clamp(30px, 5vw, 52px); line-height: 1.05; }
.bookingFlowDetails { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; margin: 30px 0; background: rgba(255,255,255,.14); }
.bookingFlowDetails div { display: flex; flex-direction: column; gap: 8px; padding: 18px; background: #111312; }
.bookingFlowDetails span, .bookingFlowMuted { color: #a5aaa4; font-size: 13px; }
.bookingFlowCopy { color: #cfd2ce; line-height: 1.7; }
.bookingFlowButton { width: 100%; margin-top: 24px; padding: 16px; border: 0; background: #ef7430; color: #fff; font-weight: 800; cursor: pointer; }
.bookingFlowButton:disabled { opacity: .65; cursor: wait; }
.bookingFlowButton span { margin-left: 12px; font-size: 20px; }
.bookingFlowBack { display: block; margin-top: 22px; color: #ef7430; text-align: center; text-decoration: none; }
.bookingFlowError { margin: 20px 0; padding: 14px; border: 1px solid #bf5c5c; color: #ffb1a8; }
@media (max-width: 520px) { .bookingFlowDetails { grid-template-columns: 1fr; } }
`;
