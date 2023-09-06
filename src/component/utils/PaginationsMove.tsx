import { ComponentProps } from "react";
import Image from "~/component/utils/Image";
import ArrRight from "~/asset/img/arrow_right_black.svg";
import ArrRightDouble from "~/asset/img/arrow_right_black_double.svg";

type Props = ComponentProps<"button"> & {
  alt?: string;
  isDoubled?: boolean;
  direction?: "left" | "right";
};

const PaginationsMove = ({
  alt,
  isDoubled = false,
  direction = "left",
  className,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      type="button"
      className={`pagination__page-range-button ${
        direction === "left" ? "reverse" : ""
      } ${className}`}
    >
      <Image
        className={`${direction === "left" ? "reverse" : ""} ${
          isDoubled ? "double" : ""
        }`}
        src={isDoubled ? ArrRightDouble : ArrRight}
        alt={alt}
      />
    </button>
  );
};

export default PaginationsMove;
