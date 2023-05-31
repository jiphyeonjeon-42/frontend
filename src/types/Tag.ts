export type Tag = {
  id: number;
  content: string;
  login?: string;
  count?: number;
  bookInfoId?: number;
  title?: string;
  createdAt?: string;
  superContent?: string;
  visibility?: "public" | "private";
};
