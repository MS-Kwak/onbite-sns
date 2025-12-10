/**
 * 📁 @file use-create-todo-mutation.ts
 * ➕ @description 새로운 할 일 생성을 위한 React Query mutation 훅
 *
 * 🔄 서버에 새 할 일을 생성하고, 성공 시 캐시를 업데이트합니다.
 */

import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * ➕ 할 일 생성 mutation 훅
 *
 * createTodo API를 호출하여 새 할 일을 생성하고,
 * ✅ 성공 시 캐시에 새 항목을 추가합니다.
 *
 * @returns 🎁 useMutation 결과 객체
 * @returns mutate - 📤 할 일 생성 함수 (content: string)
 * @returns isPending - ⏳ 생성 중 여부
 * @returns isError - ❌ 에러 발생 여부
 * @returns error - 🚨 에러 객체
 *
 * @example
 * const { mutate, isPending } = useCreateTodoMutation();
 * mutate("새로운 할 일");
 */
export function useCreateTodoMutation() {
  // 🗄️ 캐시 조작을 위한 QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  return useMutation({
    // 📡 API 호출 함수 지정
    mutationFn: createTodo,

    // ⏳ mutation 시작 시 호출 (현재 미사용)
    onMutate: () => {},

    // 🏁 mutation 완료 시 호출 (성공/실패 관계없이, 현재 미사용)
    onSettled: () => {},

    /**
     * ✅ 생성 성공 시 캐시 업데이트
     * 기존 할 일 목록 뒤에 새로 생성된 항목을 추가합니다.
     */
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        // 📭 기존 데이터가 없으면 새 항목만 포함한 배열 반환
        if (!prevTodos) return [newTodo];
        // 📬 기존 목록에 새 항목 추가
        return [...prevTodos, newTodo];
      });
    },

    /**
     * ❌ 생성 실패 시 에러 처리
     * 🔔 사용자에게 alert로 에러 메시지를 표시합니다.
     */
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
