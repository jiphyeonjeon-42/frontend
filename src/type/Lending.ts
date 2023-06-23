export type Lending = {
  id: number;
  title: string;
  callSign: string;
  dueDate: string;
  duedate?: string; // GET user/search 에서 duedate로 들어옴
  createdAt: string;
  lendingCondition: string;
  login?: string;
  penaltyDays: number;
  image?: string;
  userId: number;
};
