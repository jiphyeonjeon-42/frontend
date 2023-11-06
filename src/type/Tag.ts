export type Tag = {
  id: number;
  content: string;
  username?: string;
  count?: number;
  bookInfoId?: number;
  title?: string;
  createdAt?: string;
  superContent?: string;
  type?: "super" | "default";
  visibility?: "public" | "private";
};
