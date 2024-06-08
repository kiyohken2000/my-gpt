import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import VideoModal from './VideoModal';
import { userIds } from '../../utils/textGenerate';
import * as Linking from 'expo-linking';

const { width, height } = Dimensions.get('window')

export default function VideoMessage(props) {
  const { currentMessage } = props
  const [isVisible, setIsVisible] = useState(false)
  const [isPlayable, setIsPlayable] = useState(false);

  const handleReadyForDisplay = (event) => {
    if (event.naturalSize.width > 0 && event.naturalSize.height > 0) {
      setIsPlayable(true);
    }
  };

  const onPress = () => {
    if(isPlayable) {
      setIsVisible(true)
    } else if(!isPlayable && currentMessage.extra) {
      Linking.openURL(currentMessage.extra)
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
      >
        <Video
          source={{ uri: currentMessage.video }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          onReadyForDisplay={handleReadyForDisplay}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{
            height: isPlayable?width * 0.4:0,
            width: '100%',
            borderRadius: 10,
            minWidth: isPlayable?width * 0.5:0
          }}
        />
        {!isPlayable && currentMessage.extra?
          <Image
            source={require('../../../assets/images/icon_share.png')}
            resizeMode='cover'
            style={{
              height: width * 0.4,
              width: width * 0.5
            }}
          />:null
        }
      </TouchableOpacity>
      <VideoModal
        url={currentMessage.video}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isSong={currentMessage.user._id === userIds.bot6}
      />
    </View>
  )
}