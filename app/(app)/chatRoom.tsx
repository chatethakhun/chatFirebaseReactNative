import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/chats/ChatRoomHeader";
import MessageList from "@/components/chats/MessageList";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import InputField from "@/components/fields/input";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardAvoidingView from "@/components/CustomKeyboardAvoidingView";

const ChatRoom = () => {
  const chat = useLocalSearchParams();

  const [messages, setMessages] = React.useState([]);

  return (
    <CustomKeyboardAvoidingView inChat>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader chat={chat} />
        <View className="h-0.5 bg-neutral-200 mt-3" />

        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} />
          </View>
          <View
            style={{
              marginBottom: hp(2.7),
            }}
            className="pt-2"
          >
            <View className="flex-row justify-between items-center mx-3">
              <View className="flex-row justify-between bg-white p-2 pl-5 rounded-full flex-1">
                <TextInput placeholder="Type message..." className="flex-1" />

                <TouchableOpacity className="bg-neutral-200 p-2 mr-[5px] rounded-full">
                  <Feather name="send" size={hp(2.7)} color={"#737373"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default ChatRoom;
