export type Review = {
  id: number;
  bookInfoId: number;
  content: string;
  createdAt: string;
  title: string;
  username: string;
  disabled?: boolean;
};
