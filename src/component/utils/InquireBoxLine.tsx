import "../../css/InquireBoxLine.css";

type Props = {
  children: React.ReactNode;
};

const InquireBoxLine = ({ children }: Props) => {
  return <div className="inquire-line__wrapper">{children}</div>;
};

export default InquireBoxLine;
