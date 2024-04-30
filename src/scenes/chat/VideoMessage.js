import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import VideoModal from './VideoModal';

const { width, height } = Dimensions.get('window')

export default function VideoMessage(props) {
  const { currentMessage } = props
  const [isVisible, setIsVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
      >
        <Video
          source={{ uri: currentMessage.video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{
            height: width * 0.4,
            width: '100%',
            borderRadius: 10,
            minWidth: width * 0.5
          }}
        />
      </TouchableOpacity>
      <VideoModal
        url={currentMessage.video}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </View>
  )
}