/**
 * 📁 @file fetch-todos.ts
 * 📋 @description 모든 할 일 목록을 조회하는 API 함수
 */

import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 📋 서버에서 모든 할 일(Todo) 목록을 조회합니다.
 *
 * @returns 🎁 할 일 객체 배열
 * @throws {Error} ❌ 조회 요청이 실패한 경우 "Fetch Failed" 에러 발생
 *
 * @example
 * const todos = await fetchTodos();
 * // [
 * //   { id: "1", content: "장보기", isDone: false },
 * //   { id: "2", content: "운동하기", isDone: true }
 * // ]
 */
export async function fetchTodos() {
  // 📥 GET 요청으로 모든 할 일 목록 조회
  const response = await fetch(`${API_URL}/todos`);

  // ❌ 응답이 정상이 아닌 경우 에러 발생
  if (!response.ok) throw new Error("Fetch Failed");

  // 📦 JSON 응답을 Todo 배열 타입으로 파싱하여 반환
  const data: Todo[] = await response.json();
  return data;
}
