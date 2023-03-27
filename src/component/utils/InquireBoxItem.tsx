import React from "react";
import "../../css/InquireBoxItem.css";

type Props = {
  keyString: string;
  value: string | number;
};

const InquireBoxItem = ({ keyString, value }: Props) => {
  return (
    <span key={keyString} className={`inquire-item__${keyString}`}>
      {value}
    </span>
  );
};

export default InquireBoxItem;
