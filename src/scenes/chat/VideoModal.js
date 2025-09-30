import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import Modal from "react-native-modal";
import { colors } from "../../theme";
import { saveVideo } from "../../utils/videoFunctions";
import { showToast } from "../../utils/showToast";
import FloatingActionButton from "../../components/FloatingActionButton";
import ImageActionButton from "../../components/ImageActionButton";
import { uploadImgur } from "../../utils/uploadFunctions";
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

export default function VideoModal(props) {
  const { url, isVisible, setIsVisible, isSong, extra } = props
  const [height, setHeight] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const player = useVideoPlayer(url, player => {
    player.loop = true;
    player.muted = false;
    player.volume = 1.0;
  });

  useEffect(() => {
    if (isVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [isVisible, player]);

  const calculateHeight = (width) => {
    const aspectRatio = isSong? 3 / 2:9 / 16;
    return width * aspectRatio;
  };

  const onLayout = (e) => {
    const { width } = e.nativeEvent.layout
    const _height = calculateHeight(width)
    setHeight(_height)
  }

  const onSavePress = async() => {
    setIsVisible(false)
    const res = await saveVideo({url})
    if(res) {
      showToast({title: '保存しました'})
    } else {
      showToast({title: '保存できませんでした'})
    }
  }

  const onCopyPress = async() => {
    try {
      setIsLoading(true)
      const { videoUrl } = await uploadImgur({imagePath: url})
      await Clipboard.setStringAsync(videoUrl);
      showToast({title: 'URLをコピーしました'})
    } catch(e) {
      console.log('on copy press error', e)
      showToast({title: 'URLをコピーできませんでした'})
    } finally {
      setIsLoading(false)
      setIsVisible(false)
    }
  }

  const onTwitterSharePress = async() => {
    try {
      setIsUploading(true)
      const { videoLink } = await uploadImgur({imagePath: url})
      const text = `#ガチ有能AI助手 で動画を生成しました ${videoLink}`
      const encodedText = encodeURIComponent(text)
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
      Linking.openURL(shareUrl)
    } catch(e) {
      console.log('on twitter share press error', e)
    } finally {
      setIsUploading(false)
      setIsVisible(false)
    }
  }

  const onOpenVideo = async() => {
    Linking.openURL(extra)
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View
        style={styles.container}
        onLayout={onLayout}
      >
        <TouchableOpacity
          onLongPress={onSavePress}
        >
          <VideoView
            player={player}
            style={{
              height: height,
              width: '100%',
            }}
            nativeControls={false}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10}}>
          {!isSong?
            <ImageActionButton
              source={require('../../../assets/images/twitter_x_logo.png')}
              onPress={onTwitterSharePress}
              isLoading={isUploading}
              color={colors.white}
              iconColor={colors.purple}
            />
            :null
          }
          <View style={{paddingHorizontal: 5}} />
          <FloatingActionButton
            icon='download'
            onPress={onSavePress}
            isLoading={false}
            color={colors.redSecondary}
            iconColor={colors.white}
          />
          <View style={{paddingHorizontal: 5}} />
          {isSong && extra?
            <FloatingActionButton
              icon='share'
              onPress={onOpenVideo}
              isLoading={isLoading}
              color={colors.purple}
              iconColor={colors.white}
            />
            :
            <FloatingActionButton
              icon='copy'
              onPress={onCopyPress}
              isLoading={isLoading}
              color={colors.purple}
              iconColor={colors.white}
            />
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})