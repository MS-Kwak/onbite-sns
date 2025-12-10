/**
 * @file use-todos-data.ts
 * @description 전체 할 일 목록을 조회하는 React Query 쿼리 훅
 *
 * 서버에서 모든 할 일 목록을 가져오고 캐싱합니다.
 */

import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * 전체 할 일 목록을 조회하는 쿼리 훅
 *
 * React Query의 useQuery를 사용하여 서버에서 할 일 목록을 가져오고,
 * 자동 캐싱 및 리페치 기능을 제공합니다.
 *
 * 기본 설정:
 * - staleTime: 0 (기본값) - 데이터를 항상 stale로 취급
 * - gcTime: 5분 (기본값) - 캐시가 비활성화된 후 5분간 유지
 *
 * @returns useQuery 결과 객체
 * @returns data - 할 일 목록 배열
 * @returns isLoading - 로딩 중 여부
 * @returns error - 에러 객체
 * @returns isError - 에러 발생 여부
 *
 * @example
 * const { data: todos, isLoading, error } = useTodosData();
 * if (isLoading) return <div>로딩 중...</div>;
 * if (error) return <div>에러 발생</div>;
 * return todos.map(todo => <TodoItem key={todo.id} {...todo} />);
 */
export function useTodosData() {
  return useQuery({
    // API 호출 함수 - 모든 할 일 목록 조회
    queryFn: fetchTodos,
    // 쿼리 키 - 할 일 목록 캐시 식별자
    queryKey: QUERY_KEYS.todo.list,
  });
}
