import { ComponentProps, forwardRef } from "react";

export type Props = Omit<ComponentProps<"input">, "onSubmit">;
const SearchBarInput = forwardRef<HTMLInputElement, Props>(
  ({ ...rest }, ref) => {
    return (
      <input
        {...rest}
        id="input"
        className="search-bar__input"
        required
        type="text"
        autoComplete="off"
        ref={ref}
      />
    );
  },
);

export default SearchBarInput;
