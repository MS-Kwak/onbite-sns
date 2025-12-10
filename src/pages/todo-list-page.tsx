/**
 * @file todo-list-page.tsx
 * @description 할 일 목록 페이지 컴포넌트
 *
 * 모든 할 일 목록을 표시하고, 새로운 할 일을 추가할 수 있는 페이지입니다.
 * React Query를 사용하여 서버에서 데이터를 가져오고 캐싱합니다.
 *
 * 라우트: /todolist
 */

import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todos-data";

/**
 * 할 일 목록 페이지 컴포넌트
 *
 * 서버에서 할 일 목록을 조회하여 표시하고,
 * 새로운 할 일을 추가할 수 있는 에디터를 제공합니다.
 *
 * 구성:
 * - TodoEditor: 새 할 일 입력 및 추가
 * - TodoItem 목록: 각 할 일 항목 표시 (완료 체크, 삭제 기능 포함)
 *
 * 상태 처리:
 * - 에러: 에러 메시지 표시
 * - 로딩 중: 로딩 메시지 표시
 * - 성공: 할 일 목록 표시
 *
 * @returns 할 일 목록 페이지 JSX
 */
export default function TodoListPage() {
  // React Query를 사용하여 전체 할 일 목록 조회
  const { data: todos, isLoading, error } = useTodosData();

  // 에러 상태 처리
  if (error) return <div>오류가 발생했습니다.</div>;

  // 로딩 상태 처리
  if (isLoading) return <div>로딩 중 입니다 ...</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold">TodoList</h1>

      {/* 새 할 일 입력 에디터 */}
      <TodoEditor />

      {/* 할 일 목록 - 각 항목을 TodoItem 컴포넌트로 렌더링 */}
      {todos?.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
}
