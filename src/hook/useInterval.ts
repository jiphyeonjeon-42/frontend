import { useEffect, useRef } from "react";

/**
 * useInterval SetInterval을 사용하기 위한 Hook
 *
 * @param callback 간격마다 실행할 함수
 * @param delay 실행 간격 (ms)
 * @returns startInterval: setInterval 재시작을 위한 함수, stopInterval: setInterval 종료 함수
 * @example const { startInterval, stopInterval } = useInterval(() => { console.log("interval") }, 1000);
 */

export const useInterval = (callback: () => void, delay: number) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const stopInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const startInterval = () => {
    stopInterval();
    intervalId.current = setInterval(callback, delay);
  };

  useEffect(() => {
    return stopInterval;
  }, [callback, delay]);

  return { startInterval, stopInterval };
};
