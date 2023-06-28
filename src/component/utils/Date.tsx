import "../../asset/css/Date.css";

type DateProps = {
  className?: string;
  date: string;
};
const Date = ({ date, className }: DateProps) => {
  return (
    <span className={`date__wrapper ${className}`}>
      <span className="date__year">{date.slice(0, 5)}</span>
      <span className="date__date">{date.slice(5, 10)}</span>
    </span>
  );
};

export default Date;
