import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { sleep } from "../../utils/utilFunctions";

export default function DrawButton(props) {
  const { isImageMode, setIsImageMode, setIsModalVisible } = props
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const renderAnchor = () => {
    return (
      <TouchableOpacity
        onPress={showMenu}
      >
        <FontIcon
          name="draw"
          color={isImageMode?colors.yellowPrimary:colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    )
  }

  const onItemPress = ({val}) => {
    setIsImageMode(val)
    hideMenu()
  }

  const onSettingsPress = async() => {
    hideMenu()
    await sleep(500)
    setIsModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={renderAnchor()}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => onItemPress({val: 0})}>{`画像生成オフ${!isImageMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: 1})}>{`RealisticVision${isImageMode === 1?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: 2})}>{`ANIMAGINE${isImageMode === 2?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={onSettingsPress}>画像生成設定</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15
  }
})