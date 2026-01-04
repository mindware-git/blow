import { Post } from "@/types/post";
import { users } from "./user";

export const mockPosts: Post[] = [
  {
    id: "post1",
    userId: "u_007", // emmaw
    likes: 15,
    comments: 4,
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), // 12 hours ago
    text: "This is the first mock post from our new SSR function! 🎉",
    mediaUrls: ["https://i.postimg.cc/pXW5RjV3/emmw-post1.png"],
  },
  {
    id: "post2",
    userId: "u_007", // emmaw
    likes: 32,
    comments: 8,
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    text: "My top 3 tips for staying focused while working from home: 1. Time blocking. 2. Dedicated workspace. 3. Regular breaks. What are yours? #remotework #productivity",
    mediaUrls: [
      "https://i.postimg.cc/pXW5RjV3/emmw-post1.png",
      "https://i.postimg.cc/pXW5RjV3/emmw-post1.png",
    ],
  },
  {
    id: "post3",
    userId: "u_001", // aria
    likes: 52,
    comments: 11,
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    text: "Morning coffee and sketching out some new minimalist UI components. The perfect start to a productive day. #uidesign #minimalism #coffee",
    mediaUrls: ["https://i.postimg.cc/sXScNL2w/aria.png"],
  },
  {
    id: "post4",
    userId: "u_002", // sofiar
    likes: 342,
    comments: 45,
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
    text: "Absolutely in love with this season's color palette. So many beautiful textures and tones to play with. #fashion #milanfashion #ootd",
    mediaUrls: ["https://i.postimg.cc/hzDTJpTm/sofiar.png"],
  },
  {
    id: "post5",
    userId: "u_003", // mayap
    likes: 28,
    comments: 7,
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(), // 4 days ago
    text: "Just crunched the numbers on our latest campaign. The data tells a fascinating story. Storytelling with data is a marketer's superpower. #marketing #growthhacking #data",
    mediaUrls: ["https://i.postimg.cc/cgxwKXww/mayap.png"],
  },
  {
    id: "post6",
    userId: "u_004", // lina
    likes: 510,
    comments: 68,
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    text: "Golden hour did not disappoint today. The light was just magical. #photography #goldenhour #landscape",
    mediaUrls: ["https://i.postimg.cc/6pLSbLdY/lina-post1.png"],
  },
  {
    id: "post7",
    userId: "u_005", // yukit
    likes: 180,
    comments: 23,
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(), // 6 days ago
    text: "Working on a new character concept for an upcoming indie game. I'm so excited about this project's art style! #gamedev #illustration #characterdesign",
    mediaUrls: ["https://i.postimg.cc/rsP3Sj9G/yukit-post1.png"],
  },
  {
    id: "post8",
    userId: "u_006", // amina
    likes: 22,
    comments: 5,
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
    text: "Just wrapped up a series of user interviews. It's always so insightful to hear directly from the people we're designing for. #uxresearch #humancentereddesign",
    mediaUrls: ["https://i.postimg.cc/WpD332D5/amina-post1.png"],
  },
  {
    id: "post9",
    userId: "u_008", // norab
    likes: 45,
    comments: 15,
    updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(), // 8 days ago
    text: "Exploring the intersection of generative AI and creative writing. The possibilities are both exciting and a little scary. It's a whole new frontier for storytelling. #ai #creativity #tech",
    mediaUrls: ["https://i.postimg.cc/d11S0s92/norab-post1.png"],
  },
  {
    id: "post10",
    userId: "u_009", // danielm
    likes: 35,
    comments: 9,
    updatedAt: new Date(Date.now() - 9 * 86400000).toISOString(), // 9 days ago
    text: "Just deployed a new microservice. The satisfaction of clean code and a smooth deployment is unbeatable. #backend #developer #api",
    mediaUrls: ["https://i.postimg.cc/RVT0S2v7/danielm-post1.png"],
  },
  {
    id: "post11",
    userId: "u_010", // leos
    likes: 31,
    comments: 8,
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 days ago
    text: "Shipped a small update for my side project today! It's just a tiny tool, but I love building things that people find useful. #indiehackers #buildinpublic",
    mediaUrls: ["https://i.postimg.cc/d1D0NMj9/leos-post1.png"],
  },
  {
    id: "post12",
    userId: "u_001", // aria
    likes: 65,
    comments: 18,
    updatedAt: new Date(Date.now() - 11 * 86400000).toISOString(), // 11 days ago
    text: "Finding beauty in simplicity. My design philosophy in one picture. #minimaldesign #productdesign",
    mediaUrls: ["https://i.postimg.cc/sXScNL2w/aria.png"],
  },
  {
    id: "post13",
    userId: "u_002", // sofiar
    likes: 412,
    comments: 55,
    updatedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    text: "An evening in Brera. The food here is as much a work of art as the city itself. 🍝 #milan #lifestyle #foodie",
    mediaUrls: ["https://i.postimg.cc/8zW3Yy1j/sofiar-post2.png"],
  },
  {
    id: "post14",
    userId: "u_004", // lina
    likes: 620,
    comments: 80,
    updatedAt: new Date(Date.now() - 13 * 86400000).toISOString(),
    text: "There's a certain melancholy beauty to a rainy day in the city. #streetphotography #blackandwhite #mood",
    mediaUrls: ["https://i.postimg.cc/Wb0B4Qwn/lina-post2.png"],
  },
  {
    id: "post15",
    userId: "u_007", // emmaw
    likes: 95,
    comments: 22,
    updatedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    text: "Planning my week is my Sunday ritual. Sets me up for a productive and stress-free week ahead. #productivity #planning #remotework",
    mediaUrls: ["https://i.postimg.cc/mD3mXm9g/emmaw-post2.png"],
  },
  {
    id: "post16",
    userId: "u_003", // mayap
    likes: 42,
    comments: 12,
    updatedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    text: "Love seeing these numbers go up and to the right! Our latest content strategy is paying off. #growthmarketing #startup #data",
    mediaUrls: ["https://i.postimg.cc/x8P8MBP9/mayap-post2.png"],
  },
  {
    id: "post17",
    userId: "u_005", // yukit
    likes: 210,
    comments: 34,
    updatedAt: new Date(Date.now() - 16 * 86400000).toISOString(),
    text: "Sometimes you just have to go back to basics. Pencil and paper. #sketchbook #traditionalart #illustration",
    mediaUrls: ["https://i.postimg.cc/tCNxT2xW/yukit-post2.png"],
  },
  {
    id: "post18",
    userId: "u_008", // norab
    likes: 58,
    comments: 18,
    updatedAt: new Date(Date.now() - 17 * 86400000).toISOString(),
    text: "Asked an AI to visualize 'creative thought'. The result is fascinatingly complex. #generativeart #aiart #creativity",
    mediaUrls: ["https://i.postimg.cc/j2q3N2T2/norab-post2.png"],
  },
  {
    id: "post19",
    userId: "u_001", // aria
    likes: 88,
    comments: 24,
    updatedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    text: "A clean space for a clear mind. My minimalist workspace setup. #workspace #minimalism #design",
    mediaUrls: ["https://i.postimg.cc/hG06C0yW/aria-post2.png"],
  },
  {
    id: "post20",
    userId: "u_006", // amina
    likes: 35,
    comments: 9,
    updatedAt: new Date(Date.now() - 19 * 86400000).toISOString(),
    text: "Mapping out user journeys today. The organized chaos of affinity diagramming. #uxresearch #designthinking #ux",
    mediaUrls: ["https://i.postimg.cc/WpD332D5/amina-post1.png"],
  },
  {
    id: "post21",
    userId: "u_010", // leos
    likes: 45,
    comments: 14,
    updatedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    text: "Woke up to this amazing feedback from a user. This is why I build. ❤️ #indieacker #buildinpublic #motivation",
    mediaUrls: ["https://i.postimg.cc/WpD332D5/amina-post1.png"],
  },
  {
    id: "post22",
    userId: "u_009", // danielm
    likes: 51,
    comments: 11,
    updatedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    text: "That feeling when all 348 tests pass on the first try. A good day. #coding #backend #testing",
    mediaUrls: ["https://i.postimg.cc/RVT0S2v7/danielm-post1.png"],
  },
  {
    id: "post23",
    userId: "u_004", // lina
    likes: 710,
    comments: 95,
    updatedAt: new Date(Date.now() - 22 * 86400000).toISOString(),
    text: "Found this tiny world of details on my morning walk. #macrophotography #nature #beauty",
    mediaUrls: ["https://i.postimg.cc/k4xT42S9/lina-post3.png"],
  },
  {
    id: "post24",
    userId: "u_002", // sofiar
    likes: 530,
    comments: 68,
    updatedAt: new Date(Date.now() - 23 * 86400000).toISOString(),
    text: "Today's look for Milan Fashion Week. Mixing classic and modern pieces. #mfw #ootd #fashionblogger",
    mediaUrls: [
      "https://i.postimg.cc/8zW3Yy1j/sofiar-post2.png",
      "https://i.postimg.cc/hzDTJpTm/sofiar.png",
    ],
  },
  {
    id: "post25",
    userId: "u_007", // emmaw
    likes: 110,
    comments: 28,
    updatedAt: new Date(Date.now() - 24 * 86400000).toISOString(),
    text: "Found a new favorite 'coffice' to work from today. Changing scenery can be a huge creativity booster. #digitalnomad #wfh",
    mediaUrls: ["https://i.postimg.cc/pXW5RjV3/emmw-post1.png"],
  },
  {
    id: "post26",
    userId: "u_005", // yukit
    likes: 240,
    comments: 40,
    updatedAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    text: "A little time-lapse of my latest character sketch. #digitalart #procreate #characterdesign",
    mediaUrls: ["https://i.postimg.cc/rsP3Sj9G/yukit-post1.png"],
  },
  {
    id: "post27",
    userId: "u_003", // mayap
    likes: 60,
    comments: 15,
    updatedAt: new Date(Date.now() - 26 * 86400000).toISOString(),
    text: "Had a great time sharing insights on data-driven storytelling today. Thanks for having me, @TechConference! #publicspeaking #marketing",
    mediaUrls: ["https://i.postimg.cc/x8P8MBP9/mayap-post2.png"],
  },
  {
    id: "post28",
    userId: "u_009", // danielm
    likes: 62,
    comments: 16,
    updatedAt: new Date(Date.now() - 27 * 86400000).toISOString(),
    text: "Whiteboarding the new service architecture. Simplicity is the ultimate sophistication, even in system design. #softwarearchitecture #engineering",
    mediaUrls: ["https://i.postimg.cc/RVT0S2v7/danielm-post1.png"],
  },
  {
    id: "post29",
    userId: "u_010", // leos
    likes: 55,
    comments: 20,
    updatedAt: new Date(Date.now() - 28 * 86400000).toISOString(),
    text: "Late night grind on the next feature. It's not glamorous, but it's rewarding. #solopreneur #maker",
    mediaUrls: ["https://i.postimg.cc/d1D0NMj9/leos-post1.png"],
  },
  {
    id: "post30",
    userId: "u_006", // amina
    likes: 48,
    comments: 12,
    updatedAt: new Date(Date.now() - 29 * 86400000).toISOString(),
    text: "Observing how people interact with our prototype in the wild. This is where the real insights happen. #usabilitytesting #research",
    mediaUrls: ["https://i.postimg.cc/WpD332D5/amina-post1.png"],
  },
  {
    id: "post31",
    userId: "u_008", // norab
    likes: 72,
    comments: 25,
    updatedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    text: "Diving into some classic sci-fi for inspiration on my next piece about AI ethics. #scifi #reading #ai",
    mediaUrls: ["https://i.postimg.cc/d11S0s92/norab-post1.png"],
  },
  {
    id: "post32",
    userId: "u_001", // aria
    likes: 105,
    comments: 30,
    updatedAt: new Date(Date.now() - 31 * 86400000).toISOString(),
    text: "It's all in the details. Loving the typography in the new @AwesomeApp update. #uidesign #typography #inspiration",
    mediaUrls: ["https://i.postimg.cc/hG06C0yW/aria-post2.png"],
  },
  {
    id: "post33",
    userId: "u_011", // lincoln
    likes: 1865,
    comments: 150,
    updatedAt: new Date(Date.now() - 32 * 86400000).toISOString(),
    text: "Four score and seven years ago... forever grateful for the opportunity to serve this great nation. #GettysburgAddress #history #USA",
    mediaUrls: ["https://i.postimg.cc/Bj84S8p3/lincoln-post1.png"],
  },
  {
    id: "post34",
    userId: "u_011", // lincoln
    likes: 1863,
    comments: 200,
    updatedAt: new Date(Date.now() - 33 * 86400000).toISOString(),
    text: "A new dawn for freedom. The Emancipation Proclamation is signed, paving the way for a more just society. #Emancipation #Freedom #CivilWar",
    mediaUrls: ["https://i.postimg.cc/NKyBsyDc/lincoln-post2.png"],
  },
  {
    id: "post35",
    userId: "u_012", // sejong
    likes: 1443,
    comments: 300,
    updatedAt: new Date(Date.now() - 34 * 86400000).toISOString(),
    text: "새로운 글자를 창제하니, 모든 백성이 쉽게 배우고 쓸 수 있기를. 훈민정음 반포! #한글 #세종대왕 #문화유산",
    mediaUrls: ["https://i.postimg.cc/sX4S1yY2/sejong-post1.png"],
  },
  {
    id: "post36",
    userId: "u_012", // sejong
    likes: 1450,
    comments: 180,
    updatedAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    text: "Honoring the celestial movements with new astronomical instruments. Science guides our path. #천문학 #과학 #장영실",
    mediaUrls: ["https://i.postimg.cc/B3C0K9X2/sejong-post2.png"],
  },
  {
    id: "post37",
    userId: "u_013", // guanyu
    likes: 220,
    comments: 50,
    updatedAt: new Date(Date.now() - 36 * 86400000).toISOString(),
    text: "Sworn brothers, bound by oath. Loyalty unto death. #삼국지 #의리 #형제",
    mediaUrls: ["https://i.postimg.cc/qZ8X3yY2/guanyu-post1.png"],
  },
  {
    id: "post38",
    userId: "u_013", // guanyu
    likes: 219,
    comments: 60,
    updatedAt: new Date(Date.now() - 37 * 86400000).toISOString(),
    text: "With my Green Dragon Crescent Blade, victory shall be ours! For the Han! #전투 #장군 #촉한",
    mediaUrls: ["https://i.postimg.cc/C8B0J9X2/guanyu-post2.png"],
  },
  {
    id: "post39",
    userId: "u_014", // newton
    likes: 1687,
    comments: 100,
    updatedAt: new Date(Date.now() - 38 * 86400000).toISOString(),
    text: "An apple a day keeps the questions at bay... or rather, inspires new ones about gravity. #Gravity #Physics #Discovery",
    mediaUrls: ["https://i.postimg.cc/h9M0L2X2/newton-post1.png"],
  },
  {
    id: "post40",
    userId: "u_014", // newton
    likes: 1686,
    comments: 90,
    updatedAt: new Date(Date.now() - 39 * 86400000).toISOString(),
    text: "Finished the 'Principia Mathematica'. Hoping to shed light on the natural philosophy of our universe. #Principia #Mathematics #Science",
    mediaUrls: ["https://i.postimg.cc/N6K2M9X2/newton-post2.png"],
  },
  {
    id: "post41",
    userId: "u_015", // curie
    likes: 1903,
    comments: 120,
    updatedAt: new Date(Date.now() - 40 * 86400000).toISOString(),
    text: "Working tirelessly in the lab. The mysteries of radioactivity are slowly revealing themselves. #Radioactivity #Science #Pioneering",
    mediaUrls: ["https://i.postimg.cc/L7P4Q1W2/curie-post1.png"],
  },
  {
    id: "post42",
    userId: "u_015", // curie
    likes: 1911,
    comments: 150,
    updatedAt: new Date(Date.now() - 41 * 86400000).toISOString(),
    text: "Honored with my second Nobel Prize! Dedicating this to all women in science. #NobelPrize #WomenInScience #Determination",
    mediaUrls: ["https://i.postimg.cc/J2R6S3X2/curie-post2.png"],
  },
  {
    id: "post43",
    userId: "u_016", // sunsin
    likes: 1592,
    comments: 70,
    updatedAt: new Date(Date.now() - 42 * 86400000).toISOString(),
    text: "Against all odds, the Turtle Ship prevails! For the defense of Joseon! #거북선 #이순신 #해전",
    mediaUrls: ["https://i.postimg.cc/P9T8U5W2/sunsin-post1.png"],
  },
  {
    id: "post44",
    userId: "u_016", // sunsin
    likes: 1598,
    comments: 80,
    updatedAt: new Date(Date.now() - 43 * 86400000).toISOString(),
    text: "Yet another victory at sea. We will protect our land and people. #명량 #한산도 #성웅이순신",
    mediaUrls: ["https://i.postimg.cc/V1W0X7Y2/sunsin-post2.png"],
  },
];

/**
 * Fetches mock posts for a given username.
 * This is a server-side function.
 * @param username The username to fetch posts for.
 * @returns A promise that resolves to an array of posts.
 */
export async function getPostsByUsername(username: string): Promise<Post[]> {
  const userData = users.find((u) => u.profile.username === username);
  if (userData) {
    return mockPosts.filter((p) => p.userId === userData.user.id);
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
