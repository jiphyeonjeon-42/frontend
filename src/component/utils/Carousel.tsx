import {
  ComponentProps,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useInterval } from "~/hook/useInterval";
import { useBound } from "~/hook/useBound";
import "~/asset/css/Carousel.css";

// 내부 컴포넌트에서 사용하는 context
const CarouselContext = createContext({
  index: 0,
  isAnimated: true,
  onPrev: () => {},
  onNext: () => {},
  setIndex: (index: number) => {},
  startInterval: () => {},
  stopInterval: () => {},
  displayCount: 0,
  itemSize: 0,
  length: 0,
  direction: "row",
});

/**
 * Carousel 무한 슬라이드를 위한 컴포넌트
 * @param length -  슬라이드 될 item의 개수
 * @param itemSize - 슬라이드 될 item의 크기, margin 포함 실제 크기(px)로 실제 이동하는 거리와 같음
 * @param itemCount - 슬라이드 될 container에 들어갈 item의 개수, 크기는 자동 조정
 * itemSize나 itemCount 둘 중 하나만 지정가능, 둘 중 하나는 반드시 지정되어야 함
 * @param direction - 슬라이드 방향 (row | column)
 * @param delay - 슬라이드 간의 시간 간격
 */

type Props = ComponentProps<"div"> & {
  length: number;
  itemSize?: number;
  itemCount?: number;
  direction?: "row" | "column";
  delay?: number;
} & (
    | { itemSize: number; itemCount?: never }
    | { itemCount: number; itemSize?: never }
  );

const Root = ({
  length,
  itemSize,
  itemCount,
  direction = "row",
  delay = 2000,
  children,
  className = "",
  ...rest
}: Props) => {
  const [slide, setSlide] = useState({ index: 1, isAnimated: true }); // 슬라이드 움직임 제어

  const { targetRef, boundInfo: bound } = useBound<HTMLDivElement>({
    hasResizeEvent: true,
    hasScrollEvent: false,
  }); // 슬라이드 컨테이너의 전체 크기 확인
  const containerSize = direction === "row" ? bound.width : bound.height;
  const displayCount = itemSize
    ? Math.floor(containerSize / itemSize)
    : itemCount!;
  // 슬라이드에 들어가야 할 item의 총 개수 (화면에 보여지는 개수)

  // 무한 슬라이드를 위한 index 이동 설정
  const onNext = () => {
    // 슬라이드가 처음이나 끝에서 이동할 때는 애니메이션 효과를 없애고, 이동 후에 애니메이션 효과를 적용한다.
    // 마지막 요소가 첫번째 앞에 추가되었기 때문에 length - 1 대신 length로 이동
    if (slide.index === length) {
      setSlide({ index: 0, isAnimated: false });
      setTimeout(() => setSlide({ index: 1, isAnimated: true }), delay / 100);
    } else setSlide({ index: slide.index + 1, isAnimated: true });
  };

  const onPrev = () => {
    if (slide.index === 0) {
      // 마찬가지로 length - 1 대신 length로 이동
      setSlide({ index: length, isAnimated: false });
      setTimeout(
        () => setSlide({ index: length - 1, isAnimated: true }),
        delay / 100,
      );
    } else setSlide({ index: slide.index - 1, isAnimated: true });
  };

  // 슬라이드 자동 이동 및 Hover시 멈추기 위한 함수
  const { startInterval, stopInterval } = useInterval(onNext, delay);

  return (
    <CarouselContext.Provider
      value={{
        index: slide.index,
        isAnimated: slide.isAnimated,
        onNext,
        onPrev,
        setIndex: (index: number) => setSlide(prev => ({ ...prev, index })),
        startInterval,
        stopInterval,
        displayCount,
        itemSize: itemSize ?? containerSize / itemCount!,
        length,
        direction,
      }}
    >
      <div
        {...rest}
        className={`carousel__container ${className}`}
        ref={targetRef}
        onMouseEnter={stopInterval}
        onMouseLeave={startInterval}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

/**
 * 슬라이드 될 item들을 보여주는 컴포넌트
 * Carousel.Root 컴포넌트로 감싸져야 한다.
 *
 * @param items - 슬라이드 될 item들의 배열
 * @param renderItem - 슬라이드 될 item의 렌더링 UI, 파라미터로 item을 받아서 렌더링한다.
 * @param showPreviousItem - 이전 item을 보여줄지 여부 (half | none)
 * @example ~/component/main/MainNewBookList.tsx
 */

type ListProps<T extends { id: number }> = ComponentProps<"ul"> & {
  items: T[];
  renderItem: (props: ComponentProps<any> & { item: T }) => React.ReactNode;
  showPreviousItem?: "half" | "none";
};

const List = <T extends { id: number }>({
  items,
  renderItem,
  showPreviousItem = "none",
  className,
  ...rest
}: ListProps<T>) => {
  const {
    index,
    startInterval,
    stopInterval,
    displayCount,
    itemSize,
    direction,
    isAnimated,
  } = useContext(CarouselContext);

  // 슬라이드 될 item들을 복사해서 앞뒤로 붙여준다.
  // 애니메이션 효과를 위한 앞 마지막 1개와 컨테이너 크기에 맞춰서 복사한 item들을 붙여준다.
  const displayItems = useMemo(() => {
    if (items.length === 0) return [];
    const lastItem = items.slice(-1)[0];
    return [
      { ...lastItem, key: "last" + lastItem.id },
      ...items.map(i => ({ ...i, key: `${i.id}` })),
      ...Array.from({ length: displayCount / items.length + 1 }).flatMap(
        (_, i) =>
          items.map((_, index) => ({
            ...items[index % items.length],
            key: "copy" + i + index, //  key 중복을 피하기 위해 임의로 가공
          })),
      ),
    ];
  }, [items, displayCount]);

  const prevItemSize = showPreviousItem === "half" ? itemSize / 2 : 0;

  return (
    <ul
      {...rest}
      className={`carousel__list ${className}`}
      style={{
        // 슬라이더의 이동을 위해 transform을 사용한다.
        transform: `translate(-${itemSize * index + prevItemSize / 2}px)`,
        flexDirection: direction === "row" ? "row" : "column",
        transition: isAnimated ? "transform 0.2s ease-in-out" : "",
      }}
      onMouseOver={stopInterval}
      onMouseLeave={startInterval}
    >
      {displayItems.map(item =>
        renderItem({ item, key: item.key, style: { flexBasis: itemSize } }),
      )}
    </ul>
  );
};

const Prev = ({ className, ...rest }: ComponentProps<"button">) => {
  const { onPrev, startInterval, stopInterval } = useContext(CarouselContext);

  return (
    <button
      {...rest}
      onClick={onPrev}
      className={`carousel__prev ${className}`}
      onMouseOver={stopInterval}
      onMouseLeave={startInterval}
    />
  );
};

const Next = ({ className, ...rest }: ComponentProps<"button">) => {
  const { onNext, startInterval, stopInterval } = useContext(CarouselContext);

  return (
    <button
      {...rest}
      onClick={onNext}
      className={`carousel__next ${className}`}
      onMouseOver={stopInterval}
      onMouseLeave={startInterval}
    />
  );
};

type PaginationProps = {
  render: (props: {
    page: number;
    setPage: (page: number) => void;
    lastPage?: number;
  }) => JSX.Element;
} & ComponentProps<"div">;
const Pagination = ({ render }: PaginationProps) => {
  const { index, setIndex, length } = useContext(CarouselContext);
  return render({
    page: index,
    setPage: setIndex,
    lastPage: length - 1,
  });
};

export default { Root, Prev, Next, List, Pagination };
