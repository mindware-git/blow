"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent } from "@/components/ui/field";

interface MessageInputProps {
  threadId: string;
}

export default function MessageInput({ threadId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setSending(true);
    try {
      const response = await fetch("https://localhost/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          threadId: threadId,
          timestamp: new Date().toISOString(),
          sender: "current_user", // 임시
        }),
      });

      console.log("메시지 전송 완료:", text);

      // 성공 후 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("API 전송 실패:", error);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-3 border-t bg-gray-50">
      <Field orientation="horizontal">
        <FieldContent className="flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={sending}
          />
        </FieldContent>
        <Button
          type="submit"
          disabled={sending || !message.trim()}
          variant="default"
          size="default"
        >
          {sending ? "전송 중..." : "전송"}
        </Button>
      </Field>
    </form>
  );
}
