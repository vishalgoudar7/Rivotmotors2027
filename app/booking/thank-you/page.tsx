import Link from "next/link";

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const { order_id: orderId = "" } = await searchParams;
  return (
    <main className="bookingThankYou">
      <section>
        <p>RIVOT MOTORS / THANK YOU</p>
        <h1>Thank you for choosing RIVOT.</h1>
        <span>Your payment was received and your booking is being confirmed.</span>
        <Link href={`/booking/success?order_id=${encodeURIComponent(orderId)}`}>View booking details <b>→</b></Link>
      </section>
      <style>{`.bookingThankYou{min-height:100vh;padding:180px 20px;background:#080909;color:#fff;font-family:Montserrat,sans-serif;text-align:center}.bookingThankYou section{max-width:680px;margin:auto}.bookingThankYou p{color:#ce6723;font-size:12px;font-weight:800;letter-spacing:.12em}.bookingThankYou h1{margin:22px 0;font-size:clamp(34px,6vw,64px)}.bookingThankYou span{display:block;color:#c8ccc7;line-height:1.7}.bookingThankYou a{display:inline-block;margin-top:32px;padding:14px 24px;background:#ce6723;color:#fff;text-decoration:none}.bookingThankYou b{margin-left:12px;font-size:20px}`}</style>
    </main>
  );
}
