import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { blurhash, getRoomId } from "@/constants/common";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";

type ChatItemProps = {
  chat: any;
  noBorder?: boolean;
};
const ChatItem = ({ chat, noBorder = false }: ChatItemProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [lastestMessage, setLastesMessage] = React.useState(null);

  const openChat = () => {
    router.push({ pathname: "/chatRoom", params: chat });
  };

  useEffect(() => {
    let roomId = getRoomId(user?.uid, chat?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });

      setLastesMessage(
        allMessages[0] ? allMessages[0] : { message: "No message yet" }
      );
      // setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  console.log(lastestMessage);

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
          chat.photoURL ?? "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
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
            {chat?.name ?? 'Anonymous'}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {lastestMessage?.createdAt?.toDate().toLocaleTimeString()}
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {lastestMessage?.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
