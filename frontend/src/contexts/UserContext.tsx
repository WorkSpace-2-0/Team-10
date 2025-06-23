"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  role: string;
  userId: string;
  name: string;
  userEmail: string;
  createdAt: string;
};

type UserContextType = {
  userId?: string;
  name?: string;
  role?: string;
  userEmail?: string;
  createdAt?: string;
  loading: boolean;
  error?: string;
  getUser: () => Promise<void>;
};

const getDecodedToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Decode token
      const decoded = getDecodedToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      const decoded = getDecodedToken(storedToken);
      if (decoded) {
        setUser(decoded);
      } else {
        setUser(null);
        console.error("Failed to decode token.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId: user?.userId,
        name: user?.name,
        role: user?.role,
        userEmail: user?.userEmail,
        loading,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
