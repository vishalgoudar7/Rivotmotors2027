import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { blogPosts } from "@/lib/blogPosts";
import { formatDate, toJsonSafe } from "../_lib/response";

export const dynamic = "force-dynamic";

type BlogStatus = "draft" | "published";
type BlogRow = Record<string, unknown>;

const BLOG_SELECT =
  "id, title, excerpt, content, image_url, author, status, created_at, updated_at";

function limitValue(value: string | null) {
  return Math.max(1, Math.min(50, Number(value || 10) || 10));
}

function normalizeStatus(value: unknown, fallback: BlogStatus = "published") {
  return value === "draft" || value === "published" ? value : fallback;
}

function normalizeBlog(blog: BlogRow) {
  return {
    ...blog,
    created_at: formatDate(blog.created_at),
    updated_at: formatDate(blog.updated_at),
  };
}

function staticBlogList(limit: number, offset: number) {
  const data = blogPosts.slice(offset, offset + limit).map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.sections.map((section) => `<h3>${section.heading}</h3><p>${section.body}</p>`).join(""),
    image_url: post.image,
    author: post.author,
    status: "published",
    created_at: post.date,
    updated_at: post.date,
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

function staticBlogById(id: string) {
  const post = blogPosts.find((item) => item.id === id || item.slug === id);

  if (!post) {
    return null;
  }

  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.sections.map((section) => `<h3>${section.heading}</h3><p>${section.body}</p>`).join(""),
    image_url: post.image,
    author: post.author,
    status: "published",
    created_at: post.date,
    updated_at: post.date,
  };
}

function validateBlogInput(input: Record<string, unknown>, partial = false) {
  const errors: string[] = [];
  const title = String(input.title || "").trim();
  const excerpt = String(input.excerpt || "").trim();
  const content = String(input.content || "").trim();
  const imageUrl = String(input.image_url || input.image || "").trim();
  const author = String(input.author || "").trim();
  const status = normalizeStatus(input.status, "draft");

  if (!partial || "title" in input) {
    if (!title) errors.push("Title is required");
    if (title.length > 255) errors.push("Title must be 255 characters or less");
  }

  if (!partial || "excerpt" in input) {
    if (!excerpt) errors.push("Excerpt is required");
  }

  if (!partial || "content" in input) {
    if (!content) errors.push("Content is required");
  }

  if (!partial || "image_url" in input || "image" in input) {
    if (!imageUrl) errors.push("Image URL is required");
    if (imageUrl.length > 500) errors.push("Image URL must be 500 characters or less");
  }

  if (!partial || "author" in input) {
    if (!author) errors.push("Author is required");
    if (author.length > 100) errors.push("Author must be 100 characters or less");
  }

  return {
    errors,
    data: {
      title,
      excerpt,
      content,
      image_url: imageUrl,
      author,
      status,
    },
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const limit = limitValue(searchParams.get("limit"));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0) || 0);
  const status = searchParams.get("status") || "published";
  const q = searchParams.get("q")?.trim() || "";

  try {
    if (id) {
      if (!Number.isFinite(Number(id))) {
        const staticPost = staticBlogById(id);
        if (!staticPost) {
          return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: staticPost, source: "static" });
      }

      const rows = (await prisma.$queryRawUnsafe(
        `SELECT ${BLOG_SELECT} FROM blogs WHERE id = ? LIMIT 1`,
        id,
      )) as BlogRow[];
      const blog = rows[0];

      if (!blog) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
      }

      return NextResponse.json(toJsonSafe({ success: true, data: normalizeBlog(blog) }));
    }

    const where: string[] = [];
    const params: unknown[] = [];

    if (status !== "all") {
      where.push("status = ?");
      params.push(normalizeStatus(status));
    }

    if (q) {
      where.push("(title LIKE ? OR excerpt LIKE ? OR author LIKE ?)");
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const blogs = (await prisma.$queryRawUnsafe(
      `SELECT ${BLOG_SELECT} FROM blogs ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset,
    )) as BlogRow[];
    const countRows = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as total FROM blogs ${whereClause}`,
      ...params,
    )) as Array<{ total: bigint | number }>;
    const total = Number(countRows[0]?.total || 0);

    return NextResponse.json(
      toJsonSafe({
        success: true,
        data: blogs.map(normalizeBlog),
        meta: {
          total,
          limit,
          offset,
          has_more: offset + limit < total,
          status,
          q,
        },
      }),
    );
  } catch (error) {
    if (id) {
      const staticPost = staticBlogById(id);
      if (!staticPost) {
        return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: staticPost, source: "static" });
    }

    return NextResponse.json(staticBlogList(limit, offset));
  }
}

export async function POST(request: Request) {
  const input = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const { errors, data } = validateBlogInput(input);

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  try {
    await prisma.$executeRawUnsafe(
      `INSERT INTO blogs (title, excerpt, content, image_url, author, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      data.title,
      data.excerpt,
      data.content,
      data.image_url,
      data.author,
      data.status,
    );
    const idRows = (await prisma.$queryRawUnsafe("SELECT LAST_INSERT_ID() as id")) as Array<{ id: bigint | number }>;
    const blogId = Number(idRows[0]?.id || 0);
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT ${BLOG_SELECT} FROM blogs WHERE id = ? LIMIT 1`,
      blogId,
    )) as BlogRow[];

    return NextResponse.json(
      toJsonSafe({
        success: true,
        message: "Blog created successfully",
        data: normalizeBlog(rows[0]),
      }),
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !Number.isFinite(Number(id))) {
    return NextResponse.json({ success: false, error: "Valid blog id is required" }, { status: 400 });
  }

  const input = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const { errors, data } = validateBlogInput(input, true);

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const updates: string[] = [];
  const params: unknown[] = [];

  if ("title" in input) {
    updates.push("title = ?");
    params.push(data.title);
  }

  if ("excerpt" in input) {
    updates.push("excerpt = ?");
    params.push(data.excerpt);
  }

  if ("content" in input) {
    updates.push("content = ?");
    params.push(data.content);
  }

  if ("image_url" in input || "image" in input) {
    updates.push("image_url = ?");
    params.push(data.image_url);
  }

  if ("author" in input) {
    updates.push("author = ?");
    params.push(data.author);
  }

  if ("status" in input) {
    updates.push("status = ?");
    params.push(data.status);
  }

  if (updates.length === 0) {
    return NextResponse.json({ success: false, error: "No valid fields provided" }, { status: 400 });
  }

  try {
    const existing = (await prisma.$queryRawUnsafe("SELECT id FROM blogs WHERE id = ? LIMIT 1", id)) as BlogRow[];
    if (!existing[0]) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    await prisma.$executeRawUnsafe(
      `UPDATE blogs SET ${updates.join(", ")}, updated_at = NOW() WHERE id = ?`,
      ...params,
      id,
    );
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT ${BLOG_SELECT} FROM blogs WHERE id = ? LIMIT 1`,
      id,
    )) as BlogRow[];

    return NextResponse.json(
      toJsonSafe({
        success: true,
        message: "Blog updated successfully",
        data: normalizeBlog(rows[0]),
      }),
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !Number.isFinite(Number(id))) {
    return NextResponse.json({ success: false, error: "Valid blog id is required" }, { status: 400 });
  }

  try {
    const existing = (await prisma.$queryRawUnsafe("SELECT id FROM blogs WHERE id = ? LIMIT 1", id)) as BlogRow[];
    if (!existing[0]) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    await prisma.$executeRawUnsafe("DELETE FROM blogs WHERE id = ?", id);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      data: { id: Number(id) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
