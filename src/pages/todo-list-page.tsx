/**
 * 📁 @file todo-list-page.tsx
 * 📋 @description 할 일 목록 페이지 컴포넌트
 *
 * 📝 모든 할 일 목록을 표시하고, 새로운 할 일을 추가할 수 있는 페이지입니다.
 * 🔄 React Query를 사용하여 서버에서 데이터를 가져오고 캐싱합니다.
 * 🗂️ 캐시 정규화 패턴 적용 - ID 배열만 관리하고 개별 데이터는 TodoItem에서 조회
 *
 * 🗺️ 라우트: /todolist
 */

import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todos-data";

/**
 * 📋 할 일 목록 페이지 컴포넌트
 *
 * 🔄 서버에서 할 일 ID 목록을 조회하여 표시하고,
 * ➕ 새로운 할 일을 추가할 수 있는 에디터를 제공합니다.
 *
 * 🗂️ 캐시 정규화 패턴:
 * - 📋 목록 쿼리는 ID 배열만 관리
 * - 🔍 각 TodoItem이 ID를 받아 개별 캐시에서 데이터 조회
 * - 🔄 데이터 일관성 유지 및 중복 방지
 *
 * 🧩 구성:
 * - ✍️ TodoEditor: 새 할 일 입력 및 추가
 * - 📋 TodoItem 목록: ID를 전달받아 개별 데이터 조회 및 표시
 *
 * 📊 상태 처리:
 * - ❌ 에러: 에러 메시지 표시
 * - ⏳ 로딩 중: 로딩 메시지 표시
 * - ✅ 성공: 할 일 목록 표시
 *
 * @returns 📄 할 일 목록 페이지 JSX
 */
export default function TodoListPage() {
  // 🔄 React Query를 사용하여 할 일 ID 목록 조회 (정규화된 데이터)
  const { data: todoIds, isLoading, error } = useTodosData();

  // ❌ 에러 상태 처리
  if (error) return <div>오류가 발생했습니다.</div>;

  // ⏳ 로딩 상태 처리
  if (isLoading) return <div>로딩 중 입니다 ...</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* 📌 페이지 제목 */}
      <h1 className="text-2xl font-bold">TodoList</h1>

      {/* ✍️ 새 할 일 입력 에디터 */}
      <TodoEditor />

      {/* 📋 할 일 목록 - ID만 전달하여 각 TodoItem이 개별 캐시에서 데이터 조회 */}
      {todoIds?.map((id) => <TodoItem key={id} id={id} />)}
    </div>
  );
}
