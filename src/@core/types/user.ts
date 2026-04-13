export type User = {
  uuid: string;
  name: string;
  email: string;
  image?: string;
  locale?: string | null;
};

export type UpdateUserInfoRequest = {
  name?: string;
  locale?: string;
};
