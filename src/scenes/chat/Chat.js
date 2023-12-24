import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Platform } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { generateChatMessage } from '../../utils/textGenerate';
import moment from 'moment';
import SendButton from './SendButton';
import ImageButton from './ImageButton';
import FooterImage from './FooterImage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import HeaderRightButton from './HeaderRightButton';
import { colors } from '../../theme';
import * as Clipboard from 'expo-clipboard';
import { showToast } from '../../utils/showToast';

const isAndroid = Platform.OS === 'android'

export default function Chat() {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={() => setMessages([])}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const onRecieveNewMessage = async() => {
      if(messages[0]) {
        const { text, user } = messages[0]
        if(user._id === 1) {
          setIsLoading(true)
          const reply = await generateChatMessage({messages})
          const botMessage = {
            _id: `${moment().unix()}`,
            createdAt: new Date(),
            text: reply,
            user: {
              _id: 2
            }
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, botMessage),
          )
          setIsLoading(false)
        }
      }
    }
    onRecieveNewMessage()
  }, [messages])

  const onSend = useCallback((messages) => {
    const newMessage = {
      ...messages[0],
      image: imagePath
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    )
    setImagePath('')
  }, [imagePath])

  const onImageButtonPress = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setImagePath(result.assets[0].uri);
    }
  }

  const renderChatFooter = () => {
    return (
      <FooterImage
        imagePath={imagePath}
        onImagePress={() => setImagePath('')}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ImageButton
          onImageButtonPress={onImageButtonPress}
        />
        <Send {...props}>
          <SendButton/>
        </Send>
      </View>
    )
  }

  const onMessagePress = async({message}) => {
    await Clipboard.setStringAsync(message.text);
    showToast({title: 'コピーしました', body: ''})
  }

  return (
    <ScreenTemplate color={isAndroid?colors.darkPurple:colors.white}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderAvatar={null}
          isTyping={isLoading}
          renderSend={renderSend}
          alwaysShowSend={true}
          renderFooter={imagePath?renderChatFooter:null}
          placeholder={messages.length?'メッセージを入力':'お気軽にご質問ください'}
          keyboardShouldPersistTaps='never'
          maxInputLength={100}
          onPress={(context, message) => onMessagePress({message})}
        />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})