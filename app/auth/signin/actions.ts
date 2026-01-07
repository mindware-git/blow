"use server";

import { signIn } from "@/auth";

export async function devLogin(email: string) {
  await signIn("credentials", {
    email,
    password: "dummy-password", // 실제 구현에서는 더 안전한 방법을 사용해야 합니다
    redirectTo: "/",
  });
}
