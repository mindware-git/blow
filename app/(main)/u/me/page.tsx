import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimplePostCard } from "@/components/simple-post-card";
import { PostPublic } from "@/types";

import { getProfileById } from "@/lib/user";
import { notFound } from "next/navigation";

export default async function MyProfilePage() {
  const session = await auth();

  if (!session?.user?.name) {
    redirect("/auth/signin");
  }

  const username = session.user.name;
  const userid = session.user.email;

  console.log(`[SSR] Fetching data for user: ${username}`);
  console.log(`[SSR] Fetching data for user id: ${userid}`);

  // Fetch profile and posts using the new SSR functions
  if (!userid) {
    console.warn(`[SSR] User ID not found for user: ${username}`);
    notFound();
  }

  const profile = await getProfileById(userid);
  let posts = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/${userid}/posts/`,
    );
    if (!response.ok) {
      console.log("Failed to fetch");
    } else {
      const rawData = await response.json();
      console.log("Posts data:", JSON.stringify(rawData, null, 2));

      // API 데이터를 PostPublic 타입에 맞게 변환
      posts = rawData.map((item: PostPublic) => item);
    }
  } catch (error) {
    console.log("Error fetching profiles:", error);
  }

  // If no profile is found for the user, show a 404 page.
  if (!profile) {
    console.warn(`[SSR] Profile not found for user: ${username}`);
    if (process.env.NODE_ENV === "development") {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-600">
              Profile not found for user: {username}
            </h1>
            <p className="text-gray-600">User ID: {userid}</p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="inline-block"
            >
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                로그아웃
              </button>
            </form>
          </div>
        </main>
      );
    }
    notFound();
  }

  console.log(
    `[SSR] Loaded profile and ${posts.length} posts for ${username}.`,
  );

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <header className="flex items-center space-x-8 mb-8">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profile.avatar || session.user.image || ""}
              alt={"User"}
            />
            <AvatarFallback>{"U".substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <section className="space-y-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-light">{username}</h1>
            </div>
            <div className="flex space-x-8 text-sm">
              <p>
                <span className="font-semibold">
                  {profile.posts_count || 0}
                </span>{" "}
                posts
              </p>
              <p>
                <span className="font-semibold">
                  {profile.followers_count || 0}
                </span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">
                  {profile.following_count || 0}
                </span>{" "}
                following
              </p>
            </div>
            {profile.bio && (
              <p className="text-gray-600 max-w-md">{profile.bio}</p>
            )}
          </section>
        </header>

        {/* Posts 섹션 */}
        {posts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((post: PostPublic) => (
                <SimplePostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-8">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="inline-block"
          >
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              로그아웃
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
