import colorPalette from "../../data/color";
import "../../css/Button.css";
import { HTMLProps } from "react";

type Palette = typeof colorPalette[number]["string"];

type Props = {
  type?: "submit" | "button";
  value: string;
  color?: Palette;
} & HTMLProps<HTMLButtonElement>;

const Button = ({
  type,
  value,
  className,
  color = "grey2",
  ...args
}: Props) => {
  return (
    <button
      {...args}
      type={type}
      className={`button-default ${className} bg-color-${color}`}
    >
      {value}
    </button>
  );
};

export default Button;
