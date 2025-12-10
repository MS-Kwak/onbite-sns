/**
 * @file delete-todo.ts
 * @description 할 일을 삭제하는 API 함수
 */

import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 특정 할 일(Todo)을 서버에서 삭제합니다.
 *
 * @param id - 삭제할 할 일의 고유 식별자
 * @returns 삭제된 할 일 객체
 * @throws {Error} 삭제 요청이 실패한 경우 "Delete Todo Failed" 에러 발생
 *
 * @example
 * const deletedTodo = await deleteTodo("1");
 * // { id: "1", content: "삭제된 할 일", isDone: false }
 */
export async function deleteTodo(id: string) {
  // DELETE 요청으로 특정 할 일 삭제
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  // 응답이 정상이 아닌 경우 에러 발생
  if (!response.ok) throw new Error("Delete Todo Failed");

  // JSON 응답을 Todo 타입으로 파싱하여 반환
  const data: Todo = await response.json();
  return data;
}
