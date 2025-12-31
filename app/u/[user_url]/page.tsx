"use client";

import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams();
  const { user_url } = params;

  return (
    <div>
      <h1>User Profile Page</h1>
      <p>User URL: {user_url}</p>
    </div>
  );
}
