import { PostCard } from "@/components/post-card";
import { getPostById } from "@/lib/post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;
  const post = await getPostById(post_id);

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
