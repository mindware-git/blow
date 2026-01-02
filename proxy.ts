import { auth } from "@/auth";

export const config = {
  matcher: "/api/:function*",
};

export async function proxy(request: Request) {
  const session = await auth();

  if (!session) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 },
    );
  }

  // 인증된 요청은 통과
  return;
}
