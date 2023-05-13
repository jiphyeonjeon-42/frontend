import "../../css/SpanWithLabel.css";

type Props = {
  wrapperClassName?: string;
  labelText?: string;
  value?: string | number;
  align?: string;
};

const SpanWithLabel = ({
  wrapperClassName,
  labelText,
  value,
  align,
}: Props) => {
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

SpanWithLabel.defaultProps = {
  wrapperClassName: "",
  labelText: "",
  align: "",
  value: "",
};
