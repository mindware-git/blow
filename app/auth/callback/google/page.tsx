"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { googleCallbackAuthCallbackGooglePost } from "@/types";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Google 로그인 처리 중...");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setMessage(`Google 로그인 오류: ${error}`);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
        return;
      }

      if (!code) {
        setStatus("error");
        setMessage("인증 코드를 받지 못했습니다.");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
        return;
      }

      try {
        // 백엔드 API로 code 전송
        const response = await googleCallbackAuthCallbackGooglePost({
          query: {
            code,
          },
        });

        if (response.data) {
          setStatus("success");
          setMessage("Google 로그인 성공! 메인 페이지로 이동합니다...");

          // 여기서 세션 처리나 토큰 저장 로직 추가 가능
          // 예: localStorage.setItem('user', JSON.stringify(response.data.user));

          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          throw new Error("로그인 응답이 없습니다.");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        setStatus("error");
        setMessage("로그인 처리 중 오류가 발생했습니다.");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mb-4">
            {status === "loading" && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            )}
            {status === "success" && (
              <div className="text-green-600 text-4xl mb-4">✓</div>
            )}
            {status === "error" && (
              <div className="text-red-600 text-4xl mb-4">✗</div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{message}</h2>
          {status === "error" && (
            <p className="mt-2 text-sm text-gray-600">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
