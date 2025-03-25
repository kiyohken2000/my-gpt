import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather';
import { 
  Menu, 
  MenuOptions, 
  MenuOption, 
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import { colors, fonts, fontSize } from "../../theme";

export default function HeaderLeftButton(props) {
  const { isThirdPerson, setIsThirdPerson } = props;

  const handleOptionSelect = (value) => {
    setIsThirdPerson(value);
  };

  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger>
          <FontIcon
            name="users"
            color={isThirdPerson?colors.lightPurple:colors.white}
            size={fontSize.xxxxxxxLarge}
            style={{
            }}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => handleOptionSelect(true)}>
            <View style={styles.menuItem}>
              <View style={styles.menuTextContainer}>
                <Text style={styles.optionText}>{`3人モードオン${isThirdPerson?'✔':''}`}</Text>
              </View>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => handleOptionSelect(false)}>
            <View style={styles.menuItem}>
              <View style={styles.menuTextContainer}>
                <Text style={styles.optionText}>{`3人モードオフ${!isThirdPerson?'✔':''}`}</Text>
              </View>
            </View>
          </MenuOption>
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
});