import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../contexts/UserContext';
import { fontSize } from 'theme'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import mobileAds from 'react-native-google-mobile-ads';

export default function Loading() {
  const dispatch = useDispatch()
  const { setUser, getReviewStatus, loadMemo, loadDarkModeSettings } = useContext(UserContext)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async() => {
    await getReviewStatus()
    await loadMemo()
    await loadDarkModeSettings()
    const { status } = await requestTrackingPermissionsAsync();
    // ATT の結果が出てから広告 SDK を初期化する（v17 以降は JS からの initialize() が推奨）
    mobileAds().initialize().catch((e) => console.log('mobileAds initialize error', e))
    const user = {
      id: 'user-1234567',
      userName: 'abcdef'
    }
    setUser(user)
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Loading</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  }
})