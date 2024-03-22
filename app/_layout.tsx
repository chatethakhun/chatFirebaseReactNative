import { AuthContextProvider, useAuth } from "@/contexts/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] === "(app)";

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
  <MenuProvider>
    <AuthContextProvider>
      <StatusBar style="dark" />
      <MainLayout />
    </AuthContextProvider>
  </MenuProvider>
);

export default RootLayout;
