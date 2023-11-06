export type Lending = {
  id: number;
  title: string;
  callSign: string;
  dueDate: string;
  createdAt: string;
  lendingCondition: string;
  username?: string; 
  penaltyDays: number;
  userId: number;
  image?: string;
};
