import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forumCategories, forumPosts } from "@/lib/forumPosts";
import { formatDate, timeAgo, toJsonSafe } from "../_lib/response";
import { requireAdmin } from "@/app/admin/_lib/session";

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
  const admin = searchParams.get("admin") === "1";
  const search = searchParams.get("search")?.trim() || "";

  if (admin && !await requireAdmin()) return NextResponse.json({ success:false, error:"Unauthorized" }, {status:401});

  try {
    if (type === "categories") {
      const categories = (await prisma.$queryRawUnsafe(`
        SELECT c.*, COUNT(p.id) as topics_count, COALESCE(SUM(p.replies), 0) as total_posts
        FROM forum_categories c
        LEFT JOIN forum_posts p ON c.id = p.category_id AND p.status = 'active'
        ${admin ? "" : "WHERE c.is_active = 1"}
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
         WHERE p.id = ? ${admin ? "" : "AND p.status = 'active'"}
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

    const where: string[] = admin ? [] : ["p.status = 'active'"];
    const params: unknown[] = [];
    let orderBy = "ORDER BY p.created_at DESC";

    if (category && Number.isFinite(Number(category))) {
      where.push("p.category_id = ?");
      params.push(category);
    }

    if (admin && filter !== "recent" && ["active","locked","pinned"].includes(filter)) {
      where.push("p.status = ?");
      params.push(filter);
    }

    if (admin && search) {
      where.push("(p.title LIKE ? OR p.content LIKE ? OR p.author LIKE ?)");
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (filter === "popular") {
      orderBy = "ORDER BY (p.replies + p.views) DESC, p.created_at DESC";
    } else if (filter === "unanswered") {
      where.push("p.replies = 0");
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const posts = (await prisma.$queryRawUnsafe(
      `SELECT p.id, p.title, p.excerpt, ${admin ? "p.content," : ""} p.author, p.category_id, p.icon, p.replies, p.views, p.status, p.created_at, p.updated_at,
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

function forumInput(input: Record<string,unknown>, partial=false) {
  const data = {
    title:String(input.title||"").trim(), content:String(input.content||"").trim(), excerpt:String(input.excerpt||"").trim(),
    author:String(input.author||"").trim(), category_id:Number(input.category_id||0), icon:String(input.icon||"fas fa-comments").trim(),
    status:["active","locked","pinned"].includes(String(input.status)) ? String(input.status) : "active",
    replies:Math.max(0,Number(input.replies||0)||0), views:Math.max(0,Number(input.views||0)||0),
  };
  const errors:string[]=[];
  for (const key of ["title","content","excerpt","author"] as const) if ((!partial || key in input) && !data[key]) errors.push(`${key[0].toUpperCase()+key.slice(1)} is required`);
  if ((!partial || "category_id" in input) && (!Number.isInteger(data.category_id)||data.category_id<1)) errors.push("Valid category is required");
  return {data,errors};
}

export async function POST(request:Request) {
  if (!await requireAdmin()) return NextResponse.json({success:false,error:"Unauthorized"},{status:401});
  const input=await request.json().catch(()=>({})) as Record<string,unknown>; const {data,errors}=forumInput(input);
  if(errors.length)return NextResponse.json({success:false,errors},{status:400});
  try {
    await prisma.$executeRawUnsafe("INSERT INTO forum_posts (title,content,excerpt,author,category_id,icon,status,replies,views,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW())",data.title,data.content,data.excerpt,data.author,data.category_id,data.icon,data.status,data.replies,data.views);
    const ids=await prisma.$queryRawUnsafe("SELECT LAST_INSERT_ID() id") as Array<{id:number|bigint}>;
    return NextResponse.json(toJsonSafe({success:true,data:{id:Number(ids[0]?.id||0)},message:"Forum post created successfully"}),{status:201});
  } catch { return NextResponse.json({success:false,error:"Failed to create forum post"},{status:500}); }
}

export async function PATCH(request:Request) {
  if (!await requireAdmin()) return NextResponse.json({success:false,error:"Unauthorized"},{status:401});
  const id=new URL(request.url).searchParams.get("id"); if(!id||!Number.isFinite(Number(id)))return NextResponse.json({success:false,error:"Valid post id is required"},{status:400});
  const input=await request.json().catch(()=>({})) as Record<string,unknown>; const {data,errors}=forumInput(input,true); if(errors.length)return NextResponse.json({success:false,errors},{status:400});
  const fields:{key:keyof typeof data;column:string}[]=[{key:"title",column:"title"},{key:"content",column:"content"},{key:"excerpt",column:"excerpt"},{key:"author",column:"author"},{key:"category_id",column:"category_id"},{key:"icon",column:"icon"},{key:"status",column:"status"},{key:"replies",column:"replies"},{key:"views",column:"views"}];
  const selected=fields.filter(item=>item.key in input); if(!selected.length)return NextResponse.json({success:false,error:"No valid fields provided"},{status:400});
  try { const found=await prisma.$queryRawUnsafe("SELECT id FROM forum_posts WHERE id=? LIMIT 1",id) as ForumRow[]; if(!found[0])return NextResponse.json({success:false,error:"Forum post not found"},{status:404}); await prisma.$executeRawUnsafe(`UPDATE forum_posts SET ${selected.map(item=>`${item.column}=?`).join(",")}, updated_at=NOW() WHERE id=?`,...selected.map(item=>data[item.key]),id); return NextResponse.json({success:true,message:"Forum post updated successfully"}); } catch { return NextResponse.json({success:false,error:"Failed to update forum post"},{status:500}); }
}

export async function DELETE(request:Request) {
  if (!await requireAdmin()) return NextResponse.json({success:false,error:"Unauthorized"},{status:401});
  const id=new URL(request.url).searchParams.get("id"); if(!id||!Number.isFinite(Number(id)))return NextResponse.json({success:false,error:"Valid post id is required"},{status:400});
  try { const result=await prisma.$executeRawUnsafe("DELETE FROM forum_posts WHERE id=?",id); if(!result)return NextResponse.json({success:false,error:"Forum post not found"},{status:404}); return NextResponse.json({success:true,message:"Forum post deleted successfully"}); } catch { return NextResponse.json({success:false,error:"Failed to delete forum post"},{status:500}); }
}
