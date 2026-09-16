import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./authContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      const userData = JSON.parse(savedUser);

      setUser(userData);
      setIsAdmin(userData.role === "admin");
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAdmin(user.role === "admin");

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};