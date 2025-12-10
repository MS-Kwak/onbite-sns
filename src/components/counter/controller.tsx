/**
 * @file controller.tsx
 * @description 카운터 조작을 위한 컨트롤러 컴포넌트
 *
 * 증가/감소 버튼을 제공하여 Zustand 스토어의 count 값을 조작합니다.
 */

import { Button } from "@/components/ui/button";
import { useDecreaseCount, useIncreaseCount } from "@/store/count";

/**
 * 카운터 컨트롤러 컴포넌트
 *
 * Zustand 스토어의 액션을 사용하여 카운터 값을 증가/감소시키는 버튼을 렌더링합니다.
 *
 * @returns 증가/감소 버튼이 포함된 JSX
 *
 * @example
 * <Controller />
 */
export default function Controller() {
  // Zustand 스토어에서 증가 액션 가져오기
  const increase = useIncreaseCount();
  // Zustand 스토어에서 감소 액션 가져오기
  const decrease = useDecreaseCount();

  return (
    <div>
      {/* 감소 버튼 - 클릭 시 count -1 */}
      <Button onClick={decrease}>-</Button>
      {/* 증가 버튼 - 클릭 시 count +1 */}
      <Button onClick={increase}>+</Button>
    </div>
  );
}
