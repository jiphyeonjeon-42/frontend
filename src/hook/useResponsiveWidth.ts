import { useEffect, useState } from "react";

type Props = {
  pcWidth: number;
  tabletWidth?: number;
  mobileWidth: number;
};

export const useResponsiveWidth = ({
  pcWidth,
  tabletWidth,
  mobileWidth,
}: Props) => {
  const [width, setSize] = useState(pcWidth);

  const resize = () => {
    if (window.innerWidth <= 767) setSize(tabletWidth ?? mobileWidth);
    else if (window.innerWidth <= 600) setSize(mobileWidth);
    else setSize(pcWidth);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return { width };
};
