import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../../../services/api";
import { router } from "expo-router";

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await getToken();
      console.log("?? [useAuth] Token from storage on load:", token ? "present" : "null");
      if (token) setUser({ token });
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (token: string) => {
    console.log("?? [useAuth] signIn called");
    await setToken(token);
    setUser({ token });
    console.log("? [useAuth] User set with token");
  };

  const signOut = async () => {
    console.log("?? [useAuth] signOut called");
    await removeToken();
    setUser(null);
    console.log("? [useAuth] User cleared, token removed");
    
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

