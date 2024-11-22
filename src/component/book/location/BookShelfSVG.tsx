import { useBookContext } from "~/component/book/location/BookContext";

type BookShelfSVGProps = {
  shelfIndex: number;
};

const ShelfOne = ({ highlight }: { highlight: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        key="F"
        className={`shelf-1__callSign-F ${
          highlight === "F" ? "highlight_svg" : ""
        }`}
        d="M30 54.5L103.864 197.827L0.561546 197.827L0.561545 0.5L30 54.5Z"
        fill="#CA66E8"
        transform="translate(0, 0)"
      />

      <path
        key="D"
        className={`shelf-1__callSign-D ${
          highlight === "D" ? "highlight_svg" : ""
        }`}
        d="M103.5 0L0.198035 195L0.198035 0L103.5 0Z"
        fill="#66B4E8"
        transform="translate(0, 197.827)"
      />

      <path
        key="A"
        className={`shelf-1__callSign-A ${
          highlight === "A" ? "highlight_svg" : ""
        }`}
        d="M203 0.300628L203 198.498L203 391L177.5 343.498L24 343.498L102 196.5L0 0.309986L203 0.300628Z"
        fill="#9CDF72"
        transform="translate(0, 0)"
      />

      <path
        key="I"
        className={`shelf-1__callSign-I ${
          highlight === "I" ? "highlight_svg" : ""
        }`}
        d="M102.5 0.5H180.5L207.057 47.75H0.942978L25.5 0.5H102.5Z"
        fill="#F29A9A"
        transform="translate(0, 340)" // 391
      />
    </svg>
  );
};

const ShelfTwo = ({ highlight }: { highlight: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        key="G"
        className={`shelf-2__callSign-G ${
          highlight === "G" ? "highlight_svg" : ""
        }`}
        d="M206 0V90L47.8838 88.5246L0 0H206Z"
        fill="#EBCD06"
        transform="translate(0, 0)"
      />

      <path
        key="B"
        className={`shelf-2__callSign-B ${
          highlight === "B" ? "highlight_svg" : ""
        }`}
        d="M106 196.991L183.5 348.5L75 348.5L26 348.5L0.72099 392.984L0.721001 0.984595L106 196.991Z"
        fill="#D9D9D9"
        transform="translate(0, 0)"
      />

      <path
        key="E"
        className={`shelf-2__callSign-E ${
          highlight === "E" ? "highlight_svg" : ""
        }`}
        d="M7.12603e-05 0.010019L158.501 0.00987865L158.501 219.5L115.137 219.5L7.12603e-05 0.010019Z"
        fill="#884CF6"
        transform="translate(47, 88)"
      />

      <path
        key="N"
        className={`shelf-2__callSign-N ${
          highlight === "N" ? "highlight_svg" : ""
        }`}
        d="M101.557 42H182.5L161 0H206.114V89.25H0L24.557 42H101.557Z"
        fill="#F29A9A"
        transform="translate(0, 305)"
      />
    </svg>
  );
};

const ShelfThree = ({ highlight }: { highlight: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        key="K"
        className={`shelf-3_callSign-K ${
          highlight === "K" ? "highlight_svg" : ""
        }`}
        d="M206 0V127.5H165.5V195.5H101.5L0 0H206Z"
        fill="#2FC949"
        transform="translate(0, 0)"
      />

      <path
        key="H"
        className={`shelf-3__callSign-H ${
          highlight === "H" ? "highlight_svg" : ""
        }`}
        d="M29.3196 125.691L1.5 71.1911L64.633 71.1911L64.6319 0.190785L106 0.191435L104.752 163.884L104.754 269.693L0.0611791 268.498L0.0603305 220.003L77.8974 220.004L29.3196 125.691Z"
        fill="#A06565"
        transform="translate(100, 124)"
      />

      <path
        key="O"
        className={`shelf-3__callSign-O ${
          highlight === "O" ? "highlight_svg" : ""
        }`}
        d="M103.629 199.103L180 346.5L101.198 346.507L101.194 394.638L0.732013 394.647L0.795687 0.612423L103.629 199.103Z"
        fill="#32BBD6"
        transform="translate(0, 0)"
      />
    </svg>
  );
};

const ShelfFour = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect x="0" y="0" width="206" height="196" fill="#2FC949" />
    </svg>
  );
};

const ShelfFive = ({ highlight }: { highlight: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233 198" fill="none">
      <rect width="233" height="198" fill="white" fill-opacity="0.298" />
      <rect
        key="L"
        className={`shelf-5__callSign-L ${
          highlight === "L" ? "highlight_svg" : ""
        }`}
        width="233"
        height="50"
        fill="#9AC59E"
      />
      <rect
        key="M"
        className={`shelf-5__callSign-M ${
          highlight === "M" ? "highlight_svg" : ""
        }`}
        x="82"
        y="100"
        width="151"
        height="50"
        fill="#B3B3B3"
      />
      <rect
        key="a"
        className={`shelf-5__callSign-a ${
          highlight === "a" ? "highlight_svg" : ""
        }`}
        y="148"
        width="233"
        height="50"
        fill="#70A4C7"
      />
      <path
        key="C"
        className={`shelf-5__callSign-C ${
          highlight === "C" ? "highlight_svg" : ""
        }`}
        d="M0 50H233V101.042H85.5V148H42.5H0V50Z"
        fill="#D877C4"
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
