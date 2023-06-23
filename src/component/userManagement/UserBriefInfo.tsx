import Image from "../utils/Image";
import UserUsage from "../../asset/img/book-arrow-right.svg";
import UserEdit from "../../asset/img/edit.svg";
import "../../asset/css/UserBriefInfo.css";
import { User } from "../../type";
import { addDay, dateLessThan } from "../../util/date";

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

  const restrictionDate =
    // penaltyEndDate : 이미 반납한 대출건의 연체제한
    // overDueDay: 대출중인 도서의 연체일, 오늘 반납시 받게 될 penaltyEndDate 계산용
    !user.penaltyEndDate || dateLessThan(user.penaltyEndDate)
      ? addDay(user.overDueDay) // 오늘 날짜 + 반납시 받게 될 연체일
      : addDay(user.overDueDay, user.penaltyEndDate); // 연체 제한일 + 반납시 받게 될 연체일

  return (
    <div className={`user-info ${line ? "user-info-line" : ""}`}>
      <div className="user-info__id font-18-bold color-54">{user.id}</div>
      <div className="user-info__nickname font-18-bold color-54">
        {user.nickname ? user.nickname : "-"}
      </div>
      <div
        className={`user-info__role font-18 color-${user.role ? "54" : "red"}`}
      >
        {roles[user.role]}
      </div>
      <div className="user-info__email font-18-bold color-54">{user.email}</div>
      <div className="user-info__overdue font-18 color-54">
        {!dateLessThan(restrictionDate) ? restrictionDate : "-"}
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
