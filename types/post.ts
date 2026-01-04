export interface Post {
  id: string;
  userId: string;
  likes: number;
  comments: number;
  updatedAt: string; // ISO 8601 format
  text?: string;
  mediaUrls: string[]; // Changed from optional to required
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorUsername: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string; // 대댓글을 위한 부모 댓글 ID
}
