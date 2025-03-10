import { User } from "../../type";
import "../../asset/css/RentModalUserList.css";
import { useAtomValue } from "jotai";
import { userAtom } from "~/atom/userAtom";
import { lendingLimit } from "../../constant/status";

type Props = {
  setSelectedUser: (user: User) => void;
  closeModal: () => void;
  user: User;
};

const UserList = ({ user, setSelectedUser, closeModal }: Props) => {
  const currentUser = useAtomValue(userAtom);

  const isOverDue = (selectedUser: User) => {
    if (
      new Date(selectedUser.penaltyEndDate).setHours(0, 0, 0, 0) >=
        new Date().setHours(0, 0, 0, 0) ||
      selectedUser.overDueDay > 0
    )
      return true;
    else return false;
  };

  const seletUser = () => {
    user.isPenalty = isOverDue(user) ? true : false;
    setSelectedUser(user);
    closeModal();
  };

  const displayPenalty = () => {
    let penalty = "";
    user.isPenalty && (penalty += "대출 불가 (연체");

    const lendingLimitNumber = lendingLimit(currentUser, user);

    if (user.lendings.length >= lendingLimitNumber) {
      if (user.isPenalty) penalty += `, ${lendingLimitNumber}권 이상 대출`;
      else penalty += `대출 불가 (${lendingLimitNumber}권 이상 대출`;
    }

    if (user.isPenalty || user.lendings.length >= lendingLimitNumber)
      penalty += ")";

    return penalty;
  };

  const displayErrorPermission = () => {
    return !user.role ? "대출 불가 (미인증)" : "";
  };

  const isLendable =
    displayPenalty().length === 0 && displayErrorPermission().length === 0;

  return (
    <button
      className={`rent__user-list ${
        isLendable ? "color-54" : "disabled color-a4"
      }`}
      type="button"
      onClick={seletUser}
      disabled={!isLendable}
    >
      <div className="rent__user-list__name">
        <div className="font-18-bold rent__text-ellipsis">
          {user.nickname ? user.nickname : user.email}
        </div>
      </div>
      <div
        className={`rent__user-list__penalty ${
          isLendable ? "available" : "disabled"
        } font-16`}
      >
        {isLendable
          ? `대출 중인 도서 : ${user.lendings.length}권`
          : displayErrorPermission() || displayPenalty()}
      </div>
    </button>
  );
};

export default UserList;
