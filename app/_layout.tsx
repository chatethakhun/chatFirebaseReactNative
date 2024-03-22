import { View } from "@/components/Themed";
import { AuthContextProvider, useAuth } from "@/contexts/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

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
  <AuthContextProvider>
    <View
      className="flex-1"
      style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
    >
      <StatusBar style="dark" />
      <MainLayout />
    </View>
  </AuthContextProvider>
);

export default RootLayout;
