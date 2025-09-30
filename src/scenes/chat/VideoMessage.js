import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import VideoModal from './VideoModal';
import { userIds } from '../../utils/textGenerate';
import * as Linking from 'expo-linking';

const { width, height } = Dimensions.get('window')

export default function VideoMessage(props) {
  const { currentMessage } = props
  const [isVisible, setIsVisible] = useState(false)
  const [isPlayable, setIsPlayable] = useState(false);

  const player = useVideoPlayer(currentMessage.video, player => {
    player.loop = true;
    player.volume = 0;
    player.play();
  });

  useEffect(() => {
    if(currentMessage.user._id === userIds.bot7 || currentMessage.user._id === userIds.bot4) {
      setIsPlayable(true)
    }
  }, [currentMessage])

  useEffect(() => {
    const subscription = player.addListener('statusChange', (status) => {
      if (status === 'readyToPlay') {
        setIsPlayable(true);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

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
        <VideoView
          player={player}
          style={{
            height: isPlayable?width * 0.4:0,
            width: '100%',
            borderRadius: 10,
            minWidth: isPlayable?width * 0.5:0
          }}
          nativeControls={false}
          contentFit="cover"
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
        extra={currentMessage.extra}
      />
    </View>
  )
}