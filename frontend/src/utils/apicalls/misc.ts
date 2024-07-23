import { AxiosRequestConfig } from "axios";
import useAxiosApiCall from "../axios_instance";
import { useCurrentUser } from "../contexts/CurrentUserContext";

// Hook for loading the current user
export const useLoadCurrentUser = () => {
  const { setCurrentUser } = useCurrentUser();
  const axiosApiCall = useAxiosApiCall();

  const loadCurrentUser = async() => {
    try {
        await axiosApiCall.get("/current_user").then((response) => {
          const data = response.data;
          setCurrentUser({currentUser: data.current_user, role: data.role, isAuthenticated: data.is_authenticated});
          console.log(data);
        });
      } catch (error) {
        console.log(`Error in useLoadCurrentUser: ${error}`);
        throw error;
      }
  }

  return loadCurrentUser;
};

// General function for making api calls
export const useMakeApiCall = () => {
  const axiosApiCall = useAxiosApiCall();
  
  const makeApiCall = async(config: AxiosRequestConfig, onSuccess?: (data: any) => void, onError?: (err?: any) => void ) => {

    try {
      await axiosApiCall(config)
      .then((response) => {
        if (response.status === 200) {
          onSuccess?.(response.data);
        } else {
          onError?.()
        }
      })
      .catch((error) => {
        onError?.(error)
      })
    }catch (error) {
      onError?.(error)
  } 
    
  }

  return makeApiCall;
}