import Link from "next/link";
import type { forumPosts } from "@/lib/forumPosts";

type ForumPostData = (typeof forumPosts)[number];

export function ForumPost({ post }: { post: ForumPostData }) {
  return (
    <article className="rivotForumPostPage">
      <div className="rivotForumPostShell">
        <Link href="/forum" className="rivotForumBack">
          Back to Forum
        </Link>

        <header className="rivotForumPostHeader">
          <span className="rivotForumPostIcon">#</span>
          <div>
            <p>{post.category}</p>
            <h1>{post.title}</h1>
            <div className="rivotForumPostMeta">
              <span>{post.author}</span>
              <span>{post.date}</span>
              <span>{post.replies} replies</span>
              <span>{post.views} views</span>
            </div>
          </div>
        </header>

        <section className="rivotForumPostBody">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="rivotForumReplies">
          <h2>Replies</h2>
          {post.repliesList.length > 0 ? (
            post.repliesList.map((reply) => (
              <article className="rivotForumReply" key={`${reply.author}-${reply.time}`}>
                <div>
                  <strong>{reply.author}</strong>
                  <span>{reply.time}</span>
                </div>
                <p>{reply.body}</p>
              </article>
            ))
          ) : (
            <div className="rivotForumReply">
              <p>No replies yet. Be the first to add your thoughts.</p>
            </div>
          )}

          <form className="rivotForumReplyForm">
            <h3>Post a Reply</h3>
            <label>
              Your Name
              <input placeholder="Enter your name" />
            </label>
            <label>
              Your Reply
              <textarea rows={5} placeholder="Share your thoughts, experiences, or questions..." />
            </label>
            <button type="button">Post Reply</button>
          </form>
        </section>
      </div>

      <style>{`
        .rivotForumPostPage {
          min-height: 100vh;
          padding: 138px 7% 100px;
          background:
            radial-gradient(circle at 84% 12%, rgba(239, 116, 48, .16), transparent 28%),
            linear-gradient(135deg, #ffffff 0%, #f7f4f0 56%, #f4e5dd 100%);
          color: #111;
        }

        .rivotForumPostShell {
          max-width: 1040px;
          margin: 0 auto;
        }

        .rivotForumBack {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          margin-bottom: 24px;
          padding: 0 16px;
          border: 1px solid rgba(239, 116, 48, .38);
          border-radius: 999px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
        }

        .rivotForumPostHeader,
        .rivotForumPostBody,
        .rivotForumReply,
        .rivotForumReplyForm {
          border: 1px solid rgba(255, 255, 255, .62);
          border-radius: 18px;
          background: rgba(255, 255, 255, .56);
          box-shadow:
            0 24px 58px rgba(17, 17, 17, .1),
            inset 0 1px 0 rgba(255, 255, 255, .74);
          backdrop-filter: blur(22px) saturate(1.3);
          -webkit-backdrop-filter: blur(22px) saturate(1.3);
        }

        .rivotForumPostHeader {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
          padding: 30px;
          border-left: 4px solid #ef7430;
        }

        .rivotForumPostIcon {
          display: grid;
          width: 54px;
          height: 54px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 116, 48, .14);
          color: #ef7430;
          font-size: 25px;
          font-weight: 950;
        }

        .rivotForumPostHeader p {
          margin: 0 0 10px;
          color: #ef7430;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .rivotForumPostHeader h1 {
          margin: 0;
          color: #080808;
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 950;
          line-height: 1;
          letter-spacing: -.05em;
        }

        .rivotForumPostMeta {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 20px;
        }

        .rivotForumPostMeta span {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          padding: 0 12px;
          border: 1px solid rgba(17, 17, 17, .08);
          border-radius: 999px;
          color: #63707a;
          font-size: 12px;
          font-weight: 850;
          text-transform: uppercase;
        }

        .rivotForumPostBody {
          display: grid;
          gap: 16px;
          margin-top: 24px;
          padding: 30px;
        }

        .rivotForumPostBody p,
        .rivotForumReply p {
          margin: 0;
          color: #5d6971;
          font-size: 17px;
          font-weight: 650;
          line-height: 1.75;
        }

        .rivotForumReplies {
          display: grid;
          gap: 16px;
          margin-top: 42px;
        }

        .rivotForumReplies h2 {
          margin: 0 0 8px;
          color: #c85a22;
          font-size: clamp(28px, 3.8vw, 42px);
          font-weight: 950;
          letter-spacing: -.04em;
        }

        .rivotForumReply {
          display: grid;
          gap: 12px;
          padding: 22px;
          border-left: 3px solid rgba(239, 116, 48, .5);
        }

        .rivotForumReply div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .rivotForumReply strong {
          color: #c85a22;
          font-size: 16px;
          font-weight: 900;
        }

        .rivotForumReply span {
          color: #7a8389;
          font-size: 13px;
          font-weight: 800;
        }

        .rivotForumReplyForm {
          display: grid;
          gap: 16px;
          margin-top: 14px;
          padding: 26px;
          border-style: dashed;
        }

        .rivotForumReplyForm h3 {
          margin: 0;
          color: #c85a22;
          font-size: 24px;
          font-weight: 950;
        }

        .rivotForumReplyForm label {
          display: grid;
          gap: 8px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
        }

        .rivotForumReplyForm input,
        .rivotForumReplyForm textarea {
          width: 100%;
          border: 1px solid rgba(17, 17, 17, .12);
          border-radius: 8px;
          background: rgba(255, 255, 255, .68);
          color: #111;
          padding: 13px 14px;
          resize: vertical;
        }

        .rivotForumReplyForm button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: max-content;
          min-height: 46px;
          padding: 0 24px;
          border: 0;
          border-radius: 6px;
          background: #ef7430;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 14px 30px rgba(239, 116, 48, .24);
        }

        @media (max-width: 680px) {
          .rivotForumPostPage {
            padding: 108px 5% 78px;
          }

          .rivotForumPostHeader {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .rivotForumReply div {
            align-items: flex-start;
            flex-direction: column;
            gap: 2px;
          }
        }
      `}</style>
    </article>
  );
}
