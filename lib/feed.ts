import { Feed } from "@/types/feed";
import { mockPosts } from "./post";

/**
 * Fetches the mock feed by transforming data from mockPosts.
 * This is a server-side function.
 * @returns A promise that resolves to an array of feed items.
 */
export async function getFeed(): Promise<Feed[]> {
  const feed: Feed[] = mockPosts.map((post) => ({
    postId: post.id,
    mediaUrl: post.mediaUrls[0],
  }));

  return feed;
}
