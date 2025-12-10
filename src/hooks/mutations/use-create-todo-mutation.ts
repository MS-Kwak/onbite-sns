/**
 * 📁 @file use-create-todo-mutation.ts
 * ➕ @description 새로운 할 일 생성을 위한 React Query mutation 훅
 *
 * 🔄 서버에 새 할 일을 생성하고, 성공 시 캐시를 정규화 패턴으로 업데이트합니다.
 */

import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * ➕ 할 일 생성 mutation 훅
 *
 * createTodo API를 호출하여 새 할 일을 생성하고,
 * 🗂️ 캐시 정규화 패턴에 맞게 캐시를 업데이트합니다.
 *
 * ✅ 성공 시 캐시 업데이트:
 * - 📋 새 Todo를 개별 상세 캐시에 저장
 * - 🆔 목록 캐시에 새 ID 추가
 *
 * @returns 🎁 useMutation 결과 객체
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

    // ⏳ mutation 시작 시 호출
    onMutate: () => {},

    // 🏁 mutation 완료 시 호출 (성공/실패 관계없이)
    onSettled: () => {},

    /**
     * ✅ 생성 성공 시 캐시 업데이트 (정규화 패턴)
     */
    onSuccess: (newTodo) => {
      // 📋 새 Todo를 개별 상세 캐시에 저장
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );

      // 🆔 목록 캐시에 새 ID 추가
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          // 📭 기존 데이터가 없으면 새 ID만 포함한 배열 반환
          if (!prevTodoIds) return [newTodo.id];
          // 📬 기존 목록에 새 ID 추가
          return [...prevTodoIds, newTodo.id];
        },
      );
    },

    /**
     * ❌ 생성 실패 시 에러 처리
     */
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
