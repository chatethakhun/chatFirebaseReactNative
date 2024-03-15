import { View, Text, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

type ButtonProps = {
  onPress: () => void;
  label: string;
};
export default function Button({ onPress, label }: ButtonProps) {
  return (
    <Pressable
      style={{ backgroundColor: Colors.primary }}
      onPress={onPress}
      className="rounded-md w-full bg-purple items-center h-12 justify-center"
    >
      <Text style={{ color: 'white' }}>{label}</Text>
    </Pressable>
  );
}
