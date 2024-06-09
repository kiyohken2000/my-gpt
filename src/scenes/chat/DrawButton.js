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
        {/* ↓↓↓実写↓↓↓ */}
        <MenuItem onPress={() => onItemPress({val: imageModelData.RealisticVision.sequence})}>{`${imageModelData.RealisticVision.label}${isImageMode === imageModelData.RealisticVision.sequence?'✔':''}`}</MenuItem>
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.ChilloutMix.sequence})}>{`${imageModelData.ChilloutMix.label}${isImageMode === imageModelData.ChilloutMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.NsfwGen.sequence})}>{`${imageModelData.NsfwGen.label}${isImageMode === imageModelData.NsfwGen.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Rumblexl.sequence})}>{`${imageModelData.Rumblexl.label}${isImageMode === imageModelData.Rumblexl.sequence?'✔':''}`}</MenuItem>
            :null
          }
        {/* ↑↑↑実写↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓実写(Pony)↓↓↓ */}
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.RealPony.sequence})}>{`${imageModelData.RealPony.label}${isImageMode === imageModelData.RealPony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.waiREALMIX.sequence})}>{`${imageModelData.waiREALMIX.label}${isImageMode === imageModelData.waiREALMIX.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.waiREALCN.sequence})}>{`${imageModelData.waiREALCN.label}${isImageMode === imageModelData.waiREALCN.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.RealPonyCuteJp.sequence})}>{`${imageModelData.RealPonyCuteJp.label}${isImageMode === imageModelData.RealPonyCuteJp.sequence?'✔':''}`}</MenuItem>
            :null
          }
        {/* ↑↑↑実写(Pony)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓アニメ↓↓↓ */}
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Animagine.sequence})}>{`${imageModelData.Animagine.label}${isImageMode === imageModelData.Animagine.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.NsfwGenAnime.sequence})}>{`${imageModelData.NsfwGenAnime.label}${isImageMode === imageModelData.NsfwGenAnime.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.NovelAIRemix.sequence})}>{`${imageModelData.NovelAIRemix.label}${isImageMode === imageModelData.NovelAIRemix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Deliberate.sequence})}>{`${imageModelData.Deliberate.label}${isImageMode === imageModelData.Deliberate.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.ArtiWaifu.sequence})}>{`${imageModelData.ArtiWaifu.label}${isImageMode === imageModelData.ArtiWaifu.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.StarryXL.sequence})}>{`${imageModelData.StarryXL.label}${isImageMode === imageModelData.StarryXL.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.YakiDofuMix.sequence})}>{`${imageModelData.YakiDofuMix.label}${isImageMode === imageModelData.YakiDofuMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.AnythingXL.sequence})}>{`${imageModelData.AnythingXL.label}${isImageMode === imageModelData.AnythingXL.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.AnimeBulldozer.sequence})}>{`${imageModelData.AnimeBulldozer.label}${isImageMode === imageModelData.AnimeBulldozer.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.DeepDarkHentaiMix.sequence})}>{`${imageModelData.DeepDarkHentaiMix.label}${isImageMode === imageModelData.DeepDarkHentaiMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.YamersAnime.sequence})}>{`${imageModelData.YamersAnime.label}${isImageMode === imageModelData.YamersAnime.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Baxl.sequence})}>{`${imageModelData.Baxl.label}${isImageMode === imageModelData.Baxl.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.CuteCore.sequence})}>{`${imageModelData.CuteCore.label}${isImageMode === imageModelData.CuteCore.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.HolodayoXL.sequence})}>{`${imageModelData.HolodayoXL.label}${isImageMode === imageModelData.HolodayoXL.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.KivotosXL.sequence})}>{`${imageModelData.KivotosXL.label}${isImageMode === imageModelData.KivotosXL.sequence?'✔':''}`}</MenuItem>
            :null
          }
        {/* ↑↑↑アニメ↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓アニメ(Pony)↓↓↓ */}
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Pony.sequence})}>{`${imageModelData.Pony.label}${isImageMode === imageModelData.Pony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.EbaraPony.sequence})}>{`${imageModelData.EbaraPony.label}${isImageMode === imageModelData.EbaraPony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.waiANIMIXPONYXL.sequence})}>{`${imageModelData.waiANIMIXPONYXL.label}${isImageMode === imageModelData.waiANIMIXPONYXL.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.MomoiroPony.sequence})}>{`${imageModelData.MomoiroPony.label}${isImageMode === imageModelData.MomoiroPony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.HanamomoPony.sequence})}>{`${imageModelData.HanamomoPony.label}${isImageMode === imageModelData.HanamomoPony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.SeventhAnimeXLPony.sequence})}>{`${imageModelData.SeventhAnimeXLPony.label}${isImageMode === imageModelData.SeventhAnimeXLPony.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.Mix3x3x3xl.sequence})}>{`${imageModelData.Mix3x3x3xl.label}${isImageMode === imageModelData.Mix3x3x3xl.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.FeaturelessMix.sequence})}>{`${imageModelData.FeaturelessMix.label}${isImageMode === imageModelData.FeaturelessMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.ManmaruMix.sequence})}>{`${imageModelData.ManmaruMix.label}${isImageMode === imageModelData.ManmaruMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.ChacolOmegaMix.sequence})}>{`${imageModelData.ChacolOmegaMix.label}${isImageMode === imageModelData.ChacolOmegaMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.EponaMix.sequence})}>{`${imageModelData.EponaMix.label}${isImageMode === imageModelData.EponaMix.sequence?'✔':''}`}</MenuItem>
            :null
          }
        {/* ↑↑↑アニメ(Pony)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓フィギュア↓↓↓ */}
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.PVC.sequence})}>{`${imageModelData.PVC.label}${isImageMode === imageModelData.PVC.sequence?'✔':''}`}</MenuItem>:
            null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.PVCRealistic.sequence})}>{`${imageModelData.PVCRealistic.label}${isImageMode === imageModelData.PVCRealistic.sequence?'✔':''}`}</MenuItem>
            :null
          }
          {!isReview?
            <MenuItem onPress={() => onItemPress({val: imageModelData.PVCFantasy.sequence})}>{`${imageModelData.PVCFantasy.label}${isImageMode === imageModelData.PVCFantasy.sequence?'✔':''}`}</MenuItem>
            :null
          }
        {/* ↑↑↑フィギュア↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓フィギュア(Pony)↓↓↓ */}
        {!isReview?
          <MenuItem onPress={() => onItemPress({val: imageModelData.PVCMovable.sequence})}>{`${imageModelData.PVCMovable.label}${isImageMode === imageModelData.PVCMovable.sequence?'✔':''}`}</MenuItem>
          :null
        }
        {/* ↑↑↑フィギュア(Pony)↑↑↑ */}
        {/* 未分類 */}
        <MenuDivider />
        </ScrollView>
        <MenuItem onPress={onSettingsPress}>画像生成設定</MenuItem>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  }
})