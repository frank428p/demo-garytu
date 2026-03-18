export type User = {
  uuid: string;
  name: string;
  email: string;
  image?: string;
};

export type UpdateUserInfoRequest = {
  name: string;
};
