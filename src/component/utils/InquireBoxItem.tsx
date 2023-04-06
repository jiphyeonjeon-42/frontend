import "../../css/InquireBoxItem.css";

type InquireBoxItemProps = {
  keyString: string;
  value: number | string;
};

const InquireBoxItem = ({ keyString, value }: InquireBoxItemProps) => {
  return (
    <span key={keyString} className={`inquire-item__${keyString}`}>
      {value}
    </span>
  );
};

export default InquireBoxItem;
