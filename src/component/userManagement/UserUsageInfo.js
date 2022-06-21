/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from "prop-types";
import "../../css/UserUsageInfo.css";

const UserUsageInfo = ({ user }) => {
  const today = new Date();
  const oneWeekLater = new Date(today);
  const oneWeekAgo = new Date(today);
  const twoDaysLater = new Date(today);
  const twoDaysAgo = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const convertDatetoString = date => {
    let overDueDate = "";

    overDueDate += date.getFullYear();
    overDueDate += "-";
    overDueDate += date.getMonth() + 1 < 10 ? "0" : "";
    overDueDate += date.getMonth() + 1;
    overDueDate += "-";
    overDueDate += date.getDate();
    return overDueDate.substring(2);
  };

  return (
    <div className="user-usage-info">
      <div className="user-usage-info__nickname font-28-bold color-54">
        {user.nickname}
      </div>
      <div className="user-usage-info__lendings">
        <div className="user-usage-info__count font-18-bold color-54">
          {`대출중인 도서 (${user.lendings.length})`}
        </div>
        <div className="user-usage-info__books">
          {user.lendings.map((item, index) => (
            <div key={item.id} className="user-usage-info__book">
              <div className="user-usage-info__book-number font-18-bold color-54">
                {`${index + 1}.`}
              </div>
              <div>
                <div className="user-usage-info__book-title font-18-bold color-54">
                  {`${item.title}`}
                </div>
                {item.dueDate < today ? (
                  <div className="font-16 color-red">
                    {`반납 예정일 : ${convertDatetoString(item.dueDate)}`}
                  </div>
                ) : (
                  <div className="font-16 color-54">
                    {`반납 예정일 : ${convertDatetoString(item.dueDate)}`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="user-usage-info__reservations">
        <div className="user-usage-info__count font-18-bold color-54">
          {`예약중인 도서 (${user.reservations.length})`}
        </div>
        <div className="user-usage-info__books">
          {user.reservations.map((reservation, index) => (
            <div key={reservation?.id} className="user-usage-info__book">
              <div className="user-usage-info__book-number font-18-bold color-54">
                {`${index + 1}.`}
              </div>
              <div>
                <div className="user-usage-info__book-title font-18-bold color-54">
                  {`${reservation.title}`}
                </div>
                <div className="user-usage-info__reservation font-16 color-54">
                  <div className="user-usage-info__reservation-info">{`예약순위 : ${reservation.rank}순위`}</div>
                  {reservation.lenderableDate && (
                    <div className="user-usage-info__reservation-info font-16 color-54">
                      대출 가능일 : {reservation.lenderableDate} ~{" "}
                      {reservation.endAt}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserUsageInfo;

// UserUsageInfo.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.number,
//     role: PropTypes.number,
//     nickname: PropTypes.string,
//     email: PropTypes.string,
//     penaltyEndDay: PropTypes. ,
//     lendings: PropTypes.arrayOf(PropTypes.object),
//     reservations: PropTypes.arrayOf(PropTypes.object),
//   }).isRequired,
// };
