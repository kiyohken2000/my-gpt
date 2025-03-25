import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider(props) {
  const { isReview } = props

  if(isReview) {
    return <View/>
  }

  return (
    <View style={styles.divider} />
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 2
  }
})