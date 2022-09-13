import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/Tabs.css";

const Tabs = ({ tabList }) => {
  const [onFocus, setFocus] = useState("");
  const location = useLocation();

  useEffect(() => {
    setFocus(location.pathname);
  }, [location.pathname]);

  return (
    <section className="tabs-wrapper">
      <div className="tabs">
        {tabList.map(tab => (
          <Link
            className={`tab tab-${tab?.link === onFocus ? "on" : "not"}-focus`}
            to={{ pathname: `${tab?.link}` }}
          >
            {tab?.name}
          </Link>
        ))}
      </div>
      <div className="tabs-line" />
    </section>
  );
};

Tabs.propTypes = {
  tabList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Tabs;
