// AdContext.js
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { isDevMode } from '../config';

// インタースティシャル広告のIDを設定
const adUnitId = isDevMode ? TestIds.INTERSTITIAL : Platform.select({
  ios: 'ca-app-pub-9747065248920607/5995279317',
  android: 'ca-app-pub-9747065248920607/1427416716',
});

// リトライ設定
const MAX_RETRY_COUNT = 3;       // 最大リトライ回数
const RETRY_DELAY = 3000;        // リトライ間隔（ミリ秒）

// コンテキストの作成
export const AdContext = createContext();

// カスタムフックの作成
export const useAd = () => useContext(AdContext);

// プロバイダーコンポーネント
export const AdProvider = ({ children }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adShowing, setAdShowing] = useState(false);
  const [viewedAds, setViewedAds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const interstitialRef = useRef(null);
  const callbackQueueRef = useRef([]);
  const retryTimerRef = useRef(null);

  // 広告のロード関数
  const loadInterstitialAd = (isRetry = false) => {
    console.log(`Loading interstitial ad from context${isRetry ? ' (retry attempt)' : ''}`);
    
    // ロード中フラグを設定
    setIsLoading(true);
    
    // リトライの場合はカウントを増やす
    if (isRetry) {
      setRetryCount(prev => prev + 1);
    } else {
      setRetryCount(0);
    }

    // 既存の広告インスタンスがあれば、リスナーを解除
    if (interstitialRef.current) {
      interstitialRef.current.removeAllListeners();
    }

    // タイマーがあればクリア
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    // 新しいインタースティシャル広告を作成
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      keywords: [],
      requestNonPersonalizedAdsOnly: true,
    });
    interstitialRef.current = interstitial;

    // 広告のロード状態を追跡
    setAdLoaded(false);

    // イベントリスナーを設定
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded successfully');
      setAdLoaded(true);
      setIsLoading(false);
      setRetryCount(0); // 成功したらリトライカウントをリセット
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial ad closed');
      setAdShowing(false);
      
      // コールバックキューにあるすべての関数を実行
      while (callbackQueueRef.current.length > 0) {
        const callback = callbackQueueRef.current.shift();
        if (typeof callback === 'function') {
          callback();
        }
      }
      
      // 次回のために新しい広告をロード
      setTimeout(() => {
        loadInterstitialAd();
      }, 1000);
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial ad error:', error);
      setIsLoading(false);
      
      // リトライ回数が上限未満なら再試行
      if (retryCount < MAX_RETRY_COUNT) {
        console.log(`Retrying ad load... (attempt ${retryCount + 1}/${MAX_RETRY_COUNT})`);
        retryTimerRef.current = setTimeout(() => {
          loadInterstitialAd(true);
        }, RETRY_DELAY);
      } else {
        console.log('Max retry attempts reached, giving up');
        // エラー時もコールバックを実行
        while (callbackQueueRef.current.length > 0) {
          const callback = callbackQueueRef.current.shift();
          if (typeof callback === 'function') {
            callback();
          }
        }
      }
    });

    // 広告の読み込みを開始
    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  };

  // コンポーネントマウント時に広告をロード
  useEffect(() => {
    const cleanup = loadInterstitialAd();
    
    return () => {
      cleanup();
      if (interstitialRef.current) {
        interstitialRef.current.removeAllListeners();
      }
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  // 広告を表示する関数
  const showAd = (uniqueId, onComplete) => {
    // 既に表示したことがある広告IDの場合は表示せずにコールバック実行
    if (viewedAds.has(uniqueId)) {
      console.log(`Ad already shown for ID: ${uniqueId}`);
      if (onComplete) onComplete();
      return;
    }
    
    // 広告表示中は新しい広告を表示しない
    if (adShowing) {
      console.log('An ad is already showing');
      if (onComplete) onComplete();
      return;
    }

    // 広告がロードされている場合は広告を表示
    if (adLoaded && interstitialRef.current) {
      try {
        console.log(`Showing interstitial ad for ID: ${uniqueId}`);
        // 広告表示済みセットに追加
        setViewedAds(prev => new Set([...prev, uniqueId]));
        
        // コールバックをキューに追加
        if (onComplete) {
          callbackQueueRef.current.push(onComplete);
        }
        
        setAdShowing(true);
        interstitialRef.current.show();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
        setAdShowing(false);
        // エラー時もビュード済みとして扱う
        setViewedAds(prev => new Set([...prev, uniqueId]));
        if (onComplete) onComplete();
        
        // 次の広告を読み込む
        loadInterstitialAd();
      }
    } else if (isLoading) {
      // 広告がロード中の場合は、コールバックをキューに追加するだけ
      console.log(`Ad is still loading, queuing callback for ID: ${uniqueId}`);
      setViewedAds(prev => new Set([...prev, uniqueId]));
      if (onComplete) {
        callbackQueueRef.current.push(onComplete);
      }
    } else {
      // 広告がロードされていない・ロード中でもない場合は直接コールバック実行
      console.log('Ad not loaded, skipping and executing callback directly');
      setViewedAds(prev => new Set([...prev, uniqueId]));
      if (onComplete) onComplete();
      
      // 念のため新しい広告をロード試行
      if (!isLoading && retryCount === 0) {
        loadInterstitialAd();
      }
    }
  };

  // 特定のIDに対する広告表示履歴をリセットする関数
  const resetViewedAd = (uniqueId) => {
    setViewedAds(prev => {
      const newSet = new Set([...prev]);
      newSet.delete(uniqueId);
      return newSet;
    });
  };

  // すべての広告表示履歴をリセットする関数
  const resetAllViewedAds = () => {
    setViewedAds(new Set());
  };

  // 手動で広告のロードを強制する関数
  const forceLoadAd = () => {
    if (!isLoading) {
      loadInterstitialAd();
    }
  };

  // 提供する値
  const value = {
    adLoaded,
    isLoading,
    showAd,
    resetViewedAd,
    resetAllViewedAds,
    forceLoadAd,
    hasViewedAd: (uniqueId) => viewedAds.has(uniqueId),
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};