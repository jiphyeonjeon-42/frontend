import { ReactNode } from "react";
import "../../css/ManagementListItem.css";

type ManagementListItemProps = {
  children: ReactNode;
  className?: string;
};

const ManagementListItem = ({
  children,
  className,
}: ManagementListItemProps) => {
  return <div className={`management__list-item ${className}`}>{children}</div>;
};

export default ManagementListItem;
