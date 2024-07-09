import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import FontIcon from 'react-native-vector-icons/AntDesign'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { UserContext } from "../../contexts/UserContext";

export default function VoiceButton(props) {
  const { isVoiceMode, setIsVoiceMode, onGenerateRandomVoice } = props
  const [visible, setVisible] = useState(false);
  const { isReview } = useContext(UserContext)

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const renderAnchor = () => {
    return (
      <TouchableOpacity
        onPress={showMenu}
      >
        <FontIcon
          name="sound"
          color={isVoiceMode?colors.yellowgreen:colors.white}
          size={fontSize.xxxxxxxLarge}
          style={{
          }}
        />
      </TouchableOpacity>
    )
  }

  const onItemPress = ({val}) => {
    setIsVoiceMode(val)
    hideMenu()
  }

  const onRandomPress = () => {
    onGenerateRandomVoice()
    hideMenu()
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={renderAnchor()}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => onItemPress({val: true})}>{`音声生成オン${isVoiceMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => onItemPress({val: false})}>{`音声生成オフ${!isVoiceMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={onRandomPress} >ランダム生成</MenuItem>
          :null
        }
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  }
})