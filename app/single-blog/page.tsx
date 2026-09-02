"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BlogArticle } from "@/components/BlogArticle";

type ApiBlog = {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string | null;
};

function imageSrc(value: string) {
  if (!value) {
    return "/Story_page/23.webp";
  }

  return value.startsWith("/") || value.startsWith("http") ? value : `/${value}`;
}

function BlogStatus({ children }: { children: string }) {
  return (
    <main className="rivotSingleBlogStatus">
      <p>{children}</p>
      <style>{`
        .rivotSingleBlogStatus {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: #f7f4f0;
          color: #111;
          font-size: 18px;
          font-weight: 800;
        }
      `}</style>
    </main>
  );
}

function SingleBlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";
  const [post, setPost] = useState<ApiBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch(`/api/blogs?id=${encodeURIComponent(id)}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (mounted) {
          setPost(payload.success ? payload.data : null);
        }
      })
      .catch(() => {
        if (mounted) {
          setPost(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <BlogStatus>Loading blog...</BlogStatus>;
  }

  if (!post) {
    return <BlogStatus>Blog not found.</BlogStatus>;
  }

  return (
    <BlogArticle
      post={{
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        date: post.created_at,
        image: imageSrc(post.image_url),
        contentHtml: post.content,
      }}
    />
  );
}

export default function SingleBlogPage() {
  return (
    <Suspense fallback={<BlogStatus>Loading blog...</BlogStatus>}>
      <SingleBlogContent />
    </Suspense>
  );
}
