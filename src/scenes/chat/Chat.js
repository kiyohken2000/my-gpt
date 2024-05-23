import React, { useState, useCallback, useEffect, useRef, useMemo, useContext } from 'react'
import { View, StyleSheet, Platform, Image } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { generateChatMessage, userIds, generateCommandRMessage, userNames, generateImage, loadNegativePrompt, generateTags } from '../../utils/textGenerate';
import moment from 'moment';
import SendButton from './SendButton';
import ImageButton from './ImageButton';
import FooterImage from './FooterImage';
import VideoMessage from './VideoMessage';
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
import { createVideo } from '../../utils/videoFunctions';
import { UserContext } from '../../contexts/UserContext';

const isAndroid = Platform.OS === 'android'

export default function Chat() {
  const navigation = useNavigation()
  const { imgbbKey } = useContext(UserContext)
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '95%'], []);
  const [sheetPosition, setSheetPosition] = useState(0)
  const [messages, setMessages] = useState([])
  const [imagePath, setImagePath] = useState('')
  const [isThirdPerson, setIsThirdPerson] = useState(false)
  const [isImageMode, setIsImageMode] = useState(0)
  const [negativePromptRealisticVision, setNegativePromptRealisticVision] = useState('')
  const [negativePromptAnimagine, setNegativePromptAnimagine] = useState('')
  const [negativePromptPony, setNegativePromptPony] = useState('')
  const [negativePromptPvc, setNegativePromptPvc] = useState('')
  const [negativePromptChillOut, setNegativePromptChillOut] = useState('')
  const [negativePromptNsfwGenAnime, setNegativePromptNsfwGenAnime] = useState('')
  const [negativePromptNovelAIRemix, setNegativePromptNovelAIRemix] = useState('')
  const [negativePromptNsfwGen, setNegativePromptNsfwGen] = useState('')
  const [negativePromptDeliberate, setNegativePromptDeliberate] = useState('')
  const [negativePromptRealPony, setNegativePromptRealPony] = useState('')
  const [negativePromptArtiWaifu, setNegativePromptArtiWaifu] = useState('')
  const [negativePromptStarryXL, setNegativePromptStarryXL] = useState('')
  const [negativePromptYakiDofuMix, setNegativePromptYakiDofuMix] = useState('')
  const [creatingContentIDs, setCreatingContentIDs] = useState([])

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
        _negativePromptChillOut,
        _negativePromptNsfwGenAnime,
        _negativePromptNovelAIRemix,
        _negativePromptNsfwGen,
        _negativePromptDeliberate,
        _negativePromptRealPony,
        _negativePromptArtiWaifu,
        _negativePromptStarryXL,
        _negativePromptYakiDofuMix,
      } = await loadNegativePrompt()
      setNegativePromptRealisticVision(_negativePromptRealisticVision)
      setNegativePromptAnimagine(_negativePromptAnimagine)
      setNegativePromptPony(_negativePromptPony)
      setNegativePromptPvc(_negativePromptPvc)
      setNegativePromptChillOut(_negativePromptChillOut)
      setNegativePromptNsfwGenAnime(_negativePromptNsfwGenAnime)
      setNegativePromptNovelAIRemix(_negativePromptNovelAIRemix)
      setNegativePromptNsfwGen(_negativePromptNsfwGen)
      setNegativePromptDeliberate(_negativePromptDeliberate)
      setNegativePromptRealPony(_negativePromptRealPony)
      setNegativePromptArtiWaifu(_negativePromptArtiWaifu)
      setNegativePromptStarryXL(_negativePromptStarryXL)
      setNegativePromptYakiDofuMix(_negativePromptYakiDofuMix)
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
    if(isImageMode === 0) {
      setMessages([])
    }
    setImagePath('')
    setIsThirdPerson(false)
  }, [isImageMode])

  useEffect(() => {
    const onRecieveNewMessage = async() => {
      if(messages[0]) {
        const { text, user } = messages[0]
        if(user._id === userIds.user && !isImageMode) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const reply = await generateChatMessage({messages})
          const botMessage = {
            _id: timestamp,
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
          setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
        } else if(user._id === userIds.bot1 && isThirdPerson) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const reply = await generateCommandRMessage({input: text, messages})
          const botMessage = {
            _id: timestamp,
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
          setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
        } else if(user._id === userIds.user && isImageMode) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const {imageUrl, message} = await generateImage({
            text, isImageMode,
            negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
            negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
            negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
            negativePromptYakiDofuMix,
          })
          const botMessage = {
            _id: timestamp,
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
          setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
        }
      }
    }
    onRecieveNewMessage()
  }, [messages])

  const onCreateVideo = async({url}) => {
    const timestamp = `${moment().valueOf()}`
    setCreatingContentIDs(prev => [...prev, timestamp])
    const { videoUrl, message } = await createVideo({url})
    const botMessage = {
      _id: timestamp,
      createdAt: new Date(),
      text: message,
      video: videoUrl,
      user: {
        _id: userIds.bot4,
        name: userNames.bot4,
      }
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, botMessage),
    )
    setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
  }

  const onTagPress = async() => {
    const timestamp = `${moment().valueOf()}`
    const _imagePath = imagePath
    setImagePath('')
    setCreatingContentIDs(prev => [...prev, timestamp])
    const {message, imageUrl} = await generateTags({imagePath: _imagePath, imgbbKey})
    const botMessage = {
      _id: timestamp,
      createdAt: new Date(),
      text: message,
      image: _imagePath,
      user: {
        _id: userIds.bot5,
        name: userNames.bot5,
      }
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, botMessage),
    )
    setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
  }

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
        onTagPress={onTagPress}
        isLoading={creatingContentIDs.length?true:false}
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
        onCreateVideo={onCreateVideo}
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
          //isTyping={creatingContentIDs.length?true:false}
          renderSend={renderSend}
          alwaysShowSend={true}
          renderFooter={renderChatFooter}
          placeholder={messages.length?'メッセージを入力':'お気軽にご質問ください'}
          keyboardShouldPersistTaps='never'
          maxInputLength={isImageMode?1000:100}
          onPress={(context, message) => onMessagePress({message})}
          renderMessageImage={renderMessageImage}
          renderMessageVideo={(props) => <VideoMessage {...props} />}
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
          negativePromptChillOut={negativePromptChillOut}
          setNegativePromptChillOut={setNegativePromptChillOut}
          negativePromptNsfwGenAnime={negativePromptNsfwGenAnime}
          setNegativePromptNsfwGenAnime={setNegativePromptNsfwGenAnime}
          negativePromptNovelAIRemix={negativePromptNovelAIRemix}
          setNegativePromptNovelAIRemix={setNegativePromptNovelAIRemix}
          negativePromptNsfwGen={negativePromptNsfwGen}
          setNegativePromptNsfwGen={setNegativePromptNsfwGen}
          negativePromptDeliberate={negativePromptDeliberate}
          setNegativePromptDeliberate={setNegativePromptDeliberate}
          negativePromptRealPony={negativePromptRealPony}
          setNegativePromptRealPony={setNegativePromptRealPony}
          negativePromptArtiWaifu={negativePromptArtiWaifu}
          setNegativePromptArtiWaifu={setNegativePromptArtiWaifu}
          negativePromptStarryXL={negativePromptStarryXL}
          setNegativePromptStarryXL={setNegativePromptStarryXL}
          negativePromptYakiDofuMix={negativePromptYakiDofuMix}
          setNegativePromptYakiDofuMix={setNegativePromptYakiDofuMix}
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