import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "~/component/utils/SearchBar";
import BookSearchPreview from "~/component/utils/BookSearchPreview";
import BookSearchRecentKeyword from "~/component/utils/BookSearchRecentKeywords";

const BookSearchBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [params] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const goToSearchPage: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const searchWord = e.currentTarget.input.value;
    navigate(`/search?search=${encodeURIComponent(searchWord)}`);
  };

  useEffect(() => {
    const currentKeyword = params.get("search");
    setKeyword(currentKeyword || "");
  }, [params]);

  return (
    <SearchBar onSubmit={goToSearchPage}>
      <SearchBar.Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onFocus={() => setIsOpened(true)}
        ref={ref}
      />
      <SearchBar.DropDown
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        searchBarRef={ref}
      >
        {keyword.length == 0 ? (
          <BookSearchRecentKeyword />
        ) : (
          <BookSearchPreview />
        )}
      </SearchBar.DropDown>
      <SearchBar.Button />
    </SearchBar>
  );
};

export default BookSearchBar;
