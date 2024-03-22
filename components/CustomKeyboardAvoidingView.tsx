import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

type CustomKeyboardAvoidingViewProps = {
  children: React.ReactNode;
  inChat?: boolean;
};

const ios = Platform.OS === "ios";
export default function CustomKeyboardAvoidingView({
  children, inChat = false
}: CustomKeyboardAvoidingViewProps) {
  let keyConfig = {}
  let scrollViewConfig = {}
  if(inChat) {
    keyConfig = { keyboardVerticalOffset: 90, }
    scrollViewConfig = { contentContainerStyle: {flex: 1 } }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={ios ? "padding" : "height"}
      {...keyConfig}
    >
      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
