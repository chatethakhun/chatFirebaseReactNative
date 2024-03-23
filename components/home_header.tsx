import { View, Text, Platform } from "react-native";
import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "@/constants/common";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import CustomMenuItem from "./CustomMenuItem";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { logOut, user } = useAuth();

  const handleProfile = useCallback(() => {
    router.push({ pathname: "/profile" });
  }, [])
  const handleSignOut = useCallback(async () => {
    await logOut();
  }, [logOut])
  return (
    <View
      style={{ paddingTop: Platform.OS === "ios" ? top : top + 10 }}
      className="flex-row justify-between bg-indigo-500 px-5 pb-6 rounded-b-3xl shadow-lg"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>

      <Menu>
        <MenuTrigger>
          <Image
            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
            source={user.photoURL ?? "https://photos.wi.gcs.trstatic.net/91eH0cy_sdL4W9ERlE17iakSt3L-kfr_ClC-z0xSbVV5X1bKAoXmjEhSUpig2FE_jNBGyknblmiJv2jQ--T87A"}
            transition={100}
            placeholder={blurhash}
            contentFit="cover"
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderCurve: 'continuous',
              marginTop: 40,
              marginLeft: -30,
              backgroundColor: "white",
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              width: 160,
            }
          }}
        >
          <CustomMenuItem
            text="Profile"
            action={handleProfile}
            value={null}
            icon={<Feather name="user" size={hp(2.5)} color="#737373"/>}
          />
          <Divider />
          <CustomMenuItem
            text="Sign Out"
            action={handleSignOut}
            value={null}
            icon={<AntDesign name="logout" size={hp(2.5)} color="#737373"/>}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
}


const Divider = () => <View className="h-0.5 bg-neutral-200" />;