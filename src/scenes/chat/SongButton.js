import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { getQuotaInformation } from "../../utils/songGenerate";
import { showToast } from "../../utils/showToast";

export default function SongButton(props) {
  const { isSongMode, setIsSongMode } = props
  const [visible, setVisible] = useState(false);
  const [songsQuota, setSongsQuota] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSongsQuota = async() => {
      if(visible) {
        setIsLoading(true)
        const res = await getQuotaInformation()
        setSongsQuota(res)
        setIsLoading(false)
      }
    }
    fetchSongsQuota()
  }, [visible])

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

  const onSongsQuotaPress = () => {
    if(isLoading) return
    hideMenu()
    showToast({title: `あと${songsQuota}曲生成できます`})
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
        <MenuDivider />
        <MenuItem onPress={onSongsQuotaPress} >{isLoading?'Loading...':`残り${songsQuota}曲`}</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  }
})