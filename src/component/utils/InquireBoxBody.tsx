import "../../css/InquireBoxBody.css";

type InquireBoxBodyProps = {
  children: React.ReactNode
  className: string
}

const InquireBoxBody = ({
  children,
  className
}: InquireBoxBodyProps) => {
  return <div className={`inquire-body__wrapper ${className}`}>{children}</div>;
};

export default InquireBoxBody;
