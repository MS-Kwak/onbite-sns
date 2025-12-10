/**
 * 📁 @file todo-detail-page.tsx
 * 🔍 @description 할 일 상세 페이지 컴포넌트
 *
 * 🆔 URL 파라미터에서 ID를 추출하여 특정 할 일의 상세 정보를 표시합니다.
 * 🔄 React Query를 사용하여 서버에서 데이터를 가져오고 캐싱합니다.
 *
 * 🗺️ 라우트: /todolist/:id
 */

import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import { useParams } from "react-router";

/**
 * 🔍 할 일 상세 페이지 컴포넌트
 *
 * 🆔 URL의 동적 파라미터(:id)를 통해 특정 할 일을 조회하고 표시합니다.
 * 📍 DETAIL 컨텍스트로 호출하여 서버에서 최신 데이터를 가져옵니다.
 *
 * 📊 상태 처리:
 * - ⏳ 로딩 중: 로딩 메시지 표시
 * - ❌ 에러/데이터 없음: 에러 메시지 표시
 * - ✅ 성공: 할 일 내용 표시
 *
 * @returns 📄 할 일 상세 페이지 JSX
 */
export default function TodoDetailPage() {
  // 🔗 URL 파라미터에서 id 추출 (예: /todolist/123 → id = "123")
  const params = useParams();
  const id = params.id;

  // 🔄 React Query를 사용하여 특정 ID의 할 일 데이터 조회
  // 📍 DETAIL 컨텍스트 - 서버에서 최신 데이터 fetch
  const { data, isLoading, error } = useTodoDataById(String(id), "DETAIL");

  // ⏳ 로딩 상태 처리
  if (isLoading) return <div>로딩 중 입니다 ...</div>;

  // ❌ 에러 또는 데이터 없음 상태 처리
  if (error || !data) return <div>오류가 발생했습니다</div>;

  // ✅ 데이터 표시
  return <div>{data.content}</div>;
}
