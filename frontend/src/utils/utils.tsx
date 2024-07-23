import { useEffect, useRef, useState } from "react";
import Overlay from "../components/Overlay";
import { useNavigate } from "react-router-dom";

// export const getThemeClasses = () => {
//   const { theme } = useTheme();
//   const themeClasses: ThemeClass =
//     theme == "dark"
//       ? {
//           textColor: "text-dark-color",
//           bgColor: "bg-dark-background",
//           priColor: "dark-primary",
//           secColor: "dark-secondary",
//           popup: "bg-dark-popup",
//           navIcon: "text-dark-navicon",
//           navbg: "bg-dark-navbg",
//         }
//       : {
//           textColor: "text-light-color",
//           bgColor: "bg-light-background",
//           priColor: "light-primary",
//           secColor: "light-secondary",
//           popup: "bg-light-popup",
//           navIcon: "text-light-navicon",
//           navbg: "bg-light-navbg",
//         };

//   return themeClasses;
// };

/**
 * Important for managing multiple similar states because defining, using and maintaining
 * multiple states varaibles can be really tedious,
 *  */

export type StateType = {
  id: string | number;
  itemPayload: string | number | boolean;
};

export type StateAction = {
  type: "UPDATE";
  payload: string | number | boolean;
  id: string | number;
};

export const stateReducer = (
  state: StateType[],
  action: StateAction
): StateType[] => {
  switch (action.type) {
    case "UPDATE":
      return state.map((item) =>
        item.id == action.id ? { ...item, itemPayload: action.payload } : item
      );

    default:
      return state;
  }
};

// Function for getting the payload of a specified item id
export const getItemStatePayload = (
  id: string | number,
  items: StateType[]
): string | number | boolean => {
  const foundItem = items.find((item) => item.id === id);
  return foundItem ? foundItem.itemPayload : "";
};

export const isValidEmail = (email: string): boolean => {
  // RegEx for validating email addresses
  /**
   * [a-z]{2, } // means there should be atleast 2 letters a to z
   */
  const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  return reg.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const reg = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}/;

  return reg.test(password);
};

// For using auto focus on first render
export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};

export const TopLoader = () => {
  return (
    <Overlay className="text-white bg-[rgba(0,0,0,0.4)]">
      <p className={`top-loader absolute top-0`}></p>
    </Overlay>
  );
};

// dd/mm/yyyy => yyyy-mm-dd
export const dateImportApiFormat = (date: string) => {
  const splits = date.split("/");

  return `${splits[2]}-${splits[1]}-${splits[0]}`;
};

// yyyy-mm-dd => dd/mm/yyyy
export const dateExportApiFormat = (date: string) =>  {
  const splits = date.split('-');
  
  return `${splits[2]}/${splits[1]}/${splits[0]}`;
}
/**
 *
 * @param timeout Number of seconds to wait beforming executing the onTimeout method
 * @param onTimeout Method to executed when timeout elapsed
 * @param setCurrentSec Method that may be used for keeping track of the current second in the timeout
 * @param start An optional dependency, this is a boolean, by default it is set to true which means that the timer will start immediately after calling this hook
 */
export const useTimer = (
  timeout: number,
  onTimeout: () => void,
  setCurrentSec?: (sec: number) => void,
  start = true
) => {
  const count = useRef<number>(timeout);
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (count.current <= 0) {
          onTimeout();
        }
        count.current = count.current - 1;
        setCurrentSec?.(count.current);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count.current, start]);
};

export const useRedirect = (
  route: string,
  delay: number,
  setCountDown?: React.Dispatch<React.SetStateAction<number>>,
  dependency?: boolean
) => {
  const navigate = useNavigate();
  const handleTimeout = () => {
    navigate(route);
  };
  useTimer(delay, handleTimeout, setCountDown, dependency);
};

export const useToken = () => {
  const getToken = () => {
    const accessToken = localStorage.getItem("access_token");

    return accessToken && accessToken;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (accesssToken: string) => {
    localStorage.setItem("access_token", accesssToken);
    setToken(accesssToken);
  };

  const removeToken = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken,
  };
};

export const useRefreshToken = () => {
  const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    return refreshToken && refreshToken;
  };

  const [refreshToken, setRefreshToken] = useState(getRefreshToken);

  const saveRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refresh_token", refreshToken);
    setRefreshToken(refreshToken);
  };

  const removeRefreshToken = () => {
    localStorage.removeItem("refresh_token");
    setRefreshToken(null);
  };

  return {
    refreshToken,
    setRefreshToken: saveRefreshToken,
    removeRefreshToken,
  };
};

export type LGAType = {
  value: string;
  displayText?: string;
};

export const gombeLgas = [
  { value: "gombe", displayText: "Gombe" },
  { value: "akko", displayText: "Akko" },
  { value: "dukku", displayText: "Dukku" },
  { value: "billiri", displayText: "Billiri" },
  { value: "nafada", displayText: "Nafada" },
  { value: "balanga", displayText: "Balanga" },
  { value: "shongom", displayText: "Shongom" },
  { value: "kaltungo", displayText: "Kaltungo" },
  { value: "y/deba", displayText: "Y/Deba" },
  { value: "kwami", displayText: "Kwami" },
  { value: "funakaye", displayText: "Funakaye" },
];

// A recursive method that checks wether any of an element's  childNode is the target
export const isIn = (
  target: EventTarget,
  elements: NodeListOf<ChildNode>
): boolean => {
  for (let i = 0; i < elements.length; i++) {
    if (target === elements[i]) {
      return true;
    } else {
      // If the has child nodes, check them as well
      if (elements[i].hasChildNodes()) {
        if (isIn(target, elements[i].childNodes)) return true;
      }
    }
  }

  return false;
};
