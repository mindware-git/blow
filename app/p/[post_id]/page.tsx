import { PostCard } from "@/components/post-card";
import { Posts } from "@/lib/dummy-data"; // We can reuse the type
import fs from "fs";
import path from "path";

type PostDetailResponse = {
  status: string;
  data: Posts;
};

// This function simulates fetching data for a specific post.
// In a real app, it would take a postId and make an API call.
async function getPostData(): Promise<PostDetailResponse> {
  const filePath = path.join(process.cwd(), "lib", "post-detail.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function PostPage() {
  const postResponse = await getPostData();
  const post = postResponse.data;

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
