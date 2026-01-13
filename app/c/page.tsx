import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

// Chat 데이터 타입 정의
interface Chat {
  id: string;
  name: string | null;
}

export default async function MessagesPage() {
  const session = await auth();

  // 로그인하지 않은 경우 로그인 페이지로 리디렉션
  if (!session) {
    redirect("/auth/signin");
  }

  // REST API에서 Chat 목록 가져오기
  let chats: Chat[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/chats/`);
    if (response.ok) {
      chats = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch chats:", error);
  }

  return (
    <div>
      <h1>All Messages</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link href={`/c/${chat.id}`}>{chat.name || "Untitled Chat"}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
