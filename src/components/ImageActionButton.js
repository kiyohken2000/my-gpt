import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";

const { width } = Dimensions.get('window')

export default function ImageActionButton(props) {
  const { source, color, isLoading, onPress, iconColor } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: color}]}
      disabled={isLoading}
    >
      {isLoading?
        <ActivityIndicator size='small' color={iconColor} />:
        <Image
          source={source}
          resizeMode='cover'
          style={{
            width: width * 0.12,
            height: width * 0.12
          }}
        />
      }
    </TouchableOpacity>
  )
}

const circleRatio = width * 0.15
const styles = StyleSheet.create({
  button: {
    width: circleRatio,
    height: circleRatio,
    borderRadius: circleRatio/2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})