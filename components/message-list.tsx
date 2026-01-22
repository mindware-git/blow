"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/image-url";
import MessageItem from "./message-item";

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

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  getProfileById: (profileId: string) => Profile | undefined;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function MessageList({
  messages,
  currentUserId,
  getProfileById,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No messages in this chat yet.
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isOwn={message.profile_id === currentUserId}
            profile={getProfileById(message.profile_id)}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
