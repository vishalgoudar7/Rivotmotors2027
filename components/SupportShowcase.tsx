"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowRight, CalendarClock, Check, Headphones, Mail, MapPin, MessageCircle, PackageCheck, Phone, Send, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import showroomImage from "@/asset/newimg/support/Golden Hour Electric Scooter Showroom.png";
import heroShowroomImage from "@/asset/newimg/support/Golden Hour RIVOT Scooter Showroom.png";
import mailImage from "@/asset/newimg/support/mail.png";
import techSupportImage from "@/asset/newimg/support/Modern Tech Support Connection.png";
import whatsappImage from "@/asset/newimg/support/whtsapp.png";

type SupportCard = { eyebrow: string; title: string; description: string; contact: string; href: string; meta: string; icon: typeof Phone; image: StaticImageData; tone: "orange" | "green"; position?: string };

const supportCards: SupportCard[] = [
  { eyebrow: "Call us directly", title: "Helpline Number", description: "Our customer support team is available to assist with product, service and ownership queries.", contact: "+91 898-898-4646", href: "tel:+918988984646", meta: "Available 24/7", icon: Phone, image: techSupportImage, tone: "orange", position: "68% center" },
  { eyebrow: "Chat with our team", title: "WhatsApp Support", description: "Connect with us instantly on WhatsApp for quick responses to your questions and support needs.", contact: "+91 898-898-4646", href: "https://wa.me/918988984646", meta: "Mon - Sat: 9 AM - 8 PM", icon: MessageCircle, image: whatsappImage, tone: "green" },
  { eyebrow: "Write to us", title: "Email Support", description: "Send us a detailed email and our team will respond with the next steps as soon as possible.", contact: "support@rivotmotors.com", href: "mailto:support@rivotmotors.com", meta: "Response within 24 hours", icon: Mail, image: mailImage, tone: "orange" },
  { eyebrow: "Meet us in person", title: "Visit Our Showroom", description: "Experience RIVOT scooters firsthand at our showroom and service location.", contact: "PLANT1, Plot No. 1340-1341, KHB Layout, Auto Nagar", href: "/where", meta: "Belagavi, Karnataka - 590015", icon: MapPin, image: showroomImage, tone: "orange", position: "center 66%" },
];

const supportTypes = [
  { label: "Product & service assistance", icon: Wrench }, { label: "Booking & delivery support", icon: CalendarClock },
  { label: "Warranty & maintenance queries", icon: ShieldCheck }, { label: "General enquiries", icon: MessageCircle },
];

export function SupportShowcase() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); window.setTimeout(() => setSent(false), 5000); };

  return (
    <section className="supportPage">
      <div className="supportHero">
        <Image className="supportHeroImage" src={heroShowroomImage} alt="RIVOT scooter outside the showroom at golden hour" fill priority sizes="100vw" />
        <div className="supportHeroWash" />
        <div className="supportHeroContent">
          <p className="supportKicker">Support</p>
          <h1>Customer <span>Support</span></h1>
          <p className="supportHeroCopy">Dedicated support for your RIVOT scooter whenever your ride needs attention. We&apos;re always here to help you.</p>
          <div className="supportQuickLinks" aria-label="Support categories">
            <div><Headphones /><span>Quick<br />Response</span></div><div><Sparkles /><span>Expert<br />Assistance</span></div>
            <div><Wrench /><span>Service<br />Support</span></div><div><PackageCheck /><span>Ownership<br />Guidance</span></div>
          </div>
        </div>
      </div>

      <div className="supportShell">
        <div className="supportGrid">
          {supportCards.map((card) => { const Icon = card.icon; return (
            <article className={`supportCard supportCard--${card.tone}`} key={card.title}>
              <div className="supportCardContent">
                <div className="supportCardHeading"><span className="supportCardIcon"><Icon /></span><div><small>{card.eyebrow}</small><h2>{card.title}</h2></div></div>
                <p>{card.description}</p>
                <a href={card.href} target={card.href.startsWith("https") ? "_blank" : undefined} rel={card.href.startsWith("https") ? "noreferrer" : undefined}><Icon /><span>{card.contact}</span></a>
                <div className="supportCardMeta"><Check /> {card.meta}</div>
              </div>
              <div className="supportCardVisual"><Image src={card.image} alt="" fill sizes="(max-width: 720px) 38vw, 240px" style={{ objectPosition: card.position }} /></div>
            </article>
          ); })}
        </div>

        <section className="supportFormSection" aria-labelledby="support-form-title">
          <div className="supportFormIntro">
            <p className="supportKicker">Get in touch</p><h2 id="support-form-title">Send us a <span>Message</span></h2>
            <p>Fill out the form and our support team will get back to you as soon as possible.</p>
            <ul>{supportTypes.map(({ label, icon: Icon }) => <li key={label}><span><Icon /></span>{label}</li>)}</ul>
          </div>
          <form onSubmit={handleSubmit}>
            {sent ? <div className="supportSuccess"><Check /> Thank you for contacting RIVOT Support. We&apos;ll get back to you within 24 hours.</div> : null}
            <div className="supportFields">
              <label>Full Name *<input name="name" type="text" placeholder="Enter your full name" required /></label>
              <label>Email Address *<input name="email" type="email" placeholder="Enter your email address" required /></label>
              <label>Phone Number<input name="phone" type="tel" placeholder="Enter phone number" /></label>
              <label>Subject *<select name="subject" required defaultValue=""><option value="" disabled>Select a topic</option><option value="technical">Technical Support</option><option value="billing">Billing & Payments</option><option value="warranty">Warranty Claims</option><option value="service">Service Center</option><option value="general">General Inquiry</option><option value="feedback">Feedback</option></select></label>
            </div>
            <label className="supportMessage">Message *<textarea name="message" placeholder="Type your message here..." required /></label>
            <button type="submit"><Send /> Send Message <ArrowRight /></button>
          </form>
        </section>
      </div>

      <style>{`
        body:has(.supportPage) .rivotHeader.isHomeHeader { height:74px; border:0; background:transparent!important; color:#111!important; box-shadow:none; backdrop-filter:none; -webkit-backdrop-filter:none; }
        body:has(.supportPage) .rivotHeader.isHomeHeader .rivotBrand, body:has(.supportPage) .rivotHeader.isHomeHeader .rivotHeaderLinks a, body:has(.supportPage) .rivotHeader.isHomeHeader .rivotProductsButton, body:has(.supportPage) .rivotHeader.isHomeHeader .rivotCommunityButton, body:has(.supportPage) .rivotHeader.isHomeHeader .rivotExploreButton { color:#171717!important; }
        body:has(.supportPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:brightness(0)!important; }
        body:has(.supportPage) .rivotHeader.isHomeHeader :is(.rivotCommunityMenu,.rivotExploreMenu,.rivotProductsMenuInner) { border-color:rgba(16,16,15,.1); background:rgba(255,255,255,.96); color:#171717; box-shadow:0 18px 42px rgba(16,16,15,.12); }
        body:has(.supportPage) .rivotBook { border-color:#ff5b18; background:#ff5b18; color:#fff; }
        .supportPage { --orange:#ff5b18; --ink:#10100f; --muted:#686b69; position:relative; overflow:hidden; padding:0 0 44px; background:radial-gradient(circle at -4% 86%,rgba(255,91,24,.13),transparent 20%),radial-gradient(circle at 104% 75%,rgba(255,144,92,.13),transparent 22%),#fbfaf8; color:var(--ink); }
        .supportHero { position:relative; height:clamp(319px,36vw,434px); overflow:hidden; } .supportHeroImage { object-fit:cover; object-position:73% 58%; }
        .supportHeroWash { position:absolute; inset:0; background:linear-gradient(90deg,#fff 3%,rgba(255,255,255,.98) 27%,rgba(255,255,255,.72) 50%,rgba(255,255,255,.04) 74%); }
        .supportHeroContent { position:relative; z-index:1; width:min(100% - 64px,1500px); margin:0 auto; padding-top:102px; }
        .supportKicker { margin:0 0 9px; color:var(--orange); font-size:14px; font-weight:900; letter-spacing:.24em; text-transform:uppercase; }
        .supportHero h1,.supportFormIntro h2 { margin:0; color:var(--ink); font-size:48px; font-weight:950; letter-spacing:-.045em; line-height:1; } .supportHero h1 span,.supportFormIntro h2 span { color:var(--orange); }
        .supportHeroCopy { max-width:650px; margin:16px 0 0; color:#575b58; font-size:15px; font-weight:600; line-height:1.55; }
        .supportQuickLinks { display:flex; gap:22px; margin-top:26px; } .supportQuickLinks>div { display:flex; align-items:center; gap:11px; padding-right:22px; border-right:1px solid rgba(16,16,15,.14); } .supportQuickLinks>div:last-child { border-right:0; }
        .supportQuickLinks svg { width:23px; height:23px; padding:7px; box-sizing:content-box; border-radius:50%; background:#fff1eb; color:var(--orange); } .supportQuickLinks span { font-size:12px; font-weight:850; line-height:1.18; }
        .supportShell { position:relative; z-index:2; width:min(100% - 64px,1500px); margin:-22px auto 0; } .supportGrid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; }
        .supportCard { position:relative; display:block; min-height:230px; overflow:hidden; border:1px solid rgba(16,16,15,.07); border-radius:18px; background:#fff; box-shadow:0 14px 40px rgba(32,25,20,.08); isolation:isolate; }
        .supportCard:after { display:none; }
        .supportCardContent { position:relative; z-index:2; display:flex; flex-direction:column; width:58%; min-height:230px; padding:22px 10px 18px 28px; } .supportCardHeading { display:flex; align-items:center; gap:14px; }
        .supportCardIcon { display:grid; flex:0 0 48px; width:48px; height:48px; place-items:center; border-radius:14px; background:#fff1eb; color:var(--orange); } .supportCard--green .supportCardIcon { background:#e4f9eb; color:#08af53; } .supportCardIcon svg { width:24px; height:24px; stroke-width:2.4; }
        .supportCardHeading small { display:block; margin-bottom:4px; color:#8d908c; font-size:11px; font-weight:850; letter-spacing:.08em; text-transform:uppercase; } .supportCard h2 { margin:0; font-size:24px; font-weight:950; letter-spacing:-.025em; line-height:1.08; }
        .supportCardContent>p { max-width:410px; margin:11px 0 12px; color:var(--muted); font-size:15px; font-weight:600; line-height:1.5; }
        .supportCard a { display:flex; align-items:center; gap:8px; width:fit-content; max-width:100%; padding:9px 14px; border-radius:999px; background:#fff1eb; color:var(--orange); font-size:14px; font-weight:900; text-decoration:none; } .supportCard--green a { background:#e8f9ed; color:#08a94f; } .supportCard a svg { flex:0 0 auto; width:16px; height:16px; } .supportCard a span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .supportCard:nth-child(4) a { position:relative; z-index:3; width:max-content; max-width:none; border-radius:14px; font-size:13px; line-height:1.35; white-space:nowrap; }
        .supportCard:nth-child(4) a span { overflow:visible; text-overflow:clip; white-space:nowrap; }
        .supportCardMeta { display:flex; align-items:center; gap:6px; margin-top:auto; padding-top:8px; color:#777c78; font-size:13px; font-weight:700; } .supportCardMeta svg { width:13px; height:13px; color:#17bc5d; }
        .supportCardVisual { position:absolute; top:10px; right:10px; bottom:10px; z-index:0; width:41%; overflow:hidden; border-radius:14px; background:#f5f4f1; }
        .supportCard:nth-child(1) .supportCardVisual { background:#e9eeee; }
        .supportCard:nth-child(2) .supportCardVisual { background:#effaf2; }
        .supportCard:nth-child(3) .supportCardVisual { background:#fff1e8; }
        .supportCard:nth-child(4) .supportCardVisual { background:#edf2f4; }
        .supportCardVisual img { object-fit:contain; opacity:1; transition:transform .45s ease,opacity .35s ease; }
        .supportCard:nth-child(1) .supportCardVisual img,
        .supportCard:nth-child(2) .supportCardVisual img,
        .supportCard:nth-child(3) .supportCardVisual img,
        .supportCard:nth-child(4) .supportCardVisual img { object-position:center!important; }
        .supportCard:hover .supportCardVisual img { transform:scale(1.025); opacity:1; }
        .supportFormSection { display:grid; grid-template-columns:.82fr 1.18fr; gap:48px; margin-top:20px; padding:40px 42px; border:1px solid rgba(16,16,15,.07); border-radius:18px; background:rgba(255,255,255,.96); box-shadow:0 14px 42px rgba(32,25,20,.08); }
        .supportFormIntro h2 { font-size:48px; } .supportFormIntro>p:not(.supportKicker) { max-width:500px; margin:17px 0 24px; color:var(--muted); font-size:15px; font-weight:600; line-height:1.55; }
        .supportFormIntro ul { display:grid; gap:11px; margin:0; padding:0; list-style:none; } .supportFormIntro li { display:flex; align-items:center; gap:11px; color:#555855; font-size:15px; font-weight:700; } .supportFormIntro li span { display:grid; width:32px; height:32px; place-items:center; border-radius:9px; background:#fff1eb; color:var(--orange); } .supportFormIntro li svg { width:16px; height:16px; }
        .supportFields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:15px 18px; } .supportFormSection label { display:grid; gap:8px; color:#222; font-size:15px; font-weight:900; }
        .supportFormSection input,.supportFormSection select,.supportFormSection textarea { width:100%; min-height:48px; padding:12px 14px; border:1px solid #e3e3e0; border-radius:8px; outline:none; background:#fafafa; color:#191919; font:inherit; font-size:15px; font-weight:600; transition:border-color .2s,box-shadow .2s; } .supportFormSection :is(input,select,textarea):focus { border-color:rgba(255,91,24,.65); box-shadow:0 0 0 3px rgba(255,91,24,.1); }
        .supportMessage { margin-top:15px; } .supportFormSection textarea { min-height:100px; resize:vertical; } .supportFormSection button { display:flex; align-items:center; justify-content:center; gap:9px; width:100%; min-height:48px; margin-top:15px; border:0; border-radius:8px; background:linear-gradient(90deg,#ff762b,#ff4e0b); color:#fff; font:inherit; font-size:15px; font-weight:900; cursor:pointer; box-shadow:0 8px 18px rgba(255,91,24,.2); } .supportFormSection button svg { width:16px; height:16px; }
        .supportSuccess { display:flex; align-items:center; gap:7px; margin-bottom:10px; padding:9px 11px; border-radius:7px; background:#e9f9ee; color:#168247; font-size:10px; font-weight:800; } .supportSuccess svg { width:14px; height:14px; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.supportPage) .rivotHeader.isHomeHeader { border:0; background:transparent!important; color:#fff!important; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.supportPage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton) { color:#f7f6f3!important; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.supportPage) .rivotHeader.isHomeHeader .rivotBrandMark img { filter:brightness(0) invert(1)!important; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .supportPage { background:#101211!important; color:#f7f6f3; } html:is([data-theme="dark"],[data-rivot-theme="dark"]) .supportHeroWash { background:linear-gradient(90deg,#101211 4%,rgba(16,18,17,.96) 28%,rgba(16,18,17,.65) 52%,transparent 76%); }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.supportHero h1,.supportFormIntro h2,.supportCard h2,.supportFormSection label) { color:#f7f6f3; } html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.supportHeroCopy,.supportCardContent>p,.supportFormIntro>p:not(.supportKicker),.supportFormIntro li) { color:#a9adaa; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.supportCard,.supportFormSection) { border-color:rgba(255,255,255,.09); background:#181a19; } html:is([data-theme="dark"],[data-rivot-theme="dark"]) .supportCardVisual { background:#222625; } html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.supportFormSection input,.supportFormSection select,.supportFormSection textarea) { border-color:#343735; background:#111312; color:#f7f6f3; }
        @media(max-width:1100px) { .supportHeroContent,.supportShell { width:min(100% - 40px,1500px); } .supportCard h2 { font-size:22px; } .supportCardContent { width:63%; } .supportCardContent>p { font-size:14px; } }
        @media(max-width:840px) { .supportHero { height:394px; } .supportHeroImage { object-position:70% center; } .supportHeroContent { padding-top:94px; } .supportGrid { grid-template-columns:1fr; } .supportFormSection { grid-template-columns:1fr; } }
        @media(max-width:560px) { .supportPage { padding-top:0; } .supportHero { height:434px; } .supportHeroWash { background:linear-gradient(90deg,#fff 3%,rgba(255,255,255,.92) 65%,rgba(255,255,255,.22)); } .supportHeroContent,.supportShell { width:min(100% - 24px,1180px); } .supportHeroContent { padding-top:82px; } .supportHero h1,.supportFormIntro h2 { font-size:40px; } .supportQuickLinks { display:grid; grid-template-columns:repeat(2,max-content); gap:10px 18px; } .supportQuickLinks>div { border:0; padding:0; } .supportCard { min-height:0; } .supportCardContent { width:100%; min-height:230px; padding:20px 18px; } .supportCard:nth-child(4) a { width:100%; max-width:100%; white-space:normal; } .supportCard:nth-child(4) a span { white-space:normal; } .supportCardVisual { position:relative; inset:auto; width:auto; min-height:0; margin:0 10px 10px; aspect-ratio:3/2; } .supportCardVisual img { object-position:center!important; } .supportFormSection { padding:22px 18px; } .supportFields { grid-template-columns:1fr; } html:is([data-theme="dark"],[data-rivot-theme="dark"]) .supportHeroWash { background:linear-gradient(90deg,#101211 3%,rgba(16,18,17,.9) 64%,rgba(16,18,17,.18)); } }
      `}</style>
    </section>
  );
}
