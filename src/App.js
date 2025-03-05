import React, { useState, useEffect } from 'react'
import { View, Platform } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'
import { UserContextProvider } from './contexts/UserContext'
import { AdProvider } from './contexts/AdContext'
import { iapKey } from './openaiKeys'
import Purchases from "react-native-purchases";

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
    <Provider store={store}>
      <UserContextProvider>
        <AdProvider>
          <Router />
        </AdProvider>
      </UserContextProvider>
    </Provider>
  )
}
