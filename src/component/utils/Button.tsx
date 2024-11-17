import colorPalette from "../../constant/color";
import "../../asset/css/Button.css";
import { HTMLProps, memo } from "react";

type Palette = (typeof colorPalette)[number]["string"];

export type Props = {
  type?: "submit" | "button";
  value: string;
  color?: Palette;
} & HTMLProps<HTMLButtonElement>;

export const Button = ({
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

export default memo(Button);
