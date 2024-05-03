import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, fontSize } from "../../../theme";
import Button from "../../../components/Button";
import { saveNegativePrompt } from "../../../utils/textGenerate";
import NegativePromptItem from "./NegativePromptItem";
import { UserContext } from "../../../contexts/UserContext";
import { recommendNegativePrompt } from "../../../config";

export default function Settings(props) {
  const {
    setSheetPosition,
    negativePromptRealisticVision, setNegativePromptRealisticVision,
    negativePromptAnimagine, setNegativePromptAnimagine,
    negativePromptPony, setNegativePromptPony,
    negativePromptPvc, setNegativePromptPvc,
    negativePromptChillOut, setNegativePromptChillOut,
  } = props
  const { isReview } = useContext(UserContext)

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
        recommendNegativePrompt={recommendNegativePrompt.realisticVision}
      />
      {!isReview?
        <NegativePromptItem
          label='ANIMAGINE'
          negativePrompt={negativePromptAnimagine}
          setNegativePrompt={setNegativePromptAnimagine}
          recommendNegativePrompt={recommendNegativePrompt.animagine}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label='Pony'
          negativePrompt={negativePromptPony}
          setNegativePrompt={setNegativePromptPony}
          recommendNegativePrompt={recommendNegativePrompt.pony}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label='PVC'
          negativePrompt={negativePromptPvc}
          setNegativePrompt={setNegativePromptPvc}
          recommendNegativePrompt={recommendNegativePrompt.pvc}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label='ChilloutMix'
          negativePrompt={negativePromptChillOut}
          setNegativePrompt={setNegativePromptChillOut}
          recommendNegativePrompt={recommendNegativePrompt.chilloutMix}
        />
        :null
      }
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