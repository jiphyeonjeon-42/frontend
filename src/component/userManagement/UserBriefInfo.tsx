import Image from "../utils/Image";
import UserUsage from "../../img/book-arrow-right.svg";
import UserEdit from "../../img/edit.svg";
import "../../css/UserBriefInfo.css";
import { User } from "../../types";

const roles = ["미인증", "일반", "사서", "운영진"];
const USAGE = 1;
const EDIT = 2;

type UserBriefInfoProps = {
  user: User;
  line: boolean;
  setModal(...args: unknown[]): unknown;
  setSelectedUser(...args: unknown[]): unknown;
};

const UserBriefInfo = ({
  user,
  line,
  setModal,
  setSelectedUser,
}: UserBriefInfoProps) => {
  const nowDay = new Date();
  const openUsageModal = () => {
    setSelectedUser(user);
    setModal(USAGE);
  };
  const openEditModal = () => {
    setSelectedUser(user);
    setModal(EDIT);
  };

  const concatDate = (day: Date) => {
    let overDueDate = "";

    day.setDate(day.getDate() + user.overDueDay);
    overDueDate += day.getFullYear();
    overDueDate += "-";
    overDueDate += day.getMonth() + 1 < 10 ? "0" : "";
    overDueDate += day.getMonth() + 1;
    overDueDate += "-";
    overDueDate += day.getDate() < 10 ? "0" : "";
    overDueDate += day.getDate();
    return overDueDate;
  };

  const getOverDueDate = () => {
    if (
      !user.penaltyEndDate ||
      new Date(user.penaltyEndDate).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
    ) {
      return concatDate(nowDay);
    }
    return concatDate(new Date(user.penaltyEndDate));
  };

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
        {user.overDueDay ||
        (user.penaltyEndDate &&
          new Date(user.penaltyEndDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0))
          ? getOverDueDate()
          : "-"}
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
