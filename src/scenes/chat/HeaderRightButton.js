import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/Ionicons'
import { colors, fontSize } from "../../theme";

export default function HeaderRightButton(props) {
  const { onPress } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
      >
        <FontIcon
          name="reload"
          color={colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 15
  }
})