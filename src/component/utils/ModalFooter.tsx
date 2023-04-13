import { useRef, useEffect } from "react";
import "../../css/ModalFooter.css";

type ModalFooterProps = {
  align?: string;
  numberOfButtons?: number;
  firstButtonColor?: string;
  firstButtonOnClick?(...args: unknown[]): unknown;
  firstButtonText?: string;
  secondButtonColor?: string;
  secondButtonOnClick?(...args: unknown[]): unknown;
  secondButtonText?: string;
  isFirstButtonFocusedOnMount?: boolean;
};

const ModalFooter = ({
  align,
  numberOfButtons,
  firstButtonOnClick,
  firstButtonText,
  firstButtonColor,
  secondButtonOnClick,
  secondButtonText,
  secondButtonColor,
  isFirstButtonFocusedOnMount,
}: ModalFooterProps) => {
  const firstRef = useRef(null);
  const buttonAlign = () => {
    if (align === "center") return align;
    return "right";
  };
  const buttonColor = color => {
    const candidate = ["red", "grey"];
    if (candidate.includes(color)) return color;
    return "grey";
  };
  const buttonConfig = [
    {
      color: firstButtonColor,
      text: firstButtonText,
      onClick: firstButtonOnClick,
    },
    {
      color: secondButtonColor,
      text: secondButtonText,
      onClick: secondButtonOnClick,
    },
  ];

  useEffect(() => {
    if (isFirstButtonFocusedOnMount) firstRef.current.focus();
  }, []);

  return (
    <div className={`modal__footer ${buttonAlign()}`}>
      {buttonConfig.map((button, index) => {
        if (index > numberOfButtons - 1) return null;
        return (
          <button
            key={!index ? "first" : "second"}
            type="button"
            className={buttonColor(button.color)}
            onClick={button.onClick}
            ref={!index ? firstRef : null}
          >
            {button.text}
          </button>
        );
      })}
    </div>
  );
};

ModalFooter.defaultProps = {
  align: "right",
  numberOfButtons: 0,
  firstButtonColor: "red",
  firstButtonOnClick: undefined,
  firstButtonText: "확인하기",
  secondButtonColor: "grey",
  secondButtonOnClick: undefined,
  secondButtonText: "취소하기",
  isFirstButtonFocusedOnMount: false,
};

export default ModalFooter;
