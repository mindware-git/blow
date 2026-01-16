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
  const [publicMedia, setPublicMedia] = useState<FileList | null>(null);
  const [privateMedia, setPrivateMedia] = useState<FileList | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | object | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Public 미디어 파일 확인 (필수)
    const hasPublicMedia = publicMedia && publicMedia.length > 0;

    if (!hasPublicMedia) {
      setError(
        "최소 1개의 Public 미디어(이미지 또는 영상)를 업로드해야 합니다.",
      );
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        // 파일들을 하나의 배열로 합치기
        const allFiles: File[] = [];

        // Public 미디어 추가 (첫 번째 파일만 사용)
        if (publicMedia && publicMedia.length > 0) {
          allFiles.push(publicMedia[0]);
        }

        // Private 미디어 추가 (선택사항)
        if (privateMedia) {
          for (let i = 0; i < privateMedia.length; i++) {
            allFiles.push(privateMedia[i]);
          }
        }

        const result = await createPost(text, allFiles, userEmail);

        if (result.error) {
          setError(result.error);
        } else if (result.post) {
          // 성공 시 폼 상태 리셋
          setText("");
          setPublicMedia(null);
          setPrivateMedia(null);
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
            <Label htmlFor="text">Text (optional)</Label>
            <Input
              id="text"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="public">Public *</Label>
            <Input
              id="public"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setPublicMedia(e.target.files)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="private">Private (optional)</Label>
            <Input
              id="private"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setPrivateMedia(e.target.files)}
              disabled={isPending}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {typeof error === "string"
                ? error
                : error && typeof error === "object" && "detail" in error
                  ? String(error.detail)
                  : error && typeof error === "object" && "message" in error
                    ? String(error.message)
                    : "An error occurred"}
            </div>
          )}
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
