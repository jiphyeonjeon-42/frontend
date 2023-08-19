import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const BookSearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [params] = useSearchParams();
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
        ref={undefined}
      />
      <SearchBar.Button />
    </SearchBar>
  );
};

export default BookSearchBar;
