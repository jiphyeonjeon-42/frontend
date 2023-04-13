import PropTypes from "prop-types";
import "../../css/InquireBoxLine.css";

const InquireBoxLine = ({ children }) => {
  return <div className="inquire-line__wrapper">{children}</div>;
};

export default InquireBoxLine;
InquireBoxLine.propTypes = {
  children: PropTypes.node.isRequired,
};
