import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/Authentication.jsx";

const ProtectedRouteRol = ({ roles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const role = Number(user?.role_id);

  if (roles.length && !roles.includes(role)) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRouteRol;