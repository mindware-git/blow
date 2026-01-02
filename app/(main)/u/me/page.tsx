import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types/user";
import { Post } from "@/types/post";
import { SimplePostCard } from "@/components/simple-post-card";

export default async function MyProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const username = session.user.name;

  // API 호출로 프로필 정보 가져오기
  const profile: Profile = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/users/${username}`,
    {
      cache: "no-store", // SSR에서 항상 최신 데이터 가져오기
    },
  ).then((res) => res.json());

  // API 호출로 사용자 posts 가져오기

  console.log("Fetching username:", profile);
  console.log("Fetching posts for username:", username);

  const posts: Post[] = [];
  // try {
  //   const postsResponse = await fetch(
  //     `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/posts/${username}`,
  //     {
  //       cache: "no-store", // SSR에서 항상 최신 데이터 가져오기
  //     },
  //   );

  //   if (!postsResponse.ok) {
  //     console.error(
  //       "Posts API response not ok:",
  //       postsResponse.status,
  //       postsResponse.statusText,
  //     );
  //     throw new Error(`API call failed: ${postsResponse.status}`);
  //   }

  //   const data = await postsResponse.json();
  //   console.log("Posts API response:", data);
  //   posts = data.posts || [];
  //   console.log("Final posts array:", posts);
  // } catch (error) {
  //   console.error("Error fetching posts:", error);
  //   // 임시 테스트 데이터
  //   posts = [
  //     {
  //       id: "test_1",
  //       userId: username,
  //       likes: 10,
  //       comments: 5,
  //       updatedAt: new Date().toISOString(),
  //       text: "테스트 포스트 - API 호출 실패 시 임시 데이터",
  //       mediaUrls: ["https://free-images.com/lg/d7e1/bailando.jpg"],
  //     },
  //   ];
  // }

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <header className="flex items-center space-x-8 mb-8">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profile.avatar || session.user.image || ""}
              alt={profile.username || "User"}
            />
            <AvatarFallback>
              {(profile.username || "U").substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <section className="space-y-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-light">
                {profile.username || username}
              </h1>
            </div>
            <div className="flex space-x-8 text-sm">
              <p>
                <span className="font-semibold">{profile.postsCount || 0}</span>{" "}
                posts
              </p>
              <p>
                <span className="font-semibold">
                  {profile.followersCount || 0}
                </span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">
                  {profile.followingCount || 0}
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
              {posts.map((post) => (
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
