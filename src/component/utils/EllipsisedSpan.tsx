import { HTMLAttributes, useState } from "react";
import "../../css/EllipsisedSpan.css";

const EllipsisedSpan = (props: Partial<HTMLAttributes<HTMLSpanElement>>) => {
  const [isEllipsised, setIsEllipsised] = useState(true);
  const toggleElipsis = () => {
    setIsEllipsised(!isEllipsised);
  };
  return (
    <span
      {...props}
      className={`ellipsised-span__wrapper ${isEllipsised ? "" : "unfolded" } ${
        props.className
      }`}
      onClick={toggleElipsis}
    ></span>
  );
};

export default EllipsisedSpan;
