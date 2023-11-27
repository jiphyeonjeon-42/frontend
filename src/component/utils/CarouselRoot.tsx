import { ReactNode, useEffect, useState } from "react";
import { useBound } from "~/hook/useBound";
import { useInterval } from "~/hook/useInterval";
import { CarouselContext } from "~/component/utils/Carousel";
import "~/asset/css/Carousel.css";

export type Props = {
  length: number;
  itemSize?: number;
  itemCount?: number;
  direction?: "row" | "column";
  delay?: number;
  isAutoAnimated?: boolean;
  initailSmoothAnimated?: boolean;
  children: ReactNode;
} & (
  | { itemSize: number; itemCount?: never }
  | { itemCount: number; itemSize?: never }
);

/**
 * 슬라이드에 필요한 상태 및 여러 설정을 제어하는 컴포넌트
 * 다른 Carousel 컴포넌트를 사용하려면 반드시 Root로 감싸야 한다.
 *
 * @param length -  슬라이드 될 item의 개수
 * @param itemSize - 슬라이드 될 item의 크기, margin 포함 실제 크기(px)로 실제 이동하는 거리와 같음
 * @param itemCount - 슬라이드 될 container에 들어갈 item의 개수, 크기는 자동 조정
 * @param isAnimated - 슬라이드 애니메이션 여부
 * itemSize나 itemCount 둘 중 하나만 지정가능, 둘 중 하나는 반드시 지정되어야 함
 * @param direction - 슬라이드 방향 (row | column)
 * @param delay - 슬라이드 간의 시간 간격
 */

const CarouselRoot = ({
  length,
  itemSize,
  itemCount,
  direction = "row",
  delay = 2000,
  isAutoAnimated = true,
  initailSmoothAnimated = true,
  children,
}: Props) => {
  const [slide, setSlide] = useState({
    index: 1,
    isSmoothAnimated: initailSmoothAnimated,
  }); // 슬라이드 움직임 제어

  const { targetRef, boundInfo: bound } = useBound<HTMLDivElement>({
    hasResizeEvent: true,
    hasScrollEvent: false,
  });
  const containerSize = direction === "row" ? bound.width : bound.height;
  const displayCount = itemSize
    ? Math.floor(containerSize / itemSize)
    : itemCount!;

  const onNext = () => {
    // 마지막 요소가 첫번째 앞에 추가되었기 때문에 length - 1 대신 length로 이동
    // 바로 이동하면 동작이 어색함, 애니메이션 효과 false 설정 후 0.01초 뒤에 이동
    if (slide.index === length) {
      setSlide({ index: 0, isSmoothAnimated: false });
      setTimeout(() => setSlide({ index: 1, isSmoothAnimated: true }), 10);
    } else setSlide({ index: slide.index + 1, isSmoothAnimated: true });
  };

  const onPrev = () => {
    if (slide.index === 1) {
      setSlide({ index: length + 1, isSmoothAnimated: false });
      setTimeout(() => setSlide({ index: length, isSmoothAnimated: true }), 10);
    } else setSlide({ index: slide.index - 1, isSmoothAnimated: true });
  };

  const { startInterval, stopInterval } = useInterval(onNext, delay);

  const startAutoAnimation = () => isAutoAnimated && startInterval();
  const pauseAutoAnimation = stopInterval;

  useEffect(() => {
    startAutoAnimation();
  }, [startAutoAnimation]);

  useEffect(() => {
    setSlide({ index: 1, isSmoothAnimated: true });
  }, [length]);

  return (
    <CarouselContext.Provider
      value={{
        index: slide.index,
        isSmoothAnimated: slide.isSmoothAnimated,
        onNext,
        onPrev,
        setIndex: (index: number) => setSlide(prev => ({ ...prev, index })),
        startAutoAnimation,
        pauseAutoAnimation,
        displayCount,
        itemSize: itemSize ?? containerSize / itemCount!,
        length,
        direction,
        targetRef,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};
export default CarouselRoot;
