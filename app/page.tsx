import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

type FeedItem = {
  postId: string;
  url: string;
};

type FeedData = {
  status: string;
  data: {
    nextPageToken: string;
    items: FeedItem[];
  };
};

async function getFeedData(): Promise<FeedData> {
  const filePath = path.join(process.cwd(), "lib", "feed.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function Home() {
  const feedData = await getFeedData();
  const { items } = feedData.data;

  return (
    <div className="w-screen -ml-64 pl-64">
      <h1 className="text-3xl font-bold my-4">Your Feed</h1>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <Link href={`/p/${item.postId}`} key={item.postId}>
            <div className="relative w-full h-96 overflow-hidden">
              <Image
                src={item.url}
                alt={`Post ${item.postId}`}
                fill
                style={{ objectFit: "cover" }}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
