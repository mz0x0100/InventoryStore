import { HTMLProps, useEffect } from "react";
import { useCurrentUser } from "../../utils/contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const AdminRequired: React.FC<HTMLProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role != "admin") {
      navigate("/admin/login");
    }
  }, []);

  return <div {...props}>{children}</div>;
};

export default AdminRequired;
