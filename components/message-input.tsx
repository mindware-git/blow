"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImagePreview from "./image-preview";

interface MessageInputProps {
  onSendMessage: (text: string, files: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = message.trim();
    const hasContent = text || selectedImages.length > 0;

    if (!hasContent || disabled) {
      return;
    }

    onSendMessage(text, selectedImages);
    setMessage("");
    setSelectedImages([]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <div className="border-t bg-gray-50 p-4">
      {/* 이미지 미리보기 */}
      {selectedImages.length > 0 && (
        <ImagePreview
          images={selectedImages}
          onRemoveImage={removeImage}
          className="mb-3"
        />
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
          disabled={disabled}
        />

        <Button
          type="button"
          onClick={handleImageClick}
          disabled={disabled}
          variant="outline"
          size="icon"
          className="shrink-0"
        >
          📷
        </Button>

        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
        />

        <Button
          type="submit"
          disabled={
            disabled || (!message.trim() && selectedImages.length === 0)
          }
        >
          Send
        </Button>
      </form>
    </div>
  );
}
