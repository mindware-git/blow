"use client";

import { Button } from "@/components/ui/button";
import { devLogin } from "@/app/auth/signin/actions";

interface Profile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
}

export function DevLoginButtons({ profiles }: { profiles: Profile[] }) {
  const handleLogin = async (email: string) => {
    await devLogin(email);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Development Login</h2>
      <div className="grid gap-2">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            onClick={() => handleLogin(profile.id)}
            className="w-full justify-start"
            variant="outline"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <span>{profile.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
