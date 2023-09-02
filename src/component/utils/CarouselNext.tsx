import { ComponentProps, useContext } from "react";
import { CarouselContext } from "~/component/utils/Carousel";

const CarouselNext = ({ className, ...rest }: ComponentProps<"button">) => {
  const { onNext, startAutoAnimation, pauseAutoAnimation } =
    useContext(CarouselContext);

  return (
    <button
      {...rest}
      onClick={onNext}
      className={`carousel__next ${className}`}
      onMouseOver={pauseAutoAnimation}
      onMouseLeave={startAutoAnimation}
    />
  );
};

export default CarouselNext;
