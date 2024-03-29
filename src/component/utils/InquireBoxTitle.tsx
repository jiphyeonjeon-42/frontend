import Image from "./Image";
import ManagementSearchBar from "./ManagementSearchBar";
import "../../asset/css/InquireBoxTitle.css";

type Props = {
  Icon: string;
  titleKO: string;
  titleEN: string;
  KOsize?: string;
  ENsize?: string;
  placeHolder?: string;
  setQuery?(...args: unknown[]): unknown;
  isWithBarcodeButton?: boolean;
  onClickBarcodeButton?(...args: unknown[]): unknown;
};

const InquireBoxTitle = ({
  Icon,
  titleKO,
  titleEN,
  KOsize,
  ENsize,
  placeHolder,
  setQuery,
  isWithBarcodeButton,
  onClickBarcodeButton,
}: Props) => {
  return (
    <div className="inquire-box-title">
      <Image
        className={`inquire-box-title__icon ${placeHolder && "short"}`}
        src={Icon}
        alt="icon"
      />
      <span
        className={`inquire-box-title__text ${placeHolder && "short"} color-ff`}
      >
        <span
          className={`inquire-box-title__kr ${
            placeHolder && "short"
          } ${KOsize}`}
        >
          {titleKO}
        </span>
        <span
          className={`inquire-box-title__en ${
            placeHolder && "short"
          } ${ENsize}`}
        >
          {titleEN}
        </span>
      </span>
      {placeHolder ? (
        <ManagementSearchBar
          placeHolder={placeHolder}
          width="short"
          setQuery={setQuery}
          isWithBarcodeButton={isWithBarcodeButton}
          onClickBarcodeButton={onClickBarcodeButton}
        />
      ) : null}
    </div>
  );
};

InquireBoxTitle.defaultProps = {
  KOsize: "font-28-bold",
  ENsize: "font-16",
  placeHolder: "",
  setQuery: undefined,
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
};

export default InquireBoxTitle;
