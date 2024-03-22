import React, { useEffect, useState } from "react";
import {
  User as UserFirebase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
type AuthResponse = {
  success: boolean;
  data?: UserFirebase;
  error?: string;
};


const AuthContext = React.createContext({
  user: {} as UserFirebase & { userId: string },
  isAuthenticated: false,
  loading: true,
  login: (email: string, password: string) => ({}) as AuthResponse,
  logOut: () => {},
  register: (email: string, password: string) => {
    return {} as AuthResponse;
  },
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

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        data: response?.user,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      await setDoc(doc(db, "users", response.user.uid), {
        email: response.user.email,
        userId: response.user.uid,
      });


      return {
        success: true,
        data: response?.user,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
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
