import { ForumPost } from "@/components/ForumPost";
import { forumPosts, getForumPost } from "@/lib/forumPosts";

export default async function OldForumPostPage({
  searchParams,
}: {
  searchParams?: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const post = getForumPost(params?.id || "1") || forumPosts[0];

  return <ForumPost post={post} />;
}
