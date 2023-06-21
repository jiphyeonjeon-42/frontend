import { useState } from "react";
import { otherManagementTabList } from "../../data/tablist";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import SuperTagSelectedBook from "./SuperTagSelectedBook";
import SuperTagMerge from "./SuperTagMerge";
import SuperTagSearchBookModal from "./SuperTagSearchBookModal";
import { Book } from "../../types";

const SuperTagManagement = () => {
  const [book, setBook] = useState<Book | null>(null);
  const resetBook = () => setBook(null);

  return (
    <main>
      <Banner img="admin" titleKo="태그 관리" titleEn="TAG MANAGEMENT" />
      <Tabs tabList={otherManagementTabList} />
      <SuperTagSelectedBook book={book} resetBook={resetBook} />
      {book === null ? (
        <SuperTagSearchBookModal setBook={setBook} />
      ) : (
        <SuperTagMerge book={book} />
      )}
    </main>
  );
};

export default SuperTagManagement;
