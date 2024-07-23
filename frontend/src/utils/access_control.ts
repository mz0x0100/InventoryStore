import { useRefreshToken, useToken } from "./utils";

export const useLogin = () => {
  const { setToken } = useToken();
  const { setRefreshToken } = useRefreshToken();

  const login = (accessToken: string, refreshToken: string) => {
    setToken(accessToken);
    setRefreshToken(refreshToken);
  };

  return login;
};

export const useLogout = () => {
  const { removeToken } = useToken();
  const { removeRefreshToken } = useRefreshToken();

  const logout = () => {
    removeToken();
    removeRefreshToken();
  };

  return logout;
};
