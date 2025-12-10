/**
 * 📁 @file use-todo-data-by-id.ts
 * 🔍 @description 특정 할 일 데이터를 조회하는 React Query 쿼리 훅
 *
 * 🆔 ID를 기반으로 개별 할 일의 상세 정보를 서버에서 가져옵니다.
 */

import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * 🔍 ID로 특정 할 일 데이터를 조회하는 쿼리 훅
 *
 * React Query의 useQuery를 사용하여 서버에서 할 일 데이터를 가져오고,
 * 🗄️ 캐싱 및 자동 리페치 기능을 제공합니다.
 *
 * ⏱️ 캐시 설정:
 * - staleTime: 5분 (300,000ms) - 🟢 이 시간 동안 데이터를 fresh로 취급
 * - gcTime: 5초 (5,000ms) - 🗑️ 캐시가 비활성화된 후 가비지 컬렉션까지 대기 시간
 *
 * @param id - 🆔 조회할 할 일의 고유 식별자
 * @returns 🎁 useQuery 결과 객체
 * @returns data - 📋 조회된 할 일 데이터
 * @returns isLoading - ⏳ 로딩 중 여부
 * @returns error - 🚨 에러 객체
 * @returns isError - ❌ 에러 발생 여부
 *
 * @example
 * const { data, isLoading, error } = useTodoDataById("1");
 * if (isLoading) return <div>로딩 중...</div>;
 * if (error) return <div>에러 발생</div>;
 * return <div>{data.content}</div>;
 */
export function useTodoDataById(id: string) {
  return useQuery({
    // 📡 API 호출 함수 - ID를 전달하여 특정 할 일 조회
    queryFn: () => fetchTodoById(id),
    // 🔑 쿼리 키 - 각 할 일별로 고유한 캐시 생성
    queryKey: QUERY_KEYS.todo.detail(id),

    // 🟢 데이터가 fresh로 유지되는 시간 (5분)
    // ⏰ 이 시간 내에는 refetch가 발생하지 않음
    staleTime: 300000,

    // 🗑️ 캐시 가비지 컬렉션 시간 (5초)
    // ⏰ 쿼리가 비활성화된 후 이 시간이 지나면 캐시에서 제거됨
    gcTime: 5000,

    // 🔧 아래 옵션들은 필요에 따라 활성화 가능
    // refetchOnMount: false,        // 🔄 컴포넌트 마운트 시 리페치 여부
    // refetchOnWindowFocus: false,  // 🪟 윈도우 포커스 시 리페치 여부
    // refetchOnReconnect: false,    // 🌐 네트워크 재연결 시 리페치 여부
    // refetchInterval: false,       // ⏱️ 주기적 리페치 간격 (ms)
  });
}
