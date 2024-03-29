import { Lending } from "./Lending";
import { Reservation } from "./Reservation";

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
  lendings: Partial<Lending>[];
  isPenalty?: boolean;
  updatedAt?: string;
};

export type UserState = {
  isLogin: boolean;
  id: number;
  userName: string | undefined;
  email: string | undefined;
  isAdmin: boolean;
  expire: string | undefined; // ISO String
};
