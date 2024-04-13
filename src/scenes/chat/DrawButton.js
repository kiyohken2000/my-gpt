import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function DrawButton(props) {
  const { isImageMode, setIsImageMode } = props
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

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={renderAnchor()}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => onItemPress({val: true})}>{`画像生成オン${isImageMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: false})}>{`画像生成オフ${!isImageMode?'✔':''}`}</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15
  }
})