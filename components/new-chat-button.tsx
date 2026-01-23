"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { readProfilesProfilesGet, createChatChatsPost } from "@/types";
import { ProfilePublic } from "@/types";
import { Plus } from "lucide-react";

export function NewChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState<ProfilePublic[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = async () => {
    setIsOpen(true);
    setLoading(true);

    try {
      const response = await readProfilesProfilesGet();
      if (response.data) {
        setProfiles(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (profileId: string) => {
    try {
      const response = await createChatChatsPost({
        body: {
          profile_ids: [profileId],
        },
      });

      if (response.data) {
        router.push(`/c/${response.data.id}`);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        새로운 채팅
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">새로운 채팅 시작</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {profiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    사용자가 없습니다
                  </div>
                ) : (
                  profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => createChat(profile.id)}
                    >
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {profile.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{profile.name}</div>
                        {profile.bio && (
                          <div className="text-sm text-gray-500">
                            {profile.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
