import { FormEventHandler, useCallback, useState, useRef } from "react";
import Button from "../utils/Button";
import { usePostLendingsMultiple } from "../../api/lendings/usePostLendingsMultiple";
import { Book, User } from "../../type";
import "../../asset/css/RentModalConfirm.css";
import { userRoleStatusEnum } from "~/constant/status";
import RentModalBooks from "./RentModalBooks";

type Props = {
  selectedUser: User;
  selectedBooks: Book[];
  setSelectedUser: (user: User) => void;
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  closeModal: () => void;
};

const RentModalConfirm = ({
  selectedUser,
  selectedBooks,
  setSelectedUser,
  setSelectedBooks,
  closeModal,
}: Props) => {
  const remarksRef = useRef<string[]>([]);
  const [isRentable, setIsRentable] = useState(false);

  const { requestLending } = usePostLendingsMultiple({
    selectedBooks,
    selectedUser,
    setSelectedBooks,
    setSelectedUser,
    closeModal,
  });

  const postData: FormEventHandler = e => {
    e.preventDefault();
    requestLending(remarksRef.current);
  };

  const handleRemarkChange = useCallback(
    (index: number, value: string) => {
      remarksRef.current = [...remarksRef.current];
      remarksRef.current[index] = value;

      const newIsRentable =
        selectedBooks.length > 1
          ? remarksRef.current
              .slice(0, selectedBooks.length)
              .every(remark => remark?.length > 0)
          : remarksRef.current[0]?.length > 0;
      setIsRentable(newIsRentable);
    },
    [selectedBooks.length],
  );

  return (
    <form className="rent-modal">
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        {selectedUser && (
          <div className="rent-modal__user__detail">
            <p className="rent-modal__user__id font-28-bold color-54">
              {selectedUser.nickname
                ? selectedUser.nickname
                : selectedUser.email}
            </p>
            <p className="font-16 color-54">{`현재 대출권수 ( ${
              selectedUser.lendings.length
            } / ${
              selectedUser.role >= userRoleStatusEnum["사서"] ? "4" : "2"
            } )`}</p>
          </div>
        )}
      </div>
      <RentModalBooks
        selectedBooks={selectedBooks}
        handleRemarkChange={handleRemarkChange}
        remarksRef={remarksRef}
      />
      <div className="rent-modal__buttons">
        <Button
          type="submit"
          value="대출 완료하기"
          onClick={postData}
          disabled={!isRentable}
          color={isRentable ? "red" : "lightgrey2"}
        />
        <Button
          value="취소하기"
          className="rent-modal__cancel"
          onClick={closeModal}
        />
      </div>
    </form>
  );
};

export default RentModalConfirm;
