/**
 * 📁 @file use-todo-data-by-id.ts
 * 🔍 @description 특정 할 일 데이터를 조회하는 React Query 쿼리 훅
 *
 * 🆔 ID를 기반으로 개별 할 일의 상세 정보를 가져옵니다.
 * 🗂️ 타입(LIST/DETAIL)에 따라 다른 조회 전략을 사용합니다.
 */

import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * 🔍 ID로 특정 할 일 데이터를 조회하는 쿼리 훅
 *
 * 📍 타입별 동작:
 * - "LIST": 📋 목록에서 호출 - 캐시된 데이터만 사용 (서버 요청 ❌)
 * - "DETAIL": 🔍 상세에서 호출 - 서버에서 데이터 조회 (서버 요청 ✅)
 *
 * @param id - 🆔 조회할 할 일의 고유 식별자
 * @param type - 📍 호출 타입 ("LIST" | "DETAIL")
 * @returns 🎁 useQuery 결과 객체
 *
 * @example
 * // 📋 목록에서 사용 (캐시된 데이터만)
 * const { data } = useTodoDataById("1", "LIST");
 *
 * @example
 * // 🔍 상세 페이지에서 사용 (서버 조회)
 * const { data, isLoading, error } = useTodoDataById("1", "DETAIL");
 */
export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    // 📡 API 호출 함수 - ID를 전달하여 특정 할 일 조회
    queryFn: () => fetchTodoById(id),
    // 🔑 쿼리 키 - 각 할 일별로 고유한 캐시 생성
    queryKey: QUERY_KEYS.todo.detail(id),
    // 📍 LIST 타입에서는 서버 요청 비활성화 (캐시된 데이터만 사용)
    enabled: type === "DETAIL",
  });
}
