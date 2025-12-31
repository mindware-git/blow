export type Post = {
  id: string;
  user: string;
  avatar: string;
  location: string;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
};

export const dummyPosts: Post[] = [
  {
    id: "1",
    user: "travel_guru",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    location: "Paris, France",
    images: [
      "https://picsum.photos/seed/paris1/800/600",
      "https://picsum.photos/seed/paris2/800/600",
      "https://picsum.photos/seed/paris3/800/600",
    ],
    caption: "Eiffel Tower views never get old! ✨",
    likes: 1234,
    comments: 56,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: "foodie_adventures",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    location: "Tokyo, Japan",
    images: [
      "https://picsum.photos/seed/sushi1/800/600",
      "https://picsum.photos/seed/ramen1/800/600",
    ],
    caption: "Savoring every bite in Tokyo! 🍣🍜",
    likes: 987,
    comments: 32,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: "nature_lover",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    location: "Banff, Canada",
    images: [
      "https://picsum.photos/seed/mountains1/800/600",
      "https://picsum.photos/seed/lake1/800/600",
      "https://picsum.photos/seed/forest1/800/600",
    ],
    caption: "Lost in the beauty of the Canadian Rockies. 🌲🏔️",
    likes: 2100,
    comments: 88,
    timestamp: "1 day ago",
  },
  {
    id: "4",
    user: "urban_explorer",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    location: "New York, USA",
    images: [
      "https://picsum.photos/seed/nyc1/800/600",
      "https://picsum.photos/seed/nyc2/800/600",
    ],
    caption: "Concrete jungle where dreams are made of! 🗽",
    likes: 1500,
    comments: 70,
    timestamp: "2 days ago",
  },
];
