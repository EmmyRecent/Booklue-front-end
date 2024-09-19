import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  useEffect(() => {
    // Wait until the authentication check completes.
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true },
        );
        const { isAuthenticated } = response.data;
        console.log("Auth:", isAuthenticated);
      } catch (err) {
        console.error("Failed to authenticate user:", err);
      }
    };

    checkAuth();
  }, []);

  console.log("Authenticated:", isAuthenticated);

  if (authLoading) {
    // Optionally show a loading spinner or nothing while checking auth.
    return <div className="wrapper text-whiteColor">Loading...</div>;
  }

  // Redirect if not authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/account/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
