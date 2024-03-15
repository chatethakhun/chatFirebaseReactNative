import { AuthContextProvider, useAuth } from "@/contexts/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] === "(app)";

    console.log("inApp", inApp, loading);
    if (loading) {
      return;
    }

    if (isAuthenticated && !inApp) {
      router.push("/home");
    } else if (!isAuthenticated) {
      router.push("/login");
    }

    
  }, [isAuthenticated, loading]);

  return <Slot />;
};
const RootLayout = () => (
  <AuthContextProvider>
    <MainLayout />
  </AuthContextProvider>
);


export default RootLayout