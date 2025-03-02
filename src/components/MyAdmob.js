import React, { useContext } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { isDevMode } from "../config";

export default function MyAdmob() {

  // テスト用のID
  // 実機テスト時に誤ってタップしたりすると、広告の配信停止をされたりするため、テスト時はこちらを設定する
  const unitId = TestIds.BANNER;

  // 実際に広告配信する際のID
  // 広告ユニット（バナー）を作成した際に表示されたものを設定する
  const adUnitID = Platform.select({
    ios: "ca-app-pub-9747065248920607/1891716180",
    android: "ca-app-pub-9747065248920607/8630053349",
  });

  return (
    <BannerAd
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      unitId={isDevMode?unitId:adUnitID}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true
      }}
    />
  );
}