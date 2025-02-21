import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { sleep } from "../../../utils/utilFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { imageModelData } from "../../../imageModelData";
import DrawButtonItem from "./DrawButtonItem";
import Anchor from "./Anchor";

const { height } = Dimensions.get('window')

export default function DrawButton(props) {
  const { isImageMode, setIsImageMode, setSheetPosition } = props
  const [visible, setVisible] = useState(false);
  const { isReview } = useContext(UserContext)

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const onItemPress = async({val}) => {
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
        anchor={<Anchor onPress={showMenu} isImageMode={isImageMode} />}
        onRequestClose={hideMenu}
        style={{maxHeight: height * 0.9 }}
      >
        <MenuItem onPress={() => onItemPress({val: 0})}>{`画像生成オフ${!isImageMode?'✔':''}`}</MenuItem>
        <MenuDivider />
        <ScrollView style={{flexGrow:0}}>
        {/* ↓↓↓実写↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={false}
            isImageMode={isImageMode}
            item={imageModelData.RealisticVision}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={false}
            isImageMode={isImageMode}
            item={imageModelData.JuggernautXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.ChilloutMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.NsfwGen}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Rumblexl}
          />
        {/* ↑↑↑実写↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓実写(Pony)↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.RealPony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.waiREALMIX}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.waiREALCN}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.RealPonyCuteJp}
          />
        {/* ↑↑↑実写(Pony)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓実写(Illustrious)↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Noobreal}
          />
        {/* ↑↑↑実写(Illustrious)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓アニメ↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Animagine}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.NsfwGenAnime}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.NovelAIRemix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Deliberate}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.ArtiWaifu}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.StarryXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.YakiDofuMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.AnythingXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.AnimeBulldozer}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.DeepDarkHentaiMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.YamersAnime}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Baxl}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.CuteCore}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.HolodayoXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.KivotosXL}
          />
        {/* ↑↑↑アニメ↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓アニメ(Pony)↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Pony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.EbaraPony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.waiANIMIXPONYXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.MomoiroPony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.HanamomoPony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.SeventhAnimeXLPony}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.Mix3x3x3xl}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.FeaturelessMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.ManmaruMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.ChacolOmegaMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.EponaMix}
          />
        {/* ↑↑↑アニメ(Pony)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓アニメ(Illustrious)↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.NovaAnimeXL}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.WaiNSFWIllustrious}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.ShiitakeMix}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.MatureRitual}
          />
        {/* ↑↑↑アニメ(Illustrious)↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓フィギュア↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.PVC}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.PVCRealistic}
          />
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.PVCFantasy}
          />
        {/* ↑↑↑フィギュア↑↑↑ */}
        <MenuDivider />
        {/* ↓↓↓フィギュア(Pony)↓↓↓ */}
          <DrawButtonItem
            onItemPress={onItemPress}
            disable={isReview}
            isImageMode={isImageMode}
            item={imageModelData.PVCMovable}
          />
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