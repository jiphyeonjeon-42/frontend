import { useEffect, useState } from "react";

/**
 * 현재 width가 breakPoint에 해당하는지 확인하는 hook
 * @param breakPoint 기준이 되는 width
 * @param compareFunction 현재 width와 비교하는 함수 default : < (less than)
 * @returns window.innerWidth와 breakPoint를 비교한 결과
 * @example const isTablet = useBreakPoint(768)
 */

export const useBreakPoint = (
  breakPoint: number,
  compareFunction?: (A: number, B: number) => boolean,
) => {
  const compare = compareFunction || ((A: number, B: number) => A < B);

  const [isBreaked, setBreaked] = useState(
    compare(window.innerWidth, breakPoint),
  );

  useEffect(() => {
    const resize = () => setBreaked(compare(window.innerWidth, breakPoint));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [breakPoint, compare]);

  return isBreaked;
};
