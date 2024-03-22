import { View, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
type MessageItemProps = {
  message: any;
  currentUser: User;
};

const MessageItem = ({ message, currentUser }: MessageItemProps) => {
  if (currentUser.uid === message.userId) {
    // my message
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className=" flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text>{message.message}</Text>
          </View>
        </View>
      </View>
    );
  }
  return <View className="flex-row justify-start mb-3 ml-3">
  <View style={{ width: wp(80) }}>
    <View className=" flex self-start p-3 rounded-2xl border border-neutral-200 bg-blue-600">
      <Text className="text-white">{message.message}</Text>
    </View>
  </View>
</View>;
};

export default MessageItem;
