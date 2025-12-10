/**
 * @file update-todo.ts
 * @description 할 일을 수정하는 API 함수
 */

import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 특정 할 일(Todo)의 정보를 수정합니다.
 *
 * PATCH 메서드를 사용하여 부분 업데이트를 수행합니다.
 * id는 필수이며, 나머지 필드는 선택적으로 전달할 수 있습니다.
 *
 * @param todo - 수정할 할 일 정보 (id 필수, 나머지 필드 선택)
 * @param todo.id - 수정할 할 일의 고유 식별자 (필수)
 * @param todo.content - 수정할 내용 (선택)
 * @param todo.isDone - 수정할 완료 상태 (선택)
 * @returns 수정된 할 일 객체
 * @throws {Error} 수정 요청이 실패한 경우 "Update Todo Failed" 에러 발생
 *
 * @example
 * // 완료 상태만 변경
 * const updatedTodo = await updateTodo({ id: "1", isDone: true });
 *
 * @example
 * // 내용과 완료 상태 모두 변경
 * const updatedTodo = await updateTodo({
 *   id: "1",
 *   content: "수정된 내용",
 *   isDone: true
 * });
 */
export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  // PATCH 요청으로 부분 업데이트 수행
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  // 응답이 정상이 아닌 경우 에러 발생
  if (!response.ok) throw new Error("Update Todo Failed");

  // JSON 응답을 Todo 타입으로 파싱하여 반환
  const data: Todo = await response.json();
  return data;
}
