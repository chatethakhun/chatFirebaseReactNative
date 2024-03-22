import { View, Text } from 'react-native'
import React from 'react'
import {
  MenuOption,
} from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type CustomMenuItemProps = {
  text: string;
  action: (value: any) => void;
  value: string | null;
  icon: string | JSX.Element;
}

const CustomMenuItem = ({ text, action, value, icon }: CustomMenuItemProps) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  )
}

export default CustomMenuItem