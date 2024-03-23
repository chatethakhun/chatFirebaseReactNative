import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter, Stack } from "expo-router";
import { Image } from "expo-image";
import { blurhash } from "@/constants/common";
type ChatRoomHeaderProps = {
  chat: any;
};
const ChatRoomHeader = ({ chat }: ChatRoomHeaderProps) => {
  const router = useRouter();

  console.log({ chat });

  const goBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center">
            <TouchableOpacity onPress={goBack}>
              <Entypo name="chevron-left" size={hp(4)} color={"#737373"} />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <Image
                source={
                  chat.photoURL ?? "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                }
                style={{
                  height: hp(4.5),
                  aspectRatio: 1,
                }}
                className="rounded-full"
                placeholder={blurhash}
                transition={500}
              />
              <Text
                className="mx-3 text-neutral-700 font-medium"
                style={{ fontSize: hp(2) }}
              >
                {chat?.name ?? 'Anonymous'}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => <View className="flex-row items-center gap-8">
          <Ionicons name="call" size={hp(2.5)} color={'#737373'}/>
          <Ionicons name="videocam" size={hp(2.5)} color={'#737373'}/>
        </View>
      }}
    />
  );
};

export default ChatRoomHeader;
