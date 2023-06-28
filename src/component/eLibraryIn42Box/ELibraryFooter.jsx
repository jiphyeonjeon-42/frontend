import { Link } from "react-router-dom";
import ELibraryTitleWithMore from "./ELibraryTitleWithMore";
import GithubLogo from "../../asset/img/github.svg";

const ELibraryFooter = () => {
  return (
    <div className="elibrary__footer">
      <ELibraryTitleWithMore title="공지" />
      <div className="elibrary__footer__links">
        <Link to="/information">이용안내</Link>
        <a
          href="https://42born2code.slack.com/archives/C0174FTH8N6"
          className="elibrary__footer__slack"
        >
          #42seoul_club_42jiphyeonjeon
        </a>
        <a
          href="https://github.com/jiphyeonjeon-42"
          className="elibrary__footer__github-logo"
        >
          <img src={GithubLogo} alt="github" />
          Github
        </a>
      </div>
      <div className="elibrary__footer__copyright">
        Copyright ⓒ JIP HYEON JEON.
        <br />
        All rights reserved.
      </div>
    </div>
  );
};

export default ELibraryFooter;
