import React from "react";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { colors, fontSize } from "../../theme";
import { TouchableOpacity } from "react-native";

export default function ImageButton(props) {
  const { onImageButtonPress } = props
  
  return (
    <TouchableOpacity
      onPress={onImageButtonPress}
    >
      <FontIcon
        name="image"
        color={colors.darkPurple}
        size={fontSize.xxxxxxxLarge}
        style={{
          marginRight: 10
        }}
      />
    </TouchableOpacity>
  )
}