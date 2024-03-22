import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/chats/ChatRoomHeader";
import MessageList from "@/components/chats/MessageList";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import InputField from "@/components/fields/input";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardAvoidingView from "@/components/CustomKeyboardAvoidingView";
import { useAuth } from "@/contexts/AuthContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getRoomId } from "@/constants/common";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ChatRoom = () => {
  const chat = useLocalSearchParams();

  const [messages, setMessages] = React.useState([]);

  const { user } = useAuth();

  const textRef = useRef<string>("");
  const inputRef = useRef<TextInput>(null);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, chat?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.uid, chat?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  const handleMessage = useCallback((text: string) => {
    textRef.current = text;
  }, []);

  const handleSendMessage = useCallback(async () => {
    let message = textRef.current.trim();

    if (!message) return;

    try {
      let roomId = getRoomId(user?.uid, chat?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      textRef.current = "";
      if (inputRef.current) inputRef.current.clear();

      const newDoc = await addDoc(messageRef, {
        message,
        userId: user?.uid,
        createdAt: Timestamp.fromDate(new Date()),
      });

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, []);

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
              <View className="flex-row justify-between bg-white p-2 pl-5 rounded-full flex-1 self-start">
                <TextInput
                  ref={inputRef}
                  placeholder="Type message..."
                  className="flex-1"
                  onChangeText={handleMessage}
                />

                <TouchableOpacity
                  onPress={handleSendMessage}
                  className="bg-neutral-200 p-2 mr-[5px] rounded-full"
                >
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
