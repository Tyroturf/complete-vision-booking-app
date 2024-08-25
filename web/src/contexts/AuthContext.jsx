import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
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
    console.log(response);
    const user = response.data;
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
