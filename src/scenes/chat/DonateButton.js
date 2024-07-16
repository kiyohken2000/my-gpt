import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/Ionicons'
import { colors, fontSize } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function DonateButton() {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('Donate')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
      >
        <FontIcon
          name="information-circle-outline"
          color={colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 15
  }
})