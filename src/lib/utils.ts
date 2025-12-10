/**
 * 📁 @file utils.ts
 * 🛠️ @description 유틸리티 함수 모음
 *
 * shadcn/ui 컴포넌트에서 사용하는 클래스명 병합 유틸리티를 제공합니다.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 🎨 Tailwind CSS 클래스명을 조건부로 결합하는 유틸리티 함수
 *
 * 🔄 clsx로 조건부 클래스를 처리하고, tailwind-merge로 충돌하는 클래스를 병합합니다.
 * 이 함수는 shadcn/ui 컴포넌트에서 스타일 오버라이드를 지원하기 위해 사용됩니다.
 *
 * @param inputs - 🎯 결합할 클래스명들 (문자열, 객체, 배열 형태 가능)
 * @returns 🎁 병합된 클래스명 문자열
 *
 * @example
 * // 📌 기본 사용
 * cn("px-4 py-2", "text-white")
 * // 결과: "px-4 py-2 text-white"
 *
 * @example
 * // 🔄 충돌하는 클래스 병합
 * cn("px-4", "px-8")
 * // 결과: "px-8" (나중에 온 값이 우선)
 *
 * @example
 * // 🎯 조건부 클래스
 * cn("base-class", isActive && "active", { "disabled": isDisabled })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
