/**
 * 📁 @file todos.ts
 * 📋 @description 할 일(Todos) 상태 관리를 위한 Zustand 스토어 (💾 로컬 상태 버전)
 *
 * 🔌 서버 연동 없이 클라이언트 측에서만 할 일을 관리하는 스토어입니다.
 * 📝 immer 미들웨어를 사용하여 불변성을 쉽게 관리합니다.
 *
 * 💡 참고: 현재 애플리케이션은 이 스토어 대신 React Query를 사용하여
 * 🔄 서버와 동기화된 할 일 관리를 구현하고 있습니다.
 */

import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Todo } from "@/types";

/**
 * 📊 초기 상태
 * 📭 todos: 빈 배열로 시작
 */
const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

/**
 * 📋 할 일 관리 스토어
 *
 * 📝 immer 미들웨어를 사용하여 배열 조작 시에도
 * 직관적인 코드로 불변성을 유지합니다.
 *
 * 📊 상태:
 * - todos: 할 일 배열
 *
 * 🎬 액션:
 * - createTodo(content): ➕ 새 할 일 추가
 * - deleteTodo(targetId): 🗑️ 할 일 삭제
 */
const useTodosStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        /**
         * ➕ 새로운 할 일을 추가합니다.
         *
         * @param content - 📝 할 일 내용
         *
         * @example
         * createTodo("장보기");
         */
        createTodo: (content: string) => {
          set((state) => {
            // 📝 immer 덕분에 push를 직접 사용해도 불변성 유지됨
            state.todos.push({
              id: String(new Date().getTime()), // 🆔 현재 시간을 ID로 사용 (문자열 변환)
              content: content,
              isDone: false, // ⬜ 기본적으로 미완료 상태
            });
          });
        },

        /**
         * 🗑️ 특정 할 일을 삭제합니다.
         *
         * @param targetId - 🆔 삭제할 할 일의 ID
         *
         * @example
         * deleteTodo("1234567890");
         */
        deleteTodo: (targetId: string) => {
          set((state) => {
            // 🔍 해당 ID를 가진 항목을 필터링하여 제거
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    })),
  ),
);

/**
 * 📋 전체 할 일 목록을 가져오는 훅
 *
 * @returns 📊 할 일 배열
 *
 * @example
 * const todos = useTodos();
 * todos.map(todo => ...)
 */
export const useTodos = () => {
  const todos = useTodosStore((store) => store.todos);
  return todos;
};

/**
 * ➕ 할 일 생성 액션을 가져오는 훅
 *
 * @returns 🎬 createTodo 액션 함수
 *
 * @example
 * const createTodo = useCreateTodo();
 * createTodo("새로운 할 일");
 */
export const useCreateTodo = () => {
  const createTodo = useTodosStore((store) => store.actions.createTodo);
  return createTodo;
};

/**
 * 🗑️ 할 일 삭제 액션을 가져오는 훅
 *
 * @returns 🎬 deleteTodo 액션 함수
 *
 * @example
 * const deleteTodo = useDeleteTodo();
 * deleteTodo(todoId);
 */
export const useDeleteTodo = () => {
  const deleteTodo = useTodosStore((store) => store.actions.deleteTodo);
  return deleteTodo;
};
