/**
 * @file types.ts
 * @description 애플리케이션 전역에서 사용되는 타입 정의
 */

/**
 * 할 일(Todo) 항목의 타입 정의
 *
 * @property id - 할 일의 고유 식별자
 * @property content - 할 일의 내용
 * @property isDone - 완료 여부 (true: 완료, false: 미완료)
 */
export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}
