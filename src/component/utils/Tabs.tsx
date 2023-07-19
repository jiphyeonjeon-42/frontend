import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../asset/css/Tabs.css";

type Props = {
  tabList: object[];
};

const Tabs = ({ tabList }: Props) => {
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
            key={tab.link}
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

export default Tabs;
