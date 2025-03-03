import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MyAdmob from "../../components/MyAdmob";
import { UserContext } from "../../contexts/UserContext";

export default function AdContainer() {
  const [adVisible, setAdVisible] = useState(true)
  const { userMemo, noAdWord } = useContext(UserContext)

  useEffect(() => {
    if(userMemo === noAdWord) {
      console.log('広告非表示')
      setAdVisible(false)
    } else {
      console.log('広告表示')
      setAdVisible(true)
    }
  }, [userMemo])

  if(adVisible) {
    return (
      <View>
        <MyAdmob/>
      </View>
    )
  }
  return (
    <View/>
  )
}