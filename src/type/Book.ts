export type Book = {
  id?: number;
  bookId: number;
  bookInfoId: number;
  status: number;
  title: string;
  author: string;
  category: string;
  categoryId: number;
  isbn?: string;
  publisher: string;
  publishedAt?: string;
  callSign: string;
  image?: string;
  isLendable: number;
};
