import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { colors, fontSize } from "../../theme";
import Button from "../../components/Button";
import Modal from "react-native-modal";
import { saveNegativePrompt } from "../../utils/textGenerate";

const { height, width } = Dimensions.get('screen')

export default function SettingsModal(props) {
  const {
    isModalVisible, setIsModalVisible,
    negativePromptRealisticVision, setNegativePromptRealisticVision,
    negativePromptAnimagine, setNegativePromptAnimagine,
    negativePromptPony, setNegativePromptPony,
  } = props

  const onOkPress = async() => {
    await saveNegativePrompt({negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony})
    setIsModalVisible(false)
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.label}>ネガティブプロンプト</Text>
              </View>
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
              <View style={{paddingTop: 10}}>
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
                  onPress={() => setIsModalVisible(false)}
                  color={colors.gray}
                  disable={false}
                  labelColor={colors.white}
                  labelBold={false}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: height * 0.1
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: fontSize.large
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayPrimary,
    fontSize: fontSize.middle,
    padding: 10,
    height: height * 0.1,
    borderRadius: 5,
  },
  modelLabel: {
    fontSize: fontSize.middle
  },
  elementContainer: {
    paddingVertical: 5
  }
})