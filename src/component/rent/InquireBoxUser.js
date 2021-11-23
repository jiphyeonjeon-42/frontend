/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "./Modal";
import DeleteButton from "../../img/x_button.svg";
import "../../css/InquireBoxUser.css";

const USER_MODAL = 1;

// const reservations = [
//   {
//     count: 1, // 예약 순위
//     endAt: "21.08.05", // 예약 혜택 종료일
//     lenderableDate: "21.08.03", // 대출가능일
//     book: {
//       info: {
//         title: "코딩도장 튜토리얼로 배우는 Python 1편 object",
//       },
//     },
//   },
//   {
//     count: 2, // 예약 순위
//     endAt: null, // 예약 혜택 종료일
//     lenderableDate: null, // 대출가능일
//     book: {
//       info: {
//         title: "먼나라 이웃나라",
//       },
//     },
//   },
// ];

const InquireBoxUser = ({ selectUser, setSelectUser }) => {
  const setUserModal = useSetRecoilState(isModalOpen);

  const openModal = () => {
    setUserModal(USER_MODAL);
  };

  const deleteUser = () => {
    if (setSelectUser) {
      setSelectUser(null);
    }
  };

  return (
    <div className="inquire-box-user">
      {selectUser ? (
        <div className="inquire-box-user-active">
          <div className="inquire-box-user__id-undo">
            <div>
              <span className="inquire-box-user__id font-28-bold color-54">
                {selectUser.login}
              </span>
              <span className="font-16 color-red">
                {selectUser.isPenalty
                  ? "연체(연체종료일: )"
                  : selectUser.lendingCnt >= 2
                  ? "대출제한(2권 이상 대출)"
                  : null}
              </span>
            </div>
            <button
              className="inquire-box-user__undo-button color-a4"
              type="button"
              onClick={deleteUser}
            >
              <img src={DeleteButton} alt="delete" />
            </button>
          </div>
          <div className="inquire-box-user__lendings">
            <div className="user__book-cnt font-18-bold color-54">
              {`대출중인 도서 (${selectUser.lendingCnt})`}
            </div>
            <div className="user__book-info">
              {selectUser.lendings.map((item, index) => (
                <div key={item.id}>
                  {index >= 1 ? (
                    <div className="user__book-info__line" />
                  ) : null}
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
          <div className="inquire-box-user__reservations">
            <div className="user__book-cnt font-18-bold color-54">
              {`예약중인 도서 (${selectUser.reservations.length})`}
            </div>
            <div className="user__book-info">
              {selectUser.reservations.map((item, index) => (
                <div key={item.id}>
                  {index >= 1 ? (
                    <div className="user__book-info__line" />
                  ) : null}
                  <div className="user__book-info__title font-18-bold color-54">
                    {`${index + 1}. ${item.book.info.title}`}
                  </div>
                  <div className="font-16 color-54">
                    <span>{`예약순위 : ${
                      item.count ? item.count : ""
                    }순위`}</span>
                    {item.lenderableDate ? (
                      <span className="user__reservations-info">
                        대출 가능일 :{" "}
                        {item.lenderableDate ? item.lenderableDate : ""}
                      </span>
                    ) : null}
                    {item.endAt ? (
                      <span className="user__reservations-info">
                        예약 혜택 종료일 : {item.endAt ? item.endAt : ""}
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
          className="inquire-box-user__add-button color-a4"
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
  setSelectUser: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  selectUser: PropTypes.object,
};
