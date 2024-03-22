import { View, Text } from 'react-native'
import React from 'react'
type MessageListProps = {
  messages: any[]
}
const MessageList = ({ messages }: MessageListProps) => {
  return (
    <View>
      <Text>MessageList</Text>
    </View>
  )
}

export default MessageList