import React, { useState, useEffect } from 'react'
import { View, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from 'utils/store'
import 'utils/ignore'
import { UserContextProvider } from './contexts/UserContext'
import { AdProvider } from './contexts/AdContext'
import { iapKey } from './openaiKeys'
import Purchases from "react-native-purchases";
import { MenuProvider } from 'react-native-popup-menu';
import * as Device from 'expo-device';

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Router from './routes'

export default function App() {
  // state
  const [didLoad, setDidLoad] = useState(false)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  const initRevenueCat = async() => {
    if(!Device.isDevice) return
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: iapKey.android });
    } else {
      Purchases.configure({ apiKey: iapKey.ios });
    }
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
    initRevenueCat()
  }, [])

  // rendering
  if (!didLoad) return <View />
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <UserContextProvider>
          <AdProvider>
            <MenuProvider>
              <Router />
            </MenuProvider>
          </AdProvider>
        </UserContextProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
