// RenderImage.js
import React, { useState, useContext } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { saveImage } from "../../utils/downloadFunctions";
import moment from "moment";
import { colors } from "../../theme";
import FloatingActionButton from "../../components/FloatingActionButton";
import * as Clipboard from 'expo-clipboard';
import { uploadFunction } from "../../utils/uploadFunctions";
import { showToast } from "../../utils/showToast";
import ImageActionButton from "../../components/ImageActionButton";
import * as Linking from 'expo-linking';
import { UserContext } from "../../contexts/UserContext";
import { userIds } from "../../utils/textGenerate";
import { useAd } from "../../contexts/AdContext";

const { width, height } = Dimensions.get('window');

export default function RenderImage(props) {
  const { url, onCreateVideo, user } = props;
  const { imgbbKey, isVideoEnable, userMemo, noAdWord } = useContext(UserContext);
  const [visible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // 広告コンテキストからメソッドを取得
  const { showAd, hasViewedAd } = useAd();
  
  // URLからユニークIDを生成（この例ではURLそのものをIDとして使用）
  const adUniqueId = url;

  const onCloseImageViewer = () => {
    setIsVisible(false);
  };

  const onSavePress = async() => {
    setIsDownloading(true);
    const fileName = `${moment().unix()}.jpg`;
    await saveImage({url, fileName});
    setIsVisible(false);
    setIsDownloading(false);
  };

  const onCopyPress = async() => {
    try {
      setIsLoading(true);
      const {imageUrl, viewerUrl} = await uploadFunction({url, expiration: null, imgbbKey});
      await Clipboard.setStringAsync(imageUrl);
      showToast({title: 'URLをコピーしました', body: ''});
      setIsVisible(false);
    } catch(e) {
      console.log('on copy error', e);
    } finally {
      setIsLoading(false);
    }
  };

  const onTwitterSharePress = async() => {
    try {
      setIsUploading(true);
      const {imageUrl, viewerUrl} = await uploadFunction({url, expiration: null, imgbbKey});
      const text = `#ガチ有能AI助手 で画像を生成しました ${viewerUrl}`;
      const encodedText = encodeURIComponent(text);
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
      Linking.openURL(shareUrl);
    } catch(e) {
      console.log('on twitter share error', e);
    } finally {
      setIsUploading(false);
    }
  };

  const onCreateVideoPress = () => {
    onCreateVideo({url});
    setIsVisible(false);
  };

  const onThumbnailPress = () => {
    // 広告非表示設定の場合は直接画像を表示
    if (userMemo === noAdWord) {
      setIsVisible(true);
      return;
    }
    
    // 既に広告を表示していないか確認
    if (hasViewedAd(adUniqueId)) {
      // 既に表示済みなら直接画像表示
      setIsVisible(true);
      return;
    }
    
    // 広告表示とコールバック設定
    showAd(adUniqueId, () => {
      // 広告表示後に実行されるコールバック
      setIsVisible(true);
    });
  };

  return (
    <>
    <ImageView
      images={[{uri: url}]}
      imageIndex={0}
      visible={visible}
      onRequestClose={onCloseImageViewer}
      onLongPress={onSavePress}
      FooterComponent={() => {
        return (
          <View style={{paddingBottom: height * 0.05, paddingRight: width * 0.1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <ImageActionButton
              source={require('../../../assets/images/twitter_x_logo.png')}
              onPress={onTwitterSharePress}
              isLoading={isUploading}
              color={colors.white}
              iconColor={colors.purple}
            />
            <View style={{paddingHorizontal: 5}} />
            <FloatingActionButton
              icon='download'
              onPress={onSavePress}
              isLoading={isDownloading}
              color={colors.redSecondary}
              iconColor={colors.white}
            />
            {user._id === userIds.bot3 && isVideoEnable ?
            <>
              <View style={{paddingHorizontal: 5}} />
              <FloatingActionButton
                icon='film'
                onPress={onCreateVideoPress}
                isLoading={false}
                color={colors.pink}
                iconColor={colors.white}
              />
            </>
            : null
            }
            <View style={{paddingHorizontal: 5}} />
            <FloatingActionButton
              icon='copy'
              onPress={onCopyPress}
              isLoading={isLoading}
              color={colors.purple}
              iconColor={colors.white}
            />
          </View>
        );
      }}
    />
    <TouchableOpacity
      style={styles.container}
      onPress={onThumbnailPress}
    >
      <Image
        source={{uri: url}}
        resizeMode='cover'
        style={{
          height: width * 0.4,
          width: '100%',
          borderRadius: 10,
          minWidth: width * 0.5
        }}
      />
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});