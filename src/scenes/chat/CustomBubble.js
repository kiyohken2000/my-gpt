import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme';

/**
 * 選択可能なテキストを表示するカスタムバブルレンダラー
 * @param {Object} props - Gifted Chatから渡されるバブルのプロパティ
 * @returns {React.Component} カスタマイズされたバブルコンポーネント
 */
const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      renderMessageText={(messageTextProps) => {
        const isUserMessage = props.position === 'right';
        
        return (
          <View style={[
            styles.messageBubble,
            isUserMessage ? styles.userBubble : styles.otherBubble
          ]}>
            <TextInput
              value={messageTextProps.currentMessage.text}
              editable={false}
              multiline={true}
              scrollEnabled={false}
              contextMenuHidden={false}
              selectTextOnFocus={false}
              selectionColor={isUserMessage ? colors.redPrimary : colors.blueSecondary}
              style={[
                styles.messageText,
                isUserMessage ? styles.userMessageText : styles.otherMessageText
              ]}
            />
          </View>
        );
      }}
      wrapperStyle={{
        left: styles.leftBubbleWrapper,
        right: styles.rightBubbleWrapper,
      }}
    />
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    padding: 0,
    marginBottom: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  userBubble: {
    backgroundColor: colors.blueSecondary,
  },
  otherBubble: {
    backgroundColor: colors.grayFifth,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: 'center',
  },
  userMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.black,
  },
  leftBubbleWrapper: {
    marginRight: 60,
  },
  rightBubbleWrapper: {
    marginLeft: 60,
  },
});

export default CustomBubble;