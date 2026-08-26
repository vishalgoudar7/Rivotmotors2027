import Link from "next/link";

export default function CareersPage() {
  return (
    <section className="communityPage">
      <div className="communityWrap">
        <p className="communityEyebrow">RIVOT Careers</p>
        <h1>Build the next ride.</h1>
        <p>
          Work with the team shaping smarter electric mobility, from product and design to engineering and service.
        </p>
        <Link href="/connect">Reach us</Link>
      </div>

      <style>{`
        .communityPage {
          min-height: 72vh;
          padding: 150px 7% 90px;
          background:
            radial-gradient(circle at 82% 16%, rgba(239, 116, 48, .18), transparent 30%),
            linear-gradient(135deg, #ffffff 0%, #f7f4f0 58%, #f4e5dd 100%);
          color: #111;
        }

        .communityWrap {
          max-width: 760px;
        }

        .communityEyebrow {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .communityPage h1 {
          margin: 0 0 18px;
          font-size: clamp(46px, 7vw, 88px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: -.05em;
        }

        .communityPage p:not(.communityEyebrow) {
          max-width: 560px;
          margin: 0 0 34px;
          color: #5d6770;
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700;
          line-height: 1.45;
        }

        .communityPage a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 28px;
          border-radius: 999px;
          background: #ef7430;
          color: #fff;
          font-size: 15px;
          font-weight: 850;
          text-decoration: none;
          box-shadow: 0 16px 34px rgba(239, 116, 48, .26);
        }

        @media (max-width: 680px) {
          .communityPage {
            padding: 110px 5% 70px;
          }
        }
      `}</style>
    </section>
  );
}
