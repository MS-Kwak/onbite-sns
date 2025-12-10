/**
 * @file create-todo.ts
 * @description 새로운 할 일을 생성하는 API 함수
 */

import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 새로운 할 일(Todo)을 서버에 생성합니다.
 *
 * @param content - 생성할 할 일의 내용
 * @returns 생성된 할 일 객체 (서버에서 생성된 id 포함)
 * @throws {Error} 생성 요청이 실패한 경우 "Create Todo Failed" 에러 발생
 *
 * @example
 * const newTodo = await createTodo("장보기");
 * // { id: "1", content: "장보기", isDone: false }
 */
export async function createTodo(content: string) {
  // POST 요청으로 새 할 일 생성
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      content, // 할 일 내용
      isDone: false, // 새로 생성된 할 일은 기본적으로 미완료 상태
    }),
  });

  // 응답이 정상이 아닌 경우 에러 발생
  if (!response.ok) throw new Error("Create Todo Failed");

  // JSON 응답을 Todo 타입으로 파싱하여 반환
  const data: Todo = await response.json();
  return data;
}
