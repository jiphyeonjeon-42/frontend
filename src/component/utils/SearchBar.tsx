import { ComponentProps } from "react";
import SearchBarInput from "~/component/utils/SearchBarInput";
import SearchBarButton from "~/component/utils/SearchBarButton";
import SearchBarDropDown from "~/component/utils/SearchBarDropDown";
import "~/asset/css/SearchBar.css";

export type Props = ComponentProps<"form"> & {
  width?: "banner" | "center" | "short" | "long";
};

const SearchBar = ({
  width = "banner",
  className = "",
  onSubmit,
  children,
  ...rest
}: Props) => {
  return (
    <form
      {...rest}
      className={`search-bar__wrapper ${width} ${className}`}
      onSubmit={e => {
        e.preventDefault();
        onSubmit && onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

export default SearchBar;

SearchBar.Input = SearchBarInput;
SearchBar.Button = SearchBarButton;
SearchBar.DropDown = SearchBarDropDown;
