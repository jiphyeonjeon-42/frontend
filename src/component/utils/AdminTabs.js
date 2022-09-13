/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/AdminTabs.css";

const AdminTab = ({ tabName, tabLink, tabFocus }) => {
  return (
    <Link
      className={`admin-tab tab-${tabLink === tabFocus ? "on" : "not"}-focus`}
      to={{ pathname: `${tabLink}` }}
    >
      {tabName}
    </Link>
  );
};

const AdminTabs = ({ tabList }) => {
  const [onFocus, setFocus] = useState("/rent");
  useEffect(() => {
    setFocus(location.pathname);
  }, [location.pathname]);
  return (
    <section className="admin-tabs-wrapper">
      <div className="admin-tabs">
        {tabList.map(tab => (
          <AdminTab tabName={tab.name} tabLink={tab.link} tabFocus={onFocus} />
        ))}
      </div>
      <div className="admin-tabs-line" />
    </section>
  );
};

AdminTabs.propTypes = {
  tabList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

AdminTab.propTypes = {
  tabName: PropTypes.string.isRequired,
  tabLink: PropTypes.string.isRequired,
  tabFocus: PropTypes.string.isRequired,
};

export default AdminTabs;
