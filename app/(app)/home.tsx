import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "@/components/chats/ChatList";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "@/firebaseConfig";

export default function HomePage() {
  const { logOut, user } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);

  const getUsers = useCallback(async () => {
    const q = query(userRef, where("userId", "!=", user.uid));

    const querySnapshot = await getDocs(q);

    let data = [] as User[];

    querySnapshot.forEach((doc) => data.push({
      ...doc.data(),
      uid: doc.id,
    }));

    setUsers(data);
  }, []);

  useEffect(() => {
    if(user.uid){
      getUsers();
    }
  }, [getUsers]);

  

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex item-center">
          <ActivityIndicator size="large" style={{ top: hp(30) }} />
        </View>
      )}
    </View>
  );
}
