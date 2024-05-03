import React, { useState } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { saveImage, downloadAndSaveBlob } from "../../utils/downloadFunctions";
import moment from "moment";
import { colors } from "../../theme";
import FloatingActionButton from "../../components/FloatingActionButton";
import * as Clipboard from 'expo-clipboard';
import { uploadFunction } from "../../utils/uploadFunctions";
import { showToast } from "../../utils/showToast";
import ImageActionButton from "../../components/ImageActionButton";
import * as Linking from 'expo-linking';

const { width, height } = Dimensions.get('window')

export default function RenderImage(props) {
  const { url, onCreateVideo } = props
  const [visible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

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
      const {imageUrl, viewerUrl} = await uploadFunction({url})
      await Clipboard.setStringAsync(imageUrl);
      showToast({title: 'URLをコピーしました', body: ''})
      setIsVisible(false)
    } catch(e) {
      console.log('on copy error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const onTwitterSharePress = async() => {
    try {
      setIsUploading(true)
      const {imageUrl, viewerUrl} = await uploadFunction({url})
      const text = `#ガチ有能AI助手 で画像を生成しました ${viewerUrl}`
      const encodedText = encodeURIComponent(text)
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
      Linking.openURL(shareUrl)
    } catch(e) {
      console.log('on twitter share error', e)
    } finally {
      setIsUploading(false)
    }
  }

  const onCreateVideoPress = ()=> {
    onCreateVideo({url})
    setIsVisible(false)
  }

  return (
    <>
    <ImageView
      images={[{uri: url}]}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => setIsVisible(false)}
      onLongPress={onSavePress}
      FooterComponent={(props) => {
        return (
          <View style={{paddingBottom: height * 0.05, paddingRight: width * 0.1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <ImageActionButton
              source={require('../../../assets/images/twitter_x_logo.png')}
              onPress={onTwitterSharePress}
              isLoading={isUploading}
              color={colors.white}
              iconColor={colors.purple}
            />
            <View style={{paddingHorizontal: 10}} />
            <FloatingActionButton
              icon='film'
              onPress={onCreateVideoPress}
              isLoading={false}
              color={colors.pink}
              iconColor={colors.white}
            />
            <View style={{paddingHorizontal: 10}} />
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