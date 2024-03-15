import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, userRef } from "@/firebaseConfig";
import { setDoc } from "firebase/firestore";

const AuthContext = React.createContext({
  user: {},
  isAuthenticated: false,
  loading: true,
  login: (email: string, password: string) => {},
  logOut: () => {},
  register: (email: string, password: string) => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser({});
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {};

  const logOut = async () => {};

  const register = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(userRef, {
        email,
        uid: response?.user.uid,
      })

      return {
        success: true,
        data: response?.user,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  };

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
