/**
 * @file main.tsx
 * @description 애플리케이션의 진입점 (Entry Point)
 *
 * React 애플리케이션의 루트를 설정하고, 필요한 프로바이더들을 구성합니다.
 * - BrowserRouter: 클라이언트 사이드 라우팅 지원
 * - QueryClientProvider: React Query를 통한 서버 상태 관리
 * - ReactQueryDevtools: 개발 환경에서 React Query 디버깅 도구 제공
 */

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// React Query 클라이언트 인스턴스 생성
// 서버 상태 관리(캐싱, 동기화, 업데이트)를 담당
const queryClient = new QueryClient();

// React 애플리케이션을 DOM에 마운트
createRoot(document.getElementById("root")!).render(
  // 클라이언트 사이드 라우팅을 위한 BrowserRouter
  <BrowserRouter>
    {/* React Query 컨텍스트 제공 */}
    <QueryClientProvider client={queryClient}>
      {/* 개발 환경에서만 표시되는 React Query 디버깅 도구 */}
      <ReactQueryDevtools />
      {/* 메인 애플리케이션 컴포넌트 */}
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
