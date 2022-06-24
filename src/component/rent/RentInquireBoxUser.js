import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../../img/x_button.svg";
import "../../css/RentInquireBoxUser.css";

const InquireBoxUser = ({
  selectedUser,
  setSelectedUser,
  setMidModalContents,
}) => {
  const openModal = () => {
    setMidModalContents("inquire user");
  };

  const deleteUser = () => {
    if (setSelectedUser) {
      setSelectedUser(null);
    }
  };

  const displayDate = strDate => {
    const date = new Date(strDate);
    return `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth()
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  };

  const displayPenalty = () => {
    if (new Date(selectedUser.penaltyEndDate) > Date.now())
      return `연체(연체종료일: ${displayDate(selectedUser.penaltyEndDate)}) `;
    return selectedUser.lendings.length >= 2 ? "대출제한(2권 이상 대출)" : null;
  };

  return (
    <div className="rent__inquire-box-user">
      {selectedUser ? (
        <div className="rent__inquire-box-user-active">
          <div className="rent__inquire-box-user__id-undo">
            <div>
              <span className="rent__inquire-box-user__id font-28-bold color-54">
                {selectedUser.nickname
                  ? selectedUser.nickname
                  : selectedUser.email}
              </span>
              <span className="font-16 color-red"> {displayPenalty()} </span>
            </div>
            <button
              className="rent__inquire-box-user__undo-button color-a4"
              type="button"
              onClick={deleteUser}
            >
              <img src={DeleteButton} alt="delete" />
            </button>
          </div>
          <div className="rent__inquire-box-user__lendings">
            <div className="user__book-cnt font-18-bold color-54">
              {`대출중인 도서 (${selectedUser.lendings.length})`}
            </div>
            <div className="user__book-info__total">
              {selectedUser.lendings.map((item, index) => (
                <div key={item.userId} className="user__book-info">
                  <div className="user__book-info__title font-18-bold color-54">
                    {`${index + 1}. ${item.title}`}
                  </div>
                  <div className="font-16 color-54">
                    {`반납 예정일 : ${displayDate(item.duedate)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rent__inquire-box-user__reservations">
            <div className="user__book-cnt font-18-bold color-54">
              {`예약중인 도서 (${selectedUser.reservations.length})`}
            </div>
            <div className="user__book-info__total">
              {selectedUser.reservations.map((item, index) => (
                <div key={item.id} className="user__book-info">
                  <div className="user__book-info__title font-18-bold color-54">
                    {`${index + 1}. ${item.title}`}
                  </div>
                  <div className="font-16 color-54">
                    <span>{`예약순위 : ${
                      item.ranking ? `${item.ranking}순위` : "-"
                    }`}</span>
                    {item.endAt ? (
                      <span className="user__reservations-info">
                        예약 혜택 종료일 : {item.endAt}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          className="rent__inquire-box-user__add-button color-a4"
          type="button"
          onClick={openModal}
        >
          +
        </button>
      )}
    </div>
  );
};

export default InquireBoxUser;

InquireBoxUser.propTypes = {
  selectedUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number,
    lendings: PropTypes.arrayOf(PropTypes.object),
    nickname: PropTypes.string,
    penaltyEndDate: PropTypes.string,
    reservations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setMidModalContents: PropTypes.func.isRequired,
};
