import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import InputField from "@/components/fields/input";
import Button from "@/components/button";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import CustomKeyboardAvoidingView from "@/components/CustomKeyboardAvoidingView";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();
  const { register } = useAuth();

  const submit = useCallback(async () => {
    const response = await register(email.current, password.current);

    if (!response.success) {
      if (response.error?.includes("auth/email-already-in-use")) {
        console.error("Email already in use");
      }

      if (response.error?.includes("auth/weak-password")) {
        console.error("Password is too weak");
      }

      if (response.error?.includes("auth/invalid-email")) {
        console.error("Invalid email");
      }
    }
  }, []);

  return (
    <CustomKeyboardAvoidingView>
      <StatusBar style="dark" />
      <View
        className="flex-1 items-center gap-3"
        style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
      >
        <Image
          style={{ width: wp(90), height: hp(30) }}
          source={require("../assets/images/register.png")}
          resizeMode="contain"
        />

        <View style={{ gap: 20 }} className="w-full items-center gap-3">
          <InputField
            icon="mail"
            placeholder="Email..."
            onChangeText={(text) => (email.current = text)}
          />
          <InputField
            icon="key"
            placeholder="Password"
            onChangeText={(text) => (password.current = text)}
            secureTextEntry
          />
        </View>

        <View className="items-end w-full">
          <Pressable>
            <Text className="text-grey-900">Forgot Password?</Text>
          </Pressable>
        </View>

        <View className="w-full">
          <Button label="Login" onPress={submit} />
        </View>

        <View
          className="justify-center items-center w-full flex-row gap-1"
        >
          <Text style={{ justifyContent: "center" }}>
            Already have account{" "}
          </Text>
          <Pressable
            style={{ justifyContent: "center" }}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={{ color: Colors.primary }} className="text-primary">
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
}
