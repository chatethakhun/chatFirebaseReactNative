import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '@/contexts/AuthContext';

const ProfileHeader = () => {
  const router = useRouter();
  const { user } = useAuth();

  const goBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <Stack.Screen
      options={{
        title: user?.name ?? "Anonymous",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center">
            <TouchableOpacity onPress={goBack}>
              <Entypo name="chevron-left" size={hp(4)} color={"#737373"} />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  )
}

export default ProfileHeader