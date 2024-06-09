import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function SongButton(props) {
  const { isSongMode, setIsSongMode } = props
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const renderAnchor = () => {
    return (
      <TouchableOpacity
        onPress={showMenu}
      >
        <FontIcon
          name="music"
          color={isSongMode?colors.redPrimary:colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    )
  }

  const onItemPress = ({val}) => {
    setIsSongMode(val)
    hideMenu()
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={renderAnchor()}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => onItemPress({val: true})}>{`音楽生成オン${isSongMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: false})}>{`音楽生成オフ${!isSongMode?'✔':''}`}</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  }
})