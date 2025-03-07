import * as Haptics from 'expo-haptics';
/*
最大入力文字数
画像生成モード: 1000
通常時: 500
音声生成モード: 50
*/

const calculateMessageMaxLength = ({isImageMode, isVoiceMode}) => {
  if(isImageMode) return 1000
  if(isVoiceMode) return 50
  return 500
}

const onRecieveNewMessageHaptic = () => {
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  )
}

export {
  calculateMessageMaxLength,
  onRecieveNewMessageHaptic,
}