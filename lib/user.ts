import { ProfilePublic, PostPublic } from "@/types";

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile by ID:", error);
    return null;
  }
}

/**
 * Fetches a user profile by name from the API.
 * This is a server-side function.
 * @param name The user name to fetch the profile for.
 * @returns A promise that resolves to the user's profile.
 */
export async function getProfileByName(
  name: string,
): Promise<ProfilePublic | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/users/${name}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile by name:", error);
    return null;
  }
}

/**
 * Fetches posts by username using 2-step lookup.
 * First gets profile by name, then gets posts by profile ID.
 * @param name The username to fetch posts for.
 * @returns A promise that resolves to the user's posts.
 */
export async function getPostsByName(
  name: string,
): Promise<PostPublic[] | null> {
  try {
    // Step 1: Get profile by name to get the ID
    const profile = await getProfileByName(name);
    if (!profile) {
      return null;
    }

    // Step 2: Get posts by profile ID
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/${profile.id}/posts/`,
    );
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch posts by name:", error);
    return null;
  }
}

/**
 * Fetches all posts from the API.
 * This is a server-side function.
 * @returns A promise that resolves to all posts.
 */
export async function getAllPosts(): Promise<PostPublic[] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/posts/`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

/**
 * Creates a new post.
 * This is a client-side function.
 * @param text The text content of the post.
 * @param files The media files to attach to the post.
 * @param profile_id The ID of the profile creating the post.
 * @returns A promise that resolves to the created post or an error object.
 */
export async function createPost(
  text: string,
  files: File[],
  profile_id: string,
): Promise<{ post: PostPublic | null; error: string | null }> {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("profile_id", profile_id);
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/posts/`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        post: null,
        error: errorData.detail || "Failed to create post.",
      };
    }

    const post = await response.json();
    return { post, error: null };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { post: null, error: "An unexpected error occurred." };
  }
}
