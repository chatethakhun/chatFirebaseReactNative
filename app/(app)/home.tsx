import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { logOut } = useAuth();
  return (
    <View>
      <Text className="text-2xl font-bold mt-5">Welcome to the App</Text>
      <Text className="text-center">
        This is the home page of the app. You can navigate to other pages using
        the sidebar.
      </Text>

      <Pressable onPress={() => {
        logOut();
      
      }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
