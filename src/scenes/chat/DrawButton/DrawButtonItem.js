import React from "react";
import { MenuItem } from 'react-native-material-menu';
import { View } from "react-native";

export default function DrawButtonItem(props) {
  const { onItemPress, disable, item, isImageMode } = props

  if(disable) {
    return null
  }

  return (
    <MenuItem
      onPress={() => onItemPress({val: item.sequence})}
    >
      {`${item.label}${isImageMode === item.sequence?'✔':''}`}
    </MenuItem>
  )
}