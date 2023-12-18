import React from "react";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { colors, fontSize } from "../../theme";

export default function SendButton() {
  return (
    <FontIcon
      name="arrow-circle-up"
      color={colors.bluePrimary}
      size={fontSize.xxxxxxxLarge}
      style={{
        marginBottom: 5,
        marginRight: 10
      }}
    />
  )
}