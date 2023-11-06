import { Book } from "./Book";

export type BookInfo = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  isbn?: string;
  image?: string;
  publishedAt?: string;
  categoryId: number;
};

export type BookPreviewType = BookInfo & {
  bookInfoId: number;
};

export type BookInfoRecommend = BookInfo & {
  project: string[];
};
