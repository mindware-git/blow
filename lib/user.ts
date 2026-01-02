import { Profile } from "@/types/user";

/**
 * Fetches a mock user profile from a hardcoded source.
 * This is a server-side function.
 * @param username The username to fetch the profile for.
 * @returns A promise that resolves to the user's profile.
 */
export async function getProfileByUsername(
  username: string,
): Promise<Profile | null> {
  // In a real application, this would fetch from a database or an API.
  // For now, we return a hardcoded mock profile for "TestUser".
  if (username === "TestUser") {
    const mockProfile: Profile = {
      username: "TestUser",
      avatar: "https://free-images.com/lg/d7e1/bailando.jpg", // Placeholder avatar
      bio: "This is a mock bio for TestUser. I love building cool stuff with Next.js!",
      postsCount: 5, // Example value
      followersCount: 150, // Example value
      followingCount: 75, // Example value
    };
    return mockProfile;
  }

  return null;
}
