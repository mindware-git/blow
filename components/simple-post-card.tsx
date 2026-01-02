import Image from "next/image";
import { Post } from "@/types/post";
import Link from "next/link";

type SimplePostCardProps = {
  post: Post;
};

export function SimplePostCard({ post }: SimplePostCardProps) {
  const representativeImage = post.mediaUrls?.[0];

  return (
    <Link href={`/p/${post.id}`}>
      {representativeImage && (
        <div className="relative w-full h-[400px]">
          <Image
            src={representativeImage}
            alt={`Post by ${post.userId}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
      )}
    </Link>
  );
}
