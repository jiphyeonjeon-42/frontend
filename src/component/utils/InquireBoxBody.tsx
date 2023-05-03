import "../../css/InquireBoxBody.css";

type Props = {
  children: React.ReactNode
  className: string
}

const InquireBoxBody = ({
  children,
  className
}: Props) => {
  return <div className={`inquire-body__wrapper ${className}`}>{children}</div>;
};

export default InquireBoxBody;
