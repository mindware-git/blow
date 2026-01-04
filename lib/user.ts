import { User, Profile } from "@/types/user";

/**
 * Fetches a mock user profile from a hardcoded source.
 * This is a server-side function.
 * @param username The username to fetch the profile for.
 * @returns A promise that resolves to the user's profile.
 */
export async function getProfileByUsername(
  username: string,
): Promise<Profile | null> {
  const data = users.find((u) => u.profile.username === username);
  if (data) {
    return data.profile;
  }

  return null;
}

export const users: Array<{
  user: User;
  profile: Profile;
}> = [
  {
    user: {
      id: "u_001",
      email: "aria.kim@example.com",
      createdAt: "2025-01-02T09:12:00Z",
      updatedAt: "2025-01-10T14:30:00Z",
    },
    profile: {
      username: "aria",
      avatar: "https://i.postimg.cc/sXScNL2w/aria.png",
      bio: "Product designer who loves minimalism and coffee.",
      postsCount: 34,
      followersCount: 1200,
      followingCount: 180,
    },
  },
  {
    user: {
      id: "u_002",
      email: "sofia.rossi@example.com",
      createdAt: "2025-01-03T11:45:00Z",
      updatedAt: "2025-01-11T08:20:00Z",
    },
    profile: {
      username: "sofiar",
      avatar: "https://i.postimg.cc/hzDTJpTm/sofiar.png",
      bio: "Fashion and lifestyle creator based in Milan.",
      postsCount: 58,
      followersCount: 3420,
      followingCount: 410,
    },
  },
  {
    user: {
      id: "u_003",
      email: "maya.patel@example.com",
      createdAt: "2025-01-04T07:30:00Z",
      updatedAt: "2025-01-12T10:05:00Z",
    },
    profile: {
      username: "mayap",
      avatar: "https://i.postimg.cc/cgxwKXww/mayap.png",
      bio: "Startup marketer. Growth, data, and storytelling.",
      postsCount: 21,
      followersCount: 980,
      followingCount: 260,
    },
  },
  {
    user: {
      id: "u_004",
      email: "lina.garcia@example.com",
      createdAt: "2025-01-05T15:10:00Z",
      updatedAt: "2025-01-13T09:50:00Z",
    },
    profile: {
      username: "lina",
      avatar: "https://i.postimg.cc/3WDRBcm7/lina.png",
      bio: "Photographer capturing everyday beauty.",
      postsCount: 76,
      followersCount: 5100,
      followingCount: 600,
    },
  },
  {
    user: {
      id: "u_005",
      email: "yuki.tanaka@example.com",
      createdAt: "2025-01-06T02:40:00Z",
      updatedAt: "2025-01-14T12:15:00Z",
    },
    profile: {
      username: "yukit",
      avatar: "https://i.postimg.cc/hh7jr5Tv/yukit.png",
      bio: "Illustrator and indie game art enthusiast.",
      postsCount: 44,
      followersCount: 2300,
      followingCount: 310,
    },
  },
  {
    user: {
      id: "u_006",
      email: "amina.hassan@example.com",
      createdAt: "2025-01-07T18:05:00Z",
      updatedAt: "2025-01-15T16:00:00Z",
    },
    profile: {
      username: "amina",
      avatar: "https://i.postimg.cc/Yjm93sYw/amina.png",
      bio: "UX researcher passionate about human-centered design.",
      postsCount: 19,
      followersCount: 870,
      followingCount: 140,
    },
  },
  {
    user: {
      id: "u_007",
      email: "emma.wilson@example.com",
      createdAt: "2025-01-08T10:00:00Z",
      updatedAt: "2025-01-16T11:45:00Z",
    },
    profile: {
      username: "emmaw",
      avatar: "https://i.postimg.cc/Bt16gVH9/emmaw.png",
      bio: "Remote worker sharing productivity tips.",
      postsCount: 62,
      followersCount: 4100,
      followingCount: 520,
    },
  },
  {
    user: {
      id: "u_008",
      email: "nora.berg@example.com",
      createdAt: "2025-01-09T06:55:00Z",
      updatedAt: "2025-01-17T13:25:00Z",
    },
    profile: {
      username: "norab",
      avatar: "https://example.com/avatars/nora.jpg",
      bio: "Tech writer exploring AI and creativity.",
      postsCount: 28,
      followersCount: 1500,
      followingCount: 230,
    },
  },
  {
    user: {
      id: "u_009",
      email: "daniel.miller@example.com",
      createdAt: "2025-01-10T09:20:00Z",
      updatedAt: "2025-01-18T17:10:00Z",
    },
    profile: {
      username: "danielm",
      avatar: "https://example.com/avatars/daniel.jpg",
      bio: "Backend engineer. APIs, databases, scalability.",
      postsCount: 15,
      followersCount: 640,
      followingCount: 120,
    },
  },
  {
    user: {
      id: "u_010",
      email: "leo.santos@example.com",
      createdAt: "2025-01-11T14:35:00Z",
      updatedAt: "2025-01-19T08:40:00Z",
    },
    profile: {
      username: "leos",
      avatar: "https://example.com/avatars/leo.jpg",
      bio: "Indie maker building small but useful products.",
      postsCount: 23,
      followersCount: 910,
      followingCount: 200,
    },
  },
  {
    user: {
      id: "u_011",
      email: "abraham.lincoln@example.com",
      createdAt: "2025-01-20T10:00:00Z",
      updatedAt: "2025-01-20T10:00:00Z",
    },
    profile: {
      username: "lincoln",
      avatar: "https://i.postimg.cc/SjzsrvCh/lincoln.png",
      bio: "16th President of the United States. Preserved the Union, abolished slavery.",
      postsCount: 5,
      followersCount: 1865000,
      followingCount: 1,
    },
  },
  {
    user: {
      id: "u_012",
      email: "king.sejong@example.com",
      createdAt: "2025-01-21T10:00:00Z",
      updatedAt: "2025-01-21T10:00:00Z",
    },
    profile: {
      username: "sejong",
      avatar: "https://i.postimg.cc/3JMdrKTN/sejong.png",
      bio: "4th King of Joseon. Creator of Hangul, the Korean alphabet.",
      postsCount: 1443,
      followersCount: 10000000,
      followingCount: 25,
    },
  },
  {
    user: {
      id: "u_013",
      email: "guan.yu@example.com",
      createdAt: "2025-01-22T10:00:00Z",
      updatedAt: "2025-01-22T10:00:00Z",
    },
    profile: {
      username: "guanyu",
      avatar: "https://i.postimg.cc/L5Y3gZz7/guanyu.png",
      bio: "General serving under Liu Bei. Embodiment of loyalty and righteousness.",
      postsCount: 3,
      followersCount: 500000,
      followingCount: 2,
    },
  },
  {
    user: {
      id: "u_014",
      email: "isaac.newton@example.com",
      createdAt: "2025-01-23T10:00:00Z",
      updatedAt: "2025-01-23T10:00:00Z",
    },
    profile: {
      username: "newton",
      avatar: "https://i.postimg.cc/C1R2S1yY/newton.png",
      bio: "Physicist, mathematician, astronomer. Laid the foundations for classical mechanics.",
      postsCount: 3,
      followersCount: 1687000,
      followingCount: 0,
    },
  },
  {
    user: {
      id: "u_015",
      email: "marie.curie@example.com",
      createdAt: "2025-01-24T10:00:00Z",
      updatedAt: "2025-01-24T10:00:00Z",
    },
    profile: {
      username: "curie",
      avatar: "https://i.postimg.cc/J0b6D3gM/curie.png",
      bio: "Physicist and chemist who conducted pioneering research on radioactivity.",
      postsCount: 2,
      followersCount: 1900000,
      followingCount: 1,
    },
  },
  {
    user: {
      id: "u_016",
      email: "yi.sunsin@example.com",
      createdAt: "2025-01-25T10:00:00Z",
      updatedAt: "2025-01-25T10:00:00Z",
    },
    profile: {
      username: "sunsin",
      avatar: "https://i.postimg.cc/vB7gXzY9/sunsin.png",
      bio: "Korean admiral and military general famed for his victories against the Japanese navy.",
      postsCount: 23,
      followersCount: 1200000,
      followingCount: 0,
    },
  },
];
