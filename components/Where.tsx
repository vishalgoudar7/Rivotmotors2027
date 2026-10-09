"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Building2, Check, Clock3, Factory, Globe2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import heroImage from "@/asset/newimg/locotion/RIVOT Showroom at Sunset.png";

const locations = [
  { title: "Headquarters", address: "1st Cross, 1st Main, Sadashiv Nagar, Belagavi, India", hours: "Monday - Friday: 9:00 AM - 6:00 PM", icon: Building2 },
  { title: "Plant 1", address: "RIVOT Manufacturing Plant 1, Kanbargi, Belagavi", hours: "Monday - Saturday: 8:00 AM - 5:00 PM", icon: Factory },
  { title: "Corporate Office", address: "RIVOT Tower, 10th Floor, MG Road, Bengaluru, Karnataka 560001", hours: "Monday - Friday: 9:30 AM - 6:30 PM", icon: Building2 },
  { title: "Overseas Office", address: "RIVOT International, 123 Business District, Dubai, UAE", hours: "Sunday - Thursday: 9:00 AM - 5:00 PM GST", icon: Globe2 },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/rivotmotors", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/rivotmotors/", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/c/rivotmotors", icon: FaYoutube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/rivotmotors?originalSubdomain=in", icon: FaLinkedinIn },
];

export function Where() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("formType", "support");
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: formData });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setSent(true);
      form.reset();
      window.setTimeout(() => setSent(false), 5000);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send your message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="wherePage">
      <header className="whereHero">
        <Image src={heroImage} alt="RIVOT showroom at sunset" fill priority sizes="100vw" />
        <div className="whereHeroWash" />
        <div className="whereHeroContent">
          <p className="whereKicker">Where</p>
          <h1>Find <span>RIVOT</span></h1>
          <p>Visit our offices and manufacturing facilities across India and abroad.</p>
          <div className="whereHeroFacts"><span><MapPin /> Belagavi, Karnataka</span><span><Phone /> +91 898-898-4646</span><span><Mail /> support@rivotmotors.com</span></div>
        </div>
        <div className="whereHeading"><p className="whereKicker">Our locations</p><h2>Come meet the <span>RIVOT team.</span></h2></div>
      </header>

      <div className="whereShell">
        <div className="whereGrid">
          {locations.map(({ title, address, hours, icon: Icon }) => (
            <article className="whereCard" key={title}>
              <span className="whereCardIcon"><Icon /></span><div><small>RIVOT Location</small><h3>{title}</h3></div>
              <p><MapPin /><span>{address}</span></p><p><Clock3 /><span>{hours}</span></p>
              <a href="tel:+918988984646"><Phone /> +91 898-898-4646</a>
            </article>
          ))}
        </div>

        <section className="whereContact" aria-labelledby="where-contact-title">
          <div className="whereContactIntro">
            <p className="whereKicker">Get in touch</p><h2 id="where-contact-title">Plan your <span>visit.</span></h2>
            <p>Have a question or want to schedule a visit? Send us a message and our team will reply by email.</p>
            <div className="whereContactPoints"><span><Check /> Visit assistance</span><span><Check /> Location guidance</span><span><Check /> Response within 24 hours</span></div>
          </div>
          <form onSubmit={handleSubmit}>
            {sent ? <div className="whereSuccess"><Check /> Message sent successfully. We&apos;ll contact you soon.</div> : null}
            {error ? <div className="whereError" role="alert">{error}</div> : null}
            <div className="whereFields">
              <label>Full Name *<input name="name" type="text" placeholder="Enter your full name" required /></label>
              <label>Email Address *<input name="email" type="email" placeholder="Enter your email address" required /></label>
              <label>Phone Number<input name="phone" type="tel" placeholder="Enter phone number" /></label>
              <label>Location of Interest<select name="location" defaultValue=""><option value="">Select location</option><option value="headquarters">Headquarters - Belagavi</option><option value="plant">Plant 1 - Belagavi</option><option value="corporate">Corporate Office - Bengaluru</option><option value="overseas">Overseas Office - Dubai</option></select></label>
            </div>
            <label className="whereMessage">Message *<textarea name="message" placeholder="Type your message here..." required /></label>
            <button type="submit" disabled={submitting}><Send /> {submitting ? "Sending..." : "Send Message"}</button>
          </form>
        </section>

        <section className="whereMap" aria-label="RIVOT location map">
          <div className="whereMapCopy"><p className="whereKicker">On the map</p><h2>Visit us in <span>Belagavi.</span></h2><p>Our team is ready to welcome you and help with your RIVOT journey.</p><div>{socialLinks.map(({ label, href, icon: Icon }) => <a href={href} target="_blank" rel="noreferrer" aria-label={label} key={label}><Icon /></a>)}</div></div>
          <iframe title="RIVOT Belagavi location" src="https://www.google.com/maps?q=Belagavi%2C%20Karnataka&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </section>
      </div>

      <style>{`
        body:has(.wherePage) .rivotHeader.isHomeHeader{height:74px;border:0;background:transparent!important;color:#111!important;box-shadow:none;backdrop-filter:none}body:has(.wherePage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton){color:#171717!important}body:has(.wherePage) .rivotHeader.isHomeHeader .rivotBrandMark img{filter:brightness(0)!important}body:has(.wherePage) .rivotBook{border-color:#ff5b18;background:#ff5b18;color:#fff}
        .wherePage{--orange:#ff5b18;--ink:#10100f;--muted:#686b69;--where-gutter:clamp(18px,3.4vw,64px);overflow:hidden;padding-bottom:54px;background:radial-gradient(circle at -4% 86%,rgba(255,91,24,.13),transparent 20%),radial-gradient(circle at 104% 75%,rgba(255,144,92,.13),transparent 22%),#fbfaf8;color:var(--ink)}
        .wherePage,.wherePage :is(button,input,select,textarea){font-family:inherit}
        .wherePage :is(h1,h2,h3,p,small,a,label,span,strong,button,input,select,textarea){letter-spacing:0}
        .wherePage :is(h1,h2,h3){font-family:inherit;text-wrap:balance}
        .wherePage :is(h1,h2){font-weight:800;letter-spacing:-.04em}
        .wherePage h3{font-weight:800;letter-spacing:-.025em}
        .wherePage :is(p,a,label,input,select,textarea,button){font-size:15px;line-height:1.55}
        .wherePage :is(a,button,label,strong){font-weight:700}
        .whereHero{position:relative;height:auto;min-height:0;padding-bottom:15px;overflow:hidden}.whereHero>img{object-fit:cover;object-position:70% 57%}.whereHeroWash{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.28) 68%,rgba(255,255,255,.72) 100%),linear-gradient(90deg,#fff 4%,rgba(255,255,255,.96) 31%,rgba(255,255,255,.67) 52%,rgba(255,255,255,.08) 82%)}.whereHeroContent{position:relative;z-index:1;width:min(100%,1628px);margin:auto;padding:82px var(--where-gutter) 0}.whereKicker{margin:0 0 10px;color:var(--orange);font-size:12px;font-weight:800;line-height:1.2;letter-spacing:.2em!important;text-transform:uppercase}.whereHero h1,.whereHeading h2,.whereContact h2,.whereMap h2{margin:0;font-size:48px;font-weight:800;line-height:1.02;letter-spacing:-.04em}.whereHero h1 span,.whereHeading h2 span,.whereContact h2 span,.whereMap h2 span{color:var(--orange)}.whereHeroContent>p:not(.whereKicker){max-width:590px;margin:17px 0 0;color:#575b58;font-size:15px;font-weight:500}.whereHeroFacts{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.whereHeroFacts span{display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid rgba(16,16,15,.08);border-radius:999px;background:rgba(255,255,255,.86);font-size:12px;font-weight:700;box-shadow:0 8px 22px rgba(30,25,20,.07)}.whereHeroFacts svg{width:16px;color:var(--orange)}
        .whereHeading{position:relative;z-index:2;width:min(100%,1628px);margin:15px auto 0;padding:0 var(--where-gutter);background:none;text-shadow:none}.whereShell{position:relative;z-index:2;width:min(100%,1628px);margin:15px auto 0;padding-inline:var(--where-gutter)}.whereGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.whereCard{display:grid;grid-template-columns:58px 1fr;gap:15px 17px;min-height:250px;padding:27px;border:1px solid rgba(16,16,15,.07);border-radius:18px;background:#fff;box-shadow:0 14px 40px rgba(32,25,20,.08)}.whereCardIcon{display:grid;width:54px;height:54px;grid-row:span 2;place-items:center;border-radius:15px;background:#fff1eb;color:var(--orange)}.whereCardIcon svg{width:27px}.whereCard small{color:var(--orange);font-size:10px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.whereCard h3{margin:4px 0 0;font-size:24px}.whereCard p{grid-column:1/-1;display:flex;gap:11px;margin:0;color:var(--muted);font-size:14px;font-weight:650}.whereCard p svg,.whereCard a svg{width:18px;flex:0 0 auto;color:var(--orange)}.whereCard a{grid-column:1/-1;display:flex;align-items:center;gap:10px;width:max-content;color:var(--orange);font-size:15px;font-weight:900}
        .whereContact{display:grid;grid-template-columns:.75fr 1.25fr;gap:54px;margin-top:48px;padding:46px 48px;border:1px solid rgba(16,16,15,.07);border-radius:22px;background:#fff;box-shadow:0 14px 44px rgba(32,25,20,.08)}.whereContactIntro>p:not(.whereKicker),.whereMapCopy>p:not(.whereKicker){margin:18px 0;color:var(--muted);font-size:15px;font-weight:600;line-height:1.55}.whereContactPoints{display:grid;gap:12px;margin-top:28px}.whereContactPoints span{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:800}.whereContactPoints svg{width:18px;color:#0cad58}.whereFields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 18px}.whereContact label{display:grid;gap:8px;color:#222;font-size:14px;font-weight:900}.whereContact :is(input,select,textarea){width:100%;min-height:50px;padding:12px 14px;border:1px solid #e3e3e0;border-radius:8px;outline:none;background:#fafafa;color:#191919;font:inherit;font-size:14px;font-weight:600}.whereContact :is(input,select,textarea):focus{border-color:rgba(255,91,24,.65);box-shadow:0 0 0 3px rgba(255,91,24,.1)}.whereMessage{margin-top:15px}.whereContact textarea{min-height:112px;resize:vertical}.whereContact button{display:flex;width:100%;min-height:50px;margin-top:15px;align-items:center;justify-content:center;gap:9px;border:0;border-radius:8px;background:linear-gradient(90deg,#ff762b,#ff4e0b);color:#fff;font-size:15px;font-weight:900;cursor:pointer;box-shadow:0 8px 18px rgba(255,91,24,.2)}.whereContact button:disabled{cursor:wait;opacity:.7}.whereContact button svg{width:17px}.whereSuccess,.whereError{margin-bottom:12px;padding:11px 13px;border-radius:8px;font-size:12px;font-weight:800}.whereSuccess{display:flex;align-items:center;gap:7px;background:#e9f9ee;color:#168247}.whereSuccess svg{width:16px}.whereError{background:#fff0ed;color:#b9371f}
        .whereMap{display:grid;grid-template-columns:.42fr .58fr;min-height:420px;margin-top:48px;overflow:hidden;border-radius:22px;background:#121313;color:#fff;box-shadow:0 20px 50px rgba(20,18,16,.18)}.whereMapCopy{display:flex;flex-direction:column;justify-content:center;padding:42px}.whereMap h2{color:#fff}.whereMapCopy>div{display:flex;gap:10px;margin-top:15px}.whereMapCopy a{display:grid;width:42px;height:42px;place-items:center;border-radius:50%;background:rgba(255,255,255,.1);color:#fff}.whereMapCopy a:hover{background:var(--orange)}.whereMapCopy svg{width:18px}.whereMap iframe{width:100%;height:100%;min-height:420px;border:0}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .wherePage{background:#080909;color:#f5f5f2}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.wherePage) .rivotHeader.isHomeHeader{color:#fff!important}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.wherePage) .rivotHeader.isHomeHeader :is(.rivotBrand,.rivotHeaderLinks a,.rivotProductsButton,.rivotCommunityButton,.rivotExploreButton){color:#fff!important}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) body:has(.wherePage) .rivotHeader.isHomeHeader .rivotBrandMark img{filter:brightness(0) invert(1)!important}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHeroWash{background:linear-gradient(90deg,rgba(5,7,7,.97) 3%,rgba(5,7,7,.9) 31%,rgba(5,7,7,.58) 54%,rgba(5,7,7,.08) 80%)}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHero h1{color:#f7f7f4}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHeroContent>p:not(.whereKicker){color:#c9ccca}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHeroFacts span{border-color:rgba(255,255,255,.14);background:rgba(15,18,18,.78);color:#f2f2ef;box-shadow:0 10px 28px rgba(0,0,0,.24);backdrop-filter:blur(10px)}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHeading{background:none;color:#f5f5f2;text-shadow:none}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.whereCard,.whereContact){border-color:rgba(255,255,255,.1);background:#141616;color:#f5f5f2}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.whereHeading h2,.whereContact h2,.whereCard h3){color:#f5f5f2}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereContact label{color:#e8e8e5}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereContact :is(input,select,textarea){border-color:rgba(255,255,255,.13);background:#0d0f0f;color:#f5f5f2}
        @media(max-width:900px){.whereGrid,.whereContact,.whereMap{grid-template-columns:1fr}.whereHeroContent{padding-top:82px}.whereMap iframe{min-height:340px}}@media(max-width:640px){.wherePage{--where-gutter:14px}.whereHero{height:auto;min-height:0;padding-bottom:15px}.whereHero>img{object-position:65% center}.whereHeroWash{background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,255,255,.78) 54%,rgba(255,255,255,.12))}.whereHero h1,.whereHeading h2,.whereContact h2,.whereMap h2{font-size:40px}.whereHeading{margin-top:15px}.whereHeroFacts{align-items:flex-start;flex-direction:column}.whereShell{margin-top:15px}.whereGrid{gap:14px}.whereCard{min-height:0;padding:21px}.whereContact{gap:30px;padding:28px 18px}.whereFields{grid-template-columns:1fr}.whereMapCopy{padding:30px 22px}.whereMap iframe{min-height:300px}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .whereHeroWash{background:linear-gradient(180deg,rgba(5,7,7,.94),rgba(5,7,7,.76) 54%,rgba(5,7,7,.12))}}
      `}</style>
    </section>
  );
}
