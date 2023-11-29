import { useState } from "react";
import { useGetBooksCreate } from "~/api/books/useGetBooksCreate";

import RegisterBookWithUsersExtraInput from "./AddBookRegisterBookWithUsersExtraInput";
import DisplayBasicBookInfo from "./AddBookDisplayBasicBookInfo";
import Tabs from "../utils/Tabs";
import Image from "../utils/Image";
import Banner from "../utils/Banner";
import BarcodeReader from "../utils/BarcodeReader";
import InquireBoxTitle from "../utils/InquireBoxTitle";

import { bookManagementTabList } from "~/constant/tablist";
import Book from "~/asset/img/admin_icon.svg";
import "~/asset/css/AddBook.css";

const AddBook = () => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);
  const defaultBook = {
    isbn: "",
    title: "제목",
    image: "",
    author: "",
    publisher: "",
    pubdate: "",
    category: "",
  };

  const { bookInfo, errorMessage, fetchData, setBookInfo } =
    useGetBooksCreate(defaultBook);

  const toggleBarcodeReader = () => {
    setUsingBarcodeReader(!isUsingBarcodeReader);
  };

  const toDoAfterRead = (text: string) => {
    fetchData(text);
    setUsingBarcodeReader(false);
  };

  return (
    <main>
      <Banner img="admin" titleKo="도서 신규 등록" titleEn="ADD BOOK" />
      <Tabs tabList={bookManagementTabList} />
      <section className="add-book__wrapper">
        {isUsingBarcodeReader && (
          <BarcodeReader toDoAfterRead={toDoAfterRead} />
        )}
        <InquireBoxTitle
          Icon={Book}
          titleKO="도서 등록"
          titleEN="Add Book"
          placeHolder="isbn을 입력해주세요. 바코드 버튼을 클릭하면 리더기를 끄고 킬 수 있습니다."
          setQuery={fetchData}
          isWithBarcodeButton
          onClickBarcodeButton={toggleBarcodeReader}
        />
        <div className="inquire-box add-book">
          <p>{errorMessage}</p>
          <div className="add-book__basic-info">
            <div className="add-book__basic-info__cover">
              <Image src={bookInfo.image} alt={bookInfo.title} />
            </div>
            <div className="add-book__basic-info__detail">
              <DisplayBasicBookInfo
                bookInfo={bookInfo}
                setBookInfo={setBookInfo}
              />
            </div>
          </div>
          <RegisterBookWithUsersExtraInput bookInfo={bookInfo} />
        </div>
      </section>
    </main>
  );
};

export default AddBook;
