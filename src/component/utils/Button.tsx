import colorPalette from "../../data/color";
import "../../css/Button.css";

type ButtonProps = {
  type?: string;
  value: string;
  className?: string;
  color?: string;
  onClick?(...args: unknown[]): unknown;
  disabled?: boolean;
};

const Button = ({
  type,
  value,
  className,
  onClick,
  disabled,
  color,
}: ButtonProps) => {
  const colorInPalette = string => {
    const colorString = colorPalette.find(i => i.string === string)?.class;
    return `bg-color-${colorString}` || color("darkgrey2");
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`button-default ${className} ${colorInPalette(color)}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: undefined,
  className: "",
  color: "grey2",
  onClick: () => {},
  disabled: false,
};
