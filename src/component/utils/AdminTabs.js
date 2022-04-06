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

const AdminTabs = () => {
  const [onFocus, setFocus] = useState("/rent");
  useEffect(() => {
    setFocus(location.pathname);
  }, [location.pathname]);
  return (
    <section className="admin-tabs-wrapper">
      <div className="admin-tabs">
        <AdminTab tabName="대출" tabLink="/rent" tabFocus={onFocus} />
        <AdminTab
          tabName="예약대출"
          tabLink="/reservation"
          tabFocus={onFocus}
        />
        <AdminTab tabName="반납" tabLink="/return" tabFocus={onFocus} />
        <AdminTab tabName="도서등록" tabLink="/addBook" tabFocus={onFocus} />
      </div>
      <div className="admin-tabs-line" />
    </section>
  );
};

AdminTab.propTypes = {
  tabName: PropTypes.string.isRequired,
  tabLink: PropTypes.string.isRequired,
  tabFocus: PropTypes.string.isRequired,
};

export default AdminTabs;
