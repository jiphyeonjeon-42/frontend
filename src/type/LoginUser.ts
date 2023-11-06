export type LoginUser = {
  isLogin: boolean;
  id: number;
  username: string | undefined;
  email: string | undefined;
  isAdmin: boolean;
  expire: string | undefined; // ISO String
};
