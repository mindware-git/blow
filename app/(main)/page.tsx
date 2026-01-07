import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { getFeed } from "@/lib/feed";

export default async function Home() {
  const session = await auth();
  const feedItems = await getFeed();

  // 사용자 이름 결정
  const getGreeting = () => {
    if (session?.user?.name) {
      return `${session.user.name}'s Feed`;
    }
    return "Your Feed";
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">{getGreeting()}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {feedItems.map((item) => (
          <Link href={`/p/${item.postId}`} key={item.postId}>
            <div className="relative w-full h-96 overflow-hidden rounded-lg">
              <Image
                src={item.mediaUrl}
                alt={`Post ${item.postId}`}
                fill
                style={{ objectFit: "cover" }}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))} */}
      </div>
    </div>
  );
}
