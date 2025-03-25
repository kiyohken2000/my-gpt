import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import FontIcon from 'react-native-vector-icons/AntDesign';
import { 
  Menu, 
  MenuOptions, 
  MenuOption, 
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import { colors, fontSize } from "../../theme";
import { UserContext } from "../../contexts/UserContext";

export default function VoiceButton(props) {
  const { isVoiceMode, setIsVoiceMode, onGenerateRandomVoice } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isReview } = useContext(UserContext);

  const handleOptionSelect = (value) => {
    setIsVoiceMode(value);
  };

  const handleRandomPress = () => {
    onGenerateRandomVoice();
  };

  return (
    <View style={styles.container}>
      <Menu
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
      >
        <MenuTrigger>
          <FontIcon
            name="sound"
            color={isVoiceMode ? colors.yellowgreen : colors.white}
            size={fontSize.xxxxxxxLarge}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => handleOptionSelect(true)}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{`音声生成オン${isVoiceMode ? '✔' : ''}`}</Text>
            </View>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption onSelect={() => handleOptionSelect(false)}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{`音声生成オフ${!isVoiceMode ? '✔' : ''}`}</Text>
            </View>
          </MenuOption>
          {!isReview && (
            <>
              <View style={styles.divider} />
              <MenuOption onSelect={handleRandomPress}>
                <View style={styles.menuItem}>
                  <Text style={styles.optionText}>ランダム生成</Text>
                </View>
              </MenuOption>
            </>
          )}
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: colors.text
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 2
  }
});