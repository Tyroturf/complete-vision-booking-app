import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
      localStorage.removeItem("session_id");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const user = response.data;
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return response;
  };

  const register = async (email, password) => {
    const response = await apiRegister(email, password);
    const user = response.data;
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return response;
  };

  const logout = () => {
    setUser(null);
    apiLogout();
    localStorage.removeItem("user");
    localStorage.removeItem("session_id");
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
