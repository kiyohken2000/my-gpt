import React from "react";
import { MenuItem } from 'react-native-material-menu';
import { View } from "react-native";

export default function DrawButtonItem(props) {
  const { onItemPress, disable, item, isImageMode } = props

  if(!item.enable) {
    return null
  }

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