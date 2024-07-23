import { PropsWithChildren, createContext, useContext, useState } from "react";

export type ThemeProps = "light" | "classic" | "dark";

type ThemeContextProps = {
  theme: ThemeProps | null;
  setTheme: React.Dispatch<React.SetStateAction<ThemeProps | null>>;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// The theme provider component
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeProps | null>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// useThemeContext allows of using the Theme Context and changing it's states
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");

  return context;
};
