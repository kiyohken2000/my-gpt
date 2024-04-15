import React, { useState } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { saveImage, downloadAndSaveBlob } from "../../utils/downloadFunctions";
import moment from "moment";
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from "../../theme";
import FloatingActionButton from "../../components/FloatingActionButton";
import * as Clipboard from 'expo-clipboard';
import { uploadFunction } from "../../utils/uploadFunctions";
import { showToast } from "../../utils/showToast";

const { width, height } = Dimensions.get('window')

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

  const onCopyPress = async() => {
    try {
      setIsLoading(true)
      const imageUrl = await uploadFunction({url})
      await Clipboard.setStringAsync(imageUrl);
      showToast({title: 'URLをコピーしました', body: ''})
      setIsVisible(false)
    } catch(e) {
      console.log('on copy error', e)
    } finally {
      setIsLoading(false)
    }
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
      FooterComponent={(props) => {
        return (
          <View style={{paddingBottom: height * 0.05, alignItems: 'flex-end', paddingRight: width * 0.1}}>
            <FloatingActionButton
              icon='copy'
              onPress={onCopyPress}
              isLoading={isLoading}
              color={colors.purple}
              iconColor={colors.white}
            />
          </View>
        )
      }}
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