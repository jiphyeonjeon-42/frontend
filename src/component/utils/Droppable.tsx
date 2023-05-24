import { DragEventHandler, HTMLAttributes, ReactNode, useState } from "react";
import "../../css/Droppable.css";

type Props = HTMLAttributes<HTMLDivElement> & {
  format?: string;
  onDropped: (data: string) => void;
  children: ReactNode;
};
const Droppable = ({
  format = "text/plain",
  onDropped,
  children,
  className,
  ...rest
}: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const setDropEffect: DragEventHandler = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const data = e.dataTransfer.getData(format);
    onDropped(data);
  };

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
      onDrop={setDropEffect}
      onDragOver={setDragOverTrue}
      onDragLeave={setDragOverFalse}
    >
      {children}
    </div>
  );
};

export default Droppable;
