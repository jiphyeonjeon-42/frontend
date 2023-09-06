import { ComponentProps, useContext } from "react";
import { CarouselContext } from "~/component/utils/Carousel";

const CarouselPrev = ({ className, ...rest }: ComponentProps<"button">) => {
  const { onPrev, startAutoAnimation, pauseAutoAnimation } =
    useContext(CarouselContext);

  return (
    <button
      {...rest}
      onClick={onPrev}
      className={`carousel__prev ${className}`}
      onMouseOver={pauseAutoAnimation}
      onMouseLeave={startAutoAnimation}
    />
  );
};

export default CarouselPrev;
