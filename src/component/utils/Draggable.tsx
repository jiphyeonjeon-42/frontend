import { DragEventHandler, HTMLAttributes, HTMLProps, ReactNode } from "react";
import "../../css/Draggable.css";

type Props = HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  children: ReactNode;
  dragData: {
    format: string;
    data: string;
  };
};

const Draggable = ({ children, className, dragData, ...rest }: Props) => {
  const registerDataTransfer: DragEventHandler = e => {
    e.dataTransfer.setData(dragData.format, dragData.data);
  };
  return (
    <span
      {...rest}
      className={`draggable ${className}`}
      onDragStart={registerDataTransfer}
      draggable
    >
      {children}
    </span>
  );
};

export default Draggable;
