/// <reference lib="dom" />
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";

// React 컴포넌트 정리
afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

// 생성된 테스트 데이터를 추적하기 위한 배열
let createdPosts: string[] = [];
let createdProfiles: string[] = [];

// Backend 서버 상태 확인
export async function isBackendServerRunning(): Promise<boolean> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_RESTAPI_URL || "http://localhost:8000";
    const response = await fetch(`${baseUrl}/docs`, {
      method: "HEAD",
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch (error) {
    // 네트워크 오류나 CORS 오류가 발생해도 서버는 실행 중일 수 있음
    // TypeError는 보통 서버가 응답했지만 CORS 등으로 차단된 경우
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (error instanceof TypeError) {
      console.log(
        "ℹ️  Server is responding (network error indicates server is running)",
      );
      return true;
    }
    console.log("❌ Server appears to be down:", errorMessage);
    return false;
  }
}

// 테스트용 프로필 생성
export async function createTestProfile(
  name: string = `testuser_${Date.now()}`,
): Promise<string | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_RESTAPI_URL || "http://localhost:8000";
    const response = await fetch(`${baseUrl}/profiles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        bio: "Test user for integration testing",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create test profile "${name}":`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: `${baseUrl}/profiles/`,
      });
      return null;
    }

    const profile = await response.json();
    createdProfiles.push(profile.id);
    console.log(`✅ Created test profile: ${profile.id} (${profile.name})`);
    return profile.id;
  } catch (error) {
    console.error(`Error creating test profile "${name}":`, error);
    return null;
  }
}

// 테스트 데이터 정리
export async function cleanupTestData(): Promise<void> {
  const baseUrl =
    process.env.NEXT_PUBLIC_RESTAPI_URL || "http://localhost:8000";

  // 생성된 게시물 삭제
  for (const postId of createdPosts) {
    try {
      await fetch(`${baseUrl}/posts/${postId}`, { method: "DELETE" });
    } catch (error) {
      console.error(`Failed to delete post ${postId}:`, error);
    }
  }

  // 생성된 프로필 삭제
  for (const profileId of createdProfiles) {
    try {
      await fetch(`${baseUrl}/profiles/${profileId}`, { method: "DELETE" });
    } catch (error) {
      console.error(`Failed to delete profile ${profileId}:`, error);
    }
  }

  // 배열 초기화
  createdPosts = [];
  createdProfiles = [];
}

// 테스트 후 데이터 정리
afterEach(async () => {
  await cleanupTestData();
});

// 생성된 게시물 ID 추적
export function trackCreatedPost(postId: string): void {
  createdPosts.push(postId);
}

// 생성된 프로필 ID 추적
export function trackCreatedProfile(profileId: string): void {
  createdProfiles.push(profileId);
}

// 실제 이미지 파일 로드
export async function loadRealImageFile(filePath: string): Promise<File> {
  try {
    // 파일 확장자에서 MIME 타입 추론
    const extension = filePath.split(".").pop()?.toLowerCase();
    let mimeType = "application/octet-stream";

    switch (extension) {
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "png":
        mimeType = "image/png";
        break;
      case "gif":
        mimeType = "image/gif";
        break;
      case "webp":
        mimeType = "image/webp";
        break;
      case "svg":
        mimeType = "image/svg+xml";
        break;
    }

    // 파일 시스템에서 직접 읽기
    const fs = await import("node:fs");
    const buffer = fs.readFileSync(filePath);
    const fileName = filePath.split("/").pop() || "unknown-file";

    return new File([buffer], fileName, { type: mimeType });
  } catch (error) {
    console.error(`Error loading image file ${filePath}:`, error);
    throw new Error(`Failed to load image file: ${filePath}`);
  }
}
