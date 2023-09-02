import { ComponentProps, useContext } from "react";
import { CarouselContext } from "~/component/utils/Carousel";

type Props = {
  render: (props: {
    page: number;
    setPage: (page: number) => void;
    lastPage?: number;
  }) => JSX.Element;
} & ComponentProps<"div">;

/**
 * 임의의 페이지로 이동하기 위한 페이지네이션 컴포넌트
 * @param render - 페이지네이션 UI를 렌더링하는 함수
 * 반드시 Carousel.Root 컴포넌트로 감싸져야 한다.
 */
const CarouselPagination = ({ render }: Props) => {
  const { index, setIndex, length } = useContext(CarouselContext);
  return render({
    page: index,
    setPage: setIndex,
    lastPage: length,
  });
};

export default CarouselPagination;
