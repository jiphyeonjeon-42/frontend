import {
  FormEventHandler,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "~/component/utils/SearchBar";
import BookSearchPreview from "~/component/utils/BookSearchPreview";
import BookSearchRecentKeyword from "~/component/utils/BookSearchRecentKeywords";

const BookSearchBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [keyword, setKeyword] = useState("");
  const searchWord = useDeferredValue(keyword);
  const [params] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const goToSearchPage: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const searchWord = e.currentTarget.input.value;
    const storageSaved = localStorage.getItem("recent") || "[]";
    const recentKeywords = JSON.parse(storageSaved);
    if (!recentKeywords.includes(searchWord)) {
      recentKeywords.unshift(searchWord);
      localStorage.setItem("recent", JSON.stringify(recentKeywords));
    }
    navigate(`/search?search=${encodeURIComponent(searchWord)}`);
    e.currentTarget.input.blur();
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
        maxLength={80}
      />
      <SearchBar.DropDown
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        searchBarRef={ref}
      >
        {keyword.length == 0 ? (
          <BookSearchRecentKeyword />
        ) : (
          <BookSearchPreview keyword={searchWord} key={searchWord} />
        )}
      </SearchBar.DropDown>
      <SearchBar.Button />
    </SearchBar>
  );
};

export default BookSearchBar;
