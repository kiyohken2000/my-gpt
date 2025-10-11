import React from 'react';
import { View } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import Markdown from 'react-native-markdown-display';
import { colors } from '../../theme';

const MarkdownBubble = (props) => {
  const { position } = props;
  const isRight = position === 'right';
  
  // 文字色のスタイル設定
  const markdownStyles = {
    body: {
      color: isRight ? colors.white : colors.black, // 右側: 白、左側: 黒
    },
  };
  
  return (
    <Bubble
      {...props}
      renderMessageText={() => (
        <View style={{ paddingHorizontal: 10 }}>
          <Markdown style={markdownStyles}>
            {props.currentMessage.text}
          </Markdown>
        </View>
      )}
    />
  );
};

export default MarkdownBubble;