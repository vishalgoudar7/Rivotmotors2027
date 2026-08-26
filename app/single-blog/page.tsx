import { BlogArticle } from "@/components/BlogArticle";
import { blogPosts, getBlogPost } from "@/lib/blogPosts";

export default async function SingleBlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const post = getBlogPost(params?.id || "1") || blogPosts[0];

  return <BlogArticle post={post} />;
}
