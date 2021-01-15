import axios from "axios";

export type LoginResponseData = BaseBody<{
  user: IUser;
  token: string;
}>;
export const login = async (user: LoginForm): Promise<LoginResponseData> => {
  const res = await axios.post<LoginResponseData>("/api/auth/login", user);
  return res.data;
};

export type RegisterResponseData = BaseBody<{
  user: { email: string };
}>;
export const register = async (
  user: RegisterForm
): Promise<RegisterResponseData> => {
  const res = await axios.post<RegisterResponseData>(
    "/api/auth/register",
    user
  );
  return res.data;
};

export type ForgotPasswordResponseData = BaseBody<{
  user: { email: string };
}>;
export const forgotPassword = async (
  user: ForgotPasswordForm
): Promise<ForgotPasswordResponseData> => {
  const res = await axios.post<ForgotPasswordResponseData>(
    "/api/auth/forgot-password",
    user
  );
  return res.data;
};
