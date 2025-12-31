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
    avatar: "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    location: "Paris, France",
    images: [
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    ],
    caption: "Eiffel Tower views never get old! ✨",
    likes: 1234,
    comments: 56,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: "foodie_adventures",
    avatar: "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    location: "Tokyo, Japan",
    images: [
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    ],
    caption: "Savoring every bite in Tokyo! 🍣🍜",
    likes: 987,
    comments: 32,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: "nature_lover",
    avatar: "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    location: "Banff, Canada",
    images: [
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    ],
    caption: "Lost in the beauty of the Canadian Rockies. 🌲🏔️",
    likes: 2100,
    comments: 88,
    timestamp: "1 day ago",
  },
  {
    id: "4",
    user: "urban_explorer",
    avatar: "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    location: "New York, USA",
    images: [
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
      "https://free-images.com/lg/fbc6/coffee_beans_coffee_drink.jpg",
    ],
    caption: "Concrete jungle where dreams are made of! 🗽",
    likes: 1500,
    comments: 70,
    timestamp: "2 days ago",
  },
];
