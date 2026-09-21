"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Blog = { id:number; title:string; excerpt:string; content:string; image_url:string; author:string; status:"draft"|"published"; created_at?:string; updated_at?:string };

function formatDate(value?: string) {
  if (!value) return "Not available";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString("en-IN", {dateStyle:"medium", timeStyle:"short"});
}

export function EditBlog({ id }: { id:string }) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog|null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {cache:"no-store"}).then(async response => {
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error || "Blog post not found.");
      if (active) setBlog(payload.data);
    }).catch(reason => active && setError(reason instanceof Error ? reason.message : "Unable to load blog post."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  function update<K extends keyof Blog>(key:K, value:Blog[K]) { setBlog(current => current ? {...current,[key]:value} : current); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!blog) return; setSaving(true); setError("");
    try {
      const response = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:blog.title,excerpt:blog.excerpt,content:blog.content,image_url:blog.image_url,author:blog.author,status:blog.status})});
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error || (Array.isArray(payload.errors) ? payload.errors.join(" ") : "Unable to update blog post."));
      router.push("/admin/blogs?message=updated"); router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update blog post."); setSaving(false); }
  }

  if (loading) return <main className="editBlogState">Loading blog post...</main>;
  if (!blog) return <main className="editBlogState"><p>{error || "Blog post not found."}</p><Link href="/admin/blogs">Back to Blog Management</Link></main>;

  return <main className="editBlogPage">
    <header><div><p>RIVOT Admin</p><h1>Edit Blog Post</h1></div><div><Link className="preview" href={`/admin/blogs/${blog.id}/preview`}>Preview</Link><Link href="/admin/blogs">Back</Link></div></header>
    {error && <div className="editBlogError">{error}</div>}
    <div className="editBlogGrid"><form onSubmit={submit}>
      <label>Title *<input value={blog.title} onChange={e=>update("title",e.target.value)} maxLength={255} required /></label>
      <label>Excerpt *<textarea value={blog.excerpt} onChange={e=>update("excerpt",e.target.value)} rows={3} placeholder="Brief description of the blog post" required /></label>
      <label>Content *<textarea value={blog.content} onChange={e=>update("content",e.target.value)} rows={15} placeholder="Write your blog post content here. You can use HTML tags for formatting." required /><small>You can use HTML tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, and &lt;li&gt;.</small></label>
      <div className="editBlogRow"><label>Image URL *<input value={blog.image_url} onChange={e=>update("image_url",e.target.value)} maxLength={500} placeholder="/Story_page/blog-image.webp" required /><small>Relative path to the image file</small></label><label>Author *<input value={blog.author} onChange={e=>update("author",e.target.value)} maxLength={100} required /></label></div>
      <label>Status<select value={blog.status} onChange={e=>update("status",e.target.value as Blog["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label>
      <div className="editBlogActions"><button disabled={saving}>{saving ? "Updating..." : "Update Blog Post"}</button><Link href="/admin/blogs">Cancel</Link></div>
    </form><aside><section><h2>Blog Info</h2><p><b>Created:</b> {formatDate(blog.created_at)}</p><p><b>Last Updated:</b> {formatDate(blog.updated_at)}</p><p><b>Current Status:</b> <i className={blog.status}>{blog.status}</i></p></section><section><h2>Tips</h2><ul><li>Use clear, engaging titles</li><li>Write compelling excerpts</li><li>Use HTML for better formatting</li><li>Choose high-quality images</li><li>Preview before publishing</li></ul></section></aside></div>
    <style>{`
      .editBlogPage,.editBlogState{min-height:100vh;padding:48px max(20px,calc((100vw - 1120px)/2));background:#050505;color:#fff}.editBlogState{display:grid;place-content:center;gap:15px;text-align:center}.editBlogState a{color:#ef7430}.editBlogPage>header{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px}.editBlogPage header p{margin:0 0 7px;color:#ef7430;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.editBlogPage h1{margin:0;font-size:clamp(30px,4vw,44px)}.editBlogPage header>div:last-child,.editBlogActions{display:flex;gap:9px}.editBlogPage header a,.editBlogActions :is(a,button){display:flex;min-height:40px;padding:0 17px;align-items:center;justify-content:center;border:1px solid #444;border-radius:6px;background:transparent;color:#ddd;font-size:12px;font-weight:900;text-decoration:none}.editBlogPage header a.preview,.editBlogActions button{border-color:#ef7430;background:#ef7430;color:#fff;cursor:pointer}.editBlogError{margin-bottom:16px;padding:12px;border-radius:7px;background:#451b18;color:#ffaaa4}.editBlogGrid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(250px,.65fr);gap:18px}.editBlogGrid form,.editBlogGrid aside section{border:1px solid #303030;border-radius:10px;background:#1a1a1a}.editBlogGrid form{display:grid;gap:17px;padding:22px}.editBlogGrid label{display:grid;gap:7px;font-size:12px;font-weight:900}.editBlogGrid :is(input,textarea,select){width:100%;padding:11px 12px;border:1px solid #414141;border-radius:6px;background:#101010;color:#fff;font:inherit;outline:none}.editBlogGrid textarea{resize:vertical;line-height:1.5}.editBlogGrid :is(input,textarea,select):focus{border-color:#ef7430}.editBlogGrid label small{color:#777;font-weight:600}.editBlogRow{display:grid;grid-template-columns:1fr 1fr;gap:14px}.editBlogGrid aside{display:grid;align-self:start;gap:16px}.editBlogGrid aside section{padding:20px}.editBlogGrid aside h2{margin:0 0 16px;font-size:17px}.editBlogGrid aside p,.editBlogGrid aside li{color:#aaa;font-size:12px;line-height:1.7}.editBlogGrid aside b{color:#eee}.editBlogGrid aside i{padding:5px 9px;border-radius:999px;font-style:normal;text-transform:capitalize}.editBlogGrid aside i.published{background:#183c24;color:#9ee2b7}.editBlogGrid aside i.draft{background:#38311b;color:#ffd682}.editBlogGrid aside ul{margin:0;padding-left:20px}.editBlogGrid aside li::marker{color:#ef7430}@media(max-width:800px){.editBlogGrid{grid-template-columns:1fr}}@media(max-width:600px){.editBlogPage{padding:28px 14px 60px}.editBlogPage>header{align-items:flex-start;flex-direction:column}.editBlogRow{grid-template-columns:1fr}.editBlogActions{flex-direction:column}}
    `}</style>
  </main>;
}
