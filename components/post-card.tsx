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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Posts } from "@/lib/dummy-data";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

type PostCardProps = {
  post: Posts;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {/* Removed Avatar component */}
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
            {post.userId.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <CardTitle className="text-sm">{post.userId}</CardTitle>
          </div>
        </div>
        <CardAction>
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {post.imageUrls?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={image}
                    alt={`Post by ${post.userId} - Image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center space-x-4 mb-2">
          <Heart className="h-6 w-6 cursor-pointer" />
          <MessageCircle className="h-6 w-6 cursor-pointer" />
        </div>
        <p className="text-sm font-semibold">{post.likes} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{post.userId}</span> {post.text}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          View all {post.comments} comments
        </p>
        <p className="text-xs text-gray-500 mt-1">{post.updatedAt}</p>
      </CardFooter>
    </Card>
  );
}
