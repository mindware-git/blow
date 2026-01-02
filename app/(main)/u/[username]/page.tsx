import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/lib/dummy-data";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

type ProfilePost = {
  postId: string;
  url: string;
};

type ProfileResponse = {
  status: string;
  data: Profile & {
    bio: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
    };
    posts: ProfilePost[];
  };
};

async function getProfileData(userUrl: string): Promise<ProfileResponse> {
  // In a real app, you would use userUrl to fetch the correct user's data.
  // For this mock, we'll always return the data from profile.json.
  const filePath = path.join(process.cwd(), "lib", "profile.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function UserProfilePage({
  params,
}: {
  params: { user_url: string };
}) {
  // const profileResponse = await getProfileData(params.user_url);
  // const userProfile = profileResponse.data;

  // if (!userProfile) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center">
  //       <h1 className="text-2xl font-bold">Profile not found</h1>
  //     </main>
  //   );
  // }

  return (
    <main className="container mx-auto p-4">
      {/* <header className="flex items-center space-x-8 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} />
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
              <span className="font-semibold">{userProfile.stats.posts}</span>{" "}
              posts
            </p>
            <p>
              <span className="font-semibold">
                {userProfile.stats.followers}
              </span>{" "}
              followers
            </p>
            <p>
              <span className="font-semibold">
                {userProfile.stats.following}
              </span>{" "}
              following
            </p>
          </div>
        </section>
      </header>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {userProfile.posts.map((post) => (
          <Link href={`/p/${post.postId}`} key={post.postId}>
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={post.url}
                alt={`Post ${post.postId}`}
                fill
                style={{ objectFit: "cover" }}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div> */}
    </main>
  );
}
