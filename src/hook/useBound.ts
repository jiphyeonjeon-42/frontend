import { useEffect, useRef, useState } from "react";

const useBound = <T extends HTMLElement>() => {
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
    window.addEventListener("resize", getBound);
    window.addEventListener("scroll", getBound);
    return () => {
      window.removeEventListener("scroll", getBound);
      window.removeEventListener("resize", getBound);
    };
  }, []);

  return { targetRef, boundInfo };
};

export default useBound;
