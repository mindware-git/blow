import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/lib/dummy-data";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";

type SimplePostCardProps = {
  post: Post;
};

export function SimplePostCard({ post }: SimplePostCardProps) {
  const representativeImage = post.images[0];

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
            {post.user.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <Link href={`/u/${post.user}`} className="hover:underline">
              <CardTitle className="text-sm">{post.user}</CardTitle>
            </Link>
            <CardDescription className="text-xs">
              {post.location}
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </CardAction>
      </CardHeader>
      <Link href={`/p/${post.id}`}>
        <CardContent className="p-0">
          <div className="relative w-full h-[400px]">
            <Image
              src={representativeImage}
              alt={`Post by ${post.user}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center space-x-4 mb-2">
          <Heart className="h-6 w-6 cursor-pointer" />
          <MessageCircle className="h-6 w-6 cursor-pointer" />
        </div>
        <p className="text-sm font-semibold">{post.likes} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{post.user}</span> {post.caption}
        </p>
        <Link
          href={`/p/${post.id}`}
          className="text-xs text-gray-500 mt-1 hover:underline"
        >
          View all {post.comments} comments
        </Link>
        <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
      </CardFooter>
    </Card>
  );
}
