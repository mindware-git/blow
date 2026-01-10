import { ProfilePublic } from "@/types";

/**
 * Fetches a user profile by ID from the API.
 * This is a server-side function.
 * @param id The user ID to fetch the profile for.
 * @returns A promise that resolves to the user's profile.
 */
export async function getProfileById(
  id: string,
): Promise<ProfilePublic | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/profiles/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile by ID:", error);
    return null;
  }
}
