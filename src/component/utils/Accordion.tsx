import { ReactNode, useEffect, useState } from "react";
import Image from "./Image";
import Plus from "../../asset/img/plus_icon_off.svg";
import Minus from "../../asset/img/plus_icon_on.svg";
import Arrow from "../../asset/img/arrow_right_black.svg";
import "../../asset/css/Accordion.css";

export type Props = {
  initialOpened?: boolean;
  summaryButtonClassName?: string;
  summaryIconClassName?: string;
  summaryIconType?: "plus" | "arrow";
  summaryIconPosition?: "start" | "end";
  summaryUI: ReactNode;
  detailUI: ReactNode;
  dependencyOpened?: boolean;
  onChange?: (isOpened: boolean) => void;
  fixed?: boolean;
};

const Accordion = ({
  initialOpened = false,
  summaryIconType,
  summaryIconPosition = "start",
  summaryButtonClassName,
  summaryIconClassName,
  summaryUI,
  detailUI,
  dependencyOpened,
  onChange,
  fixed = false,
}: Props) => {
  const [isOpened, setIsOpened] = useState(initialOpened);

  useEffect(() => {
    if (dependencyOpened !== undefined) {
      setIsOpened(dependencyOpened);
    }
  }, [dependencyOpened]);

  const toggleOpened = () => {
    if (fixed) return;

    const updateState = !isOpened;
    if (typeof onChange === "function") {
      onChange(updateState);
    }
    setIsOpened(updateState);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleOpened}
        className={`accordion__wrapper ${summaryButtonClassName} ${summaryIconPosition}`}
      >
        {summaryIconType === "plus" ? (
          <Image
            src={isOpened ? Plus : Minus}
            className={summaryIconClassName}
            alt="클릭하면 펼쳐집니다"
          />
        ) : (
          <Image
            src={Arrow}
            className={`accordion__arrow ${isOpened} ${summaryIconClassName}`}
            alt="클릭하면 펼쳐집니다"
          />
        )}
        {summaryUI}
      </button>
      {isOpened ? detailUI : null}
    </>
  );
};

export default Accordion;
