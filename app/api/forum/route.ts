import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forumCategories, forumPosts } from "@/lib/forumPosts";
import { formatDate, timeAgo, toJsonSafe } from "../_lib/response";

export const dynamic = "force-dynamic";

type ForumRow = Record<string, unknown>;

function limitValue(value: string | null) {
  return Math.max(1, Math.min(50, Number(value || 10) || 10));
}

function staticCategories() {
  return {
    success: true,
    data: forumCategories.map((category, index) => ({
      id: index + 1,
      name: category.name,
      description: category.description,
      topics_count: category.topics,
      posts_count: category.posts,
      is_active: 1,
    })),
    source: "static",
  };
}

function staticPosts(filter: string, limit: number, offset: number) {
  let posts = [...forumPosts];

  if (filter === "popular") {
    posts.sort((a, b) => b.replies + b.views - (a.replies + a.views));
  } else if (filter === "unanswered") {
    posts = posts.filter((post) => post.replies === 0);
  }

  const data = posts.slice(offset, offset + limit).map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    icon: "fas fa-comments",
    replies: post.replies,
    views: post.views,
    status: "active",
    created_at: post.date,
    time_ago: post.timeAgo,
    category_name: post.category,
    category_color: "#CE6723",
  }));

  return {
    success: true,
    data,
    meta: {
      total: posts.length,
      limit,
      offset,
      has_more: offset + limit < posts.length,
      filter,
      source: "static",
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "posts";
  const limit = limitValue(searchParams.get("limit"));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0) || 0);
  const filter = searchParams.get("filter") || "recent";
  const category = searchParams.get("category") || "";
  const postId = searchParams.get("id");

  try {
    if (type === "categories") {
      const categories = (await prisma.$queryRawUnsafe(`
        SELECT c.*, COUNT(p.id) as topics_count, COALESCE(SUM(p.replies), 0) as total_posts
        FROM forum_categories c
        LEFT JOIN forum_posts p ON c.id = p.category_id AND p.status = 'active'
        WHERE c.is_active = 1
        GROUP BY c.id
        ORDER BY c.sort_order ASC
      `)) as ForumRow[];

      return NextResponse.json(
        toJsonSafe({
          success: true,
          data: categories.map((item) => ({
            ...item,
            posts_count: Number(item.topics_count || 0) + Number(item.total_posts || 0),
          })),
        }),
      );
    }

    if (type === "stats") {
      const rows = (await prisma.$queryRawUnsafe(`
        SELECT COUNT(DISTINCT p.id) as total_topics,
               COALESCE(SUM(p.replies), 0) as total_replies,
               COUNT(DISTINCT p.author) as total_members,
               MAX(p.created_at) as latest_post
        FROM forum_posts p
        WHERE p.status = 'active'
      `)) as ForumRow[];
      const stats = rows[0] || {};

      return NextResponse.json(
        toJsonSafe({
          success: true,
          data: {
            ...stats,
            total_posts: Number(stats.total_topics || 0) + Number(stats.total_replies || 0),
            latest_post: formatDate(stats.latest_post),
          },
        }),
      );
    }

    if (type === "posts" && postId) {
      const rows = (await prisma.$queryRawUnsafe(
        `SELECT p.*, c.name as category_name, c.color as category_color
         FROM forum_posts p
         LEFT JOIN forum_categories c ON p.category_id = c.id
         WHERE p.id = ? AND p.status = 'active'
         LIMIT 1`,
        postId,
      )) as ForumRow[];
      const post = rows[0];

      if (!post) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }

      await prisma.$executeRawUnsafe("UPDATE forum_posts SET views = views + 1 WHERE id = ?", postId);

      return NextResponse.json(
        toJsonSafe({
          success: true,
          data: {
            ...post,
            views: Number(post.views || 0) + 1,
            created_at: formatDate(post.created_at),
            time_ago: timeAgo(post.created_at),
          },
        }),
      );
    }

    const where: string[] = ["p.status = 'active'"];
    const params: unknown[] = [];
    let orderBy = "ORDER BY p.created_at DESC";

    if (category && Number.isFinite(Number(category))) {
      where.push("p.category_id = ?");
      params.push(category);
    }

    if (filter === "popular") {
      orderBy = "ORDER BY (p.replies + p.views) DESC, p.created_at DESC";
    } else if (filter === "unanswered") {
      where.push("p.replies = 0");
    }

    const whereClause = `WHERE ${where.join(" AND ")}`;
    const posts = (await prisma.$queryRawUnsafe(
      `SELECT p.id, p.title, p.excerpt, p.author, p.icon, p.replies, p.views, p.status, p.created_at,
              c.name as category_name, c.color as category_color
       FROM forum_posts p
       LEFT JOIN forum_categories c ON p.category_id = c.id
       ${whereClause}
       ${orderBy}
       LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset,
    )) as ForumRow[];
    const countRows = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as total
       FROM forum_posts p
       LEFT JOIN forum_categories c ON p.category_id = c.id
       ${whereClause}`,
      ...params,
    )) as Array<{ total: bigint | number }>;
    const total = Number(countRows[0]?.total || 0);

    return NextResponse.json(
      toJsonSafe({
        success: true,
        data: posts.map((post) => ({
          ...post,
          created_at: formatDate(post.created_at),
          time_ago: timeAgo(post.created_at),
        })),
        meta: {
          total,
          limit,
          offset,
          has_more: offset + limit < total,
          filter,
        },
      }),
    );
  } catch (error) {
    if (type === "categories") {
      return NextResponse.json(staticCategories());
    }

    if (type === "stats") {
      const totalTopics = forumPosts.length;
      const totalReplies = forumPosts.reduce((sum, post) => sum + post.replies, 0);
      return NextResponse.json({
        success: true,
        data: {
          total_topics: totalTopics,
          total_replies: totalReplies,
          total_members: new Set(forumPosts.map((post) => post.author)).size,
          total_posts: totalTopics + totalReplies,
          latest_post: forumPosts[0]?.date || null,
        },
        source: "static",
      });
    }

    if (postId) {
      const post = forumPosts.find((item) => item.id === postId || item.slug === postId);
      if (!post) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content.map((paragraph) => `<p>${paragraph}</p>`).join(""),
          author: post.author,
          icon: "fas fa-comments",
          replies: post.replies,
          views: post.views,
          status: "active",
          created_at: post.date,
          time_ago: post.timeAgo,
          category_name: post.category,
          category_color: "#CE6723",
        },
        source: "static",
      });
    }

    return NextResponse.json(staticPosts(filter, limit, offset));
  }
}
