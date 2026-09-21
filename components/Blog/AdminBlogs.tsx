"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import rivotLogo from "@/asset/images/Newlogo.png";
import { BlogStatusToggle } from "./BlogStatusToggle";

type Status = "draft" | "published";
type Blog = { id:number; title:string; excerpt:string; content:string; image_url:string; author:string; status:Status; created_at?:string; updated_at?:string };
type BlogForm = Omit<Blog, "id" | "created_at" | "updated_at">;
const blank: BlogForm = { title:"", excerpt:"", content:"", image_url:"", author:"", status:"draft" };

function errorText(payload: Record<string, unknown>, fallback: string) {
  if (typeof payload.error === "string") return payload.error;
  if (Array.isArray(payload.errors)) return payload.errors.join(" ");
  return fallback;
}

export function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<BlogForm>(blank);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all"|Status>("all");
  const [notice, setNotice] = useState<{kind:"success"|"error"; text:string}|null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogs?status=all&limit=50", { cache:"no-store" });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(errorText(payload, "Unable to load blogs."));
      setBlogs(Array.isArray(payload.data) ? payload.data : []);
    } catch (error) {
      setNotice({ kind:"error", text:error instanceof Error ? error.message : "Unable to load blogs." });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);
  const field = <K extends keyof BlogForm>(key:K, value:BlogForm[K]) => setForm((old) => ({...old, [key]:value}));
  const reset = () => { setEditing(null); setForm(blank); };

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setNotice(null);
    try {
      const response = await fetch(editing ? `/api/blogs?id=${editing}` : "/api/blogs", {
        method: editing ? "PATCH" : "POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(errorText(payload, "Unable to save blog post."));
      setNotice({kind:"success", text:editing ? "Blog post updated successfully." : "Blog post created successfully."});
      reset(); await load();
    } catch (error) {
      setNotice({kind:"error", text:error instanceof Error ? error.message : "Unable to save blog post."});
    } finally { setSaving(false); }
  }

  async function remove(blog: Blog) {
    if (!window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/blogs?id=${blog.id}`, {method:"DELETE"});
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(errorText(payload, "Unable to delete blog post."));
      if (editing === blog.id) reset();
      setNotice({kind:"success", text:"Blog post deleted successfully."}); await load();
    } catch (error) { setNotice({kind:"error", text:error instanceof Error ? error.message : "Unable to delete blog post."}); }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = !search || `${blog.title} ${blog.content} ${blog.author}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === "all" || blog.status === statusFilter);
  });

  return <section className="blogAdminPage">
    <aside className="blogAdminSidebar"><div className="blogAdminMark"><Image src={rivotLogo} alt="RIVOT Motors" priority /></div><nav>
      <Link href="/admin/dashboard">Home</Link><span>Manage</span><Link href="/admin/orders">Orders</Link><Link className="active" href="/admin/blogs">Blog Management</Link><Link href="/admin/forum">Forum Management</Link><span>System</span><Link href="/admin/settings">Settings</Link><span>Authentication</span><Link href="/admin/logout">Logout</Link>
    </nav></aside>
    <main className="blogAdminMain">
      <header><div><p>RIVOT Admin</p><h1>Blog Management</h1><small>Create, publish, update, and remove website stories.</small></div><a href="#create-blog">Add New Blog Post</a></header>
      {notice && <div className={`blogNotice ${notice.kind}`}>{notice.text}</div>}
      <div className="blogAdminGrid">
        <form className="blogEditor" id="create-blog" onSubmit={save}>
          <label>Title *<input value={form.title} onChange={(e)=>field("title",e.target.value)} maxLength={255} required /></label>
          <label>Excerpt *<textarea value={form.excerpt} onChange={(e)=>field("excerpt",e.target.value)} rows={3} placeholder="Brief description of the blog post" required /></label>
          <label>Content *<textarea value={form.content} onChange={(e)=>field("content",e.target.value)} rows={14} placeholder="Write the blog post here. HTML tags are supported." required /><small>HTML tags such as &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, and &lt;li&gt; are supported.</small></label>
          <div className="blogEditorRow"><label>Image URL *<input value={form.image_url} onChange={(e)=>field("image_url",e.target.value)} maxLength={500} placeholder="/Story_page/blog-image.webp" required /></label><label>Author *<input value={form.author} onChange={(e)=>field("author",e.target.value)} maxLength={100} required /></label></div>
          <label>Status<select value={form.status} onChange={(e)=>field("status",e.target.value as Status)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <div className="blogFormActions"><button disabled={saving}>{saving ? "Saving…" : editing ? "Update Blog Post" : "Create Blog Post"}</button>{editing && <button className="secondary" type="button" onClick={reset}>Cancel edit</button>}</div>
        </form>
        <aside className="blogTips"><h2>Publishing tips</h2><ul><li>Use a clear, engaging title.</li><li>Keep the excerpt concise.</li><li>Use a high-quality image.</li><li>Save unfinished work as a draft.</li><li>Preview published posts before sharing.</li></ul></aside>
      </div>
      <section className="blogList"><div className="blogListHead"><div><p>Content library</p><h2>All Blog Posts</h2></div><strong>{filteredBlogs.length}</strong></div>
        <div className="blogFilters"><label>Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title or content..." /></label><label>Status<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value as "all"|Status)}><option value="all">All Status</option><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
        {loading ? <div className="empty">Loading blog posts…</div> : !filteredBlogs.length ? <div className="empty">No blog posts found. Adjust the filters or create a new post.</div> : <div className="blogTable"><table><thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead><tbody>{filteredBlogs.map((blog)=><tr key={blog.id}><td><div className="blogTitleCell">{blog.image_url ? <img src={blog.image_url.startsWith("/") ? blog.image_url : `/${blog.image_url}`} alt="" /> : null}<span><b>{blog.title}</b><small>{blog.excerpt}</small></span></div></td><td>{blog.author}</td><td><BlogStatusToggle id={blog.id} status={blog.status} onUpdated={status=>setBlogs(current=>current.map(item=>item.id===blog.id?{...item,status}:item))} /></td><td>{blog.created_at ? new Date(blog.created_at).toLocaleDateString("en-IN") : "—"}</td><td><div className="rowActions"><Link href={`/admin/blogs/${blog.id}/preview`}>View</Link><Link href={`/admin/blogs/${blog.id}/edit`}>Edit</Link><button className="delete" onClick={()=>void remove(blog)}>Delete</button></div></td></tr>)}</tbody></table></div>}
      </section>
    </main>
    <style>{`
      .blogAdminPage{min-height:100vh;display:grid;grid-template-columns:220px 1fr;background:#050505;color:#f7f3ee}.blogAdminSidebar{position:sticky;top:0;height:100vh;padding:16px 14px;border-right:1px solid #292929;background:#070707}.blogAdminMark{width:132px;height:42px;margin-bottom:18px}.blogAdminMark img{width:100%;height:auto}.blogAdminSidebar nav{display:grid;gap:8px}.blogAdminSidebar a,.blogAdminSidebar span{display:flex;align-items:center;min-height:36px;padding:0 12px;border-radius:5px;color:#ccc;font-size:13px;font-weight:850;text-decoration:none}.blogAdminSidebar span{min-height:26px;padding:10px 4px 0;color:#666;font-size:10px;letter-spacing:.16em;text-transform:uppercase}.blogAdminSidebar a:hover,.blogAdminSidebar a.active{background:#2d1910;color:#fff}.blogAdminMain{width:min(100%,1180px);padding:48px 28px 80px}.blogAdminMain>header{display:flex;justify-content:space-between;gap:20px;margin-bottom:24px}.blogAdminMain header p,.blogListHead p{margin:0 0 8px;color:#ef7430;font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.blogAdminMain header h1{margin:0;font-size:clamp(30px,4vw,44px);line-height:1}.blogAdminMain header small{color:#8d8d8d}.blogAdminMain>header>a{display:flex;height:38px;padding:0 18px;align-items:center;border-radius:6px;background:#ef7430;color:white;font-size:12px;font-weight:900;text-decoration:none}.blogNotice{margin-bottom:16px;padding:12px 14px;border-radius:7px;font-weight:850}.blogNotice.success{background:#153a22;color:#9ee2b7}.blogNotice.error{background:#451b18;color:#ffaaa4}.blogAdminGrid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(250px,.65fr);gap:18px;margin-bottom:20px}.blogEditor,.blogTips,.blogList{border:1px solid #303030;border-radius:10px;background:#1a1a1a}.blogEditor{display:grid;gap:16px;padding:20px}.blogEditor label{display:grid;gap:7px;font-size:12px;font-weight:900}.blogEditor :is(input,textarea,select),.blogFilters :is(input,select){width:100%;padding:11px 12px;border:1px solid #414141;border-radius:6px;background:#111;color:#fff;font:inherit;outline:none}.blogEditor textarea{resize:vertical;line-height:1.5}.blogEditor :is(input,textarea,select):focus,.blogFilters :is(input,select):focus{border-color:#ef7430}.blogEditor label>small{color:#777}.blogEditorRow{display:grid;grid-template-columns:1fr 1fr;gap:14px}.blogFormActions,.rowActions{display:flex;gap:8px}.blogFormActions button,.rowActions :is(button,a){display:flex;align-items:center;justify-content:center;border:0;border-radius:6px;background:#ef7430;color:#fff;font-size:12px;font-weight:900;text-decoration:none;cursor:pointer}.blogFormActions button{min-height:42px;padding:0 20px}.blogFormActions .secondary{border:1px solid #444;background:transparent}.blogTips{align-self:start;padding:20px}.blogTips h2{margin-top:0}.blogTips ul{padding-left:20px;color:#aaa;font-size:13px;line-height:1.8}.blogTips li::marker{color:#ef7430}.blogList{padding:20px}.blogListHead{display:flex;align-items:center;justify-content:space-between}.blogListHead h2{margin:0}.blogListHead strong{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:#382016;color:#ef7430}.blogFilters{display:grid;grid-template-columns:2fr 1fr;gap:12px;margin:18px 0;padding:16px;border:1px solid #303030;border-radius:8px;background:#121212}.blogFilters label{display:grid;gap:7px;color:#ddd;font-size:11px;font-weight:900}.blogTable{overflow-x:auto}.blogTable table{width:100%;min-width:900px;border-collapse:collapse}.blogTable th,.blogTable td{padding:13px 10px;border-bottom:1px solid #303030;color:#ccc;font-size:12px;text-align:left}.blogTable th{color:#777;font-size:10px;text-transform:uppercase}.blogTable td:first-child{max-width:340px}.blogTitleCell{display:flex;align-items:center;gap:12px}.blogTitleCell img{width:50px;height:40px;border:1px solid #333;border-radius:7px;background:#111;object-fit:cover}.blogTitleCell span{min-width:0}.blogTitleCell :is(b,small){display:block}.blogTitleCell small{margin-top:4px;overflow:hidden;color:#777;white-space:nowrap;text-overflow:ellipsis}.blogStatusToggle{padding:6px 10px;border:1px solid transparent;border-radius:999px;font-size:10px;font-weight:900;cursor:pointer}.blogStatusToggle.published{background:#183c24;color:#9ee2b7}.blogStatusToggle.draft{background:#38311b;color:#ffd682}.blogStatusToggle:disabled{opacity:.55;cursor:wait}.rowActions :is(button,a){min-height:30px;padding:0 10px;background:#333}.rowActions .delete{background:#8d2822}.empty{padding:30px;color:#888;text-align:center}
      @media(max-width:900px){.blogAdminPage{grid-template-columns:1fr}.blogAdminSidebar{position:static;height:auto}.blogAdminSidebar nav{grid-template-columns:repeat(3,1fr)}.blogAdminGrid{grid-template-columns:1fr}}@media(max-width:620px){.blogAdminMain{padding:28px 14px 60px}.blogAdminMain>header{flex-direction:column}.blogAdminSidebar nav,.blogEditorRow{grid-template-columns:1fr}.blogFormActions{flex-direction:column}}
    `}</style>
  </section>;
}
