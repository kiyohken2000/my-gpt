import React from "react";
import { TouchableOpacity } from "react-native";
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fontSize } from "../../../theme";

export default function Anchor(props) {
  const { onPress, isImageMode } = props

  return (
    <FontIcon
      name="draw"
      color={isImageMode?colors.yellowPrimary:colors.white}
      size={fontSize.xxxxxxxLarge}
      style={{
      }}
    />
  )
}