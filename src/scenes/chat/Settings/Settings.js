import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, fontSize } from "../../../theme";
import Button from "../../../components/Button";
import { saveNegativePrompt } from "../../../utils/textGenerate";
import NegativePromptItem from "./NegativePromptItem";

export default function Settings(props) {
  const {
    setSheetPosition,
    negativePromptRealisticVision, setNegativePromptRealisticVision,
    negativePromptAnimagine, setNegativePromptAnimagine,
    negativePromptPony, setNegativePromptPony,
    negativePromptPvc, setNegativePromptPvc,
    negativePromptChillOut, setNegativePromptChillOut,
  } = props

  const onOkPress = async() => {
    await saveNegativePrompt({negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc, negativePromptChillOut})
    setSheetPosition(0)
  }

  return (
   <View style={styles.container}>
      <View style={{alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
        <Text style={styles.label}>ネガティブプロンプト</Text>
      </View>
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <NegativePromptItem
        label='RealisticVision'
        negativePrompt={negativePromptRealisticVision}
        setNegativePrompt={setNegativePromptRealisticVision}
      />
      <NegativePromptItem
        label='ANIMAGINE'
        negativePrompt={negativePromptAnimagine}
        setNegativePrompt={setNegativePromptAnimagine}
      />
      <NegativePromptItem
        label='Pony'
        negativePrompt={negativePromptPony}
        setNegativePrompt={setNegativePromptPony}
      />
      <NegativePromptItem
        label='PVC'
        negativePrompt={negativePromptPvc}
        setNegativePrompt={setNegativePromptPvc}
      />
      <NegativePromptItem
        label='ChilloutMix'
        negativePrompt={negativePromptChillOut}
        setNegativePrompt={setNegativePromptChillOut}
      />
    </KeyboardAwareScrollView>
    <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
      <Button
        label='決定'
        onPress={onOkPress}
        color={colors.purple}
        disable={false}
        labelColor={colors.white}
        labelBold={false}
      />
      <View style={{paddingVertical: 10}} />
      <Button
        label='閉じる'
        onPress={() => setSheetPosition(0)}
        color={colors.gray}
        disable={false}
        labelColor={colors.white}
        labelBold={false}
      />
    </View>
   </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: fontSize.large
  },
})