import useModal from "../../hook/useModal";
import { dateFormat } from "../../util/date";
import { User } from "../../type";
import RentModalUser from "./RentModalUser";
import Image from "../utils/Image";
import DeleteButton from "../../asset/img/x_button.svg";
import "../../asset/css/RentInquireBoxUser.css";

type Props = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

const InquireBoxUser = ({ selectedUser, setSelectedUser }: Props) => {
  const { setOpen, setClose, Modal } = useModal();

  const deleteUser = () => {
    if (setSelectedUser) {
      setSelectedUser(null);
    }
  };

  const displayPenalty = () => {
    if (!selectedUser) return "";
    let penalty = "";
    if (
      new Date(selectedUser.penaltyEndDate).setHours(0, 0, 0, 0) >=
        new Date().setHours(0, 0, 0, 0) ||
      selectedUser.overDueDay > 0
    )
      penalty += "대출제한 (연체";
    if (selectedUser.lendings.length >= 2) {
      if (penalty !== "") penalty += ", 2권 이상 대출";
      else penalty += "대출제한 (2권 이상 대출";
    }
    if (penalty !== "") penalty += ")";
    return penalty;
  };

  return (
    <div className="rent__inquire-box-user">
      {selectedUser ? (
        <div className="rent__inquire-box-user-active">
          <div className="rent__inquire-box-user__id-undo">
            <div className="rent__inquire-box-user__id color-54">
              {selectedUser.nickname
                ? selectedUser.nickname
                : selectedUser.email}
            </div>
            <div className="font-16 color-red"> {displayPenalty()} </div>
            <button
              className="rent__inquire-box-user__undo-button color-a4"
              type="button"
              onClick={deleteUser}
            >
              <Image src={DeleteButton} alt="delete" />
            </button>
          </div>
          <div className="rent__inquire-box-user__lendings">
            <div className="user__book-cnt color-54">
              {`대출중인 도서 (${selectedUser.lendings.length})`}
            </div>
            <div className="user__book-info__total">
              {selectedUser.lendings.map((item, index) => (
                <div key={item.userId} className="user__book-info">
                  <div className="user__book-info__title color-54">
                    {`${index + 1}. ${item.title}`}
                  </div>
                  <div className="user__book-info__description color-54">
                    {`반납 예정일 : ${dateFormat(item.dueDate)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rent__inquire-box-user__reservations">
            <div className="user__book-cnt color-54">
              {`예약중인 도서 (${selectedUser.reservations.length})`}
            </div>
            <div className="user__book-info__total">
              {selectedUser.reservations.map((item, index) => (
                <div key={item.id} className="user__book-info">
                  <div className="user__book-info__title color-54">
                    {`${index + 1}. ${item.title}`}
                  </div>
                  <div className="user__book-info__description color-54">
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
          onClick={setOpen}
        >
          +
        </button>
      )}
      <Modal>
        <RentModalUser
          setSelectedUser={setSelectedUser}
          closeModal={setClose}
        />
      </Modal>
    </div>
  );
};

export default InquireBoxUser;
