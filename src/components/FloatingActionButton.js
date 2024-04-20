import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather'

const { width } = Dimensions.get('window')

export default function FloatingActionButton(props) {
  const { icon, onPress, isLoading, color, iconColor } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[styles.button, {backgroundColor: color}]}
    >
      {isLoading?
        <ActivityIndicator size='small' color={iconColor} />:
        <FontIcon
          name={icon}
          color={iconColor}
          size={width * 0.08}
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