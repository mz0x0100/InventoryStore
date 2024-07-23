import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import React, { useEffect, useRef } from "react";

const AuthLayer: React.FC<{ role: "admin" | "superuser" | "staffuser" }> = ({
  role,
}) => {
  const { currentUser } = useCurrentUser();
  const isRole = useRef(false);
  const currentUserLoaded = useRef(false);

  useEffect(() => {
    console.log("changes...");
    if (currentUser !== null) {
      isRole.current = role === currentUser.role;
      currentUserLoaded.current = true;
    } else {
      currentUserLoaded.current = false;
    }
  }, [currentUser]);

  return currentUserLoaded.current && !isRole.current ? (
    <Navigate
      to={`/${
        role === "admin" ? "admin" : role == "superuser" ? "su" : "staff"
      }/login`}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default AuthLayer;
