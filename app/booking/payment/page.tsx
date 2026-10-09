"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bike, Check, LockKeyhole, Mail, Palette, ReceiptText, RotateCcw, ShieldCheck } from "lucide-react";

type Booking = { order_id?: string; first_name?: string; model?: string; color?: string; amount?: string };

function formatVehicle(model?: string) {
  if (!model) return "NX100";
  return model.toLowerCase().includes("nx100") ? model : `NX100 (${model})`;
}

function formatAmount(amount?: string) {
  const numericAmount = Number(amount);
  return amount && Number.isFinite(numericAmount)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(numericAmount)
    : amount || "Unavailable";
}

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
        <section className="bookingFlowSummary" aria-label="Booking and payment details">
        <header className="bookingFlowHero">
          <span className="bookingFlowHeroIcon" aria-hidden="true"><LockKeyhole /></span>
          <p className="bookingFlowEyebrow">SECURE CHECKOUT</p>
          <h1>Complete your booking</h1>
          <p className="bookingFlowHeroCopy">Review your booking details and make a secure payment to confirm it.</p>
        </header>
        {loading ? <p className="bookingFlowMuted">Loading booking details...</p> : null}
        {error ? <div className="bookingFlowError">{error}</div> : null}
        {booking ? (
          <>
              <div className="bookingFlowDetails">
                <div className="bookingFlowDetail"><span className="bookingFlowDetailIcon" aria-hidden="true"><ReceiptText /></span><span className="bookingFlowDetailLabel">Order ID</span><strong>{booking.order_id || orderId}</strong></div>
                <div className="bookingFlowDetail"><span className="bookingFlowDetailIcon" aria-hidden="true"><Bike /></span><span className="bookingFlowDetailLabel">Vehicle</span><strong>{formatVehicle(booking.model)}</strong></div>
                <div className="bookingFlowDetail"><span className="bookingFlowDetailIcon" aria-hidden="true"><Palette /></span><span className="bookingFlowDetailLabel">Colour</span><strong className="bookingFlowColour"><span className="bookingFlowColourSwatch" aria-hidden="true" />{booking.color || "Selected colour"}</strong></div>
              </div>
              <div className="bookingFlowAmount"><span>Amount to Pay</span><strong>{formatAmount(booking.amount)}</strong></div>
              <p className="bookingFlowCopy"><span className="bookingFlowCheck" aria-hidden="true"><Check /></span>Your booking is reserved. Complete the payment to confirm it.</p>
              <button className="bookingFlowButton" type="button" onClick={startPayment} disabled={paying}>{paying ? "Opening payment..." : booking.amount ? `Pay ${formatAmount(booking.amount)} securely` : "Proceed to secure payment"}<ArrowRight aria-hidden="true" /></button>
              <p className="bookingFlowPowered"><LockKeyhole aria-hidden="true" />Secure payment powered by Zaakpay</p>
              <div className="bookingFlowBenefits" aria-label="Payment benefits">
                <div><span aria-hidden="true"><RotateCcw /></span><p>Refundable<br />Booking</p></div>
                <div><span aria-hidden="true"><ShieldCheck /></span><p>Secure<br />Payment</p></div>
                <div><span aria-hidden="true"><Mail /></span><p>Instant<br />Confirmation</p></div>
              </div>
              <Link className="bookingFlowBack" href="/book-now">Back to booking</Link>
          </>
        ) : <Link className="bookingFlowBack bookingFlowBackAlone" href="/book-now">Back to booking</Link>}
        </section>
      </section>
      <style>{styles}</style>
    </main>
  );
}

const styles = `
.bookingFlowPage { min-height:100vh;padding:76px 20px 56px;background:radial-gradient(circle at 50% 0%,#fff3ec 0%,#fff 42%,#fff 100%);color:#142033;font-family:inherit; }
.bookingFlowCard { width:min(100%,720px);margin:0 auto;text-align:left; }
.bookingFlowHero { padding:5px 14px 15px;text-align:center; }
.bookingFlowHeroIcon { display:grid;width:60px;height:60px;place-items:center;margin:0 auto 8px;border:7px solid #ffede5;border-radius:50%;background:#ff5a12;color:#fff;box-shadow:0 0 0 8px #fff7f3,inset 0 2px 5px rgba(255,255,255,.2); }
.bookingFlowHeroIcon svg { width:25px;height:25px;stroke-width:2.3; }
.bookingFlowEyebrow { margin:0 0 2px;color:#f15a1a;font-size:11px;font-weight:800;letter-spacing:.02em; }
.bookingFlowHero h1 { margin:0 0 4px;color:#101b2d;font-size:clamp(27px,3vw,33px);line-height:1.14;font-weight:800;letter-spacing:-.035em; }
.bookingFlowHeroCopy { margin:0;color:#617089;font-size:13px;line-height:1.45; }
.bookingFlowSummary { padding:17px 20px 16px;border:1px solid #e7e9ed;border-radius:12px;background:#fff;box-shadow:0 12px 34px rgba(29,39,55,.10); }
.bookingFlowDetails { display:grid;margin-top:5px;padding-top:6px;border-top:1px solid #f0f1f3; }
.bookingFlowDetail { display:grid;grid-template-columns:38px 122px minmax(0,1fr);align-items:center;gap:12px;min-height:44px;padding:5px 6px;border-bottom:1px solid #eef0f3; }
.bookingFlowDetail:last-child { border-bottom:0; }
.bookingFlowDetailIcon { display:grid;width:32px;height:32px;place-items:center;border-radius:8px;background:#fff1eb;color:#ff5a12; }
.bookingFlowDetailIcon svg { width:18px;height:18px;stroke-width:2.2; }
.bookingFlowDetailLabel { padding-right:12px;border-right:1px solid #e9ecf0;color:#617089;font-size:12px;font-weight:500; }
.bookingFlowDetail strong { min-width:0;color:#192439;font-size:13px;font-weight:700;overflow-wrap:anywhere; }
.bookingFlowColour { display:flex;align-items:center;gap:9px; }
.bookingFlowColourSwatch { display:inline-block;flex:none;width:22px;height:22px;border:1px solid #bfc8d4;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #fff; }
.bookingFlowAmount { display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:75px;margin:5px 0 9px;border-radius:9px;background:linear-gradient(110deg,#fff3ed,#fff0e9 65%,#fff6f1);color:#ee4c10; }
.bookingFlowAmount span { font-size:13px;font-weight:700; }
.bookingFlowAmount strong { font-size:clamp(29px,3.5vw,36px);font-weight:800;line-height:1.1;letter-spacing:-.035em; }
.bookingFlowCopy { display:flex;align-items:center;gap:11px;margin:0 0 11px;padding:8px 14px;border-radius:8px;background:#eaf9ee;color:#19674a;font-size:12px;line-height:1.4; }
.bookingFlowCheck { display:grid;flex:none;width:25px;height:25px;place-items:center;border-radius:50%;background:#0cad46;color:#fff; }
.bookingFlowCheck svg { width:17px;height:17px;stroke-width:3; }
.bookingFlowButton { display:flex;width:min(100%,500px);min-height:46px;align-items:center;justify-content:center;gap:10px;margin:0 auto;border:0;border-radius:6px;background:linear-gradient(90deg,#ff4f0b,#ff5b0d);color:#fff;font-size:13px;font-weight:800;box-shadow:0 8px 16px rgba(255,80,13,.18);cursor:pointer;transition:filter .2s,transform .2s; }
.bookingFlowButton svg { width:18px;height:18px; }
.bookingFlowButton:disabled { opacity:.65;cursor:wait; }
.bookingFlowButton:not(:disabled):hover { filter:brightness(.95);transform:translateY(-1px); }
.bookingFlowPowered { display:flex;align-items:center;justify-content:center;gap:6px;margin:8px 0 11px;color:#71809a;font-size:11px; }
.bookingFlowPowered svg { width:12px;height:12px;color:#16243a; }
.bookingFlowBenefits { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;padding:13px 0;border-top:1px solid #e9edf0; }
.bookingFlowBenefits > div { display:flex;align-items:center;justify-content:center;gap:12px;border-right:1px solid #e9edf0; }
.bookingFlowBenefits > div:last-child { border-right:0; }
.bookingFlowBenefits > div > span { display:grid;flex:none;width:38px;height:38px;place-items:center;border-radius:50%;background:#fff0ea;color:#ff5a12; }
.bookingFlowBenefits svg { width:21px;height:21px;stroke-width:2.2; }
.bookingFlowBenefits p { margin:0;color:#152238;font-size:12px;font-weight:600;line-height:1.15; }
.bookingFlowBack { display:flex;min-height:40px;align-items:center;justify-content:center;border:1px solid #ff5a12;border-radius:6px;color:#ff5a12;font-size:13px;font-weight:800;text-decoration:none;transition:background .2s,color .2s; }
.bookingFlowBack:hover { background:#ff5a12;color:#fff; }
.bookingFlowBackAlone { width:max-content;margin:24px auto 0;padding:0 22px; }
.bookingFlowMuted,.bookingFlowError { margin:0 0 12px;padding:14px 18px;border:1px solid #e7e9ed;border-radius:10px;background:#fff;color:#62686b;font-size:14px; }
.bookingFlowError { border-color:#f5b7ae;background:#fff2ef;color:#ad3424; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader { position:absolute;background:transparent!important;color:#151515!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:brightness(0)!important; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton) { color:#252525!important; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton):hover { color:#ff5a12!important; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu,.rivotExploreMenu,.rivotProductsMenuInner) { border-color:rgba(30,30,30,.10);background:rgba(255,255,255,.94);box-shadow:0 18px 42px rgba(0,0,0,.11); }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu a,.rivotExploreMenu a,.rivotProductsMenuInner h2,.rivotProductCard,.rivotProductCard span) { color:#171717!important; }
body:has(.bookingFlowPage) .rivotHeader.isHomeHeader .rivotProductCard { border-color:#ebe5df;background:#fff; }
html[data-theme="dark"] .bookingFlowPage { background:radial-gradient(circle at 50% 0%,rgba(255,90,18,.13),transparent 38%),#0b0c0c!important;color:#f5f5f2!important; }
html[data-theme="dark"] .bookingFlowCard { background:transparent!important;border:0!important;color:#f5f5f2!important; }
html[data-theme="dark"] .bookingFlowPage h1 { color:#f5f5f2!important; }
html[data-theme="dark"] .bookingFlowEyebrow { color:#ff8d54!important; }
html[data-theme="dark"] .bookingFlowHeroCopy { color:#b9bcb8!important; }
html[data-theme="dark"] .bookingFlowSummary,html[data-theme="dark"] .bookingFlowMuted { background:#151717;border-color:rgba(255,255,255,.10);box-shadow:0 14px 38px rgba(0,0,0,.26); }
html[data-theme="dark"] .bookingFlowDetails,html[data-theme="dark"] .bookingFlowDetail,html[data-theme="dark"] .bookingFlowBenefits { border-color:rgba(255,255,255,.10); }
html[data-theme="dark"] .bookingFlowDetailLabel,html[data-theme="dark"] .bookingFlowBenefits > div { border-color:rgba(255,255,255,.10); }
html[data-theme="dark"] .bookingFlowDetailLabel,html[data-theme="dark"] .bookingFlowPowered { color:#aab5c4; }
html[data-theme="dark"] .bookingFlowDetail strong,html[data-theme="dark"] .bookingFlowBenefits p { color:#f3f3f0!important; }
html[data-theme="dark"] .bookingFlowAmount { background:linear-gradient(110deg,#362016,#2c1b15);color:#ff8d54; }
html[data-theme="dark"] .bookingFlowCopy { background:#113325;color:#b7f4cd!important; }
html[data-theme="dark"] .bookingFlowPowered svg { color:#d9e0ea; }
html[data-theme="dark"] .bookingFlowBack { background:#151717;color:#ff7433; }
html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader { background:transparent!important;color:#f5f5f2!important; }
html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:none!important; }
html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton) { color:#f5f5f2!important; }
html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu,.rivotExploreMenu,.rivotProductsMenuInner) { border-color:rgba(255,255,255,.12);background:rgba(18,20,20,.96); }
html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu a,.rivotExploreMenu a,.rivotProductsMenuInner h2,.rivotProductCard,.rivotProductCard span) { color:#f5f5f2!important; }
@media(max-width:760px){.bookingFlowPage{padding:calc(76px + env(safe-area-inset-top)) 14px 40px}.bookingFlowSummary{padding:15px}.bookingFlowDetail{grid-template-columns:38px 105px minmax(0,1fr);gap:9px}body:has(.bookingFlowPage) .rivotHeader.isHomeHeader .rivotMenuButton{color:#171717!important}html[data-theme="dark"] body:has(.bookingFlowPage) .rivotHeader.isHomeHeader .rivotMenuButton{color:#fff!important}}
@media(max-width:480px){
  .bookingFlowPage{padding:calc(72px + env(safe-area-inset-top)) 12px 32px;overflow-x:clip}
  .bookingFlowHero{padding:4px 2px 15px}
  .bookingFlowHeroIcon{width:54px;height:54px;border-width:6px;box-shadow:0 0 0 6px #fff7f3,inset 0 2px 5px rgba(255,255,255,.2)}
  .bookingFlowHeroIcon svg{width:23px;height:23px}
  .bookingFlowHero h1{font-size:clamp(22px,6vw,27px);line-height:1.16;text-wrap:balance}
  .bookingFlowHeroCopy{max-width:310px;margin:0 auto;font-size:12px}
  .bookingFlowSummary{padding:12px}
  .bookingFlowDetail{grid-template-columns:36px minmax(0,1fr);grid-template-rows:auto auto;column-gap:10px;row-gap:2px;min-height:56px;padding:7px 2px}
  .bookingFlowDetailIcon{grid-row:1/span 2;width:32px;height:32px}
  .bookingFlowDetailIcon svg{width:18px;height:18px}
  .bookingFlowDetailLabel{grid-column:2;padding:0;border:0;font-size:12px}
  .bookingFlowDetail strong{grid-column:2;font-size:13px;line-height:1.35}
  .bookingFlowAmount{min-height:72px;margin-top:7px}
  .bookingFlowAmount strong{font-size:32px}
  .bookingFlowCopy{gap:9px;padding:9px 10px;font-size:12px}
  .bookingFlowButton{width:100%;min-height:48px;padding:0 9px;font-size:13px}
  .bookingFlowBenefits{padding:12px 0}
  .bookingFlowBenefits>div{flex-direction:column;gap:5px;text-align:center}
  .bookingFlowBenefits>div>span{width:33px;height:33px}
  .bookingFlowBenefits svg{width:18px;height:18px}
  .bookingFlowBenefits p{font-size:10px}
  .bookingFlowBack{min-height:44px}
}
@media(max-width:360px){.bookingFlowSummary{padding:10px}.bookingFlowHero h1{font-size:21px}.bookingFlowHeroCopy{font-size:11px}.bookingFlowBenefits p{font-size:9px}.bookingFlowPowered{font-size:10px}}
`;
