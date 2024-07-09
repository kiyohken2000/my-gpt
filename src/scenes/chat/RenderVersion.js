import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import { versionName } from "../../config";

export default function RenderVersion() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>version. {versionName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  text: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: '700',
  }
})