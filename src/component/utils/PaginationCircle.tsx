import { ComponentProps } from "react";
import "~/asset/css/PaginationCircle.css";

type Props = ComponentProps<"div"> & {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
};

const PaginationCircle = ({
  page,
  setPage,
  lastPage,
  className,
  ...rest
}: Props) => {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div {...rest} className={`pagination-circle__wrapper ${className}`}>
      {pages.map(p => (
        <button
          key={p}
          type="button"
          className={`pagination-circle__circle ${p === page && "selected"}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default PaginationCircle;
