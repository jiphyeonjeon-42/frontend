import { ComponentProps, useContext } from "react";
import { CarouselContext } from "~/component/utils/Carousel";

/**
 * 슬라이드 리스트를 감싸는 컴포넌트
 * item의 크기를 결정하고, 슬라이드 애니메이션을 위한 컨테이너 역할을 한다.
 * 반드시 Carousel.Root 컴포넌트로 감싸져야 한다.
 */

const CarouselContainer = ({
  className,
  children,
  ...rest
}: ComponentProps<"div">) => {
  const { targetRef, startAutoAnimation, pauseAutoAnimation } =
    useContext(CarouselContext);
  return (
    <div
      {...rest}
      className={`carousel__container ${className}`}
      ref={targetRef}
      onMouseEnter={pauseAutoAnimation}
      onMouseLeave={startAutoAnimation}
    >
      {children}
    </div>
  );
};

export default CarouselContainer;
