import "../../asset/css/UserUsageInfo.css";

type Props = {
  user: {
    id?: number;
    email?: string;
    nickname?: string;
    intraId?: number;
    slack?: string;
    penaltyEndDate?: string;
    overDueDay?: string;
    role?: number;
    reservations?: {
      ranking?: number;
      endAt?: unknown;
      lenderableDate?: unknown;
      title?: string;
    }[];
    lendings?: {
      duedate?: string;
      title?: string;
    }[];
  };
};

const UserUsageInfo = ({ user }: Props) => {
  const today = new Date();

  const convertDatetoString = date => {
    let stringDate = "";

    stringDate += date.getFullYear();
    stringDate += "-";
    stringDate += date.getMonth() + 1 < 10 ? "0" : "";
    stringDate += date.getMonth() + 1;
    stringDate += "-";
    stringDate += date.getDate() < 10 ? "0" : "";
    stringDate += date.getDate();
    return stringDate;
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
          {user.lendings.map((lending, index) => (
            <div className="user-usage-info__book">
              <div className="user-usage-info__book-number font-18-bold color-54">
                {`${index + 1}.`}
              </div>
              <div>
                <div className="user-usage-info__book-title font-18-bold color-54">
                  {`${lending.title}`}
                </div>
                {lending.duedate.substring(0, 10) <
                convertDatetoString(today) ? (
                  <div className="font-16 color-red">
                    {`반납 예정일 : ${lending.duedate.substring(0, 10)}`}
                  </div>
                ) : (
                  <div className="font-16 color-54">
                    {`반납 예정일 : ${lending.duedate.substring(0, 10)}`}
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
            <div className="user-usage-info__book">
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
                      대출 가능일 :{" "}
                      {convertDatetoString(reservation.lenderableDate)} ~{" "}
                      {convertDatetoString(reservation.endAt)}
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
