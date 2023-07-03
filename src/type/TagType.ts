export type TagType = {
  id: number;
  content: string;
  count?: number;
  login?: string;
  bookInfoId?: number;
  title?: string;
  createdAt?: string;
  superContent?: string;
  type?: "super" | "default";
  visibility?: "public" | "private";
};
