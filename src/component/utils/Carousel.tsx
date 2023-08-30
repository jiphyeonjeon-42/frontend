import { RefObject, createContext } from "react";
import CarouselRoot from "~/component/utils/CarouselRoot";
import CarouselList from "~/component/utils/CarouselList";
import CarouselContainer from "~/component/utils/CarouselContainer";
import CarouselPagination from "~/component/utils/CarouselPagination";
import CarouselPrev from "./CarouselPrev";
import CarouselNext from "./CarouselNext";
import "~/asset/css/Carousel.css";

type CarouselContextType = {
  index: number;
  isSmoothAnimated: boolean;
  onPrev: () => void;
  onNext: () => void;
  setIndex: (index: number) => void;
  startAutoAnimation: () => void;
  pauseAutoAnimation: () => void;
  displayCount: number;
  itemSize: number;
  length: number;
  direction: "row" | "column";
  targetRef: RefObject<HTMLDivElement> | null;
};

// 내부 컴포넌트에서 사용하는 context
// Root 컴포넌트로 감싼 후 다양한 컴포넌트를 조합해서 활용 가능
export const CarouselContext = createContext<CarouselContextType>({
  index: 0,
  isSmoothAnimated: true,
  onPrev: () => {},
  onNext: () => {},
  setIndex: (index: number) => {},
  startAutoAnimation: () => {},
  pauseAutoAnimation: () => {},
  displayCount: 0,
  itemSize: 0,
  length: 0,
  direction: "row",
  targetRef: null,
});

const Carousel = () => {};

export default Carousel;
Carousel.Root = CarouselRoot;
Carousel.Container = CarouselContainer;
Carousel.List = CarouselList;
Carousel.Prev = CarouselPrev;
Carousel.Next = CarouselNext;
Carousel.Pagination = CarouselPagination;
