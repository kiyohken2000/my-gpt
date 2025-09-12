import React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

const CustomComposer = (props) => {
  const {
    placeholder = 'Type a message...',
    placeholderTextColor = '#b2b2b2',
    multiline = true,
    textInputAutoFocus = false,
    keyboardAppearance = 'default',
    text = '',
    onTextChanged,
    textInputProps,
    textInputStyle,
    disableComposer = false,
  } = props;

  return (
    <TextInput
      testID={placeholder}
      accessible
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      multiline={multiline}
      editable={!disableComposer}
      onChangeText={onTextChanged}
      style={[
        styles.textInput,
        textInputStyle,
        {
          minHeight: 40,  // 最小高さを設定
          maxHeight: 120, // 最大高さを設定
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 20,
          paddingHorizontal: 12,
          ...Platform.select({
            web: {
              outlineWidth: 0,
              outlineColor: 'transparent',
              outlineOffset: 0,
            },
          }),
        },
      ]}
      autoFocus={textInputAutoFocus}
      value={text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      {...textInputProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
    paddingTop: Platform.select({
      ios: 8,
      android: 8,
      web: 6,
    }),
    paddingBottom: Platform.select({
      ios: 8,
      android: 8,
      web: 6,
    }),
    textAlignVertical: 'top',
  },
});

export default CustomComposer;