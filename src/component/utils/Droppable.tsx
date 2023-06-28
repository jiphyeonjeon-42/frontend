import { DragEventHandler, HTMLAttributes, ReactNode, useState } from "react";
import "../../asset/css/Droppable.css";

type Props = HTMLAttributes<HTMLDivElement> & {
  format?: string;
  children: ReactNode;
};
const Droppable = ({
  format = "text/plain",
  children,
  className,
  ...rest
}: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const setDragOverTrue: DragEventHandler = e => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const setDragOverFalse: DragEventHandler = e => {
    e.preventDefault();
    setIsDragOver(false);
  };
  return (
    <div
      className={`droppable ${className} ${isDragOver ? "over" : ""}`}
      {...rest}
      onDragOver={setDragOverTrue}
      onDragLeave={setDragOverFalse}
    >
      {children}
    </div>
  );
};

export default Droppable;
