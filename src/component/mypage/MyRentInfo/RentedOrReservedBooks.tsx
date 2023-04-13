import useDialog from "../../../hook/useDialog";
import usePatchReservationsCancel from "../../../api/reservations/usePatchReservationsCancel";
import Image from "../../utils/Image";
import { isNumber } from "../../../util/typeCheck";
import "../../../css/RentedOrReservedBooks.css";

type RentedOrReservedBooksProps = {
  componentMode: string;
  bookInfoArr?: object[];
};

const RentedOrReservedBooks = ({
  componentMode,
  bookInfoArr,
}: RentedOrReservedBooksProps) => {
  if (!bookInfoArr) return null;
  const { setOpen, defaultConfig, setConfig, Dialog, setOpenTitleAndMessage } =
    useDialog();
  const { setReservationId } = usePatchReservationsCancel({
    setOpen,
    setConfig,
    defaultConfig,
    setOpenTitleAndMessage,
  });
  return (
    <div className="mypage-books_box">
      <Dialog />
      {bookInfoArr &&
        bookInfoArr.map(bookInfo => (
          <div key={bookInfo.title} className="mypage-books_box-wrapper">
            <Image
              className="mypage-books_box-image"
              src={bookInfo.image}
              alt={bookInfo.image}
            />
            <div className="mypage-books_box-all_info">
              <div className="mypage-books_box-all_info-book_info">
                <div className="mypage-books_box-all_info-book_info-title font-18-bold color-2d">
                  {bookInfo.title && bookInfo.title.length < 22
                    ? bookInfo.title
                    : null}
                  {bookInfo.title && bookInfo.title.length >= 22
                    ? bookInfo.title.slice(0, 22).concat("...")
                    : null}
                </div>
                <div className="font-14">
                  {bookInfo.author && bookInfo.author.length < 14
                    ? bookInfo.author
                    : null}
                  {bookInfo.author && bookInfo.author.length >= 14
                    ? bookInfo.author.slice(0, 14).concat("...")
                    : null}
                </div>
              </div>
              {componentMode === "rent" ? (
                <>
                  <div className="mypage-books_box-all_info-rent_info font-14">
                    <div>대출일시</div>
                    <div>
                      {bookInfo.lendDate ? bookInfo.lendDate.slice(0, 10) : "-"}
                    </div>
                    <div>반납기한</div>
                    <div>
                      {bookInfo.duedate ? bookInfo.duedate.slice(0, 10) : "-"}
                    </div>
                    <div>연체일</div>
                    <div>
                      {bookInfo.overDueDay ? `${bookInfo.overDueDay}일` : "-"}
                    </div>
                    <div>비고</div>
                    <div>
                      {bookInfo.lendingCondition
                        ? bookInfo.lendingCondition
                        : "-"}
                    </div>
                  </div>
                  <div className="mypage-books_box-all_info-reserve_count font-14">
                    <div>예약</div>
                    <div>
                      {bookInfo.reservedNum ? `${bookInfo.reservedNum}명` : "-"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mypage-books_box-all_info-rent_info font-14">
                    <div>예약일시</div>
                    <div>
                      {bookInfo.reservationDate
                        ? bookInfo.reservationDate.slice(0, 10)
                        : "-"}
                    </div>
                    <div>예약만료</div>
                    <div>
                      {bookInfo.endAt ? bookInfo.endAt.slice(0, 10) : "-"}
                    </div>
                    <div>예약순위</div>
                    <div>
                      {bookInfo.ranking ? `${bookInfo.ranking}위` : "-"}
                    </div>
                  </div>
                  <button
                    className="mypage-books_box-cancel_reserve font-14"
                    type="button"
                    onClick={() => {
                      if (isNumber(bookInfo?.reservationId))
                        setReservationId(bookInfo.reservationId);
                    }}
                  >
                    예약 취소
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

RentedOrReservedBooks.defaultProps = {
  bookInfoArr: null,
};

export default RentedOrReservedBooks;
