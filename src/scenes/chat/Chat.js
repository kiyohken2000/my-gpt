import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { View, StyleSheet, Platform, Image } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { generateChatMessage, userIds, generateCommandRMessage, userNames, generateImage, loadNegativePrompt } from '../../utils/textGenerate';
import moment from 'moment';
import SendButton from './SendButton';
import ImageButton from './ImageButton';
import FooterImage from './FooterImage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import HeaderRightButton from './HeaderRightButton';
import HeaderLeftButton from './HeaderLeftButton';
import DrawButton from './DrawButton';
import RenderImage from './RenderImage';
import { colors } from '../../theme';
import * as Clipboard from 'expo-clipboard';
import { showToast } from '../../utils/showToast';
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Settings from './Settings/Settings';
import BlurBox from '../../components/BlurBox/BlurBox';

const isAndroid = Platform.OS === 'android'

export default function Chat() {
  const navigation = useNavigation()
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '95%'], []);
  const [sheetPosition, setSheetPosition] = useState(0)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imagePath, setImagePath] = useState('')
  const [isThirdPerson, setIsThirdPerson] = useState(false)
  const [isImageMode, setIsImageMode] = useState(0)
  const [negativePromptRealisticVision, setNegativePromptRealisticVision] = useState('')
  const [negativePromptAnimagine, setNegativePromptAnimagine] = useState('')
  const [negativePromptPony, setNegativePromptPony] = useState('')
  const [negativePromptPvc, setNegativePromptPvc] = useState('')

  const handleSheetChanges = useCallback((index) => {
    setSheetPosition(index)
  }, []);

  useEffect(() => {
    const loadStorage = async() => {
      const {
        _negativePromptRealisticVision,
        _negativePromptAnimagine,
        _negativePromptPony,
        _negativePromptPvc,
      } = await loadNegativePrompt()
      setNegativePromptRealisticVision(_negativePromptRealisticVision)
      setNegativePromptAnimagine(_negativePromptAnimagine)
      setNegativePromptPony(_negativePromptPony)
      setNegativePromptPvc(_negativePromptPvc)
    }
    loadStorage()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={() => {
            setIsThirdPerson(false)
            setIsImageMode(0)
            setImagePath('')
            setMessages([])
          }}
        />
      ),
      headerLeft: () => (
        <View style={{flexDirection: 'row'}}>
          <HeaderLeftButton
            isThirdPerson={isThirdPerson}
            setIsThirdPerson={setIsThirdPerson}
          />
          <DrawButton
            isImageMode={isImageMode}
            setIsImageMode={setIsImageMode}
            setSheetPosition={setSheetPosition}
          />
        </View>
      )
    });
  }, [navigation, isThirdPerson, isImageMode, sheetPosition]);

  useEffect(() => {
    setMessages([])
    setImagePath('')
    setIsThirdPerson(false)
  }, [isImageMode])

  useEffect(() => {
    const onRecieveNewMessage = async() => {
      if(messages[0]) {
        const { text, user } = messages[0]
        if(user._id === userIds.user && !isImageMode) {
          setIsLoading(true)
          const reply = await generateChatMessage({messages})
          const botMessage = {
            _id: `${moment().unix()}`,
            createdAt: new Date(),
            text: reply,
            user: {
              _id: userIds.bot1,
              name: userNames.bot1,
            }
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, botMessage),
          )
          setIsLoading(false)
        } else if(user._id === userIds.bot1 && isThirdPerson) {
          setIsLoading(true)
          const reply = await generateCommandRMessage({input: text, messages})
          const botMessage = {
            _id: `${moment().unix()}`,
            createdAt: new Date(),
            text: reply,
            user: {
              _id: userIds.bot2,
              name: userNames.bot2,
            }
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, botMessage),
          )
          setIsLoading(false)
        } else if(user._id === userIds.user && isImageMode) {
          setIsLoading(true)
          const {imageUrl, message} = await generateImage({
            text, isImageMode,
            negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
          })
          const botMessage = {
            _id: `${moment().unix()}`,
            createdAt: new Date(),
            text: message,
            image: imageUrl,
            user: {
              _id: userIds.bot3,
              name: userNames.bot3,
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
        {!isImageMode?
          <ImageButton
            onImageButtonPress={onImageButtonPress}
          />
          :null
        }
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

  const renderMessageImage = (props) => {
    const { image } = props.currentMessage
    return (
      <RenderImage
        url={image}
      />
    )
  }

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
			/>
		),
		[]
	);

  return (
    <ScreenTemplate color={isAndroid?colors.darkPurple:colors.white}>
      <View style={styles.container}>
        <BlurBox>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userIds.user,
            name: userNames.user
          }}
          renderAvatar={null}
          isTyping={isLoading}
          renderSend={renderSend}
          alwaysShowSend={true}
          renderFooter={imagePath?renderChatFooter:null}
          placeholder={messages.length?'メッセージを入力':'お気軽にご質問ください'}
          keyboardShouldPersistTaps='never'
          maxInputLength={isImageMode?1000:100}
          onPress={(context, message) => onMessagePress({message})}
          renderMessageImage={renderMessageImage}
        />
        </BlurBox>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={sheetPosition}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
				backdropComponent={renderBackdrop}
      >
        <Settings
          negativePromptRealisticVision={negativePromptRealisticVision}
          setNegativePromptRealisticVision={setNegativePromptRealisticVision}
          negativePromptAnimagine={negativePromptAnimagine}
          setNegativePromptAnimagine={setNegativePromptAnimagine}
          negativePromptPony={negativePromptPony}
          setNegativePromptPony={setNegativePromptPony}
          negativePromptPvc={negativePromptPvc}
          setNegativePromptPvc={setNegativePromptPvc}
          setSheetPosition={setSheetPosition}
        />
      </BottomSheet>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})