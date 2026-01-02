"use client";

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

export default function CreatePostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
          <CardDescription>
            Fill out the form below to create a new post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input id="text" placeholder="What's on your mind?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="public">Public</Label>
              <Input id="public" type="file" multiple />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" type="file" multiple />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videos">Videos</Label>
              <Input id="videos" type="file" multiple />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Create Post</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
