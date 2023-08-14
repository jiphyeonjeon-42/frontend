import { User } from "../../type";
import { lendingRestriction } from "../../util/date";
import Image from "../utils/Image";
import UserUsage from "../../asset/img/book-arrow-right.svg";
import UserEdit from "../../asset/img/edit.svg";
import "../../asset/css/UserBriefInfo.css";

const roles = ["미인증", "일반", "사서", "운영진"];
const USAGE = 1;
const EDIT = 2;

type Props = {
  user: User;
  line: boolean;
  setModal(...args: unknown[]): unknown;
  setSelectedUser(...args: unknown[]): unknown;
};

const UserBriefInfo = ({ user, line, setModal, setSelectedUser }: Props) => {
  const nowDay = new Date();
  const openUsageModal = () => {
    setSelectedUser(user);
    setModal(USAGE);
  };
  const openEditModal = () => {
    setSelectedUser(user);
    setModal(EDIT);
  };

  const { isRestricted, restrictionDate } = lendingRestriction(user);

  return (
    <div className={`user-info ${line ? "user-info-line" : ""}`}>
      <div className="user-info__id font-18-bold color-54">{user.id}</div>
      <div className="user-info__nickname font-18-bold color-54">
        {user.nickname ? user.nickname : "-"}
      </div>
      {user.role ? (
        <div className="user-info__role font-18 color-54">
          {roles[user.role]}
        </div>
      ) : (
        <div className="user-info__role font-18 color-red">
          {roles[user.role]}
        </div>
      )}
      <div className="user-info__email font-18-bold color-54">{user.email}</div>
      <div className="user-info__overdue font-18 color-54">
        {isRestricted ? restrictionDate : "-"}
      </div>
      {user.nickname ? (
        <button
          className="user-info__button"
          type="button"
          onClick={openUsageModal}
        >
          <Image className="user-info__button-img" src={UserUsage} alt="" />
        </button>
      ) : (
        <div className="user-info__usage font-18 color-54">-</div>
      )}
      <button
        className="user-info__button"
        type="button"
        onClick={openEditModal}
      >
        <Image className="user-info__button-img" src={UserEdit} alt="" />
      </button>
    </div>
  );
};

export default UserBriefInfo;
