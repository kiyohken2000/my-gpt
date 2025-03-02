import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { colors } from "../../theme";
import { storage } from "../../utils/storage";

export default function MemoView() {
  const { userMemo, setUserMemo } = useContext(UserContext)

  useEffect(() => {
    const saveMemo = async() => {
      try {
        await storage.save({key: 'userMemo', data: userMemo})
      } catch(e) {
        console.log('save memo error', e)
      }
    }
    saveMemo()
  }, [userMemo])

  const onChangeText = (val) => {
    setUserMemo(val)
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.white, color: colors.black }]}
        placeholderTextColor={colors.gray}
        placeholder='メモを入力'
        onChangeText={onChangeText}
        value={userMemo}
        maxLength={10}
        underlineColorAndroid="transparent"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: colors.grayFifth
  },
})