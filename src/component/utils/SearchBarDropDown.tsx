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
    const updateDropdownVisibility = (e: MouseEvent) => {
      const clickedNode = e.target as Node;
      const isInsideClicked =
        searchBarRef.current?.contains(clickedNode) ||
        dropDownRef.current?.contains(clickedNode);

      setIsOpened(isInsideClicked ?? false);
    };

    const closeWithEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpened(false);
    };

    document.addEventListener("click", updateDropdownVisibility);
    document.addEventListener("keydown", closeWithEsc);
    return () => {
      document.removeEventListener("click", updateDropdownVisibility);
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
