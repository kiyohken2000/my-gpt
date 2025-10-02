import React, { useContext } from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { TypingAnimation } from 'react-native-typing-animation';
import { UserContext } from "../../contexts/UserContext";

const { width } = Dimensions.get('window')

export default function FooterImage(props) {
  const { imagePath, onImagePress, onTagPress, isLoading } = props
  const { isReview, isDeepdanbooru } = useContext(UserContext)

  return (
    <View style={styles.container}>
      {imagePath?
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
            {!isReview && isDeepdanbooru?
              <TouchableOpacity
                onPress={onTagPress}
              >
                <FontIcon
                  name="tags"
                  color={colors.blueSecondary}
                  size={fontSize.xxxxxxxLarge}
                  style={{
                  }}
                />
              </TouchableOpacity>
              :null
            }
          </View>
        </View>
        :null
      }
      {isLoading?
        <View style={{paddingBottom: 10, paddingLeft: 5}}>
          <TypingAnimation 
            dotColor={colors.purple}
            dotMargin={5}
            dotAmplitude={3}
            dotSpeed={0.15}
            dotRadius={2.5}
            dotX={0}
            dotY={0}
          />
        </View>
        :null
      }
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