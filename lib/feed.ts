import { Feed } from "@/types/feed";

const mockFeed: Feed[] = [
  {
    postId: "vj0_L1S_7kE",
    mediaUrl: "https://free-images.com/lg/2b9d/bird_wildlife_sky_clouds.jpg",
  },
  {
    postId: "a1b2c3d4e5F",
    mediaUrl: "https://free-images.com/lg/f1bb/hiker_camp_tent_arctic.jpg",
  },
  {
    postId: "ZxYwVuTsRqP",
    mediaUrl:
      "https://free-images.com/md/fc7f/adorable_animal_background_164489.jpg",
  },
  {
    postId: "LmNoPqRsTuV",
    mediaUrl: "https://free-images.com/md/5c4e/mont_blanc_2005_118.jpg",
  },
  {
    postId: "GhIjKlMnOpQ",
    mediaUrl: "https://free-images.com/md/3b8f/dalmatiner_schw_braun.jpg",
  },
];

/**
 * Fetches the mock feed.
 * This is a server-side function.
 * @returns A promise that resolves to an array of feed items.
 */
export async function getFeed(): Promise<Feed[]> {
  // For now, we return hardcoded mock feed.
  return mockFeed;
}
