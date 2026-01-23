"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/image-url";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { useRouter } from "next/navigation";

// Message 데이터 타입 정의
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

type ConnectionState = "connecting" | "connected" | "error" | "failed";

interface ChatRoomProps {
  chatId: string;
  currentUserId: string;
}

export default function ChatRoom({ chatId, currentUserId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("connecting");
  const [connectionError, setConnectionError] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connectWebSocket = () => {
    try {
      const wsUrl = `ws://localhost:8000/ws/${chatId}`;
      console.log("Attempting to connect to WebSocket:", wsUrl);

      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        console.log("WebSocket connected successfully");
        setConnectionState("connected");
        setConnectionError("");
        setRetryCount(0);
        setWs(websocket);
      };

      websocket.onmessage = (event) => {
        try {
          // 데이터 유효성 검사
          if (!event.data || typeof event.data !== "string") {
            console.warn("Received invalid WebSocket data:", event.data);
            return;
          }

          console.log("Received WebSocket data:", event.data);
          const message = JSON.parse(event.data);
          setMessages((prev) => {
            // 중복 메시지 확인
            const exists = prev.some((m) => m.id === message.id);
            if (exists) return prev;
            return [...prev, message];
          });
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
          console.error("Raw data received:", event.data);
        }
      };

      websocket.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
        setConnectionState("error");
        setWs(null);

        // 정상적인 종료가 아닌 경우에만 에러 상태로 변경
        if (event.code !== 1000) {
          setConnectionError(
            "채팅 서버와의 연결이 끊어졌습니다. 다시 시도 버튼을 눌러주세요.",
          );
        }
      };

      websocket.onerror = (error) => {
        // WebSocket 에러는 일반적이므로 경고 수준으로만 로깅
        console.warn("WebSocket connection warning:", error);
        // 즉시 에러 상태로 변경하지 않고 onclose 이벤트 대기
      };

      return websocket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setConnectionState("failed");
      setConnectionError(
        "채팅 서버에 연결할 수 없습니다. 서버가 실행되고 있는지 확인해주세요.",
      );
      return null;
    }
  };

  // WebSocket 연결
  useEffect(() => {
    const websocket = connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close(1000, "Component unmounted");
      }
    };
  }, [chatId]);

  // 초기 데이터 로드
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // 메시지 로드
        const messagesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}/chats/${chatId}/messages/`,
        );
        if (messagesResponse.ok && isMounted) {
          const messagesData = await messagesResponse.json();
          setMessages(messagesData);
        }

        // 프로필 로드
        const profilesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/`,
        );
        if (profilesResponse.ok && isMounted) {
          const profilesData = await profilesResponse.json();
          setProfiles(profilesData);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [chatId]);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string, files: File[]) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    try {
      // 이미지 업로드
      let mediaFileIds: string[] = [];
      if (files.length > 0) {
        mediaFileIds = await uploadImages(files);
      }

      const message = {
        profile_id: currentUserId,
        text: text || (files.length > 0 ? "[Image]" : ""),
        media_file_ids: mediaFileIds,
      };

      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("object_type", "message");
    formData.append("object_id", chatId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/upload/images/`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const uploadedMedia = await response.json();
        return uploadedMedia.map((media: { id: string }) => media.id);
      } else {
        console.error("Image upload failed:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const getProfileById = (profileId: string): Profile | undefined => {
    return profiles.find((p) => p.id === profileId);
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setConnectionState("connecting");
    setConnectionError("");
    connectWebSocket();
  };

  const handleGoBack = () => {
    router.back();
  };

  // 연결 실패 상태일 때 전체 화면 에러 표시
  if (connectionState === "failed" || connectionState === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            채팅 서버에 연결할 수 없습니다
          </h2>
          <p className="text-gray-600 mb-6">
            채팅 서버가 실행되고 있지 않거나 네트워크 연결에 문제가 있습니다.
            다시 시도 버튼을 눌러 연결을 시도해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRetry} className="w-full sm:w-auto">
              다시 시도
            </Button>
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="w-full sm:w-auto"
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 연결 상태 표시 */}
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={getImageUrl("/static/images/originals/default_avatar.png")}
                alt="Chat Partner"
              />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Chat: {chatId}</h1>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    connectionState === "connected"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <span className="text-xs text-gray-600">
                  {connectionState === "connected" ? "Online" : "Offline"}
                </span>
              </div>
              {connectionError && (
                <div className="text-xs text-red-600 mt-1">
                  {connectionError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        getProfileById={getProfileById}
        messagesEndRef={messagesEndRef}
      />

      {/* 메시지 입력 */}
      <MessageInput
        onSendMessage={sendMessage}
        disabled={connectionState !== "connected"}
        placeholder={
          connectionState === "connected"
            ? "Type a message..."
            : "Connecting..."
        }
      />
    </div>
  );
}
