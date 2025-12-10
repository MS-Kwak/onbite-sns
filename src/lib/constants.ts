/**
 * 📁 @file constants.ts
 * 🔧 @description 애플리케이션 전역에서 사용되는 상수 정의
 */

/**
 * 🌐 API 서버의 기본 URL
 * JSON Server가 실행되는 로컬 서버 주소
 */
export const API_URL = "http://localhost:3000";

/**
 * 🔑 React Query의 쿼리 키 상수 객체
 *
 * 쿼리 키를 중앙에서 관리하여 일관성을 유지하고,
 * 🔄 캐시 무효화 및 업데이트 시 사용합니다.
 *
 * 📂 구조:
 * - 📦 todo.all: 모든 할 일 관련 쿼리의 상위 키 (일괄 무효화용)
 * - 📋 todo.list: 할 일 목록 쿼리 키
 * - 🔍 todo.detail(id): 특정 할 일 상세 쿼리 키 (동적 생성)
 *
 * @example
 * // 📋 목록 조회
 * useQuery({ queryKey: QUERY_KEYS.todo.list, ... });
 *
 * // 🔍 상세 조회
 * useQuery({ queryKey: QUERY_KEYS.todo.detail("1"), ... });
 *
 * // 🗑️ 모든 할 일 관련 캐시 무효화
 * queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.all });
 */
export const QUERY_KEYS = {
  todo: {
    // 📦 모든 할 일 관련 쿼리의 상위 키
    all: ["todo"],
    // 📋 할 일 목록 쿼리 키
    list: ["todo", "list"],
    // 🔍 특정 할 일 상세 쿼리 키 생성 함수
    detail: (id: string) => ["todo", "detail", id],
  },
};
