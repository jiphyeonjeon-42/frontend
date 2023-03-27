import { HTMLProps } from "react";
import colorPalette from "../../data/color";
import "../../css/Button.css";

type Props = HTMLProps<HTMLButtonElement> & { color?: string };

const Button = ({
  type,
  className,
  color = "grey2",
  value,
  ...props
}: Props) => {
  const colorInPalette = (color?: string) => {
    const colorString = colorPalette.find(i => i.string === color)?.class;

    return `bg-color-${colorString}` || "darkgrey2";
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`button-default ${className} ${colorInPalette(color)}`}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
