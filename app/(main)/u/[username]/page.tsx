import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getPostsByUsername } from "@/lib/post";
import { getProfileByUsername } from "@/lib/user";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userProfile = await getProfileByUsername(username);
  const userPosts: Post[] = await getPostsByUsername(username);

  if (!userProfile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Profile not found</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <header className="flex items-center space-x-8 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userProfile.avatar} alt={userProfile.username} />
          <AvatarFallback>
            {userProfile.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <section className="space-y-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-light">{userProfile.username}</h1>
            <Button variant="outline">Follow</Button>
          </div>
          <p className="text-md">{userProfile.bio}</p>
          <div className="flex space-x-8">
            <p>
              <span className="font-semibold">{userProfile.postsCount}</span>{" "}
              posts
            </p>
            <p>
              <span className="font-semibold">
                {userProfile.followersCount}
              </span>{" "}
              followers
            </p>
            <p>
              <span className="font-semibold">
                {userProfile.followingCount}
              </span>{" "}
              following
            </p>
          </div>
        </section>
      </header>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {userPosts.map((post) => (
          <Link href={`/p/${post.id}`} key={post.id}>
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <Image
                  src={post.mediaUrls[0]}
                  alt={`Post by ${userProfile.username}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
