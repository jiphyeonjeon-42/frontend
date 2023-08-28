import { useEffect, useRef, useState } from "react";

type Props = {
  hasResizeEvent?: boolean;
  hasScrollEvent?: boolean;
};

export const useBound = <T extends HTMLElement>({
  hasResizeEvent = true,
  hasScrollEvent = false,
}: Props) => {
  const [boundInfo, setBoundInfo] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });
  const targetRef = useRef<T>(null);

  const getBound = () => {
    if (targetRef.current !== null)
      setBoundInfo(targetRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    getBound();
    if (hasResizeEvent) window.addEventListener("resize", getBound);
    if (hasScrollEvent) window.addEventListener("scroll", getBound);
    return () => {
      if (hasScrollEvent) window.removeEventListener("scroll", getBound);
      if (hasResizeEvent) window.removeEventListener("resize", getBound);
    };
  }, []);

  return { targetRef, boundInfo };
};
