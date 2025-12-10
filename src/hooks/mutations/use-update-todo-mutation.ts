import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    // 1️⃣ 낙관적 업데이트 (Optimistic Update)
    onMutate: async (updatedTodo) => {
      // 진행 중인 쿼리 취소 (충돌 방지)
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      // 이전 데이터 백업 (롤백용)
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      // 즉시 UI 업데이트
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      // 롤백용 데이터 반환
      return {
        prevTodos,
      };
    },

    // 2️⃣ 에러 시 롤백
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        // 이전 데이터로 복원
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },

    // 3️⃣ 완료 후 서버 동기화 (성공/실패 상관없이 실행)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
