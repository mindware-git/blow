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
import { PostPublic as Post } from "@/types";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <CardAction>
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {post.media_urls && (
              <CarouselItem>
                <div className="relative aspect-square">
                  <Image
                    src={post.media_urls}
                    alt={`Post image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 400px"
                  />
                </div>
              </CarouselItem>
            )}
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
      </CardFooter>
    </Card>
  );
}
