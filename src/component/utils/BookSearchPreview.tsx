import { useGetBooksInfoAutoComplete } from "~/api/books/useGetBooksInfoAutoComplete";
import { BookInfo } from "~/type";
import BookSearchPreviewList from "~/component/utils/BookSearchPreviewList";

export type BookPreviewType = Omit<BookInfo, "category">;

type Props = {
  keyword: string;
};

const BookSearchPreview = ({ keyword }: Props) => {
  const { books } = useGetBooksInfoAutoComplete();

  return (
    <div className="search-preview__wrapper">
      <BookSearchPreviewList
        keyword={keyword}
        books={books}
        bookUI={({ book }) => {
          return (
            <>
              <p className="search-preview__book__title">{book.title}</p>
              <span className="search-preview__book__author">
                {book.author}
              </span>
              <span className="search-preview__book__publisher">
                {book.publisher}
              </span>
            </>
          );
        }}
      />
    </div>
  );
};

export default BookSearchPreview;
