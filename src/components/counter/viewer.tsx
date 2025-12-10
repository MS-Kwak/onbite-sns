/**
 * @file viewer.tsx
 * @description 카운터 값을 표시하는 뷰어 컴포넌트
 *
 * Zustand 스토어의 count 값을 구독하여 화면에 표시합니다.
 */

import { useCount } from "@/store/count";

/**
 * 카운터 뷰어 컴포넌트
 *
 * Zustand 스토어의 count 상태를 구독하여 현재 값을 화면에 렌더링합니다.
 * count 값이 변경되면 자동으로 리렌더링됩니다.
 *
 * @returns 현재 카운트 값을 표시하는 JSX
 *
 * @example
 * <Viewer />
 */
export default function Viewer() {
  // Zustand 스토어에서 현재 count 값 가져오기
  const count = useCount();

  return <div>{count}</div>;
}
