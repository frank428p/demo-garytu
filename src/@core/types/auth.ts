// ─── Auth ─────────────────────────────────────────────────────────────────────
export type EmailRegisterRequest = {
  email: string;
  password: string;
};

export type EmailRegisterVerifyRequest = {
  email: string;
  otp: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type GoogleLoginRequest = {
  token: string; // Google id_token
};

export type AuthTokenResponse = {
  access_token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordVerifyRequest = {
  email: string;
  otp: string;
  new_password: string;
};
