"use client";

import { useState, useEffect } from "react";
import { getImageUrl } from "@/lib/image-url";

interface Message {
  id: string;
  text: string;
  chat_id: string;
  profile_id: string;
  media_file_ids?: string[];
  created_at?: string;
}

interface Profile {
  id: string;
  name: string;
  avatar?: string;
}

interface MediaItem {
  id: string;
  filename: string;
  thumbnail_url: string;
  original_url: string;
}

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  profile?: Profile;
}

export default function MessageItem({
  message,
  isOwn,
  profile,
}: MessageItemProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // 메시지가 변경될 때마다 이미지 로드
  useEffect(() => {
    let isMounted = true;

    const loadMessageImages = async (mediaFileIds: string[]) => {
      if (!mediaFileIds || mediaFileIds.length === 0) {
        return;
      }

      try {
        const imagePromises = mediaFileIds.map(async (mediaId) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}/media/${mediaId}`,
          );
          if (response.ok) {
            return await response.json();
          }
          return null;
        });

        const mediaResults = await Promise.all(imagePromises);
        const validMediaItems = mediaResults.filter(
          (item): item is MediaItem => item && item.thumbnail_url,
        );

        if (isMounted) {
          setMediaItems(validMediaItems);
        }
      } catch (error) {
        console.error("Error loading message images:", error);
      }
    };

    if (message.media_file_ids) {
      loadMessageImages(message.media_file_ids);
    }

    return () => {
      isMounted = false;
    };
  }, [message.media_file_ids]);

  const time = message.created_at
    ? new Date(message.created_at).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });

  const profileName = profile?.name || "Unknown User";

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs lg:max-w-md ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-lg ${
            isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {message.text && message.text !== "[Image]" && (
            <div className="text-sm break-words">{message.text}</div>
          )}

          {/* 이미지 표시 */}
          {mediaItems.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-2">
              {mediaItems.map((media) => (
                <img
                  key={media.id}
                  src={getImageUrl(media.thumbnail_url)}
                  alt={media.filename}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    window.open(getImageUrl(media.original_url), "_blank");
                  }}
                />
              ))}
            </div>
          )}

          <div
            className={`text-xs mt-1 ${
              isOwn ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
