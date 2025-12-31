"use client";

import { useParams } from "next/navigation";

export default function ThreadPage() {
  const params = useParams();
  const { thread_id } = params;

  return (
    <div>
      <h1>Message Thread</h1>
      <p>Thread ID: {thread_id}</p>
    </div>
  );
}
