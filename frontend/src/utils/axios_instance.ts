import axios from "axios";
import { useRefreshToken, useToken } from "./utils";
import { useAPIRequestError } from "./contexts/APIRequestErrorContext";

const useAxiosApiCall = () => {
  const { token, setToken } = useToken();
  const { refreshToken } = useRefreshToken();
  const { setAPIRequestError, clearAPIRequestError } = useAPIRequestError();
  const repeatRequest = useRequestRepeater();

  const axiosApiCall = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  });

  // Before performing any request
  axiosApiCall.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // After performing any request, when response if received
  axiosApiCall.interceptors.response.use(
    (response) => {
      clearAPIRequestError();
      return response;
    },
    async (error) => {
      // throw Error(error);
      if (typeof error.response != "undefined") {
        if (error.response.status == 401) {
          if (error.response.data.msg == "Token has expired") {
            console.log("Access token has expired, refreshing...");
            const config = error.config;

            // Refresh the access token
            await axios({
              url: `${
                import.meta.env.VITE_REACT_APP_API_URL
              }/auth/refresh_token`,
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }).then((response) => {
              console.log(response.data);
              setToken(response.data.access_tokent);

              // Retry the original request
              config.headers.Authorization = `Bearer ${token}`;
              // return axiosApiCall(config);
            });
          } else {
            setAPIRequestError({
              status: error.response.status,
              statusText: "",
              message: error.response.data.msg,
            });
            throw Error(error);
            // console.log(error.response.data.msg);
          }
        } else {
          setAPIRequestError({
            status: error.response.status,
            statusText: "",
            message: error.response.data.msg,
          });
          throw Error(error);
        }
      }
    }
  );

  return axiosApiCall;
};

const useRequestRepeater = () => {
  // const axiosApiCall = useAxiosApiCall();
  const { token } = useToken();

  const repeatRequest = async (config: any) => {
    config.headers.Authorization = `Bearer ${token}`;
    return await axios(config);
  };

  return repeatRequest;
};
export default useAxiosApiCall;
