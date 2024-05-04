import React from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { colors, fontSize } from "../../theme";
import FontIcon from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')

export default function FooterImage(props) {
  const { imagePath, onImagePress, onTagPress, isLoading } = props

  if(!imagePath) {
    return <View/>
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.imageContainer}
      >
        <Image
          source={{uri: imagePath}}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={{justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={onImagePress}
          >
            <FontIcon
              name="times-circle"
              color={colors.darkPurple}
              size={fontSize.xxxxxxxLarge}
              style={{
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onTagPress}
            disabled={isLoading}
          >
            {isLoading?
              <ActivityIndicator size='small' color={colors.blueSecondary} />:
              <FontIcon
                name="tags"
                color={colors.blueSecondary}
                size={fontSize.xxxxxxxLarge}
                style={{
                }}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
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