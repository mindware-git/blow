"use client";

import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const { post_id } = params;

  return (
    <div>
      <h1>Post Page</h1>
      <p>Post ID: {post_id}</p>
    </div>
  );
}
