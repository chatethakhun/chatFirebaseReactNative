import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { blurhash } from "@/constants/common";

type ChatItemProps = {
  chat: any;
  noBorder?: boolean;
};
const ChatItem = ({ chat, noBorder = false }: ChatItemProps) => {
  const router = useRouter();

  const openChat = () => {
    router.push({ pathname: "/chatRoom", params: chat });
  };

  return (
    <TouchableOpacity
      onPress={openChat}
      style={{ gap: 10 }}
      className={`flex-row justify-between mx-4 items-center mb-4 pb-3 ${
        !noBorder && "border-b"
      } border-b-neutral-200`}
    >
      <Image
        source={
          "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
        }
        style={{
          height: hp(6),
          aspectRatio: 1,
        }}
        className="rounded-full"
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            Name
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Last Message
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
