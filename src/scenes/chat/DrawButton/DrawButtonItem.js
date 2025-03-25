import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MenuOption } from 'react-native-popup-menu';

export default function DrawButtonItem(props) {
  const { onItemPress, disable, item, isImageMode } = props;

  if(!item.enable || disable) {
    return null;
  }

  return (
    <MenuOption onSelect={() => onItemPress(item.sequence)}>
      <View style={styles.menuItem}>
        <Text style={styles.optionText}>
          {`${item.label}${isImageMode === item.sequence ? '✔' : ''}`}
        </Text>
      </View>
    </MenuOption>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
  }
});