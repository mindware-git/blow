import { dummyPosts } from "@/lib/dummy-data";
import { SimplePostCard } from "@/components/simple-post-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4">
      <ul className="space-y-8">
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <SimplePostCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
