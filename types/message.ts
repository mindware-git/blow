export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderUsername: string;
  receiverId?: string; // 1:1 메시지의 경우
  threadId?: string; // 그룹/스레드 메시지의 경우
  messageType: "text" | "image" | "file" | "system";
  createdAt: string;
  updatedAt: string;
  readAt?: string; // 읽은 시간
  editedAt?: string; // 수정된 시간
  deletedAt?: string; // 삭제된 시간
}

export interface MessageThread {
  id: string;
  description?: string;
  type: "direct" | "group";
  participantIds: string[];
  lastMessageId?: string;
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isActive: boolean;
  isArchived: boolean;
}
