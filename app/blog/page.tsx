import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

const heroSlides = [
  {
    title: "Explore the Journey",
    image: "/Story_page/10.webp",
  },
  {
    title: "Ride the Future",
    image: "/Story_page/15.webp",
  },
  {
    title: "Eco-Friendly Adventures",
    image: "/Story_page/23.webp",
  },
];

export default function BlogPage() {
  return (
    <section className="rivotBlogPage">
      <div className="rivotBlogHero">
        <div className="rivotBlogHeroMedia">
          {heroSlides.map((slide, index) => (
            <figure key={slide.title} style={{ animationDelay: `${index * 4}s` }}>
              <Image src={slide.image} alt={slide.title} fill priority={index === 0} sizes="100vw" />
            </figure>
          ))}
        </div>
        <div className="rivotBlogHeroShade" />
        <div className="rivotBlogHeroContent">
          <p>Community</p>
          <div className="rivotBlogTitleTrack" aria-label="RIVOT Blog">
            {heroSlides.map((slide, index) => (
              <h1 key={slide.title} style={{ animationDelay: `${index * 4}s` }}>
                {slide.title}
              </h1>
            ))}
          </div>
          <span>
            Dive into stories, tips, product updates, and electric mobility ideas from the RIVOT rider community.
          </span>
        </div>
        <div className="rivotBlogScroll">Scroll Down</div>
      </div>

      <div className="rivotBlogContent">
        <div className="rivotBlogHeading">
          <p>Latest posts</p>
          <h2>Stories from the road and the workshop.</h2>
        </div>

        <div className="rivotBlogGrid">
          {blogPosts.map((post) => (
            <article className="rivotBlogCard" key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="rivotBlogCardImage" aria-label={post.title}>
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
              </Link>
              <div className="rivotBlogCardBody">
                <div className="rivotBlogMeta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .rivotBlogPage {
          background:
            radial-gradient(circle at 78% 16%, rgba(239, 116, 48, .14), transparent 28%),
            linear-gradient(135deg, #ffffff 0%, #f7f4f0 54%, #f4e5dd 100%);
          color: #111;
        }

        .rivotBlogHero {
          position: relative;
          min-height: 100vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: 130px 7% 82px;
          isolation: isolate;
        }

        .rivotBlogHeroMedia,
        .rivotBlogHeroShade {
          position: absolute;
          inset: 0;
        }

        .rivotBlogHeroMedia figure {
          position: absolute;
          inset: 0;
          margin: 0;
          opacity: 0;
          animation: rivotBlogSlide 12s infinite;
        }

        .rivotBlogHeroMedia figure:first-child {
          opacity: 1;
        }

        .rivotBlogHeroMedia img {
          object-fit: cover;
          object-position: center;
        }

        .rivotBlogHeroShade {
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, .42), rgba(0, 0, 0, .2) 42%, rgba(0, 0, 0, .58)),
            linear-gradient(90deg, rgba(0, 0, 0, .52), rgba(0, 0, 0, .08) 56%, rgba(239, 116, 48, .24));
        }

        .rivotBlogHeroContent {
          position: relative;
          z-index: 2;
          display: grid;
          justify-items: center;
          width: min(92vw, 1420px);
          max-width: 1420px;
          text-align: center;
          color: #fff;
        }

        .rivotBlogHeroContent p,
        .rivotBlogHeading p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .rivotBlogTitleTrack {
          position: relative;
          width: min(100%, 1420px);
          min-height: clamp(62px, 8.4vw, 120px);
        }

        .rivotBlogTitleTrack h1 {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          font-size: clamp(42px, 6.3vw, 112px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: 0;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          filter: blur(10px);
          transform: translateX(70px);
          animation: rivotBlogTitle 12s infinite;
        }

        .rivotBlogTitleTrack h1:first-child {
          opacity: 1;
          filter: blur(0);
          transform: translateX(0);
        }

        .rivotBlogHeroContent span {
          display: block;
          max-width: 850px;
          margin-top: 28px;
          color: rgba(255, 255, 255, .84);
          font-size: clamp(17px, 2.2vw, 25px);
          font-weight: 700;
          line-height: 1.45;
        }

        .rivotBlogScroll {
          position: absolute;
          left: 50%;
          bottom: 34px;
          z-index: 2;
          color: rgba(255, 255, 255, .62);
          font-size: 13px;
          font-weight: 700;
          transform: translateX(-50%);
          animation: rivotBlogScroll 2s ease-in-out infinite;
        }

        .rivotBlogContent {
          max-width: 1280px;
          margin: 0 auto;
          padding: 88px 7% 110px;
        }

        .rivotBlogHeading {
          display: grid;
          gap: 4px;
          max-width: 720px;
          margin-bottom: 34px;
        }

        .rivotBlogHeading h2 {
          margin: 0;
          color: #111;
          font-size: clamp(34px, 4.6vw, 64px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.05em;
        }

        .rivotBlogGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .rivotBlogCard {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .62);
          border-radius: 18px;
          background: rgba(255, 255, 255, .56);
          box-shadow:
            0 24px 58px rgba(17, 17, 17, .1),
            inset 0 1px 0 rgba(255, 255, 255, .74);
          backdrop-filter: blur(22px) saturate(1.3);
          -webkit-backdrop-filter: blur(22px) saturate(1.3);
          transition: transform .24s ease, box-shadow .24s ease;
        }

        .rivotBlogCard:hover {
          transform: translateY(-4px);
          box-shadow:
            0 30px 70px rgba(17, 17, 17, .13),
            inset 0 1px 0 rgba(255, 255, 255, .82);
        }

        .rivotBlogCardImage {
          position: relative;
          display: block;
          aspect-ratio: 1.35;
          overflow: hidden;
          background: #f3eee9;
        }

        .rivotBlogCardImage img {
          object-fit: cover;
          transition: transform .32s ease;
        }

        .rivotBlogCard:hover .rivotBlogCardImage img {
          transform: scale(1.04);
        }

        .rivotBlogCardBody {
          display: grid;
          gap: 12px;
          padding: 22px;
        }

        .rivotBlogMeta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          color: #69737b;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .rivotBlogCard h3 {
          margin: 0;
          color: #070707;
          font-size: clamp(21px, 2.2vw, 28px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -.04em;
        }

        .rivotBlogCard p {
          margin: 0;
          color: #5d6971;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.55;
        }

        .rivotBlogCardBody > a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: max-content;
          min-height: 40px;
          margin-top: 4px;
          padding: 0 18px;
          border-radius: 6px;
          background: #ef7430;
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          box-shadow: 0 12px 28px rgba(239, 116, 48, .22);
        }

        @keyframes rivotBlogSlide {
          0%, 27% {
            opacity: 1;
            transform: scale(1);
          }

          33%, 94% {
            opacity: 0;
            transform: scale(1.04);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rivotBlogTitle {
          0%, 28% {
            opacity: 1;
            filter: blur(0);
            transform: translateX(0);
          }

          33%, 100% {
            opacity: 0;
            filter: blur(8px);
            transform: translateX(-48px);
          }
        }

        .rivotBlogTitleTrack h1:nth-child(2),
        .rivotBlogTitleTrack h1:nth-child(3) {
          opacity: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .rivotBlogTitleTrack h1 {
            animation: rivotBlogTitle 12s infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotBlogTitleTrack h1 {
            animation: none;
          }

          .rivotBlogTitleTrack h1:not(:first-child) {
            display: none;
          }
        }

        @media (max-width: 1180px) {
          .rivotBlogTitleTrack {
            min-height: clamp(96px, 13vw, 138px);
          }

          .rivotBlogTitleTrack h1 {
            padding-inline: 12px;
            font-size: clamp(38px, 8vw, 86px);
            line-height: 1;
            white-space: normal;
            text-wrap: balance;
          }
        }

        @keyframes rivotBlogScroll {
          0%, 100% {
            transform: translate(-50%, 0);
          }

          50% {
            transform: translate(-50%, -8px);
          }
        }

        @media (max-width: 980px) {
          .rivotBlogGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .rivotBlogHero {
            min-height: 82vh;
            padding: 108px 5% 64px;
          }

          .rivotBlogTitleTrack {
            min-height: clamp(116px, 27vw, 172px);
          }

          .rivotBlogTitleTrack h1 {
            padding-inline: 0;
            font-size: clamp(34px, 13vw, 58px);
            line-height: 1.02;
            white-space: normal;
          }

          .rivotBlogContent {
            padding: 64px 5% 78px;
          }

          .rivotBlogGrid {
            grid-template-columns: 1fr;
          }

          .rivotBlogCardBody {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
