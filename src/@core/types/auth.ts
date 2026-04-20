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
