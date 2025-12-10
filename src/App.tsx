/**
 * @file App.tsx
 * @description 애플리케이션의 메인 라우팅 컴포넌트
 *
 * React Router를 사용하여 페이지 라우팅을 정의합니다.
 * 중첩 라우팅을 활용하여 인증 관련 페이지에 공통 레이아웃을 적용합니다.
 */

import { Outlet, Route, Routes } from "react-router";
import "./App.css";
import IndexPage from "@/pages/index-page";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import CounterPage from "./pages/counter-page";
import TodoListPage from "@/pages/todo-list-page";
import TodoDetailPage from "@/pages/todo-detail-page";

/**
 * 인증 관련 페이지들의 공통 레이아웃 컴포넌트
 * Outlet을 통해 자식 라우트의 컴포넌트를 렌더링합니다.
 *
 * @returns 인증 페이지용 레이아웃 JSX
 */
function AuthLayout() {
  return (
    <div>
      {/* 인증 페이지 공통 헤더 */}
      <header>Auth!</header>
      {/* 자식 라우트가 렌더링되는 위치 */}
      <Outlet />
    </div>
  );
}

/**
 * 메인 App 컴포넌트
 * 애플리케이션의 모든 라우트를 정의합니다.
 *
 * 라우트 구조:
 * - / : 메인 페이지
 * - /counter : 카운터 페이지
 * - /todolist : 할 일 목록 페이지
 * - /todolist/:id : 할 일 상세 페이지 (동적 라우트)
 * - /sign-in : 로그인 페이지 (AuthLayout 적용)
 * - /sign-up : 회원가입 페이지 (AuthLayout 적용)
 *
 * @returns 라우팅이 설정된 애플리케이션 JSX
 */
function App() {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<IndexPage />} />

      {/* 카운터 페이지 - Zustand 상태 관리 예제 */}
      <Route path="/counter" element={<CounterPage />} />

      {/* 할 일 목록 페이지 - React Query 예제 */}
      <Route path="/todolist" element={<TodoListPage />} />

      {/* 할 일 상세 페이지 - 동적 라우트 파라미터 사용 */}
      <Route path="/todolist/:id" element={<TodoDetailPage />} />

      {/* 인증 관련 페이지 - 중첩 라우트로 공통 레이아웃 적용 */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
