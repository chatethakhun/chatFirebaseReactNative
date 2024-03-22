import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import HomeHeader from "@/components/home_header";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
}
