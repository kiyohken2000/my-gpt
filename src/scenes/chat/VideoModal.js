import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from 'expo-av';
import Modal from "react-native-modal";
import { colors } from "../../theme";
import { saveVideo } from "../../utils/videoFunctions";
import { showToast } from "../../utils/showToast";

export default function VideoModal(props) {
  const { url, isVisible, setIsVisible } = props
  const [height, setHeight] = useState(100)

  const calculateHeight = (width) => {
    const aspectRatio = 9 / 16;
    return width * aspectRatio;
  };

  const onLayout = (e) => {
    const { width } = e.nativeEvent.layout
    const _height = calculateHeight(width)
    setHeight(_height)
  }

  const onSavePress = async() => {
    const res = await saveVideo({url})
    setIsVisible(false)
    if(res) {
      showToast({title: '保存しました'})
    } else {
      showToast({title: '保存できませんでした'})}
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
          <Video
            source={{ uri: url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            isLooping
            style={{
              height: height,
              width: '100%',
            }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black
  }
})