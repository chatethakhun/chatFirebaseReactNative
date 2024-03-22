import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

type ChatListProps = {
  users: any[]
}
const ChatList = ({ users }: ChatListProps) => {
  return (
    <View className="flex-1">
      <FlatList data={users} contentContainerStyle={{
        flex: 1,
        paddingVertical: 25,
      }}
      keyExtractor={() => Math.random().toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return <ChatItem chat={item} noBorder={index + 1 === users.length } />
      }}
      />
    </View>
  )
}

export default ChatList