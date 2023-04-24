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

export type Lending = {
  id: number;
  title: string;
  callSign: string;
  dueDate: string;
  createdAt: string;
  lendingCondition: string;
  login?: string;
  penaltyDays: number;
  image?: string;
};

export type Reservation = {
  bookId: number;
  callSign: string;
  createdAt: string;
  endAt: string;
  image?: string;
  login?: string;
  penaltyDays: number;
  reservationsId: number;
  status: number;
  title: string;
  userId: number;
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

export type History = {
  id: number;
  lendingCondition: string;
  login: string;
  returningCondition: string;
  penaltyDays: number;
  title: string;
  bookInfoId: number;
  createdAt: string;
  returnedAt: string;
  dueDate: string;
  lendingLibrarianNickName: string;
  returningLibrarianNickname: string;
  callSign: string;
  image?: string;
}
