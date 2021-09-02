import { atom } from "recoil";

const popularMain = atom({
  key: "popularMain",
  default: {
    author: [],
    contents: "",
    datetime: "",
    isbn: "",
    price: 0,
    publisher: "",
    sale_price: 0,
    thumbnail: "",
    title: "",
    translators: [],
    url: "",
  },
});

export default popularMain;
