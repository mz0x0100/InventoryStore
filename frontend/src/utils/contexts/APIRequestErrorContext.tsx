import { createContext, useContext, useState } from "react";

export type APIRequestErrorType = {
  status: number;
  statusText: string;
  message?: string;
};

type APIRequestErrorContextType = {
  apiRequestError: APIRequestErrorType | null;
  setAPIRequestError: React.Dispatch<React.SetStateAction<APIRequestErrorType | null>>;
  clearAPIRequestError: () => void;
};

const APIRequestErrorContext = createContext<APIRequestErrorContextType | undefined> (undefined);

export const useAPIRequestError = () => {
  const context = useContext(APIRequestErrorContext);
  if (!context)
    throw new Error("useAPIRequestError hook must be use within a APIRequestErrorProvider");

    return context;
}

type APIRequestErrorProviderProps = {
  children: React.ReactNode;
};

export const APIRequestErrorProvider: React.FC<APIRequestErrorProviderProps> = ({ children }) => {

  const [apiRequestError, setAPIRequestError] = useState<APIRequestErrorType | null>(null);

  const clearAPIRequestError = () => {
    setAPIRequestError(null);
  }

  return (
    <APIRequestErrorContext.Provider value={{apiRequestError, setAPIRequestError, clearAPIRequestError}}>
      { children }
    </APIRequestErrorContext.Provider>
  );
}