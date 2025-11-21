import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../contexts/UserContext';
import { fontSize } from 'theme'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

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