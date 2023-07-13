import { useRef, useCallback, useEffect } from "react";

export const useDebounce = () => {
  const timer = useRef(null);
  const debounce = useCallback((callbackFunction, delay) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callbackFunction();
      timer.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer);
    };
  }, []);
  return debounce;
};

