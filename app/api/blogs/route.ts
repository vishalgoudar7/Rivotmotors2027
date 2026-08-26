import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { blogPosts } from "@/lib/blogPosts";
import { formatDate, toJsonSafe } from "../_lib/response";

export const dynamic = "force-dynamic";

type BlogRow = Record<string, unknown>;

function limitValue(value: string | null) {
  return Math.max(1, Math.min(50, Number(value || 10) || 10));
}

function staticBlogList(limit: number, offset: number) {
  const data = blogPosts.slice(offset, offset + limit).map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    image_url: post.image,
    author: post.author,
    created_at: post.date,
  }));

  return {
    success: true,
    data,
    meta: {
      total: blogPosts.length,
      limit,
      offset,
      has_more: offset + limit < blogPosts.length,
      source: "static",
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = limitValue(searchParams.get("limit"));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0) || 0);
  const status = searchParams.get("status") || "published";
  const id = searchParams.get("id");

  try {
    if (id) {
      const rows = (await prisma.$queryRawUnsafe(
        "SELECT id, title, excerpt, content, image_url, author, status, created_at, updated_at FROM `blogs` WHERE id = ? AND status = 'published' LIMIT 1",
        id,
      )) as BlogRow[];
      const blog = rows[0];

      if (!blog) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
      }

      return NextResponse.json(
        toJsonSafe({
          success: true,
          data: {
            ...blog,
            created_at: formatDate(blog.created_at),
            updated_at: formatDate(blog.updated_at),
          },
        }),
      );
    }

    const blogs = (await prisma.$queryRawUnsafe(
      "SELECT id, title, excerpt, image_url, author, created_at FROM `blogs` WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      status,
      limit,
      offset,
    )) as BlogRow[];
    const countRows = (await prisma.$queryRawUnsafe("SELECT COUNT(*) as total FROM `blogs` WHERE status = ?", status)) as Array<{
      total: bigint | number;
    }>;
    const total = Number(countRows[0]?.total || 0);

    return NextResponse.json(
      toJsonSafe({
        success: true,
        data: blogs.map((blog) => ({ ...blog, created_at: formatDate(blog.created_at) })),
        meta: {
          total,
          limit,
          offset,
          has_more: offset + limit < total,
        },
      }),
    );
  } catch (error) {
    if (id) {
      const post = blogPosts.find((item) => item.id === id || item.slug === id);
      if (!post) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.sections.map((section) => `<h3>${section.heading}</h3><p>${section.body}</p>`).join(""),
          image_url: post.image,
          author: post.author,
          status: "published",
          created_at: post.date,
          updated_at: post.date,
        },
        source: "static",
      });
    }

    return NextResponse.json(staticBlogList(limit, offset));
  }
}
