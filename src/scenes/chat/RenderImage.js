import React, { useState } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ImageView from "react-native-image-viewing";
import { saveImage, downloadAndSaveBlob } from "../../utils/downloadFunctions";
import moment from "moment";
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from "../../theme";

const { width } = Dimensions.get('window')

export default function RenderImage(props) {
  const { url } = props
  const [visible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSavePress = async() => {
    setIsLoading(true)
    const fileName = `${moment().unix()}.jpg`
    await saveImage({url, fileName})
    setIsVisible(false)
    setIsLoading(false)
  }

  return (
    <>
    <Spinner
      visible={isLoading}
      overlayColor={colors.clearBlack}
    />
    <ImageView
      images={[{uri: url}]}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => setIsVisible(false)}
      onLongPress={onSavePress}
    />
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsVisible(true)}
    >
      <Image
        source={{uri: url}}
        resizeMode='cover'
        style={{
          height: width * 0.4,
          width: '100%',
          borderRadius: 10,
          minWidth: width * 0.5
        }}
      />
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})