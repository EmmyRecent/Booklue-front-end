import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/account/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
