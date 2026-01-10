import Image from "next/image";
import { PostPublic as Post } from "@/types";
import Link from "next/link";

type SimplePostCardProps = {
  post: Post;
};

export function SimplePostCard({ post }: SimplePostCardProps) {
  const representativeImage = post.media_urls;

  return (
    <Link href={`/p/${post.id}`}>
      {representativeImage && (
        <div className="relative w-full h-[400px]">
          <Image
            src={representativeImage}
            alt={`Post by ${post.profile_id}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
      )}
    </Link>
  );
}
