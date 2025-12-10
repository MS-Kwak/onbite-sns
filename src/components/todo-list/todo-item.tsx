/**
 * @file todo-item.tsx
 * @description 개별 할 일 항목을 표시하는 컴포넌트
 *
 * 할 일의 내용, 완료 상태 체크박스, 삭제 버튼을 제공합니다.
 * 체크박스 클릭 시 완료 상태를 토글하고, 삭제 버튼 클릭 시 해당 항목을 삭제합니다.
 */

import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import type { Todo } from "@/types";
import { Link } from "react-router";

/**
 * 할 일 항목 컴포넌트
 *
 * 개별 할 일을 표시하고 완료 상태 변경 및 삭제 기능을 제공합니다.
 *
 * 기능:
 * - 체크박스: 완료/미완료 상태 토글 (낙관적 업데이트 적용)
 * - 링크: 클릭 시 할 일 상세 페이지로 이동
 * - 삭제 버튼: 해당 할 일 삭제
 * - 삭제 중 상태에서 체크박스와 버튼 비활성화
 *
 * @param props - Todo 타입의 속성들
 * @param props.id - 할 일의 고유 식별자
 * @param props.content - 할 일의 내용
 * @param props.isDone - 완료 여부
 * @returns 할 일 항목을 표시하는 JSX
 *
 * @example
 * <TodoItem id="1" content="장보기" isDone={false} />
 */
export default function TodoItem({ id, content, isDone }: Todo) {

  // 삭제 mutation 훅 - mutate 함수와 pending 상태 가져오기
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  // 업데이트 mutation 훅 - mutate 함수 가져오기
  const { mutate: updatedTodo } = useUpdateTodoMutation();

  /**
   * 삭제 버튼 클릭 핸들러
   * 해당 할 일을 서버에서 삭제합니다.
   */
  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  /**
   * 체크박스 클릭 핸들러
   * 완료 상태를 반전시켜 서버에 업데이트합니다.
   * 낙관적 업데이트가 적용되어 즉각적인 UI 반응을 제공합니다.
   */
  const handleCheckboxClick = () => {
    updatedTodo({
      id,
      isDone: !isDone, // 현재 상태의 반대값으로 토글
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        {/* 완료 상태 체크박스 - 삭제 중일 때 비활성화 */}
        <input
          disabled={isDeleteTodoPending}
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={isDone}
        />
        {/* 할 일 내용 - 클릭 시 상세 페이지로 이동 */}
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      {/* 삭제 버튼 - 삭제 중일 때 비활성화 */}
      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
