import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

type CustomKeyboardAvoidingViewProps = {
  children: React.ReactNode;
};

const ios = Platform.OS === "ios";
export default function CustomKeyboardAvoidingView({
  children,
}: CustomKeyboardAvoidingViewProps) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={ios ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
