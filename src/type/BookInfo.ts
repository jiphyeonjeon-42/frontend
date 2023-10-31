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
