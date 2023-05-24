import { DragEventHandler, ReactNode, cloneElement, useRef } from "react";
import "../../css/Draggable.css";

type Props = {
  className?: string;
  children: ReactNode;
  dragData: {
    format: string;
    data: string;
  };
};
const Draggable = ({ children, className, dragData }: Props) => {
  const registerDataTransfer: DragEventHandler = e => {
    e.dataTransfer.setData(dragData.format, dragData.data);
  };
  return (
    <span
      className={`draggable ${className}`}
      onDragStart={registerDataTransfer}
      draggable
    >
      {children}
    </span>
  );
};

export default Draggable;
