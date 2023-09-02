import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { useBound } from "~/hook/useBound";

type TooltipProps = {
  className?: string;
  children: ReactNode;
  description: string;
};

const Tooltip = ({ children, description, className }: TooltipProps) => {
  const [isDisplayed, setDisplayed] = useState(false);
  const { boundInfo, targetRef } = useBound<HTMLDivElement>({
    hasResizeEvent: true,
    hasScrollEvent: true,
  });

  const displayTooltip = () => setDisplayed(true);
  const hiddenTooltip = () => setDisplayed(false);

  const portal = document.getElementById("portal");
  return (
    <div
      ref={targetRef}
      onMouseOver={displayTooltip}
      onMouseOut={hiddenTooltip}
      style={{ cursor: "help" }}
      className={className}
    >
      {children}
      {isDisplayed && portal
        ? createPortal(
            <div
              style={{
                position: "fixed",
                top: boundInfo.top + boundInfo.height,
                left: boundInfo.left,
                backgroundColor: "rgba(00,00,00,0.6)",
                padding: "4px",
                zIndex: 100,
              }}
            >
              <span style={{ color: "white" }}>{description}</span>
            </div>,
            portal,
          )
        : null}
    </div>
  );
};

export default Tooltip;
