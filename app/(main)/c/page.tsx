import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { NewChatButton } from "@/components/new-chat-button";

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/chats/`,
    );
    if (response.ok) {
      chats = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch chats:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">모든 메시지</h1>
        <NewChatButton />
      </div>

      {chats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">아직 채팅이 없습니다</p>
          <p className="text-sm text-gray-400">새로운 채팅을 시작해보세요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/c/${chat.id}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="font-medium">{chat.name || "이름 없는 채팅"}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
