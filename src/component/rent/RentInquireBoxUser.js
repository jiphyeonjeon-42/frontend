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

  const displayPenalty = () => {
    if (selectedUser.isPenalty) return "연체(연체종료일: )";
    return selectedUser.lendingCnt >= 2 ? "대출제한(2권 이상 대출)" : null;
  };

  return (
    <div className="rent__inquire-box-user">
      {selectedUser ? (
        <div className="rent__inquire-box-user-active">
          <div className="rent__inquire-box-user__id-undo">
            <div>
              <span className="rent__inquire-box-user__id font-28-bold color-54">
                {selectedUser.login}
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
              {`대출중인 도서 (${selectedUser.lendingCnt})`}
            </div>
            <div className="user__book-info__total">
              {selectedUser.lendings.map((item, index) => (
                <div key={item.id} className="user__book-info">
                  <div className="user__book-info__title font-18-bold color-54">
                    {`${index + 1}. ${item.book.info.title}`}
                  </div>
                  <div className="font-16 color-54">
                    {`반납 예정일 : ${item.dueDate}`}
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
                    {`${index + 1}. ${item.book.info.title}`}
                  </div>
                  <div className="font-16 color-54">
                    <span>{`예약순위 : ${
                      item.count ? `${item.count}순위` : "-"
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
    is: PropTypes.number,
    login: PropTypes.string,
    isPenalty: PropTypes.bool,
    lendingCnt: PropTypes.number,
    lendings: PropTypes.number,
    reservations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setMidModalContents: PropTypes.func.isRequired,
};
