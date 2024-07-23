import { useEffect, useRef, useState } from "react";
import { useLogout } from "../utils/access_control";
import { useNavigate } from "react-router-dom";
import { useRefreshToken, useToken } from "../utils/utils";
import { logoutUser } from "../utils/apicalls/authentication";
import Loader from "../components/Loader";
import { useCurrentUser } from "../utils/contexts/CurrentUserContext";
import { useLoadCurrentUser } from "../utils/apicalls/misc";

const Logout: React.FC = () => {
  const logout = useLogout();
  const { token } = useToken();
  const { refreshToken } = useRefreshToken();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const loadCurrentUser = useLoadCurrentUser();

  const [accessTokenRevoked, setAccessTokenRevoked] = useState(false);
  const [refreshTokenRevoked, setRefreshTokenRevoked] = useState(false);
  const navigate = useNavigate();
  // const renderCounts = useRef(0);

  const handleAccessTokenRevoked = (msg?: string) => {
    console.log(msg);
    setAccessTokenRevoked(true);
  };

  const handleRefreshTokenRevoked = (msg?: string) => {
    console.log(msg);
    setRefreshTokenRevoked(true);
  };

  useEffect(() => {
    if (currentUser?.isAuthenticated) {
      if (!accessTokenRevoked) {
        logoutUser(token as string, handleAccessTokenRevoked);
      } else if (!refreshTokenRevoked) {
        logoutUser(refreshToken as string, handleRefreshTokenRevoked);
      } else {
        logout();
        setCurrentUser(null);
        navigate("/");
      }
    } else navigate("/");
  }, [accessTokenRevoked, refreshTokenRevoked]);

  return <Loader text={`Signing you out...`} />;
};

export default Logout;
