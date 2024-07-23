import useAxiosApiCall from "../axios_instance";
import { useMakeApiCall } from "./misc";

export const useCUSuperUser = (updateSu: boolean, old_uname?: string) => {
  const axiosApiCall = useAxiosApiCall();
  const url = updateSu ? "/su/update_login_cred" : "/su/new_su";

  const cuSuperUser = async (
    username: string,
    password: string,
    setResponseData: (res: any) => void
  ) => {
    try {
      await axiosApiCall({
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: !updateSu
          ? JSON.stringify({ username: username, password: password })
          : JSON.stringify({
              username: old_uname,
              new_username: username,
              password: password,
            }),
      }).then((response) => {
        console.log(response.data);
        setResponseData(response.data);
      });
    } catch (error) {
      console.log("Error in createSuperUser " + error);
    }
  };

  return cuSuperUser;
};

export const useLoadSuperUsers = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadSuperUsers = async (setResponseData: (res: any) => void) => {
    try {
      await axiosApiCall({
        url: "/su/load_sus",
        method: "GET",
      }).then((response) => {
        setResponseData(response.data.super_users);
      });
    } catch (error) {
      console.log("Error in createSuperUser " + error);
    }
  };

  return loadSuperUsers;
};

export const useLoadSuperUser = () => {
  const makeApiCall = useMakeApiCall();

  const loadSuperUser = (
    username: string,
    onSuccess: (res: any) => void,
  ) => {
    makeApiCall({
      url: "/su/load_su",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ username: username }),
    }, onSuccess);
  };

  return loadSuperUser
};

export const useDeleteSuperUser = () => {
  const makeApiCall = useMakeApiCall();

  const deleteSuperUser = (
    username: string,
    onSuccess?: (res: any) => void,
  ) => {
    makeApiCall({
      url: "/su/delete_su",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ username: username }),
    }, onSuccess);
  };

  return deleteSuperUser
};

export const useUpdateSuperUser = () => {
  const makeApiCall = useMakeApiCall();

  const updateSuperUser = (
    data: any,
    onSuccess: (res: any) => void,
  ) => {
    makeApiCall({
      url: "/su/update_su",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
    }, onSuccess);
  };

  return updateSuperUser
};
