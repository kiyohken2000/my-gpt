import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import RenderVersion from "./RenderVersion";
import Donation from "./Donation";

export default function Donate() {
  const navigation = useNavigation()

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <RenderVersion/>
        <Donation/>
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
  }
})