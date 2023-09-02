import { Book } from "./Book";

export type BookInfo = {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryId?: number;
  isbn?: string;
  publisher: string;
  publishedAt?: string;
  image?: string;
  koreanDemicalClassification?: string;
  donator?: string;
  books?: Book[];
};

export type BookPreviewType = Omit<BookInfo, "category"> & {
  bookInfoId: number;
};
