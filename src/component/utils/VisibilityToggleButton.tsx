import { MouseEvent, ButtonHTMLAttributes } from "react";
import Edit from "../../asset/img/edit.svg";
import Image from "./Image";
import "../../asset/css/VisibilityToggleButton.css";

interface VisibilityToggleButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  id: string;
  name: string;
  isVisible: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const VisibilityToggleButton = ({
  isVisible,
  id,
  name,
  ...props
}: VisibilityToggleButtonProps) => {
  return (
    <button
      {...props}
      className={`visibility-toggle-button__wrapper ${props.className}`}
      type="button"
      id={id}
      name={name}
      value={`${isVisible}`}
    >
      <p
        className={`visibility-button__text ${
          isVisible ? "color-54" : "color-red"
        }`}
      >
        {isVisible ? "-" : "비공개"}
      </p>
      <Image src={Edit} alt="공개여부 수정" />
    </button>
  );
};

export default VisibilityToggleButton;
