import React from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, fontSize } from "../../../theme";
import Button from "../../../components/Button";
import { saveNegativePrompt } from "../../../utils/textGenerate";

const { height, width } = Dimensions.get('screen')

export default function Settings(props) {
  const {
    setSheetPosition,
    negativePromptRealisticVision, setNegativePromptRealisticVision,
    negativePromptAnimagine, setNegativePromptAnimagine,
    negativePromptPony, setNegativePromptPony,
    negativePromptPvc, setNegativePromptPvc,
  } = props

  const onOkPress = async() => {
    await saveNegativePrompt({negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc})
    setSheetPosition(0)
  }

  return (
   <View style={styles.container}>
      <View style={{alignItems: 'center', paddingTop: 10}}>
        <Text style={styles.label}>ネガティブプロンプト</Text>
      </View>
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <View style={styles.elementContainer}>
        <Text style={styles.modelLabel}>RealisticVision</Text>
        <View style={{paddingVertical: 0}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNegativePromptRealisticVision(text)}
            value={negativePromptRealisticVision}
            maxLength={500}
            multiline={true}
          />
        </View>
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.modelLabel}>ANIMAGINE</Text>
        <View style={{paddingVertical: 0}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNegativePromptAnimagine(text)}
            value={negativePromptAnimagine}
            maxLength={500}
            multiline={true}
          />
        </View>
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.modelLabel}>Pony</Text>
        <View style={{paddingVertical: 0}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNegativePromptPony(text)}
            value={negativePromptPony}
            maxLength={500}
            multiline={true}
          />
        </View>
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.modelLabel}>PVC</Text>
        <View style={{paddingVertical: 0}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNegativePromptPvc(text)}
            value={negativePromptPvc}
            maxLength={500}
            multiline={true}
          />
        </View>
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: colors.grayPrimary,
    fontSize: fontSize.middle,
    padding: 10,
    height: height * 0.11,
    borderRadius: 5,
  },
  modelLabel: {
    fontSize: fontSize.middle
  },
  elementContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20
  }
})