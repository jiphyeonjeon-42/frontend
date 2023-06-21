import {
  DragEventHandler,
  HtmlHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import "../../css/DragZone.css";
type Props = Partial<HtmlHTMLAttributes<HTMLDivElement>> & {
  children: ReactNode;
};
const DragZone = ({ children }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const setDraggingOn: DragEventHandler = e => {
    setIsDragging(true);
  };
  const setDraggingOff: MouseEventHandler = e => {
    setIsDragging(false);
  };

  return (
    <div
      className={`drag-zone ${isDragging && "dragging"}`}
      onDragStart={setDraggingOn}
      onMouseUp={setDraggingOff}
    >
      {children}
    </div>
  );
};

export default DragZone;
