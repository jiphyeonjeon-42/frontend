import { CSSProperties, ComponentProps, useContext, useMemo } from "react";
import { CarouselContext } from "~/component/utils/Carousel";

/**
 * 슬라이드 될 item을 연속으로 늘어놓은 컴포넌트
 * 슬라이드 효과를 위해 조금씩 이동한다.
 * 반드시 Carousel.Root 와 Carousel.Container 컴포넌트로 감싸져야 한다.
 * Root : 필요한 상태 및 제어 설정을 공유받기 위함
 * Container : 슬라이드 될 item의 크기를 결정하기 위함
 *
 * @param items - 슬라이드 될 item들의 배열
 * @param renderItem - 슬라이드 될 item의 렌더링 UI, 파라미터로 item을 받아서 렌더링한다.
 * @param showPreviousItem - 이전 item을 보여줄지 여부 (half | none)
 * @example ~/component/main/MainNewBookList.tsx
 */

type Props<T extends { id: number }> = ComponentProps<"ul"> & {
  items: T[];
  renderItem: (props: {
    item: T & { key: string };
    key: string;
    style: CSSProperties;
  }) => JSX.Element;
  showPreviousItem?: "half" | "none";
};

const CarouselList = <T extends { id: number }>({
  items,
  renderItem,
  showPreviousItem = "none",
  className,
  ...rest
}: Props<T>) => {
  const {
    index,
    startAutoAnimation,
    pauseAutoAnimation,
    displayCount,
    itemSize,
    direction,
    isSmoothAnimated,
  } = useContext(CarouselContext);

  // 슬라이드 될 item들을 복사해서 앞뒤로 붙여준다.
  // 애니메이션 효과를 위한 앞 마지막 1개와 컨테이너 크기에 맞춰서 복사한 item들을 붙여준다.
  const displayItems = useMemo(() => {
    if (items.length === 0) return [];
    const lastItem = items.slice(-1)[0];
    const copySize = displayCount / items.length + 1;
    return [
      { ...lastItem, key: "last" + lastItem.id },
      ...items.map(i => ({ ...i, key: `${i.id}` })),
      ...Array.from({ length: copySize }).flatMap((_, i) =>
        items.map((_, index) => ({
          ...items[index % items.length],
          key: "copy" + i + index, //  key 중복을 피하기 위해 임의로 가공
        })),
      ),
    ];
  }, [items, displayCount]);

  const prevItemSize = showPreviousItem === "half" ? itemSize / 2 : 0;
  const translate = direction === "row" ? "translateX" : "translateY";

  return (
    <ul
      {...rest}
      className={`carousel__list ${className}`}
      style={{
        transform: `${translate}(-${itemSize * index + prevItemSize / 2}px)`,
        flexDirection: direction === "row" ? "row" : "column",
        transition: isSmoothAnimated ? "transform 0.2s ease-in-out" : "",
      }}
      onMouseOver={pauseAutoAnimation}
      onMouseLeave={startAutoAnimation}
    >
      {displayItems.map(item =>
        renderItem({
          item,
          key: item.key,
          style: { flexBasis: itemSize, width: itemSize, overflow: "hidden" },
        }),
      )}
    </ul>
  );
};

export default CarouselList;
