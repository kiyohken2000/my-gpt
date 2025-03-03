import React, { useState, useContext, useEffect, useRef } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, View, Platform } from "react-native";
import ImageView from "react-native-image-viewing";
import { saveImage, downloadAndSaveBlob } from "../../utils/downloadFunctions";
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
import { adUnitIds, isDevMode } from "../../config";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const { width, height } = Dimensions.get('window')

const adUnitID = Platform.select({
  ios: adUnitIds.ios,
  android: adUnitIds.android,
});
const adUnitId = isDevMode ? TestIds.REWARDED : adUnitID;

export default function RenderImage(props) {
  const { url, onCreateVideo, user } = props
  const { imgbbKey, isVideoEnable, userMemo, noAdWord } = useContext(UserContext)
  const [visible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false);
  const [adShown, setAdShown] = useState(false);  // 広告が表示されたかどうかを追跡する状態
  const interstitialRef = useRef(null);

  useEffect(() => {
    // コンポーネントがマウントされたときに新しいインタースティシャル広告を作成
    createAndLoadInterstitial();

    return () => {
      // クリーンアップ関数でイベントリスナーを解除
      if (interstitialRef.current) {
        interstitialRef.current.removeAllListeners();
      }
    };
  }, []);

  const createAndLoadInterstitial = () => {
    console.log('Creating and loading new interstitial ad');
    
    // 既存の広告インスタンスがあれば、リスナーを解除
    if (interstitialRef.current) {
      interstitialRef.current.removeAllListeners();
    }

    // 新しいインタースティシャル広告を作成
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });
    interstitialRef.current = interstitial;

    // 広告の読み込み状態を追跡
    setAdLoaded(false);

    // イベントリスナーを設定
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
      setAdLoaded(true);
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial ad error:', error);
    });

    const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      // 広告が閉じられたら画像ビューアーを表示
      setIsVisible(true);
      
      // 少し遅延させてから次の広告をロード（UI処理の競合を避ける）
      setTimeout(() => {
        // 次回のために新しい広告を読み込む
        createAndLoadInterstitial();
      }, 1000);
    });

    // 広告の読み込みを開始
    interstitial.load();
  };

  const onSavePress = async() => {
    setIsDownloading(true)
    const fileName = `${moment().unix()}.jpg`
    await saveImage({url, fileName})
    setIsVisible(false)
    setIsDownloading(false)
  }

  const onCopyPress = async() => {
    try {
      setIsLoading(true)
      const {imageUrl, viewerUrl} = await uploadFunction({url, expiration: null, imgbbKey})
      await Clipboard.setStringAsync(imageUrl);
      showToast({title: 'URLをコピーしました', body: ''})
      setIsVisible(false)
    } catch(e) {
      console.log('on copy error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const onTwitterSharePress = async() => {
    try {
      setIsUploading(true)
      const {imageUrl, viewerUrl} = await uploadFunction({url, expiration: null, imgbbKey})
      const text = `#ガチ有能AI助手 で画像を生成しました ${viewerUrl}`
      const encodedText = encodeURIComponent(text)
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
      Linking.openURL(shareUrl)
    } catch(e) {
      console.log('on twitter share error', e)
    } finally {
      setIsUploading(false)
    }
  }

  const onCreateVideoPress = ()=> {
    onCreateVideo({url})
    setIsVisible(false)
  }

  const onThumbnailPress = () => {
    // すでに一度広告を表示済みか、広告表示不可の場合は直接画像を表示
    if (adShown || userMemo === noAdWord) {
      setIsVisible(true);
      return;
    }
    
    // 広告表示の条件: 広告がロード済み、広告インスタンスが存在する
    if (adLoaded && interstitialRef.current) {
      try {
        // 広告の準備状態を再確認
        const isAdReady = interstitialRef.current.loaded;
        
        if (isAdReady) {
          // 広告表示済みフラグをセット
          setAdShown(true);
          interstitialRef.current.show();
        } else {
          setIsVisible(true);
          // 次回のために広告をリロード
          createAndLoadInterstitial();
        }
      } catch (error) {
        console.log('Error showing ad:', error);
        // 広告表示に失敗した場合は直接画像ビューアを表示
        setIsVisible(true);
      }
    } else {
      // 広告が読み込まれていないか、または広告インスタンスがない場合は直接画像ビューアを表示
      setIsVisible(true);
    }
  }

  return (
    <>
    <ImageView
      images={[{uri: url}]}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => setIsVisible(false)}
      onLongPress={onSavePress}
      FooterComponent={(props) => {
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
            {user._id === userIds.bot3 && isVideoEnable?
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
            :null
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
        )
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
  )
}

const styles = StyleSheet.create({
  container: {
  }
})