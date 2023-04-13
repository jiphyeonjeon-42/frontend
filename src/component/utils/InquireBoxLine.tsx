import "../../css/InquireBoxLine.css";

type InquireBoxLineProps = {
  children: React.ReactNode;
};

const InquireBoxLine = ({ children }: InquireBoxLineProps) => {
  return <div className="inquire-line__wrapper">{children}</div>;
};

export default InquireBoxLine;
