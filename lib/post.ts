import { Post } from "@/types/post";

const mockPosts: Post[] = [
  {
    id: "post1",
    userId: "test-user-id",
    likes: 15,
    comments: 4,
    updatedAt: new Date().toISOString(),
    text: "This is the first mock post from our new SSR function! 🎉",
    mediaUrls: ["https://free-images.com/lg/d7e1/bailando.jpg"],
  },
  {
    id: "post2",
    userId: "test-user-id",
    likes: 32,
    comments: 8,
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    text: "Here is another post, created specifically for TestUser.",
    mediaUrls: [
      "https://free-images.com/lg/d7e1/bailando.jpg",
      "https://free-images.com/lg/d7e1/bailando.jpg",
    ],
  },
];

/**
 * Fetches mock posts for a given username.
 * This is a server-side function.
 * @param username The username to fetch posts for.
 * @returns A promise that resolves to an array of posts.
 */
export async function getPostsByUsername(username: string): Promise<Post[]> {
  // For now, we return hardcoded mock posts if the username is "TestUser".
  if (username === "TestUser") {
    return mockPosts.filter((p) => p.userId === "test-user-id");
  }

  return [];
}

/**
 * Fetches a single post by its ID.
 * This is a server-side function.
 * @param postId The ID of the post to fetch.
 * @returns A promise that resolves to the post, or null if not found.
 */
export async function getPostById(postId: string): Promise<Post | null> {
  const post = mockPosts.find((p) => p.id === postId);
  return post ?? null;
}
