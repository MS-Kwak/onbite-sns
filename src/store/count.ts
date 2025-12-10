/**
 * @file count.ts
 * @description 카운터 상태 관리를 위한 Zustand 스토어
 *
 * 여러 미들웨어를 조합하여 다음 기능을 제공합니다:
 * - devtools: Redux DevTools 연동
 * - persist: sessionStorage에 상태 영속화
 * - subscribeWithSelector: 선택적 상태 구독
 * - immer: 불변성 관리 간소화
 */

import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * 카운터 스토어
 *
 * 미들웨어 구성 (바깥에서 안쪽 순서):
 * 1. devtools - Redux DevTools에서 상태 변화 추적
 * 2. persist - sessionStorage에 상태 저장
 * 3. subscribeWithSelector - 특정 상태 변화만 구독 가능
 * 4. immer - 불변성을 유지하면서 직접 상태 수정 가능
 * 5. combine - 초기 상태와 액션 분리
 *
 * 상태:
 * - count: 현재 카운트 값
 *
 * 액션:
 * - actions.increaseOne(): count를 1 증가
 * - actions.decreaseOne(): count를 1 감소
 */
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              /**
               * 카운트를 1 증가시킵니다.
               * immer 미들웨어 덕분에 직접 수정하는 것처럼 작성해도 불변성이 유지됩니다.
               */
              increaseOne: () => {
                set((state) => {
                  state.count += 1;
                });
              },
              /**
               * 카운트를 1 감소시킵니다.
               */
              decreaseOne: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        // 스토리지에 저장될 키 이름
        name: "countStore",
        // 저장할 상태 선택 (count만 저장, actions는 제외)
        partialize: (store) => ({
          count: store.count,
        }),
        // sessionStorage 사용 (브라우저 탭 닫으면 초기화)
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      // DevTools에 표시될 스토어 이름
      name: "countStore",
    },
  ),
);

/**
 * count 상태 변화 구독
 *
 * subscribeWithSelector 미들웨어를 통해 count 값만 선택적으로 구독합니다.
 * count가 변경될 때마다 콜백이 실행됩니다.
 *
 * @param selector - 구독할 상태 선택 함수
 * @param listener - 상태 변경 시 실행될 콜백 (현재값, 이전값)
 */
useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // 상태 변경 시 콘솔에 로그 출력
    console.log(count, prevCount);

    // 스토어의 현재 상태 전체 가져오기 예시
    const store = useCountStore.getState();
    // 상태 직접 업데이트 예시 (필요시 사용)
    // useCountStore.setState((store)=>({ }))
  },
);

// ===== 이전 구현 방식 (참고용) =====
// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increaseOne: () => {
//       set((store) => ({
//         count: store.count + 1,
//       }));
//     },
//     decreaseOne: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   },
// }));

/**
 * 현재 카운트 값을 가져오는 훅
 *
 * @returns 현재 count 값
 *
 * @example
 * const count = useCount();
 */
export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

/**
 * 카운트 증가 액션을 가져오는 훅
 *
 * @returns increaseOne 액션 함수
 *
 * @example
 * const increase = useIncreaseCount();
 * increase(); // count +1
 */
export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increaseOne);
  return increase;
};

/**
 * 카운트 감소 액션을 가져오는 훅
 *
 * @returns decreaseOne 액션 함수
 *
 * @example
 * const decrease = useDecreaseCount();
 * decrease(); // count -1
 */
export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decreaseOne);
  return decrease;
};
