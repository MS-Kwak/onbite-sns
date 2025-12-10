/**
 * @file use-delete-todo-mutation.ts
 * @description 할 일 삭제를 위한 React Query mutation 훅
 *
 * 서버에서 할 일을 삭제하고, 성공 시 캐시에서 해당 항목을 제거합니다.
 */

import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 할 일 삭제 mutation 훅
 *
 * deleteTodo API를 호출하여 할 일을 삭제하고,
 * 성공 시 캐시에서 해당 항목을 제거합니다.
 *
 * @returns useMutation 결과 객체
 * @returns mutate - 할 일 삭제 함수 (id: string)
 * @returns isPending - 삭제 중 여부
 * @returns isError - 에러 발생 여부
 * @returns error - 에러 객체
 *
 * @example
 * const { mutate, isPending } = useDeleteTodoMutation();
 * mutate("todo-id-123");
 */
export function useDeleteTodoMutation() {
  // 캐시 조작을 위한 QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  return useMutation({
    // API 호출 함수 지정
    mutationFn: deleteTodo,

    /**
     * 삭제 성공 시 캐시에서 해당 항목 제거
     * 삭제된 할 일의 ID와 일치하지 않는 항목만 필터링하여 캐시 업데이트
     */
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        // 기존 데이터가 없으면 빈 배열 반환
        if (!prevTodos) return [];
        // 삭제된 할 일을 제외한 나머지 항목만 반환
        return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      });
    },
  });
}
