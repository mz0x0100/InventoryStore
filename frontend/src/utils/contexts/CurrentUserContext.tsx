import { PropsWithChildren, createContext, useContext, useState } from "react";

type CurrentUserType = {
  currentUser: any;
  isAuthenticated: boolean;
  role: "admin" | "staffuser" | "anonymous";
};
type CurrentUserContextType = {
  currentUser: CurrentUserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
};

// Create the CurrentUser context
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error("useCurrentUser must be call within a CurrentUserProvider");

  return context;
};
