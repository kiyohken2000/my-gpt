import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { colors, fontSize } from "../../theme";
import { UserContext } from "../../contexts/UserContext";

export default function DarkModeSetting() {
  const { saveDarkModeSettings, isDarkMode } = useContext(UserContext)

  const toggleSwitch = async() => {
    await saveDarkModeSettings({val: !isDarkMode})
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.label}>ダークモード</Text>
      </View>
      <Switch
        trackColor={{false: colors.gray, true: colors.bluePrimary}}
        thumbColor={isDarkMode ? colors.yellowPrimary : colors.white}
        ios_backgroundColor={colors.redPrimary}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
  },
  label: {
    fontSize: fontSize.xLarge
  }
})