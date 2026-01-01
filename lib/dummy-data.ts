export type Posts = {
  id: string;
  user_id: string;
  likes: number;
  comments: number;
  updated_at: string; // ISO 8601 format
  text?: string;
  image_urls?: string[];
  video_urls?: string[];
};

export const dummyPosts: Posts[] = [
  {
    id: "1",
    user_id: "1",
    likes: 1234,
    comments: 56,
    updated_at: "2023-05-20T10:00:00Z",
    text: "Eiffel Tower views never get old! ✨ Paris is amazing.",
    image_urls: ["https://free-images.com/lg/d7e1/bailando.jpg"],
  },
  {
    id: "2",
    user_id: "2",
    likes: 987,
    comments: 32,
    updated_at: "2023-05-20T11:30:00Z",
    text: "Savoring every bite in Tokyo! 🍣🍜 Such a culinary adventure.",
    image_urls: ["https://free-images.com/lg/d7e1/bailando.jpg"],
  },
  {
    id: "3",
    user_id: "3",
    likes: 2100,
    comments: 88,
    updated_at: "2023-05-21T08:45:00Z",
    text: "Lost in the beauty of the Canadian Rockies. 🌲🏔️ Pure bliss!",
    video_urls: ["path/to/video1.mp4"],
  },
  {
    id: "4",
    user_id: "4",
    likes: 1500,
    comments: 70,
    updated_at: "2023-05-22T14:15:00Z",
    text: "Concrete jungle where dreams are made of! 🗽 NYC always inspiring.",
    image_urls: ["https://free-images.com/lg/d7e1/bailando.jpg"],
    video_urls: ["path/to/video2.mp4"],
  },
];

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
  created_at: string; // ISO 8601 format
};

export const dummyComments: Comment[] = [
  {
    id: "1",
    post_id: "1",
    user_id: "2",
    text: "Wow, amazing view!",
    created_at: "2023-05-20T10:05:00Z",
  },
  {
    id: "2",
    post_id: "1",
    user_id: "3",
    text: "I wish I was there!",
    created_at: "2023-05-20T10:10:00Z",
  },
  {
    id: "3",
    post_id: "2",
    user_id: "1",
    text: "Looks delicious!",
    created_at: "2023-05-20T11:35:00Z",
  },
  {
    id: "4",
    post_id: "3",
    user_id: "4",
    text: "So peaceful.",
    created_at: "2023-05-21T09:00:00Z",
  },
];

export type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  created_at: string; // ISO 8601 format
};

export const dummyProfiles: Profile[] = [
  {
    id: "1",
    username: "travel_guru",
    avatar_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-01-15T10:00:00Z",
  },
  {
    id: "2",
    username: "foodie_adventures",
    avatar_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-02-20T11:30:00Z",
  },
  {
    id: "3",
    username: "nature_lover",
    avatar_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-03-01T08:45:00Z",
  },
  {
    id: "4",
    username: "urban_explorer",
    avatar_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-04-10T14:15:00Z",
  },
];

export type Threads = {
  id: string;
  created_at: string; // ISO 8601 format
};

export const dummyThreads: Threads[] = [
  {
    id: "1",
    created_at: "2023-05-20T09:55:00Z",
  },
  {
    id: "2",
    created_at: "2023-05-20T11:25:00Z",
  },
];

export type Message = {
  id: string;
  thread_id: string;
  user_id: string;
  text?: string;
  image_url?: string;
  video_url?: string;
  created_at: string; // ISO 8601 format
};

export const dummyMessages: Message[] = [
  {
    id: "1",
    thread_id: "1",
    user_id: "1",
    text: "Eiffel Tower views never get old! ✨",
    image_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-05-20T10:00:00Z",
  },
  {
    id: "2",
    thread_id: "1",
    user_id: "2",
    text: "Wow, amazing view!",
    created_at: "2023-05-20T10:05:00Z",
  },
  {
    id: "3",
    thread_id: "1",
    user_id: "3",
    text: "I wish I was there!",
    created_at: "2023-05-20T10:10:00Z",
  },
  {
    id: "4",
    thread_id: "2",
    user_id: "2",
    text: "Savoring every bite in Tokyo! 🍣🍜",
    image_url: "https://free-images.com/lg/d7e1/bailando.jpg",
    created_at: "2023-05-20T11:30:00Z",
  },
  {
    id: "5",
    thread_id: "2",
    user_id: "1",
    text: "Looks delicious!",
    created_at: "2023-05-20T11:35:00Z",
  },
];
