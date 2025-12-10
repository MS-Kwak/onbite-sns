/**
 * 📁 @file use-delete-todo-mutation.ts
 * 🗑️ @description 할 일 삭제를 위한 React Query mutation 훅
 *
 * 🔄 서버에서 할 일을 삭제하고, 성공 시 캐시를 정규화 패턴에 맞게 업데이트합니다.
 */

import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 🗑️ 할 일 삭제 mutation 훅
 *
 * deleteTodo API를 호출하여 할 일을 삭제하고,
 * 🗂️ 캐시 정규화 패턴에 맞게 캐시를 업데이트합니다.
 *
 * ✅ 성공 시 캐시 업데이트:
 * - 🗑️ 개별 상세 캐시 제거 (removeQueries)
 * - 🆔 목록 캐시에서 삭제된 ID 제거
 *
 * @returns 🎁 useMutation 결과 객체
 *
 * @example
 * const { mutate, isPending } = useDeleteTodoMutation();
 * mutate("todo-id-123");
 */
export function useDeleteTodoMutation() {
  // 🗄️ 캐시 조작을 위한 QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  return useMutation({
    // 📡 API 호출 함수 지정
    mutationFn: deleteTodo,

    /**
     * ✅ 삭제 성공 시 캐시 업데이트 (정규화 패턴)
     */
    onSuccess: (deletedTodo) => {
      // 🗑️ 개별 상세 캐시 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });

      // 🆔 목록 캐시에서 삭제된 ID 제거
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          // 📭 기존 데이터가 없으면 빈 배열 반환
          if (!prevTodoIds) return [];
          // 🔍 삭제된 ID를 제외한 나머지만 반환
          return prevTodoIds.filter((id) => id !== deletedTodo.id);
        },
      );
    },
  });
}
