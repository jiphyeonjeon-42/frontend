export type BookInfo = {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  publisher: string;
  publishedAt: string;
  image: string | null;
};

export type BookPreviewType = BookInfo & {
  bookInfoId: number;
};

export type BookInfoRecommend = BookInfo & {
  project: string[];
};

export type NewBook = Omit<BookInfo, "id"> & {
  category: string; // 중앙도서관에서 확인한 분류번호, 비개발 도서일 때 활용
};
