import { View, Text, Alert } from "react-native";
import React from "react";
import CustomKeyboardAvoidingView from "@/components/CustomKeyboardAvoidingView";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import InputField from "@/components/fields/input";
import Button from "@/components/button";
import { Image } from "expo-image";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "@/constants/common";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      photoURL: user?.photoURL ?? "",
    },
  });

  const submit = async (data: {
    name: string;
    email: string;
    photoURL: string;
  }) => {
    if (!isValid) return;

    console.log(data);

    try {
      await updateProfile(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <CustomKeyboardAvoidingView>
      <View className="flex-1 bg-white ">
        <StatusBar style="dark" />
        <ProfileHeader />

        <View className="h-0.5 bg-neutral-200 mt-3" />

        <View style={{ gap: 30 }} className="flex-1 bg-white mt-3 px-4">
          <View className="items-center">
            <Image
              className="rounded-full"
              source={
                user?.photoURL ??
                "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
              }
              style={{ height: hp(17.5), aspectRatio: 1 }}
              placeholder={blurhash}
              transition={500}
            />
          </View>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Name.."
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Email.."
                onChangeText={onChange}
                disabled
              />
            )}
          />

          <Controller
            control={control}
            name="photoURL"
            rules={{ required: "Photo URL is required" }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                placeholder="Photo Url.."
                onChangeText={onChange}
              />
            )}
          />

          <View className="w-full">
            <Button label="Update" onPress={handleSubmit(submit)} />
          </View>
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default Profile;
