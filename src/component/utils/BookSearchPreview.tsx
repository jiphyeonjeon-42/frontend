import { useGetBooksInfoAutoComplete } from "~/api/books/useGetBooksInfoAutoComplete";
import { BookInfo } from "~/type";
import BookSearchPreviewList from "~/component/utils/BookSearchPreviewList";
import EmphasisInString from "./EmphasisInString";

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
              <p className="search-preview__book__title">
                <EmphasisInString wholeString={book.title} emphasis={keyword} />
              </p>
              <span className="search-preview__book__author">
                <EmphasisInString
                  wholeString={book.author}
                  emphasis={keyword}
                />
              </span>
              <span className="search-preview__book__publisher">
                <EmphasisInString
                  wholeString={book.publisher}
                  emphasis={keyword}
                />
              </span>
            </>
          );
        }}
      />
    </div>
  );
};

export default BookSearchPreview;
