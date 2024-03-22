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
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = useCallback(async (data: { email: string, password: string}) => {
    const { email, password } = data;

    await login(email, password);
    // console.log(email.current, password.current);
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
          source={require("../assets/images/login.png")}
          resizeMode="contain"
        />
        <View className="w-full items-center">
          <Text className="text-2xl font-bold mt-5">Welcome to the App</Text>
          <Text className="text-center">
            Please login to your account to continue
          </Text>
        </View>

        <View style={{ gap: 20 }} className="w-full items-center gap-3">
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { value, onChange } }) => (
              <InputField
                icon="mail"
                placeholder="Email..."
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Email is required" }}
            render={({ field: { value, onChange } }) => (
              <InputField
                icon="key"
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
        </View>

        <View className="items-end w-full">
          <Pressable>
            <Text className="text-grey-900">Forgot Password?</Text>
          </Pressable>
        </View>

        <View className="w-full">
          <Button label="Login" onPress={handleSubmit(submit)} />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          className="justify-center"
        >
          <View className="flex-row">
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Pressable
              style={{ justifyContent: "center" }}
              onPress={() => {
                router.push("/register");
              }}
            >
              <Text style={{ color: Colors.primary }} className="text-primary">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
}
