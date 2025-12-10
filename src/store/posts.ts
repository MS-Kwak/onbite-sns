/**
 * 📁 @file posts.ts
 * 📰 @description 게시물(Posts) 상태 관리를 위한 Zustand 스토어 (🚧 미구현)
 *
 * 🔄 비동기 데이터 요청의 상태를 관리하기 위한 스토어 템플릿입니다.
 * ⚠️ 실제 구현은 아직 완료되지 않았습니다.
 */

import { create } from "zustand";
import { combine } from "zustand/middleware";

/**
 * 📊 초기 상태
 *
 * @property {boolean} isLoading - ⏳ 데이터 로딩 중 여부
 * @property {null} status - 📊 요청 상태 (null, 'pending', 'success', 'error' 등)
 * @property {null} error - 🚨 에러 발생 시 에러 정보
 * @property {null} posts - 📰 게시물 목록 데이터
 */
const initialState = {
  isLoading: false,
  status: null,
  error: null,
  posts: null,
};

/**
 * 📰 게시물 요청 상태 관리 스토어
 *
 * 🔄 비동기 API 요청의 상태(로딩, 성공, 에러)를 관리합니다.
 * ⚠️ 현재는 템플릿 상태이며, 실제 로직은 구현되지 않았습니다.
 *
 * 🎬 액션 (🚧 미구현):
 * - toggleIsLoading: 로딩 상태 토글
 * - setStatus: 요청 상태 설정
 * - fetchPosts: 게시물 목록 조회 API 호출
 */
const usePostsRequestStore = create(
  combine(initialState, () => ({
    actions: {
      /**
       * 🔄 로딩 상태를 토글합니다.
       * 🚧 TODO: 구현 필요
       */
      toggleIsLoading: () => {
        // ...
      },
      /**
       * 📊 요청 상태를 설정합니다.
       * 🚧 TODO: 구현 필요
       */
      setStatus: () => {
        // ...
      },
      /**
       * 📥 게시물 목록을 서버에서 가져옵니다.
       * 🚧 TODO: 구현 필요
       */
      fetchPosts: () => {
        // ...
      },
    },
  })),
);
