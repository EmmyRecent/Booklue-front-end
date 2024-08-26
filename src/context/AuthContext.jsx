import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const checkAuth = async () => {
      try {
        // Retrieve authentication state from local storage.
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
        const storedUser = localStorage.getItem("user");

        if (storedIsAuthenticated === "true" && storedUser) {
          // If authentication state and user info are present in localStorage, use them
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        } else {
          // otherwise check with the server.
          const response = await axios.get(
            "http://localhost:5000/api/auth/check",
          );
          const { isAuthenticated, user } = response.data;

          console.log("Server response isAuthenticated:", isAuthenticated);

          if (isAuthenticated) {
            // Store authentication state and user info in localstorage
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(user));

            setIsAuthenticated(true);
            setUser(user);
          } else {
            // Clear local storage if not authenticated.
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");

            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (err) {
        console.error(err);

        // Handle errors by clearing local storage.
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");

        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Update the local storage whenever the authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
