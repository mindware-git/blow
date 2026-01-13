"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost } from "@/lib/user";

interface CreatePostFormProps {
  userEmail: string;
}

export function CreatePostForm({ userEmail }: CreatePostFormProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        // 파일들을 하나의 배열로 합치기
        const allFiles: File[] = [];

        if (images) {
          for (let i = 0; i < images.length; i++) {
            allFiles.push(images[i]);
          }
        }

        if (videos) {
          for (let i = 0; i < videos.length; i++) {
            allFiles.push(videos[i]);
          }
        }

        const result = await createPost(text, allFiles, userEmail);

        if (result.error) {
          setError(result.error);
        } else if (result.post) {
          // 성공 시 폼 상태 리셋
          setText("");
          setImages(null);
          setVideos(null);
          setError(null);
          // 홈페이지로 리디렉션
          router.push("/");
          router.refresh();
        }
      } catch (err) {
        setError("예기치 않은 오류가 발생했습니다.");
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a new post</CardTitle>
        <CardDescription>
          Fill out the form below to create a new post.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="videos">Videos</Label>
            <Input
              id="videos"
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => setVideos(e.target.files)}
              disabled={isPending}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
