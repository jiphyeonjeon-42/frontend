import { useGetBooksInfoNew } from "../../api/books/useGetBooksInfoNew";
import ELibraryBook from "./ELibraryBook";
import ELibraryTitleWithMore from "./ELibraryTitleWithMore";
const ELibraryNew = () => {
  const { bookList } = useGetBooksInfoNew({ setOpenTitleAndMessage: () => {} });
  return (
    <>
      <ELibraryTitleWithMore title="신착자료" />
      <div className="elibrary__new-books">
        {bookList?.slice(0, 4)?.map(book => (
          <ELibraryBook book={book} key={book.id} />
        ))}
      </div>
    </>
  );
};

export default ELibraryNew;
