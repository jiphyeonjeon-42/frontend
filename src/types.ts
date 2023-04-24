export type Book = {
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

type Lending = {
  dueDate: string;
  title: string;
};

type Reservation = {
  ranking: number;
  endAt: string;
  lenderableDate: string;
  title: string;
};

export type User = {
  id: number;
  email: string;
  nickname: string;
  intraId: number;
  slack: string;
  penaltyEndDate: string;
  overDueDay: number;
  role: number;
  reservations: Reservation[];
  lendings: Lending[];
};
