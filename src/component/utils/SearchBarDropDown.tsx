import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import "~/asset/css/SearchBarDropDown.css";

type Props = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  searchBarRef: RefObject<HTMLInputElement>;
  children: ReactNode;
};
const SearchBarDropDown = ({
  isOpened,
  setIsOpened,
  searchBarRef,
  children,
}: Props) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeWhenClickedOutside = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        dropDownRef.current &&
        !searchBarRef.current.contains(e.target as Node) &&
        !dropDownRef.current.contains(e.target as Node)
      )
        setIsOpened(false);
    };

    const closeWithEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpened(false);
    };

    document.addEventListener("click", closeWhenClickedOutside);
    document.addEventListener("keydown", closeWithEsc);
    return () => {
      document.removeEventListener("click", closeWhenClickedOutside);
      document.removeEventListener("keydown", closeWithEsc);
    };
  }, []);

  if (isOpened)
    return (
      <div ref={dropDownRef} className="search-bar__dropdown">
        {children}
      </div>
    );
  return null;
};

export default SearchBarDropDown;
