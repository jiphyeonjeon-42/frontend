import {
  ComponentProps,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import Move from "~/component/utils/PaginationsMove";
import "~/asset/css/Pagination.css";

// 내부 컴포넌트에서 사용하는 context
const PaginationContext = createContext({
  page: 1,
  setPage: (_: number) => {},
  lastPage: 10,
});

type Props = {
  children: ReactNode;
  className?: string;
  page?: number;
  setPage?: (_: number) => void;
  lastPage: number;
};

const Root = ({
  page = 1,
  setPage,
  lastPage,
  className = "",
  children,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(page);

  const changePage = (page: number) => {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
    setPage && setPage(page);
  };

  return (
    <PaginationContext.Provider
      value={{
        page: currentPage,
        setPage: changePage,
        lastPage,
      }}
    >
      <div className={`pagination ${className}`}>{children}</div>
    </PaginationContext.Provider>
  );
};

const Pages = (props: { length: number }) => {
  const { page, lastPage } = useContext(PaginationContext);
  const startPage = Math.floor((page - 1) / props.length) * props.length + 1;
  const range = Array.from(
    { length: Math.min(startPage + props.length, lastPage + 1) - startPage },
    (_, i) => startPage + i,
  );

  return (
    <div className="pagination__pages">
      {range.map(i => (
        <Page key={i} number={i} />
      ))}
    </div>
  );
};

const Page = ({
  number,
  ...rest
}: ComponentProps<"button"> & { number: number }) => {
  const { page, setPage } = useContext(PaginationContext);
  return (
    <button
      {...rest}
      type="button"
      key={number}
      value={number}
      onClick={e => setPage(+e.currentTarget.value)}
      className={`pagination__page-button font-20 ${
        page === number ? "color-54" : "color-a4"
      }`}
    >
      {number}
    </button>
  );
};

const ConditionalMove = (props: {
  isVisible: boolean;
  children: ReactNode;
}) => (
  <div className="pagination__page-ranges">
    {props.isVisible ? props.children : null}
  </div>
);

const First = (props: ComponentProps<"button">) => {
  const { page, setPage } = useContext(PaginationContext);
  return (
    <Move
      {...props}
      direction="left"
      onClick={() => setPage(1)}
      isDoubled
      disabled={props.disabled || page === 1}
    />
  );
};

const Prev = (props: ComponentProps<"button">) => {
  const { page, setPage } = useContext(PaginationContext);
  return (
    <Move
      {...props}
      direction="left"
      onClick={() => setPage(page - 1)}
      disabled={props.disabled || page === 1}
    />
  );
};

const Next = (props: ComponentProps<"button">) => {
  const { page, setPage, lastPage } = useContext(PaginationContext);
  return (
    <Move
      {...props}
      direction="right"
      onClick={() => setPage(page + 1)}
      disabled={props.disabled || page === lastPage}
    />
  );
};

const Last = (props: ComponentProps<"button">) => {
  const { page, setPage, lastPage } = useContext(PaginationContext);
  return (
    <Move
      {...props}
      direction="right"
      onClick={() => setPage(lastPage)}
      isDoubled
      disabled={props.disabled || page === lastPage}
    />
  );
};

export default { Root, Pages, Page, ConditionalMove, First, Prev, Next, Last };
