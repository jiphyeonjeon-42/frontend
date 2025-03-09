import { useState } from "react";
import { useModal } from "../../hook/useModal";
import { rentTabList } from "../../constant/tablist";
import { Book, User } from "../../type";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentInquireBoxUser from "./RentInquireBoxUser";
import RentInquireBoxBook from "./RentInquireBoxBook";
import RentConfirm from "./RentConfirm";
import RentModalConfirm from "./RentModalConfirm";
import LoginIcon from "../../asset/img/login_icon_white.svg";
import BookIcon from "../../asset/img/admin_icon.svg";
import "../../asset/css/Rent.css";
import { useAtomValue } from "jotai";
import { userAtom } from "~/atom/userAtom";
import { lendingLimit } from "../../constant/status";

/**
 * `Rent` 컴포넌트는 도서 대출 기능을 제공하는 페이지입니다.
 *
 * @description
 *
 * 유의점:
 * - 사서의 대출권수 4권으로 설정. 사서 본인의 대출건만 4권으로 적용
 *
 * 상태:
 * - `selectedUser`: 대출해줄 사용자 정보
 * - `selectedBooks`: 대출해줄 도서 목록
 *
 * 훅:
 * - `useModal`: 모달 창 열기 및 닫기 기능 제공
 * - 'useRecoilValue`: Recoil 상태 관리 라이브러리에서 현재 사용자 정보 가져오기
 *
 * @returns 도서 대출 페이지를 렌더링하는 JSX 요소
 */

const Rent = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const { Modal, setOpen: openModal, setClose: closeModal } = useModal();
  const currentUser = useAtomValue(userAtom);
  const lendingLimitNumber = lendingLimit(currentUser, selectedUser);

  return (
    <main>
      <Banner img="admin" titleKo="대출" titleEn="RENT BOOK" />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={LoginIcon}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <RentInquireBoxUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </section>
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={BookIcon}
          titleKO="도서 정보"
          titleEN="Book info"
        />
        {selectedBooks.length > 0
          ? selectedBooks.map((book, index) => (
              <RentInquireBoxBook
                key={book.bookId}
                book={book}
                shape={selectedBooks.length - index === 1 ? "two" : "none"}
                selectedBooks={selectedBooks}
                setSelectedBooks={setSelectedBooks}
              />
            ))
          : null}
        {selectedBooks.length < lendingLimitNumber ? (
          <RentInquireBoxBook
            book={null}
            shape={selectedBooks.length === 0 ? "two" : "four"}
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
          />
        ) : null}
      </section>
      <RentConfirm
        selectedUser={selectedUser}
        selectedBooks={selectedBooks}
        openModal={openModal}
      />
      {selectedUser && selectedBooks.length > 0 ? (
        <Modal>
          <RentModalConfirm
            selectedUser={selectedUser}
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
            setSelectedUser={setSelectedUser}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </main>
  );
};

export default Rent;
