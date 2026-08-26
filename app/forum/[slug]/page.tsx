import { notFound } from "next/navigation";
import { ForumPost } from "@/components/ForumPost";
import { forumPosts, getForumPost } from "@/lib/forumPosts";

export function generateStaticParams() {
  return forumPosts.map((post) => ({ slug: post.slug }));
}

export default async function ForumPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getForumPost(slug);

  if (!post) {
    notFound();
  }

  return <ForumPost post={post} />;
}
