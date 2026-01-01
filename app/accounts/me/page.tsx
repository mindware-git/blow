"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dummyPosts, dummyProfiles, Posts, Profile } from "@/lib/dummy-data";
import { SimplePostCard } from "@/components/simple-post-card";

export default function MyProfilePage() {
  const currentUserId = "1"; // Assuming the logged in user has id "1"
  const userProfile: Profile | undefined = dummyProfiles.find(
    (p) => p.id === currentUserId,
  );
  const userPosts: Posts[] = dummyPosts.filter(
    (p) => p.user_id === currentUserId,
  );

  if (!userProfile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Profile not found</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <header className="flex items-center space-x-8 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={userProfile.avatar_url}
            alt={userProfile.username}
          />
          <AvatarFallback>
            {userProfile.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <section className="space-y-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-light">{userProfile.username}</h1>
            <Button variant="outline">Edit Profile</Button>
          </div>
          <div className="flex space-x-8">
            <p>
              <span className="font-semibold">{userPosts.length}</span> posts
            </p>
            {/* These are placeholders, as we don't have this data yet */}
            <p>
              <span className="font-semibold">1,234</span> followers
            </p>
            <p>
              <span className="font-semibold">567</span> following
            </p>
          </div>
        </section>
      </header>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {userPosts.map((post) => (
          <SimplePostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
