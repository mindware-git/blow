/**
 * 이미지 URL을 처리하는 유틸리티 함수
 * 상대 경로를 전체 URL로 변환
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_RESTAPI_URL || "http://localhost:8000";

/**
 * 이미지 URL을 전체 URL로 변환
 * @param url - 이미지 URL (상대 경로 또는 전체 URL)
 * @returns 전체 URL
 */
export function getImageUrl(url: string): string {
  if (!url) return "/placeholder.png";

  // 이미 전체 URL인 경우 그대로 반환
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // 상대 경로인 경우 API 서버 URL과 결합
  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`;
  }

  // 그 외 경우는 API 서버 URL과 결합
  return `${API_BASE_URL}/${url}`;
}
