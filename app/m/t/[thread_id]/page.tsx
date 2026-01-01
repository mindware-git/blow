"use client";

import { useParams } from "next/navigation";
import {
  dummyMessages,
  dummyProfiles,
  Message,
  Profile,
} from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function ThreadPage() {
  const params = useParams();
  const { thread_id } = params;

  const messages: Message[] = dummyMessages.filter(
    (message) => message.thread_id === thread_id,
  );

  const getProfile = (userId: string): Profile | undefined => {
    return dummyProfiles.find((profile) => profile.id === userId);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Thread: {thread_id}</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages in this thread.</p>
        ) : (
          messages.map((message) => {
            const senderProfile = getProfile(message.user_id);
            const isCurrentUser = senderProfile?.id === "1"; // Assuming current user is "1"

            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  isCurrentUser ? "justify-end" : ""
                }`}
              >
                {!isCurrentUser && (
                  <Avatar className="size-8">
                    <AvatarImage src={senderProfile?.avatar_url} />
                    <AvatarFallback>
                      {senderProfile?.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">
                    {senderProfile?.username || "Unknown User"}
                  </p>
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.image_url && (
                    <Image
                      src={message.image_url}
                      alt="message image"
                      width={200}
                      height={200}
                      className="mt-2 rounded-lg"
                    />
                  )}
                  {message.video_url && (
                    <video
                      controls
                      src={message.video_url}
                      className="mt-2 rounded-lg w-full max-h-[200px]"
                    ></video>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
                {isCurrentUser && (
                  <Avatar className="size-8">
                    <AvatarImage src={senderProfile?.avatar_url} />
                    <AvatarFallback>
                      {senderProfile?.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Message input area - placeholder */}
      <div className="mt-4 p-3 border-t bg-gray-50">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
