/**
 * 📁 @file fetch-todo-by-id.ts
 * 🔍 @description 특정 할 일을 조회하는 API 함수
 */

import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 🔍 ID로 특정 할 일(Todo)을 서버에서 조회합니다.
 *
 * @param id - 🆔 조회할 할 일의 고유 식별자
 * @returns 🎁 조회된 할 일 객체
 * @throws {Error} ❌ 조회 요청이 실패한 경우 "Fetch Failed" 에러 발생
 *
 * @example
 * const todo = await fetchTodoById("1");
 * // { id: "1", content: "장보기", isDone: false }
 */
export async function fetchTodoById(id: string) {
  // 📥 GET 요청으로 특정 ID의 할 일 조회
  const response = await fetch(`${API_URL}/todos/${id}`);

  // ❌ 응답이 정상이 아닌 경우 에러 발생
  if (!response.ok) throw new Error("Fetch Failed");

  // 📦 JSON 응답을 Todo 타입으로 파싱하여 반환
  const data: Todo = await response.json();
  return data;
}
