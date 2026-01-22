import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatRoom from "@/components/chat-room";

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
  const currentUserId = session.user?.email || "";

  return (
    <div className="flex flex-col h-screen">
      <ChatRoom chatId={chat_id} currentUserId={currentUserId} />
    </div>
  );
}
