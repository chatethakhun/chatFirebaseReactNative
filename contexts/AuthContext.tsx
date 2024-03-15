import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: (email: string, password: string) => {},
  logOut: () => {},
  register: (email: string, password: string) => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email: string, password: string) => {};

  const logOut = async () => {};

  const register = async (email: string, password: string) => {};

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logOut, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
