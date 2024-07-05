import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { colors, fontSize } from "../../../theme";
import FontIcon from 'react-native-vector-icons/Feather'
import FloatingActionButton from "../../../components/FloatingActionButton";

const { height, width } = Dimensions.get('screen')

export default function NegativePromptItem(props) {
  const { negativePrompt, setNegativePrompt, label, recommendNegativePrompt, item } = props
  const [visible, setVisible] = useState(false)

  if(!item.enable) {
    return null
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.labelContainer}
      >
        <Text style={styles.label}>{label}</Text>
        <FontIcon
          name={visible?'chevron-down':'chevron-right'}
          color={colors.purple}
          size={width * 0.05}
        />
      </TouchableOpacity>
      {visible?
        <View style={{paddingVertical: 10}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNegativePrompt(text)}
            value={negativePrompt}
            maxLength={500}
            multiline={true}
          />
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <FloatingActionButton
              icon='star'
              onPress={() => setNegativePrompt(recommendNegativePrompt)}
              isLoading={false}
              color={colors.yellowPrimary}
              iconColor={colors.black}
            />
          </View>
        </View>
        :null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: colors.grayFifth
  },
  label: {
    fontSize: fontSize.xLarge
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayPrimary,
    fontSize: fontSize.middle,
    padding: 10,
    height: height * 0.11,
    borderRadius: 5,
  }
})