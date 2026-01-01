"use client";

import { useParams } from "next/navigation";
import { dummyPosts, Posts } from "@/lib/dummy-data";
import { PostCard } from "@/components/post-card";

export default function PostPage() {
  const params = useParams();
  const { post_id } = params;

  const post: Posts | undefined = dummyPosts.find((p) => p.id === post_id);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <PostCard post={post} />
    </main>
  );
}
