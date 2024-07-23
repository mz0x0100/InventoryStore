import axios from "axios";
import { useLogin } from "../access_control";
import useAxiosApiCall from "../axios_instance";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export type LoginRole = "admin" | "superuser" | "staffuser";

export const useLoginUser = (role: LoginRole) => {
  const login = useLogin();
  const url = `/auth/login_${role}`;

  const axiosApiCall = useAxiosApiCall();
  const { setCurrentUser } = useCurrentUser();

  const loginUser = async (
    username: string,
    password: string,
    setLoginSucceeded: React.Dispatch<React.SetStateAction<boolean>>,
    onApiRequestFailed?: () => void
  ) => {
    try {
      await axiosApiCall({
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            const data = response.data;
            setLoginSucceeded(data.succeeded);
            setCurrentUser({
              currentUser: data.current_user,
              role: data.role,
              isAuthenticated: data.is_authenticated,
            });
            login(data.access_token, data.refresh_token);
          } else {
            onApiRequestFailed?.();
          }
        })
        .catch((error) => {
          console.log(error);
          onApiRequestFailed?.();
        });
    } catch (error) {
      console.log("Error in loginAdmin: " + error);
      onApiRequestFailed?.();
    }
  };

  return loginUser;
};

export const logoutUser = async (
  token: string,
  onLogoutSucceeded: (msg?: string) => void
) => {
  try {
    await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response.data);
      if (response.data.succeeded) {
        onLogoutSucceeded(response.data.msg);
      }
    });
  } catch (error) {
    console.log(error);
  }
};