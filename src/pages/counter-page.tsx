/**
 * 📁 @file counter-page.tsx
 * 🔢 @description 카운터 페이지 컴포넌트
 *
 * 🐻 Zustand 상태 관리를 사용한 카운터 예제 페이지입니다.
 * 👁️ Viewer와 🎮 Controller 컴포넌트를 조합하여 카운터 기능을 제공합니다.
 *
 * 🗺️ 라우트: /counter
 */

import Controller from "@/components/counter/controller";
import Viewer from "@/components/counter/viewer";

/**
 * 🔢 카운터 페이지 컴포넌트
 *
 * 🐻 Zustand를 활용한 전역 상태 관리 예제를 보여줍니다.
 * - 👁️ Viewer: 현재 카운트 값을 표시
 * - 🎮 Controller: 증가/감소 버튼 제공
 *
 * @returns 📄 카운터 페이지 JSX
 */
export default function CounterPage() {
  return (
    <div>
      {/* 📌 페이지 제목 */}
      <h1 className="text-2xl font-bold">Counter</h1>
      {/* 👁️ 현재 카운트 값 표시 */}
      <Viewer />
      {/* 🎮 카운트 조작 버튼 */}
      <Controller />
    </div>
  );
}
