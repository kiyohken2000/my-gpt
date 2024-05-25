import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fontSize } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { sleep } from "../../utils/utilFunctions";
import { UserContext } from "../../contexts/UserContext";
import { imageModelData } from "../../imageModelData";

const { height } = Dimensions.get('window')

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
        style={{maxHeight: height * 0.9 }}
      >
        <MenuItem onPress={() => onItemPress({val: 0})}>{`画像生成オフ${!isImageMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <ScrollView style={{flexGrow:0}}>
        <MenuItem onPress={() => onItemPress({val: imageModelData.RealisticVision.sequence})}>{`${imageModelData.RealisticVision.label}${isImageMode === imageModelData.RealisticVision.sequence?'✔':''}`}</MenuItem>
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.Animagine.sequence})}>{`${imageModelData.Animagine.label}${isImageMode === imageModelData.Animagine.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.Pony.sequence})}>{`${imageModelData.Pony.label}${isImageMode === imageModelData.Pony.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.PVC.sequence})}>{`${imageModelData.PVC.label}${isImageMode === imageModelData.PVC.sequence?'✔':''}`}</MenuItem>:
          null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.ChilloutMix.sequence})}>{`${imageModelData.ChilloutMix.label}${isImageMode === imageModelData.ChilloutMix.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.NsfwGenAnime.sequence})}>{`${imageModelData.NsfwGenAnime.label}${isImageMode === imageModelData.NsfwGenAnime.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.NovelAIRemix.sequence})}>{`${imageModelData.NovelAIRemix.label}${isImageMode === imageModelData.NovelAIRemix.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.NsfwGen.sequence})}>{`${imageModelData.NsfwGen.label}${isImageMode === imageModelData.NsfwGen.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.Deliberate.sequence})}>{`${imageModelData.Deliberate.label}${isImageMode === imageModelData.Deliberate.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.RealPony.sequence})}>{`${imageModelData.RealPony.label}${isImageMode === imageModelData.RealPony.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.ArtiWaifu.sequence})}>{`${imageModelData.ArtiWaifu.label}${isImageMode === imageModelData.ArtiWaifu.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.StarryXL.sequence})}>{`${imageModelData.StarryXL.label}${isImageMode === imageModelData.StarryXL.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.YakiDofuMix.sequence})}>{`${imageModelData.YakiDofuMix.label}${isImageMode === imageModelData.YakiDofuMix.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.EbaraPony.sequence})}>{`${imageModelData.EbaraPony.label}${isImageMode === imageModelData.EbaraPony.sequence?'✔':''}`}</MenuItem>
          :null
        }
        <MenuDivider />
        </ScrollView>
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