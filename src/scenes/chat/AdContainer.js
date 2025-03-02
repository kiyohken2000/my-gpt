import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MyAdmob from "../../components/MyAdmob";
import { UserContext } from "../../contexts/UserContext";
import { specialMemoWord } from "../../config";

export default function AdContainer() {
  const [adVisible, setAdVisible] = useState(true)
  const { userMemo } = useContext(UserContext)

  useEffect(() => {
    if(userMemo === specialMemoWord) {
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