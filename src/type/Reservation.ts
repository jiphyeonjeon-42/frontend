export type Reservation = {
  id: number;
  bookId: number;
  callSign: string;
  createdAt: string;
  endAt: string;
  image?: string;
  username?: string;
  penaltyDays: number;
  reservationsId: number;
  status: number;
  title: string;
  userId: number;
  ranking?: number;
  lenderableDate?: string;
};
