import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type InputFieldProps = {
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  value?: string;
};

export default function InputField({
  placeholder,
  icon,
  onChangeText,
  secureTextEntry = false,
  value,
}: InputFieldProps) {
  return (
    <View
      style={{ borderWidth: 1 }}
      className="flex-row items-center gap-x-2 w-full h-12 border-gray-300 rounded-md px-1 py-2 bg-white shadow-md"
    >
      {icon && <Ionicons name={icon} size={24} />}
      <TextInput
        className="w-full"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
