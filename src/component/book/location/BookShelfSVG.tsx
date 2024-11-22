import { useBookContext } from "~/component/book/location/BookContext";

type BookShelfSVGProps = {
  shelfIndex: number;
};

const ShelfOne = ({ highlight }: { highlight: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="284"
      height="396"
      viewBox="0 0 284 380"
      fill="none"
    >
      <path
        key="A"
        className={`shelf-1__callSign-A callSignPath ${
          highlight === "A" ? "highlight_svg" : ""
        }`}
        d="M283.116 0.625279L283.116 198.823L283.116 396L251 350.5L31.5 350.5L141.5 197L0.499996 0.625279L283.116 0.625279Z"
        fill="#9CDF72"
      />
      <path
        key="F"
        className={`shelf-1__callSign-F callSignPath ${
          highlight === "F" ? "highlight_svg" : ""
        }`}
        d="M39.9943 54.7146L141.99 197.603L0.569934 197.608L0.576164 3.09847e-07L39.9943 54.7146Z"
        fill="#CA66E8"
      />
      <path
        key="D"
        className={`shelf-1__callSign-D callSignPath ${
          highlight === "D" ? "highlight_svg" : ""
        }`}
        d="M141.5 0.499756L0.950809 199L0.950807 0.5L141.5 0.499756Z"
        fill="#66B4E8"
        transform="translate(0, 197)"
      />
      <path
        key="I"
        className={`shelf-1__callSign-I callSignPath ${
          highlight === "I" ? "highlight_svg" : ""
        }`}
        d="M139.933 0H250.382L284 47H0L31.1095 0H139.933Z"
        fill="#F29A9A"
        transform="translate(0, 350)"
      />
    </svg>
  );
};

const ShelfTwo = ({ highlight }: { highlight: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="284"
      height="396"
      viewBox="0 0 284 380"
      fill="none"
    >
      <path
        key="G"
        className={`shelf-2__callSign-G callSignPath ${
          highlight === "G" ? "highlight_svg" : ""
        }`}
        d="M281 0V125L88.5 125L0 0H281Z"
        fill="#EBCD06"
      />
      <path
        key="B"
        className={`shelf-2__callSign-B callSignPath ${
          highlight === "B" ? "highlight_svg" : ""
        }`}
        d="M130 183L240.5 339L77 339L40 339L0.580937 395L0.580944 0.270506L130 183Z"
        fill="#B2C3BE"
      />
      <path
        key="E"
        className={`shelf-2__callSign-E callSignPath ${
          highlight === "E" ? "highlight_svg" : ""
        }`}
        d="M7.51909e-07 0.988548L192.511 0.988498L192.52 124.218L88 124.218L7.51909e-07 0.988548Z"
        fill="#884CF6"
        transform="translate(89, 124)"
      />
      <path
        key="N"
        className={`shelf-2__callSign-N callSignPath ${
          highlight === "N" ? "highlight_svg" : ""
        }`}
        d="M137.948 90.9166H239.5L175.5 0H281V147H0L39.5 90.9166H137.948Z"
        fill="#F29A9A"
        transform="translate(0, 248)"
      />
    </svg>
  );
};

const ShelfThree = ({ highlight }: { highlight: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="284"
      height="396"
      viewBox="0 0 284 380"
      fill="none"
    >
      <path
        key="K"
        className={`shelf-3_callSign-K callSignPath ${
          highlight === "K" ? "highlight_svg" : ""
        }`}
        d="M281 0V97.5H223V132V198L141 196L0 0H281Z"
        fill="#2FC949"
      />
      <path
        key="O"
        className={`shelf-3__callSign-O callSignPath ${
          highlight === "O" ? "highlight_svg" : ""
        }`}
        d="M143.5 197.5L231 323L176.5 323L176.5 394.492L0.499925 394.492L0.499923 -0.000356686L143.5 197.5Z"
        fill="#32BBD6"
      />
      <path
        key="H"
        className={`shelf-3__callSign-H callSignPath ${
          highlight === "H" ? "highlight_svg" : ""
        }`}
        d="M47.9995 166.999L0.500011 99.0001L81.4997 101.189L81.4997 0.49883L140 0.498843L140 194.5L141.5 297.999L34.4995 297.999L34.4996 225.999L88.5 225.999L47.9995 166.999Z"
        fill="#A06565"
        transform="translate(142, 97)"
      />
    </svg>
  );
};

const ShelfFour = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="201"
      height="183"
      viewBox="0 0 201 183"
      fill="none"
    >
      <path d="M0 0H200V183H0V0Z" fill="#D9D9D9" />
    </svg>
  );
};

const ShelfFive = ({ highlight }: { highlight: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="201"
      height="183"
      viewBox="0 0 201 183"
      fill="none"
    >
      <path d="M0 0H200V183H0V0Z" fill="#D9D9D9" />
      <path
        key="L"
        className={`shelf-5__callSign-L callSignPath ${
          highlight === "L" ? "highlight_svg" : ""
        }`}
        d="M1 0H201V45H1V0Z"
        fill="#9AC59E"
      />
      <path
        key="C"
        className={`shelf-5__callSign-C callSignPath ${
          highlight === "C" ? "highlight_svg" : ""
        }`}
        d="M1 45H201V93.4375H74.3906V138H37.4807H1V45Z"
        fill="#D877C4"
      />
      <rect
        key="a"
        className={`shelf-5__callSign-a callSignPath ${
          highlight === "a" ? "highlight_svg" : ""
        }`}
        x="1"
        y="138"
        width="200"
        height="45"
        fill="#70A4C7"
      />
      <path
        key="M"
        className={`shelf-5__callSign-M callSignPath ${
          highlight === "M" ? "highlight_svg" : ""
        }`}
        d="M74 93H201V138H74V93Z"
        fill="#B3B3B3"
      />
    </svg>
  );
};

const BookShelfSVG = ({ shelfIndex }: BookShelfSVGProps) => {
  const { callSignFirstChar } = useBookContext();
  const renderShelf = () => {
    switch (shelfIndex) {
      case 0:
        return <ShelfOne highlight={callSignFirstChar} />;
      case 1:
        return <ShelfTwo highlight={callSignFirstChar} />;
      case 2:
        return <ShelfThree highlight={callSignFirstChar} />;
      case 3:
        return <ShelfFour />;
      case 4:
        return <ShelfFive highlight={callSignFirstChar} />;
      default:
        return <ShelfFour />;
    }
  };

  return <>{renderShelf()}</>;
};

export default BookShelfSVG;
