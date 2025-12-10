/**
 * 📁 @file use-todos-data.ts
 * 📋 @description 전체 할 일 목록을 조회하는 React Query 쿼리 훅
 *
 * 🔄 서버에서 모든 할 일 목록을 가져오고 캐싱합니다.
 * 🗂️ 캐시 정규화(Normalization) 패턴을 사용하여 데이터 일관성을 유지합니다.
 */

import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 📋 전체 할 일 목록을 조회하는 쿼리 훅
 *
 * React Query의 useQuery를 사용하여 서버에서 할 일 목록을 가져오고,
 * 🗄️ 자동 캐싱 및 리페치 기능을 제공합니다.
 *
 * 🗂️ 캐시 정규화(Normalization) 패턴:
 * - 📥 서버에서 받은 각 Todo를 개별 상세 쿼리 캐시에 저장
 * - 📋 목록 쿼리는 Todo ID 배열만 반환
 * - 🔄 데이터 중복 방지 및 일관성 유지
 *
 * @returns 🎁 useQuery 결과 객체
 * @returns data - 🆔 할 일 ID 배열 (string[])
 * @returns isLoading - ⏳ 로딩 중 여부
 * @returns error - 🚨 에러 객체
 * @returns isError - ❌ 에러 발생 여부
 *
 * @example
 * const { data: todoIds, isLoading, error } = useTodosData();
 * if (isLoading) return <div>로딩 중...</div>;
 * if (error) return <div>에러 발생</div>;
 * return todoIds.map(id => <TodoItem key={id} id={id} />);
 */
export function useTodosData() {
  // 🗄️ 캐시 조작을 위한 QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  return useQuery({
    // 📡 API 호출 함수 - 모든 할 일 목록 조회 및 캐시 정규화
    queryFn: async () => {
      // 🌐 서버에서 할 일 목록 가져오기
      const todos = await fetchTodos();

      // 🗂️ 각 Todo를 개별 상세 쿼리 캐시에 저장 (정규화)
      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      // 🆔 ID 배열만 반환 (목록은 ID만 관리)
      return todos.map((todo) => todo.id);
    },
    // 🔑 쿼리 키 - 할 일 목록 캐시 식별자
    queryKey: QUERY_KEYS.todo.list,
  });
}
