import Image from "next/image";

// API에서 반환되는 실제 데이터 구조에 맞는 타입 정의
interface ApiPost {
  id: string;
  text?: string;
  media_urls: string;
  profile_id: string;
}

// API에서 반환되는 프로필 데이터 구조에 맞는 타입 정의
interface ApiProfile {
  name: string;
  avatar?: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;

  // REST API에서 게시물 데이터 가져오기
  let post: ApiPost | null = null;
  try {
    const response = await fetch(
      `${process.env.RESTAPI_URL}/posts/${post_id}/`,
    );
    if (response.ok) {
      post = await response.json();
      console.log("Post data:", JSON.stringify(post, null, 2));
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* 이미지 표시 */}
        <div className="relative w-full h-96">
          <Image
            src={post.media_urls || "/placeholder.png"}
            alt="Post image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* 게시물 정보 표시 */}
        <div className="p-6">
          {/* 게시물 텍스트 */}
          {post.text && <p className="text-gray-700 mb-4">{post.text}</p>}

          {/* 게시물 ID */}
          <p className="text-xs text-gray-500">Post ID: {post.id}</p>
        </div>
      </div>
    </main>
  );
}
