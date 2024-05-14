import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { sleep } from "../../utils/utilFunctions";
import { UserContext } from "../../contexts/UserContext";

export default function DrawButton(props) {
  const { isImageMode, setIsImageMode, setSheetPosition } = props
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
    setSheetPosition(1)
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
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 2})}>{`ANIMAGINE${isImageMode === 2?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 3})}>{`Pony${isImageMode === 3?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 4})}>{`PVC${isImageMode === 4?'✔':''}`}</MenuItem>:
          null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 5})}>{`ChilloutMix${isImageMode === 5?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 6})}>{`NsfwGenAnime${isImageMode === 6?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 7})}>{`NovelAIRemix${isImageMode === 7?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 8})}>{`NsfwGen${isImageMode === 8?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 9})}>{`Deliberate${isImageMode === 9?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: 10})}>{`RealPony${isImageMode === 10?'✔':''}`}</MenuItem>
          :null
        }
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