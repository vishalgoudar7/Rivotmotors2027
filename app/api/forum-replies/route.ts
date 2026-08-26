import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forumPosts } from "@/lib/forumPosts";
import { formatDate, timeAgo, toJsonSafe } from "../_lib/response";

export const dynamic = "force-dynamic";

type ReplyRow = Record<string, unknown>;

function staticReplies(postId: string) {
  const post = forumPosts.find((item) => item.id === postId || item.slug === postId);
  const replies = (post?.repliesList || []).map((reply, index) => ({
    id: index + 1,
    post_id: postId,
    author: reply.author,
    content: reply.body,
    status: "active",
    created_at: reply.time,
    formatted_date: reply.time,
    time_ago: reply.time,
  }));

  return {
    success: true,
    replies,
    count: replies.length,
    source: "static",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("post_id") || "";

  if (!postId || !Number.isFinite(Number(postId))) {
    return NextResponse.json({ error: "Valid post_id is required" }, { status: 400 });
  }

  try {
    const replies = (await prisma.$queryRawUnsafe(
      `SELECT r.*
       FROM forum_replies r
       WHERE r.post_id = ? AND r.status = 'active'
       ORDER BY r.created_at ASC`,
      postId,
    )) as ReplyRow[];

    return NextResponse.json(
      toJsonSafe({
        success: true,
        replies: replies.map((reply) => ({
          ...reply,
          formatted_date: formatDate(reply.created_at),
          time_ago: timeAgo(reply.created_at),
        })),
        count: replies.length,
      }),
    );
  } catch (error) {
    return NextResponse.json(staticReplies(postId));
  }
}

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({}));
  const postId = String(input.post_id || "");
  const author = String(input.author || "").trim();
  const content = String(input.content || "").trim();
  const errors: string[] = [];

  if (!postId || !Number.isFinite(Number(postId))) {
    errors.push("Valid post ID is required");
  }

  if (!author) {
    errors.push("Author name is required");
  } else if (author.length > 100) {
    errors.push("Author name must be 100 characters or less");
  }

  if (!content) {
    errors.push("Reply content is required");
  } else if (content.length > 5000) {
    errors.push("Reply content must be 5000 characters or less");
  }

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  try {
    const posts = (await prisma.$queryRawUnsafe("SELECT id FROM forum_posts WHERE id = ? AND status != 'deleted' LIMIT 1", postId)) as ReplyRow[];
    if (!posts[0]) {
      return NextResponse.json({ success: false, errors: ["Forum post not found"] }, { status: 404 });
    }

    await prisma.$executeRawUnsafe(
      "INSERT INTO forum_replies (post_id, author, content, status, created_at) VALUES (?, ?, ?, 'active', NOW())",
      postId,
      author,
      content,
    );
    const idRows = (await prisma.$queryRawUnsafe("SELECT LAST_INSERT_ID() as id")) as Array<{ id: bigint | number }>;
    const replyId = Number(idRows[0]?.id || 0);

    await prisma.$executeRawUnsafe(
      `UPDATE forum_posts
       SET replies = (SELECT COUNT(*) FROM forum_replies WHERE post_id = ? AND status = 'active'),
           updated_at = NOW()
       WHERE id = ?`,
      postId,
      postId,
    );

    const replies = (await prisma.$queryRawUnsafe("SELECT * FROM forum_replies WHERE id = ? LIMIT 1", replyId)) as ReplyRow[];
    const reply = replies[0] || { id: replyId, post_id: postId, author, content, status: "active", created_at: new Date() };

    return NextResponse.json(
      toJsonSafe({
        success: true,
        message: "Reply added successfully",
        reply: {
          ...reply,
          formatted_date: formatDate(reply.created_at),
          time_ago: "Just now",
        },
      }),
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add reply",
      },
      { status: 500 },
    );
  }
}
