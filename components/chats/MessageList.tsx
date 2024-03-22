import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MessageItem from "./MessageItem";
type MessageListProps = {
  messages: any[];
};
const MessageList = ({ messages }: MessageListProps) => {
  const { user } = useAuth();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return <MessageItem message={message} key={index} currentUser={user} />;
      })}
    </ScrollView>
  );
};

export default MessageList;
