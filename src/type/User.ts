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
