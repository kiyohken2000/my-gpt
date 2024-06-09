import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function HeaderLeftButton(props) {
  const { isThirdPerson, setIsThirdPerson } = props
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const renderAnchor = () => {
    return (
      <TouchableOpacity
        onPress={showMenu}
      >
        <FontIcon
          name="users"
          color={isThirdPerson?colors.lightPurple:colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    )
  }

  const onItemPress = ({val}) => {
    setIsThirdPerson(val)
    hideMenu()
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={renderAnchor()}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => onItemPress({val: true})}>{`3人モードオン${isThirdPerson?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: false})}>{`3人モードオフ${!isThirdPerson?'✔':''}`}</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  }
})