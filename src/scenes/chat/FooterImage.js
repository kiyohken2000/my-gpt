import React from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import FontIcon from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')

export default function FooterImage(props) {
  const { imagePath, onImagePress } = props

  if(!imagePath) {
    return <View/>
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onImagePress}
        style={styles.imageContainer}
      >
        <Image
          source={{uri: imagePath}}
          resizeMode='cover'
          style={styles.image}
        />
        <FontIcon
          name="times-circle"
          color={colors.darkPurple}
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10
  },
  imageContainer: {
    flexDirection: 'row'
  }
})