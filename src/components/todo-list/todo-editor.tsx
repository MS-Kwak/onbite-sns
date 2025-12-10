/**
 * @file todo-editor.tsx
 * @description 새로운 할 일을 입력하고 추가하는 에디터 컴포넌트
 *
 * 사용자가 할 일 내용을 입력하고 추가 버튼을 클릭하면
 * React Query mutation을 통해 서버에 새 할 일을 생성합니다.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";
import { useState } from "react";

/**
 * 할 일 에디터 컴포넌트
 *
 * 새로운 할 일을 입력받아 서버에 생성하는 기능을 제공합니다.
 *
 * 기능:
 * - 할 일 내용 입력
 * - 빈 내용 입력 방지 (공백만 있는 경우 추가 불가)
 * - 추가 중(pending) 상태에서 버튼 비활성화
 * - 추가 완료 후 입력 필드 초기화
 *
 * @returns 입력 필드와 추가 버튼이 포함된 JSX
 *
 * @example
 * <TodoEditor />
 */
export default function TodoEditor() {
  // 할 일 생성 mutation 훅 - mutate 함수와 pending 상태 가져오기
  const { mutate, isPending } = useCreateTodoMutation();
  // 입력 필드의 내용을 관리하는 로컬 상태
  const [content, setContent] = useState("");

  /**
   * 추가 버튼 클릭 핸들러
   *
   * 입력된 내용이 유효한 경우에만 mutation을 실행하고
   * 입력 필드를 초기화합니다.
   */
  const handleAddClick = () => {
    // 빈 문자열 또는 공백만 있는 경우 추가하지 않음
    if (content.trim() === "") return;
    // 서버에 새 할 일 생성 요청
    mutate(content);
    // 입력 필드 초기화
    setContent("");
  };

  return (
    <div className="flex gap-2">
      {/* 할 일 내용 입력 필드 */}
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요 ..."
      />
      {/* 추가 버튼 - 생성 중일 때 비활성화 */}
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
