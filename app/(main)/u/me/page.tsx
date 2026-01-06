import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimplePostCard } from "@/components/simple-post-card";
import { getProfileById } from "@/lib/user";
import { getPostsByUsername } from "@/lib/post";
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
  const posts = await getPostsByUsername(username);

  // If no profile is found for the user, show a 404 page.
  if (!profile) {
    console.warn(`[SSR] Profile not found for user: ${username}`);
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
