import "../../css/RentModalUserList.css";

type UserListProps = {
  setSelectedUser(...args: unknown[]): unknown;
  closeModal(...args: unknown[]): unknown;
  // eslint-disable-next-line react/forbid-prop-types
  user: object;
};

const UserList = ({ user, setSelectedUser, closeModal }: UserListProps) => {
  const seletUser = () => {
    setSelectedUser(user);
    closeModal();
  };

  const displayPenalty = () => {
    let penalty = "";
    if (
      new Date(user.penaltyEndDate).setHours(0, 0, 0, 0) >=
        new Date().setHours(0, 0, 0, 0) ||
      user.overDueDay > 0
    )
      penalty += "대출 불가 (연체";
    if (user.lendings.length >= 2) {
      if (penalty !== "") penalty += ", 2권 이상 대출";
      else penalty += "대출 불가 (2권 이상 대출";
    }
    if (penalty !== "") penalty += ")";
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
      disabled={isLendable ? "" : "disabled"}
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
