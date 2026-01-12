import { auth } from "@/auth";
import { getAllPosts } from "@/lib/user";
import { SimplePostCard } from "@/components/simple-post-card";

export default async function Home() {
  const session = await auth();
  const posts = await getAllPosts();

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

      {!posts ? (
        <div className="text-center text-gray-500">Failed to load posts</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts yet</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <SimplePostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
