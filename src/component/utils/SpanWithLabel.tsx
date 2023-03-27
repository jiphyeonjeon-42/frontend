/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import "../../css/SpanWithLabel.css";

type Props = {
  wrapperClassName?: string;
  labelText?: string;
  value: string | number;
  align?: string;
};

const defaultProps = {
  wrapperClassName: "",
  labelText: "",
  align: "",
  value: "",
};

const SpanWithLabel = (props: Props) => {
  const { wrapperClassName, labelText, value, align } = {
    ...defaultProps,
    ...props,
  };
  const alignType = () => {
    const candidate = ["horizontal", "vertical"];
    if (candidate.includes(align)) return align;
    return "horizontal";
  };
  return (
    <div className={`span__wrapper ${alignType()} ${wrapperClassName} `}>
      {labelText?.length > 0 && (
        <label className="span__label" htmlFor="text">
          {labelText}
        </label>
      )}
      <span id="text" className="span__text">
        {value}
      </span>
    </div>
  );
};

export default SpanWithLabel;
