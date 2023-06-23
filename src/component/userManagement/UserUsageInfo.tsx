import { User } from "../../type";
import { dateFormat, dateLessThan } from "../../util/date";
import "../../asset/css/UserUsageInfo.css";

type Props = {
  user: User;
};

const UserUsageInfo = ({ user }: Props) => {
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
          {user.lendings.map((lending, index) => (
            <div className="user-usage-info__book" key={lending.id}>
              <div className="user-usage-info__book-number font-18-bold color-54">
                {`${index + 1}.`}
              </div>
              <div>
                <div className="user-usage-info__book-title font-18-bold color-54">
                  {`${lending.title}`}
                </div>
                {
                  // TODO Get /users/search 에서 받은 데이터 lending.duedate DTO 정리되면 수정 요청 필요 dueDate duedate 혼용중
                  lending.duedate && (
                    <div
                      className={`font-16 color-${
                        dateLessThan(lending.duedate) ? "54" : "red"
                      }`}
                    >
                      {`반납 예정일 : ${dateFormat(lending.duedate)}`}
                    </div>
                  )
                }
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
            <div className="user-usage-info__book" key={reservation.id}>
              <div className="user-usage-info__book-number font-18-bold color-54">
                {`${index + 1}.`}
              </div>
              <div>
                <div className="user-usage-info__book-title font-18-bold color-54">
                  {`${reservation.title}`}
                </div>
                <div className="user-usage-info__reservation font-16 color-54">
                  <div className="user-usage-info__reservation-info">{`예약순위 : ${reservation.ranking}순위`}</div>
                  {reservation.lenderableDate && (
                    <div className="user-usage-info__reservation-info font-16 color-54">
                      {`대출 가능일 : ${dateFormat(
                        reservation.lenderableDate,
                      )} ~ ${dateFormat(reservation.endAt)}`}
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
