import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreatePostForm } from "@/components/create-post-form";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session?.user?.email || typeof session.user.email !== "string") {
    redirect("/auth/signin");
  }

  const userEmail = session.user.email;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <CreatePostForm userEmail={userEmail} />
    </main>
  );
}
