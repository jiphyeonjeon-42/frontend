import { Book } from "./Book";

export type BookInfo = {
  id: number;
  title: string;
  author: string;
  category?: string;
  categoryId?: number;
  isbn?: string;
  publisher: string;
  publishedAt?: string;
  image?: string;
  donator?: string;
  books?: Book[];
};

export type BookPreviewType = BookInfo & {
  bookInfoId: number;
};

export type BookInfoRecommend = BookInfo & {
  project: string[];
};
