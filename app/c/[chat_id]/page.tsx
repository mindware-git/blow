import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Message 데이터 타입 정의
interface Message {
  id: string;
  text: string;
  chat_id: string;
  profile_id: string;
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ chat_id: string }>;
}) {
  const session = await auth();

  // 로그인하지 않은 경우 로그인 페이지로 리디렉션
  if (!session) {
    redirect("/auth/signin");
  }

  const { chat_id } = await params;

  // REST API에서 메시지 목록 가져오기
  let messages: Message[] = [];

  try {
    const response = await fetch(
      `${process.env.RESTAPI_URL}/chats/${chat_id}/messages/`,
    );
    if (response.ok) {
      messages = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Chat: {chat_id}</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages in this chat.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="p-3 rounded-lg bg-gray-200">
              <p className="text-sm">{message.text}</p>
            </div>
          ))
        )}
      </div>
      {/* Message input area - placeholder */}
      <div className="mt-4 p-3 border-t bg-gray-50">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
