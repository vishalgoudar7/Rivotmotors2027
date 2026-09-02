import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string | null;
  image: string;
  readTime?: string;
  contentHtml?: string;
  sections?: Array<{
    heading: string;
    body: string;
  }>;
};

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="rivotSingleBlog">
      <header className="rivotSingleHeader">
        <Link href="/blog" className="rivotBackLink">
          Back to Blog
        </Link>
        <p>RIVOT Blog</p>
        <h1>{post.title}</h1>
        <div className="rivotSingleMeta">
          <span>{post.author}</span>
          <span>{post.date}</span>
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>
      </header>

      <figure className="rivotSingleImage">
        <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 92vw, 1100px" />
      </figure>

      <p className="rivotSingleExcerpt">{post.excerpt}</p>

      <div className="rivotSingleContent">
        {post.contentHtml ? (
          <section dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        ) : null}

        {!post.contentHtml && post.sections?.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>

      <div className="rivotSingleFooter">
        <Link href="/blog">Back to Blog</Link>
      </div>

      <style>{`
        .rivotSingleBlog {
          min-height: 100vh;
          padding: 124px 7% 88px;
          background:
            radial-gradient(circle at 84% 12%, rgba(239, 116, 48, .16), transparent 28%),
            linear-gradient(135deg, #ffffff 0%, #f7f4f0 56%, #f4e5dd 100%);
          color: #111;
        }

        .rivotSingleHeader {
          display: grid;
          justify-items: center;
          max-width: 980px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .rivotBackLink {
          justify-self: start;
          margin-bottom: 34px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
        }

        .rivotSingleHeader p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .rivotSingleHeader h1 {
          max-width: 900px;
          margin: 0;
          color: #080808;
          font-size: 48px;
          font-weight: 950;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .rivotSingleMeta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .rivotSingleMeta span {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 13px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 999px;
          background: rgba(255, 255, 255, .54);
          color: #5f6870;
          font-size: 13px;
          font-weight: 850;
          text-transform: uppercase;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .rivotSingleImage {
          position: relative;
          max-width: 1120px;
          aspect-ratio: 16 / 8;
          margin: 0 auto 32px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .64);
          border-radius: 8px;
          background: #f1ece8;
          box-shadow: 0 26px 70px rgba(17, 17, 17, .14);
        }

        .rivotSingleImage img {
          object-fit: cover;
        }

        .rivotSingleExcerpt,
        .rivotSingleContent {
          max-width: 820px;
          margin-left: auto;
          margin-right: auto;
        }

        .rivotSingleExcerpt {
          margin-bottom: 36px;
          color: #c85a22;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.55;
          text-align: center;
        }

        .rivotSingleContent {
          display: grid;
          gap: 30px;
        }

        .rivotSingleContent section {
          padding: 24px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 8px;
          background: rgba(255, 255, 255, .78);
          box-shadow: 0 14px 32px rgba(17, 17, 17, .06);
        }

        .rivotSingleContent h2 {
          margin: 0 0 12px;
          color: #101010;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.035em;
        }

        .rivotSingleContent h3 {
          margin: 20px 0 10px;
          color: #101010;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.025em;
        }

        .rivotSingleContent p,
        .rivotSingleContent li {
          margin: 0;
          color: #5d6971;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.7;
        }

        .rivotSingleContent ul {
          display: grid;
          gap: 8px;
          margin: 14px 0 0;
          padding-left: 22px;
        }

        .rivotSingleFooter {
          display: flex;
          justify-content: center;
          max-width: 820px;
          margin: 54px auto 0;
          padding-top: 34px;
          border-top: 1px solid rgba(17, 17, 17, .1);
        }

        .rivotSingleFooter a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 6px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          box-shadow: 0 14px 30px rgba(239, 116, 48, .24);
        }

        @media (max-width: 760px) {
          .rivotSingleBlog {
            padding: 96px 16px 64px;
          }

          .rivotSingleHeader h1 {
            font-size: 40px;
          }

          .rivotSingleExcerpt {
            font-size: 17px;
          }

          .rivotBackLink {
            justify-self: center;
            margin-bottom: 24px;
          }

          .rivotSingleImage {
            aspect-ratio: 4 / 3;
            border-radius: 14px;
          }

          .rivotSingleContent section {
            padding: 20px;
          }
        }
      `}</style>
    </article>
  );
}
