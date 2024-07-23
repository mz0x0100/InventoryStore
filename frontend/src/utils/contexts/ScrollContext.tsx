import { PropsWithChildren, createContext, useContext, useState } from "react";


type ScrollContextProps = {
  scroll: number;
  setScroll: React.Dispatch<React.SetStateAction<number>>;
};

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

// The Scroll provider component
export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const [scroll, setScroll] = useState<number>(0);
  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

// useScrollContext allows of using the Scroll Context and changing it's states
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used within ScrollProvider");

  return context;
};
