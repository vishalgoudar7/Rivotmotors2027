"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Gauge, Lightbulb, MapPin, Users } from "lucide-react";
import careerHeroImage from "@/asset/Career/range.jpeg";
import { useEffect, useRef } from "react";

const values = [
  { title: "Own the outcome", copy: "Take the wheel, make the call, and stay with the problem until the work is real.", icon: Gauge },
  { title: "Stay relentlessly curious", copy: "Question the obvious. Learn quickly. Better questions are where better products begin.", icon: Lightbulb },
  { title: "Build as one team", copy: "No silos and no spectators. The strongest ideas get sharper when we build together.", icon: Users },
];

export function CareersShowcase() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const selector = "h1,h2,h3,p,.careerEyebrow,.careerSectionIndex,.careerLocation,.careerRoleTags,.careerValueNumber,figcaption,a:not(.careerScrollCue)";
    const animatedElements = Array.from(page.querySelectorAll<HTMLElement>(selector));

    page.querySelectorAll("section").forEach((section) => {
      section.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("careerAnimateText");
        element.style.setProperty("--career-delay", `${Math.min(index, 5) * 70}ms`);
      });
    });
    page.classList.add("isAnimationReady");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("isVisible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    animatedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="careerPage" ref={pageRef}>
      <section className="careerHero" aria-labelledby="career-title">
        <Image src={careerHeroImage} alt="A rider commuting on a RIVOT electric scooter" fill priority className="careerHeroImage" sizes="100vw" />
        <div className="careerHeroShade" aria-hidden="true" />
        <div className="careerHeroCopy">
          <div className="careerEyebrow"><span /> Careers at RIVOT</div>
          <h1 id="career-title">Build what<br />moves <em>next.</em></h1>
          <p>We are bringing together dreamers, engineers, makers and doers to reimagine everyday mobility from Belagavi to the world.</p>
          <div className="careerHeroActions">
            <Link className="careerPrimary" href="/connect#career-opportunities">View open roles <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="careerLocation"><MapPin aria-hidden="true" /><span><b>Built in Belagavi</b><small>Karnataka, India</small></span></div>
        </div>
        <a className="careerScrollCue" href="#life-at-rivot"><span>Life at RIVOT</span><i><ArrowDown aria-hidden="true" /></i></a>
      </section>

      <section className="careerStatement">
        <p>We do not hire resumes. We hire <em>minds</em> that see what others do not.</p>
      </section>

      <section className="careerLife" id="life-at-rivot" aria-labelledby="life-title">
        <div className="careerLifeHeading">
          <div><span className="careerSectionIndex">Life at RIVOT</span><h2 id="life-title">Serious work.<br /><em>Human</em> energy.</h2></div>
          <p>Our culture is built in the moments between the milestones—testing, debating, learning, celebrating, and showing up for one another.</p>
        </div>
        <div className="careerGallery">
          <figure className="careerGalleryMain"><Image src="/Story_page/15.webp" alt="RIVOT team collaborating at a launch event" fill sizes="(max-width: 760px) 100vw, 62vw" /><figcaption><span>One team</span><b>Make it together.</b></figcaption></figure>
          <figure className="careerGalleryTall"><Image src="/Story_page/13.webp" alt="RIVOT colleagues spending time together outdoors" fill sizes="(max-width: 760px) 100vw, 32vw" /><figcaption><span>People first</span><b>Room to be you.</b></figcaption></figure>
          <figure className="careerGalleryWide"><Image src="/Story_page/14.webp" alt="RIVOT team exploring mobility ideas with virtual reality" fill sizes="(max-width: 760px) 100vw, 62vw" /><figcaption><span>Think forward</span><b>Prototype the impossible.</b></figcaption></figure>
        </div>
      </section>

      <section className="careerValues" aria-labelledby="values-title">
        <div className="careerValuesHeading"><span className="careerSectionIndex">How we work</span><h2 id="values-title">Dreamers.<br /><em>Doers.</em></h2></div>
        <div className="careerValueList">
          {values.map(({ title, copy, icon: Icon }) => <article key={title}><span className="careerValueIcon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="careerFinalCta">
        <Image src="/Story_page/10.webp" alt="RIVOT scooter revealed on stage" fill className="careerFinalImage" sizes="100vw" />
        <div className="careerFinalShade" aria-hidden="true" />
        <div className="careerFinalContent">
          <span className="careerSectionIndex">Make your mark</span>
          <h2>Your ideas<br />deserve the <em>road.</em></h2>
          <p>Join the people turning ambitious thinking into electric mobility that moves every day.</p>
          <div className="careerRoleTags" aria-label="Teams hiring at RIVOT"><span>Engineering</span><span>Design</span><span>Operations</span></div>
          <Link href="/connect#career-opportunities">Find your role <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <style>{`
        .careerPage{--career-orange:#ef7430;--career-ink:#111313;--career-paper:#f5f3ef;overflow:hidden;background:var(--career-paper);color:var(--career-ink)}
        .careerHero{position:relative;min-height:100svh;padding:150px clamp(24px,6vw,96px) 70px;display:flex;align-items:center;isolation:isolate;color:#fff;background:#111}.careerHeroImage{z-index:-2;object-fit:cover;object-position:center}.careerHeroShade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(6,7,7,.9) 0%,rgba(6,7,7,.72) 32%,rgba(6,7,7,.24) 62%,rgba(6,7,7,.05) 100%),linear-gradient(180deg,rgba(6,7,7,.35),transparent 35%,rgba(6,7,7,.3))}
        .careerHeroCopy{position:relative;z-index:2;max-width:640px}.careerEyebrow,.careerSectionIndex{display:flex;align-items:center;gap:10px;color:#6a6c69;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.careerHero .careerEyebrow{color:rgba(255,255,255,.78)}.careerEyebrow span{width:34px;height:2px;background:var(--career-orange)}
        .careerHero h1{margin:24px 0 22px;color:#fff;font-size:clamp(58px,5.4vw,92px);font-weight:700;line-height:.89;letter-spacing:-.065em;text-shadow:0 8px 34px rgba(0,0,0,.3)}.careerHero h1 em,.careerLife h2 em,.careerValues h2 em,.careerStatement em{color:var(--career-orange);font-style:normal}.careerHeroCopy>p{max-width:540px;margin:0;color:rgba(255,255,255,.82);font-size:clamp(16px,1.1vw,19px);line-height:1.62}
        .careerHeroActions{display:flex;align-items:center;gap:26px;margin-top:32px}.careerPrimary{display:inline-flex;min-height:52px;align-items:center;justify-content:center;gap:13px;padding:0 22px;border-radius:999px;background:var(--career-orange);color:#fff;font-size:13px;font-weight:800;box-shadow:0 16px 34px rgba(239,116,48,.24);transition:transform .2s ease,background .2s ease}.careerPrimary svg,.careerFinalContent a svg{width:18px;height:18px}.careerPrimary:hover{background:#d86124;transform:translateY(-2px)}.careerTextLink{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:800}.careerTextLink svg{width:17px;height:17px;color:var(--career-orange)}
        .careerTextLink{color:#fff}.careerLocation{display:flex;align-items:center;gap:12px;margin-top:38px;color:rgba(255,255,255,.86)}.careerLocation>svg{width:35px;height:35px;padding:8px;border:1px solid rgba(255,255,255,.28);border-radius:50%;color:var(--career-orange)}.careerLocation span{display:grid}.careerLocation b{font-size:13px}.careerLocation small{font-size:11px;color:rgba(255,255,255,.62)}
        .careerScrollCue{position:absolute;left:50%;bottom:28px;z-index:3;display:flex;flex-direction:column;align-items:center;gap:8px;color:#fff;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;transform:translateX(-50%)}.careerScrollCue i{display:grid;width:34px;height:34px;place-items:center;border:1px solid rgba(255,255,255,.35);border-radius:50%;color:var(--career-orange);font-style:normal;animation:careerCueBounce 1.8s ease-in-out infinite}.careerScrollCue svg{width:17px;height:17px}.careerScrollCue:hover i{border-color:var(--career-orange);background:rgba(239,116,48,.12)}
        .careerHeroImage{animation:careerImageIn 1.4s cubic-bezier(.2,.7,.2,1) both}.careerPage.isAnimationReady .careerAnimateText{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.75,.25,1),transform .7s cubic-bezier(.2,.75,.25,1);transition-delay:var(--career-delay,0ms)}.careerPage.isAnimationReady .careerAnimateText.isVisible{opacity:1;transform:translateY(0)}
        .careerHeroVisual{position:relative;height:min(72vh,720px);min-height:560px;isolation:isolate}.careerOrbit{position:absolute;border:1px solid rgba(17,19,19,.11);border-radius:50%}.careerOrbitOne{inset:7% 5% 4% 9%}.careerOrbitTwo{inset:20% 17% 16% 23%;border-color:rgba(239,116,48,.28)}.careerGhostWord{position:absolute;top:50%;left:50%;z-index:-1;color:rgba(17,19,19,.045);font-size:clamp(120px,16vw,280px);font-weight:900;letter-spacing:-.1em;transform:translate(-50%,-51%)}.careerScooterWrap{position:absolute;inset:2% 0 7%}.careerScooter{object-fit:contain;filter:drop-shadow(0 35px 28px rgba(17,19,19,.18));transform:scale(1.08)}
        .careerVisualNote{position:absolute;right:2%;bottom:4%;z-index:3;display:flex;align-items:center;gap:13px;padding:12px 17px 12px 12px;border:1px solid rgba(17,19,19,.1);border-radius:18px;background:rgba(255,255,255,.75);box-shadow:0 14px 35px rgba(17,19,19,.1);backdrop-filter:blur(14px)}.careerVisualNote>span{display:grid;width:40px;height:40px;place-items:center;border-radius:12px;background:var(--career-orange);color:#fff}.careerVisualNote svg{width:19px}.careerVisualNote p{margin:0;color:#666;font-size:11px;line-height:1.45}.careerVisualNote b{color:#171918;font-size:12px}
        .careerStatement{padding:clamp(68px,6vw,92px) clamp(24px,6vw,96px);display:flex;align-items:center;justify-content:center;background:#101212;color:#fff}.careerStatement p{max-width:none;margin:0;text-align:center;font-size:clamp(30px,2.25vw,42px);font-weight:600;line-height:1.12;letter-spacing:-.045em;white-space:nowrap}.careerStatement em{display:inline-block;animation:careerAccentPulse 2.8s ease-in-out infinite}
        .careerLife{padding:clamp(72px,7vw,108px) clamp(20px,6vw,96px);background:#f5f3ef}.careerLifeHeading{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr);align-items:end;gap:clamp(40px,6vw,90px);margin-bottom:52px}.careerLife h2,.careerValues h2{margin:20px 0 0;font-size:clamp(46px,4.5vw,72px);line-height:.96;letter-spacing:-.055em}.careerLifeHeading>p{max-width:520px;margin:0 0 4px;color:#656864;font-size:16px;line-height:1.65}
        .careerGallery{display:grid;grid-template-columns:1.75fr 1fr;grid-template-rows:430px 320px;gap:18px}.careerGallery figure{position:relative;margin:0;overflow:hidden;border-radius:26px;background:#222}.careerGallery figure img{object-fit:cover;transition:transform .7s ease}.careerGallery figure:hover img{transform:scale(1.025)}.careerGallery figure:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.74))}.careerGallery figcaption{position:absolute;left:26px;right:26px;bottom:22px;z-index:2;display:flex;align-items:end;justify-content:space-between;gap:15px;color:#fff}.careerGallery figcaption span{font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.careerGallery figcaption b{font-size:18px}.careerGalleryTall{grid-row:span 2}.careerGalleryWide img{object-position:center 39%}
        .careerValues{padding:clamp(72px,7vw,108px) clamp(20px,6vw,96px);display:grid;grid-template-columns:minmax(260px,.52fr) minmax(0,1.48fr);align-items:start;gap:clamp(55px,7vw,120px);background:#e7e3dc}.careerValuesHeading{align-self:start}.careerValues h2{font-size:clamp(50px,4.6vw,72px);line-height:.94}.careerValueList{border-top:1px solid rgba(17,19,19,.18)}.careerValueList article{display:grid;grid-template-columns:58px minmax(230px,.72fr) minmax(260px,1fr);align-items:center;gap:18px;padding:30px 0;border-bottom:1px solid rgba(17,19,19,.18)}.careerValueIcon{display:grid;width:44px;height:44px;place-items:center;border-radius:50%;background:#fff;color:var(--career-orange)}.careerValueIcon svg{width:20px}.careerValueList h3{margin:0;font-size:clamp(23px,1.8vw,30px);letter-spacing:-.035em}.careerValueList p{max-width:490px;margin:0;color:#666a66;font-size:15px;line-height:1.6}
        .careerFinalCta{position:relative;min-height:680px;padding:90px clamp(24px,8vw,130px);display:flex;align-items:center;isolation:isolate;color:#fff}.careerFinalImage{z-index:-2;object-fit:cover;object-position:center}.careerFinalShade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(4,5,5,.92) 0%,rgba(4,5,5,.74) 42%,rgba(4,5,5,.18) 76%),linear-gradient(180deg,rgba(4,5,5,.18),rgba(4,5,5,.58))}.careerFinalContent{width:min(650px,100%);opacity:1}.careerFinalContent .careerSectionIndex{color:rgba(255,255,255,.72)}.careerFinalContent h2{margin:20px 0 18px;color:#fff;font-size:clamp(52px,5.3vw,84px);line-height:.94;letter-spacing:-.06em}.careerFinalContent h2 em{color:var(--career-orange);font-style:normal}.careerFinalContent p{max-width:540px;margin:0 0 24px;color:rgba(255,255,255,.8);font-size:17px;line-height:1.65}.careerRoleTags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:30px}.careerRoleTags span{padding:7px 12px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.86);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(6px)}.careerFinalContent a{display:inline-flex;min-height:54px;align-items:center;gap:15px;padding:0 24px;border-radius:999px;background:var(--career-orange);color:#fff;font-size:14px;font-weight:800;box-shadow:0 14px 32px rgba(0,0,0,.2);transition:transform .2s ease,background .2s ease}.careerFinalContent a:hover{background:#d86124;transform:translateY(-2px)}
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerPage{--career-paper:#080909;--career-ink:#f5f5f2;background:#080909;color:#f5f5f2}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerHero{background:radial-gradient(circle at 72% 26%,rgba(239,116,48,.17),transparent 27%),linear-gradient(135deg,#101212,#080909)}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerHeroCopy>p,html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerLifeHeading>p,html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerValueList p{color:#aaa}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerOrbit{border-color:rgba(255,255,255,.13)}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerGhostWord{color:rgba(255,255,255,.04)}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerLife{background:#0d0f0f}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerValues{background:#141616}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerValueList,html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerValueList article{border-color:rgba(255,255,255,.15)}html:is([data-theme="dark"],[data-rivot-theme="dark"]) .careerValueIcon{background:#222525}
        @media(max-width:1100px){.careerStatement{grid-template-columns:1fr;gap:24px}.careerStatement p{max-width:850px;white-space:normal}.careerValueList article{grid-template-columns:54px 1fr;grid-template-areas:"icon title" ". copy"}.careerValueIcon{grid-area:icon}.careerValueList h3{grid-area:title}.careerValueList p{grid-area:copy;margin-top:5px}}
        @media(max-width:980px){.careerHero{min-height:820px;padding-top:132px}.careerHeroCopy{max-width:700px}.careerHeroImage{object-position:60% center}.careerHeroShade{background:linear-gradient(90deg,rgba(6,7,7,.9),rgba(6,7,7,.62) 58%,rgba(6,7,7,.18)),linear-gradient(180deg,rgba(6,7,7,.3),rgba(6,7,7,.4))}.careerLocation{margin-top:40px}.careerLifeHeading,.careerValues{grid-template-columns:1fr}.careerValueList{margin-top:6px}}
        @media(max-width:700px){.careerHero{min-height:760px;padding:118px 20px 54px;align-items:flex-end}.careerHeroImage{object-position:64% center}.careerHeroShade{background:linear-gradient(180deg,rgba(6,7,7,.2),rgba(6,7,7,.5) 36%,rgba(6,7,7,.95) 100%)}.careerHero h1{font-size:clamp(58px,19vw,86px)}.careerHeroActions{align-items:flex-start;flex-direction:column;gap:20px}.careerStatement{padding:68px 20px;grid-template-columns:1fr;gap:28px}.careerStatement .careerSectionIndex{padding-top:0}.careerStatement p{font-size:clamp(38px,11vw,54px)}.careerLife,.careerValues{padding-inline:16px}.careerLifeHeading{gap:28px;margin-bottom:38px}.careerGallery{grid-template-columns:1fr;grid-template-rows:310px 420px 300px}.careerGalleryTall{grid-row:auto}.careerGallery figure{border-radius:19px}.careerValues{gap:38px}.careerValueList article{grid-template-columns:46px 1fr;gap:6px 12px}.careerValueIcon{width:42px;height:42px}.careerFinalCta{min-height:680px}.careerFinalImage{object-position:58% center}}
        @keyframes careerTextIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes careerImageIn{from{opacity:.55;transform:scale(1.035)}to{opacity:1;transform:scale(1)}}@keyframes careerAccentPulse{0%,100%{color:#ef7430;text-shadow:0 0 0 rgba(239,116,48,0);transform:translateY(0)}50%{color:#ff8a4a;text-shadow:0 0 22px rgba(239,116,48,.34);transform:translateY(-2px)}}@keyframes careerCueBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
        @media(prefers-reduced-motion:reduce){.careerGallery figure img,.careerPrimary,.careerFinalContent a{transition:none}.careerHeroImage,.careerStatement em,.careerScrollCue i{animation:none!important}.careerPage.isAnimationReady .careerAnimateText{opacity:1!important;transform:none!important;transition:none!important}}
      `}</style>
    </main>
  );
}
