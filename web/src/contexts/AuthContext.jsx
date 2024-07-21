import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const user = response.data;
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const register = async (email, password) => {
    const response = await apiRegister(email, password);
    const user = response.data;
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    currentUser,
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
