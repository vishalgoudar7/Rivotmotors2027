import Image from "next/image";
import Link from "next/link";
import { forumCategories, forumPosts } from "@/lib/forumPosts";

const filters = ["Recent", "Popular", "Unanswered"];

export function Forum() {
  return (
    <section className="rivotForumPage">
      <div className="rivotForumHero">
        <Image src="/Story_page/23.webp" alt="RIVOT community forum" fill priority sizes="100vw" />
        <div className="rivotForumHeroShade" />
        <div className="rivotForumHeroContent">
          <p>Community</p>
          <h1>Community Forum</h1>
          <span>Connect with fellow riders, share experiences, and discuss all things electric mobility.</span>
        </div>
      </div>

      <div className="rivotForumContent">
        <section className="rivotForumSection">
          <div className="rivotForumHeading">
            <p>Forum categories</p>
            <h2>Find the right place for your ride questions.</h2>
          </div>
          <div className="rivotForumCategories">
            {forumCategories.map((category) => (
              <article className="rivotForumCategory" key={category.name}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div>
                  <span>
                    <b>{category.topics}</b>
                    Topics
                  </span>
                  <span>
                    <b>{category.posts}</b>
                    Posts
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rivotForumSection">
          <div className="rivotForumTopics">
            <div className="rivotForumTopicsHeader">
              <h2>Latest Discussions</h2>
              <div>
                {filters.map((filter) => (
                  <span className={filter === "Recent" ? "isActive" : ""} key={filter}>
                    {filter}
                  </span>
                ))}
              </div>
            </div>

            <div className="rivotForumTopicList">
              {forumPosts.map((post) => (
                <Link href={`/forum/${post.slug}`} className="rivotForumTopic" key={post.slug}>
                  <span className="rivotForumTopicIcon">#</span>
                  <span className="rivotForumTopicBody">
                    <strong>{post.title}</strong>
                    <small>
                      {post.author} / {post.timeAgo} / {post.category}
                    </small>
                    <em>{post.excerpt}</em>
                  </span>
                  <span className="rivotForumTopicStats">
                    <b>{post.replies}</b>
                    replies
                    <small>{post.views} views</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .rivotForumPage {
          background:
            radial-gradient(circle at 80% 16%, rgba(239, 116, 48, .16), transparent 30%),
            linear-gradient(135deg, #ffffff 0%, #f7f4f0 56%, #f4e5dd 100%);
          color: #111;
        }

        .rivotForumHero {
          position: relative;
          min-height: 68vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: 130px 7% 76px;
          isolation: isolate;
        }

        .rivotForumHero img {
          object-fit: cover;
          object-position: center;
        }

        .rivotForumHeroShade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, .46), rgba(0, 0, 0, .2) 44%, rgba(0, 0, 0, .56)),
            linear-gradient(90deg, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1) 58%, rgba(239, 116, 48, .22));
        }

        .rivotForumHeroContent {
          position: relative;
          z-index: 2;
          max-width: 940px;
          text-align: center;
          color: #fff;
        }

        .rivotForumHeroContent p,
        .rivotForumHeading p {
          margin: 0 0 14px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .rivotForumHeroContent h1 {
          margin: 0;
          font-size: clamp(44px, 8vw, 96px);
          font-weight: 950;
          line-height: .95;
          letter-spacing: -.04em;
          text-transform: uppercase;
        }

        .rivotForumHeroContent span {
          display: block;
          max-width: 780px;
          margin: 24px auto 0;
          color: rgba(255, 255, 255, .84);
          font-size: clamp(17px, 2vw, 23px);
          font-weight: 700;
          line-height: 1.45;
        }

        .rivotForumContent {
          max-width: 1240px;
          margin: 0 auto;
          padding: 84px 7% 110px;
        }

        .rivotForumSection + .rivotForumSection {
          margin-top: 58px;
        }

        .rivotForumHeading {
          max-width: 760px;
          margin-bottom: 28px;
        }

        .rivotForumHeading h2,
        .rivotForumTopicsHeader h2 {
          margin: 0;
          color: #111;
          font-size: clamp(30px, 4.4vw, 56px);
          font-weight: 950;
          line-height: 1;
          letter-spacing: -.05em;
        }

        .rivotForumCategories {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .rivotForumCategory,
        .rivotForumTopics {
          border: 1px solid rgba(255, 255, 255, .62);
          border-radius: 18px;
          background: rgba(255, 255, 255, .56);
          box-shadow:
            0 24px 58px rgba(17, 17, 17, .1),
            inset 0 1px 0 rgba(255, 255, 255, .74);
          backdrop-filter: blur(22px) saturate(1.3);
          -webkit-backdrop-filter: blur(22px) saturate(1.3);
        }

        .rivotForumCategory {
          display: grid;
          align-content: start;
          gap: 16px;
          padding: 24px;
          border-left: 4px solid #ef7430;
        }

        .rivotForumCategory h3 {
          margin: 0;
          color: #070707;
          font-size: clamp(21px, 2.2vw, 27px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.035em;
        }

        .rivotForumCategory p {
          margin: 0;
          color: #5d6971;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.55;
        }

        .rivotForumCategory div {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 6px;
          padding-top: 16px;
          border-top: 1px solid rgba(17, 17, 17, .08);
        }

        .rivotForumCategory span {
          color: #68747c;
          font-size: 12px;
          font-weight: 850;
          text-transform: uppercase;
        }

        .rivotForumCategory b {
          display: block;
          color: #ef7430;
          font-size: 25px;
          line-height: 1;
        }

        .rivotForumTopics {
          overflow: hidden;
        }

        .rivotForumTopicsHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px;
          border-bottom: 1px solid rgba(17, 17, 17, .08);
        }

        .rivotForumTopicsHeader h2 {
          font-size: clamp(24px, 3vw, 38px);
        }

        .rivotForumTopicsHeader div {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
        }

        .rivotForumTopicsHeader span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 13px;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 999px;
          color: #626c73;
          font-size: 12px;
          font-weight: 850;
        }

        .rivotForumTopicsHeader span.isActive {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
        }

        .rivotForumTopic {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) 98px;
          gap: 18px;
          align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(17, 17, 17, .08);
          color: #111;
          text-decoration: none;
          transition: background .2s ease;
        }

        .rivotForumTopic:hover {
          background: rgba(239, 116, 48, .08);
        }

        .rivotForumTopic:last-child {
          border-bottom: 0;
        }

        .rivotForumTopicIcon {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 116, 48, .14);
          color: #ef7430;
          font-size: 22px;
          font-weight: 950;
        }

        .rivotForumTopicBody {
          display: grid;
          gap: 7px;
          min-width: 0;
        }

        .rivotForumTopicBody strong {
          color: #080808;
          font-size: 19px;
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -.025em;
        }

        .rivotForumTopicBody small,
        .rivotForumTopicBody em,
        .rivotForumTopicStats {
          color: #64707a;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
          font-style: normal;
        }

        .rivotForumTopicStats {
          display: grid;
          justify-items: center;
          gap: 2px;
          padding-left: 16px;
          border-left: 1px solid rgba(17, 17, 17, .1);
          text-align: center;
          text-transform: uppercase;
        }

        .rivotForumTopicStats b {
          color: #ef7430;
          font-size: 26px;
          line-height: 1;
        }

        .rivotForumTopicStats small {
          color: #7a8389;
          font-size: 12px;
          font-weight: 750;
          text-transform: none;
        }

        @media (max-width: 920px) {
          .rivotForumCategories {
            grid-template-columns: 1fr;
          }

          .rivotForumTopicsHeader {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 680px) {
          .rivotForumHero {
            min-height: 58vh;
            padding: 108px 5% 60px;
          }

          .rivotForumContent {
            padding: 64px 5% 82px;
          }

          .rivotForumTopic {
            grid-template-columns: 42px minmax(0, 1fr);
            gap: 14px;
            padding: 20px;
          }

          .rivotForumTopicIcon {
            width: 42px;
            height: 42px;
            font-size: 19px;
          }

          .rivotForumTopicStats {
            grid-column: 2;
            justify-items: start;
            padding: 12px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(17, 17, 17, .1);
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
