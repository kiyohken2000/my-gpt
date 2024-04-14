import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { colors, fontSize } from "../../theme";
import Button from "../../components/Button";
import Modal from "react-native-modal";
import { saveNegativePrompt } from "../../utils/textGenerate";

const { height, width } = Dimensions.get('screen')

export default function SettingsModal(props) {
  const { isModalVisible, setIsModalVisible, negativePrompt, setNegativePrompt } = props

  const onOkPress = async() => {
    await saveNegativePrompt({negativePrompt})
    setIsModalVisible(false)
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
    >
      <TouchableWithoutFeedback
        onPress={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.label}>ネガティブプロンプト</Text>
              <View style={{paddingVertical: 10}}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNegativePrompt(text)}
                  value={negativePrompt}
                  maxLength={500}
                  multiline={true}
                />
              </View>
              <Button
                label='決定'
                onPress={onOkPress}
                color={colors.purple}
                disable={false}
                labelColor={colors.white}
                labelBold={false}
              />
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
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  label: {
    fontSize: fontSize.large
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayPrimary,
    fontSize: fontSize.middle,
    padding: 10,
    height: height * 0.2,
    borderRadius: 5,
  }
})