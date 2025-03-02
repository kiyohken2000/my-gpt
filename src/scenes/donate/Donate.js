import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import RenderVersion from "./RenderVersion";
import Donation from "./Donation";
import MyAdmob from "../../components/MyAdmob";
import MemoView from "./MemoView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Donate() {
  const navigation = useNavigation()

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView enableOnAndroid={true}>
      <View style={styles.container}>
        <RenderVersion/>
        <Donation/>
      </View>
      <MemoView/>
      <View style={styles.adContainer}>
        <MyAdmob/>
      </View>
      <View style={styles.footer}>
        <Button
          label='戻る'
          onPress={() => navigation.goBack()}
          color={colors.bluePrimary}
          disable={false}
          labelColor={colors.white}
          labelBold={false}
        />
      </View>
      </KeyboardAwareScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  adContainer: {
    paddingBottom: 20
  }
})