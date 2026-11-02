import React, { useState, useCallback, useEffect, useRef, useMemo, useContext } from 'react'
import { View, StyleSheet, Platform } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { GiftedChat, Send, Composer, InputToolbar } from 'react-native-gifted-chat'
import { generateChatMessage, userIds, generateCommandRMessage, userNames, generateImage, loadNegativePrompt, generateTags, generateImageFromZeroGPU } from '../../utils/textGenerate';
import { generateSong, invalidTextLength } from '../../utils/songGenerate';
import moment from 'moment';
import CustomComposer from './CustomComposer';
import MarkdownBubble from './MarkdownBubble';
import SendButton from './SendButton';
import ImageButton from './ImageButton';
import DonateButton from './DonateButton';
import FooterImage from './FooterImage';
import VideoMessage from './VideoMessage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import HeaderRightButton from './HeaderRightButton';
import HeaderLeftButton from './HeaderLeftButton';
import DrawButton from './DrawButton/DrawButton';
import SongButton from './SongButton';
import VoiceButton from './VoiceButton';
import RenderImage from './RenderImage';
import { colors } from '../../theme';
import * as Clipboard from 'expo-clipboard';
import { showToast } from '../../utils/showToast';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Settings from './Settings/Settings';
import BlurBox from '../../components/BlurBox/BlurBox';
import { createVideo } from '../../utils/videoFunctions';
import { generateVoice } from '../../utils/voiceGenerate';
import { UserContext } from '../../contexts/UserContext';
import { calculateMessageMaxLength, onRecieveNewMessageHaptic } from './functions';
import { generateRandomVoide } from '../../utils/voiceGenerate';
import AdContainer from './AdContainer';

const isAndroid = Platform.OS === 'android'

export default function Chat() {
  const navigation = useNavigation()
  const { imgbbKey, isSongEnable, geminiKey } = useContext(UserContext)
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '95%'], []);
  const [sheetPosition, setSheetPosition] = useState(0)
  const [messages, setMessages] = useState([])
  const [imagePath, setImagePath] = useState('')
  const [isThirdPerson, setIsThirdPerson] = useState(false)
  const [isSongMode, setIsSongMode] = useState(false)
  const [isImageMode, setIsImageMode] = useState(0)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
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
  const [negativePromptEbaraPony, setNegativePromptEbaraPony] = useState('')
  const [negativePromptWaiANIMIXPONYXL, setNegativePromptWaiANIMIXPONYXL] = useState('')
  const [negativePromptWaiREALMIX, setNegativePromptWaiREALMIX] = useState('')
  const [negativePromptAnythingXL, setNegativePromptAnythingXL] = useState('')
  const [negativePromptWaiREALCN, setNegativePromptWaiREALCN] = useState('')
  const [negativePromptAnimeBulldozer, setNegativePromptAnimeBulldozer] = useState('')
  const [negativePromptMomoiroPony, setNegativePromptMomoiroPony] = useState('')
  const [negativePromptHanamomoPony, setNegativePromptHanamomoPony] = useState('')
  const [negativePromptDeepDarkHentaiMix, setNegativePromptDeepDarkHentaiMix] = useState('')
  const [negativePromptSeventhAnimeXLPony, setNegativePromptSeventhAnimeXLPony] = useState('')
  const [negativePromptRealPonyCuteJp, setNegativePromptRealPonyCuteJp] = useState('')
  const [negativePromptRumblexl, setNegativePromptRumblexl] = useState('')
  const [negativePromptMix3x3x3xl, setNegativePromptMix3x3x3xl] = useState('')
  const [negativePromptYamersAnime, setNegativePromptYamersAnime] = useState('')
  const [negativePromptBaxl, setNegativePromptBaxl] = useState('')
  const [negativePromptCuteCore, setNegativePromptCuteCore] = useState('')
  const [negativePromptFeaturelessMix, setNegativePromptFeaturelessMix] = useState('')
  const [negativePromptManmaruMix, setNegativePromptManmaruMix] = useState('')
  const [negativePromptChacolOmegaMix, setNegativePromptChacolOmegaMix] = useState('')
  const [negativePromptEponaMix, setNegativePromptEponaMix] = useState('')
  const [negativePromptPVCMovable, setNegativePromptPVCMovable] = useState('')
  const [negativePromptPVCRealistic, setNegativePromptPVCRealistic] = useState('')
  const [negativePromptPVCFantasy, setNegativePromptPVCFantasy] = useState('')
  const [negativePromptHolodayoXL, setNegativePromptHolodayoXL] = useState('')
  const [negativePromptKivotosXL, setNegativePromptKivotosXL] = useState('')
  const [negativePromptJuggernautXL, setNegativePromptJuggernautXL] = useState('')
  const [negativePromptNovaAnimeXL, setNegativePromptNovaAnimeXL] = useState('')
  const [negativePromptWaiNSFWIllustrious, setNegativePromptWaiNSFWIllustrious] = useState('')
  const [negativePromptShiitakeMix, setNegativePromptShiitakeMix] = useState('')
  const [negativePromptNoobreal, setNegativePromptNoobreal] = useState('')
  const [negativePromptMatureRitual, setNegativePromptMatureRitual] = useState('')
  const [negativePromptRedcraft, setNegativePromptRedcraft] = useState('')
  const [negativePromptNovaFurryXL, setNegativePromptNovaFurryXL] = useState('')
  const [negativePromptPornMasterPro, setNegativePromptPornMasterPro] = useState('')
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
        _negativePromptEbaraPony,
        _negativePromptWaiANIMIXPONYXL,
        _negativePromptWaiREALMIX,
        _negativePromptAnythingXL,
        _negativePromptWaiREALCN,
        _negativePromptAnimeBulldozer,
        _negativePromptMomoiroPony,
        _negativePromptHanamomoPony,
        _negativePromptDeepDarkHentaiMix,
        _negativePromptSeventhAnimeXLPony,
        _negativePromptRealPonyCuteJp,
        _negativePromptRumblexl,
        _negativePromptMix3x3x3xl,
        _negativePromptYamersAnime,
        _negativePromptBaxl,
        _negativePromptCuteCore,
        _negativePromptFeaturelessMix,
        _negativePromptManmaruMix,
        _negativePromptChacolOmegaMix,
        _negativePromptEponaMix,
        _negativePromptPVCMovable,
        _negativePromptPVCRealistic,
        _negativePromptPVCFantasy,
        _negativePromptHolodayoXL,
        _negativePromptKivotosXL,
        _negativePromptJuggernautXL,
        _negativePromptNovaAnimeXL,
        _negativePromptWaiNSFWIllustrious,
        _negativePromptShiitakeMix,
        _negativePromptNoobreal,
        _negativePromptMatureRitual,
        _negativePromptRedcraft,
        _negativePromptNovaFurryXL,
        _negativePromptPornMasterPro,
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
      setNegativePromptEbaraPony(_negativePromptEbaraPony)
      setNegativePromptWaiANIMIXPONYXL(_negativePromptWaiANIMIXPONYXL)
      setNegativePromptWaiREALMIX(_negativePromptWaiREALMIX)
      setNegativePromptAnythingXL(_negativePromptAnythingXL)
      setNegativePromptWaiREALCN(_negativePromptWaiREALCN)
      setNegativePromptAnimeBulldozer(_negativePromptAnimeBulldozer)
      setNegativePromptMomoiroPony(_negativePromptMomoiroPony)
      setNegativePromptHanamomoPony(_negativePromptHanamomoPony)
      setNegativePromptDeepDarkHentaiMix(_negativePromptDeepDarkHentaiMix)
      setNegativePromptSeventhAnimeXLPony(_negativePromptSeventhAnimeXLPony)
      setNegativePromptRealPonyCuteJp(_negativePromptRealPonyCuteJp)
      setNegativePromptRumblexl(_negativePromptRumblexl)
      setNegativePromptMix3x3x3xl(_negativePromptMix3x3x3xl)
      setNegativePromptYamersAnime(_negativePromptYamersAnime)
      setNegativePromptBaxl(_negativePromptBaxl)
      setNegativePromptCuteCore(_negativePromptCuteCore)
      setNegativePromptFeaturelessMix(_negativePromptFeaturelessMix)
      setNegativePromptManmaruMix(_negativePromptManmaruMix)
      setNegativePromptChacolOmegaMix(_negativePromptChacolOmegaMix)
      setNegativePromptEponaMix(_negativePromptEponaMix)
      setNegativePromptPVCMovable(_negativePromptPVCMovable)
      setNegativePromptPVCRealistic(_negativePromptPVCRealistic)
      setNegativePromptPVCFantasy(_negativePromptPVCFantasy)
      setNegativePromptHolodayoXL(_negativePromptHolodayoXL)
      setNegativePromptKivotosXL(_negativePromptKivotosXL)
      setNegativePromptJuggernautXL(_negativePromptJuggernautXL)
      setNegativePromptNovaAnimeXL(_negativePromptNovaAnimeXL)
      setNegativePromptWaiNSFWIllustrious(_negativePromptWaiNSFWIllustrious)
      setNegativePromptShiitakeMix(_negativePromptShiitakeMix)
      setNegativePromptNoobreal(_negativePromptNoobreal)
      setNegativePromptMatureRitual(_negativePromptMatureRitual)
      setNegativePromptRedcraft(_negativePromptRedcraft)
      setNegativePromptNovaFurryXL(_negativePromptNovaFurryXL)
      setNegativePromptPornMasterPro(_negativePromptPornMasterPro)
    }
    loadStorage()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <DonateButton/>
          <HeaderRightButton
            onPress={() => {
              setIsThirdPerson(false)
              setIsImageMode(0)
              setImagePath('')
              setIsSongMode(false)
              setIsVoiceMode(false)
              setMessages([])
            }}
          />
        </View>
      ),
      headerLeft: () => (
        <View style={{flexDirection: 'row'}}>
          {/*
          */}
          <HeaderLeftButton
            isThirdPerson={isThirdPerson}
            setIsThirdPerson={setIsThirdPerson}
          />
          <DrawButton
            isImageMode={isImageMode}
            setIsImageMode={setIsImageMode}
            setSheetPosition={setSheetPosition}
          />
          {isSongEnable?
            <SongButton
              isSongMode={isSongMode}
              setIsSongMode={setIsSongMode}
            />
            :null
          }
          <VoiceButton
            isVoiceMode={isVoiceMode}
            setIsVoiceMode={setIsVoiceMode}
            onGenerateRandomVoice={onGenerateRandomVoice}
          />
        </View>
      )
    });
  }, [navigation, isThirdPerson, isImageMode, sheetPosition, isSongMode, isVoiceMode]);

  useEffect(() => {
    if(isImageMode === 0) {
      setMessages([])
    }
    if(isImageMode >= 1) {
      setIsSongMode(false)
      setIsVoiceMode(false)
    }
    setImagePath('')
    setIsThirdPerson(false)
  }, [isImageMode])

  useEffect(() => {
    if(isSongMode) {
      setIsImageMode(0)
      setMessages([])
      setImagePath('')
      setIsThirdPerson(false)
      setIsVoiceMode(false)
    }
  }, [isSongMode])

  useEffect(() => {
    if(isVoiceMode) {
      setIsImageMode(0)
      setMessages([])
      setImagePath('')
      setIsThirdPerson(false)
      setIsSongMode(false)
    }
  }, [isVoiceMode])

  useEffect(() => {
    const onRecieveNewMessage = async() => {
      if(messages[0]) {
        const { text, user } = messages[0]
        if(user._id === userIds.user && !isImageMode && !isSongMode && !isVoiceMode) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const reply = await generateChatMessage({messages, geminiKey})
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
          onRecieveNewMessageHaptic()
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
          onRecieveNewMessageHaptic()
          setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
        } else if(user._id === userIds.user && isImageMode) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const {imageUrl, message} = await generateImageFromZeroGPU({
            text, isImageMode,
            negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
            negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
            negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
            negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
            negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
            negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
            negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
            negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
            negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
            negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
            negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
            negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
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
          if(botMessage.image) {
            onRecieveNewMessageHaptic()
          }
          setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
        } else if(user._id === userIds.user && isSongMode) {
          const timestamp = `${moment().valueOf()}`
          if(text.length <= 50) {
            const botMessage = {
              _id: timestamp,
              createdAt: new Date(),
              text: invalidTextLength,
              user: {
                _id: userIds.bot6,
                name: userNames.bot6,
              }
            }
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, botMessage),
            )
            onRecieveNewMessageHaptic()
          } else {
            setCreatingContentIDs(prev => [...prev, timestamp])
            const response = await generateSong({text})
            response.map((item, i) => {
              const botMessage = {
                _id: `${timestamp}_${i}`,
                createdAt: new Date(),
                text: item.message,
                video: item.videoUrl,
                extra: item.remoteUrl,
                user: {
                  _id: userIds.bot6,
                  name: userNames.bot6,
                }
              }
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, botMessage),
              )
            })
            onRecieveNewMessageHaptic()
            setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
          }
        } else if(user._id === userIds.user && isVoiceMode) {
          const timestamp = `${moment().valueOf()}`
          setCreatingContentIDs(prev => [...prev, timestamp])
          const { message, videoUrl } = await generateVoice({text})
          const botMessage = {
            _id: timestamp,
            createdAt: new Date(),
            text: message,
            video: videoUrl,
            user: {
              _id: userIds.bot7,
              name: userNames.bot7,
            }
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, botMessage),
          )
          onRecieveNewMessageHaptic()
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
    onRecieveNewMessageHaptic()
    setCreatingContentIDs(prev => prev.filter((v) => v !== timestamp))
  }

  const onGenerateRandomVoice = async() => {
    const timestamp = `${moment().valueOf()}`
    setCreatingContentIDs(prev => [...prev, timestamp])
    const { message, videoUrl } = await generateRandomVoide()
    const botMessage = {
      _id: timestamp,
      createdAt: new Date(),
      text: message,
      video: videoUrl,
      user: {
        _id: userIds.bot7,
        name: userNames.bot7,
      }
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, botMessage),
    )
    onRecieveNewMessageHaptic()
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
    onRecieveNewMessageHaptic()
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
      mediaTypes: ['images'],
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
        {!isImageMode && !isSongMode && !isVoiceMode?
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
    const isErrorMessage = message.text.includes('数分後に再度お試しください。エラー:')
    if(isErrorMessage) return
    await Clipboard.setStringAsync(message.text);
    showToast({title: 'コピーしました', body: ''})
  }

  const onLongPress = (context, message) => {
    const options = ['コピーする', '通報する', 'キャンセル'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          await Clipboard.setStringAsync(message.text);
          showToast({title: 'コピーしました', body: ''})
          break
        case 1:
          showToast({title: '発言を通報しました', body: ''})
          break
      }
    });
  }

  const renderMessageImage = (props) => {
    const { image, user } = props.currentMessage
    return (
      <RenderImage
        url={image}
        user={user}
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
		), []);

  return (
    <ScreenTemplate color={isAndroid?colors.darkPurple:colors.white}>
      <AdContainer/>
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
          renderBubble={(props) => <MarkdownBubble {...props} />}
          //isTyping={creatingContentIDs.length?true:false}
          renderSend={renderSend}
          renderComposer={(props) => <CustomComposer {...props} />}
          alwaysShowSend={true}
          renderFooter={renderChatFooter}
          placeholder={messages.length?'メッセージを入力':'お気軽にご質問ください'}
          keyboardShouldPersistTaps='never'
          maxInputLength={calculateMessageMaxLength({isImageMode, isVoiceMode})}
          onPress={(context, message) => onMessagePress({message})}
          renderMessageImage={renderMessageImage}
          renderMessageVideo={(props) => <VideoMessage {...props} />}
          onLongPress={onLongPress}
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
        <BottomSheetView style={styles.contentContainer}>
        <Settings
          setSheetPosition={setSheetPosition}
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
          negativePromptEbaraPony={negativePromptEbaraPony}
          setNegativePromptEbaraPony={setNegativePromptEbaraPony}
          negativePromptWaiANIMIXPONYXL={negativePromptWaiANIMIXPONYXL}
          setNegativePromptWaiANIMIXPONYXL={setNegativePromptWaiANIMIXPONYXL}
          negativePromptWaiREALMIX={negativePromptWaiREALMIX}
          setNegativePromptWaiREALMIX={setNegativePromptWaiREALMIX}
          negativePromptAnythingXL={negativePromptAnythingXL}
          setNegativePromptAnythingXL={setNegativePromptAnythingXL}
          negativePromptWaiREALCN={negativePromptWaiREALCN}
          setNegativePromptWaiREALCN={setNegativePromptWaiREALCN}
          negativePromptAnimeBulldozer={negativePromptAnimeBulldozer}
          setNegativePromptAnimeBulldozer={setNegativePromptAnimeBulldozer}
          negativePromptMomoiroPony={negativePromptMomoiroPony}
          setNegativePromptMomoiroPony={setNegativePromptMomoiroPony}
          negativePromptHanamomoPony={negativePromptHanamomoPony}
          setNegativePromptHanamomoPony={setNegativePromptHanamomoPony}
          negativePromptDeepDarkHentaiMix={negativePromptDeepDarkHentaiMix}
          setNegativePromptDeepDarkHentaiMix={setNegativePromptDeepDarkHentaiMix}
          negativePromptSeventhAnimeXLPony={negativePromptSeventhAnimeXLPony}
          setNegativePromptSeventhAnimeXLPony={setNegativePromptSeventhAnimeXLPony}
          negativePromptRealPonyCuteJp={negativePromptRealPonyCuteJp}
          setNegativePromptRealPonyCuteJp={setNegativePromptRealPonyCuteJp}
          negativePromptRumblexl={negativePromptRumblexl}
          setNegativePromptRumblexl={setNegativePromptRumblexl}
          negativePromptMix3x3x3xl={negativePromptMix3x3x3xl}
          setNegativePromptMix3x3x3xl={setNegativePromptMix3x3x3xl}
          negativePromptYamersAnime={negativePromptYamersAnime}
          setNegativePromptYamersAnime={setNegativePromptYamersAnime}
          negativePromptBaxl={negativePromptBaxl}
          setNegativePromptBaxl={setNegativePromptBaxl}
          negativePromptCuteCore={negativePromptCuteCore}
          setNegativePromptCuteCore={setNegativePromptCuteCore}
          negativePromptFeaturelessMix={negativePromptFeaturelessMix}
          setNegativePromptFeaturelessMix={setNegativePromptFeaturelessMix}
          negativePromptManmaruMix={negativePromptManmaruMix}
          setNegativePromptManmaruMix={setNegativePromptManmaruMix}
          negativePromptChacolOmegaMix={negativePromptChacolOmegaMix}
          setNegativePromptChacolOmegaMix={setNegativePromptChacolOmegaMix}
          negativePromptEponaMix={negativePromptEponaMix}
          setNegativePromptEponaMix={setNegativePromptEponaMix}
          negativePromptPVCMovable={negativePromptPVCMovable}
          setNegativePromptPVCMovable={setNegativePromptPVCMovable}
          negativePromptPVCRealistic={negativePromptPVCRealistic}
          setNegativePromptPVCRealistic={setNegativePromptPVCRealistic}
          negativePromptPVCFantasy={negativePromptPVCFantasy}
          setNegativePromptPVCFantasy={setNegativePromptPVCFantasy}
          negativePromptHolodayoXL={negativePromptHolodayoXL}
          setNegativePromptHolodayoXL={setNegativePromptHolodayoXL}
          negativePromptKivotosXL={negativePromptKivotosXL}
          setNegativePromptKivotosXL={setNegativePromptKivotosXL}
          negativePromptJuggernautXL={negativePromptJuggernautXL}
          setNegativePromptJuggernautXL={setNegativePromptJuggernautXL}
          negativePromptNovaAnimeXL={negativePromptNovaAnimeXL}
          setNegativePromptNovaAnimeXL={setNegativePromptNovaAnimeXL}
          negativePromptWaiNSFWIllustrious={negativePromptWaiNSFWIllustrious}
          setNegativePromptWaiNSFWIllustrious={setNegativePromptWaiNSFWIllustrious}
          negativePromptShiitakeMix={negativePromptShiitakeMix}
          setNegativePromptShiitakeMix={setNegativePromptShiitakeMix}
          negativePromptNoobreal={negativePromptNoobreal}
          setNegativePromptNoobreal={setNegativePromptNoobreal}
          negativePromptMatureRitual={negativePromptMatureRitual}
          setNegativePromptMatureRitual={setNegativePromptMatureRitual}
          negativePromptRedcraft={negativePromptRedcraft}
          setNegativePromptRedcraft={setNegativePromptRedcraft}
          negativePromptNovaFurryXL={negativePromptNovaFurryXL}
          setNegativePromptNovaFurryXL={setNegativePromptNovaFurryXL}
          negativePromptPornMasterPro={negativePromptPornMasterPro}
          setNegativePromptPornMasterPro={setNegativePromptPornMasterPro}
        />
        </BottomSheetView>
      </BottomSheet>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    //flex: 1,
  },
})