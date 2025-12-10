/**
 * 📁 @file use-update-todo-mutation.ts
 * ✏️ @description 할 일 수정을 위한 React Query mutation 훅
 *
 * ⚡ 낙관적 업데이트(Optimistic Update) 패턴을 적용하여
 * 서버 응답을 기다리지 않고 즉각적인 UI 반응을 제공합니다.
 * 🗂️ 캐시 정규화 패턴 - 개별 상세 캐시만 업데이트
 */

import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * ✏️ 할 일 수정 mutation 훅
 *
 * updateTodo API를 호출하여 할 일을 수정합니다.
 * ⚡ 낙관적 업데이트 패턴을 사용하여 즉각적인 UI 반응을 제공하고,
 * ❌ 에러 발생 시 이전 상태로 롤백합니다.
 *
 * 🗂️ 캐시 정규화 패턴:
 * - 개별 상세 캐시(QUERY_KEYS.todo.detail)만 업데이트
 * - 목록 캐시는 ID만 관리하므로 수정 불필요
 *
 * 🔄 동작 흐름:
 * 1️⃣ onMutate: 진행 중인 쿼리 취소 → 이전 데이터 백업 → 캐시 즉시 업데이트
 * 2️⃣ onError: 에러 시 백업 데이터로 롤백
 *
 * @returns 🎁 useMutation 결과 객체
 *
 * @example
 * const { mutate } = useUpdateTodoMutation();
 * mutate({ id: "1", isDone: true });
 */
export function useUpdateTodoMutation() {
  // 🗄️ 캐시 조작을 위한 QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  return useMutation({
    // 📡 API 호출 함수 지정
    mutationFn: updateTodo,

    /**
     * 1️⃣ ⚡ 낙관적 업데이트 (Optimistic Update)
     *
     * 서버 응답 전에 UI를 먼저 업데이트하여 즉각적인 반응을 제공합니다.
     * 💾 에러 발생 시 롤백할 수 있도록 이전 데이터를 백업합니다.
     */
    onMutate: async (updatedTodo) => {
      // 🛑 진행 중인 refetch 취소 (낙관적 업데이트와의 충돌 방지)
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      // 💾 롤백을 위한 이전 데이터 백업
      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      );

      // ⚡ 개별 상세 캐시를 즉시 업데이트하여 UI에 반영
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            ...updatedTodo, // ✏️ 변경된 필드만 덮어쓰기
          };
        },
      );

      // 🔙 onError에서 사용할 컨텍스트 반환
      return {
        prevTodo,
      };
    },

    /**
     * 2️⃣ ❌ 에러 발생 시 롤백
     *
     * 🔙 서버 요청이 실패한 경우 이전 데이터로 복원합니다.
     */
    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        // 💾 백업해둔 이전 데이터로 캐시 복원
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
  });
}
