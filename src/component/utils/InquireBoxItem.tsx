import "../../asset/css/InquireBoxItem.css";

type Props = {
  keyString: string;
  value: number | string;
};

const InquireBoxItem = ({ keyString, value }: Props) => {
  return (
    <span key={keyString} className={`inquire-item__${keyString}`}>
      {value}
    </span>
  );
};

export default InquireBoxItem;
